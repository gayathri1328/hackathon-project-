import React from 'react';
import { X, BarChart2, Zap, Target, Gauge, Cpu, CheckCircle, Info } from 'lucide-react';
import { RetrievalEvaluationMetrics } from '../../types';

interface EvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: RetrievalEvaluationMetrics | null;
}

export const EvaluationMetricsModal: React.FC<EvaluationModalProps> = ({
  isOpen,
  onClose,
  metrics
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border-2 border-burgundy rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-card relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-cream-warm hover:bg-burgundy-light text-charcoal hover:text-burgundy flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cream-border">
          <div className="w-10 h-10 rounded-xl bg-burgundy-light text-burgundy flex items-center justify-center">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-burgundy-dark">
              Live RAG & Retrieval Performance Evaluation
            </h2>
            <p className="text-xs text-charcoal-muted">
              Directly measured metrics from the actual vector retrieval and personalized re-ranking execution
            </p>
          </div>
        </div>

        {metrics ? (
          <div className="space-y-6">
            {/* Metric Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-cream-warm border border-burgundy-border/60 rounded-2xl p-3.5 text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-charcoal-muted mb-1">
                  <Target className="w-3.5 h-3.5 text-burgundy" />
                  <span>Precision@3</span>
                </div>
                <div className="font-mono text-2xl font-black text-burgundy">
                  {(metrics.precision_at_3 * 100).toFixed(0)}%
                </div>
                <span className="text-[10px] text-charcoal-muted">Top 3 relevance</span>
              </div>

              <div className="bg-cream-warm border border-burgundy-border/60 rounded-2xl p-3.5 text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-charcoal-muted mb-1">
                  <Target className="w-3.5 h-3.5 text-burgundy" />
                  <span>Precision@5</span>
                </div>
                <div className="font-mono text-2xl font-black text-burgundy">
                  {(metrics.precision_at_5 * 100).toFixed(0)}%
                </div>
                <span className="text-[10px] text-charcoal-muted">Top 5 relevance</span>
              </div>

              <div className="bg-cream-warm border border-burgundy-border/60 rounded-2xl p-3.5 text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-charcoal-muted mb-1">
                  <Gauge className="w-3.5 h-3.5 text-burgundy" />
                  <span>MRR</span>
                </div>
                <div className="font-mono text-2xl font-black text-burgundy">
                  {metrics.mean_reciprocal_rank.toFixed(2)}
                </div>
                <span className="text-[10px] text-charcoal-muted">Mean Reciprocal Rank</span>
              </div>

              <div className="bg-cream-warm border border-burgundy-border/60 rounded-2xl p-3.5 text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-charcoal-muted mb-1">
                  <Zap className="w-3.5 h-3.5 text-burgundy" />
                  <span>Latency</span>
                </div>
                <div className="font-mono text-2xl font-black text-burgundy">
                  {metrics.latency_ms}ms
                </div>
                <span className="text-[10px] text-charcoal-muted">Measured pipeline time</span>
              </div>
            </div>

            {/* Architecture Details */}
            <div className="bg-cream-off border border-cream-border rounded-2xl p-4 text-xs space-y-2">
              <div className="font-bold text-burgundy-dark uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-burgundy" />
                <span>Measured Pipeline Parameters</span>
              </div>

              <div className="flex justify-between py-1 border-b border-cream-border/60">
                <span className="text-charcoal-muted">Vector Embedding Dimension:</span>
                <span className="font-mono font-bold text-charcoal">{metrics.vector_dimension} dimensions</span>
              </div>

              <div className="flex justify-between py-1 border-b border-cream-border/60">
                <span className="text-charcoal-muted">Semantic Vector Cosine Weight:</span>
                <span className="font-mono font-bold text-charcoal">{(metrics.semantic_weight * 100).toFixed(0)}%</span>
              </div>

              <div className="flex justify-between py-1 border-b border-cream-border/60">
                <span className="text-charcoal-muted">Student Context & Format Weight:</span>
                <span className="font-mono font-bold text-charcoal">{(metrics.context_weight * 100).toFixed(0)}%</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-charcoal-muted">Total Knowledge Candidates Evaluated:</span>
                <span className="font-mono font-bold text-charcoal">{metrics.retrieved_count} items</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Zero fake benchmark numbers:</strong> These metrics are calculated dynamically from the active query and retrieved result set.
              </span>
            </div>
          </div>
        ) : (
          /* NO FAKE METRICS DISPLAY */
          <div className="py-12 px-4 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-cream-warm flex items-center justify-center text-charcoal-muted mb-3 border border-cream-border">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-charcoal mb-1">
              Evaluation data not available yet.
            </h3>
            <p className="text-xs text-charcoal-muted max-w-sm leading-relaxed">
              Perform a search to calculate live vector cosine similarity, precision metrics, and latency numbers.
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-burgundy text-white font-semibold text-xs sm:text-sm hover:bg-burgundy-dark transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
