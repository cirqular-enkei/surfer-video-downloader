import React, { createContext, useContext, useReducer } from 'react'

const AppContext = createContext()

// Export the context for direct access if needed
export { AppContext }

const initialState = {
  recentDownloads: []
}

const appReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DOWNLOAD':
      return {
        ...state,
        recentDownloads: [action.payload, ...state.recentDownloads.slice(0, 9)] // Keep only 10 most recent
      }
    case 'CLEAR_DOWNLOADS':
      return {
        ...state,
        recentDownloads: []
      }
    default:
      return state
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
} 