import React, { useState } from 'react';
import { Lock, User, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GraduationCapDoodle, BooksDoodle } from '../components/doodles';

interface SignUpPageProps {
  onNavigate: (page: string) => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({ onNavigate }) => {
  const { signUp } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanUser = username.trim();
    if (!cleanUser || cleanUser.length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    const res = await signUp(cleanUser, password);
    setIsSubmitting(false);

    if (res.success) {
      onNavigate('dashboard');
    } else {
      setError(res.error || 'Failed to create account.');
    }
  };

  return (
    <div className="min-h-screen bg-cream-warm flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl border-2 border-burgundy shadow-doodle-lg overflow-hidden">
        {/* LEFT BRANDING PANEL */}
        <div className="lg:col-span-6 bg-gradient-to-br from-burgundy-dark to-burgundy p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-4 right-6 opacity-20 pointer-events-none">
            <GraduationCapDoodle className="w-24 h-24 text-cream-warm" />
          </div>

          <div>
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

            <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight mb-4">
              Begin your personalized <br />
              <span className="text-burgundy-tint italic">learning journey.</span>
            </h1>

            <p className="text-sm text-cream-warm/80 leading-relaxed mb-8 max-w-md">
              Create your fresh student profile to start receiving AI-retrieved educational materials tailored specifically to your learning pace and assessment mastery.
            </p>

            <div className="space-y-3 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <div className="flex items-center gap-2.5 text-xs text-cream-warm">
                <CheckCircle2 className="w-4 h-4 text-burgundy-tint" />
                <span>Isolated student profile & learning history</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-cream-warm">
                <CheckCircle2 className="w-4 h-4 text-burgundy-tint" />
                <span>Natural-language query intent deconstruction</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-cream-warm">
                <CheckCircle2 className="w-4 h-4 text-burgundy-tint" />
                <span>Dynamic multi-level assessments & adaptive recommendations</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/15 text-xs text-cream-warm/70 flex items-center gap-2">
            <BooksDoodle className="w-5 h-5 text-cream-warm" />
            <span>Secure credentials & authentic vector retrieval</span>
          </div>
        </div>

        {/* RIGHT SIGN UP FORM */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between bg-cream-off">
          <div>
            <div className="mb-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy-dark tracking-tight">
                Create Student Account
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
                Choose a unique username to initialize your personalized learning space
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
                  Unique Username
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
                    placeholder="e.g. student123"
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
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-burgundy-border focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 rounded-xl text-sm text-charcoal transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-muted">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-burgundy-border focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 rounded-xl text-sm text-charcoal transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-burgundy hover:bg-burgundy-dark text-white font-semibold text-sm shadow-doodle transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                <span>{isSubmitting ? 'Creating Profile...' : 'Complete Registration'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          <div className="mt-8 text-center pt-6 border-t border-cream-border">
            <p className="text-xs text-charcoal-muted">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="font-bold text-burgundy hover:underline underline-offset-2"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
