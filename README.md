# Fourbidden Logic (EDU-06)
## AI-Powered Personalized Learning Resource Retriever
**INTELLIX 2026 Hackathon** | **Domain: Education & Knowledge**

> *"Learn smarter. Find what fits you."*

---

## 🌟 Overview & Architecture

**Fourbidden Logic** is an authentic, production-grade personalized educational resource retrieval platform engineered for the INTELLIX 2026 Hackathon (Problem Statement: **EDU-06**).

The system operates with complete user data isolation, fresh onboarding states, genuine vector semantic retrieval, and a closed-loop learning feedback cycle:

```
AUTHENTICATED USER
  ↓
REAL FRESH USER PROFILE
  ↓
NATURAL LANGUAGE QUERY
  ↓
LLM QUERY UNDERSTANDING (Topic, Subtopic, Level, Goal, Format, Keywords)
  ↓
384-DIM DENSE VECTOR EMBEDDING
  ↓
VECTOR COSINE RETRIEVAL (Top-K with Relevance Cutoff)
  ↓
CONTEXT-AWARE & FORMAT-AWARE RE-RANKING
  ↓
STUDY RESOURCE VIEW
  ↓
DYNAMIC ASSESSMENT (Level- & Attempt-Aware Questions)
  ↓
REAL SCORE RECORDED & MASTERY UPDATED
  ↓
DYNAMICALLY CALIBRATED FUTURE RETRIEVAL
```

---

## 🎨 Visual Design System

- **Brand Colors**:
  - **Deep Burgundy**: `#6D1F3A`
  - **Dark Burgundy**: `#481329`
  - **Soft Burgundy**: `#8B3A55`
  - **Warm Cream**: `#FFF8F3` (Background)
  - **Off White**: `#FFFCFA` (Card Surfaces)
  - **Charcoal**: `#252124` (Typography)
- **Hand-Drawn SVG Doodles**: Books, Brain, Light Bulbs, Knowledge Nodes, Code Brackets, Graduation Cap, Stars, Sticky Notes, Arrows.
- **Typography**: Newsreader Serif + Plus Jakarta Sans + JetBrains Mono.

---

## 🚀 Key Improvements & Behavioral Specifications

1. **Sign In Landing Page**:
   - First screen on visit is the **Student Sign In** page (`/login`).
   - `username` and `password` fields initialize completely blank (`""`).
   - No demo credentials prefill.

2. **100% Fresh User Experience**:
   - Newly created accounts start completely blank:
     - 0 topics learned
     - 0 assessment scores
     - 0 learning history records
     - 0 fake areas to improve
   - Polished intentional empty states with themed line-art doodles across Dashboard and Profile.

3. **Format-Aware Retrieval**:
   - Supported formats: `Explanation`, `Code Examples`, `Visual Guides`, `Practice`, `Summary`.
   - Selecting `Practice` prioritizes coding exercises and problem sets.
   - Selecting `Explanation` prioritizes conceptual breakdowns and memory models.
   - Selecting `Visual Guides` prioritizes diagrams and ASCII memory maps.

4. **Topic Specificity & Relevance Cutoff**:
   - Queries for "C pointers" return C Pointers resources; "SQL joins" return SQL Joins resources.
   - Off-topic queries (e.g. "baking cake") return 0 results with the message *"No highly relevant resource found for this topic"*.

5. **Dynamic Level- and Attempt-Aware Assessments**:
   - Questions vary by **Level** (Beginner, Intermediate, Advanced) and **Attempt** (Attempt 1, Attempt 2, Attempt 3).
   - Taking a quiz again for the same topic yields a new question set.
   - Scores $\ge 70\%$ increase topic mastery and recommend advanced challenges; scores $< 70\%$ add the topic to *Areas to Improve* and recommend foundational guides.

6. **No Fake Metrics**:
   - The RAG Metrics modal displays *"Evaluation data not available yet"* until an actual search is run.

---

## 🏃 Running the Application

```powershell
# 1. Install dependencies
npm.cmd install

# 2. Start Vite development server (runs on http://localhost:5173/)
npm.cmd run dev

# 3. Build for production
npm.cmd run build
```
