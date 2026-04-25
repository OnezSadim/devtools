'use client'

import { useState } from 'react'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function FormPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    const payload: Record<string, string> = {}
    formData.forEach((value, key) => {
      payload[key] = String(value)
    })

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Verzenden mislukt (${res.status})`)
      }
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Onbekende fout')
    }
  }

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-900 border border-green-500/40 rounded-xl p-8 text-center">
          <h1 className="text-2xl font-bold text-green-400 mb-2">Bedankt!</h1>
          <p className="text-gray-300">Je antwoorden zijn ontvangen.</p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm"
          >
            Nog een antwoord versturen
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Aanmeldformulier
        </h1>
        <p className="text-gray-400">
          Vul het formulier in. Geen account of login nodig &mdash; je antwoorden worden direct doorgestuurd.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <Field label="Naam" name="naam" required />
        <Field label="E-mailadres" name="email" type="email" required />
        <Field label="Telefoonnummer" name="telefoon" type="tel" />
        <Field label="Onderwerp" name="onderwerp" />

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Bericht <span className="text-red-400">*</span>
          </label>
          <textarea
            name="bericht"
            required
            rows={6}
            className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Hoe heb je ons gevonden?</label>
          <select
            name="bron"
            defaultValue=""
            className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:border-blue-500 focus:outline-none"
          >
            <option value="" disabled>Kies een optie</option>
            <option value="zoekmachine">Via een zoekmachine</option>
            <option value="social">Social media</option>
            <option value="vriend">Via vrienden / kennissen</option>
            <option value="anders">Anders</option>
          </select>
        </div>

        <label className="flex items-start gap-2 text-sm text-gray-300">
          <input type="checkbox" name="akkoord" value="ja" required className="mt-1" />
          <span>Ik ga akkoord met het verwerken van bovenstaande gegevens.</span>
        </label>

        {status === 'error' && (
          <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors"
        >
          {status === 'sending' ? 'Versturen…' : 'Verstuur'}
        </button>
      </form>
    </div>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:border-blue-500 focus:outline-none"
      />
    </div>
  )
}
