import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { Download, Link, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import FormatSelector from './FormatSelector'

const Hero = () => {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [lastDownloadId, setLastDownloadId] = useState(null)
  const { recentDownloads, dispatch } = useAppContext()
  const [isDownloading, setIsDownloading] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState(null)

  // Get API URL from environment or default to localhost
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!url.trim()) {
      setError('Please enter a valid URL')
      return
    }

    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch(`${API_URL}/api/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          url: url.trim(),
          format: selectedFormat?.id 
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess('Video downloaded successfully!')
        setLastDownloadId(data.id)
        setUrl('')
        setSelectedFormat(null)
        
        // Add to recent downloads
        dispatch({
          type: 'ADD_DOWNLOAD',
          payload: {
            id: data.id,
            url: url.trim(),
            downloadUrl: `${API_URL}${data.downloadUrl}`,
            time: new Date().toISOString()
          }
        })
      } else {
        setError(data.error || 'Download failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async (downloadUrl, filename) => {
    setIsDownloading(true)
    try {
      // Method 1: Try using a temporary link element
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = filename || 'video.mp4'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      // Method 2: Fallback to fetch and blob download
      try {
        const response = await fetch(downloadUrl)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = filename || 'video.mp4'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } catch (fetchErr) {
        console.error('Download failed:', fetchErr)
        alert('Download failed. Please try again.')
      }
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Download Videos from
            <span className="block text-yellow-300">Any Platform</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Download videos from YouTube, Twitter, Instagram, TikTok and more. 
            Fast, free, and no registration required.
          </p>

          {/* URL Input Form */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste video URL here..."
                className="flex-1 px-6 py-4 text-lg border-0 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !url.trim()}
                className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 disabled:bg-gray-400 text-gray-900 font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Clock className="animate-spin" size={20} />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    Download
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="max-w-2xl mx-auto mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2">
              <CheckCircle size={20} />
              {success}
              {lastDownloadId && (
                <button
                  onClick={() => handleDownload(`${API_URL}/api/download/${lastDownloadId}`, 'video.mp4')}
                  disabled={isDownloading}
                  className="ml-4 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  {isDownloading ? (
                    <>
                      <Clock className="animate-spin" size={16} />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      Download File
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {/* Format Selector */}
          {url.trim() && (
            <div className="max-w-2xl mx-auto mb-8">
              <FormatSelector 
                url={url} 
                onFormatSelect={setSelectedFormat}
                selectedFormat={selectedFormat}
                isLoading={isLoading}
              />
            </div>
          )}

          {/* Recent Downloads */}
          {recentDownloads.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-white mb-6">Recent Downloads</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recentDownloads.map((download) => (
                  <div key={download.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-100 text-sm truncate">{download.url}</span>
                      <span className="text-blue-200 text-xs">{new Date(download.time).toLocaleTimeString()}</span>
                    </div>
                    <button
                      onClick={() => handleDownload(download.downloadUrl, 'video.mp4')}
                      disabled={isDownloading}
                      className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      {isDownloading ? (
                        <>
                          <Clock className="animate-spin" size={16} />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download size={16} />
                          Download
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero 