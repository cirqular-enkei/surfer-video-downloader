import React from 'react'
import { 
  Zap, 
  Shield, 
  Globe, 
  Smartphone, 
  Clock, 
  Download,
  Users,
  Star
} from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Download videos in seconds with our optimized servers'
    },
    {
      icon: Shield,
      title: '100% Safe',
      description: 'No malware, no ads, no registration required'
    },
    {
      icon: Globe,
      title: 'Multiple Platforms',
      description: 'Support for YouTube, Twitter, Instagram, TikTok and more'
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Works perfectly on all devices and screen sizes'
    },
    {
      icon: Clock,
      title: '24/7 Available',
      description: 'Download videos anytime, anywhere, no restrictions'
    },
    {
      icon: Download,
      title: 'High Quality',
      description: 'Download videos in the best available quality'
    },
    {
      icon: Users,
      title: 'Free Forever',
      description: 'No hidden costs, completely free to use'
    },
    {
      icon: Star,
      title: 'Easy to Use',
      description: 'Simple and intuitive interface for everyone'
    }
  ]

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Surfer?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The best video downloader with powerful features and zero compromises
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features 