'use client'

import { useState } from 'react'

interface Recommendation {
  product: string
  similarity: number
}

interface RecommendationResult {
  success: boolean
  product: string
  recommendations: Recommendation[]
  message?: string
}

export default function RecommendationPage() {
  const [product, setProduct] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<RecommendationResult | null>(null)
  const [error, setError] = useState('')
  const [availableProducts, setAvailableProducts] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const fetchAvailableProducts = async () => {
    try {
      const response = await fetch('/api/available-products')
      if (response.ok) {
        const data = await response.json()
        setAvailableProducts(data.products || [])
      }
    } catch (err) {
      console.error('Failed to fetch products:', err)
    }
  }

  const handleSearch = async () => {
    if (!product.trim()) {
      setError('Please enter a product name')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/get-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: product.trim(), top_n: 5 }),
      })

      if (!response.ok) throw new Error('Recommendation failed')

      const data = await response.json()
      setResult(data)

      if (!data.success) {
        setError(data.message || 'Product not found')
      }
    } catch (err) {
      setError('Error fetching recommendations. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleProductSelect = (selectedProduct: string) => {
    setProduct(selectedProduct)
    setShowSuggestions(false)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="section-title mb-2">Product Recommendations</h1>
      <p className="section-subtitle">
        Get personalized product recommendations using collaborative filtering
      </p>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {/* Search Form */}
        <div className="md:col-span-1">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Search Product</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Product Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={product}
                    onChange={(e) => {
                      setProduct(e.target.value)
                      setShowSuggestions(true)
                      if (!availableProducts.length) {
                        fetchAvailableProducts()
                      }
                    }}
                    onFocus={() => {
                      setShowSuggestions(true)
                      if (!availableProducts.length) {
                        fetchAvailableProducts()
                      }
                    }}
                    placeholder="e.g., GREEN VINTAGE SPOT BEAKER"
                    className="input-field"
                    disabled={loading}
                  />

                  {showSuggestions && availableProducts.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                      {availableProducts
                        .filter((p) => p.toLowerCase().includes(product.toLowerCase()))
                        .map((p) => (
                          <button
                            key={p}
                            onClick={() => handleProductSelect(p)}
                            className="w-full text-left px-4 py-2 hover:bg-purple-50 border-b last:border-b-0"
                          >
                            {p}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleSearch}
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Searching...' : 'Get Recommendations'}
              </button>
            </div>

            {/* Popular Products */}
            <div className="mt-6 pt-6 border-t">
              <p className="font-semibold text-sm mb-3">Popular Products:</p>
              <div className="space-y-2">
                {[
                  'GREEN VINTAGE SPOT BEAKER',
                  'BLUE VINTAGE SPOT BEAKER',
                  'PINK VINTAGE SPOT BEAKER',
                  'POTTING SHED CANDLE CITRONELLA',
                  'POTTING SHED ROSE CANDLE',
                ].map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setProduct(p)
                      setShowSuggestions(false)
                    }}
                    className="w-full text-left text-xs px-3 py-2 bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded transition"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Display */}
        <div className="md:col-span-2">
          {result && result.success ? (
            <div className="space-y-4">
              <div className="card">
                <h2 className="text-2xl font-bold mb-2">
                  Recommendations for: <span className="text-purple-600">{result.product}</span>
                </h2>
                <p className="text-gray-600 mb-6">
                  Found {result.recommendations.length} similar products
                </p>

                <div className="space-y-3">
                  {result.recommendations.map((rec, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-md transition">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{idx + 1}. {rec.product}</p>
                          <p className="text-xs text-gray-500 mt-1">Product Match</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-purple-600">{(rec.similarity * 100).toFixed(1)}%</p>
                          <p className="text-xs text-gray-500">Similarity</p>
                        </div>
                      </div>

                      {/* Similarity Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-blue-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${rec.similarity * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card bg-blue-50 border-blue-200">
                <p className="text-sm text-blue-900">
                  💡 <span className="font-semibold">Tip:</span> These products are similar based on collaborative filtering analysis. Bundle them for better customer satisfaction!
                </p>
              </div>
            </div>
          ) : result && !result.success ? (
            <div className="card text-center py-12 border-red-200 bg-red-50">
              <div className="text-5xl mb-4">❌</div>
              <h3 className="text-xl font-bold text-red-700 mb-2">Product Not Found</h3>
              <p className="text-red-600 mb-4">{result.message}</p>
              <p className="text-sm text-red-600">Try selecting from the popular products on the left or search for a different product name.</p>
            </div>
          ) : (
            <div className="card text-center py-12">
              <div className="text-5xl mb-4">🎯</div>
              <p className="text-gray-600 mb-4">Enter a product name to see recommendations</p>
              <p className="text-sm text-gray-500">Our AI analyzes product similarity to suggest the best matches for your customers</p>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-white/50 rounded-lg p-8 mt-12">
        <h2 className="text-2xl font-bold mb-6">How Product Recommendations Work</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Collaborative Filtering',
              description: 'Analyzes product purchase patterns and customer preferences',
              icon: '🔍',
            },
            {
              title: 'Similarity Scoring',
              description: 'Calculates similarity scores between products based on features',
              icon: '📈',
            },
            {
              title: 'Real-time Results',
              description: 'Get instant recommendations powered by machine learning',
              icon: '⚡',
            },
          ].map((feature, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
