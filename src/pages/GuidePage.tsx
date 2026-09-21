import React from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Play, 
  Shuffle, 
  PenTool, 
  Volume2, 
  ChevronRight, 
  ArrowRight,
  Flame,
  Award,
  Compass,
  Lightbulb
} from 'lucide-react';
import { speakJapanese, playClickSound } from '../utils/audio';

interface GuidePageProps {
  onGoToLevel1: () => void;
  onGoToReference: () => void;
  onGoToRoadmap: () => void;
  onGoToSentences?: () => void;
  soundEnabled: boolean;
}

export const GuidePage: React.FC<GuidePageProps> = ({
  onGoToLevel1,
  onGoToReference,
  onGoToRoadmap,
  onGoToSentences,
  soundEnabled,
}) => {
  const handleTestAudio = () => {
    playClickSound(soundEnabled);
    speakJapanese('こんにちは', soundEnabled);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800 border border-amber-200">
                PANDUAN PENGGUNA
              </span>
              <span className="text-xs text-stone-500 font-semibold">
                Nihongo Quest • Panduan Lengkap
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Cara Pakai & Strategi Belajar
            </h1>
            <p className="text-stone-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              Panduan lengkap langkah demi langkah bagi pemula. Pelajari bagaimana sistem kelompok huruf, cara membuka grup terkunci, fungsi kanvas menulis, hingga tips mengingat aksara Jepang dengan mudah.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              id="guide-start-level1-btn"
              onClick={() => {
                playClickSound(soundEnabled);
                onGoToLevel1();
              }}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-red-700 active:scale-95 transition"
            >
              <span>Mulai Belajar di Level 1</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              id="guide-test-audio-btn"
              onClick={handleTestAudio}
              className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100 active:scale-95 transition"
            >
              <Volume2 className="h-4 w-4 text-emerald-600" />
              <span>Tes Audio Suara (こんにちは)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5-Step Learning Loop Visual */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 text-red-700 font-bold text-xs">
            1
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900">
            Siklus 5 Langkah Belajar Per Kelompok Karakter
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600">
          Di Level 1 (Hiragana Basic), 46 huruf dibagi menjadi <strong>10 Kelompok</strong> (dimulai dari Grup 1: あいうえお). Setiap kelompok memiliki 5 mode terintegrasi:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Step A */}
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 text-red-700 font-bold text-xs border border-red-200">
                  A
                </span>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  Tahap 1
                </span>
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                <Play className="h-4 w-4 text-red-600" />
                <span>Mode Belajar & Lafal</span>
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                Lihat kartu huruf besar, dengar suara penutur asli Jepang (klik kartu/audio), perhatikan jumlah tarikan kuas (stroke), dan baca tips mnemonik visual untuk memudahkan ingatan bentuk huruf.
              </p>
            </div>
            <div className="rounded-xl bg-stone-50 border border-stone-200 p-2.5 text-[11px] text-stone-600">
              💡 <strong>Tips:</strong> Klik ikon speaker berulang kali sambil menirukan ucapan dengan lantang.
            </div>
          </div>

          {/* Step B */}
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200">
                  B
                </span>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  Tahap 2
                </span>
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-1">
                Karakter → Romaji
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                Uji pengenalan visual! Layar menampilkan karakter Hiragana (misal: <strong>あ</strong>), dan kamu memilih cara baca alfabet latin yang sesuai (misal: <strong>a</strong>) dari 4 pilihan acak.
              </p>
            </div>
            <div className="rounded-xl bg-blue-50/60 border border-blue-200 p-2.5 text-[11px] text-blue-800">
              🎯 <strong>Tujuan:</strong> Melatih mata agar langsung reflek mengenali bentuk huruf Jepang.
            </div>
          </div>

          {/* Step C */}
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-purple-700 font-bold text-xs border border-purple-200">
                  C
                </span>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  Tahap 3
                </span>
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-1">
                Romaji → Karakter
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                Uji ingatan aktif! Layar menampilkan bunyi latin (misal: <strong>ka</strong>), dan kamu harus memilih karakter Hiragana yang benar (<strong>か</strong>) dari pilihan yang disediakan.
              </p>
            </div>
            <div className="rounded-xl bg-purple-50/60 border border-purple-200 p-2.5 text-[11px] text-purple-800">
              🧠 <strong>Tujuan:</strong> Mengingat kembali bentuk visual huruf dari bunyi yang terdengar.
            </div>
          </div>

          {/* Step D */}
          <div className="rounded-2xl border-2 border-red-300 bg-red-50/30 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-xs shadow-xs">
                  D
                </span>
                <span className="rounded-full bg-red-100 text-red-700 px-2 py-0.5 text-[10px] font-bold">
                  KUNCI MEMBUKA GRUP
                </span>
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                <Shuffle className="h-4 w-4 text-red-600" />
                <span>Mode Kuis Acak</span>
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                Ujian kelulusan grup! Kuis terdiri dari 10 pertanyaan kombinasi dua arah. Jawab benar minimal <strong>7 dari 10 soal (70%)</strong> untuk secara otomatis membuka kelompok huruf berikutnya!
              </p>
            </div>
            <div className="rounded-xl bg-white border border-red-200 p-2.5 text-[11px] text-red-800 font-semibold flex items-center gap-2">
              <Award className="h-4 w-4 text-red-600 shrink-0" />
              <span>Skor minimal 7/10 otomatis membuka Grup berikutnya!</span>
            </div>
          </div>

          {/* Step E */}
          <div className="rounded-2xl border border-amber-300 bg-amber-50/40 p-5 shadow-xs flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300">
                  E
                </span>
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                  Praktik Menulis
                </span>
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                <PenTool className="h-4 w-4 text-amber-700" />
                <span>Latihan Menulis di Kanvas Genkouyoushi</span>
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed mb-3">
                Gunakan jari (di HP) atau kursor mouse (di laptop) untuk mencoret langsung di atas kanvas kotak latihan tradisional. Terdapat fitur <strong>Panduan Bayangan Huruf</strong> yang bisa diaktifkan/dinonaktifkan untuk melatih ingatan otot tangan, pengatur tebal garis, tombol bersihkan, dan urutan nomor tarikan goresan.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-amber-950">
              <span className="flex items-center gap-1">✓ Garis silang bantu proporsi</span>
              <span className="flex items-center gap-1">✓ Tombol ON/OFF Bayangan</span>
              <span className="flex items-center gap-1">✓ Audio per karakter</span>
            </div>
          </div>
        </div>
      </div>

      {/* Unlock System & Progression Explained */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 text-red-700 font-bold text-xs">
            2
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900">
            Mengapa Grup 2 s/d 10 Terkunci? (Sistem Progres Bertahap)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          <div className="space-y-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
            <p>
              Berdasarkan metodologi pengajaran bahasa Jepang yang terbukti, menghafal 46 huruf sekaligus dalam satu waktu membuat otak cepat lelah dan bingung.
            </p>
            <p>
              Oleh karena itu, <strong>Nihongo Quest</strong> menerapkan sistem kunci bertahap:
            </p>
            <ul className="space-y-2 text-xs text-stone-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Grup 1 (あいうえお)</strong> langsung terbuka dan siap kamu pelajari hari ini.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Grup 2 (かきくけこ)</strong> terkunci hingga kamu menyelesaikan kuis Grup 1 dengan skor minimal <strong>7/10</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                <span>
                  Setelah terbuka, kamu bisa menggunakan fitur <strong>"Latihan Semua Karakter Terbuka"</strong> untuk mencampur semua huruf yang sudah dipelajari.
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Indikator Syarat Kelulusan Kuis
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between rounded-xl bg-white border border-emerald-200 p-2.5">
                <span className="font-semibold text-stone-800">Skor 7 s/d 10 Benar</span>
                <span className="rounded-md bg-emerald-100 text-emerald-800 px-2 py-0.5 font-bold text-[11px]">
                  ✓ LULUS & Buka Grup Baru!
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white border border-amber-200 p-2.5">
                <span className="font-semibold text-stone-800">Skor 0 s/d 6 Benar</span>
                <span className="rounded-md bg-amber-100 text-amber-800 px-2 py-0.5 font-bold text-[11px]">
                  Coba lagi (Belum Lulus)
                </span>
              </div>
            </div>
            <p className="text-[11px] text-stone-500 italic">
              Tidak ada batas mencoba kuis! Kamu bebas mengulang kuis sebanyak mungkin sampai percaya diri.
            </p>
          </div>
        </div>
      </div>

      {/* Pages Guide: What each page does */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 text-red-700 font-bold text-xs">
            3
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900">
            Daftar Halaman di Aplikasi Ini
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Page 1 */}
          <div 
            onClick={onGoToLevel1}
            className="group cursor-pointer rounded-2xl border border-stone-200 bg-white p-4 shadow-xs hover:border-red-300 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="rounded-md bg-red-100 text-red-700 px-2 py-0.5 text-xs font-bold">
                  LEVEL 1
                </span>
                <ChevronRight className="h-4 w-4 text-stone-400 group-hover:text-red-600 transition" />
              </div>
              <h3 className="text-sm font-bold text-stone-900 group-hover:text-red-600 transition">
                Dashboard Hiragana
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Pusat pembelajaran 10 kelompok karakter, pemilihan mode belajar, latihan kanvas, dan kuis acak.
              </p>
            </div>
            <span className="text-[11px] font-bold text-red-600 mt-3 flex items-center gap-1">
              Buka Halaman →
            </span>
          </div>

          {/* Page 2 */}
          <div 
            onClick={onGoToReference}
            className="group cursor-pointer rounded-2xl border border-stone-200 bg-white p-4 shadow-xs hover:border-red-300 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="rounded-md bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-bold">
                  REFERENSI
                </span>
                <ChevronRight className="h-4 w-4 text-stone-400 group-hover:text-red-600 transition" />
              </div>
              <h3 className="text-sm font-bold text-stone-900 group-hover:text-red-600 transition">
                Tabel Karakter & Audio
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Tabel lengkap Gojuon 46 huruf, bunyi modifikasi Dakuten (ga-bo), dan kombinasi Yōon. Klik untuk dengar suara!
              </p>
            </div>
            <span className="text-[11px] font-bold text-blue-600 mt-3 flex items-center gap-1">
              Buka Halaman →
            </span>
          </div>

          {/* Page 3 */}
          <div 
            onClick={onGoToRoadmap}
            className="group cursor-pointer rounded-2xl border border-stone-200 bg-white p-4 shadow-xs hover:border-red-300 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="rounded-md bg-purple-100 text-purple-700 px-2 py-0.5 text-xs font-bold">
                  ROADMAP
                </span>
                <ChevronRight className="h-4 w-4 text-stone-400 group-hover:text-red-600 transition" />
              </div>
              <h3 className="text-sm font-bold text-stone-900 group-hover:text-red-600 transition">
                Peta Perjalanan 17 Level
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Gambaran lengkap kurikulum dari dasar huruf, kosakata, tata bahasa, percakapan, hingga simulasi klien kerja.
              </p>
            </div>
            <span className="text-[11px] font-bold text-purple-600 mt-3 flex items-center gap-1">
              Buka Halaman →
            </span>
          </div>

          {/* Page 4 */}
          <div 
            onClick={onGoToSentences}
            className="group cursor-pointer rounded-2xl border border-stone-200 bg-white p-4 shadow-xs hover:border-red-400 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="rounded-md bg-emerald-100 text-emerald-800 px-2 py-0.5 text-xs font-bold">
                  KATA & CERITA
                </span>
                <ChevronRight className="h-4 w-4 text-stone-400 group-hover:text-red-600 transition" />
              </div>
              <h3 className="text-sm font-bold text-stone-900 group-hover:text-red-600 transition">
                Arena Kata, Kalimat & Cerita
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Latihan 4 tahap: Kata Dasar, Kalimat Pendek, Kalimat Panjang, dan Cerita dengan Pilihan Ganda & Isian Teks!
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 mt-3 flex items-center gap-1">
              Buka Halaman →
            </span>
          </div>

          {/* Page 5 */}
          <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/50 p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="rounded-md bg-amber-200 text-amber-900 px-2 py-0.5 text-xs font-bold">
                  PANDUAN
                </span>
                <Lightbulb className="h-4 w-4 text-amber-700" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">
                Cara Pakai (Halaman Ini)
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Buku panduan bantuan yang dapat kamu buka kapan saja jika merasa bingung dengan alur atau fitur aplikasi.
              </p>
            </div>
            <span className="text-[11px] font-bold text-amber-800 mt-3">
              Sedang Kamu Baca
            </span>
          </div>
        </div>
      </div>

      {/* NEW SECTION: Pilihan Ganda & Isian Teks Overpower */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 text-red-700 font-bold text-xs">
            4
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900">
            Fitur Latihan Pilihan Ganda vs Isian Teks (Ketik Jawaban)
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Agar pembelajaran tidak monoton dan benar-benar melatih daya ingat aktif (*active recall*), aplikasi menyediakan 2 mode evaluasi untuk <strong>Kata Dasar</strong>, <strong>Kalimat Pendek</strong>, <strong>Kalimat Panjang</strong>, hingga <strong>Teks Cerita Utuh</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-stone-800 text-white text-xs">A</span>
              <span>Mode Pilihan Ganda (Multiple Choice)</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Kamu diberikan 4 opsi pilihan jawaban. Sangat cocok untuk pemula yang sedang membangun refleks pengenalan makna kata dan susunan kalimat.
            </p>
            <ul className="text-xs text-stone-500 space-y-1 pt-1">
              <li>✓ 4 pilihan terjemahan yang presisi</li>
              <li>✓ Audio pelafalan instan penutur asli Jepang</li>
              <li>✓ Pembahasan langsung di bawah kartu saat menjawab</li>
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-red-200 bg-red-50/50 p-5 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-red-600 text-white text-xs">B</span>
              <span>Mode Isian Teks (Ketik Jawaban Bebas) 🔥</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              Tantangan tingkat tinggi! Tidak ada pilihan jawaban, kamu mengetik langsung arti bahasa Indonesia atau ejaan romaji di kolom teks input.
            </p>
            <ul className="text-xs text-stone-700 space-y-1 pt-1">
              <li>✓ Menerima input romaji (cth: <em>neko</em>) maupun arti (cth: <em>kucing</em>)</li>
              <li>✓ Dilengkapi <strong>Tombol Petunjuk (💡 Hint)</strong> jika kamu sempat lupa</li>
              <li>✓ Mengaktifkan daya ingat jangka panjang secara mendalam</li>
            </ul>
          </div>
        </div>

        {onGoToSentences && (
          <div className="pt-2 flex justify-start">
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                onGoToSentences();
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-red-700 shadow-sm transition"
            >
              <span>Coba Latihan Kata & Cerita Sekarang</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* FAQ & Troubleshooting */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-red-600" />
          <h2 className="text-lg sm:text-xl font-bold text-stone-900">
            Tanya Jawab & Masalah Umum (FAQ)
          </h2>
        </div>

        <div className="divide-y divide-stone-100 text-xs sm:text-sm">
          <div className="py-3">
            <h4 className="font-bold text-stone-900">
              Q: Apakah suara pelafalan memerlukan koneksi internet?
            </h4>
            <p className="text-stone-600 mt-1">
              A: Suara menggunakan Web Speech Synthesis bawaan browser Anda (kompatibel dengan Chrome, Safari, Edge, Android, iOS). Pastikan volume perangkat aktif dan tombol suara (speaker di navigasi atas) dalam kondisi menyala.
            </p>
          </div>

          <div className="py-3">
            <h4 className="font-bold text-stone-900">
              Q: Apakah progres belajar saya akan hilang jika saya menutup browser?
            </h4>
            <p className="text-stone-600 mt-1">
              A: <strong>Tidak hilang!</strong> Aplikasi menggunakan teknologi *Local-First Storage*. Semua grup yang sudah kamu buka, rekor skor kuis, dan pengaturan suara tersimpan otomatis di browser perangkatmu tanpa perlu login/akun.
            </p>
          </div>

          <div className="py-3">
            <h4 className="font-bold text-stone-900">
              Q: Berapa lama waktu yang dibutuhkan untuk menguasai Hiragana di Level 1?
            </h4>
            <p className="text-stone-600 mt-1">
              A: Dengan rata-rata latihan 15–20 menit sehari (2 kelompok huruf per hari), kebanyakan pelajar mampu menguasai seluruh 46 karakter Hiragana dalam waktu 5 hingga 7 hari.
            </p>
          </div>

          <div className="py-3">
            <h4 className="font-bold text-stone-900">
              Q: Saya ingin belajar huruf Katakana atau Kanji, di mana mencarinya?
            </h4>
            <p className="text-stone-600 mt-1">
              A: Katakana dijadwalkan di <strong>Level 2</strong> dan Kanji di level berikutnya. Kamu dapat memeriksa rincian lengkap topik dan kompetensinya di halaman <strong>Peta 17 Level</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Call to Action */}
      <div className="rounded-3xl border-2 border-red-200 bg-red-50/70 p-6 sm:p-8 text-center space-y-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white font-bold text-xl shadow-sm">
          あ
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-stone-900">
          Siap Memulai Petualangan Bahasa Jepangmu?
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          Mulai dari Grup 1 sekarang juga. Dengarkan lafalnya, gambar di kanvas, dan taklukkan kuis pertamamu!
        </p>
        <button
          onClick={() => {
            playClickSound(soundEnabled);
            onGoToLevel1();
          }}
          className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-red-700 active:scale-95 transition"
        >
          <span>Masuk ke Level 1: Hiragana</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
