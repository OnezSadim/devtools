"use client"
import { useState } from "react"

export default function HashGenerator() {
  const [input, setInput] = useState("")
  const [hashes, setHashes] = useState<Record<string,string>>({})

  const generate = async () => {
    const encoder = new TextEncoder()
    const data = encoder.encode(input)
    const algos = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"]
    const results: Record<string,string> = {}
    for (const algo of algos) {
      const hash = await crypto.subtle.digest(algo, data)
      results[algo] = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("")
    }
    setHashes(results)
  }

  const copy = (text: string) => navigator.clipboard.writeText(text)

  return (
    <div>
      <a href="/" className="text-blue-400 hover:text-blue-300 mb-6 inline-block">&larr; Back to DevTools Hub</a>
      <h1 className="text-3xl font-bold mb-2 text-white">Hash Generator</h1>
      <p className="text-gray-400 mb-6">Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes.</p>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text to hash..." className="w-full h-32 p-4 bg-gray-800 border border-gray-700 rounded text-gray-200 font-mono text-sm resize-none focus:outline-none focus:border-blue-500 mb-4" />
      <button onClick={generate} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium mb-6">Generate Hashes</button>
      {Object.entries(hashes).length > 0 && (
        <div className="space-y-3">
          {Object.entries(hashes).map(([algo, hash]) => (
            <div key={algo} className="bg-gray-800 border border-gray-700 rounded p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-blue-400 text-sm font-medium">{algo}</span>
                <button onClick={() => copy(hash)} className="text-xs text-gray-400 hover:text-white">Copy</button>
              </div>
              <code className="text-gray-300 text-xs break-all">{hash}</code>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
