import { UserProgress } from '../types';

const STORAGE_KEY = 'nihongo_game_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
  unlockedGroupOrders: [1], // Group 1 unlocked by default
  completedModes: {},
  highScores: {},
  soundEnabled: true,
};

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      unlockedGroupOrders: Array.isArray(parsed.unlockedGroupOrders) && parsed.unlockedGroupOrders.length > 0
        ? parsed.unlockedGroupOrders
        : [1],
      completedModes: parsed.completedModes || {},
      highScores: parsed.highScores || {},
      soundEnabled: typeof parsed.soundEnabled === 'boolean' ? parsed.soundEnabled : true,
    };
  } catch (e) {
    console.error('Failed to load progress from localStorage:', e);
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage:', e);
  }
}

export function unlockNextGroupOrder(currentOrder: number, progress: UserProgress): UserProgress {
  const nextOrder = currentOrder + 1;
  const updatedUnlocked = Array.from(new Set([...progress.unlockedGroupOrders, nextOrder])).sort((a, b) => a - b);
  const updated: UserProgress = {
    ...progress,
    unlockedGroupOrders: updatedUnlocked,
  };
  saveUserProgress(updated);
  return updated;
}
