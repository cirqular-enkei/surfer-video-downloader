import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'Is Surfer free to use?',
      answer: 'Yes, Surfer is completely free to use. No registration, no hidden costs, no premium features.'
    },
    {
      question: 'Which platforms are supported?',
      answer: 'We support YouTube, Twitter, Instagram, TikTok, Facebook, LinkedIn, and many more platforms.'
    },
    {
      question: 'Is it safe to download videos?',
      answer: 'Absolutely! We use secure servers and don\'t store any personal data. All downloads are processed safely.'
    },
    {
      question: 'What video quality can I download?',
      answer: 'You can choose from multiple quality options! After pasting a URL, you\'ll see available formats with different resolutions and file sizes. Select the quality that best suits your needs.'
    },
    {
      question: 'Do I need to create an account?',
      answer: 'No account required! Just paste the URL and start downloading immediately.'
    },
    {
      question: 'Can I download on mobile devices?',
      answer: 'Yes! Surfer works perfectly on all devices including smartphones and tablets.'
    },
    {
      question: 'How do I choose video quality?',
      answer: 'After pasting a video URL, you\'ll see a list of available formats. Each option shows the resolution, file size, and format. Click on any option to select it before downloading.'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about Surfer
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-gray-500" size={20} />
                ) : (
                  <ChevronDown className="text-gray-500" size={20} />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ 