import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DevTools Hub - Free Online Developer Utilities',
  description: 'Free online developer tools: JSON formatter, Base64 encoder/decoder, URL encoder, Hash generator, UUID generator, Regex tester. No signup required.',
  keywords: 'developer tools, json formatter, base64 encoder, url encoder, hash generator, uuid generator, regex tester, online tools, free tools',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 min-h-screen">
        <nav className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">DevTools Hub</a>
            <span className="text-xs text-gray-500">Free Developer Utilities</span>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-gray-800 mt-16 py-6 text-center text-gray-500 text-sm">
          DevTools Hub &mdash; Free tools for developers. No signup, no tracking.
        </footer>
      </body>
    </html>
  )
}
