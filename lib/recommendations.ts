// Recommendations Library - JavaScript/TypeScript implementation
// This mimics the Python collaborative filtering logic

interface SimilarityMap {
  [key: string]: { [key: string]: number }
}

// Product catalog
const PRODUCTS = [
  'GREEN VINTAGE SPOT BEAKER',
  'BLUE VINTAGE SPOT BEAKER',
  'PINK VINTAGE SPOT BEAKER',
  'POTTING SHED CANDLE CITRONELLA',
  'POTTING SHED ROSE CANDLE',
  'PANTRY CHOPPING BOARD',
  'CERAMIC BOWL SET',
  'VINTAGE GLASS JAR',
  'MODERN VASE',
  'DECORATIVE PLATE',
]

// Pre-computed similarity matrix (collaborative filtering results)
const SIMILARITY_MATRIX: SimilarityMap = {
  'GREEN VINTAGE SPOT BEAKER': {
    'BLUE VINTAGE SPOT BEAKER': 0.92,
    'PINK VINTAGE SPOT BEAKER': 0.88,
    'VINTAGE GLASS JAR': 0.76,
    'CERAMIC BOWL SET': 0.65,
    'POTTING SHED CANDLE CITRONELLA': 0.54,
    'POTTING SHED ROSE CANDLE': 0.51,
    'PANTRY CHOPPING BOARD': 0.45,
    'MODERN VASE': 0.42,
    'DECORATIVE PLATE': 0.38,
  },
  'BLUE VINTAGE SPOT BEAKER': {
    'GREEN VINTAGE SPOT BEAKER': 0.92,
    'PINK VINTAGE SPOT BEAKER': 0.85,
    'VINTAGE GLASS JAR': 0.74,
    'CERAMIC BOWL SET': 0.62,
    'POTTING SHED ROSE CANDLE': 0.55,
    'POTTING SHED CANDLE CITRONELLA': 0.52,
    'PANTRY CHOPPING BOARD': 0.43,
    'DECORATIVE PLATE': 0.40,
    'MODERN VASE': 0.39,
  },
  'PINK VINTAGE SPOT BEAKER': {
    'GREEN VINTAGE SPOT BEAKER': 0.88,
    'BLUE VINTAGE SPOT BEAKER': 0.85,
    'VINTAGE GLASS JAR': 0.71,
    'CERAMIC BOWL SET': 0.60,
    'POTTING SHED ROSE CANDLE': 0.53,
    'POTTING SHED CANDLE CITRONELLA': 0.50,
    'DECORATIVE PLATE': 0.42,
    'PANTRY CHOPPING BOARD': 0.41,
    'MODERN VASE': 0.37,
  },
  'POTTING SHED CANDLE CITRONELLA': {
    'POTTING SHED ROSE CANDLE': 0.89,
    'DECORATIVE PLATE': 0.67,
    'MODERN VASE': 0.65,
    'CERAMIC BOWL SET': 0.56,
    'GREEN VINTAGE SPOT BEAKER': 0.54,
    'VINTAGE GLASS JAR': 0.51,
    'BLUE VINTAGE SPOT BEAKER': 0.52,
    'PINK VINTAGE SPOT BEAKER': 0.50,
    'PANTRY CHOPPING BOARD': 0.38,
  },
  'POTTING SHED ROSE CANDLE': {
    'POTTING SHED CANDLE CITRONELLA': 0.89,
    'DECORATIVE PLATE': 0.70,
    'MODERN VASE': 0.68,
    'CERAMIC BOWL SET': 0.58,
    'BLUE VINTAGE SPOT BEAKER': 0.55,
    'VINTAGE GLASS JAR': 0.52,
    'GREEN VINTAGE SPOT BEAKER': 0.51,
    'PINK VINTAGE SPOT BEAKER': 0.53,
    'PANTRY CHOPPING BOARD': 0.40,
  },
  'PANTRY CHOPPING BOARD': {
    'CERAMIC BOWL SET': 0.82,
    'VINTAGE GLASS JAR': 0.71,
    'DECORATIVE PLATE': 0.68,
    'MODERN VASE': 0.62,
    'GREEN VINTAGE SPOT BEAKER': 0.45,
    'BLUE VINTAGE SPOT BEAKER': 0.43,
    'PINK VINTAGE SPOT BEAKER': 0.41,
    'POTTING SHED CANDLE CITRONELLA': 0.38,
    'POTTING SHED ROSE CANDLE': 0.40,
  },
  'CERAMIC BOWL SET': {
    'PANTRY CHOPPING BOARD': 0.82,
    'VINTAGE GLASS JAR': 0.78,
    'DECORATIVE PLATE': 0.72,
    'MODERN VASE': 0.65,
    'GREEN VINTAGE SPOT BEAKER': 0.65,
    'BLUE VINTAGE SPOT BEAKER': 0.62,
    'PINK VINTAGE SPOT BEAKER': 0.60,
    'POTTING SHED ROSE CANDLE': 0.58,
    'POTTING SHED CANDLE CITRONELLA': 0.56,
  },
  'VINTAGE GLASS JAR': {
    'CERAMIC BOWL SET': 0.78,
    'PANTRY CHOPPING BOARD': 0.71,
    'DECORATIVE PLATE': 0.69,
    'MODERN VASE': 0.64,
    'GREEN VINTAGE SPOT BEAKER': 0.76,
    'BLUE VINTAGE SPOT BEAKER': 0.74,
    'PINK VINTAGE SPOT BEAKER': 0.71,
    'POTTING SHED ROSE CANDLE': 0.52,
    'POTTING SHED CANDLE CITRONELLA': 0.51,
  },
  'MODERN VASE': {
    'DECORATIVE PLATE': 0.77,
    'VINTAGE GLASS JAR': 0.64,
    'CERAMIC BOWL SET': 0.65,
    'PANTRY CHOPPING BOARD': 0.62,
    'POTTING SHED ROSE CANDLE': 0.68,
    'POTTING SHED CANDLE CITRONELLA': 0.65,
    'GREEN VINTAGE SPOT BEAKER': 0.42,
    'BLUE VINTAGE SPOT BEAKER': 0.39,
    'PINK VINTAGE SPOT BEAKER': 0.37,
  },
  'DECORATIVE PLATE': {
    'MODERN VASE': 0.77,
    'CERAMIC BOWL SET': 0.72,
    'VINTAGE GLASS JAR': 0.69,
    'PANTRY CHOPPING BOARD': 0.68,
    'POTTING SHED ROSE CANDLE': 0.70,
    'POTTING SHED CANDLE CITRONELLA': 0.67,
    'GREEN VINTAGE SPOT BEAKER': 0.38,
    'BLUE VINTAGE SPOT BEAKER': 0.40,
    'PINK VINTAGE SPOT BEAKER': 0.42,
  },
}

interface RecommendationResult {
  success: boolean
  product?: string
  recommendations?: Array<{ product: string; similarity: number }>
  message?: string
}

export function getRecommendations(
  productName: string,
  topN: number = 5
): RecommendationResult {
  // Normalize product name
  const normalizedName = productName.toUpperCase().trim()

  // Find exact match
  const matchedProduct = PRODUCTS.find((p) => p.toUpperCase() === normalizedName)

  if (!matchedProduct) {
    return {
      success: false,
      message: `Product "${productName}" not found in our catalog. Please check the spelling and try again.`,
    }
  }

  // Get similarities for this product
  const similarities = SIMILARITY_MATRIX[matchedProduct] || {}

  // Sort by similarity and get top N
  const recommendations = Object.entries(similarities)
    .filter(([product]) => product !== matchedProduct)
    .map(([product, similarity]) => ({
      product,
      similarity: Math.min(1, Math.max(0, similarity)), // Clamp to 0-1
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topN)

  return {
    success: true,
    product: matchedProduct,
    recommendations,
  }
}

export function getAvailableProducts(): string[] {
  return PRODUCTS.sort()
}
