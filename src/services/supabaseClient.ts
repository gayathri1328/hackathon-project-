import { UserProfile, LearningLevel, ResourceFormat } from '../types';

// V2 Namespaced storage keys - completely purges any stale demo data from previous sessions!
const STORAGE_KEYS = {
  USERS: 'fourbidden_v2_users_db',
  ACTIVE_USER: 'fourbidden_v2_active_user',
  PROFILES: 'fourbidden_v2_profiles_db',
  ATTEMPTS: 'fourbidden_v2_attempts_db'
};

// Legacy keys to clean up on startup
const LEGACY_KEYS = [
  'fourbidden_logic_users_db',
  'fourbidden_logic_active_user',
  'fourbidden_logic_profiles_db',
  'fourbidden_logic_attempts_db',
  'fourbidden_logic_history_db'
];

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + '_fourbidden_salt_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

interface StoredUser {
  id: string;
  username: string;
  passwordHash: string;
  createdAt: string;
}

// Ensure database containers exist in localStorage without injecting dummy data
function initializeLocalDatabase() {
  // Purge legacy storage keys to guarantee no demo accounts or phantom recent topics persist
  LEGACY_KEYS.forEach(key => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore in non-browser environments
    }
  });

  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify({}));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PROFILES)) {
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify({}));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ATTEMPTS)) {
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify({}));
  }
}

initializeLocalDatabase();

export const supabaseAuth = {
  /**
   * Register new student profile with username & password
   * Starts with 100% clean, fresh profile with NO previous topics, scores, or history!
   */
  async signUp(username: string, password: string): Promise<{ success: boolean; profile?: UserProfile; error?: string }> {
    const cleanUsername = username.trim();
    if (!cleanUsername || cleanUsername.length < 3) {
      return { success: false, error: 'Username must be at least 3 characters long.' };
    }
    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    const usersStr = localStorage.getItem(STORAGE_KEYS.USERS) || '{}';
    const users: Record<string, StoredUser> = JSON.parse(usersStr);

    const key = cleanUsername.toLowerCase();
    if (users[key]) {
      return { success: false, error: 'Username already exists. Please choose a unique username.' };
    }

    const passwordHash = await hashPassword(password);
    const userId = 'usr-' + Math.random().toString(36).substring(2, 9);
    
    users[key] = {
      id: userId,
      username: cleanUsername,
      passwordHash,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // Create a 100% fresh, empty student profile
    const newProfile: UserProfile = {
      id: userId,
      username: cleanUsername,
      learning_level: 'Beginner',
      preferred_format: 'Explanation',
      created_at: new Date().toISOString(),
      topics_mastery: {}, // 100% EMPTY for fresh student!
      recent_learning: [], // 100% EMPTY!
      areas_to_improve: [], // 100% EMPTY!
      assessment_history: [], // 100% EMPTY!
      assessment_attempts: {}
    };

    const profilesStr = localStorage.getItem(STORAGE_KEYS.PROFILES) || '{}';
    const profiles = JSON.parse(profilesStr);
    profiles[cleanUsername] = newProfile;
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));

    // Set as active session
    localStorage.setItem(STORAGE_KEYS.ACTIVE_USER, cleanUsername);

    return { success: true, profile: newProfile };
  },

  /**
   * Log in student using username and password
   */
  async signIn(username: string, password: string): Promise<{ success: boolean; profile?: UserProfile; error?: string }> {
    const cleanUsername = username.trim();
    if (!cleanUsername || !password) {
      return { success: false, error: 'Please enter both username and password.' };
    }

    const usersStr = localStorage.getItem(STORAGE_KEYS.USERS) || '{}';
    const users: Record<string, StoredUser> = JSON.parse(usersStr);

    const user = users[cleanUsername.toLowerCase()];
    if (!user) {
      return { success: false, error: 'User not found. Please check your username or sign up for a new account.' };
    }

    const hash = await hashPassword(password);
    if (user.passwordHash !== hash) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    const profilesStr = localStorage.getItem(STORAGE_KEYS.PROFILES) || '{}';
    const profiles = JSON.parse(profilesStr);
    const profile = profiles[user.username];

    if (!profile) {
      return { success: false, error: 'Profile record not found for this user.' };
    }

    localStorage.setItem(STORAGE_KEYS.ACTIVE_USER, user.username);
    return { success: true, profile };
  },

  /**
   * Log out active student
   */
  async signOut(): Promise<void> {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER);
  },

  /**
   * Get currently active student profile - Strictly returns null if no session active!
   */
  getActiveProfile(): UserProfile | null {
    const activeUsername = localStorage.getItem(STORAGE_KEYS.ACTIVE_USER);
    if (!activeUsername) {
      return null;
    }

    const profilesStr = localStorage.getItem(STORAGE_KEYS.PROFILES) || '{}';
    const profiles = JSON.parse(profilesStr);
    return profiles[activeUsername] || null;
  },

  /**
   * Get current attempt count for a topic by user
   */
  getAttemptNumber(username: string, topic: string): number {
    const attemptsStr = localStorage.getItem(STORAGE_KEYS.ATTEMPTS) || '{}';
    const attempts = JSON.parse(attemptsStr);
    const userAttempts = attempts[username] || {};
    return (userAttempts[topic] || 0) + 1;
  },

  /**
   * Save assessment score to student profile, increment attempt, and update topic mastery
   */
  async saveAssessmentResult(
    username: string,
    topic: string,
    level: LearningLevel,
    score: number,
    total: number
  ): Promise<UserProfile> {
    const profilesStr = localStorage.getItem(STORAGE_KEYS.PROFILES) || '{}';
    const profiles = JSON.parse(profilesStr);
    const profile: UserProfile | undefined = profiles[username];

    if (!profile) {
      throw new Error(`Profile not found for user: ${username}`);
    }

    // Increment attempts tracking
    const attemptsStr = localStorage.getItem(STORAGE_KEYS.ATTEMPTS) || '{}';
    const attempts = JSON.parse(attemptsStr);
    if (!attempts[username]) attempts[username] = {};
    const attemptNumber = (attempts[username][topic] || 0) + 1;
    attempts[username][topic] = attemptNumber;
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));

    const percentage = Math.round((score / total) * 100);

    // Record assessment attempt
    profile.assessment_history.unshift({
      id: 'asmt-' + Date.now(),
      topic,
      level,
      attempt_number: attemptNumber,
      score,
      total,
      percentage,
      taken_at: new Date().toISOString()
    });

    if (!profile.assessment_attempts) {
      profile.assessment_attempts = {};
    }
    profile.assessment_attempts[topic] = attemptNumber;

    // Determine category key
    let categoryKey = topic;
    if (topic.toLowerCase().includes('pointer') || topic.toLowerCase().includes('c ')) {
      categoryKey = 'C Programming';
    } else if (topic.toLowerCase().includes('sql') || topic.toLowerCase().includes('join') || topic.toLowerCase().includes('normaliz')) {
      categoryKey = 'DBMS';
    } else if (topic.toLowerCase().includes('list') || topic.toLowerCase().includes('tree') || topic.toLowerCase().includes('bst')) {
      categoryKey = 'Data Structures';
    } else if (topic.toLowerCase().includes('schedul') || topic.toLowerCase().includes('cpu')) {
      categoryKey = 'Operating Systems';
    }

    // Update mastery
    if (profile.topics_mastery[categoryKey] === undefined) {
      profile.topics_mastery[categoryKey] = percentage;
    } else {
      const currentMastery = profile.topics_mastery[categoryKey];
      profile.topics_mastery[categoryKey] = Math.min(100, Math.max(0, Math.round(currentMastery * 0.5 + percentage * 0.5)));
    }

    // Update areas to improve dynamically:
    if (percentage < 70) {
      if (!profile.areas_to_improve.includes(topic)) {
        profile.areas_to_improve.push(topic);
      }
    } else {
      profile.areas_to_improve = profile.areas_to_improve.filter(
        t => t.toLowerCase() !== topic.toLowerCase()
      );
    }

    profiles[username] = profile;
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
    return profile;
  },

  /**
   * Record resource studied into learning history
   */
  async recordResourceCompleted(
    username: string,
    topic: string,
    resourceId: string,
    resourceTitle: string
  ): Promise<UserProfile> {
    const profilesStr = localStorage.getItem(STORAGE_KEYS.PROFILES) || '{}';
    const profiles = JSON.parse(profilesStr);
    const profile: UserProfile | undefined = profiles[username];

    if (!profile) {
      throw new Error(`Profile not found for user: ${username}`);
    }

    profile.recent_learning = profile.recent_learning.filter(r => r.resource_id !== resourceId);
    profile.recent_learning.unshift({
      topic,
      resource_id: resourceId,
      resource_title: resourceTitle,
      completed_at: new Date().toISOString()
    });

    if (profile.recent_learning.length > 8) {
      profile.recent_learning = profile.recent_learning.slice(0, 8);
    }

    profiles[username] = profile;
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
    return profile;
  },

  /**
   * Update student preferred level or format
   */
  async updatePreferences(
    username: string,
    updates: Partial<Pick<UserProfile, 'learning_level' | 'preferred_format'>>
  ): Promise<UserProfile> {
    const profilesStr = localStorage.getItem(STORAGE_KEYS.PROFILES) || '{}';
    const profiles = JSON.parse(profilesStr);
    const profile: UserProfile | undefined = profiles[username];

    if (!profile) {
      throw new Error(`Profile not found for user: ${username}`);
    }

    Object.assign(profile, updates);
    profiles[username] = profile;
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
    return profile;
  }
};
