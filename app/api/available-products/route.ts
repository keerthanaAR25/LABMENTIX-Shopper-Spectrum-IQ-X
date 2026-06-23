import { NextResponse } from 'next/server'
import { getAvailableProducts } from '@/lib/recommendations'

export async function GET() {
  try {
    const products = getAvailableProducts()

    return NextResponse.json(
      { products },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
