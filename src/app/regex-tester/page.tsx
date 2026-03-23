"use client"
import { useState, useMemo } from "react"

export default function RegexTester() {
  const [pattern, setPattern] = useState("")
  const [flags, setFlags] = useState("g")
  const [testStr, setTestStr] = useState("")
  const [error, setError] = useState("")

  const matches = useMemo(() => {
    if (!pattern) { setError(""); return [] }
    try {
      const re = new RegExp(pattern, flags)
      setError("")
      const results: { match: string; index: number; groups?: Record<string,string> }[] = []
      let m
      if (flags.includes("g")) {
        while ((m = re.exec(testStr)) !== null) {
          results.push({ match: m[0], index: m.index, groups: m.groups })
          if (!m[0]) re.lastIndex++
        }
      } else {
        m = re.exec(testStr)
        if (m) results.push({ match: m[0], index: m.index, groups: m.groups })
      }
      return results
    } catch (e: any) { setError(e.message); return [] }
  }, [pattern, flags, testStr])

  return (
    <div>
      <a href="/" className="text-blue-400 hover:text-blue-300 mb-6 inline-block">&larr; Back to DevTools Hub</a>
      <h1 className="text-3xl font-bold mb-2 text-white">Regex Tester</h1>
      <p className="text-gray-400 mb-6">Test regular expressions with real-time matching.</p>
      <div className="flex gap-3 mb-4">
        <div className="flex-1">
          <label className="text-gray-400 text-xs mb-1 block">Pattern</label>
          <input value={pattern} onChange={e => setPattern(e.target.value)} placeholder="Enter regex pattern..." className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-gray-200 font-mono text-sm focus:outline-none focus:border-blue-500" />
        </div>
        <div className="w-24">
          <label className="text-gray-400 text-xs mb-1 block">Flags</label>
          <input value={flags} onChange={e => setFlags(e.target.value)} className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-gray-200 font-mono text-sm focus:outline-none focus:border-blue-500" />
        </div>
      </div>
      {error && <div className="text-red-400 mb-4 p-3 bg-red-900/30 rounded text-sm">{error}</div>}
      <textarea value={testStr} onChange={e => setTestStr(e.target.value)} placeholder="Enter test string..." className="w-full h-40 p-4 bg-gray-800 border border-gray-700 rounded text-gray-200 font-mono text-sm resize-none focus:outline-none focus:border-blue-500 mb-4" />
      <div className="text-gray-400 text-sm mb-2">{matches.length} match{matches.length !== 1 ? "es" : ""} found</div>
      {matches.length > 0 && (
        <div className="space-y-2">
          {matches.map((m, i) => (
            <div key={i} className="bg-gray-800 border border-gray-700 rounded p-3">
              <span className="text-green-400 font-mono text-sm">"{m.match}"</span>
              <span className="text-gray-500 text-xs ml-3">index: {m.index}</span>
              {m.groups && Object.keys(m.groups).length > 0 && (
                <div className="mt-1 text-xs text-gray-400">Groups: {JSON.stringify(m.groups)}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
