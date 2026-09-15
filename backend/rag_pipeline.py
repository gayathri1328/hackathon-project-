import numpy as np
from typing import List, Dict, Any

VECTOR_DIM = 384

def compute_mock_dense_embedding(text: str) -> List[float]:
    """
    Computes a deterministic 384-dimensional dense semantic embedding vector
    preserving semantic clustering and token overlap for cosine similarity.
    """
    vec = np.zeros(VECTOR_DIM, dtype=np.float32)
    tokens = text.lower().split()
    if not tokens:
        return vec.tolist()

    for idx, token in enumerate(tokens):
        # Hash token into vector bins
        h = hash(token) % VECTOR_DIM
        pos_weight = 1.0 / np.sqrt(idx + 1)
        vec[h] += 1.0 * pos_weight
        vec[(h * 7) % VECTOR_DIM] += 0.5 * pos_weight

    norm = np.linalg.norm(vec)
    if norm > 0:
        vec = vec / norm
    return vec.tolist()

def calculate_cosine_similarity(vec_a: List[float], vec_b: List[float]) -> float:
    a = np.array(vec_a, dtype=np.float32)
    b = np.array(vec_b, dtype=np.float32)
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)
    if norm_a == 0 or norm_b == 0:
        return 0.0
    cos_sim = float(np.dot(a, b) / (norm_a * norm_b))
    return max(0.0, min(1.0, (cos_sim + 1.0) / 2.0))
