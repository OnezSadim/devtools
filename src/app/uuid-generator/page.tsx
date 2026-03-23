"use client"
import { useState } from "react"

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(5)
  const [uppercase, setUppercase] = useState(false)
  const [noDashes, setNoDashes] = useState(false)

  const generate = () => {
    const results = Array.from({ length: count }, () => {
      let uuid = crypto.randomUUID()
      if (noDashes) uuid = uuid.replace(/-/g, "")
      if (uppercase) uuid = uuid.toUpperCase()
      return uuid
    })
    setUuids(results)
  }

  const copyAll = () => navigator.clipboard.writeText(uuids.join("\n"))
  const copy = (u: string) => navigator.clipboard.writeText(u)

  return (
    <div>
      <a href="/" className="text-blue-400 hover:text-blue-300 mb-6 inline-block">&larr; Back to DevTools Hub</a>
      <h1 className="text-3xl font-bold mb-2 text-white">UUID Generator</h1>
      <p className="text-gray-400 mb-6">Generate random v4 UUIDs instantly.</p>
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <div className="flex items-center gap-2">
          <label className="text-gray-400 text-sm">Count:</label>
          <input type="number" min={1} max={100} value={count} onChange={e => setCount(Math.min(100, Math.max(1, +e.target.value)))} className="w-20 p-2 bg-gray-800 border border-gray-700 rounded text-gray-200 text-sm" />
        </div>
        <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
          <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} className="accent-blue-500" /> Uppercase
        </label>
        <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
          <input type="checkbox" checked={noDashes} onChange={e => setNoDashes(e.target.checked)} className="accent-blue-500" /> No dashes
        </label>
        <button onClick={generate} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium">Generate</button>
        {uuids.length > 0 && <button onClick={copyAll} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white font-medium">Copy All</button>}
      </div>
      {uuids.length > 0 && (
        <div className="space-y-2">
          {uuids.map((u, i) => (
            <div key={i} onClick={() => copy(u)} className="bg-gray-800 border border-gray-700 rounded p-3 font-mono text-sm text-gray-200 cursor-pointer hover:border-blue-500 transition">{u}</div>
          ))}
        </div>
      )}
    </div>
  )
}
