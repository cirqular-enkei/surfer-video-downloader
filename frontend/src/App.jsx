import React from 'react'
import { AppProvider } from './context/AppContext'
import Header from './components/Header'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <Hero />
        <HowItWorks />
        <Features />
        <FAQ />
        <Footer />
      </div>
    </AppProvider>
  )
}

export default App 