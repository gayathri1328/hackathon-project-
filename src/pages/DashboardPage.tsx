import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  Clock, 
  AlertTriangle, 
  GraduationCap,
  History,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LearningLevel, ResourceFormat } from '../types';
import { 
  BrainDoodle, 
  BooksDoodle, 
  KnowledgeNodesDoodle 
} from '../components/doodles';
import { EDUCATIONAL_RESOURCES } from '../data/knowledgeBase';

interface DashboardPageProps {
  onSearch: (query: string, level: LearningLevel, format: ResourceFormat) => void;
  onOpenResource: (resourceId: string) => void;
  onNavigate: (page: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onSearch,
  onOpenResource,
  onNavigate
}) => {
  const { user, updateUserPreferences } = useAuth();

  // Search input starts completely blank (no hardcoded prefill!)
  const [searchQuery, setSearchQuery] = useState('');
  const [learningLevel, setLearningLevel] = useState<LearningLevel>(
    user?.learning_level || 'Beginner'
  );
  const [resourcePreference, setResourcePreference] = useState<ResourceFormat>(
    user?.preferred_format || 'Explanation'
  );

  const samplePrompts = [
    'Explain photosynthesis in simple language with real-world scenarios',
    "Teach me Newton's laws of motion with force diagrams and examples",
    'Python functions: def, parameters, and return values with line-by-line explanations',
    'I am a beginner in C. Explain pointers and physical RAM addresses simply',
    'Explain SQL joins with visual Venn set diagrams and table examples',
    'Definite calculus integration: area under curve and Riemann sum'
  ];

  const handleLevelChange = (level: LearningLevel) => {
    setLearningLevel(level);
    updateUserPreferences(level, undefined);
  };

  const handleFormatChange = (format: ResourceFormat) => {
    setResourcePreference(format);
    updateUserPreferences(undefined, format);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim(), learningLevel, resourcePreference);
    }
  };

  // Curate recommendations ONLY if user has real history or selected preferences
  const hasLearningHistory = user?.recent_learning && user.recent_learning.length > 0;
  const hasAssessments = user?.assessment_history && user.assessment_history.length > 0;
  const hasTopics = user?.topics_mastery && Object.keys(user.topics_mastery).length > 0;
  const hasAreasToImprove = user?.areas_to_improve && user.areas_to_improve.length > 0;

  // Personalized recommendations based on genuine user state
  const recommendedItems = hasLearningHistory || hasAssessments
    ? EDUCATIONAL_RESOURCES.filter((res) => {
        const isWeak = user?.areas_to_improve?.some((area) =>
          res.topic.toLowerCase().includes(area.toLowerCase())
        );
        if (isWeak && res.difficulty === 'Easy') return true;
        return res.format === resourcePreference && res.difficulty === (learningLevel === 'Beginner' ? 'Easy' : 'Medium');
      }).slice(0, 3)
    : [];

  return (
    <div className="min-h-screen bg-cream-warm py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* HERO SECTION */}
        <div className="relative bg-white border-2 border-burgundy rounded-3xl p-6 sm:p-10 shadow-doodle overflow-hidden">
          {/* Background doodles */}
          <div className="absolute -top-4 right-12 opacity-25 pointer-events-none hidden md:block">
            <KnowledgeNodesDoodle className="w-28 h-28 text-burgundy" />
          </div>
          <div className="absolute bottom-4 right-4 opacity-15 pointer-events-none hidden sm:block">
            <BrainDoodle className="w-20 h-20 text-burgundy" />
          </div>

          <div className="max-w-3xl relative z-10">
            {/* Greeting */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-burgundy-light text-burgundy-deep text-xs font-semibold mb-3 border border-burgundy-border">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized Learning Engine Active</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-burgundy-dark tracking-tight leading-tight">
              Good morning, {user?.username || 'Student'} 👋
            </h1>

            <p className="font-serif text-lg sm:text-xl text-charcoal-muted mt-2 italic font-normal">
              "Tell us what you're struggling with. We'll find what fits you."
            </p>

            {/* MAIN SEARCH BOX */}
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="bg-cream-warm border-2 border-burgundy/80 rounded-2xl p-2 sm:p-3 shadow-sm focus-within:ring-2 focus-within:ring-burgundy/20 focus-within:border-burgundy transition-all">
                <div className="flex items-start gap-3">
                  <div className="p-2 text-burgundy flex-shrink-0 mt-0.5">
                    <Search className="w-5 h-5" />
                  </div>
                  <textarea
                    rows={3}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Describe what you want to learn, or what concept you are struggling with in plain natural language..."
                    className="w-full bg-transparent border-0 focus:ring-0 text-sm sm:text-base text-charcoal resize-none placeholder:text-charcoal-muted/70 leading-relaxed font-sans"
                  />
                </div>

                {/* Controls Bar */}
                <div className="mt-3 pt-3 border-t border-burgundy-border/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-4 flex-wrap text-xs">
                    {/* Level control */}
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-charcoal-muted">Level:</span>
                      <div className="flex rounded-lg bg-white border border-burgundy-border p-0.5">
                        {(['Beginner', 'Intermediate', 'Advanced'] as LearningLevel[]).map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => handleLevelChange(lvl)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                              learningLevel === lvl
                                ? 'bg-burgundy text-white font-bold'
                                : 'text-charcoal hover:text-burgundy'
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Resource format preference */}
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-charcoal-muted">Format:</span>
                      <select
                        value={resourcePreference}
                        onChange={(e) => handleFormatChange(e.target.value as ResourceFormat)}
                        className="bg-white border border-burgundy-border rounded-lg text-[11px] font-medium px-2.5 py-1 text-charcoal focus:border-burgundy"
                      >
                        <option value="Explanation">Explanation</option>
                        <option value="Examples">Examples</option>
                        <option value="Visual Guides">Visual Guides</option>
                        <option value="Practice">Practice</option>
                        <option value="Summary">Summary</option>
                      </select>
                    </div>
                  </div>

                  {/* Find Resources CTA */}
                  <button
                    type="submit"
                    disabled={!searchQuery.trim()}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-burgundy hover:bg-burgundy-dark text-white font-bold text-xs sm:text-sm shadow-doodle transition-all hover:scale-[1.02] active:scale-100 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Find Resources</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>

            {/* Quick Prompt Ideas */}
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-semibold text-charcoal-muted uppercase tracking-wider">
                Example Prompts:
              </span>
              {samplePrompts.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSearchQuery(sample)}
                  className="text-xs bg-cream-off hover:bg-burgundy-light border border-burgundy-border/50 text-charcoal-muted hover:text-burgundy px-2.5 py-1 rounded-lg transition-colors text-left line-clamp-1 max-w-xs"
                >
                  "{sample.substring(0, 36)}..."
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PERSONALIZED WIDGETS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT 8 COLS: Continue Learning & Recommended for You */}
          <div className="lg:col-span-8 space-y-6">
            {/* Continue Learning Section */}
            <div className="bg-white border border-burgundy-border/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-burgundy-light text-burgundy flex items-center justify-center">
                    <History className="w-4 h-4" />
                  </div>
                  <h2 className="font-serif text-xl font-bold text-burgundy-dark">
                    Continue Learning
                  </h2>
                </div>
                {hasLearningHistory && (
                  <button
                    onClick={() => onNavigate('profile')}
                    className="text-xs font-semibold text-burgundy hover:underline flex items-center gap-1"
                  >
                    <span>View all history</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {hasLearningHistory ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {user.recent_learning.slice(0, 2).map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => onOpenResource(item.resource_id)}
                      className="p-4 rounded-xl border border-cream-border hover:border-burgundy bg-cream-warm/40 hover:bg-white hover:shadow-doodle-sm transition-all cursor-pointer group"
                    >
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-burgundy block mb-1">
                        {item.topic}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-charcoal group-hover:text-burgundy line-clamp-2 leading-snug">
                        {item.resource_title}
                      </h4>
                      <div className="mt-3 flex items-center justify-between text-[11px] text-charcoal-muted">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Completed
                        </span>
                        <span className="font-semibold text-burgundy group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                          Review <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* POLISHED INTENTIONAL EMPTY STATE */
                <div className="py-8 px-4 rounded-xl bg-cream-off border border-dashed border-burgundy-border/60 text-center flex flex-col items-center">
                  <BooksDoodle className="w-12 h-12 mb-2" />
                  <h4 className="font-serif font-bold text-charcoal text-sm">
                    No learning sessions yet.
                  </h4>
                  <p className="text-xs text-charcoal-muted max-w-sm mt-1">
                    Search for a topic above and study a resource to begin building your personalized learning history.
                  </p>
                </div>
              )}
            </div>

            {/* Recommended For You Section */}
            <div className="bg-white border border-burgundy-border/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-burgundy-light text-burgundy flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-burgundy-dark leading-none">
                      Recommended For You
                    </h2>
                    <span className="text-[11px] text-charcoal-muted">
                      Tailored to your {user?.learning_level.toLowerCase()} level & study history
                    </span>
                  </div>
                </div>
              </div>

              {recommendedItems.length > 0 ? (
                <div className="space-y-3">
                  {recommendedItems.map((res) => (
                    <div
                      key={res.id}
                      onClick={() => onOpenResource(res.id)}
                      className="p-4 rounded-xl border border-cream-border hover:border-burgundy bg-cream-off hover:bg-white hover:shadow-doodle-sm transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-burgundy-light text-burgundy font-bold">
                            {res.topic}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-cream-warm border border-cream-border font-medium text-charcoal-muted">
                            {res.format}
                          </span>
                          <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                            {res.difficulty}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-sm sm:text-base text-charcoal group-hover:text-burgundy leading-snug">
                          {res.title}
                        </h4>
                        <p className="text-xs text-charcoal-muted line-clamp-1 mt-1">
                          {res.short_description}
                        </p>
                      </div>

                      <div className="flex-shrink-0 self-end sm:self-center">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-burgundy group-hover:translate-x-0.5 transition-transform">
                          Study Now <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* POLISHED INTENTIONAL EMPTY STATE */
                <div className="py-8 px-4 rounded-xl bg-cream-off border border-dashed border-burgundy-border/60 text-center flex flex-col items-center">
                  <Sparkles className="w-10 h-10 text-burgundy-soft/60 mb-2" />
                  <h4 className="font-serif font-bold text-charcoal text-sm">
                    No personalized recommendations yet.
                  </h4>
                  <p className="text-xs text-charcoal-muted max-w-sm mt-1">
                    Search for a topic to receive personalized recommendations calibrated to your learning pace.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT 4 COLS: Areas to Improve & Recent Topics */}
          <div className="lg:col-span-4 space-y-6">
            {/* Areas Needing Improvement */}
            <div className="bg-white border border-burgundy-border/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-amber-light text-amber-accent flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg font-bold text-burgundy-dark">
                  Areas to Improve
                </h3>
              </div>

              {hasAreasToImprove ? (
                <div className="space-y-2">
                  <p className="text-xs text-charcoal-muted mb-2">
                    Identified based on your assessment performance:
                  </p>
                  {user.areas_to_improve.map((area, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs font-bold text-charcoal block">
                          {area}
                        </span>
                        <span className="text-[10px] text-amber-800">
                          Needs reinforcement
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          onSearch(
                            `${area} beginner explanation and practical examples`,
                            'Beginner',
                            'Explanation'
                          );
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 hover:border-amber-400 text-amber-900 text-[11px] font-semibold transition-colors"
                      >
                        Reinforce
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                /* POLISHED INTENTIONAL EMPTY STATE */
                <div className="py-6 px-3 rounded-xl bg-cream-off border border-dashed border-cream-border text-center">
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    Complete an assessment to identify areas that need reinforcement.
                  </p>
                </div>
              )}
            </div>

            {/* Recent Topics Mastery */}
            <div className="bg-white border border-burgundy-border/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-burgundy-light text-burgundy flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg font-bold text-burgundy-dark">
                  Recent Topics
                </h3>
              </div>

              {hasTopics ? (
                <div className="space-y-3">
                  {Object.entries(user.topics_mastery).map(([topic, pct]) => (
                    <div key={topic}>
                      <div className="flex items-center justify-between text-xs font-semibold mb-1">
                        <span className="text-charcoal">{topic}</span>
                        <span className="font-mono text-burgundy font-bold">{pct}%</span>
                      </div>
                      <div className="h-2 bg-cream-warm border border-cream-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-burgundy to-burgundy-soft rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="mt-5 pt-4 border-t border-cream-border text-center">
                    <button
                      onClick={() => onNavigate('profile')}
                      className="text-xs font-bold text-burgundy hover:underline inline-flex items-center gap-1"
                    >
                      <span>Open Full Learning Profile</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ) : (
                /* POLISHED INTENTIONAL EMPTY STATE */
                <div className="py-6 px-3 rounded-xl bg-cream-off border border-dashed border-cream-border text-center">
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    No topics studied yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
