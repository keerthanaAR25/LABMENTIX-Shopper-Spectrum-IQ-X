'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-primary text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Shopper Spectrum IQ X</h1>
          <p className="text-xl text-white/90 mb-8">
            AI-Powered Customer Segmentation & Product Recommendation System
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/segmentation" className="btn-primary bg-white text-purple-600">
              Try Segmentation
            </Link>
            <Link href="/recommendation" className="btn-secondary border-white text-white">
              Get Recommendations
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="section-title text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Customer Segmentation',
              description: 'RFM-based analysis with 5 distinct customer segments using KMeans clustering',
              icon: '📊',
            },
            {
              title: 'Product Recommendations',
              description: 'Collaborative filtering to recommend 5 similar products based on user preferences',
              icon: '🎯',
            },
            {
              title: 'Real-time Predictions',
              description: 'Instant predictions with machine learning models optimized for speed and accuracy',
              icon: '⚡',
            },
          ].map((feature, idx) => (
            <div key={idx} className="card">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Segments Section */}
      <section className="bg-white/50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-12">5 Customer Segments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { name: 'Champions', color: 'from-yellow-400 to-yellow-600', icon: '⭐⭐⭐⭐⭐' },
              { name: 'VIP', color: 'from-purple-400 to-purple-600', icon: '⭐⭐⭐⭐' },
              { name: 'Loyal', color: 'from-blue-400 to-blue-600', icon: '⭐⭐⭐' },
              { name: 'Regular', color: 'from-green-400 to-green-600', icon: '⭐⭐' },
              { name: 'Lost', color: 'from-gray-400 to-gray-600', icon: '⭐' },
            ].map((seg, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${seg.color} rounded-lg p-4 text-white text-center`}>
                <div className="text-2xl mb-2">{seg.icon}</div>
                <p className="font-bold">{seg.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="section-title text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '1',
              title: 'Input Customer Data',
              description: 'Enter Recency (days), Frequency (purchases), and Monetary (spending) metrics',
            },
            {
              step: '2',
              title: 'ML Analysis',
              description: 'Advanced KMeans clustering analyzes patterns and predicts customer segment',
            },
            {
              step: '3',
              title: 'Get Insights',
              description: 'Receive personalized recommendations and actionable business insights',
            },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="gradient-primary w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-accent text-white py-16 px-6 mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Unlock Customer Intelligence?</h2>
          <p className="text-lg mb-8 text-white/90">
            Start analyzing your customers with AI-powered insights today
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/segmentation" className="btn-primary bg-white text-pink-600">
              Start Analyzing
            </Link>
            <Link href="/recommendation" className="btn-secondary border-white text-white">
              View Recommendations
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
