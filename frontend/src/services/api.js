import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth headers if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || 'Server error occurred'
      throw new Error(message)
    } else if (error.request) {
      // Network error
      throw new Error('Network error. Please check your connection.')
    } else {
      // Other error
      throw new Error('An unexpected error occurred.')
    }
  }
)

export const downloadVideo = async (url) => {
  try {
    const response = await api.post('/v1/download/initiate', { url })
    
    if (response.success) {
      // For demo purposes, return a mock response
      // In production, this would poll the status endpoint
      return {
        downloadUrl: 'https://example.com/video.mp4',
        title: 'Sample Video',
        duration: 120,
        size: 15728640, // 15MB
        platform: detectPlatform(url),
        originalUrl: url,
        thumbnail: 'https://via.placeholder.com/300x200'
      }
    } else {
      throw new Error(response.message || 'Download failed')
    }
  } catch (error) {
    throw error
  }
}

export const getDownloadStatus = async (downloadId) => {
  try {
    const response = await api.get(`/v1/download/status/${downloadId}`)
    return response
  } catch (error) {
    throw error
  }
}

export const getHealthStatus = async () => {
  try {
    const response = await api.get('/v1/health')
    return response
  } catch (error) {
    throw error
  }
}

const detectPlatform = (url) => {
  try {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname.toLowerCase()
    
    if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
      return 'Twitter'
    } else if (hostname.includes('instagram.com')) {
      return 'Instagram'
    } else if (hostname.includes('tiktok.com')) {
      return 'TikTok'
    }
  } catch {
    return 'Unknown'
  }
  
  return 'Unknown'
}

export default api 