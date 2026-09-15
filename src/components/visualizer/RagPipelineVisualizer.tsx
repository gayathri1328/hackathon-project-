import React from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  Binary, 
  Database, 
  SlidersHorizontal, 
  GraduationCap,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

interface VisualizerProps {
  currentStage?: number; // 1 to 6 (or 0 for all completed)
  compact?: boolean;
}

export const RagPipelineVisualizer: React.FC<VisualizerProps> = ({ 
  currentStage = 0,
  compact = false 
}) => {
  const steps = [
    {
      id: 1,
      title: 'Your Learning Need',
      desc: 'Natural language query',
      icon: Sparkles,
      tag: 'Input'
    },
    {
      id: 2,
      title: 'AI Understanding',
      desc: 'Intent, level & goals',
      icon: BrainCircuit,
      tag: 'LLM Analysis'
    },
    {
      id: 3,
      title: 'Semantic Search',
      desc: '384-dim vector match',
      icon: Binary,
      tag: 'pgvector Cosine'
    },
    {
      id: 4,
      title: 'Relevant Knowledge',
      desc: 'Curated CS documents',
      icon: Database,
      tag: 'Top-K Retrieval'
    },
    {
      id: 5,
      title: 'Personalized Ranking',
      desc: 'Mastery & history context',
      icon: SlidersHorizontal,
      tag: 'Context Ranker'
    },
    {
      id: 6,
      title: 'Your Resources',
      desc: 'Custom study match',
      icon: GraduationCap,
      tag: 'Personalized Output'
    }
  ];

  return (
    <div className="w-full bg-cream-off border border-burgundy-border/60 rounded-2xl p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-burgundy-border/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-burgundy animate-pulse" />
            <h3 className="font-serif text-lg font-bold text-burgundy-dark tracking-tight">
              AI Retrieval & Personalization Architecture
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            How Fourbidden Logic transforms your learning query into tailored educational resources
          </p>
        </div>
        <div className="text-xs font-mono px-2.5 py-1 bg-burgundy-light text-burgundy-deep rounded-full self-start sm:self-auto font-medium border border-burgundy-border">
          RAG + Context Ranker
        </div>
      </div>

      {/* Connected Interactive Node Pipeline */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-2 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = currentStage === step.id;
          const isDone = currentStage === 0 || currentStage > step.id;

          return (
            <div key={step.id} className="relative group">
              <div 
                className={`flex flex-col items-center text-center p-3 rounded-xl border transition-all duration-300 h-full ${
                  isActive 
                    ? 'bg-burgundy text-white border-burgundy shadow-doodle-sm scale-105 ring-2 ring-burgundy-light ring-offset-1'
                    : isDone
                    ? 'bg-cream-warm border-burgundy-border hover:border-burgundy hover:shadow-sm'
                    : 'bg-cream-warm/40 border-cream-border opacity-60'
                }`}
              >
                {/* Step badge */}
                <span className={`text-[10px] font-mono uppercase tracking-wider mb-1.5 px-2 py-0.5 rounded-full ${
                  isActive 
                    ? 'bg-white/20 text-white font-semibold' 
                    : 'bg-burgundy-light text-burgundy-dark font-medium'
                }`}>
                  {step.tag}
                </span>

                {/* Node Icon */}
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 transition-transform duration-200 group-hover:scale-110 ${
                  isActive 
                    ? 'bg-white text-burgundy' 
                    : 'bg-burgundy-light text-burgundy-deep'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Title */}
                <h4 className={`text-xs font-bold leading-snug tracking-tight mb-1 ${
                  isActive ? 'text-white' : 'text-burgundy-dark'
                }`}>
                  {step.title}
                </h4>

                {/* Subtitle */}
                <p className={`text-[11px] leading-tight ${
                  isActive ? 'text-white/80' : 'text-charcoal-muted'
                }`}>
                  {step.desc}
                </p>
              </div>

              {/* Connecting arrow indicator for desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-burgundy-soft/40">
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
