export type AppView = 
  | 'path-select'
  | 'level-1-dashboard'
  | 'mode-learn'
  | 'mode-quiz'
  | 'mode-writing'
  | 'sentences-dashboard'
  | 'sentences-quiz'
  | 'reference-page'
  | 'roadmap-page'
  | 'guide-page';

export type ScriptType = 'hiragana' | 'katakana';

export type PracticeCategory = 'kata-dasar' | 'kalimat-pendek' | 'kalimat-panjang' | 'cerita';

export type PracticeInputMode = 'multiple-choice' | 'fill-in';

export interface SentenceItem {
  id: string;
  category: PracticeCategory;
  levelTitle: string;
  japanese: string;
  romaji: string;
  indonesian: string;
  explanation: string;
  options: string[];
  correctAnswer: string;
  acceptedAnswers: string[];
  hint: string;
  storyContext?: {
    title: string;
    japaneseText: string;
    romajiText: string;
    indonesianText: string;
  };
}

export interface CharacterItem {
  character: string;
  romaji: string;
  strokes?: number;
  hint?: string;
  strokeGuide?: string[];
}

export interface CharacterGroup {
  id: string;
  name: string;
  label: string;
  script: ScriptType;
  groupKey: string;
  order: number;
  characters: CharacterItem[];
}

export type GameMode = 
  | 'learn'              // Mode A: Belajar & Urutan Coretan
  | 'char-to-romaji'    // Mode B: Karakter → Romaji
  | 'romaji-to-char'    // Mode C: Romaji → Karakter
  | 'random-quiz'       // Mode D: Kuis Acak Campuran
  | 'writing';          // Mode E: Latihan Menulis di Kanvas

export interface QuizQuestion {
  id: string;
  type: 'char-to-romaji' | 'romaji-to-char';
  prompt: string;
  subPrompt?: string;
  correctAnswer: string;
  options: string[];
  characterItem: CharacterItem;
}

export interface QuizResultRecord {
  question: QuizQuestion;
  userAnswer: string;
  isCorrect: boolean;
}

export interface QuizSessionState {
  questions: QuizQuestion[];
  currentIndex: number;
  score: number;
  streak: number;
  highestStreak: number;
  results: QuizResultRecord[];
  isAnswered: boolean;
  selectedAnswer: string | null;
  isFinished: boolean;
}

export interface RoadmapLevel {
  level: number;
  title: string;
  subtitle: string;
  goal: string;
  status: 'active' | 'coming-soon';
  description: string;
  keyTopics: string[];
  category: 'Karakter' | 'Kosakata' | 'Kalimat' | 'Percakapan' | 'Dunia Kerja' | 'Simulasi Lanjutan';
}

export interface UserProgress {
  unlockedGroupOrders: number[]; // e.g. [1] initially, unlocks 2, 3...
  completedModes: Record<string, string[]>; // groupId -> ['learn', 'char-to-romaji', ...]
  highScores: Record<string, number>; // quizKey -> score
  soundEnabled: boolean;
}
