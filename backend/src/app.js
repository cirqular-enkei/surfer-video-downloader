// Minimal Surfer Backend
const express = require('express')
const cors = require('cors')
const { execFile } = require('child_process')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const app = express()
const PORT = process.env.PORT || 5000
const DOWNLOAD_DIR = path.join(__dirname, '../downloads')

// In-memory recent downloads (resets on restart)
const recentDownloads = []

// Ensure download directory exists
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true })
}

app.use(cors())
app.use(express.json())

// Serve static files from frontend build in production
if (process.env.NODE_ENV === 'production') {
  // Try multiple possible frontend build paths for Render deployment
  const possiblePaths = [
    path.join(__dirname, '../../frontend/dist'),
    path.join(__dirname, '../frontend/dist'),
    path.join(__dirname, '../../dist'),
    path.join(__dirname, '../dist'),
    path.join(__dirname, 'dist')
  ]
  
  let frontendBuildPath = null
  let indexPath = null
  
  for (const buildPath of possiblePaths) {
    const indexFile = path.join(buildPath, 'index.html')
    if (fs.existsSync(indexFile)) {
      frontendBuildPath = buildPath
      indexPath = indexFile
      console.log(`Found index.html at: ${indexFile}`)
      break
    }
  }
  
  if (frontendBuildPath) {
    app.use(express.static(frontendBuildPath))
  } else {
    console.log('Frontend build not found in any expected location')
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() })
})

// GET /api/formats - Get available formats for a URL
app.get('/api/formats', async (req, res) => {
  const { url } = req.query
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ success: false, error: 'Missing or invalid URL.' })
  }

  // Get available formats using yt-dlp
  // Use 'yt-dlp' for production (installed via postinstall script)
  const ytdlpPath = process.env.NODE_ENV === 'production' ? 'yt-dlp' : '/Users/macejaita/Library/Python/3.9/bin/yt-dlp'
  
  execFile(ytdlpPath, ['--list-formats', url], (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ success: false, error: stderr || error.message })
    }
    
    // Parse the output to extract format information
    const lines = stdout.split('\n').filter(line => line.trim())
    const formats = []
    
    // More robust parsing for different platforms
    let inFormats = false
    for (const line of lines) {
      // Detect format table header
      if (line.toLowerCase().includes('format code') || line.toLowerCase().includes('id') && line.toLowerCase().includes('ext')) {
        inFormats = true
        continue
      }
      if (!inFormats) continue
      
      // Skip separator lines
      if (/^[-\s]+$/.test(line)) continue
      
      // Try multiple parsing strategies
      let format = null
      
      // Strategy 1: Standard yt-dlp format (ID EXT RESOLUTION FILESIZE NOTE INFO)
      const standardMatch = line.match(/^(\d+)\s+(\w+)\s+(\d+x\d+)?\s+(\d+(?:\.\d+)?[KMG]i?B)?\s+(\w+)?\s+(.+)$/)
      if (standardMatch) {
        const [, id, ext, resolution, filesize, note, info] = standardMatch
        format = {
          id: id.trim(),
          ext: ext.trim(),
          resolution: resolution || 'Unknown',
          filesize: filesize || 'Unknown',
          note: note || '',
          info: info || ''
        }
      }
      
      // Strategy 2: Instagram/TikTok style (ID EXT RESOLUTION FILESIZE)
      if (!format) {
        const columns = line.trim().split(/\s+/)
        if (columns.length >= 2) {
          const [id, ext, ...rest] = columns
          let resolution = 'Unknown', filesize = 'Unknown', note = '', info = ''
          
          // Parse remaining columns
          for (const col of rest) {
            if (/^\d+x\d+$/.test(col)) resolution = col
            else if (/^\d+(\.\d+)?[KMG]i?B$/.test(col)) filesize = col
            else if (!note) note = col
            else info += (info ? ' ' : '') + col
          }
          
          format = { id, ext, resolution, filesize, note, info }
        }
      }
      
      // Strategy 3: Simple space-separated (ID EXT INFO)
      if (!format) {
        const simpleMatch = line.match(/^(\d+)\s+(\w+)\s+(.+)$/)
        if (simpleMatch) {
          const [, id, ext, info] = simpleMatch
          format = {
            id: id.trim(),
            ext: ext.trim(),
            resolution: 'Unknown',
            filesize: 'Unknown',
            note: '',
            info: info.trim()
          }
        }
      }
      
      if (format) {
        formats.push(format)
      }
    }
    
    // If still no formats, try to extract any line that looks like a format
    if (formats.length === 0) {
      lines.forEach(line => {
        // Look for lines that start with a number (format ID)
        const match = line.match(/^(\d+)\s+(.+)$/)
        if (match) {
          const [, id, rest] = match
          const parts = rest.trim().split(/\s+/)
          const ext = parts[0] || 'Unknown'
          const info = parts.slice(1).join(' ') || ''
          
          formats.push({
            id: id.trim(),
            ext: ext.trim(),
            resolution: 'Unknown',
            filesize: 'Unknown',
            note: '',
            info: info.trim()
          })
        }
      })
    }
    
    res.json({ success: true, formats })
  })
})

// POST /api/download - Accepts a URL and optional format, downloads the video, returns a download link
app.post('/api/download', async (req, res) => {
  const { url, format } = req.body
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ success: false, error: 'Missing or invalid URL.' })
  }

  // Detect platform (for filename only)
  let platform = 'video'
  if (url.includes('youtube.com') || url.includes('youtu.be')) platform = 'youtube'
  else if (url.includes('twitter.com') || url.includes('x.com')) platform = 'twitter'
  else if (url.includes('instagram.com')) platform = 'instagram'
  else if (url.includes('tiktok.com')) platform = 'tiktok'

  const id = uuidv4()
  const filename = `${platform}_${id}.mp4`
  const filepath = path.join(DOWNLOAD_DIR, filename)

  // Build yt-dlp command with optional format
  const args = ['-o', filepath]
  if (format) {
    args.push('-f', format)
  }
  args.push(url)

  // Use correct yt-dlp path for production
  const ytdlpPath = process.env.NODE_ENV === 'production' ? 'yt-dlp' : '/Users/macejaita/Library/Python/3.9/bin/yt-dlp'

  // Download with yt-dlp
  execFile(ytdlpPath, args, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ success: false, error: stderr || error.message })
    }
    // Save to recent downloads
    recentDownloads.unshift({ id, url, platform, filename, format, time: new Date().toISOString() })
    if (recentDownloads.length > 10) recentDownloads.pop()
    // Respond with download link
    res.json({ success: true, id, downloadUrl: `/api/download/${id}` })
  })
})

// GET /api/download/:id - Streams the video file for download
app.get('/api/download/:id', (req, res) => {
  const { id } = req.params
  const entry = recentDownloads.find(d => d.id === id)
  if (!entry) return res.status(404).json({ success: false, error: 'Download not found.' })
  const filepath = path.join(DOWNLOAD_DIR, entry.filename)
  if (!fs.existsSync(filepath)) return res.status(404).json({ success: false, error: 'File not found.' })
  res.download(filepath, entry.filename)
})

// (Optional) GET /api/recent - List recent downloads (in memory)
app.get('/api/recent', (req, res) => {
  res.json({ success: true, downloads: recentDownloads })
})

// Catch-all handler for React Router (serve index.html for all non-API routes)
if (process.env.NODE_ENV === 'production') {
  // Try multiple possible frontend build paths for Render deployment
  const possiblePaths = [
    path.join(__dirname, '../../frontend/dist'),
    path.join(__dirname, '../frontend/dist'),
    path.join(__dirname, '../../dist'),
    path.join(__dirname, '../dist'),
    path.join(__dirname, 'dist')
  ]
  
  let frontendBuildPath = null
  let indexPath = null
  
  for (const buildPath of possiblePaths) {
    const indexFile = path.join(buildPath, 'index.html')
    if (fs.existsSync(indexFile)) {
      frontendBuildPath = buildPath
      indexPath = indexFile
      console.log(`Found index.html at: ${indexFile}`)
      break
    }
  }
  
  app.get('*', (req, res) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ success: false, error: 'API endpoint not found.' })
    }
    
    // Serve index.html for all other routes (React Router)
    if (indexPath && fs.existsSync(indexPath)) {
      res.sendFile(indexPath)
    } else {
      res.status(404).send('Frontend not built. Available paths checked: ' + possiblePaths.join(', '))
    }
  })
}

// Start server
app.listen(PORT, () => {
  console.log(`Surfer backend running on port ${PORT}`)
}) 