import React, { useEffect, useState } from 'react';
import { Brain, Search, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { BrainDoodle, StarsDoodle } from '../doodles';

interface RetrievalStageAnimationProps {
  onComplete?: () => void;
  durationMs?: number;
}

const STAGES = [
  {
    label: 'Understanding your learning need...',
    sub: 'Extracting topic, current knowledge, learning level & goal',
    icon: Brain,
    doodle: 'brain'
  },
  {
    label: 'Finding relevant knowledge...',
    sub: 'Computing 384-dim dense query embedding & pgvector cosine retrieval',
    icon: Search,
    doodle: 'nodes'
  },
  {
    label: 'Personalizing resources...',
    sub: 'Comparing against student learning level, preferences & assessment history',
    icon: Sparkles,
    doodle: 'stars'
  },
  {
    label: 'Ranking the best matches...',
    sub: 'Synthesizing final relevance scores and generating recommendation rationale',
    icon: Filter,
    doodle: 'book'
  }
];

export const RetrievalStageAnimation: React.FC<RetrievalStageAnimationProps> = ({
  onComplete,
  durationMs = 2800
}) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  useEffect(() => {
    const stageDuration = durationMs / STAGES.length;
    const interval = setInterval(() => {
      setCurrentStageIdx((prev) => {
        if (prev < STAGES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          if (onComplete) {
            setTimeout(onComplete, 400);
          }
          return prev;
        }
      });
    }, stageDuration);

    return () => clearInterval(interval);
  }, [durationMs, onComplete]);

  const activeStage = STAGES[currentStageIdx];
  const Icon = activeStage.icon;

  return (
    <div className="w-full max-w-xl mx-auto py-12 px-6 flex flex-col items-center text-center">
      {/* Animated Center Aura */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-3xl bg-burgundy-light border-2 border-burgundy flex items-center justify-center shadow-doodle animate-pulse">
          <BrainDoodle className="w-14 h-14 animate-wiggle" />
        </div>
        <div className="absolute -top-3 -right-3 animate-float">
          <StarsDoodle className="w-8 h-8 text-burgundy-deep" />
        </div>
      </div>

      {/* Dynamic Stage Header */}
      <div className="h-20 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 mb-1.5 animate-fadeIn">
          <Icon className="w-5 h-5 text-burgundy animate-spin" style={{ animationDuration: '3s' }} />
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-burgundy-dark">
            {activeStage.label}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-md">
          {activeStage.sub}
        </p>
      </div>

      {/* Progress Line */}
      <div className="w-full max-w-md mt-6 mb-8">
        <div className="h-2 bg-cream-border rounded-full overflow-hidden border border-burgundy-border/30">
          <div
            className="h-full bg-gradient-to-r from-burgundy to-burgundy-soft transition-all duration-500 ease-out rounded-full"
            style={{ width: `${((currentStageIdx + 1) / STAGES.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Micro Step Indicators */}
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        {STAGES.map((stg, i) => {
          const isDone = i < currentStageIdx;
          const isCurrent = i === currentStageIdx;
          return (
            <div key={i} className="flex items-center gap-1.5">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                  isDone
                    ? 'bg-burgundy text-white'
                    : isCurrent
                    ? 'bg-burgundy-light text-burgundy border-2 border-burgundy animate-pulse'
                    : 'bg-cream-warm text-charcoal-muted border border-cream-border'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className={`text-[11px] font-medium hidden sm:inline ${
                isCurrent ? 'text-burgundy font-semibold' : 'text-charcoal-muted'
              }`}>
                {i === 0 ? 'Understanding' : i === 1 ? 'Retrieval' : i === 2 ? 'Personalizing' : 'Ranking'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
