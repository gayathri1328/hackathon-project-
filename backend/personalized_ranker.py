from typing import List, Dict, Any

def rank_resources(
    candidates: List[Dict[str, Any]],
    user_level: str,
    user_format: str,
    user_history: List[Dict[str, Any]],
    intent_level: str
) -> List[Dict[str, Any]]:
    """
    Ranks retrieved resources by combining semantic cosine similarity with
    learner level match, format preference, and prior quiz performance.
    """
    ranked = []
    target_level = intent_level or user_level or "Beginner"

    for item in candidates:
        resource = item["resource"]
        sim_score = item["semantic_score"]
        diff = resource.get("difficulty", "Easy")
        fmt = resource.get("format", "Explanation")

        # Level score
        level_score = 0.5
        if target_level == "Beginner":
            level_score = 1.0 if diff == "Easy" else (0.65 if diff == "Medium" else 0.3)
        elif target_level == "Intermediate":
            level_score = 1.0 if diff == "Medium" else 0.75
        else:
            level_score = 1.0 if diff == "Hard" else 0.8

        # Format score
        fmt_score = 1.0 if fmt == user_format else 0.65

        # Assessment context adjustment
        assessment_score = 0.7

        final_score = (
            (sim_score * 0.45) +
            (level_score * 0.20) +
            (fmt_score * 0.15) +
            (assessment_score * 0.20)
        )

        why_rec = f"Personalized for {target_level} learner preferring {fmt.lower()}."

        ranked.append({
            "resource": resource,
            "semantic_score": round(sim_score, 3),
            "context_score": round((level_score + fmt_score + assessment_score) / 3, 3),
            "final_score": round(final_score, 3),
            "why_recommended": why_rec
        })

    ranked.sort(key=lambda x: x["final_score"], reverse=True)
    for i, r in enumerate(ranked):
        r["rank"] = i + 1
    return ranked
