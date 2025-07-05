import React from 'react'
import { Waves, PlayCircle } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-gradient-to-b from-white/80 to-white/30 backdrop-blur-md border-b border-white/30 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <Waves className="text-blue-600 drop-shadow-md" size={28} />
              <span className="text-2xl font-extrabold text-blue-700 tracking-tight drop-shadow-md">Surfer</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-8">
            <a 
              href="#features"
              className="text-base font-semibold text-blue-700 hover:text-blue-900 transition-colors duration-150 drop-shadow-sm"
            >
              Features
            </a>
            <a 
              href="#how-it-works"
              className="text-base font-semibold text-blue-700 hover:text-blue-900 transition-colors duration-150 drop-shadow-sm"
            >
              How it Works
            </a>
            <a 
              href="#faq"
              className="text-base font-semibold text-blue-700 hover:text-blue-900 transition-colors duration-150 drop-shadow-sm"
            >
              FAQ
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header 