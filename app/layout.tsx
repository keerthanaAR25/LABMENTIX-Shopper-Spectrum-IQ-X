import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shopper Spectrum IQ X - AI Customer Intelligence',
  description: 'AI-Powered Customer Segmentation & Product Recommendation System',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#7c3aed',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md shadow-sm">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="gradient-primary w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold">
                S
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Shopper Spectrum IQ X
              </h1>
            </div>
            <div className="flex gap-6">
              <a href="/" className="text-gray-700 hover:text-purple-600 font-medium transition">
                Home
              </a>
              <a href="/segmentation" className="text-gray-700 hover:text-purple-600 font-medium transition">
                Segmentation
              </a>
              <a href="/recommendation" className="text-gray-700 hover:text-purple-600 font-medium transition">
                Recommendation
              </a>
            </div>
          </nav>
        </header>

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="border-t border-gray-200 bg-white/50 backdrop-blur py-8 mt-16">
          <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
            <p>© 2024 Shopper Spectrum IQ X. AI-Powered Customer Intelligence Platform.</p>
            <p className="text-sm mt-2">Built with Next.js, React, and Machine Learning</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
