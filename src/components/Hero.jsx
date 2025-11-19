import React from 'react'

export default function Hero({ onCTA }) {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(59,130,246,0.25),transparent_30%),radial-gradient(circle_at_80%_0,rgba(99,102,241,0.25),transparent_30%)]" />
      <div className="relative mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
          DreamNest
        </h1>
        <p className="mt-4 text-lg md:text-xl text-blue-200/90">
          Browse communities, towers and floor plans. Request instant quotations.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={onCTA} className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-600/30 transition">
            Get a quotation
          </button>
          <a href="#catalog" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium backdrop-blur border border-white/10 transition">
            Explore catalog
          </a>
        </div>
      </div>
    </section>
  )
}
