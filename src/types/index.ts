export type LearningLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type ResourceFormat = 'Explanation' | 'Examples' | 'Visual Guides' | 'Practice' | 'Summary';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface UserProfile {
  id: string;
  username: string;
  avatar_url?: string;
  learning_level: LearningLevel;
  preferred_format: ResourceFormat;
  created_at: string;
  topics_mastery: {
    [topic: string]: number; // 0 to 100 percentage
  };
  recent_learning: Array<{
    topic: string;
    resource_id: string;
    resource_title: string;
    completed_at: string;
  }>;
  areas_to_improve: string[];
  assessment_history: Array<{
    id: string;
    topic: string;
    level: LearningLevel;
    attempt_number: number;
    score: number;
    total: number;
    percentage: number;
    taken_at: string;
  }>;
  assessment_attempts?: Record<string, number>; // topic -> count
}

export interface EducationalResource {
  id: string;
  title: string;
  topic: string; // e.g., 'C Pointers', 'Photosynthesis', 'SQL Joins', 'Newton\'s Laws', etc.
  category: string; // Broad subject/domain e.g. 'Programming', 'Biology', 'Physics', 'DBMS', 'Mathematics', etc.
  is_programming?: boolean;
  difficulty: DifficultyLevel;
  format: ResourceFormat;
  read_time: string;
  short_description: string;
  full_content: string;
  code_snippets?: Array<{
    language: string;
    code: string;
    explanation: string;
    expected_output?: string;
    line_by_line?: Array<{
      line: string;
      explanation: string;
    }>;
  }>;
  real_world_examples?: Array<{
    title: string;
    scenario: string;
    explanation: string;
    analogy?: string;
  }>;
  practice_exercises?: Array<{
    id?: string;
    type?: 'MCQ' | 'Conceptual' | 'Application' | 'Problem Solving' | 'Scenario';
    question: string;
    options?: string[];
    correct_answer?: string;
    solution: string;
    hint: string;
    difficulty?: DifficultyLevel;
  }>;
  key_takeaways: string[];
  common_pitfalls?: string[];
  tags: string[];
  prerequisites: string[];
  embedding?: number[]; // 384-dimensional vector
}

export interface QueryUnderstanding {
  raw_query: string;
  topic: string;
  subtopic?: string;
  subject: string; // e.g. 'Programming', 'Biology', 'Physics', 'DBMS', 'Mathematics', 'Economics'
  language?: string; // e.g. 'C', 'Python', 'Java', 'SQL' if programming
  is_programming: boolean;
  level: LearningLevel;
  current_knowledge: string;
  learning_goal: string;
  difficulty: DifficultyLevel;
  preferred_resource_type: ResourceFormat;
  reformulated_query: string;
  search_keywords: string[];
  confidence: number;
}

export interface RankedResource {
  resource: EducationalResource;
  semantic_score: number; // Cosine similarity (0 to 1)
  context_score: number;  // Personalization score based on student profile (0 to 1)
  final_score: number;    // Weighted combination
  why_recommended: string; // Personalized explanation
  match_reasons: string[];
  rank: number;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  code_snippet?: string;
  options: string[];
  correct_option: number;
  explanation: string;
}

export interface TopicAssessmentAttempt {
  id: string;
  topic_name: string;
  level: LearningLevel;
  attempt_number: number;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
}

export interface RetrievalEvaluationMetrics {
  precision_at_3: number;
  precision_at_5: number;
  mean_reciprocal_rank: number;
  latency_ms: number;
  retrieved_count: number;
  vector_dimension: number;
  semantic_weight: number;
  context_weight: number;
}
