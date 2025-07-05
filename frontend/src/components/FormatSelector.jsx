import React, { useState, useEffect } from 'react'
import { Download, CheckCircle, AlertCircle, Loader } from 'lucide-react'

const FormatSelector = ({ url, onFormatSelect, selectedFormat, isLoading }) => {
  const [formats, setFormats] = useState([])
  const [loadingFormats, setLoadingFormats] = useState(false)
  const [error, setError] = useState('')

  // Get API URL from environment or default to localhost
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    if (url && url.trim()) {
      fetchFormats()
    }
  }, [url])

  const fetchFormats = async () => {
    setLoadingFormats(true)
    setError('')
    
    try {
      const response = await fetch(`${API_URL}/api/formats?url=${encodeURIComponent(url)}`)
      const data = await response.json()
      
      if (data.success) {
        setFormats(data.formats)
      } else {
        setError(data.error || 'Failed to fetch formats')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoadingFormats(false)
    }
  }

  const handleFormatSelect = (format) => {
    onFormatSelect(format)
  }

  if (loadingFormats) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
        <div className="flex items-center justify-center gap-2 text-white">
          <Loader className="animate-spin" size={20} />
          <span>Loading available formats...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 rounded-lg p-4 flex items-center gap-2">
        <AlertCircle size={20} />
        {error}
      </div>
    )
  }

  if (formats.length === 0) {
    return null
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
      <h3 className="text-lg font-semibold text-white mb-4">Available Formats</h3>
      <div className="max-h-60 overflow-y-auto space-y-2">
        {formats.map((format) => (
          <div
            key={format.id}
            onClick={() => handleFormatSelect(format)}
            className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
              selectedFormat?.id === format.id
                ? 'bg-blue-500 text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-medium">
                  {format.resolution !== 'Unknown' ? format.resolution : format.ext}
                </div>
                <div className="text-sm opacity-80">
                  {format.filesize !== 'Unknown' && `${format.filesize} • `}
                  {format.ext} • {format.info}
                </div>
              </div>
              {selectedFormat?.id === format.id && (
                <CheckCircle size={20} />
              )}
            </div>
          </div>
        ))}
      </div>
      {selectedFormat && (
        <div className="mt-4 p-3 bg-blue-500/20 border border-blue-400/30 rounded-lg">
          <div className="text-white text-sm">
            <strong>Selected:</strong> {selectedFormat.resolution} • {selectedFormat.filesize} • {selectedFormat.ext}
          </div>
        </div>
      )}
    </div>
  )
}

export default FormatSelector 