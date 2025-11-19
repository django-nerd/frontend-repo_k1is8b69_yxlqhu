import React, { useRef } from 'react'
import Hero from './components/Hero'
import Catalog from './components/Catalog'
import LeadForm from './components/LeadForm'

function App() {
  const leadRef = useRef(null)
  const handleCTA = () => {
    leadRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white">
      <Hero onCTA={handleCTA} />
      <div className="relative -mt-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur">
            <Catalog />
          </div>
        </div>
      </div>
      <div ref={leadRef}>
        <LeadForm />
      </div>
      <footer className="text-center text-blue-200/70 py-10">DreamNest • Interior & Real-estate quotations</footer>
    </div>
  )
}

export default App
