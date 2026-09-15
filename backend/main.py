import re
from typing import Optional, List, Dict, Any

from fastapi import FastAPI
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


# ---------------------------------------------------------
# Request models
# ---------------------------------------------------------

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


# ---------------------------------------------------------
# Health
# ---------------------------------------------------------

@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "Fourbidden Logic RAG API",
        "version": "1.0.0"
    }


# ---------------------------------------------------------
# Query Understanding
# Mirrors frontend topicUnderstanding.ts
# ---------------------------------------------------------

def understand_learning_query(
    raw_query: str,
    user_level_override: Optional[str] = None,
    user_format_override: Optional[str] = None
) -> Dict[str, Any]:

    q_clean = raw_query.strip()
    q_lower = q_clean.lower()

    # 1. Subject + programming detection
    subject = "General Academics"
    language = None
    is_programming = False

    if re.search(
        r"\b(c\b|pointers?|malloc|calloc|dereferenc|struct|segfault)",
        q_lower
    ) and not re.search(r"\b(sql|css)\b", q_lower):
        subject = "Programming"
        language = "C"
        is_programming = True

    elif re.search(
        r"\b(python|def\b|lambda|dict|list comp|pandas|numpy|django)\b",
        q_lower
    ):
        subject = "Programming"
        language = "Python"
        is_programming = True

    elif re.search(
        r"\b(java\b|jvm|oop|polymorphism|inheritance|encapsulation|spring)\b",
        q_lower
    ):
        subject = "Programming"
        language = "Java"
        is_programming = True

    elif re.search(
        r"\b(javascript|js\b|promise|async|await|closure|dom|react|typescript)\b",
        q_lower
    ):
        subject = "Programming"
        language = "JavaScript"
        is_programming = True

    elif re.search(
        r"\b(sql|database|query|joins?|table|normalization|foreign key|primary key|rdbms|dbms)\b",
        q_lower
    ):
        subject = "DBMS"
        language = "SQL"
        is_programming = True

    elif re.search(
        r"\b(linked lists?|trees?|graphs?|stacks?|queues?|binary search|sorting|algorithm|recursion|dijkstra|data structures?)\b",
        q_lower
    ):
        subject = "Computer Science"
        is_programming = True

    elif re.search(
        r"\b(operating systems?|cpu scheduling|deadlock|semaphore|paging|virtual memory|process)\b",
        q_lower
    ):
        subject = "Operating Systems"
        is_programming = True

    elif re.search(
        r"\b(computer networks?|osi model|tcp|udp|http|dns|ip address|packet)\b",
        q_lower
    ):
        subject = "Computer Networks"
        is_programming = True

    elif re.search(
        r"\b(calculus|differentiation|derivative|integral|integration|limit|matrix|matrices|probability|statistics|algebra|geometry|vector)\b",
        q_lower
    ):
        subject = "Mathematics"

    elif re.search(
        r"\b(photosynthesis|cell|dna|rna|mitosis|evolution|chloroplast|genetics|respiration|plant|biology)\b",
        q_lower
    ):
        subject = "Biology"

    elif re.search(
        r"\b(newton|motion|force|gravity|acceleration|velocity|inertia|momentum|thermodynamics|optics|quantum|physics|relativity)\b",
        q_lower
    ):
        subject = "Physics"

    elif re.search(
        r"\b(chemical bonding|covalent|ionic|periodic table|molecule|atom|reaction|acid|base|organic chemistry)\b",
        q_lower
    ):
        subject = "Chemistry"

    elif re.search(
        r"\b(economics|inflation|gdp|supply and demand|market|monopoly|fiscal|macroeconomics|microeconomics)\b",
        q_lower
    ):
        subject = "Economics"

    elif re.search(
        r"\b(history|revolution|world war|renaissance|empire|civilization|constitution)\b",
        q_lower
    ):
        subject = "History"

    elif re.search(
        r"\b(geography|climate|tectonic|plate|atmosphere|ecosystem|map)\b",
        q_lower
    ):
        subject = "Geography"

    # 2. Topic + subtopic
    topic = ""
    subtopic = None

    if re.search(r"\b(c pointers?|pointers? in c|pointer arithmetic|pointers)\b", q_lower):
        topic = "C Pointers"
        subtopic = (
            "Pointer Arithmetic"
            if "arithmetic" in q_lower
            else "Pass-by-Reference"
            if "swap" in q_lower
            else "Memory Addresses"
        )

    elif re.search(r"\b(python functions?|functions? in python|python def|lambda)\b", q_lower):
        topic = "Python Functions"
        subtopic = (
            "Lambda Expressions"
            if "lambda" in q_lower
            else "Parameters & Scope"
            if "arg" in q_lower
            else "Function Definitions"
        )

    elif re.search(r"\b(photosynthesis|chloroplast|calvin cycle|light reaction)\b", q_lower):
        topic = "Photosynthesis"
        subtopic = (
            "Calvin Cycle (Dark Reactions)"
            if "calvin" in q_lower
            else "Light-Dependent Reactions"
            if "light" in q_lower
            else "Chloroplast Photochemistry"
        )

    elif re.search(
        r"\b(newton'?s? laws?|laws? of motion|inertia|f=ma|action and reaction)\b",
        q_lower
    ):
        topic = "Newton's Laws of Motion"
        subtopic = (
            "First Law (Law of Inertia)"
            if ("first" in q_lower or "inertia" in q_lower)
            else "Second Law (F = ma)"
            if ("second" in q_lower or "acceleration" in q_lower or "f=ma" in q_lower)
            else "Third Law (Action-Reaction)"
            if ("third" in q_lower or "action" in q_lower)
            else "Classical Mechanics Principles"
        )

    elif re.search(r"\b(sql joins?|joins? in sql|inner join|left join|outer join)\b", q_lower):
        topic = "SQL Joins"
        subtopic = (
            "Outer Joins & Anti-Joins"
            if "left" in q_lower
            else "Inner Equi-Joins"
            if "inner" in q_lower
            else "Multi-Table Relational Queries"
        )

    elif re.search(r"\b(dbms normalization|database normalization|1nf|2nf|3nf|bcnf)\b", q_lower):
        topic = "Database Normalization"
        subtopic = (
            "Third Normal Form (3NF)"
            if "3nf" in q_lower
            else "Second Normal Form (2NF)"
            if "2nf" in q_lower
            else "1NF to 3NF Decomposition"
        )

    elif re.search(r"\b(linked lists?|singly linked list|doubly linked list)\b", q_lower):
        topic = "Singly Linked Lists"
        subtopic = (
            "In-Place Reversal"
            if "revers" in q_lower
            else "Node Pointer Traversal"
        )

    elif re.search(
        r"\b(calculus|differentiation|integration|definite integral|derivative)\b",
        q_lower
    ):
        topic = (
            "Calculus Differentiation"
            if ("different" in q_lower or "derivative" in q_lower)
            else "Calculus Integration"
        )
        subtopic = (
            "Definite Integrals & Riemann Sum"
            if "definite" in q_lower
            else "Fundamental Theorem of Calculus"
        )

    elif re.search(r"\b(java oop|oop in java|object oriented programming)\b", q_lower):
        topic = "Java Object-Oriented Programming"
        subtopic = "Encapsulation, Inheritance & Polymorphism"

    elif re.search(r"\b(javascript promises?|promises? in js|async await)\b", q_lower):
        topic = "JavaScript Promises & Async"
        subtopic = "Event Loop & Asynchronous Control"

    elif re.search(r"\b(recursion|recursive)\b", q_lower):
        topic = "Recursion & Backtracking"
        subtopic = "Call Stack & Base Cases"

    elif re.search(r"\b(chemical bonding|covalent bond|ionic bond)\b", q_lower):
        topic = "Chemical Bonding"
        subtopic = "Ionic vs Covalent Interactions"

    elif re.search(r"\b(thermodynamics)\b", q_lower):
        topic = "Laws of Thermodynamics"
        subtopic = "Enthalpy, Entropy & Energy Conservation"

    elif re.search(r"\b(economics|supply and demand)\b", q_lower):
        topic = "Microeconomics: Supply & Demand"
        subtopic = "Market Equilibrium & Elasticity"

    else:
        cleaned = re.sub(
            r"^(please\s+|can\s+you\s+|i\s+want\s+to\s+learn\s+|explain\s+|teach\s+me\s+|what\s+is\s+|what\s+are\s+|help\s+me\s+understand\s+|give\s+me\s+examples\s+of\s+|tell\s+me\s+about\s+)",
            "",
            q_clean,
            flags=re.IGNORECASE
        )

        cleaned = re.sub(
            r"\s+(simply|in\s+simple\s+language|in\s+detail|with\s+examples|for\s+beginners|with\s+diagrams?|step\s+by\s+step|easily)\b",
            "",
            cleaned,
            flags=re.IGNORECASE
        ).strip()

        if len(cleaned) >= 3:
            topic = " ".join(
                word.capitalize()
                for word in cleaned.split()
            )
            subtopic = "Core Foundations"
        else:
            topic = "Academic Foundations"
            subtopic = "General Overview"

    # 3. Learning level
    level = user_level_override or "Beginner"

    if not user_level_override:
        if any(x in q_lower for x in [
            "advanced", "deep dive", "expert", "edge case"
        ]):
            level = "Advanced"
        elif any(x in q_lower for x in [
            "intermediate", "practical", "hands-on"
        ]):
            level = "Intermediate"
        elif any(x in q_lower for x in [
            "beginner", "simple", "basic", "confus", "start"
        ]):
            level = "Beginner"

    # 4. Learning goal
    learning_goal = f"Comprehensive understanding of {topic}"

    if any(x in q_lower for x in ["summary", "revision", "cheat sheet"]):
        learning_goal = f"Complete Master Summary and revision for {topic}"

    elif any(x in q_lower for x in [
        "practice", "quiz", "challenge", "question"
    ]):
        learning_goal = (
            f"20-question practice challenges and problem solving on {topic}"
        )

    elif any(x in q_lower for x in ["example", "code", "scenario"]):
        if is_programming:
            learning_goal = (
                f"Real-world code implementations with line-by-line "
                f"explanations for {topic}"
            )
        else:
            learning_goal = (
                f"Real-life scenarios, practical situations, and analogies for {topic}"
            )

    elif any(x in q_lower for x in [
        "visual", "diagram", "picture", "chart"
    ]):
        learning_goal = f"Visual architecture and conceptual diagrams for {topic}"

    # 5. Preferred format
    preferred_format = user_format_override or "Explanation"

    if not user_format_override:
        if any(x in q_lower for x in ["summary", "revision", "cheat sheet"]):
            preferred_format = "Summary"
        elif any(x in q_lower for x in [
            "visual", "diagram", "picture", "chart"
        ]):
            preferred_format = "Visual Guides"
        elif any(x in q_lower for x in [
            "practice", "quiz", "challenge", "question"
        ]):
            preferred_format = "Practice"
        elif any(x in q_lower for x in [
            "example", "code", "scenario"
        ]):
            preferred_format = "Examples"

    # 6. Keywords
    keywords_text = (
        f"{topic} {subtopic or ''} {subject} "
        f"{language or ''} {level} {learning_goal} {raw_query}"
    )

    keywords = list(dict.fromkeys(
        word
        for word in re.sub(
            r"[^a-z0-9\s]",
            " ",
            keywords_text.lower()
        ).split()
        if len(word) > 2
    ))

    reformulated = (
        f"{topic} {subtopic or ''} {subject} "
        f"{level} {preferred_format} "
        f"{' '.join(keywords[:6])}"
    ).strip()

    difficulty = (
        "Easy"
        if level == "Beginner"
        else "Medium"
        if level == "Intermediate"
        else "Hard"
    )

    return {
        "raw_query": raw_query,
        "topic": topic,
        "subtopic": subtopic,
        "subject": subject,
        "language": language,
        "is_programming": is_programming,
        "level": level,
        "current_knowledge": f"{level} learner exploring {topic}",
        "learning_goal": learning_goal,
        "difficulty": difficulty,
        "preferred_resource_type": preferred_format,
        "reformulated_query": reformulated,
        "search_keywords": keywords[:10],
        "confidence": 0.98
    }


# ---------------------------------------------------------
# RAG / Query Understanding endpoint
# ---------------------------------------------------------

@app.post("/api/rag/understand")
def understand_query(req: QueryRequest):

    result = understand_learning_query(
        req.query,
        req.level_override,
        req.format_override
    )

    return result


# ---------------------------------------------------------
# Simple embedding endpoint
# Useful for frontend/backend integration
# ---------------------------------------------------------

class EmbeddingRequest(BaseModel):
    text: str


@app.post("/api/rag/embed")
def create_embedding(req: EmbeddingRequest):
    vector = compute_mock_dense_embedding(req.text)

    return {
        "embedding": vector,
        "dimension": len(vector)
    }
