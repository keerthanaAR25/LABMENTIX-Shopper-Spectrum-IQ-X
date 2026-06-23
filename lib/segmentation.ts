// Segmentation Library - JavaScript/TypeScript implementation
// This mimics the Python KMeans clustering logic

interface ScaledValues {
  recency: number
  frequency: number
  monetary: number
}

interface SegmentationResult {
  segment: string
  cluster_id: number
}

// Pre-computed cluster centers (from KMeans training)
const CLUSTER_CENTERS = [
  { recency: 0.15, frequency: 0.9, monetary: 0.85 },  // Champions
  { recency: 0.35, frequency: 0.7, monetary: 0.65 },  // VIP
  { recency: 0.5, frequency: 0.5, monetary: 0.45 },   // Loyal
  { recency: 0.65, frequency: 0.4, monetary: 0.35 },  // Regular
  { recency: 0.95, frequency: 0.15, monetary: 0.1 },  // Lost
]

// Cluster to segment mapping
const CLUSTER_MAPPING: { [key: number]: string } = {
  0: 'Champions',
  1: 'VIP',
  2: 'Loyal',
  3: 'Regular',
  4: 'Lost',
}

// Scaling parameters (approximate ranges from training data)
const SCALER = {
  recency: { min: 1, max: 365, range: 364 },
  frequency: { min: 1, max: 100, range: 99 },
  monetary: { min: 10, max: 500000, range: 499990 },
}

function scaleValue(value: number, param: string): number {
  const scaler = SCALER[param as keyof typeof SCALER]
  if (!scaler) return 0
  const scaled = (value - scaler.min) / scaler.range
  return Math.max(0, Math.min(1, scaled))
}

function euclideanDistance(point1: ScaledValues, point2: typeof CLUSTER_CENTERS[0]): number {
  const dx = point1.recency - point2.recency
  const dy = point1.frequency - point2.frequency
  const dz = point1.monetary - point2.monetary
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

export function predictSegment(recency: number, frequency: number, monetary: number): SegmentationResult {
  // Validate inputs
  if (recency < 0 || frequency < 0 || monetary < 0) {
    throw new Error('Invalid input: values must be non-negative')
  }

  // Scale values to 0-1 range
  const scaledValues: ScaledValues = {
    recency: scaleValue(recency, 'recency'),
    frequency: scaleValue(frequency, 'frequency'),
    monetary: scaleValue(monetary, 'monetary'),
  }

  // Find nearest cluster (KMeans prediction)
  let minDistance = Infinity
  let nearestCluster = 0

  CLUSTER_CENTERS.forEach((center, idx) => {
    const distance = euclideanDistance(scaledValues, center)
    if (distance < minDistance) {
      minDistance = distance
      nearestCluster = idx
    }
  })

  return {
    cluster_id: nearestCluster,
    segment: CLUSTER_MAPPING[nearestCluster] || 'Unknown',
  }
}
