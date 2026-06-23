import { NextRequest, NextResponse } from 'next/server'
import { getRecommendations } from '@/lib/recommendations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { product, top_n = 5 } = body

    if (!product || typeof product !== 'string') {
      return NextResponse.json(
        { error: 'Invalid product name' },
        { status: 400 }
      )
    }

    const result = getRecommendations(product.trim(), top_n)

    return NextResponse.json(result, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Recommendation error:', error)
    return NextResponse.json(
      { error: 'Failed to get recommendations' },
      { status: 500 }
    )
  }
}
