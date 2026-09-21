import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PathSelector } from './components/PathSelector';
import { Level1Dashboard } from './components/Level1Dashboard';
import { ModeLearn } from './components/ModeLearn';
import { ModeQuiz } from './components/ModeQuiz';
import { ModeWritingPractice } from './components/ModeWritingPractice';
import { ReferencePage } from './pages/ReferencePage';
import { RoadmapPage } from './pages/RoadmapPage';
import { GuidePage } from './pages/GuidePage';
import { SentencesDashboardPage } from './pages/SentencesDashboardPage';
import { SentencesQuiz } from './components/SentencesQuiz';
import { 
  AppView, 
  CharacterGroup, 
  CharacterItem, 
  GameMode, 
  UserProgress, 
  PracticeCategory, 
  PracticeInputMode 
} from './types';
import { HIRAGANA_GROUPS } from './data/hiraganaData';
import { SENTENCE_PRACTICE_ITEMS } from './data/sentencesData';
import { loadUserProgress, saveUserProgress, unlockNextGroupOrder } from './utils/storage';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress);
  const [currentView, setCurrentView] = useState<AppView>('path-select');
  const [selectedGroup, setSelectedGroup] = useState<CharacterGroup>(HIRAGANA_GROUPS[0]);
  const [quizMode, setQuizMode] = useState<'char-to-romaji' | 'romaji-to-char' | 'random-quiz'>('random-quiz');
  const [isPracticingAll, setIsPracticingAll] = useState(false);
  const [writingInitialIndex, setWritingInitialIndex] = useState(0);

  // Sentences & Story Practice State
  const [sentenceCategory, setSentenceCategory] = useState<PracticeCategory>('kata-dasar');
  const [sentenceInputMode, setSentenceInputMode] = useState<PracticeInputMode>('multiple-choice');

  // History stack for back navigation
  const [previousView, setPreviousView] = useState<AppView>('path-select');

  // Unlocked notification banner
  const [unlockedNotification, setUnlockedNotification] = useState<string | null>(null);

  // Save progress changes to local storage
  useEffect(() => {
    saveUserProgress(progress);
  }, [progress]);

  // Navigate to any page
  const handleNavigate = (view: AppView) => {
    setPreviousView(currentView);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sound toggle
  const handleToggleSound = () => {
    setProgress((prev) => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  };

  // Back Navigation
  const handleBack = () => {
    if (['mode-learn', 'mode-quiz', 'mode-writing'].includes(currentView)) {
      setCurrentView('level-1-dashboard');
    } else if (currentView === 'sentences-quiz') {
      setCurrentView('sentences-dashboard');
    } else if (currentView === 'level-1-dashboard' || currentView === 'sentences-dashboard') {
      setCurrentView('path-select');
    } else if (['reference-page', 'roadmap-page', 'guide-page'].includes(currentView)) {
      setCurrentView(previousView !== currentView ? previousView : 'path-select');
    } else {
      setCurrentView('path-select');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Group Mode Launch in Level 1
  const handleSelectGroupMode = (group: CharacterGroup, mode: GameMode) => {
    setSelectedGroup(group);
    setIsPracticingAll(false);

    if (mode === 'learn') {
      setCurrentView('mode-learn');
    } else if (mode === 'writing') {
      setWritingInitialIndex(0);
      setCurrentView('mode-writing');
    } else {
      setQuizMode(mode);
      setCurrentView('mode-quiz');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Practice All Unlocked Characters in Level 1
  const handlePracticeAllUnlocked = (mode: GameMode) => {
    setIsPracticingAll(true);
    if (mode === 'writing') {
      setSelectedGroup(HIRAGANA_GROUPS[0]);
      setWritingInitialIndex(0);
      setCurrentView('mode-writing');
    } else {
      setQuizMode(mode as 'char-to-romaji' | 'romaji-to-char' | 'random-quiz');
      setCurrentView('mode-quiz');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start Sentences & Story Practice Session
  const handleStartSentencePractice = (category: PracticeCategory, inputMode: PracticeInputMode) => {
    setSentenceCategory(category);
    setSentenceInputMode(inputMode);
    setCurrentView('sentences-quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When user clicks a character in Reference Table to practice writing in canvas
  const handleSelectCharacterPractice = (char: CharacterItem) => {
    const parentGroup = HIRAGANA_GROUPS.find((g) =>
      g.characters.some((c) => c.character === char.character)
    ) || HIRAGANA_GROUPS[0];

    const idx = parentGroup.characters.findIndex((c) => c.character === char.character);
    setSelectedGroup(parentGroup);
    setWritingInitialIndex(idx >= 0 ? idx : 0);
    setCurrentView('mode-writing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quiz Finish Handler: unlocks next group when score >= 7
  const handleFinishQuiz = (score: number, total: number) => {
    if (score >= 7 && !isPracticingAll) {
      const nextOrder = selectedGroup.order + 1;
      const isNextAvailable = HIRAGANA_GROUPS.some((g) => g.order === nextOrder);
      const isAlreadyUnlocked = progress.unlockedGroupOrders.includes(nextOrder);

      if (isNextAvailable && !isAlreadyUnlocked) {
        const nextGroup = HIRAGANA_GROUPS.find((g) => g.order === nextOrder);
        const updated = unlockNextGroupOrder(selectedGroup.order, progress);
        setProgress(updated);

        setUnlockedNotification(
          `🎉 Selamat! Kamu telah membuka ${nextGroup?.name || `Grup ${nextOrder}`} (${nextGroup?.label || ''})!`
        );

        setTimeout(() => {
          setUnlockedNotification(null);
        }, 6000);
      }
    }
  };

  // Unlocked characters pool for Level 1
  const unlockedPool = HIRAGANA_GROUPS
    .filter((g) => progress.unlockedGroupOrders.includes(g.order))
    .flatMap((g) => g.characters);

  // Filter items for current sentence quiz
  const currentSentenceItems = SENTENCE_PRACTICE_ITEMS.filter(
    (item) => item.category === sentenceCategory
  );

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-red-100 selection:text-red-900">
      {/* Top Header with Multi-Page Navigation */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onBack={handleBack}
        soundEnabled={progress.soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Unlock Notification Banner */}
      {unlockedNotification && (
        <div className="sticky top-14 z-20 mx-auto w-full max-w-2xl px-4 py-2 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-900 shadow-md">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{unlockedNotification}</span>
            </div>
            <button
              onClick={() => setUnlockedNotification(null)}
              className="text-emerald-700 hover:text-emerald-900 text-xs ml-2 font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Content Router (Multi-Page System) */}
      <main className="flex-1 pb-24 md:pb-12">
        {/* Page 1: Home / Path Select */}
        {currentView === 'path-select' && (
          <PathSelector
            progress={progress}
            onSelectHiragana={() => handleNavigate('level-1-dashboard')}
            onSelectSentences={() => handleNavigate('sentences-dashboard')}
            onOpenRoadmap={() => handleNavigate('roadmap-page')}
            onOpenReference={() => handleNavigate('reference-page')}
            onOpenGuide={() => handleNavigate('guide-page')}
          />
        )}

        {/* Page 2: Level 1 Dashboard */}
        {currentView === 'level-1-dashboard' && (
          <Level1Dashboard
            progress={progress}
            onSelectGroupMode={handleSelectGroupMode}
            onPracticeAllUnlocked={handlePracticeAllUnlocked}
            onOpenGuide={() => handleNavigate('guide-page')}
            onOpenReference={() => handleNavigate('reference-page')}
            soundEnabled={progress.soundEnabled}
          />
        )}

        {/* Page 3: Sentences & Story Dashboard */}
        {currentView === 'sentences-dashboard' && (
          <SentencesDashboardPage
            onStartPractice={handleStartSentencePractice}
            onGoToLevel1={() => handleNavigate('level-1-dashboard')}
            onGoToGuide={() => handleNavigate('guide-page')}
            soundEnabled={progress.soundEnabled}
          />
        )}

        {/* Interactive Session: Sentences & Story Quiz (Pilihan Ganda & Isian Teks) */}
        {currentView === 'sentences-quiz' && (
          <SentencesQuiz
            category={sentenceCategory}
            inputMode={sentenceInputMode}
            items={currentSentenceItems}
            onBackToDashboard={() => handleNavigate('sentences-dashboard')}
            soundEnabled={progress.soundEnabled}
          />
        )}

        {/* Subpage 4A: Mode Belajar Hiragana */}
        {currentView === 'mode-learn' && (
          <ModeLearn
            group={selectedGroup}
            onFinishLearn={() => handleNavigate('level-1-dashboard')}
            onGoToWriting={(charIndex = 0) => {
              setWritingInitialIndex(charIndex);
              handleNavigate('mode-writing');
            }}
            onGoToQuiz={() => {
              setQuizMode('random-quiz');
              handleNavigate('mode-quiz');
            }}
            soundEnabled={progress.soundEnabled}
          />
        )}

        {/* Subpage 4B: Mode Kuis Hiragana */}
        {currentView === 'mode-quiz' && (
          <ModeQuiz
            mode={quizMode}
            group={isPracticingAll ? undefined : selectedGroup}
            unlockedPool={isPracticingAll ? unlockedPool : undefined}
            title={
              isPracticingAll
                ? `Kuis Gabungan: Semua Karakter Terbuka (${unlockedPool.length} Karakter)`
                : `Kuis: ${selectedGroup.name} (${selectedGroup.label})`
            }
            onFinishQuiz={handleFinishQuiz}
            onBackToLevel={() => handleNavigate('level-1-dashboard')}
            soundEnabled={progress.soundEnabled}
          />
        )}

        {/* Subpage 4C: Mode Menulis di Kanvas Hiragana */}
        {currentView === 'mode-writing' && (
          <ModeWritingPractice
            group={selectedGroup}
            initialCharIndex={writingInitialIndex}
            onBackToLevel={() => handleNavigate('level-1-dashboard')}
            soundEnabled={progress.soundEnabled}
          />
        )}

        {/* Page 5: Standalone Reference Page */}
        {currentView === 'reference-page' && (
          <ReferencePage
            onSelectCharacterPractice={handleSelectCharacterPractice}
            onGoToLevel1={() => handleNavigate('level-1-dashboard')}
            soundEnabled={progress.soundEnabled}
          />
        )}

        {/* Page 6: Standalone 17-Level Roadmap Page */}
        {currentView === 'roadmap-page' && (
          <RoadmapPage
            onGoToLevel1={() => handleNavigate('level-1-dashboard')}
            soundEnabled={progress.soundEnabled}
          />
        )}

        {/* Page 7: Standalone Guide & Cara Pakai Page */}
        {currentView === 'guide-page' && (
          <GuidePage
            onGoToLevel1={() => handleNavigate('level-1-dashboard')}
            onGoToReference={() => handleNavigate('reference-page')}
            onGoToRoadmap={() => handleNavigate('roadmap-page')}
            onGoToSentences={() => handleNavigate('sentences-dashboard')}
            soundEnabled={progress.soundEnabled}
          />
        )}
      </main>

      {/* Footer with Multi-Page Links */}
      <footer className="border-t border-stone-200 bg-white py-6 px-4 text-xs text-stone-500">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-stone-700 font-medium">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-red-600 font-bold text-white text-[10px] font-jp">
              日
            </span>
            <span>Nihongo Quest • Game Belajar Bahasa Jepang Local-First</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 font-semibold text-stone-600">
            <button
              onClick={() => handleNavigate('path-select')}
              className="hover:text-stone-900 transition"
            >
              Beranda
            </button>
            <span>•</span>
            <button
              onClick={() => handleNavigate('level-1-dashboard')}
              className="hover:text-stone-900 transition"
            >
              Level 1 Hiragana
            </button>
            <span>•</span>
            <button
              onClick={() => handleNavigate('sentences-dashboard')}
              className="hover:text-red-600 transition font-bold text-stone-800"
            >
              Kata & Cerita
            </button>
            <span>•</span>
            <button
              onClick={() => handleNavigate('reference-page')}
              className="hover:text-stone-900 transition"
            >
              Tabel Karakter & Audio
            </button>
            <span>•</span>
            <button
              onClick={() => handleNavigate('roadmap-page')}
              className="hover:text-stone-900 transition"
            >
              Peta 17 Level
            </button>
            <span>•</span>
            <button
              onClick={() => handleNavigate('guide-page')}
              className="text-amber-700 hover:text-amber-900 transition"
            >
              💡 Panduan
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
