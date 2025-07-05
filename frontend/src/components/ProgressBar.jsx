import React from 'react'

const ProgressBar = ({ progress }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-secondary-700">Processing...</span>
        <span className="text-sm font-medium text-primary-600">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-secondary-200 rounded-full h-2 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-xs text-secondary-500 text-center">
        {progress < 30 && "Analyzing video..."}
        {progress >= 30 && progress < 60 && "Downloading video..."}
        {progress >= 60 && progress < 90 && "Processing video..."}
        {progress >= 90 && "Finalizing..."}
      </div>
    </div>
  )
}

export default ProgressBar 