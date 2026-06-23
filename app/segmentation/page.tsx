'use client'

import { useState } from 'react'

interface SegmentationResult {
  segment: string
  cluster_id: number
  description: string
  recommendations: string[]
  color: string
}

const SEGMENT_COLORS: { [key: string]: string } = {
  'Champions': 'from-yellow-400 to-yellow-600',
  'VIP': 'from-purple-400 to-purple-600',
  'Loyal': 'from-blue-400 to-blue-600',
  'Regular': 'from-green-400 to-green-600',
  'Lost': 'from-gray-400 to-gray-600',
}

const SEGMENT_DESCRIPTIONS: { [key: string]: string } = {
  'Champions': 'High-value customers with frequent purchases. Offer exclusive rewards and VIP treatment.',
  'VIP': 'Premium spenders with excellent engagement. Provide special benefits and early access.',
  'Loyal': 'Consistent repeat customers. Focus on loyalty programs and repeat purchase incentives.',
  'Regular': 'Average purchasing behavior. Ideal for cross-sell and upsell opportunities.',
  'Lost': 'Inactive customers with low engagement. Target with win-back campaigns and special offers.',
}

export default function SegmentationPage() {
  const [recency, setRecency] = useState('')
  const [frequency, setFrequency] = useState('')
  const [monetary, setMonetary] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SegmentationResult | null>(null)
  const [error, setError] = useState('')

  const handlePredict = async () => {
    if (!recency || !frequency || !monetary) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/predict-segment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recency: parseFloat(recency),
          frequency: parseFloat(frequency),
          monetary: parseFloat(monetary),
        }),
      })

      if (!response.ok) throw new Error('Prediction failed')

      const data = await response.json()
      setResult({
        ...data,
        description: SEGMENT_DESCRIPTIONS[data.segment] || '',
        color: SEGMENT_COLORS[data.segment] || 'from-blue-400 to-blue-600',
      })
    } catch (err) {
      setError('Error making prediction. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="section-title mb-2">Customer Segmentation</h1>
      <p className="section-subtitle">
        Predict customer segments using RFM (Recency, Frequency, Monetary) analysis
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Enter Customer Metrics</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Recency (Days Since Last Purchase)
              </label>
              <input
                type="number"
                value={recency}
                onChange={(e) => setRecency(e.target.value)}
                placeholder="e.g., 30"
                className="input-field"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">How many days since customer's last purchase</p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Frequency (Number of Purchases)
              </label>
              <input
                type="number"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                placeholder="e.g., 15"
                className="input-field"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">Total number of purchases made</p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Monetary (Total Spending)
              </label>
              <input
                type="number"
                value={monetary}
                onChange={(e) => setMonetary(e.target.value)}
                placeholder="e.g., 5000"
                className="input-field"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">Total amount spent by customer</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                {error}
              </div>
            )}

            <button
              onClick={handlePredict}
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Predicting...' : 'Predict Segment'}
            </button>
          </div>

          {/* Example Scenarios */}
          <div className="mt-8 pt-8 border-t">
            <p className="font-semibold mb-3">Quick Examples:</p>
            <button
              onClick={() => {
                setRecency('20')
                setFrequency('35')
                setMonetary('8000')
              }}
              className="w-full text-left px-3 py-2 mb-2 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 rounded text-sm"
            >
              <span className="font-semibold">Champion:</span> Recent, frequent, high spend
            </button>
            <button
              onClick={() => {
                setRecency('300')
                setFrequency('2')
                setMonetary('100')
              }}
              className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded text-sm"
            >
              <span className="font-semibold">Lost:</span> Haven't purchased in long time
            </button>
          </div>
        </div>

        {/* Results Display */}
        <div>
          {result ? (
            <div className={`bg-gradient-to-br ${result.color} rounded-lg p-8 text-white`}>
              <div className="text-6xl mb-4">
                {result.segment === 'Champions' && '⭐⭐⭐⭐⭐'}
                {result.segment === 'VIP' && '⭐⭐⭐⭐'}
                {result.segment === 'Loyal' && '⭐⭐⭐'}
                {result.segment === 'Regular' && '⭐⭐'}
                {result.segment === 'Lost' && '⭐'}
              </div>
              
              <h3 className="text-3xl font-bold mb-2">{result.segment}</h3>
              <p className="text-white/90 mb-6">{result.description}</p>

              <div className="bg-white/20 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold mb-2">Cluster ID: {result.cluster_id}</p>
                <div className="space-y-1 text-sm">
                  <p>Recency: {recency} days</p>
                  <p>Frequency: {frequency} purchases</p>
                  <p>Monetary: ${monetary}</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm font-semibold mb-3">Recommended Actions:</p>
                <ul className="text-sm space-y-2">
                  {SEGMENT_DESCRIPTIONS[result.segment]
                    .split('. ')
                    .filter(s => s.includes('Offer') || s.includes('Provide') || s.includes('Focus') || s.includes('Ideal') || s.includes('Target'))
                    .map((action, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span>→</span>
                        <span>{action.replace('Offer ', '').replace('Provide ', '').replace('Focus on ', '').replace('Ideal for ', '').replace('Target with ', '')}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="card text-center py-12">
              <div className="text-5xl mb-4">📊</div>
              <p className="text-gray-600">Fill in the customer metrics on the left and click "Predict Segment" to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
