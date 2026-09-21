import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  ArrowRight, 
  RotateCcw, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  BookOpen, 
  Lightbulb, 
  ChevronLeft,
  Flame,
  Send
} from 'lucide-react';
import { SentenceItem, PracticeCategory, PracticeInputMode } from '../types';
import { speakJapanese, playSuccessSound, playIncorrectSound, playClickSound, playVictorySound } from '../utils/audio';

interface SentencesQuizProps {
  category: PracticeCategory;
  inputMode: PracticeInputMode; // 'multiple-choice' | 'fill-in'
  items: SentenceItem[];
  onBackToDashboard: () => void;
  soundEnabled: boolean;
}

export const SentencesQuiz: React.FC<SentencesQuizProps> = ({
  category,
  inputMode,
  items,
  onBackToDashboard,
  soundEnabled,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [fillInputValue, setFillInputValue] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showStoryTranslation, setShowStoryTranslation] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentItem = items[currentIndex];

  // Auto speak sentence when moving to next item
  useEffect(() => {
    if (currentItem && !isFinished) {
      speakJapanese(currentItem.japanese, soundEnabled);
    }
  }, [currentIndex, isFinished, soundEnabled]);

  const handleMultipleChoiceSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const correct = option === currentItem.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      playSuccessSound(soundEnabled);
      setScore((s) => s + 1);
      setStreak((st) => {
        const next = st + 1;
        if (next > highestStreak) setHighestStreak(next);
        return next;
      });
    } else {
      playIncorrectSound(soundEnabled);
      setStreak(0);
    }
  };

  const handleFillInSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isAnswered || !fillInputValue.trim()) return;

    setIsAnswered(true);

    // Normalize input
    const cleanInput = fillInputValue.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
    const isMatched = currentItem.acceptedAnswers.some((ans) => {
      const cleanAns = ans.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
      return cleanInput === cleanAns || cleanInput.includes(cleanAns) || cleanAns.includes(cleanInput);
    });

    setIsCorrect(isMatched);

    if (isMatched) {
      playSuccessSound(soundEnabled);
      setScore((s) => s + 1);
      setStreak((st) => {
        const next = st + 1;
        if (next > highestStreak) setHighestStreak(next);
        return next;
      });
    } else {
      playIncorrectSound(soundEnabled);
      setStreak(0);
    }
  };

  const handleNext = () => {
    playClickSound(soundEnabled);
    if (currentIndex + 1 < items.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setFillInputValue('');
      setIsAnswered(false);
      setIsCorrect(false);
      setShowHint(false);
    } else {
      setIsFinished(true);
      playVictorySound(soundEnabled);
    }
  };

  const handleRestart = () => {
    playClickSound(soundEnabled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setFillInputValue('');
    setIsAnswered(false);
    setIsCorrect(false);
    setShowHint(false);
    setScore(0);
    setStreak(0);
    setIsFinished(false);
  };

  const categoryTitles: Record<PracticeCategory, string> = {
    'kata-dasar': 'Kosakata Dasar',
    'kalimat-pendek': 'Kalimat Pendek',
    'kalimat-panjang': 'Kalimat Panjang & Tata Bahasa',
    'cerita': 'Cerita & Pemahaman Bacaan',
  };

  // Completion view
  if (isFinished) {
    const percentage = Math.round((score / items.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className="mx-auto max-w-xl px-4 py-8 sm:py-12">
        <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 text-center shadow-md space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600">
            {passed ? <Sparkles className="h-10 w-10 text-amber-500 animate-bounce" /> : <BookOpen className="h-10 w-10 text-stone-600" />}
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Hasil Sesi Latihan
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
              {passed ? 'Luar Biasa! Kemampuan Meningkat!' : 'Latihan Selesai, Ayo Ulangi!'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              Kategori: <strong>{categoryTitles[category]}</strong> • Mode:{' '}
              <strong>{inputMode === 'multiple-choice' ? 'Pilihan Ganda' : 'Isian Teks'}</strong>
            </p>
          </div>

          {/* Score Stats */}
          <div className="grid grid-cols-3 gap-3 rounded-2xl bg-stone-50 p-4 border border-stone-100">
            <div>
              <span className="text-[10px] font-bold text-stone-400 block uppercase">Skor Benar</span>
              <span className="text-xl font-black text-emerald-600">{score} / {items.length}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-stone-400 block uppercase">Akurasi</span>
              <span className="text-xl font-black text-stone-900">{percentage}%</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-stone-400 block uppercase">Streak Tertinggi</span>
              <span className="text-xl font-black text-amber-600">🔥 {highestStreak}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              id="quiz-retry-btn"
              onClick={handleRestart}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-xs font-bold text-stone-800 hover:bg-stone-50 transition"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Ulangi Sesi</span>
            </button>

            <button
              id="quiz-back-hub-btn"
              onClick={onBackToDashboard}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-red-700 shadow-sm transition"
            >
              <span>Kembali ke Arena Kalimat</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8 space-y-5">
      {/* Top Bar Navigation & Stats */}
      <div className="flex items-center justify-between gap-4">
        <button
          id="quiz-exit-btn"
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-50 transition shadow-xs"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Keluar</span>
        </button>

        <div className="flex items-center gap-3">
          {streak > 1 && (
            <div className="inline-flex items-center gap-1 rounded-xl bg-amber-50 border border-amber-200 px-2.5 py-1 text-xs font-bold text-amber-800 animate-pulse">
              <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>{streak} Beruntun</span>
            </div>
          )}

          <span className="rounded-xl bg-stone-100 px-3 py-1 text-xs font-bold text-stone-600">
            Soal {currentIndex + 1} / {items.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
        <div 
          className="h-full bg-red-600 transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
        />
      </div>

      {/* Story Context Box (If category is 'cerita') */}
      {currentItem.storyContext && (
        <div className="rounded-3xl border border-stone-200 bg-white p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-red-600" />
              <h3 className="text-xs sm:text-sm font-bold text-stone-900">
                {currentItem.storyContext.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => speakJapanese(currentItem.storyContext!.japaneseText, soundEnabled)}
                className="inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1 text-[11px] font-bold text-stone-700 hover:bg-stone-100 transition"
                title="Dengarkan seluruh cerita"
              >
                <Volume2 className="h-3.5 w-3.5 text-red-600" />
                <span className="hidden sm:inline">Dengarkan Cerita</span>
              </button>

              <button
                onClick={() => setShowStoryTranslation(!showStoryTranslation)}
                className="rounded-lg bg-stone-100 px-2.5 py-1 text-[11px] font-semibold text-stone-600 hover:bg-stone-200 transition"
              >
                {showStoryTranslation ? 'Sembunyikan Terjemahan' : 'Tampilkan Terjemahan'}
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-amber-50/50 border border-amber-100/80 p-4 font-jp text-sm sm:text-base leading-relaxed text-stone-800 whitespace-pre-line">
            {currentItem.storyContext.japaneseText}
          </div>

          {showStoryTranslation && (
            <div className="space-y-2 rounded-2xl bg-stone-50 p-4 border border-stone-100 text-xs sm:text-sm text-stone-600 animate-in fade-in duration-200">
              <div className="font-mono text-stone-500 leading-relaxed whitespace-pre-line">
                {currentItem.storyContext.romajiText}
              </div>
              <div className="border-t border-stone-200 pt-2 text-stone-800 leading-relaxed whitespace-pre-line font-sans">
                {currentItem.storyContext.indonesianText}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Question Card */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        {/* Header of Question */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-stone-100 px-2.5 py-1 text-[11px] font-bold text-stone-600">
              {currentItem.levelTitle}
            </span>
            <span className="rounded-md bg-red-50 text-red-700 px-2.5 py-1 text-[11px] font-bold border border-red-200">
              {inputMode === 'multiple-choice' ? 'Pilihan Ganda' : 'Isian Teks'}
            </span>
          </div>

          <button
            onClick={() => speakJapanese(currentItem.japanese, soundEnabled)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition active:scale-95"
            title="Dengarkan pengucapan audio"
          >
            <Volume2 className="h-4 w-4" />
          </button>
        </div>

        {/* Japanese Prompt Display */}
        <div className="text-center py-4 bg-stone-50/70 rounded-2xl border border-stone-100 px-4">
          <div className="text-2xl sm:text-3xl md:text-4xl font-black font-jp text-stone-900 tracking-wide leading-relaxed">
            {currentItem.japanese}
          </div>
          <div className="mt-2 text-xs sm:text-sm font-mono text-stone-500">
            {currentItem.romaji}
          </div>
          {category !== 'cerita' && (
            <div className="mt-1 text-xs font-semibold text-stone-400">
              {inputMode === 'multiple-choice' ? 'Pilih arti bahasa Indonesia yang tepat:' : 'Tuliskan artinya atau romaji di bawah:'}
            </div>
          )}
        </div>

        {/* INPUT MODE: MULTIPLE CHOICE */}
        {inputMode === 'multiple-choice' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentItem.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isOptionCorrect = option === currentItem.correctAnswer;

              let btnStyle = 'border-stone-200 bg-white text-stone-800 hover:border-stone-400 hover:bg-stone-50/50';

              if (isAnswered) {
                if (isOptionCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                } else if (isSelected) {
                  btnStyle = 'border-red-500 bg-red-50 text-red-900 line-through';
                } else {
                  btnStyle = 'border-stone-200 bg-stone-50 text-stone-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  id={`choice-btn-${idx}`}
                  disabled={isAnswered}
                  onClick={() => handleMultipleChoiceSelect(option)}
                  className={`flex items-center justify-between rounded-2xl border-2 p-4 text-left text-xs sm:text-sm transition active:scale-[0.99] ${btnStyle}`}
                >
                  <span>{option}</span>
                  {isAnswered && isOptionCorrect && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 ml-2" />
                  )}
                  {isAnswered && isSelected && !isOptionCorrect && (
                    <XCircle className="h-4 w-4 text-red-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* INPUT MODE: FILL-IN / TYPING TEXT */}
        {inputMode === 'fill-in' && (
          <div className="space-y-4">
            <form onSubmit={handleFillInSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                id="fill-in-input-field"
                type="text"
                disabled={isAnswered}
                value={fillInputValue}
                onChange={(e) => setFillInputValue(e.target.value)}
                placeholder="Ketik arti (cth: kucing) atau romaji (cth: neko)..."
                className="flex-1 rounded-2xl border-2 border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-red-500 focus:outline-hidden disabled:bg-stone-50 disabled:text-stone-500"
                autoFocus
              />

              <button
                id="submit-answer-btn"
                type="submit"
                disabled={isAnswered || !fillInputValue.trim()}
                className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-red-600 px-6 py-3 text-xs font-bold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-xs"
              >
                <span>Periksa</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>

            {/* Hint toggler */}
            {!isAnswered && (
              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="inline-flex items-center gap-1 font-semibold text-amber-700 hover:text-amber-800"
                >
                  <Lightbulb className="h-3.5 w-3.5" />
                  <span>{showHint ? 'Sembunyikan Petunjuk' : 'Butuh Petunjuk (Hint)?'}</span>
                </button>
                <span className="text-stone-400 text-[11px]">Tekan Enter untuk memeriksa</span>
              </div>
            )}

            {showHint && !isAnswered && (
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3.5 text-xs text-amber-900 animate-in fade-in duration-200">
                💡 <strong>Petunjuk:</strong> {currentItem.hint}
              </div>
            )}
          </div>
        )}

        {/* FEEDBACK & EXPLANATION CARD AFTER ANSWER */}
        {isAnswered && (
          <div className={`rounded-2xl border p-4 sm:p-5 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
            isCorrect ? 'border-emerald-200 bg-emerald-50/80 text-emerald-950' : 'border-red-200 bg-red-50/80 text-red-950'
          }`}>
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span className="text-sm font-black text-emerald-800">Tepat Sekali! Benar! 🎉</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-600 shrink-0" />
                  <span className="text-sm font-black text-red-800">Kurang Tepat! Terus Semangat!</span>
                </>
              )}
            </div>

            <div className="space-y-1 text-xs text-stone-700">
              <div>
                <strong>Arti Sebenarnya:</strong> {currentItem.indonesian}
              </div>
              <div>
                <strong>Pelafalan (Romaji):</strong> <span className="font-mono">{currentItem.romaji}</span>
              </div>
              <div className="pt-1 text-stone-600 leading-relaxed border-t border-stone-200/60 mt-1">
                <strong>Penjelasan Tata Bahasa / Makna:</strong> {currentItem.explanation}
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-2 flex justify-end">
              <button
                id="next-question-btn"
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-5 py-2 text-xs font-bold text-white hover:bg-stone-800 shadow-sm transition active:scale-95"
              >
                <span>{currentIndex + 1 < items.length ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
