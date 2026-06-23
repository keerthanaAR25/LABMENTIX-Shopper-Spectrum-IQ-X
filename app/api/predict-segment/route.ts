import { NextRequest, NextResponse } from 'next/server'
import { predictSegment } from '@/lib/segmentation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { recency, frequency, monetary } = body

    if (typeof recency !== 'number' || typeof frequency !== 'number' || typeof monetary !== 'number') {
      return NextResponse.json(
        { error: 'Invalid input parameters' },
        { status: 400 }
      )
    }

    const result = predictSegment(recency, frequency, monetary)

    return NextResponse.json(result, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Prediction error:', error)
    return NextResponse.json(
      { error: 'Failed to make prediction' },
      { status: 500 }
    )
  }
}
