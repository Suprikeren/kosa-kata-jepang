import React, { useState } from 'react';
import { 
  Map, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  Search, 
  Filter, 
  Compass, 
  GraduationCap, 
  Briefcase, 
  MessageSquare,
  BookOpen
} from 'lucide-react';
import { ROADMAP_LEVELS } from '../data/roadmapData';
import { RoadmapLevel } from '../types';
import { playClickSound } from '../utils/audio';

interface RoadmapPageProps {
  onGoToLevel1: () => void;
  soundEnabled: boolean;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({ onGoToLevel1, soundEnabled }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'Semua',
    'Karakter',
    'Kosakata',
    'Kalimat',
    'Percakapan',
    'Dunia Kerja',
    'Simulasi Lanjutan',
  ];

  const filteredLevels = ROADMAP_LEVELS.filter((lvl) => {
    const matchesCategory =
      selectedCategory === 'Semua' || lvl.category === selectedCategory;
    const matchesSearch =
      lvl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lvl.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lvl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lvl.keyTopics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="rounded-md bg-purple-100 text-purple-800 px-2.5 py-0.5 text-xs font-bold border border-purple-200">
                PETA ROADMAP
              </span>
              <span className="text-xs text-stone-500 font-semibold">
                Kurikulum 17 Level Berjenjang
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Peta Perjalanan Belajar Bahasa Jepang
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Visi kurikulum lengkap dirancang dari pengenalan aksara paling dasar (Hiragana & Katakana), tata bahasa dan partikel, percakapan sehari-hari, hingga komunikasi profesional di tempat kerja dan interaksi dengan klien bisnis.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              id="roadmap-play-level1-btn"
              onClick={() => {
                playClickSound(soundEnabled);
                onGoToLevel1();
              }}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-red-700 active:scale-95 transition"
            >
              <span>Mainkan Level 1 (Aktif)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <div className="rounded-xl bg-stone-50 border border-stone-200 p-2.5 text-[11px] text-stone-600 text-center">
              Level 1: <strong className="text-stone-900">Hiragana Basic (46 Karakter)</strong>
            </div>
          </div>
        </div>

        {/* Vision Highlights */}
        <div className="mt-6 pt-6 border-t border-stone-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-stone-800">
          <div className="rounded-xl bg-stone-50 p-3 border border-stone-200/70">
            <div className="text-[10px] font-bold text-stone-400 uppercase">Tahap 1-3</div>
            <div className="text-sm font-bold text-stone-900 mt-0.5">Fondasi Karakter</div>
            <div className="text-[11px] text-stone-500">Hiragana, Katakana, Yōon</div>
          </div>
          <div className="rounded-xl bg-stone-50 p-3 border border-stone-200/70">
            <div className="text-[10px] font-bold text-stone-400 uppercase">Tahap 4-8</div>
            <div className="text-sm font-bold text-stone-900 mt-0.5">Kosakata & Pola</div>
            <div className="text-[11px] text-stone-500">Benda, Kata Kerja, Partikel</div>
          </div>
          <div className="rounded-xl bg-stone-50 p-3 border border-stone-200/70">
            <div className="text-[10px] font-bold text-stone-400 uppercase">Tahap 9-11</div>
            <div className="text-sm font-bold text-stone-900 mt-0.5">Percakapan Nyata</div>
            <div className="text-[11px] text-stone-500">Restoran, Belanja, Arah</div>
          </div>
          <div className="rounded-xl bg-stone-50 p-3 border border-stone-200/70">
            <div className="text-[10px] font-bold text-stone-400 uppercase">Tahap 12-17</div>
            <div className="text-sm font-bold text-stone-900 mt-0.5">Dunia Kerja & Klien</div>
            <div className="text-[11px] text-stone-500">Keigo, Email, Negosiasi</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClickSound(soundEnabled);
                setSelectedCategory(cat);
              }}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari topik atau level..."
            className="w-full rounded-xl border border-stone-200 bg-white pl-8 pr-3 py-1.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-red-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Level Cards List */}
      <div className="space-y-4">
        {filteredLevels.length === 0 ? (
          <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center text-stone-500 text-xs">
            Tidak ditemukan level dengan kata kunci "{searchQuery}".
          </div>
        ) : (
          filteredLevels.map((item) => {
            const isActive = item.status === 'active';

            return (
              <div
                key={item.level}
                id={`roadmap-card-level-${item.level}`}
                className={`rounded-3xl border transition-all p-5 sm:p-6 ${
                  isActive
                    ? 'border-red-300 bg-white shadow-md ring-2 ring-red-500/10'
                    : 'border-stone-200 bg-white/80 shadow-xs hover:border-stone-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    {/* Level Number Icon */}
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-black text-sm ${
                        isActive
                          ? 'bg-red-600 text-white shadow-sm'
                          : 'bg-stone-100 text-stone-500 border border-stone-200'
                      }`}
                    >
                      {isActive ? (
                        <CheckCircle2 className="h-6 w-6 text-white" />
                      ) : (
                        <span>L{item.level}</span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base sm:text-lg font-black text-stone-900">
                          {item.title}
                        </h3>
                        {isActive ? (
                          <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                            ✓ Aktif & Bisa Dimainkan
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 rounded-full bg-stone-100 border border-stone-200 px-2.5 py-0.5 text-[10px] font-semibold text-stone-600">
                            <Lock className="h-3 w-3 text-stone-400" />
                            Level Berikutnya
                          </span>
                        )}
                        <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-medium text-stone-600">
                          Kategori: {item.category}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-stone-700">
                        {item.subtitle}
                      </p>

                      <p className="text-xs text-stone-600 leading-relaxed pt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right side CTA or status */}
                  <div className="shrink-0 self-end sm:self-center">
                    {isActive ? (
                      <button
                        onClick={() => {
                          playClickSound(soundEnabled);
                          onGoToLevel1();
                        }}
                        className="flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-red-700 active:scale-95 transition"
                      >
                        <span>Buka Level 1</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <span className="text-[11px] font-medium text-stone-400 flex items-center gap-1">
                        <Lock className="h-3.5 w-3.5" />
                        Terkunci (Tahap Selanjutnya)
                      </span>
                    )}
                  </div>
                </div>

                {/* Key Topics and Learning Target */}
                <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-stone-400 uppercase">
                      Target:
                    </span>
                    <span className="text-stone-700 font-medium">
                      {item.goal}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.keyTopics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-600"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
