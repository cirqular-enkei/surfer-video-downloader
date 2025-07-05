import React from 'react'
import { AlertCircle, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

const ErrorMessage = ({ message }) => {
  const { dispatch } = useApp()

  const handleDismiss = () => {
    dispatch({ type: 'SET_ERROR', payload: null })
  }

  return (
    <div className="bg-error-50 border border-error-200 rounded-lg p-4 animate-fade-in">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-error-400" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-error-800">
            {message}
          </p>
        </div>
        <div className="ml-auto pl-3">
          <button
            onClick={handleDismiss}
            className="inline-flex text-error-400 hover:text-error-600 transition-colors duration-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorMessage 