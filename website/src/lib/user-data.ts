// User Progress & Data Types

export interface UserProgress {
  totalTopicsCompleted: number;
  topicsBySection: Record<string, number>;
  studyStreak: number;
  lastStudyDate: string | null;
  totalStudyTime: number; // in minutes
  sessionsLog: StudySession[];
  achievements: Achievement[];
}

export interface StudySession {
  id: string;
  date: string;
  duration: number; // minutes
  topic: string;
  section: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface InterviewQuestion {
  id: string;
  title: string;
  company: string;
  role: string;
  type: 'coding' | 'system-design' | 'behavioral' | 'sql';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  solution?: string;
  hints: string[];
  tags: string[];
  leetCodeLink?: string;
  timesAsked: number;
  userRating?: number;
  userNotes?: string;
  solved: boolean;
  solvedAt?: string;
  attempts: number;
}

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  status: 'researching' | 'applied' | 'screening' | 'interview' | 'offer' | 'rejected' | 'withdrawn';
  dateApplied: string;
  location: string;
  jobUrl?: string;
  referral?: string;
  salaryRange?: string;
  notes: string;
  interviews: InterviewRound[];
  createdAt: string;
  updatedAt: string;
}

export interface InterviewRound {
  id: string;
  type: string;
  date: string;
  feedback?: string;
  rating?: number;
}

export interface StudyPlan {
  id: string;
  name: string;
  targetCompanies: string[];
  targetRole: string;
  weeks: number;
  hoursPerWeek: number;
  startDate: string;
  endDate: string;
  topics: StudyTopic[];
  progress: number;
  createdAt: string;
}

export interface StudyTopic {
  id: string;
  name: string;
  section: string;
  estimatedHours: number;
  completed: boolean;
  completedAt?: string;
  resources: string[];
}

// Storage Keys
export const STORAGE_KEYS = {
  PROGRESS: 'faang-progress',
  QUESTIONS: 'faang-questions',
  APPLICATIONS: 'faang-applications',
  STUDY_PLANS: 'faang-study-plans',
  SETTINGS: 'faang-settings',
};

// Helper Functions
export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function loadFromStorage<T>(key: string): T | null {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getDaysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Initialize default data
export function initializeStorage(): void {
  // Initialize progress
  if (!loadFromStorage(STORAGE_KEYS.PROGRESS)) {
    saveToStorage(STORAGE_KEYS.PROGRESS, {
      totalTopicsCompleted: 0,
      topicsBySection: {},
      studyStreak: 0,
      lastStudyDate: null,
      totalStudyTime: 0,
      sessionsLog: [],
      achievements: [],
    } as UserProgress);
  }

  // Initialize questions
  if (!loadFromStorage(STORAGE_KEYS.QUESTIONS)) {
    saveToStorage(STORAGE_KEYS.QUESTIONS, [] as InterviewQuestion[]);
  }

  // Initialize applications
  if (!loadFromStorage(STORAGE_KEYS.APPLICATIONS)) {
    saveToStorage(STORAGE_KEYS.APPLICATIONS, [] as JobApplication[]);
  }

  // Initialize study plans
  if (!loadFromStorage(STORAGE_KEYS.STUDY_PLANS)) {
    saveToStorage(STORAGE_KEYS.STUDY_PLANS, [] as StudyPlan[]);
  }
}
