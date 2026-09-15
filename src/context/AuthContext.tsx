import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabaseAuth } from '../services/supabaseClient';
import { LearningLevel, ResourceFormat, UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUserPreferences: (level?: LearningLevel, format?: ResourceFormat) => Promise<void>;
  recordStudySession: (topic: string, resourceId: string, resourceTitle: string) => Promise<void>;
  recordAssessment: (topic: string, level: LearningLevel, score: number, total: number) => Promise<UserProfile>;
  getTopicAttemptNumber: (topic: string) => number;
  refreshProfile: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Only load from localStorage if an active session exists
    const active = supabaseAuth.getActiveProfile();
    setUser(active);
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    const result = await supabaseAuth.signIn(username, password);
    if (result.success && result.profile) {
      setUser(result.profile);
      setIsLoading(false);
      return { success: true };
    }
    setIsLoading(false);
    return { success: false, error: result.error || 'Authentication failed' };
  };

  const signUp = async (username: string, password: string) => {
    setIsLoading(true);
    const result = await supabaseAuth.signUp(username, password);
    if (result.success && result.profile) {
      setUser(result.profile);
      setIsLoading(false);
      return { success: true };
    }
    setIsLoading(false);
    return { success: false, error: result.error || 'Sign up failed' };
  };

  const logout = async () => {
    await supabaseAuth.signOut();
    setUser(null);
  };

  const updateUserPreferences = async (level?: LearningLevel, format?: ResourceFormat) => {
    if (!user) return;
    const updates: Partial<Pick<UserProfile, 'learning_level' | 'preferred_format'>> = {};
    if (level) updates.learning_level = level;
    if (format) updates.preferred_format = format;
    const updated = await supabaseAuth.updatePreferences(user.username, updates);
    setUser({ ...updated });
  };

  const recordStudySession = async (topic: string, resourceId: string, resourceTitle: string) => {
    if (!user) return;
    const updated = await supabaseAuth.recordResourceCompleted(user.username, topic, resourceId, resourceTitle);
    setUser({ ...updated });
  };

  const recordAssessment = async (topic: string, level: LearningLevel, score: number, total: number) => {
    if (!user) throw new Error("No student is currently logged in.");
    const updated = await supabaseAuth.saveAssessmentResult(user.username, topic, level, score, total);
    setUser({ ...updated });
    return updated;
  };

  const getTopicAttemptNumber = (topic: string): number => {
    if (!user) return 1;
    return supabaseAuth.getAttemptNumber(user.username, topic);
  };

  const refreshProfile = () => {
    const active = supabaseAuth.getActiveProfile();
    setUser(active ? { ...active } : null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signUp,
        logout,
        updateUserPreferences,
        recordStudySession,
        recordAssessment,
        getTopicAttemptNumber,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
