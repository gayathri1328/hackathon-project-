import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  ArrowRight, 
  Sparkles, 
  BrainCircuit, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  BrainDoodle, 
  BooksDoodle, 
  StarsDoodle, 
  KnowledgeNodesDoodle 
} from '../components/doodles';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  // Form fields MUST ALWAYS start completely blank as requested!
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setIsSubmitting(true);
    const res = await login(username.trim(), password);
    setIsSubmitting(false);

    if (res.success) {
      onNavigate('dashboard');
    } else {
      setError(res.error || 'Authentication failed. Please verify your credentials or create an account.');
    }
  };

  return (
    <div className="min-h-screen bg-cream-warm flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl border-2 border-burgundy shadow-doodle-lg overflow-hidden">
        {/* LEFT BRANDING PANEL */}
        <div className="lg:col-span-6 bg-gradient-to-br from-burgundy-dark to-burgundy p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Floating background doodles */}
          <div className="absolute top-4 right-6 opacity-20 pointer-events-none">
            <StarsDoodle className="w-20 h-20 text-cream-warm" />
          </div>
          <div className="absolute bottom-8 left-4 opacity-15 pointer-events-none">
            <KnowledgeNodesDoodle className="w-28 h-28 text-cream-warm" />
          </div>

          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-cream-warm text-burgundy flex items-center justify-center font-serif font-black text-2xl shadow-md">
                4L
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight block">
                  Fourbidden Logic
                </span>
                <span className="text-xs uppercase font-mono tracking-widest text-burgundy-tint">
                  INTELLIX 2026 • EDU-06
                </span>
              </div>
            </div>

            {/* Tagline */}
            <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight mb-4">
              Learn smarter. <br />
              <span className="text-burgundy-tint italic">Find what fits you.</span>
            </h1>

            <p className="text-sm text-cream-warm/80 leading-relaxed mb-8 max-w-md">
              An AI-powered educational resource retrieval engine that translates your natural language learning queries into vector embeddings and re-ranks resources based on your real mastery level.
            </p>

            {/* Learning flow visual */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-burgundy-tint block font-semibold">
                Personalized Retrieval Loop
              </span>
              <div className="flex items-center justify-between text-xs text-cream-warm">
                <span className="flex items-center gap-1.5 font-medium">
                  <BrainCircuit className="w-3.5 h-3.5 text-burgundy-tint" /> Natural Query
                </span>
                <span className="text-burgundy-tint font-bold">→</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-burgundy-tint" /> RAG & Vector
                </span>
                <span className="text-burgundy-tint font-bold">→</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-burgundy-tint" /> Ranked For You
                </span>
              </div>
            </div>
          </div>

          {/* Doodles bottom banner */}
          <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between text-xs text-cream-warm/70">
            <span className="flex items-center gap-2">
              <BooksDoodle className="w-6 h-6 text-cream-warm" />
              Real pgvector Cosine Search
            </span>
            <span className="font-mono text-[11px]">Edu-AI v1.0</span>
          </div>
        </div>

        {/* RIGHT LOGIN CARD */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between bg-cream-off">
          <div>
            <div className="mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy-dark tracking-tight">
                Student Sign In
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-1.5">
                Sign in with your username and password to load your personal learning profile
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-muted">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-burgundy-border focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 rounded-xl text-sm text-charcoal transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-muted">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-burgundy-border focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 rounded-xl text-sm text-charcoal transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-3 py-3 px-4 rounded-xl bg-burgundy hover:bg-burgundy-dark text-white font-semibold text-sm shadow-doodle transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                <span>{isSubmitting ? 'Signing In...' : 'Sign In to Dashboard'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Create Account Footer Link */}
          <div className="mt-8 pt-6 border-t border-cream-border text-center">
            <p className="text-xs sm:text-sm text-charcoal-muted">
              Don't have a learning profile yet?{' '}
              <button
                type="button"
                onClick={() => onNavigate('signup')}
                className="font-bold text-burgundy hover:underline underline-offset-2"
              >
                Create a Free Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
