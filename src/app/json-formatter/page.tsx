"use client"
import { useState } from "react"

export default function JsonFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")

  const format = () => {
    try { setOutput(JSON.stringify(JSON.parse(input), null, 2)); setError("") }
    catch (e: any) { setError(e.message); setOutput("") }
  }
  const minify = () => {
    try { setOutput(JSON.stringify(JSON.parse(input))); setError("") }
    catch (e: any) { setError(e.message); setOutput("") }
  }
  const validate = () => {
    try { JSON.parse(input); setError(""); setOutput("Valid JSON!") }
    catch (e: any) { setError("Invalid: " + e.message); setOutput("") }
  }

  return (
    <div>
      <a href="/" className="text-blue-400 hover:text-blue-300 mb-6 inline-block">&larr; Back to DevTools Hub</a>
      <h1 className="text-3xl font-bold mb-2 text-white">JSON Formatter</h1>
      <p className="text-gray-400 mb-6">Format, minify, and validate JSON data instantly.</p>
      <div className="flex gap-3 mb-4">
        <button onClick={format} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium">Format</button>
        <button onClick={minify} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-medium">Minify</button>
        <button onClick={validate} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-medium">Validate</button>
      </div>
      {error && <div className="text-red-400 mb-4 p-3 bg-red-900/30 rounded">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste JSON here..." className="w-full h-80 p-4 bg-gray-800 border border-gray-700 rounded text-gray-200 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
        <textarea value={output} readOnly placeholder="Output will appear here..." className="w-full h-80 p-4 bg-gray-800 border border-gray-700 rounded text-gray-200 font-mono text-sm resize-none" />
      </div>
    </div>
  )
}
