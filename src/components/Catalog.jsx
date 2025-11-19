import React, { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function Section({ title, children }) {
  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold text-white/90 mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  )
}

export default function Catalog() {
  const [data, setData] = useState({ communities: [], towers: [], flats: [], floorplans: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/catalog`)
        const json = await res.json()
        setData(json)
      } catch (e) {
        console.error('Failed to load catalog', e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div className="text-blue-200">Loading catalog…</div>

  return (
    <section id="catalog" className="relative bg-slate-900 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Catalog</h2>
        <p className="text-blue-200/80">Live data from the backend</p>

        <Section title="Communities">
          {data.communities.map((c) => (
            <div key={c.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-white font-medium">{c.name}</div>
              <div className="text-blue-200 text-sm">{c.city} • Starting ₹{c.starting_price ?? '—'}</div>
            </div>
          ))}
          {data.communities.length === 0 && <div className="text-blue-200">No communities yet</div>}
        </Section>

        <Section title="Towers">
          {data.towers.map((t) => (
            <div key={t.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-white font-medium">{t.name}</div>
              <div className="text-blue-200 text-sm">Community: {t.community_id}</div>
            </div>
          ))}
          {data.towers.length === 0 && <div className="text-blue-200">No towers yet</div>}
        </Section>

        <Section title="Flats">
          {data.flats.map((f) => (
            <div key={f.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-white font-medium">Flat {f.number} • {f.bhk_type}</div>
              <div className="text-blue-200 text-sm">Status: {f.status}</div>
            </div>
          ))}
          {data.flats.length === 0 && <div className="text-blue-200">No flats yet</div>}
        </Section>

        <Section title="Floor Plans">
          {data.floorplans.map((fp) => (
            <div key={fp.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-white font-medium">{fp.bhk_type}</div>
              <div className="text-blue-200 text-sm">Carpet: {fp.carpet_area ?? '—'} sqft</div>
            </div>
          ))}
          {data.floorplans.length === 0 && <div className="text-blue-200">No floor plans yet</div>}
        </Section>
      </div>
    </section>
  )
}
