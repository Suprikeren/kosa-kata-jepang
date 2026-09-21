import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  PenTool, 
  ListChecks, 
  AlignLeft,
  Volume2,
  ChevronRight,
  Lightbulb
} from 'lucide-react';
import { PracticeCategory, PracticeInputMode } from '../types';
import { SENTENCE_PRACTICE_ITEMS } from '../data/sentencesData';
import { speakJapanese, playClickSound } from '../utils/audio';

interface SentencesDashboardPageProps {
  onStartPractice: (category: PracticeCategory, inputMode: PracticeInputMode) => void;
  onGoToLevel1: () => void;
  onGoToGuide: () => void;
  soundEnabled: boolean;
}

export const SentencesDashboardPage: React.FC<SentencesDashboardPageProps> = ({
  onStartPractice,
  onGoToLevel1,
  onGoToGuide,
  soundEnabled,
}) => {
  const [selectedTab, setSelectedTab] = useState<PracticeCategory>('kata-dasar');

  const categoriesConfig: {
    id: PracticeCategory;
    name: string;
    stageLabel: string;
    description: string;
    badgeColor: string;
    sampleKana: string;
    itemCount: number;
    benefits: string[];
  }[] = [
    {
      id: 'kata-dasar',
      name: 'Kata Dasar (単語)',
      stageLabel: 'Fondasi 1',
      description: 'Kosakata vital sehari-hari: hewan, makanan, tempat, kebutuhan alam, dan ungkapan salam sopan.',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      sampleKana: 'ねこ • みず • ごはん',
      itemCount: SENTENCE_PRACTICE_ITEMS.filter((i) => i.category === 'kata-dasar').length,
      benefits: ['Menghubungkan huruf menjadi arti utuh', 'Audio pelafalan asli Jepang', 'Pilihan ganda & tebak ejaan'],
    },
    {
      id: 'kalimat-pendek',
      name: 'Kalimat Pendek (短い文)',
      stageLabel: 'Fondasi 2',
      description: 'Pola kalimat dasar A wa B desu, partikel objek を (o), partikel tujuan に (ni), kata tanya か, dan permohonan ください.',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      sampleKana: 'これ は ねこ です。',
      itemCount: SENTENCE_PRACTICE_ITEMS.filter((i) => i.category === 'kalimat-pendek').length,
      benefits: ['Kuasai fungsi partikel gramatikal', 'Percakapan pemesanan & perkenalan', 'Tersedia mode ketik isian'],
    },
    {
      id: 'kalimat-panjang',
      name: 'Kalimat Panjang & Tata Bahasa (複文)',
      stageLabel: 'Fondasi 3',
      description: 'Klausa bertingkat dengan keterangan waktu, tempat aksi (で), kata sambung pertentangan (が), bentuk kronologi (〜てから), dan ajakan sopan (〜ませんか).',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      sampleKana: 'きのう ともだち と すし を...',
      itemCount: SENTENCE_PRACTICE_ITEMS.filter((i) => i.category === 'kalimat-panjang').length,
      benefits: ['Memahami susunan kalimat kompleks', 'Penjelasan detail tata bahasa', 'Latihan akurasi memori kalimat'],
    },
    {
      id: 'cerita',
      name: 'Cerita & Pemahaman Bacaan (読解物語)',
      stageLabel: 'Puncak Praktik',
      description: 'Bacaan paragraf utuh berseri: Pagi Musim Semi, Suasana Kedai Ramen Tokyo, dan Etika Rapat Bersama Klien Bisnis Jepang.',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      sampleKana: 'さくら の した の しろい ねこ...',
      itemCount: SENTENCE_PRACTICE_ITEMS.filter((i) => i.category === 'cerita').length,
      benefits: ['Narasi audio lengkap per cerita', 'Fitur terjemahan dwibahasa', 'Soal pemahaman kontekstual'],
    },
  ];

  const currentCategoryConfig = categoriesConfig.find((c) => c.id === selectedTab)!;
  const currentCategoryItems = SENTENCE_PRACTICE_ITEMS.filter((i) => i.category === selectedTab);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12 space-y-8">
      {/* Top Banner */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Arena Latihan Progresif Berjenjang</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Kuasai Kata, Kalimat Pendek, Kalimat Panjang & Cerita
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Setelah mengenal aksara Hiragana, latih kemampuan bahasa Jepang secara bertahap menuju komunikasi nyata. Dilengkapi pilihan ganda dan isian teks (*text input*) dengan audio penutur asli!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 w-full md:w-auto">
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                onStartPractice('kata-dasar', 'multiple-choice');
              }}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-xs font-bold text-white shadow-xs hover:bg-red-700 transition active:scale-95"
            >
              <span>Mulai Kuis Cepat (Pilihan Ganda)</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => {
                playClickSound(soundEnabled);
                onStartPractice('kata-dasar', 'fill-in');
              }}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-stone-50 px-5 py-2.5 text-xs font-bold text-stone-700 hover:bg-stone-100 transition active:scale-95"
            >
              <PenTool className="h-4 w-4 text-stone-500" />
              <span>Tantangan Isian Teks (Ketik)</span>
            </button>
          </div>
        </div>

        {/* Feature Explainer Strip */}
        <div className="mt-6 pt-6 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-start gap-2.5">
            <div className="h-6 w-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0 text-xs">
              ✓
            </div>
            <div>
              <span className="font-bold text-stone-800 block">Pilihan Ganda</span>
              <span className="text-stone-500 text-[11px]">4 Opsi akurat dengan umpan balik & kunci instan</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="h-6 w-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold shrink-0 text-xs">
              ✍️
            </div>
            <div>
              <span className="font-bold text-stone-800 block">Isian Teks (Ketik)</span>
              <span className="text-stone-500 text-[11px]">Input romaji atau arti bahasa Indonesia cerdas</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="h-6 w-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0 text-xs">
              💡
            </div>
            <div>
              <span className="font-bold text-stone-800 block">Tombol Petunjuk (Hint)</span>
              <span className="text-stone-500 text-[11px]">Bantuan petunjuk jika bingung di mode isian</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="h-6 w-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold shrink-0 text-xs">
              🔊
            </div>
            <div>
              <span className="font-bold text-stone-800 block">Audio Asli Jepang</span>
              <span className="text-stone-500 text-[11px]">Dengarkan pelafalan kalimat dan paragraf cerita</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Level Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-stone-900">
            Pilih Tingkatan Belajar
          </h2>
          <span className="text-xs text-stone-500">
            Pilih level yang ingin kamu latih hari ini:
          </span>
        </div>

        {/* 4 Stage Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoriesConfig.map((cat) => {
            const isSelected = selectedTab === cat.id;

            return (
              <div
                key={cat.id}
                id={`stage-card-${cat.id}`}
                onClick={() => {
                  playClickSound(soundEnabled);
                  setSelectedTab(cat.id);
                }}
                className={`group cursor-pointer rounded-3xl border-2 p-5 transition flex flex-col justify-between ${
                  isSelected
                    ? 'border-red-600 bg-white shadow-md'
                    : 'border-stone-200 bg-white hover:border-stone-400 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`rounded-lg border px-2 py-0.5 text-[10px] font-bold ${cat.badgeColor}`}>
                      {cat.stageLabel}
                    </span>
                    <span className="text-xs font-bold text-stone-400">
                      {cat.itemCount} Materi
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 mt-3 group-hover:text-red-600 transition">
                    {cat.name}
                  </h3>

                  <div className="mt-2 text-xs font-mono text-stone-500 bg-stone-50 rounded-xl px-2.5 py-1.5 border border-stone-100">
                    {cat.sampleKana}
                  </div>

                  <p className="text-xs text-stone-600 mt-2.5 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-700">
                  <span>{isSelected ? 'Sedang Dipilih' : 'Pilih Level Ini'}</span>
                  <ChevronRight className={`h-4 w-4 transition ${isSelected ? 'text-red-600 translate-x-1' : 'text-stone-400'}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Level Deep-Dive & Mode Launcher */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <span className={`rounded-md border px-2 py-0.5 text-xs font-bold ${currentCategoryConfig.badgeColor}`}>
                {currentCategoryConfig.stageLabel}
              </span>
              <h3 className="text-xl font-black text-stone-900">
                {currentCategoryConfig.name}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {currentCategoryConfig.description}
            </p>
          </div>

          <div className="text-xs text-stone-500 font-semibold bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
            Total {currentCategoryItems.length} Soal Tersedia
          </div>
        </div>

        {/* Action Choice: Multiple Choice VS Fill-In */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mode 1: Multiple Choice */}
          <div className="rounded-2xl border-2 border-stone-200 bg-stone-50/50 p-5 flex flex-col justify-between hover:border-red-400 transition">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                  <ListChecks className="h-4 w-4 text-red-600" />
                  <span>Mode Pilihan Ganda</span>
                </div>
                <span className="rounded-md bg-stone-200 px-2 py-0.5 text-[10px] font-bold text-stone-700">
                  4 Opsi
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Pilih arti atau jawaban yang paling tepat dari 4 opsi. Sangat ideal untuk melatih refleks membaca cepat dan konfirmasi makna kata.
              </p>
            </div>

            <button
              id="launch-mc-btn"
              onClick={() => {
                playClickSound(soundEnabled);
                onStartPractice(selectedTab, 'multiple-choice');
              }}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-stone-800 transition active:scale-95"
            >
              <span>Mulai Mode Pilihan Ganda</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Mode 2: Fill-in / Text Input */}
          <div className="rounded-2xl border-2 border-stone-200 bg-stone-50/50 p-5 flex flex-col justify-between hover:border-red-400 transition">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                  <PenTool className="h-4 w-4 text-red-600" />
                  <span>Mode Isian Teks (Ketik Jawaban)</span>
                </div>
                <span className="rounded-md bg-amber-100 text-amber-800 px-2 py-0.5 text-[10px] font-bold">
                  Lebih Menantang 🔥
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Tuliskan terjemahan atau romaji secara aktif tanpa melihat pilihan jawaban. Mengunci daya ingat jangka panjang dengan bantuan tombol petunjuk (*hint*).
              </p>
            </div>

            <button
              id="launch-fillin-btn"
              onClick={() => {
                playClickSound(soundEnabled);
                onStartPractice(selectedTab, 'fill-in');
              }}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-red-700 transition active:scale-95 shadow-xs"
            >
              <span>Mulai Mode Isian Teks</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Preview of Questions in this Category */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Daftar Contoh Materi di Level Ini ({currentCategoryItems.length} Soal)
            </h4>
            <span className="text-[11px] text-stone-400">Klik ikon audio untuk mendengarkan lafal</span>
          </div>

          <div className="divide-y divide-stone-100 rounded-2xl border border-stone-200 overflow-hidden bg-white">
            {currentCategoryItems.slice(0, 5).map((item, idx) => (
              <div key={item.id} className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-stone-50 transition">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-black font-jp text-stone-900">
                      {item.japanese}
                    </span>
                    <span className="text-xs font-mono text-stone-400">
                      ({item.romaji})
                    </span>
                  </div>
                  <div className="text-xs text-stone-600">
                    {item.indonesian}
                  </div>
                </div>

                <button
                  onClick={() => speakJapanese(item.japanese, soundEnabled)}
                  className="h-8 w-8 rounded-xl bg-stone-100 hover:bg-red-50 hover:text-red-600 text-stone-600 flex items-center justify-center transition shrink-0"
                  title="Dengarkan suara"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Helpful learning strategy tip */}
      <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-950">
        <div className="flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-stone-900">
              Tips Kombinasi &quot;Overpower&quot; untuk Penguasaan Maksimal
            </h4>
            <p className="text-stone-700 leading-relaxed max-w-2xl">
              1) Mulai dari <strong>Pilihan Ganda</strong> untuk mengenali bentuk dan arti.
              <br />
              2) Lanjutkan ke <strong>Isian Teks</strong> untuk melatih otak mereproduksi kata tanpa bantuan opsi.
              <br />
              3) Dengarkan pengucapan audio berulang kali agar lidah dan telinga terbiasa dengan intonasi penutur asli.
            </p>
          </div>
        </div>

        <button
          onClick={onGoToGuide}
          className="rounded-xl border border-amber-300 bg-white px-4 py-2 text-xs font-bold text-amber-900 hover:bg-amber-100 transition whitespace-nowrap shrink-0"
        >
          Lihat Panduan Lengkap
        </button>
      </div>
    </div>
  );
};
