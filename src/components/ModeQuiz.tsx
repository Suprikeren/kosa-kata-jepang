import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, CheckCircle2, XCircle, RotateCcw, ArrowRight, Home, Sparkles, Award } from 'lucide-react';
import { CharacterGroup, CharacterItem, QuizQuestion, QuizResultRecord } from '../types';
import { generateQuizQuestions } from '../utils/quizGenerator';
import { playSuccessSound, playIncorrectSound, playVictorySound, speakJapanese, playClickSound } from '../utils/audio';

interface ModeQuizProps {
  mode: 'char-to-romaji' | 'romaji-to-char' | 'random-quiz';
  group?: CharacterGroup;
  unlockedPool?: CharacterItem[];
  title: string;
  onFinishQuiz: (score: number, total: number) => void;
  onBackToLevel: () => void;
  soundEnabled: boolean;
}

export const ModeQuiz: React.FC<ModeQuizProps> = ({
  mode,
  group,
  unlockedPool,
  title,
  onFinishQuiz,
  onBackToLevel,
  soundEnabled,
}) => {
  // Determine character pool
  const pool = unlockedPool && unlockedPool.length > 0
    ? unlockedPool
    : (group ? group.characters : []);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [results, setResults] = useState<QuizResultRecord[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Initialize questions
  const initQuiz = useCallback(() => {
    const generated = generateQuizQuestions(pool, mode, 10);
    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setHighestStreak(0);
    setResults([]);
    setIsCompleted(false);
  }, [pool, mode]);

  useEffect(() => {
    initQuiz();
  }, [initQuiz]);

  const currentQ = questions[currentIndex];

  const handleSelectAnswer = (option: string) => {
    if (isAnswered || !currentQ) return;

    setSelectedAnswer(option);
    setIsAnswered(true);

    const isCorrect = option === currentQ.correctAnswer;
    const newScore = isCorrect ? score + 1 : score;
    const newStreak = isCorrect ? streak + 1 : 0;
    const newHighestStreak = Math.max(highestStreak, newStreak);

    setScore(newScore);
    setStreak(newStreak);
    setHighestStreak(newHighestStreak);

    if (isCorrect) {
      playSuccessSound(soundEnabled);
    } else {
      playIncorrectSound(soundEnabled);
    }

    // Always speak Japanese pronunciation for the character
    speakJapanese(currentQ.characterItem.character, soundEnabled);

    setResults((prev) => [
      ...prev,
      {
        question: currentQ,
        userAnswer: option,
        isCorrect,
      },
    ]);
  };

  const handleNextQuestion = () => {
    playClickSound(soundEnabled);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Quiz finished
      setIsCompleted(true);
      playVictorySound(soundEnabled);
      onFinishQuiz(score, questions.length);
    }
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCompleted) return;

      if (!isAnswered && currentQ) {
        if (['1', 'a', 'A'].includes(e.key) && currentQ.options[0]) handleSelectAnswer(currentQ.options[0]);
        if (['2', 'b', 'B'].includes(e.key) && currentQ.options[1]) handleSelectAnswer(currentQ.options[1]);
        if (['3', 'c', 'C'].includes(e.key) && currentQ.options[2]) handleSelectAnswer(currentQ.options[2]);
        if (['4', 'd', 'D'].includes(e.key) && currentQ.options[3]) handleSelectAnswer(currentQ.options[3]);
      } else if (isAnswered) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, isCompleted, currentQ, handleNextQuestion]);

  if (!currentQ && !isCompleted) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center text-stone-500">Menyiapkan pertanyaan kuis...</div>
      </div>
    );
  }

  // Final Results Screen
  if (isCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    const isPassed = score >= 7;

    return (
      <div className="mx-auto max-w-xl px-4 py-8">
        <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 text-center shadow-md">
          {/* Badge */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-50 border border-amber-200 text-amber-600 shadow-inner mb-4">
            <Award className="h-10 w-10" />
          </div>

          <h2 className="text-2xl font-black text-stone-900 tracking-tight sm:text-3xl">
            Kuis Selesai!
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            {title}
          </p>

          {/* Score Box */}
          <div className="my-6 rounded-2xl bg-stone-50 border border-stone-200 p-5">
            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Skor Kamu
            </div>
            <div className="mt-1 flex items-baseline justify-center gap-1">
              <span className="text-5xl font-black text-red-600 font-mono sm:text-6xl">
                {score}
              </span>
              <span className="text-2xl font-bold text-stone-400 font-mono">
                / {questions.length}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-center gap-4 text-xs font-semibold text-stone-600">
              <span>Akurasi: {percentage}%</span>
              <span>•</span>
              <span className="text-amber-700">Streak Tertinggi: {highestStreak} 🔥</span>
            </div>

            {/* Motivational message */}
            <div className="mt-4 text-xs font-bold">
              {percentage === 100 ? (
                <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 inline-flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" /> Luar Biasa! Nilai Sempurna!
                </span>
              ) : isPassed ? (
                <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Bagus Sekali! Kamu menguasai materi ini.
                </span>
              ) : (
                <span className="text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 inline-flex items-center gap-1">
                  Perlu sedikit latihan lagi untuk menguasai grup ini.
                </span>
              )}
            </div>
          </div>

          {/* Review List */}
          <div className="mb-6 text-left">
            <h4 className="text-xs font-bold text-stone-700 mb-2">
              Daftar Evaluasi Pertanyaan ({results.length}):
            </h4>
            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 divide-y divide-stone-100">
              {results.map((res, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1.5">
                  <div className="flex items-center gap-2">
                    {res.isCorrect ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-rose-500 shrink-0" />
                    )}
                    <span className="font-bold text-stone-800 font-['Noto_Sans_JP']">
                      {res.question.characterItem.character} ({res.question.characterItem.romaji})
                    </span>
                  </div>

                  <div className="text-stone-500">
                    {res.isCorrect ? (
                      <span className="text-emerald-600 font-semibold">Benar: {res.userAnswer}</span>
                    ) : (
                      <span>
                        Pilihanmu: <s className="text-rose-500">{res.userAnswer}</s> → <strong className="text-stone-800">{res.question.correctAnswer}</strong>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <button
              id="quiz-try-again-btn"
              onClick={initQuiz}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-xs font-bold text-stone-700 shadow-xs hover:bg-stone-50 active:scale-95 transition"
            >
              <RotateCcw className="h-4 w-4" />
              Coba Lagi
            </button>

            <button
              id="quiz-back-level-btn"
              onClick={onBackToLevel}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-stone-800 active:scale-95 transition"
            >
              <Home className="h-4 w-4" />
              Kembali ke Level
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Question Card
  const isCorrect = selectedAnswer === currentQ.correctAnswer;

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      {/* Top Status Bar: Question X / 10, Score, Streak */}
      <div className="mb-4 flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-4 py-2.5 shadow-xs text-xs font-bold">
        <div className="text-stone-700">
          Pertanyaan <span className="text-red-600">{currentIndex + 1}</span> / {questions.length}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-stone-600">
            Skor: <span className="text-stone-900 font-mono">{score}</span>
          </div>

          <div className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
            <span>Streak:</span>
            <span className="font-mono">{streak}</span>
            <span>🔥</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
        <div
          className="h-full bg-red-600 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8 text-center">
        <span className="text-xs font-semibold text-stone-500">
          {currentQ.subPrompt}
        </span>

        {/* Big Prompt Display */}
        <div className="relative my-6 flex h-40 w-40 mx-auto items-center justify-center rounded-3xl bg-stone-50 border border-stone-200 shadow-inner">
          <span
            className={`font-black select-none ${
              currentQ.type === 'char-to-romaji'
                ? "text-7xl font-['Noto_Sans_JP'] text-stone-900"
                : 'text-5xl font-mono text-red-600'
            }`}
          >
            {currentQ.prompt}
          </span>

          <button
            onClick={() => speakJapanese(currentQ.characterItem.character, soundEnabled)}
            className="absolute bottom-2 right-2 rounded-full bg-stone-200 p-2 text-stone-600 hover:bg-stone-300 transition"
            title="Dengarkan Lafal"
          >
            <Volume2 className="h-4 w-4" />
          </button>
        </div>

        {/* 4 Large Answer Buttons (Grid 2x2) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6">
          {currentQ.options.map((option, idx) => {
            const letterLabel = ['A', 'B', 'C', 'D'][idx];
            let buttonStyle = 'border-stone-200 bg-stone-50 hover:border-stone-300 hover:bg-stone-100 text-stone-800';

            if (isAnswered) {
              if (option === currentQ.correctAnswer) {
                buttonStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-300 font-bold';
              } else if (option === selectedAnswer) {
                buttonStyle = 'border-rose-500 bg-rose-50 text-rose-800 ring-2 ring-rose-300 font-bold';
              } else {
                buttonStyle = 'border-stone-200 bg-stone-50 text-stone-400 opacity-60';
              }
            }

            return (
              <button
                key={option}
                id={`quiz-option-${idx}`}
                onClick={() => handleSelectAnswer(option)}
                disabled={isAnswered}
                className={`relative flex items-center justify-center rounded-2xl border p-4 sm:p-5 text-xl sm:text-2xl font-bold transition-all active:scale-95 ${buttonStyle}`}
              >
                <span className="absolute left-3 top-3 text-[11px] font-mono text-stone-400 font-semibold">
                  {letterLabel}
                </span>
                <span className={currentQ.type === 'romaji-to-char' ? "font-['Noto_Sans_JP'] text-2xl sm:text-3xl" : 'font-mono'}>
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feedback Area after selecting */}
        {isAnswered && (
          <div
            className={`mt-6 rounded-2xl p-4 text-left border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in duration-200 ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-3">
              {isCorrect ? (
                <CheckCircle2 className="h-7 w-7 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="h-7 w-7 text-rose-600 shrink-0" />
              )}
              <div>
                <div className="font-bold text-sm">
                  {isCorrect ? '✓ Benar!' : '✗ Salah'}
                </div>
                <div className="text-xs opacity-90 font-mono">
                  Jawaban yang benar:{' '}
                  <strong className="font-bold">
                    {currentQ.characterItem.character} = {currentQ.characterItem.romaji}
                  </strong>
                </div>
              </div>
            </div>

            <button
              id="quiz-next-btn"
              onClick={handleNextQuestion}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-xs transition active:scale-95 ${
                isCorrect ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
              }`}
            >
              <span>Lanjut</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 text-center text-[11px] text-stone-400">
        Tips: Kamu juga bisa menekan tombol keyboard 1, 2, 3, 4 untuk memilih dan Enter untuk lanjut.
      </div>
    </div>
  );
};
