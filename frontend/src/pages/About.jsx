import React from 'react'
import { Shield, Zap, Globe, Heart } from 'lucide-react'

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-4">
          About <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">Surfer</span>
        </h1>
        <p className="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto">
          The fastest and most reliable way to download videos from your favorite social media platforms.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900">Lightning Fast</h3>
          </div>
          <p className="text-secondary-600">
            Download videos in seconds with our optimized processing pipeline. No waiting, no buffering.
          </p>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-success-600" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900">Secure & Private</h3>
          </div>
          <p className="text-secondary-600">
            Your privacy is our priority. We don't store your videos or personal data. Downloads are processed securely.
          </p>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-secondary-600" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900">Multi-Platform</h3>
          </div>
          <p className="text-secondary-600">
            Support for Twitter, Instagram, and TikTok. More platforms coming soon!
          </p>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-error-100 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-error-600" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900">Free Forever</h3>
          </div>
          <p className="text-secondary-600">
            Completely free to use. No hidden fees, no premium tiers, no limitations.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="card mb-12">
        <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className="font-semibold text-secondary-900 mb-2">Paste URL</h3>
            <p className="text-sm text-secondary-600">
              Copy and paste any video URL from Twitter, Instagram, or TikTok
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className="font-semibold text-secondary-900 mb-2">Process</h3>
            <p className="text-sm text-secondary-600">
              Our system analyzes and processes the video for download
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className="font-semibold text-secondary-900 mb-2">Download</h3>
            <p className="text-sm text-secondary-600">
              Click download and save your video to your device
            </p>
          </div>
        </div>
      </div>

      {/* Legal Notice */}
      <div className="card">
        <h2 className="text-xl font-semibold text-secondary-900 mb-4">
          Legal Notice
        </h2>
        <div className="space-y-4 text-sm text-secondary-600">
          <p>
            Surfer is designed for personal use and educational purposes. Users are responsible for ensuring they have the right to download and use the content they access through our service.
          </p>
          <p>
            We respect copyright laws and intellectual property rights. Please only download content that you own or have permission to download.
          </p>
          <p>
            By using Surfer, you agree to use the service responsibly and in compliance with applicable laws and terms of service of the respective platforms.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About 