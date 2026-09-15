import React from 'react';
import { 
  BookOpen, 
  Code2, 
  Image as ImageIcon, 
  Layers, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle,
  Tag
} from 'lucide-react';
import { RankedResource } from '../../types';

interface ResourceCardProps {
  rankedItem: RankedResource;
  onSelect: (resourceId: string) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ rankedItem, onSelect }) => {
  const { resource, final_score, semantic_score, context_score, why_recommended, rank } = rankedItem;

  // Format Icon
  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'Examples':
      case 'Code Examples':
        return resource.is_programming ? <Code2 className="w-4 h-4" /> : <Layers className="w-4 h-4" />;
      case 'Visual Guides':
        return <ImageIcon className="w-4 h-4" />;
      case 'Practice':
        return <CheckCircle className="w-4 h-4" />;
      case 'Summary':
        return <Layers className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  // Difficulty badge colors
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Hard':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const matchPercentage = Math.round(final_score * 100);

  return (
    <div className="bg-white border-2 border-burgundy-border hover:border-burgundy rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-doodle flex flex-col justify-between group relative overflow-hidden">
      {/* Top Banner with Rank & Relevance match indicator */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Format Pill */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-burgundy-light text-burgundy-dark border border-burgundy-border">
              {getFormatIcon(resource.format)}
              {resource.format}
            </span>

            {/* Topic Pill */}
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-cream-warm text-charcoal border border-cream-border font-mono">
              {resource.topic}
            </span>

            {/* Difficulty Badge */}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getDifficultyColor(resource.difficulty)}`}>
              {resource.difficulty}
            </span>
          </div>

          {/* Relevance Match Indicator */}
          <div className="flex flex-col items-end flex-shrink-0">
            <div className="flex items-center gap-1 bg-burgundy/5 px-3 py-1 rounded-full border border-burgundy/20">
              <Sparkles className="w-3.5 h-3.5 text-burgundy" />
              <span className="font-mono text-xs font-bold text-burgundy">
                {matchPercentage}% Match
              </span>
            </div>
            <span className="text-[10px] text-charcoal-muted mt-0.5 font-mono">
              Semantic: {Math.round(semantic_score * 100)}%
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal-dark group-hover:text-burgundy transition-colors leading-snug mb-2">
          {resource.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-charcoal-muted leading-relaxed mb-4">
          {resource.short_description}
        </p>

        {/* Personalized "Why this is recommended" banner */}
        <div className="bg-cream-warm/80 border border-burgundy-border/70 rounded-xl p-3 mb-4">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-md bg-burgundy-light text-burgundy flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="w-3 h-3" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-burgundy-deep block">
                Why Recommended For You
              </span>
              <p className="text-xs text-charcoal font-medium mt-0.5 leading-snug">
                "{why_recommended}"
              </p>
            </div>
          </div>
        </div>

        {/* Key takeaways pills */}
        {resource.key_takeaways && resource.key_takeaways.length > 0 && (
          <div className="mb-4">
            <span className="text-[11px] font-semibold text-charcoal-muted uppercase tracking-wider block mb-1.5">
              Highlights:
            </span>
            <ul className="space-y-1">
              {resource.key_takeaways.slice(0, 2).map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-xs text-charcoal-muted">
                  <CheckCircle className="w-3.5 h-3.5 text-burgundy-soft flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer / Action row */}
      <div className="pt-4 border-t border-cream-border flex items-center justify-between gap-3 mt-2">
        <div className="flex items-center gap-3 text-xs text-charcoal-muted">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {resource.read_time}
          </span>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-cream-border" />
          <span className="hidden sm:inline-block font-mono text-[11px]">
            {resource.category}
          </span>
        </div>

        <button
          onClick={() => onSelect(resource.id)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-burgundy hover:bg-burgundy-dark text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-doodle-sm group-hover:translate-x-0.5"
        >
          <span>Open Resource</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
