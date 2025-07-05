import React from 'react'
import { Download, Play, ExternalLink } from 'lucide-react'

const VideoPreview = ({ result }) => {
  const handleDownload = () => {
    if (result.downloadUrl) {
      const link = document.createElement('a')
      link.href = result.downloadUrl
      link.download = result.title || 'video'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size'
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const formatDuration = (seconds) => {
    if (!seconds) return 'Unknown duration'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-success-50 border border-success-200 rounded-lg p-6 animate-fade-in">
      <div className="flex items-start space-x-4">
        {/* Thumbnail */}
        <div className="flex-shrink-0">
          <div className="relative w-24 h-24 bg-secondary-200 rounded-lg overflow-hidden">
            {result.thumbnail ? (
              <img 
                src={result.thumbnail} 
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Play className="w-8 h-8 text-secondary-400" />
              </div>
            )}
          </div>
        </div>

        {/* Video Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">
            {result.title || 'Video Download Ready'}
          </h3>
          
          <div className="space-y-2 text-sm text-secondary-600">
            {result.duration && (
              <p>Duration: {formatDuration(result.duration)}</p>
            )}
            {result.size && (
              <p>Size: {formatFileSize(result.size)}</p>
            )}
            {result.platform && (
              <p>Platform: {result.platform}</p>
            )}
          </div>

          {/* Download Actions */}
          <div className="flex space-x-3 mt-4">
            <button
              onClick={handleDownload}
              className="btn-primary flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Video</span>
            </button>
            
            {result.originalUrl && (
              <a
                href={result.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View Original</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPreview 