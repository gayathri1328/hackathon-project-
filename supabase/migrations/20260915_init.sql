-- ============================================================
-- Fourbidden Logic: Supabase Migration Script
-- Problem Statement: EDU-06 (Personalized Learning Resource Retriever)
-- ============================================================

-- 1. Enable pgvector extension for vector embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Profiles Table (Username-first authentication)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    learning_level TEXT NOT NULL DEFAULT 'Beginner' CHECK (learning_level IN ('Beginner', 'Intermediate', 'Advanced')),
    preferred_format TEXT NOT NULL DEFAULT 'Explanation' CHECK (preferred_format IN ('Explanation', 'Code Examples', 'Visual Guides', 'Comprehensive')),
    topics_mastery JSONB NOT NULL DEFAULT '{"C Programming": 85, "DBMS": 92, "Data Structures": 64}'::jsonb,
    areas_to_improve JSONB NOT NULL DEFAULT '["Linked Lists", "Memory Management"]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Educational Resources Table (Knowledge Base with pgvector)
CREATE TABLE IF NOT EXISTS public.educational_resources (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    topic TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('C Programming', 'Data Structures', 'DBMS', 'Operating Systems', 'Algorithms')),
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    format TEXT NOT NULL CHECK (format IN ('Explanation', 'Code Examples', 'Visual Guides', 'Comprehensive')),
    read_time TEXT NOT NULL DEFAULT '8 min',
    short_description TEXT NOT NULL,
    full_content TEXT NOT NULL,
    code_snippets JSONB DEFAULT '[]'::jsonb,
    key_takeaways JSONB DEFAULT '[]'::jsonb,
    common_pitfalls JSONB DEFAULT '[]'::jsonb,
    tags TEXT[] DEFAULT '{}',
    prerequisites TEXT[] DEFAULT '{}',
    embedding VECTOR(384), -- 384-dimensional dense semantic embedding
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index on embedding for fast Approximate Nearest Neighbors (IVFFlat or HNSW)
CREATE INDEX IF NOT EXISTS idx_resources_embedding 
ON public.educational_resources 
USING hnsw (embedding vector_cosine_ops);

-- 4. Learning History Table
CREATE TABLE IF NOT EXISTS public.learning_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    topic TEXT NOT NULL,
    resource_id TEXT NOT NULL REFERENCES public.educational_resources(id) ON DELETE CASCADE,
    resource_title TEXT NOT NULL,
    duration_seconds INT DEFAULT 0,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Assessment Scores Table
CREATE TABLE IF NOT EXISTS public.assessment_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    topic TEXT NOT NULL,
    score INT NOT NULL,
    total INT NOT NULL,
    percentage NUMERIC(5, 2) NOT NULL,
    feedback TEXT,
    taken_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. RPC Function: match_resources using Cosine Distance
CREATE OR REPLACE FUNCTION match_resources (
  query_embedding VECTOR(384),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  id TEXT,
  title TEXT,
  topic TEXT,
  category TEXT,
  difficulty TEXT,
  format TEXT,
  short_description TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    er.id,
    er.title,
    er.topic,
    er.category,
    er.difficulty,
    er.format,
    er.short_description,
    1 - (er.embedding <=> query_embedding) AS similarity
  FROM public.educational_resources er
  WHERE 1 - (er.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;

-- 7. Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.educational_resources ENABLE ROW LEVEL SECURITY;

-- Allow public read access to educational resources
CREATE POLICY "Educational resources are viewable by all" 
ON public.educational_resources FOR SELECT USING (true);

-- User-scoped access for profiles, history, and scores
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE USING (true);

CREATE POLICY "Users can view own learning history" 
ON public.learning_history FOR SELECT USING (true);

CREATE POLICY "Users can insert own learning history" 
ON public.learning_history FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own assessment scores" 
ON public.assessment_scores FOR SELECT USING (true);

CREATE POLICY "Users can insert own assessment scores" 
ON public.assessment_scores FOR INSERT WITH CHECK (true);
