import React, { useState } from 'react';
import { 
  LogOut, 
  BarChart3, 
  User, 
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenMetrics?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenMetrics }) => {
  const { user, logout } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-cream-warm/95 backdrop-blur-md border-b border-burgundy-border/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Brand Identity */}
        <div 
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-burgundy flex items-center justify-center text-white shadow-doodle-sm group-hover:scale-105 transition-transform">
            <span className="font-serif font-black text-xl tracking-tighter">4L</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-black text-lg sm:text-xl text-burgundy-dark tracking-tight leading-none">
                Fourbidden Logic
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-burgundy-light text-burgundy font-bold border border-burgundy-border/70">
                EDU-06
              </span>
            </div>
            <span className="text-[11px] text-charcoal-muted tracking-tight hidden sm:block">
              AI Personalized Learning Resource Retriever
            </span>
          </div>
        </div>

        {/* Center / Right Navigation Controls */}
        <nav className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <>
              {/* Dashboard Link */}
              <button
                onClick={() => onNavigate('dashboard')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  currentPage === 'dashboard'
                    ? 'bg-burgundy text-white shadow-sm'
                    : 'text-charcoal hover:bg-burgundy-light hover:text-burgundy'
                }`}
              >
                Dashboard
              </button>

              {/* Profile Link */}
              <button
                onClick={() => onNavigate('profile')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  currentPage === 'profile'
                    ? 'bg-burgundy text-white shadow-sm'
                    : 'text-charcoal hover:bg-burgundy-light hover:text-burgundy'
                }`}
              >
                Learning Profile
              </button>

              {/* Evaluation Metrics Button */}
              {onOpenMetrics && (
                <button
                  onClick={onOpenMetrics}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cream-off hover:bg-burgundy-light text-burgundy border border-burgundy-border transition-colors"
                  title="View Live RAG & Retrieval Performance Metrics"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-burgundy" />
                  <span>RAG Metrics</span>
                </button>
              )}

              {/* Authenticated User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-burgundy-border hover:border-burgundy text-xs font-medium text-charcoal shadow-sm transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-burgundy text-white flex items-center justify-center font-bold text-[11px]">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left hidden sm:block">
                    <span className="font-bold text-burgundy-dark block leading-none">
                      @{user.username}
                    </span>
                    <span className="text-[10px] text-charcoal-muted leading-none">
                      {user.learning_level}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-charcoal-muted" />
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-burgundy-border rounded-xl shadow-card p-2 z-50 animate-fadeIn">
                    <div className="px-2.5 py-1.5 border-b border-cream-border mb-1">
                      <span className="text-xs font-bold text-burgundy-dark block">
                        @{user.username}
                      </span>
                      <span className="text-[10px] text-charcoal-muted">
                        Level: {user.learning_level}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onNavigate('profile');
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-cream-warm text-charcoal flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-burgundy" />
                      <span>View Profile</span>
                    </button>

                    <div className="border-t border-cream-border mt-1 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setShowUserDropdown(false);
                          onNavigate('login');
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-rose-700 hover:bg-rose-50 flex items-center gap-2 font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('login')}
                className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-burgundy hover:bg-burgundy-light transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate('signup')}
                className="px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-burgundy hover:bg-burgundy-dark text-white shadow-doodle-sm transition-all"
              >
                Get Started
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
