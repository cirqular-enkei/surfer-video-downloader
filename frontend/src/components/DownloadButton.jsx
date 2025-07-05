import React from 'react'
import { Download, Loader2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { downloadVideo } from '../services/api'

const DownloadButton = () => {
  const { currentUrl, isProcessing, dispatch } = useApp()

  const isValidUrl = () => {
    if (!currentUrl) return false
    
    const urlPattern = /^https?:\/\//i
    if (!urlPattern.test(currentUrl)) return false

    const supportedPlatforms = [
      'twitter.com', 'x.com', 'instagram.com', 'tiktok.com'
    ]
    
    try {
      const urlObj = new URL(currentUrl)
      const hostname = urlObj.hostname.toLowerCase()
      return supportedPlatforms.some(platform => hostname.includes(platform))
    } catch {
      return false
    }
  }

  const handleDownload = async () => {
    if (!isValidUrl()) {
      dispatch({ type: 'SET_ERROR', payload: 'Please enter a valid URL first.' })
      return
    }

    try {
      dispatch({ type: 'SET_PROCESSING', payload: true })
      dispatch({ type: 'SET_DOWNLOAD_STATUS', payload: 'loading' })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        dispatch((prev) => ({
          type: 'SET_DOWNLOAD_PROGRESS',
          payload: Math.min(prev.downloadProgress + Math.random() * 20, 90)
        }))
      }, 500)

      const result = await downloadVideo(currentUrl)
      
      clearInterval(progressInterval)
      dispatch({ type: 'SET_DOWNLOAD_PROGRESS', payload: 100 })
      dispatch({ type: 'SET_DOWNLOAD_RESULT', payload: result })
      dispatch({ type: 'SET_PROCESSING', payload: false })
      
      // Add to history
      dispatch({
        type: 'ADD_TO_HISTORY',
        payload: {
          id: Date.now(),
          url: currentUrl,
          platform: detectPlatform(currentUrl),
          timestamp: new Date().toISOString(),
          status: 'success'
        }
      })

    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Download failed. Please try again.' })
      dispatch({ type: 'SET_PROCESSING', payload: false })
      dispatch({ type: 'SET_DOWNLOAD_STATUS', payload: 'error' })
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

  const isDisabled = !isValidUrl() || isProcessing

  return (
    <button
      onClick={handleDownload}
      disabled={isDisabled}
      className={`w-full btn-primary flex items-center justify-center space-x-2 ${
        isDisabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:shadow-lg transform hover:scale-105'
      } transition-all duration-200`}
    >
      {isProcessing ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          <span>Download Video</span>
        </>
      )}
    </button>
  )
}

export default DownloadButton 