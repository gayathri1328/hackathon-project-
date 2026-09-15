import React from 'react';
import { Sparkles, Heart, Brain, GraduationCap } from 'lucide-react';
import { BooksDoodle, StarsDoodle } from '../doodles';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-burgundy-border/60 bg-cream-off/70 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-burgundy text-white flex items-center justify-center font-serif font-black text-sm">
            4L
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-burgundy-dark text-sm">
                Fourbidden Logic
              </span>
              <span className="text-[10px] bg-burgundy-light text-burgundy px-1.5 py-0.5 rounded font-mono font-medium">
                INTELLIX 2026
              </span>
            </div>
            <p className="text-xs text-charcoal-muted">
              Problem Statement: EDU-06 — Personalized Learning Resource Retriever
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-charcoal-muted">
          <span className="flex items-center gap-1">
            <Brain className="w-3.5 h-3.5 text-burgundy" />
            <span>Actual RAG & Vector Cosine Retrieval</span>
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-burgundy" />
            <span>Learner-Context Personalization</span>
          </span>
        </div>

        <div className="text-xs text-charcoal-muted font-mono">
          Built for INTELLIX Hackathon 2026
        </div>
      </div>
    </footer>
  );
};
