import React, { useState } from 'react'
import UrlInput from './UrlInput'
import DownloadButton from './DownloadButton'
import ProgressBar from './ProgressBar'
import ErrorMessage from './ErrorMessage'
import VideoPreview from './VideoPreview'
import DownloadHistory from './DownloadHistory'
import { useApp } from '../context/AppContext'

const Home = () => {
  const { state, dispatch } = useApp()
  const [isLoading, setIsLoading] = useState(false)
  const [currentDownload, setCurrentDownload] = useState(null)

  const handleUrlSubmit = async (url, platform) => {
    setIsLoading(true)
    setCurrentDownload(null)
    
    try {
      const response = await fetch('http://localhost:5000/api/v1/download/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url })
      })

      const data = await response.json()

      if (data.success) {
        const download = {
          id: data.data.downloadId,
          url,
          platform,
          status: 'pending',
          progress: 0
        }
        
        setCurrentDownload(download)
        dispatch({ type: 'ADD_DOWNLOAD', payload: download })
        
        // Start polling for status
        pollDownloadStatus(download.id)
      } else {
        dispatch({ 
          type: 'SET_ERROR', 
          payload: data.error || 'Failed to initiate download' 
        })
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Network error. Please try again.' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const pollDownloadStatus = async (downloadId) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/download/status/${downloadId}`)
        const data = await response.json()

        if (data.success) {
          const status = data.data
          
          // Update current download
          setCurrentDownload(prev => prev?.id === downloadId ? { ...prev, ...status } : prev)
          
          // Update in global state
          dispatch({ 
            type: 'UPDATE_DOWNLOAD', 
            payload: { id: downloadId, ...status } 
          })

          // Stop polling if completed or failed
          if (status.status === 'completed' || status.status === 'failed') {
            clearInterval(pollInterval)
          }
        }
      } catch (error) {
        console.error('Error polling download status:', error)
      }
    }, 2000) // Poll every 2 seconds

    // Cleanup after 5 minutes
    setTimeout(() => {
      clearInterval(pollInterval)
    }, 5 * 60 * 1000)
  }

  const handleDownload = async (downloadId) => {
    try {
      window.open(`http://localhost:5000/api/v1/download/${downloadId}`, '_blank')
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to download file' 
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Surfer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Download videos from YouTube, Twitter, Instagram, and TikTok with ease
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* URL Input */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <UrlInput onUrlSubmit={handleUrlSubmit} isLoading={isLoading} />
          </div>

          {/* Current Download Progress */}
          {currentDownload && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Current Download
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">Platform:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {currentDownload.platform}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {currentDownload.status}
                  </span>
                </div>

                <ProgressBar progress={currentDownload.progress} />

                {currentDownload.status === 'completed' && (
                  <div className="flex items-center justify-between">
                    <VideoPreview download={currentDownload} />
                    <DownloadButton 
                      onClick={() => handleDownload(currentDownload.id)}
                      disabled={false}
                    />
                  </div>
                )}

                {currentDownload.status === 'failed' && (
                  <ErrorMessage 
                    message="Download failed. Please try again." 
                    onRetry={() => handleUrlSubmit(currentDownload.url, currentDownload.platform)}
                  />
                )}
              </div>
            </div>
          )}

          {/* Error Display */}
          {state.error && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <ErrorMessage 
                message={state.error} 
                onDismiss={() => dispatch({ type: 'CLEAR_ERROR' })}
              />
            </div>
          )}

          {/* Download History */}
          {state.downloads.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <DownloadHistory 
                downloads={state.downloads}
                onDownload={handleDownload}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home 