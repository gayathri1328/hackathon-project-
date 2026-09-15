import React from 'react';
import { 
  BarChart2, 
  AlertTriangle, 
  Award, 
  Clock, 
  Sparkles, 
  ArrowRight,
  Calendar,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GraduationCapDoodle, BooksDoodle } from '../components/doodles';
import { EDUCATIONAL_RESOURCES } from '../data/knowledgeBase';

interface ProfilePageProps {
  onOpenResource: (resourceId: string) => void;
  onSearchTopic: (query: string) => void;
  onNavigate: (page: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  onOpenResource,
  onSearchTopic,
  onNavigate
}) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-cream-warm flex items-center justify-center p-6 text-center">
        <div className="bg-white p-8 rounded-3xl border border-burgundy-border shadow-card max-w-md">
          <p className="text-sm text-charcoal-muted mb-4">Please sign in to view your learning profile.</p>
          <button
            onClick={() => onNavigate('login')}
            className="px-5 py-2.5 rounded-xl bg-burgundy text-white font-bold text-xs"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const hasTopics = user.topics_mastery && Object.keys(user.topics_mastery).length > 0;
  const hasAssessments = user.assessment_history && user.assessment_history.length > 0;
  const hasLearning = user.recent_learning && user.recent_learning.length > 0;
  const hasAreasToImprove = user.areas_to_improve && user.areas_to_improve.length > 0;

  // Targeted recommendations ONLY based on genuine user improvement areas or recent topics
  const targetedRecommendations = hasAreasToImprove
    ? EDUCATIONAL_RESOURCES.filter((res) => {
        return user.areas_to_improve.some(
          (area) => res.topic.toLowerCase().includes(area.toLowerCase()) ||
                    area.toLowerCase().includes(res.topic.toLowerCase())
        );
      }).slice(0, 3)
    : [];

  return (
    <div className="min-h-screen bg-cream-warm py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* PROFILE IDENTITY BANNER */}
        <div className="bg-white border-2 border-burgundy rounded-3xl p-6 sm:p-8 shadow-doodle relative overflow-hidden">
          <div className="absolute top-4 right-8 opacity-15 pointer-events-none hidden sm:block">
            <GraduationCapDoodle className="w-24 h-24 text-burgundy" />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-burgundy text-white flex items-center justify-center font-serif font-black text-2xl shadow-doodle-sm">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy-dark tracking-tight">
                    @{user.username}
                  </h1>
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-burgundy-light text-burgundy border border-burgundy-border">
                    {user.learning_level}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
                  Active Student • Preferred format: <span className="font-semibold text-charcoal">{user.preferred_format}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-cream-warm border border-burgundy-border/60 rounded-2xl px-4 py-2 text-center">
                <span className="text-[10px] uppercase font-bold text-charcoal-muted block">
                  Quizzes Completed
                </span>
                <span className="font-mono text-xl font-bold text-burgundy">
                  {user.assessment_history?.length || 0}
                </span>
              </div>
              <div className="bg-cream-warm border border-burgundy-border/60 rounded-2xl px-4 py-2 text-center">
                <span className="text-[10px] uppercase font-bold text-charcoal-muted block">
                  Resources Studied
                </span>
                <span className="font-mono text-xl font-bold text-burgundy">
                  {user.recent_learning?.length || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* TOPICS LEARNED & MASTERY PROGRESS BARS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white border border-burgundy-border/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-burgundy-light text-burgundy flex items-center justify-center">
                    <BarChart2 className="w-4 h-4" />
                  </div>
                  <h2 className="font-serif text-xl font-bold text-burgundy-dark">
                    Topics Learned & Mastery
                  </h2>
                </div>
                <span className="text-[11px] font-mono text-charcoal-muted">
                  Cumulative Score
                </span>
              </div>

              {hasTopics ? (
                <div className="space-y-4">
                  {Object.entries(user.topics_mastery).map(([topic, pct]) => (
                    <div key={topic} className="p-3.5 rounded-xl bg-cream-warm/50 border border-cream-border">
                      <div className="flex items-center justify-between text-sm font-semibold mb-1.5">
                        <span className="text-charcoal font-medium">{topic}</span>
                        <span className="font-mono text-burgundy font-bold">{pct}%</span>
                      </div>
                      <div className="h-2.5 bg-white border border-cream-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-burgundy to-burgundy-soft rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* POLISHED INTENTIONAL EMPTY STATE */
                <div className="py-8 px-4 rounded-xl bg-cream-off border border-dashed border-burgundy-border/60 text-center flex flex-col items-center">
                  <BooksDoodle className="w-10 h-10 text-burgundy/60 mb-2" />
                  <h4 className="font-serif font-bold text-charcoal text-sm">
                    Your learning profile will build as you learn.
                  </h4>
                  <p className="text-xs text-charcoal-muted max-w-xs mt-1">
                    Study resources and complete knowledge assessments to build your topic mastery profile.
                  </p>
                </div>
              )}
            </div>

            {/* AREAS NEEDING IMPROVEMENT */}
            <div className="bg-white border border-burgundy-border/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-light text-amber-accent flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-burgundy-dark leading-none">
                    Areas Needing Improvement
                  </h2>
                  <span className="text-xs text-charcoal-muted">
                    Topics scored &lt; 70% in assessments
                  </span>
                </div>
              </div>

              {hasAreasToImprove ? (
                <div className="space-y-2.5 mt-4">
                  {user.areas_to_improve.map((area, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between gap-3"
                    >
                      <div>
                        <span className="text-xs font-bold text-charcoal block">
                          {area}
                        </span>
                        <span className="text-[10px] text-amber-800">
                          Priority target for personalized retrieval
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          onSearchTopic(`${area} beginner explanation and practical examples`)
                        }
                        className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 hover:border-amber-500 text-amber-900 text-xs font-semibold shadow-sm transition-colors"
                      >
                        Reinforce Topic
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
          </div>

          {/* RIGHT 6 COLS: Assessment History & Recent Learning */}
          <div className="lg:col-span-6 space-y-6">
            {/* Assessment History */}
            <div className="bg-white border border-burgundy-border/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-burgundy-light text-burgundy flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <h2 className="font-serif text-xl font-bold text-burgundy-dark">
                  Assessment History
                </h2>
              </div>

              {hasAssessments ? (
                <div className="space-y-3">
                  {user.assessment_history.map((asmt) => (
                    <div
                      key={asmt.id}
                      className="p-3.5 rounded-xl border border-cream-border bg-cream-off flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs font-bold text-burgundy-dark block">
                          {asmt.topic} (Attempt #{asmt.attempt_number || 1})
                        </span>
                        <span className="text-[10px] text-charcoal-muted flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          {new Date(asmt.taken_at).toLocaleDateString()} • {asmt.level}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                          asmt.percentage >= 70
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {asmt.score}/{asmt.total} ({asmt.percentage}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* POLISHED INTENTIONAL EMPTY STATE */
                <div className="py-8 px-4 rounded-xl bg-cream-off border border-dashed border-cream-border text-center">
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    No assessments completed yet.
                  </p>
                </div>
              )}
            </div>

            {/* Recent Learning Activity */}
            <div className="bg-white border border-burgundy-border/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-burgundy-light text-burgundy flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <h2 className="font-serif text-xl font-bold text-burgundy-dark">
                  Recent Learning Activity
                </h2>
              </div>

              {hasLearning ? (
                <div className="space-y-3">
                  {user.recent_learning.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => onOpenResource(item.resource_id)}
                      className="p-3 rounded-xl border border-cream-border hover:border-burgundy bg-cream-warm/40 hover:bg-white transition-colors cursor-pointer flex items-center justify-between group"
                    >
                      <div className="pr-2">
                        <span className="text-[10px] font-mono font-bold text-burgundy uppercase block">
                          {item.topic}
                        </span>
                        <h4 className="font-serif text-xs font-bold text-charcoal group-hover:text-burgundy line-clamp-1">
                          {item.resource_title}
                        </h4>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-burgundy flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                    </div>
                  ))}
                </div>
              ) : (
                /* POLISHED INTENTIONAL EMPTY STATE */
                <div className="py-8 px-4 rounded-xl bg-cream-off border border-dashed border-cream-border text-center">
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    No learning activity yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PERSONALIZED RECOMMENDATIONS SECTION */}
        <div className="bg-white border-2 border-burgundy rounded-3xl p-6 sm:p-8 shadow-doodle">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-burgundy text-white flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-burgundy-dark">
                Adaptive Recommendations
              </h3>
              <p className="text-xs text-charcoal-muted">
                Curated specifically for your learning profile and weak areas
              </p>
            </div>
          </div>

          {targetedRecommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {targetedRecommendations.map((res) => (
                <div
                  key={res.id}
                  onClick={() => onOpenResource(res.id)}
                  className="p-4 rounded-2xl border border-burgundy-border/70 hover:border-burgundy bg-cream-warm hover:bg-white hover:shadow-doodle-sm transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-burgundy-light text-burgundy font-bold mb-2 inline-block">
                      {res.topic}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-charcoal group-hover:text-burgundy leading-snug">
                      {res.title}
                    </h4>
                    <p className="text-xs text-charcoal-muted mt-1 line-clamp-2">
                      {res.short_description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-cream-border flex items-center justify-between text-xs text-burgundy font-semibold">
                    <span>Study Concept</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* POLISHED INTENTIONAL EMPTY STATE */
            <div className="py-8 px-4 rounded-xl bg-cream-off border border-dashed border-burgundy-border/60 text-center">
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Search for a topic to receive personalized recommendations.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
