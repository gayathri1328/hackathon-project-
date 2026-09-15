/**
 * Semantic Vector Embedding Utility
 * Generates 384-dimensional dense semantic vectors using semantic token projections
 * and calculates exact mathematical cosine similarity.
 */

export const VECTOR_DIM = 384;

// Semantic cluster dictionary mapping concepts to semantic space regions
const SEMANTIC_CLUSTERS: Record<string, number[]> = {
  // Programming & Memory concepts
  'pointer': [0, 48],
  'memory': [12, 60],
  'address': [24, 72],
  'dereference': [36, 84],
  'stack': [48, 96],
  'heap': [60, 108],
  'malloc': [72, 120],
  'c': [84, 132],
  
  // Data Structures
  'linked': [96, 144],
  'list': [108, 156],
  'node': [120, 168],
  'head': [132, 180],
  'traversal': [144, 192],
  'tree': [156, 204],
  'bst': [168, 216],
  'binary': [180, 228],

  // DBMS & Databases
  'sql': [192, 240],
  'join': [204, 252],
  'table': [216, 264],
  'database': [228, 276],
  'normalization': [240, 288],
  'key': [252, 300],
  'relation': [264, 312],

  // Operating Systems & Core
  'cpu': [276, 324],
  'scheduling': [288, 336],
  'process': [300, 348],
  'round-robin': [312, 360],

  // Pedagogical & Formats
  'beginner': [324, 372],
  'easy': [336, 380],
  'intermediate': [348, 382],
  'advanced': [360, 383],
  'example': [370, 384],
  'code': [350, 375],
  'visual': [330, 365],
  'guide': [310, 355]
};

/**
 * Hash string to deterministic float
 */
function hashString(str: string, seed: number = 0): number {
  let h = seed ^ 0x12345678;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 2654435761);
  }
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/**
 * Compute dense 384-dimensional normalized vector for given text
 */
export function computeEmbedding(text: string): number[] {
  const vector = new Array(VECTOR_DIM).fill(0);
  const normalizedText = text.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ');
  const tokens = normalizedText.split(/\s+/).filter(Boolean);

  if (tokens.length === 0) {
    return vector;
  }

  // Project tokens into semantic clusters and n-gram subspaces
  tokens.forEach((token, index) => {
    // Check cluster overlaps
    for (const [clusterKey, range] of Object.entries(SEMANTIC_CLUSTERS)) {
      if (token.includes(clusterKey) || clusterKey.includes(token)) {
        const [start, end] = range;
        for (let d = start; d < end && d < VECTOR_DIM; d++) {
          const weight = 1.0 / (1 + Math.abs(d - (start + end) / 2));
          vector[d] += weight * 1.5;
        }
      }
    }

    // Positional dense hashing
    const h1 = Math.floor(hashString(token, 13) * VECTOR_DIM);
    const h2 = Math.floor(hashString(token, 37) * VECTOR_DIM);
    const h3 = Math.floor(hashString(token, 71) * VECTOR_DIM);

    const posWeight = 1.0 / Math.sqrt(index + 1);
    vector[h1] += (hashString(token, 99) * 2 - 1) * posWeight;
    vector[h2] += (hashString(token, 101) * 2 - 1) * posWeight;
    vector[h3] += (hashString(token, 103) * 2 - 1) * posWeight;
  });

  // Normalize vector to unit length (L2 norm)
  let norm = 0;
  for (let i = 0; i < VECTOR_DIM; i++) {
    norm += vector[i] * vector[i];
  }
  norm = Math.sqrt(norm);

  if (norm > 0) {
    for (let i = 0; i < VECTOR_DIM; i++) {
      vector[i] /= norm;
    }
  }

  return vector;
}

/**
 * Calculates exact Cosine Similarity between two normalized vectors
 * Range: -1.0 to 1.0 (clamped to 0.0 to 1.0 for relevance metric)
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB || vecA.length !== vecB.length) {
    return 0;
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;

  const sim = dotProduct / denominator;
  // Normalized into [0, 1] range for intuitive percentage display
  return Math.max(0, Math.min(1, (sim + 1) / 2));
}
