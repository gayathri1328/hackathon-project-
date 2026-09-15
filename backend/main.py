import os
import time
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from rag_pipeline import compute_mock_dense_embedding, calculate_cosine_similarity
from personalized_ranker import rank_resources

app = FastAPI(
    title="Fourbidden Logic API",
    description="AI-Powered Personalized Learning Resource Retriever (EDU-06)",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str
    username: Optional[str] = None
    level_override: Optional[str] = None
    format_override: Optional[str] = None

class AssessmentSubmission(BaseModel):
    username: str
    topic: str
    score: int
    total: int

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "Fourbidden Logic RAG API", "version": "1.0.0"}

@app.post("/api/rag/understand")
def understand_query(req: QueryRequest):
    q = req.query.lower()
    topic = "C Pointers" if "pointer" in q else ("Linked Lists" if "list" in q else "SQL Joins")
    level = req.level_override or ("Advanced" if "advanced" in q else ("Intermediate" if "intermediate" in q else "Beginner"))
    format_pref = req.format_override or ("Code Examples" if "code" in q else ("Visual Guides" if "visual" in q else "Explanation"))
    
    return {
        "raw_query": req.query,
        "topic": topic,
        "level": level,
        "learning_goal": "Conceptual clarity with practical examples",
        "difficulty": "Easy" if level == "Beginner" else "Medium",
        "preferred_resource_type": format_pref,
        "confidence": 0.95
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
