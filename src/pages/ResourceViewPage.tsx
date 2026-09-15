import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Award, 
  Code2, 
  ArrowRight, 
  HelpCircle, 
  ImageIcon, 
  Sparkles, 
  ListTree, 
  Lightbulb, 
  Compass, 
  Check,
  Layers,
  Thermometer,
  Sun,
  Zap,
  Table,
  Cpu,
  Bookmark,
  Share2,
  CheckCircle,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getResourceById, getResourcesByTopic } from '../services/ragEngine';
import { ResourceFormat } from '../types';
import { MarkdownRenderer } from '../components/common/MarkdownRenderer';
import { VisualGuideCanvas } from '../components/visualizer/VisualGuideCanvas';
import { 
  StarsDoodle, 
  LightBulbDoodle, 
  BooksDoodle, 
  ArrowDoodle, 
  StickyNoteDoodle 
} from '../components/doodles';

interface ResourceViewPageProps {
  resourceId: string;
  onTakeAssessment: (topicName: string) => void;
  onNavigate: (page: string) => void;
  onFormatChange?: (format: ResourceFormat) => void;
}

export const ResourceViewPage: React.FC<ResourceViewPageProps> = ({
  resourceId,
  onTakeAssessment,
  onNavigate,
  onFormatChange
}) => {
  const { recordStudySession } = useAuth();
  const [activeResourceId, setActiveResourceId] = useState(resourceId);
  const [activeCodeTab, setActiveCodeTab] = useState(0);
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});
  const [revealedQuickChecks, setRevealedQuickChecks] = useState<Record<number, boolean>>({});
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  // Synchronize when prop changes
  useEffect(() => {
    setActiveResourceId(resourceId);
  }, [resourceId]);

  // Lookup active resource
  const resource = getResourceById(activeResourceId) || {
    id: activeResourceId,
    title: 'Comprehensive Educational Resource',
    topic: 'Academic Foundations',
    category: 'General Academics',
    difficulty: 'Easy' as const,
    format: 'Explanation' as const,
    read_time: '12 min',
    short_description: 'Educational material retrieved for your learning query.',
    full_content: 'Comprehensive learning material is loaded.',
    key_takeaways: ['Foundations govern systemic behavior.'],
    tags: ['education', 'learning'],
    prerequisites: ['Foundational Concepts']
  };

  useEffect(() => {
    if (resource) {
      recordStudySession(resource.topic, resource.id, resource.title);
    }
  }, [activeResourceId]);

  const toggleSolution = (idx: number) => {
    setRevealedSolutions(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const toggleQuickCheck = (idx: number) => {
    setRevealedQuickChecks(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(idx);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  // Format switching handler
  const handleSwitchFormat = (newFormat: ResourceFormat) => {
    onFormatChange?.(newFormat);
    const siblings = getResourcesByTopic(resource.topic);
    const targetSibling = siblings.find(s => s.format === newFormat);
    if (targetSibling) {
      setActiveResourceId(targetSibling.id);
    }
  };

  const isExplanation = resource.format === 'Explanation';
  const isVisualGuide = resource.format === 'Visual Guides';
  const isMasterSummary = resource.format === 'Summary';
  const isExamples = resource.format === 'Examples';
  const isPractice = resource.format === 'Practice';

  const activeSnippet = resource.code_snippets?.[activeCodeTab];

  // Helper to pick a topic-adaptive illustration doodle
  const getTopicDoodle = (t: string) => {
    const tLower = t.toLowerCase();
    if (tLower.includes('temperature')) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-sm border border-amber-200">
          <Thermometer className="w-6 h-6" />
        </div>
      );
    }
    if (tLower.includes('photosynthesis')) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-sm border border-emerald-200">
          <Sun className="w-6 h-6" />
        </div>
      );
    }
    if (tLower.includes('pointer')) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-burgundy-light text-burgundy flex items-center justify-center shadow-sm border border-burgundy-border">
          <Code2 className="w-6 h-6" />
        </div>
      );
    }
    if (tLower.includes('newton')) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center shadow-sm border border-blue-200">
          <Zap className="w-6 h-6" />
        </div>
      );
    }
    if (tLower.includes('join') || tLower.includes('sql')) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center shadow-sm border border-purple-200">
          <Table className="w-6 h-6" />
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded-2xl bg-burgundy-light text-burgundy flex items-center justify-center shadow-sm border border-burgundy-border">
        <Sparkles className="w-6 h-6" />
      </div>
    );
  };

  const formatsList: ResourceFormat[] = [
    'Explanation',
    'Examples',
    'Visual Guides',
    'Summary',
    'Practice'
  ];

  return (
    <div className="min-h-screen bg-cream-warm py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* TOP CONTROLS & NAVIGATION BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-burgundy-border/40">
          <button
            onClick={() => onNavigate('search')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-burgundy-border hover:border-burgundy text-burgundy text-xs font-semibold shadow-sm transition-all hover:-translate-x-0.5 self-start"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Search Results</span>
          </button>

          {/* STICKY FORMAT SELECTOR PILLS */}
          <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-white/80 rounded-2xl border border-burgundy-border/60 shadow-xs">
            {formatsList.map((fmt) => {
              const isActive = resource.format === fmt;
              return (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => handleSwitchFormat(fmt)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
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

          {/* Test Knowledge (Assessment) Action Button */}
          <button
            onClick={() => onTakeAssessment(resource.topic)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-burgundy hover:bg-burgundy-dark text-white text-xs font-bold shadow-doodle-sm transition-all hover:scale-105 self-start sm:self-auto"
          >
            <Award className="w-4 h-4" />
            <span>Test Knowledge</span>
          </button>
        </div>

        {/* ==================================================================== */}
        {/* CASE 1: VISUAL GUIDE CANVAS (GENUINELY VISUAL FIRST EXPERIENCE)       */}
        {/* ==================================================================== */}
        {isVisualGuide ? (
          <VisualGuideCanvas
            topic={resource.topic}
            category={resource.category}
            difficulty={resource.difficulty}
          />
        ) : (
          /* ==================================================================== */
          /* CASE 2: TEACHING EXPERIENCES (EXPLANATION, EXAMPLES, SUMMARY, PRACTICE)*/
          /* ==================================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* MAIN STUDY COLUMN */}
            <div className="lg:col-span-8 space-y-6">
              <article className="bg-white border-2 border-burgundy rounded-3xl p-6 sm:p-10 shadow-doodle">
                {/* HERO TEACHING HEADER */}
                <div className="mb-8 pb-6 border-b border-burgundy-border/40">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className="px-3 py-0.5 rounded-full text-[11px] font-mono font-bold bg-burgundy-light text-burgundy-dark border border-burgundy-border">
                          [{resource.category}]
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cream-warm text-charcoal border border-cream-border">
                          {resource.topic.toUpperCase()}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {resource.difficulty} Level
                        </span>
                      </div>

                      <h1 className="font-serif text-2xl sm:text-4xl font-bold text-burgundy-dark tracking-tight leading-tight">
                        {resource.topic}
                      </h1>

                      <p className="font-serif italic text-sm sm:text-base text-charcoal-muted mt-1.5">
                        "Let's understand this step by step."
                      </p>

                      <div className="flex items-center gap-4 text-xs text-charcoal-muted mt-3 flex-wrap font-sans">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-burgundy" />
                          {resource.read_time} study
                        </span>
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-burgundy" />
                          Format: {resource.format}
                        </span>
                        <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                          <Sparkles className="w-3.5 h-3.5" />
                          Topic Locked: {resource.topic}
                        </span>
                      </div>
                    </div>

                    {/* Topic Adaptive Illustration Doodle */}
                    <div className="flex-shrink-0 hidden sm:block">
                      {getTopicDoodle(resource.topic)}
                    </div>
                  </div>
                </div>

                {/* ========================================================== */}
                {/* 1. EXPLANATION & SUMMARY BODY (MARKDOWN RENDERER)          */}
                {/* ========================================================== */}
                {(isExplanation || isMasterSummary) && (
                  <div className="space-y-6">
                    <MarkdownRenderer content={resource.full_content} />
                  </div>
                )}

                {/* ========================================================== */}
                {/* 2. PROGRAMMING CODE EXAMPLES (WITH LINE-BY-LINE UNDERNEATH)*/}
                {/* ========================================================== */}
                {isExamples && resource.code_snippets && resource.code_snippets.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-3 border-b border-cream-border">
                      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-burgundy">
                        <Code2 className="w-4 h-4" />
                        <span>Interactive Code Examples ({resource.code_snippets.length} Implementations)</span>
                      </div>
                    </div>

                    {/* Tabs */}
                    {resource.code_snippets.length > 1 && (
                      <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        {resource.code_snippets.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveCodeTab(idx)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                              activeCodeTab === idx
                                ? 'bg-burgundy text-white shadow-sm font-bold'
                                : 'bg-cream-warm hover:bg-burgundy-light text-charcoal border border-cream-border'
                            }`}
                          >
                            Implementation {idx + 1}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Active Block */}
                    {activeSnippet && (
                      <div className="space-y-4">
                        <div className="bg-charcoal rounded-2xl overflow-hidden border border-burgundy/40 shadow-inner">
                          <div className="bg-charcoal-dark px-4 py-2.5 flex items-center justify-between text-xs text-cream-warm/70 font-mono border-b border-white/10">
                            <span>{activeSnippet.language.toUpperCase()} • Example {activeCodeTab + 1}</span>
                            <button
                              onClick={() => handleCopyCode(activeSnippet.code, activeCodeTab)}
                              className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-cream-warm transition-colors"
                            >
                              {copiedCodeIndex === activeCodeTab ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-400">Copied!</span>
                                </>
                              ) : (
                                <span>Copy Code</span>
                              )}
                            </button>
                          </div>

                          <pre className="p-4 sm:p-6 text-xs sm:text-sm font-mono text-cream-warm overflow-x-auto leading-relaxed">
                            <code>{activeSnippet.code}</code>
                          </pre>

                          {activeSnippet.expected_output && (
                            <div className="bg-charcoal-dark/95 p-3.5 border-t border-white/10 font-mono text-xs text-emerald-400 leading-relaxed">
                              <span className="text-cream-warm/60 font-sans font-bold block mb-1">Expected Output:</span>
                              <pre className="whitespace-pre-wrap">{activeSnippet.expected_output}</pre>
                            </div>
                          )}

                          {activeSnippet.explanation && (
                            <div className="bg-charcoal-dark/80 p-3.5 border-t border-white/10 text-xs text-cream-warm/90 flex items-start gap-2 leading-relaxed">
                              <span className="text-amber-400 font-bold">💡 Overview:</span>
                              <span>{activeSnippet.explanation}</span>
                            </div>
                          )}
                        </div>

                        {/* LINE-BY-LINE EXPLANATION DIRECTLY BELOW CODE BLOCK */}
                        {activeSnippet.line_by_line && activeSnippet.line_by_line.length > 0 && (
                          <div className="bg-cream-warm rounded-2xl border-2 border-burgundy-border/70 p-5">
                            <div className="flex items-center gap-2 text-xs font-bold text-burgundy uppercase tracking-wider mb-3">
                              <ListTree className="w-4 h-4" />
                              <span>Line-by-Line Explanation (Example {activeCodeTab + 1})</span>
                            </div>

                            <div className="space-y-2 text-xs">
                              {activeSnippet.line_by_line.map((item, lIdx) => (
                                <div key={lIdx} className="p-2.5 rounded-xl bg-white border border-burgundy-border/30">
                                  <code className="font-mono font-bold text-burgundy block mb-1 text-[11px] bg-cream-off px-2 py-0.5 rounded border border-burgundy-border/20 overflow-x-auto">
                                    {item.line}
                                  </code>
                                  <p className="text-charcoal leading-relaxed pl-1 text-[11px] sm:text-xs">
                                    {item.explanation}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* ========================================================== */}
                {/* 3. NON-PROGRAMMING REAL-WORLD SCENARIOS & ANALOGIES        */}
                {/* ========================================================== */}
                {isExamples && resource.real_world_examples && resource.real_world_examples.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2 text-sm font-bold uppercase tracking-wider text-burgundy pb-2 border-b border-cream-border">
                      <Compass className="w-4 h-4" />
                      <span>Real-World Scenarios, Everyday Analogies & Case Studies ({resource.real_world_examples.length})</span>
                    </div>

                    <div className="space-y-4">
                      {resource.real_world_examples.map((item, idx) => (
                        <div key={idx} className="p-5 rounded-2xl bg-cream-warm border border-burgundy-border/60 space-y-2.5">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-burgundy text-white flex items-center justify-center font-bold text-xs">
                              {idx + 1}
                            </span>
                            <h4 className="font-serif text-base font-bold text-burgundy-dark">
                              {item.title}
                            </h4>
                          </div>

                          <div className="bg-white p-3.5 rounded-xl border border-cream-border text-xs sm:text-sm text-charcoal leading-relaxed">
                            <strong className="text-charcoal-dark block mb-1 font-semibold">Real-Life Situation:</strong>
                            {item.scenario}
                          </div>

                          <p className="text-xs sm:text-sm text-charcoal leading-relaxed pt-1">
                            <strong className="text-burgundy">Scientific / Academic Mechanism: </strong>
                            {item.explanation}
                          </p>

                          {item.analogy && (
                            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                              <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <strong>Everyday Analogy: </strong>
                                <span>{item.analogy}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ========================================================== */}
                {/* 4. PRACTICE CHALLENGES (20 QUESTIONS)                      */}
                {/* ========================================================== */}
                {isPractice && resource.practice_exercises && resource.practice_exercises.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-cream-border mb-4">
                      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-burgundy">
                        <HelpCircle className="w-4 h-4" />
                        <span>Practice Challenges ({resource.practice_exercises.length} Questions for {resource.topic})</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {resource.practice_exercises.map((ex, idx) => (
                        <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-cream-warm border border-burgundy-border/60">
                          <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-burgundy text-white flex items-center justify-center font-bold text-xs">
                                {idx + 1}
                              </span>
                              {ex.type && (
                                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-burgundy-light text-burgundy border border-burgundy-border">
                                  {ex.type}
                                </span>
                              )}
                            </div>
                            {ex.difficulty && (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-white border border-cream-border font-medium text-charcoal-muted">
                                {ex.difficulty}
                              </span>
                            )}
                          </div>

                          <p className="text-xs sm:text-sm font-medium text-charcoal-dark mb-3">
                            {ex.question}
                          </p>

                          {/* Options if MCQ */}
                          {ex.options && ex.options.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                              {ex.options.map((opt, oIdx) => (
                                <div
                                  key={oIdx}
                                  className="p-2.5 rounded-xl bg-white border border-cream-border text-xs text-charcoal flex items-start gap-2"
                                >
                                  <span className="w-4 h-4 rounded-full bg-cream-warm text-charcoal font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                                    {String.fromCharCode(65 + oIdx)}
                                  </span>
                                  <span>{opt}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Reveal Solution Button */}
                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={() => toggleSolution(idx)}
                              className="text-xs font-semibold text-burgundy hover:underline flex items-center gap-1"
                            >
                              <span>{revealedSolutions[idx] ? 'Hide Solution & Hint' : 'Reveal Solution & Hint'}</span>
                              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${revealedSolutions[idx] ? 'rotate-180' : ''}`} />
                            </button>

                            {revealedSolutions[idx] && (
                              <div className="mt-3 p-3.5 rounded-xl bg-white border border-emerald-200 text-xs text-charcoal space-y-1.5 animate-fadeIn">
                                <p className="font-semibold text-emerald-800">
                                  ✓ Correct Answer: {ex.correct_answer}
                                </p>
                                {ex.solution && (
                                  <p className="text-charcoal-muted text-[11px] leading-relaxed">
                                    <strong>Explanation:</strong> {ex.solution}
                                  </p>
                                )}
                                {ex.hint && (
                                  <p className="text-amber-800 text-[11px] italic bg-amber-50 p-2 rounded border border-amber-200">
                                    💡 <strong>Hint:</strong> {ex.hint}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            </div>

            {/* ========================================================== */}
            {/* RIGHT SIDEBAR (DIGITAL STUDENT NOTEBOOK MARGIN)            */}
            {/* ========================================================== */}
            <div className="lg:col-span-4 space-y-6">
              {/* NOTEBOOK STATS & QUICK NAV CARD */}
              <div className="bg-white border-2 border-burgundy rounded-3xl p-6 shadow-doodle relative overflow-hidden">
                <div className="absolute top-2 right-4 opacity-20 pointer-events-none">
                  <StarsDoodle className="w-16 h-16 text-burgundy" />
                </div>

                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-burgundy block mb-2">
                  STUDY COMPANION NOTEBOOK
                </span>

                <h3 className="font-serif text-lg font-bold text-charcoal-dark mb-4">
                  {resource.topic}
                </h3>

                <div className="space-y-2.5 text-xs text-charcoal pb-4 border-b border-cream-border">
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted">Subject Domain:</span>
                    <strong className="font-medium text-charcoal">{resource.category}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted">Assessed Difficulty:</span>
                    <strong className="font-medium text-emerald-700">{resource.difficulty}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted">Active Format:</span>
                    <strong className="font-medium text-burgundy">{resource.format}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted">Est. Read Time:</span>
                    <strong className="font-medium text-charcoal">{resource.read_time}</strong>
                  </div>
                </div>

                {/* "Remember in 1 Sentence" Golden Card */}
                <div className="mt-5 p-4 rounded-2xl bg-amber-50/90 border-2 border-amber-200 text-xs text-amber-950">
                  <span className="font-serif font-bold text-amber-900 block mb-1 text-xs flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    Remember in 1 Sentence:
                  </span>
                  <p className="italic leading-relaxed">
                    {resource.key_takeaways?.[0] || `${resource.topic} provides the deterministic rules governing state equilibrium.`}
                  </p>
                </div>

                {/* Key Takeaways Checklist */}
                {resource.key_takeaways && resource.key_takeaways.length > 1 && (
                  <div className="mt-4 pt-3 border-t border-cream-border">
                    <span className="text-[11px] font-bold text-charcoal-muted uppercase tracking-wider block mb-2">
                      Core Revision Points:
                    </span>
                    <ul className="space-y-1.5 text-xs text-charcoal">
                      {resource.key_takeaways.slice(1, 4).map((kt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-burgundy flex-shrink-0 mt-0.5" />
                          <span>{kt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Take Assessment CTA */}
                <div className="mt-6 pt-4 border-t border-cream-border">
                  <button
                    onClick={() => onTakeAssessment(resource.topic)}
                    className="w-full py-3 px-4 rounded-2xl bg-burgundy hover:bg-burgundy-dark text-white font-serif font-bold text-xs shadow-doodle transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <Award className="w-4 h-4" />
                    <span>Test Topic Knowledge</span>
                  </button>
                  <p className="text-[10px] text-charcoal-muted text-center mt-2">
                    Takes 3–5 minutes • Calibrated to {resource.difficulty}
                  </p>
                </div>
              </div>

              {/* SIBLING FORMATS DIRECT ACCESS CARD */}
              <div className="bg-cream-off border border-burgundy-border/60 rounded-2xl p-5 text-xs space-y-3">
                <span className="font-mono uppercase font-bold text-[10px] text-burgundy tracking-wider block">
                  Other Formats for {resource.topic}
                </span>

                <div className="space-y-2">
                  {formatsList.map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => handleSwitchFormat(fmt)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-colors ${
                        resource.format === fmt
                          ? 'bg-burgundy-light border-burgundy text-burgundy font-bold'
                          : 'bg-white border-cream-border hover:border-burgundy-border text-charcoal'
                      }`}
                    >
                      <span>{fmt}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-burgundy" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
