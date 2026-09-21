import React, { useState } from 'react';
import { Volume2, ChevronLeft, ChevronRight, PenTool, HelpCircle, CheckCircle } from 'lucide-react';
import { CharacterGroup, CharacterItem } from '../types';
import { speakJapanese, playClickSound } from '../utils/audio';

interface ModeLearnProps {
  group: CharacterGroup;
  onFinishLearn: () => void;
  onGoToWriting: (charIndex?: number) => void;
  onGoToQuiz: () => void;
  soundEnabled: boolean;
}

export const ModeLearn: React.FC<ModeLearnProps> = ({
  group,
  onFinishLearn,
  onGoToWriting,
  onGoToQuiz,
  soundEnabled,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentChar: CharacterItem = group.characters[currentIndex];

  const handleNext = () => {
    if (currentIndex < group.characters.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      playClickSound(soundEnabled);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      playClickSound(soundEnabled);
    }
  };

  const handleCharSelect = (idx: number) => {
    setCurrentIndex(idx);
    playClickSound(soundEnabled);
    speakJapanese(group.characters[idx].character, soundEnabled);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      {/* Top Breadcrumb & Progress */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Mode A • Belajar Karakter
          </span>
          <h2 className="text-xl font-black text-stone-900 sm:text-2xl">
            {group.name} — {group.label}
          </h2>
        </div>
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-600">
          {currentIndex + 1} dari {group.characters.length}
        </span>
      </div>

      {/* Character Selector Pills */}
      <div className="mb-6 flex items-center justify-center gap-2">
        {group.characters.map((item, idx) => (
          <button
            key={item.character}
            id={`learn-select-${item.romaji}`}
            onClick={() => handleCharSelect(idx)}
            className={`flex h-11 w-11 flex-col items-center justify-center rounded-xl border font-bold transition-all sm:h-12 sm:w-12 active:scale-95 ${
              currentIndex === idx
                ? 'border-red-600 bg-red-600 text-white shadow-md scale-105'
                : 'border-stone-200 bg-white text-stone-800 hover:border-stone-300 hover:bg-stone-50'
            }`}
          >
            <span className="text-lg font-['Noto_Sans_JP']">{item.character}</span>
            <span className="text-[10px] opacity-80">{item.romaji}</span>
          </button>
        ))}
      </div>

      {/* Main Flashcard */}
      <div className="relative rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8 text-center flex flex-col items-center">
        {/* Prominent Japanese Character */}
        <div className="relative my-4 flex h-48 w-48 items-center justify-center rounded-3xl bg-stone-50 border border-stone-100 shadow-inner sm:h-56 sm:w-56">
          <span className="text-8xl font-black text-stone-900 font-['Noto_Sans_JP'] sm:text-9xl select-none">
            {currentChar.character}
          </span>

          {/* Sound trigger */}
          <button
            id="learn-sound-btn"
            onClick={() => speakJapanese(currentChar.character, soundEnabled)}
            className="absolute -bottom-3 -right-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-md transition hover:bg-red-700 active:scale-95"
            title="Dengarkan Lafal Asli Jepang"
          >
            <Volume2 className="h-6 w-6" />
          </button>
        </div>

        {/* Romaji & Sound Pronunciation */}
        <div className="mt-2 text-center">
          <div className="text-3xl font-black tracking-wide text-red-600 font-mono sm:text-4xl">
            {currentChar.romaji}
          </div>
          <p className="text-xs text-stone-400 mt-0.5">
            Dibaca seperti: <strong className="text-stone-700 font-semibold">"{currentChar.romaji}"</strong>
          </p>
        </div>

        {/* Memory Hint & Strokes */}
        <div className="mt-6 w-full max-w-md space-y-3 text-left">
          {currentChar.hint && (
            <div className="rounded-2xl bg-amber-50/80 border border-amber-200/80 p-3.5 text-xs text-amber-900">
              <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-800">
                <HelpCircle className="h-3.5 w-3.5" />
                Tips Mengingat Bentuk:
              </div>
              <p className="leading-relaxed">{currentChar.hint}</p>
            </div>
          )}

          {currentChar.strokeGuide && (
            <div className="rounded-2xl bg-stone-50 border border-stone-200 p-3.5 text-xs text-stone-700">
              <div className="font-bold text-stone-900 mb-1.5 flex items-center justify-between">
                <span>Urutan Coretan (Stroke Order):</span>
                <span className="text-[11px] text-stone-500 font-mono">
                  {currentChar.strokes} Tarikan
                </span>
              </div>
              <ul className="space-y-1 text-[11px] text-stone-600">
                {currentChar.strokeGuide.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="font-bold text-red-600">{idx + 1}.</span>
                    <span>{step.replace(/^\d+\.\s*/, '')}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Navigation arrows */}
        <div className="mt-8 flex w-full max-w-md items-center justify-between gap-3">
          <button
            id="learn-prev-btn"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-bold transition active:scale-95 ${
              currentIndex === 0
                ? 'border-stone-200 text-stone-300 cursor-not-allowed'
                : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            Sebelumnya
          </button>

          <button
            id="learn-practice-write-btn"
            onClick={() => onGoToWriting(currentIndex)}
            className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-100 px-3.5 py-2.5 text-xs font-bold text-stone-800 hover:bg-stone-200 active:scale-95 transition"
          >
            <PenTool className="h-3.5 w-3.5" />
            Latihan Tulis
          </button>

          {currentIndex < group.characters.length - 1 ? (
            <button
              id="learn-next-btn"
              onClick={handleNext}
              className="flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-red-700 active:scale-95 transition"
            >
              Berikutnya
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              id="learn-finish-btn"
              onClick={onFinishLearn}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 active:scale-95 transition"
            >
              <CheckCircle className="h-4 w-4" />
              Selesai Belajar
            </button>
          )}
        </div>
      </div>

      {/* Quick Launch Quiz banner */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-stone-100/70 p-4 text-xs">
        <div className="text-stone-700 text-center sm:text-left">
          <strong>Sudah hafal bentuknya?</strong> Uji kemampuan pengenalanmu dengan kuis interaktif.
        </div>
        <button
          id="learn-start-quiz-cta"
          onClick={onGoToQuiz}
          className="rounded-xl bg-stone-900 px-4 py-2 text-xs font-bold text-white hover:bg-stone-800 active:scale-95 transition whitespace-nowrap"
        >
          Mulai Kuis Karakter →
        </button>
      </div>
    </div>
  );
};
