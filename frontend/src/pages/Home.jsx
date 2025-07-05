import React from 'react'
import UrlInput from '../components/UrlInput'
import DownloadButton from '../components/DownloadButton'
import VideoPreview from '../components/VideoPreview'
import ProgressBar from '../components/ProgressBar'
import ErrorMessage from '../components/ErrorMessage'
import DownloadHistory from '../components/DownloadHistory'
import { useApp } from '../context/AppContext'

const Home = () => {
  const { downloadStatus, downloadProgress, downloadResult, error, isProcessing } = useApp()

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-4">
          Download Videos with
          <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent"> Surfer</span>
        </h1>
        <p className="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto">
          Download videos from Twitter, Instagram, and TikTok with just a URL. 
          Fast, secure, and completely free.
        </p>
      </div>

      {/* Main Download Section */}
      <div className="card mb-8 animate-slide-up">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-2">
            Enter Video URL
          </h2>
          <p className="text-secondary-600">
            Paste a link from Twitter, Instagram, or TikTok below
          </p>
        </div>

        <div className="space-y-6">
          <UrlInput />
          <DownloadButton />
        </div>

        {/* Progress and Status */}
        {isProcessing && (
          <div className="mt-6">
            <ProgressBar progress={downloadProgress} />
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-6">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Video Preview */}
        {downloadResult && (
          <div className="mt-6">
            <VideoPreview result={downloadResult} />
          </div>
        )}
      </div>

      {/* Supported Platforms */}
      <div className="card mb-8">
        <h3 className="text-xl font-semibold text-secondary-900 mb-4 text-center">
          Supported Platforms
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </div>
            <h4 className="font-semibold text-secondary-900">Twitter</h4>
            <p className="text-sm text-secondary-600">Download Twitter videos</p>
          </div>
          
          <div className="text-center p-4 rounded-lg bg-pink-50 border border-pink-200">
            <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.059 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <h4 className="font-semibold text-secondary-900">Instagram</h4>
            <p className="text-sm text-secondary-600">Download Instagram videos</p>
          </div>
          
          <div className="text-center p-4 rounded-lg bg-black border border-gray-300">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </div>
            <h4 className="font-semibold text-secondary-900">TikTok</h4>
            <p className="text-sm text-secondary-600">Download TikTok videos</p>
          </div>
        </div>
      </div>

      {/* Download History */}
      <DownloadHistory />
    </div>
  )
}

export default Home 