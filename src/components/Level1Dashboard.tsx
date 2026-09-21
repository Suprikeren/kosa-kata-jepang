import React from 'react';
import { Play, Lock, CheckCircle2, Volume2, Sparkles, PenTool, Shuffle, HelpCircle, BookOpen } from 'lucide-react';
import { CharacterGroup, GameMode, UserProgress } from '../types';
import { HIRAGANA_GROUPS } from '../data/hiraganaData';
import { speakJapanese, playClickSound } from '../utils/audio';

interface Level1DashboardProps {
  progress: UserProgress;
  onSelectGroupMode: (group: CharacterGroup, mode: GameMode) => void;
  onPracticeAllUnlocked: (mode: GameMode) => void;
  onOpenGuide?: () => void;
  onOpenReference?: () => void;
  soundEnabled: boolean;
}

export const Level1Dashboard: React.FC<Level1DashboardProps> = ({
  progress,
  onSelectGroupMode,
  onPracticeAllUnlocked,
  onOpenGuide,
  onOpenReference,
  soundEnabled,
}) => {
  const unlockedGroups = HIRAGANA_GROUPS.filter((g) =>
    progress.unlockedGroupOrders.includes(g.order)
  );

  const totalUnlockedChars = unlockedGroups.reduce(
    (acc, g) => acc + g.characters.length,
    0
  );

  const handleCharAudio = (e: React.MouseEvent, char: string) => {
    e.stopPropagation();
    speakJapanese(char, soundEnabled);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8 space-y-6">
      {/* Level Header Banner */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-md bg-red-100 text-red-700 px-2 py-0.5 text-xs font-bold font-mono">
                LEVEL 1
              </span>
              <span className="text-xs text-stone-500 font-semibold">
                Hiragana Basic (46 Karakter)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Aksara Hiragana Dasar
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
              Pelajari karakter per kelompok secara bertahap. Mulai dari Grup 1 (あいうえお), selesaikan kuis untuk membuka grup berikutnya, dan gunakan latihan menulis di kanvas.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto bg-stone-50 border border-stone-200 rounded-2xl p-3.5">
            <div>
              <div className="text-[10px] font-bold uppercase text-stone-400">
                Progres Pembelajaran
              </div>
              <div className="text-lg font-black text-stone-900">
                {unlockedGroups.length} / {HIRAGANA_GROUPS.length} <span className="text-xs font-semibold text-stone-500">Grup Terbuka</span>
              </div>
              <div className="text-xs text-stone-500">
                {totalUnlockedChars} karakter siap dilatih
              </div>
            </div>
          </div>
        </div>

        {/* Helpful Tip & Guide Link */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-amber-50/90 border border-amber-200/90 px-4 py-2.5 text-xs text-amber-950">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-amber-700 shrink-0" />
            <span>
              <strong>Alur Belajar:</strong> Mulai dari <em>Mode A (Belajar)</em>, uji ingatan di <em>Mode B & C</em>, dan selesaikan <em>Mode D (Kuis)</em> dengan skor min. <strong>7/10</strong> untuk membuka grup berikutnya!
            </span>
          </div>
          <div className="flex items-center gap-3">
            {onOpenGuide && (
              <button
                id="dashboard-read-guide-btn"
                onClick={onOpenGuide}
                className="font-bold underline text-amber-900 hover:text-red-700 whitespace-nowrap"
              >
                Baca Cara Pakai →
              </button>
            )}
            {onOpenReference && (
              <button
                id="dashboard-open-ref-btn"
                onClick={onOpenReference}
                className="font-bold text-stone-700 hover:text-stone-900 whitespace-nowrap flex items-center gap-1"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Tabel Karakter</span>
              </button>
            )}
          </div>
        </div>

        {/* Global Action: "Practice All Unlocked Characters" */}
        {unlockedGroups.length > 0 && (
          <div className="mt-6 rounded-2xl border-2 border-red-200 bg-red-50/60 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-red-600" />
                <h3 className="text-sm font-bold text-stone-900">
                  Latihan Semua Karakter Terbuka ({totalUnlockedChars} Karakter)
                </h3>
              </div>
              <p className="text-xs text-stone-600 max-w-xl">
                Gabungkan seluruh karakter yang sudah kamu pelajari untuk menguji daya ingat komprehensif tanpa terikat satu grup saja.
              </p>
            </div>

            {/* Mode buttons for all unlocked */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <button
                id="all-random-quiz-btn"
                onClick={() => {
                  playClickSound(soundEnabled);
                  onPracticeAllUnlocked('random-quiz');
                }}
                className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 rounded-xl bg-red-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-red-700 active:scale-95 transition whitespace-nowrap"
              >
                <Shuffle className="h-3.5 w-3.5" />
                Kuis Acak Campuran
              </button>

              <button
                id="all-char-to-romaji-btn"
                onClick={() => {
                  playClickSound(soundEnabled);
                  onPracticeAllUnlocked('char-to-romaji');
                }}
                className="flex-1 md:flex-initial rounded-xl border border-stone-300 bg-white px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 active:scale-95 transition whitespace-nowrap"
              >
                Karakter → Romaji
              </button>

              <button
                id="all-romaji-to-char-btn"
                onClick={() => {
                  playClickSound(soundEnabled);
                  onPracticeAllUnlocked('romaji-to-char');
                }}
                className="flex-1 md:flex-initial rounded-xl border border-stone-300 bg-white px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 active:scale-95 transition whitespace-nowrap"
              >
                Romaji → Karakter
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Group Cards Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <span>Kelompok Hiragana (10 Grup)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {HIRAGANA_GROUPS.map((group) => {
            const isUnlocked = progress.unlockedGroupOrders.includes(group.order);
            const isFirst = group.order === 1;

            return (
              <div
                key={group.id}
                id={`group-card-${group.order}`}
                className={`relative rounded-3xl border transition-all ${
                  isUnlocked
                    ? 'border-stone-200 bg-white shadow-sm hover:shadow-md'
                    : 'border-stone-200 bg-stone-50/80 opacity-70'
                } p-5 sm:p-6`}
              >
                {/* Card Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-red-600">
                        {group.name}
                      </span>
                      <span className="text-xs font-bold text-stone-400">•</span>
                      <span className="text-xs font-bold text-stone-700 font-['Noto_Sans_JP']">
                        {group.label}
                      </span>
                    </div>
                  </div>

                  {isUnlocked ? (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                      <CheckCircle2 className="h-3 w-3" />
                      Terbuka
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 rounded-full bg-stone-200 px-2.5 py-0.5 text-[11px] font-medium text-stone-600">
                      <Lock className="h-3 w-3" />
                      Terkunci
                    </span>
                  )}
                </div>

                {/* Character preview row */}
                <div className="my-4 flex flex-wrap items-center gap-2">
                  {group.characters.map((item) => (
                    <div
                      key={item.character}
                      onClick={(e) => isUnlocked && handleCharAudio(e, item.character)}
                      className={`group flex flex-col items-center justify-center rounded-2xl border transition-all ${
                        isUnlocked
                          ? 'h-14 w-14 cursor-pointer border-stone-200 bg-stone-50 hover:border-red-400 hover:bg-red-50 text-stone-900 active:scale-95'
                          : 'h-14 w-14 border-stone-200 bg-stone-100 text-stone-400'
                      }`}
                      title={isUnlocked ? `${item.character} = ${item.romaji} (Klik untuk dengar)` : 'Terkunci'}
                    >
                      <span className="text-2xl font-bold font-['Noto_Sans_JP'] leading-none">
                        {item.character}
                      </span>
                      <span className="text-[10px] font-mono opacity-70 mt-1">
                        {item.romaji}
                      </span>
                    </div>
                  ))}
                </div>

                {/* If unlocked: Mode Selection Buttons */}
                {isUnlocked ? (
                  <div className="space-y-2 border-t border-stone-100 pt-4">
                    <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Pilih Mode Tantangan:
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {/* Mode A: Learn */}
                      <button
                        id={`btn-learn-${group.order}`}
                        onClick={() => {
                          playClickSound(soundEnabled);
                          onSelectGroupMode(group, 'learn');
                        }}
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-bold text-stone-800 hover:border-red-300 hover:bg-red-50 hover:text-red-700 active:scale-95 transition"
                      >
                        <Play className="h-3.5 w-3.5 text-red-600" />
                        <span>A. Belajar</span>
                      </button>

                      {/* Mode B: Char -> Romaji */}
                      <button
                        id={`btn-b-${group.order}`}
                        onClick={() => {
                          playClickSound(soundEnabled);
                          onSelectGroupMode(group, 'char-to-romaji');
                        }}
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-white px-2.5 py-2 text-xs font-semibold text-stone-700 hover:border-stone-300 hover:bg-stone-50 active:scale-95 transition"
                      >
                        <span>B. 字 → Romaji</span>
                      </button>

                      {/* Mode C: Romaji -> Char */}
                      <button
                        id={`btn-c-${group.order}`}
                        onClick={() => {
                          playClickSound(soundEnabled);
                          onSelectGroupMode(group, 'romaji-to-char');
                        }}
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-white px-2.5 py-2 text-xs font-semibold text-stone-700 hover:border-stone-300 hover:bg-stone-50 active:scale-95 transition"
                      >
                        <span>C. Romaji → 字</span>
                      </button>

                      {/* Mode D: Random Quiz */}
                      <button
                        id={`btn-d-${group.order}`}
                        onClick={() => {
                          playClickSound(soundEnabled);
                          onSelectGroupMode(group, 'random-quiz');
                        }}
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-stone-800 bg-stone-900 px-2.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-stone-800 active:scale-95 transition"
                      >
                        <Shuffle className="h-3.5 w-3.5" />
                        <span>D. Kuis Acak</span>
                      </button>

                      {/* Mode E: Writing Practice */}
                      <button
                        id={`btn-e-${group.order}`}
                        onClick={() => {
                          playClickSound(soundEnabled);
                          onSelectGroupMode(group, 'writing');
                        }}
                        className="col-span-2 sm:col-span-2 flex items-center justify-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-2.5 py-2 text-xs font-bold text-amber-900 hover:bg-amber-100 active:scale-95 transition"
                      >
                        <PenTool className="h-3.5 w-3.5 text-amber-700" />
                        <span>E. Latihan Menulis di Kanvas</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 border-t border-stone-200/60 pt-3 text-xs text-stone-500 flex items-center gap-2">
                    <Lock className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                    <span>
                      Selesaikan kuis <strong>Grup {group.order - 1}</strong> dengan skor minimal 7/10 untuk membuka grup ini.
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
