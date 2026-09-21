import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Map, 
  CheckCircle2, 
  HelpCircle,
  Volume2,
  PenTool,
  Lightbulb
} from 'lucide-react';
import { UserProgress } from '../types';
import { HIRAGANA_GROUPS } from '../data/hiraganaData';

interface PathSelectorProps {
  progress: UserProgress;
  onSelectHiragana: () => void;
  onSelectSentences: () => void;
  onOpenRoadmap: () => void;
  onOpenReference: () => void;
  onOpenGuide: () => void;
}

export const PathSelector: React.FC<PathSelectorProps> = ({
  progress,
  onSelectHiragana,
  onSelectSentences,
  onOpenRoadmap,
  onOpenReference,
  onOpenGuide,
}) => {
  const unlockedGroupsCount = progress.unlockedGroupOrders.length;
  const unlockedCharsCount = HIRAGANA_GROUPS
    .filter((g) => progress.unlockedGroupOrders.includes(g.order))
    .reduce((acc, g) => acc + g.characters.length, 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12 space-y-10">
      {/* Hero Welcome */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-700 mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Local-First Japanese Learning Platform</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
          Belajar Bahasa Jepang Langkah demi Langkah
        </h1>

        <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
          Mulai dari pengenalan aksara dasar Hiragana, kuis interaktif, kanvas menulis bergaris bantu, hingga simulasi percakapan dunia kerja.
        </p>

        {/* Quick Helper Banner for beginners who might be confused */}
        <div className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-amber-50 border border-amber-200/80 px-4 py-2.5 text-xs text-amber-900 shadow-xs">
          <Lightbulb className="h-4 w-4 text-amber-600 shrink-0" />
          <span>
            Baru pertama kali menggunakan aplikasi ini dan bingung mulainya?{' '}
            <button
              id="hero-guide-link-btn"
              onClick={onOpenGuide}
              className="font-bold underline text-amber-950 hover:text-red-700 ml-1"
            >
              Baca Cara Pakai di sini →
            </button>
          </span>
        </div>

        {/* Progress Quick Strip */}
        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 rounded-2xl border border-stone-200 bg-white px-5 py-3 shadow-xs text-xs">
          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Status Level</span>
            <span className="font-bold text-stone-900">Level 1: Hiragana Basic</span>
          </div>
          <div className="h-6 w-px bg-stone-200 hidden sm:block" />
          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Grup Terbuka</span>
            <span className="font-bold text-red-600">{unlockedGroupsCount} / {HIRAGANA_GROUPS.length} Grup</span>
          </div>
          <div className="h-6 w-px bg-stone-200 hidden sm:block" />
          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Karakter Tersedia</span>
            <span className="font-bold text-stone-900">{unlockedCharsCount} Karakter</span>
          </div>
        </div>
      </div>

      {/* Main Path: Level 1 Hiragana */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              Jalur Pembelajaran Utama
            </h2>
            <p className="text-xs text-stone-500">
              Pilih level untuk memulai sesi belajar interaktif:
            </p>
          </div>

          <button
            onClick={onOpenRoadmap}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 transition"
          >
            <Map className="h-3.5 w-3.5" />
            <span>Lihat Peta 17 Level</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* HIRAGANA CARD - ACTIVE LEVEL 1 */}
          <div 
            id="path-hiragana-card"
            onClick={onSelectHiragana}
            className="group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-red-500/80 bg-white p-6 sm:p-8 shadow-sm transition hover:shadow-md hover:border-red-600 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white shadow-md font-jp text-3xl font-black">
                  あ
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Level 1 • Siap Dimainkan
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-2xl font-black text-stone-900 tracking-tight">
                  Hiragana Basic
                </h3>
                <p className="text-xs font-medium text-stone-500 mt-1">
                  あ いうえお (46 Karakter Dasar Terbagi 10 Grup)
                </p>
                <p className="mt-3 text-xs text-stone-600 leading-relaxed">
                  Aksara fonetik pertama yang wajib dikuasai untuk membaca teks Jepang asli, partikel tata bahasa, dan kosakata dasar. Dilengkapi latihan goresan kuas di kanvas dan audio penutur asli.
                </p>
              </div>

              {/* Features pills */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                <span className="rounded-lg bg-stone-100 px-2.5 py-1 text-[11px] font-semibold text-stone-700">
                  10 Kelompok Huruf
                </span>
                <span className="rounded-lg bg-stone-100 px-2.5 py-1 text-[11px] font-semibold text-stone-700">
                  Kuis Romaji ↔ Karakter
                </span>
                <span className="rounded-lg bg-stone-100 px-2.5 py-1 text-[11px] font-semibold text-stone-700">
                  Kanvas Tulis & Panduan
                </span>
                <span className="rounded-lg bg-stone-100 px-2.5 py-1 text-[11px] font-semibold text-stone-700">
                  Audio Pengucapan
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-red-600 group-hover:translate-x-1 transition-transform">
              <span>Buka Dashboard Level 1 Hiragana</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* KATAKANA CARD - LEVEL 2 COMING SOON */}
          <div 
            id="path-katakana-card"
            className="relative overflow-hidden rounded-3xl border border-stone-200 bg-stone-50/70 p-6 sm:p-8 opacity-80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-200 text-stone-600 font-jp text-3xl font-black">
                  ア
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-stone-200 px-3 py-1 text-xs font-bold text-stone-600">
                  <Lock className="h-3.5 w-3.5" />
                  Level 2 • Tahap Berikutnya
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-2xl font-black text-stone-800 tracking-tight">
                  Katakana Basic
                </h3>
                <p className="text-xs font-medium text-stone-500 mt-1">
                  ア イ ウ エ オ (Karakter Kata Serapan Asing)
                </p>
                <p className="mt-3 text-xs text-stone-500 leading-relaxed">
                  Digunakan untuk menulis kata serapan bahasa asing, istilah teknologi, menu kafe, dan nama orang luar Jepang.
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5 opacity-60">
                <span className="rounded-lg bg-stone-200 px-2.5 py-1 text-[11px] font-semibold text-stone-600">
                  Garis Tegas & Sudut Tajam
                </span>
                <span className="rounded-lg bg-stone-200 px-2.5 py-1 text-[11px] font-semibold text-stone-600">
                  Kosakata Serapan
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between text-xs font-semibold text-stone-400">
              <span>Akan aktif setelah penguasaan Hiragana</span>
              <Lock className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>

        {/* SPECIAL FEATURED: ARENA KATA, KALIMAT & CERITA */}
        <div 
          id="path-sentences-feature-card"
          onClick={onSelectSentences}
          className="group cursor-pointer rounded-3xl border-2 border-stone-900 bg-stone-900 text-white p-6 sm:p-8 shadow-md hover:shadow-xl transition relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-red-600/20 to-transparent pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-red-600/90 px-3 py-1 text-xs font-bold text-white">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Fitur Lengkap: Pilihan Ganda & Isian Teks</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Arena Kata Dasar, Kalimat Pendek, Kalimat Panjang & Cerita
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Ingin langsung menguji kata benda, pola kalimat bertingkat, hingga membaca cerita utuh? Tersedia dalam <strong>Mode Pilihan Ganda (4 Opsi)</strong> dan <strong>Mode Isian Teks (Ketik Jawaban)</strong> dengan audio asli Jepang dan pembahasannya!
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="rounded-lg bg-stone-800 border border-stone-700 px-2.5 py-1 text-[11px] font-semibold text-stone-300">
                  1. Kata Dasar (ねこ, みず, ごはん)
                </span>
                <span className="rounded-lg bg-stone-800 border border-stone-700 px-2.5 py-1 text-[11px] font-semibold text-stone-300">
                  2. Kalimat Pendek (これ は ねこ です)
                </span>
                <span className="rounded-lg bg-stone-800 border border-stone-700 px-2.5 py-1 text-[11px] font-semibold text-stone-300">
                  3. Kalimat Panjang & Tata Bahasa
                </span>
                <span className="rounded-lg bg-stone-800 border border-stone-700 px-2.5 py-1 text-[11px] font-semibold text-stone-300">
                  4. Cerita Musim Semi, Kedai Ramen & Klien
                </span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectSentences();
              }}
              className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3.5 text-xs font-bold text-white hover:bg-red-500 shadow-md transition active:scale-95 whitespace-nowrap shrink-0 group-hover:translate-x-1"
            >
              <span>Buka Arena Kata & Cerita</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards: Standalone Multi-Pages Access */}
      <div className="space-y-4 pt-2">
        <h2 className="text-base font-bold text-stone-900">
          Jelajahi Halaman Aplikasi
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Guide Page Card */}
          <div
            id="home-card-guide"
            onClick={onOpenGuide}
            className="group cursor-pointer rounded-2xl border border-stone-200 bg-white p-5 shadow-xs hover:border-amber-400 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800 mb-3">
                <HelpCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-stone-900 group-hover:text-amber-700 transition">
                Panduan & Cara Pakai
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Penjelasan langkah belajar, cara membuka kelompok huruf yang terkunci, fungsi kanvas, dan FAQ.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-700 mt-4 flex items-center gap-1">
              Buka Panduan →
            </span>
          </div>

          {/* Reference Page Card */}
          <div
            id="home-card-ref"
            onClick={onOpenReference}
            className="group cursor-pointer rounded-2xl border border-stone-200 bg-white p-5 shadow-xs hover:border-red-400 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-700 mb-3 font-jp font-bold">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-stone-900 group-hover:text-red-600 transition">
                Tabel Karakter & Audio
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Tabel lengkap Gojuon 46 huruf Hiragana, modifikasi Dakuten (ga, za, da, ba, pa), dan kombinasi Yōon.
              </p>
            </div>
            <span className="text-xs font-bold text-red-600 mt-4 flex items-center gap-1">
              Buka Tabel Karakter →
            </span>
          </div>

          {/* Roadmap Page Card */}
          <div
            id="home-card-roadmap"
            onClick={onOpenRoadmap}
            className="group cursor-pointer rounded-2xl border border-stone-200 bg-white p-5 shadow-xs hover:border-purple-400 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700 mb-3">
                <Map className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-stone-900 group-hover:text-purple-700 transition">
                Peta Perjalanan (17 Level)
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Rencana kurikulum lengkap dari karakter dasar hingga komunikasi profesional dengan klien kerja.
              </p>
            </div>
            <span className="text-xs font-bold text-purple-700 mt-4 flex items-center gap-1">
              Buka Peta Level →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
