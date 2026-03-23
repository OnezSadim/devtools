"use client"
import { useState } from "react"

export default function Base64Tool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState<"encode"|"decode">("encode")

  const process = () => {
    try {
      if (mode === "encode") setOutput(btoa(unescape(encodeURIComponent(input))))
      else setOutput(decodeURIComponent(escape(atob(input))))
    } catch { setOutput("Error: Invalid input for " + mode) }
  }

  return (
    <div>
      <a href="/" className="text-blue-400 hover:text-blue-300 mb-6 inline-block">&larr; Back to DevTools Hub</a>
      <h1 className="text-3xl font-bold mb-2 text-white">Base64 Encoder / Decoder</h1>
      <p className="text-gray-400 mb-6">Encode or decode Base64 strings instantly.</p>
      <div className="flex gap-3 mb-4">
        <button onClick={() => setMode("encode")} className={`px-4 py-2 rounded font-medium ${mode==="encode" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>Encode</button>
        <button onClick={() => setMode("decode")} className={`px-4 py-2 rounded font-medium ${mode==="decode" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>Decode</button>
        <button onClick={process} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-medium">Go</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text..." className="w-full h-64 p-4 bg-gray-800 border border-gray-700 rounded text-gray-200 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
        <textarea value={output} readOnly placeholder="Result..." className="w-full h-64 p-4 bg-gray-800 border border-gray-700 rounded text-gray-200 font-mono text-sm resize-none" />
      </div>
    </div>
  )
}
