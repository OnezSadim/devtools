export default function Home() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">DevTools Hub</h1>
        <p className="text-gray-400 text-lg">Free online developer utilities. No signup, no tracking, no BS.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          <a href="/json-formatter" className="block p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500/50 hover:bg-gray-900/80 transition-all group">
            <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">JSON Formatter & Validator</h2>
            <p className="text-gray-400 text-sm mt-2">Format, validate, and minify JSON data instantly</p>
          </a>

          <a href="/base64-tool" className="block p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500/50 hover:bg-gray-900/80 transition-all group">
            <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">Base64 Encoder / Decoder</h2>
            <p className="text-gray-400 text-sm mt-2">Encode and decode Base64 strings</p>
          </a>

          <a href="/url-encoder" className="block p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500/50 hover:bg-gray-900/80 transition-all group">
            <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">URL Encoder / Decoder</h2>
            <p className="text-gray-400 text-sm mt-2">Encode and decode URL components</p>
          </a>

          <a href="/hash-generator" className="block p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500/50 hover:bg-gray-900/80 transition-all group">
            <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">Hash Generator</h2>
            <p className="text-gray-400 text-sm mt-2">Generate MD5, SHA-1, SHA-256, SHA-512 hashes</p>
          </a>

          <a href="/uuid-generator" className="block p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500/50 hover:bg-gray-900/80 transition-all group">
            <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">UUID Generator</h2>
            <p className="text-gray-400 text-sm mt-2">Generate random UUIDs (v4)</p>
          </a>

          <a href="/regex-tester" className="block p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500/50 hover:bg-gray-900/80 transition-all group">
            <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">Regex Tester</h2>
            <p className="text-gray-400 text-sm mt-2">Test regular expressions with live matching</p>
          </a>
      </div>
    </div>
  )
}
