import React, { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function LeadForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', project_id: '', requirement_type: 'Interior' })
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setResult(null)
    try {
      const res = await fetch(`${API_BASE}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const json = await res.json()
      setResult(json)
    } catch (e) {
      setResult({ error: 'Failed to submit lead' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="bg-slate-950 border-t border-white/5">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Request a quotation</h2>
        <p className="text-blue-200/80 mb-6">Enter your details and we will reach out.</p>

        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
          <input className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} required />
          <input className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Phone" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} required />
          <input className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email (optional)" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
          <input className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Project ID (optional)" value={form.project_id} onChange={(e)=>setForm({...form, project_id:e.target.value})} />
          <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.requirement_type} onChange={(e)=>setForm({...form, requirement_type:e.target.value})}>
            <option value="Interior">Interior</option>
            <option value="Full home">Full home</option>
          </select>
          <button disabled={submitting} className="mt-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-medium shadow-lg shadow-blue-600/30 transition">
            {submitting ? 'Submitting…' : 'Submit request'}
          </button>
        </form>

        {result && (
          <div className="mt-4 text-blue-200">
            {result.error ? result.error : `Lead created with id ${result.id}`}
          </div>
        )}
      </div>
    </section>
  )
}
