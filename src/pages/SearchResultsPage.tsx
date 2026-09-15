import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  ArrowLeft, 
  BarChart3, 
  SearchX,
  Search
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  LearningLevel, 
  QueryUnderstanding, 
  RankedResource, 
  ResourceFormat, 
  RetrievalEvaluationMetrics 
} from '../types';
import { executeRagPipeline } from '../services/ragEngine';
import { RagPipelineVisualizer } from '../components/visualizer/RagPipelineVisualizer';
import { RetrievalStageAnimation } from '../components/visualizer/RetrievalStageAnimation';
import { ResourceCard } from '../components/search/ResourceCard';
import { EvaluationMetricsModal } from '../components/evaluation/EvaluationMetricsModal';

interface SearchResultsPageProps {
  query: string;
  initialLevel: LearningLevel;
  initialFormat: ResourceFormat;
  onOpenResource: (resourceId: string) => void;
  onNavigate: (page: string) => void;
  onMetricsComputed?: (metrics: RetrievalEvaluationMetrics | null) => void;
  onFormatChange?: (format: ResourceFormat) => void;
  onLevelChange?: (level: LearningLevel) => void;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  query,
  initialLevel,
  initialFormat,
  onOpenResource,
  onNavigate,
  onMetricsComputed,
  onFormatChange,
  onLevelChange
}) => {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [intent, setIntent] = useState<QueryUnderstanding | null>(null);
  const [rankedResults, setRankedResults] = useState<RankedResource[]>([]);
  const [metrics, setMetrics] = useState<RetrievalEvaluationMetrics | null>(null);
  const [showMetricsModal, setShowMetricsModal] = useState(false);

  // Active filter state
  const [activeLevel, setActiveLevel] = useState<LearningLevel>(initialLevel);
  const [activeFormat, setActiveFormat] = useState<ResourceFormat>(initialFormat);

  // Synchronize when initial props change
  useEffect(() => {
    setActiveLevel(initialLevel);
  }, [initialLevel]);

  useEffect(() => {
    setActiveFormat(initialFormat);
  }, [initialFormat]);

  // Execute RAG pipeline
  const runRetrieval = async () => {
    if (!user) return;
    const result = await executeRagPipeline(query, user, {
      level: activeLevel,
      format: activeFormat,
      topK: 6
    });

    setIntent(result.intent);
    setRankedResults(result.rankedResults);
    setMetrics(result.metrics);
    if (onMetricsComputed) {
      onMetricsComputed(result.metrics);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    runRetrieval();
  }, [query, activeLevel, activeFormat, user]);

  return (
    <div className="min-h-screen bg-cream-warm py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Back & Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="p-2.5 rounded-xl bg-white border border-burgundy-border hover:border-burgundy text-burgundy shadow-sm transition-all hover:-translate-x-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-burgundy">
                  RAG Retrieval Results
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                  Personalized for @{user?.username}
                </span>
                {intent && intent.topic !== 'Unrecognized / Off-Topic' && (
                  <span className="text-xs font-mono font-bold text-burgundy bg-burgundy-light px-2.5 py-0.5 rounded-full border border-burgundy-border">
                    Learning: {intent.topic}
                  </span>
                )}
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy-dark leading-tight line-clamp-1">
                "{query}"
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            {metrics ? (
              <button
                onClick={() => setShowMetricsModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-burgundy-border hover:border-burgundy text-burgundy text-xs font-bold shadow-sm transition-all"
              >
                <BarChart3 className="w-4 h-4" />
                <span>RAG Metrics ({metrics.latency_ms}ms)</span>
              </button>
            ) : (
              <button
                onClick={() => setShowMetricsModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-cream-border text-charcoal-muted text-xs font-medium"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Metrics</span>
              </button>
            )}
          </div>
        </div>

        {/* LOADING ANIMATION STATE (4-Stage Pipeline Animation) */}
        {isLoading ? (
          <div className="bg-white border-2 border-burgundy rounded-3xl p-8 shadow-doodle">
            <RetrievalStageAnimation onComplete={() => setIsLoading(false)} durationMs={2000} />
          </div>
        ) : (
          <>
            {/* AI/RAG VISUALIZATION (Interactive Node Diagram) */}
            <RagPipelineVisualizer currentStage={0} />

            {/* EXTRACTED INTENT SUMMARY BAR */}
            {intent && intent.topic !== 'Unrecognized / Off-Topic' && (
              <div className="bg-white border border-burgundy-border rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-cream-border">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-burgundy">
                    <BrainCircuit className="w-4 h-4" />
                    <span>LLM Query Understanding Deconstruction</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Confidence: {(intent.confidence * 100).toFixed(0)}%
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-cream-warm border border-burgundy-border/40">
                    <span className="text-[10px] uppercase font-bold text-charcoal-muted block">
                      Target Topic
                    </span>
                    <span className="font-semibold text-burgundy-dark font-mono text-sm mt-0.5 block">
                      {intent.topic} {intent.subtopic && `• ${intent.subtopic}`}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-cream-warm border border-burgundy-border/40">
                    <span className="text-[10px] uppercase font-bold text-charcoal-muted block">
                      Assessed Level
                    </span>
                    <span className="font-semibold text-charcoal text-sm mt-0.5 block">
                      {intent.level} ({intent.difficulty})
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-cream-warm border border-burgundy-border/40">
                    <span className="text-[10px] uppercase font-bold text-charcoal-muted block">
                      Current Knowledge
                    </span>
                    <span className="font-semibold text-charcoal text-xs mt-0.5 block line-clamp-1">
                      {intent.current_knowledge}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-cream-warm border border-burgundy-border/40">
                    <span className="text-[10px] uppercase font-bold text-charcoal-muted block">
                      Learning Goal
                    </span>
                    <span className="font-semibold text-charcoal text-xs mt-0.5 block line-clamp-1">
                      {intent.learning_goal}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2 text-[11px] text-charcoal-muted flex items-center gap-2 flex-wrap font-mono">
                  <span className="font-bold text-burgundy">Vector Query:</span>
                  <span className="bg-cream-off px-2 py-0.5 rounded border border-cream-border text-charcoal">
                    {intent.reformulated_query}
                  </span>
                </div>
              </div>
            )}

            {/* RESULTS LIST & RETRIEVED RESOURCES */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-burgundy-dark">
                    Ranked Educational Resources ({rankedResults.length})
                  </h2>
                  <p className="text-xs text-charcoal-muted">
                    Ranked by combining vector semantic cosine similarity with your learner profile
                  </p>
                </div>

                {/* Filter Controls for Format and Level */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 bg-white/80 p-1 rounded-2xl border border-burgundy-border/60 shadow-xs overflow-x-auto max-w-full">
                    {(['Explanation', 'Examples', 'Visual Guides', 'Summary', 'Practice'] as ResourceFormat[]).map((fmt) => {
                      const isActive = activeFormat === fmt;
                      return (
                        <button
                          key={fmt}
                          type="button"
                          onClick={() => {
                            setActiveFormat(fmt);
                            onFormatChange?.(fmt);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                            isActive
                              ? 'bg-burgundy text-white shadow-sm font-bold scale-[1.02]'
                              : 'text-charcoal hover:text-burgundy hover:bg-burgundy-light/50'
                          }`}
                        >
                          {fmt}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-charcoal-muted">Level:</span>
                    <select
                      value={activeLevel}
                      onChange={(e) => {
                        const newLevel = e.target.value as LearningLevel;
                        setActiveLevel(newLevel);
                        onLevelChange?.(newLevel);
                      }}
                      className="bg-white border border-burgundy-border rounded-xl text-xs py-1.5 px-2.5 font-medium text-charcoal"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Resource Cards Grid or Empty State */}
              {rankedResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {rankedResults.map((item) => (
                    <ResourceCard
                      key={item.resource.id}
                      rankedItem={item}
                      onSelect={onOpenResource}
                    />
                  ))}
                </div>
              ) : (
                /* NO RELEVANT RESOURCES FOUND EMPTY STATE */
                <div className="bg-white border-2 border-dashed border-burgundy-border rounded-3xl p-10 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-burgundy-light flex items-center justify-center text-burgundy mb-4">
                    <SearchX className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-burgundy-dark mb-2">
                    No highly relevant resource found for this topic.
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mb-6 leading-relaxed">
                    Our educational knowledge base currently focuses on core Computer Science disciplines. Try searching for concepts such as:
                  </p>

                  <div className="flex items-center justify-center gap-2 flex-wrap max-w-lg mb-6">
                    {['C Pointers', 'SQL Joins', 'Singly Linked Lists', 'Database Normalization', 'CPU Scheduling'].map((topic) => (
                      <button
                        key={topic}
                        onClick={() => {
                          setActiveFormat('Explanation');
                          onNavigate('dashboard');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-cream-warm hover:bg-burgundy-light border border-burgundy-border text-xs font-semibold text-burgundy transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="px-5 py-2.5 rounded-xl bg-burgundy text-white font-bold text-xs shadow-doodle-sm hover:bg-burgundy-dark transition-colors"
                  >
                    Return to Dashboard
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* RAG Metrics Modal */}
      <EvaluationMetricsModal
        isOpen={showMetricsModal}
        onClose={() => setShowMetricsModal(false)}
        metrics={metrics}
      />
    </div>
  );
};
