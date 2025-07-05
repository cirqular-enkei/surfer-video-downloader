import React, { useState, useEffect } from 'react'
import { Link, Globe } from 'lucide-react'
import { useApp } from '../context/AppContext'

const UrlInput = ({ onUrlSubmit, isLoading }) => {
  const { currentUrl, dispatch } = useApp()
  const [isValid, setIsValid] = useState(true)
  const [platform, setPlatform] = useState('')
  const [error, setError] = useState('')

  const detectPlatform = (url) => {
    if (!url) return ''
    
    const urlLower = url.toLowerCase()
    
    if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
      return 'youtube'
    } else if (urlLower.includes('twitter.com') || urlLower.includes('x.com')) {
      return 'twitter'
    } else if (urlLower.includes('instagram.com')) {
      return 'instagram'
    } else if (urlLower.includes('tiktok.com')) {
      return 'tiktok'
    }
    
    return 'unknown'
  }

  const validateUrl = (url) => {
    try {
      const urlObj = new URL(url)
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
    } catch {
      return false
    }
  }

  useEffect(() => {
    const detectedPlatform = detectPlatform(currentUrl)
    setPlatform(detectedPlatform)
    setError('')
  }, [currentUrl])

  const handleUrlChange = (e) => {
    const url = e.target.value
    dispatch({ type: 'SET_URL', payload: url })
    
    const valid = validateUrl(url)
    setIsValid(valid)
    
    if (valid) {
      const detectedPlatform = detectPlatform(url)
      setPlatform(detectedPlatform)
    } else {
      setPlatform('')
    }
  }

  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData('text')
    if (pastedText && validateUrl(pastedText)) {
      dispatch({ type: 'SET_URL', payload: pastedText })
      setIsValid(true)
      setPlatform(detectPlatform(pastedText))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!currentUrl.trim()) {
      setError('Please enter a URL')
      return
    }

    if (!validateUrl(currentUrl)) {
      setError('Please enter a valid URL')
      return
    }

    if (platform === 'unknown') {
      setError('Unsupported platform. Please provide a valid YouTube, Twitter, Instagram, or TikTok URL.')
      return
    }

    setError('')
    onUrlSubmit(currentUrl, platform)
  }

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'youtube':
        return '🔴'
      case 'twitter':
        return '🐦'
      case 'instagram':
        return '📷'
      case 'tiktok':
        return '🎵'
      default:
        return '❓'
    }
  }

  const getPlatformName = (platform) => {
    switch (platform) {
      case 'youtube':
        return 'YouTube'
      case 'twitter':
        return 'Twitter/X'
      case 'instagram':
        return 'Instagram'
      case 'tiktok':
        return 'TikTok'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            Video URL
          </label>
          <div className="relative">
            <input
              type="url"
              id="url"
              value={currentUrl}
              onChange={handleUrlChange}
              onPaste={handlePaste}
              placeholder="Paste a YouTube, Twitter, Instagram, or TikTok URL here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            {platform && platform !== 'unknown' && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 bg-gray-100 px-2 py-1 rounded">
                <span>{getPlatformIcon(platform)}</span>
                <span className="text-sm text-gray-600">{getPlatformName(platform)}</span>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Supported Platforms</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <span>🔴</span>
              <span>YouTube</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🐦</span>
              <span>Twitter/X</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📷</span>
              <span>Instagram</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🎵</span>
              <span>TikTok</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !currentUrl.trim() || platform === 'unknown'}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing...</span>
            </div>
          ) : (
            'Download Video'
          )}
        </button>
      </form>
    </div>
  )
}

export default UrlInput 