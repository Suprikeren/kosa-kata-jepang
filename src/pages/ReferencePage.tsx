import React, { useState } from 'react';
import { 
  BookOpen, 
  Volume2, 
  PenTool, 
  Search, 
  Sparkles, 
  ArrowRight,
  HelpCircle,
  Play
} from 'lucide-react';
import { HIRAGANA_GROUPS } from '../data/hiraganaData';
import { CharacterItem } from '../types';
import { speakJapanese, playClickSound } from '../utils/audio';

interface ReferencePageProps {
  onSelectCharacterPractice: (char: CharacterItem) => void;
  onGoToLevel1: () => void;
  soundEnabled: boolean;
}

// Extra reference data for Dakuten and Yoon
const DAKUTEN_GROUPS = [
  {
    name: 'Baris G (が ぎ ぐ げ ご)',
    desc: 'Berasal dari baris K + tanda tenten (゛)',
    items: [
      { character: 'が', romaji: 'ga', strokes: 5, hint: 'Konsonan G dari huruf ka + ゛' },
      { character: 'ぎ', romaji: 'gi', strokes: 6, hint: 'Konsonan G dari huruf ki + ゛' },
      { character: 'ぐ', romaji: 'gu', strokes: 3, hint: 'Konsonan G dari huruf ku + ゛' },
      { character: 'げ', romaji: 'ge', strokes: 5, hint: 'Konsonan G dari huruf ke + ゛' },
      { character: 'ご', romaji: 'go', strokes: 4, hint: 'Konsonan G dari huruf ko + ゛' },
    ],
  },
  {
    name: 'Baris Z (ざ じ ず ぜ ぞ)',
    desc: 'Berasal dari baris S + tanda tenten (゛). Ingat: じ dibaca "ji"',
    items: [
      { character: 'ざ', romaji: 'za', strokes: 5, hint: 'Konsonan Z dari huruf sa + ゛' },
      { character: 'じ', romaji: 'ji', strokes: 3, hint: 'Konsonan Z dari huruf shi + ゛ (dibaca JI)' },
      { character: 'ず', romaji: 'zu', strokes: 4, hint: 'Konsonan Z dari huruf su + ゛' },
      { character: 'ぜ', romaji: 'ze', strokes: 5, hint: 'Konsonan Z dari huruf se + ゛' },
      { character: 'ぞ', romaji: 'zo', strokes: 3, hint: 'Konsonan Z dari huruf so + ゛' },
    ],
  },
  {
    name: 'Baris D (だ ぢ づ で ど)',
    desc: 'Berasal dari baris T + tanda tenten (゛). ぢ dibaca "ji", づ dibaca "zu"',
    items: [
      { character: 'だ', romaji: 'da', strokes: 6, hint: 'Konsonan D dari huruf ta + ゛' },
      { character: 'ぢ', romaji: 'ji (di)', strokes: 4, hint: 'Konsonan D dari huruf chi + ゛' },
      { character: 'づ', romaji: 'zu (du)', strokes: 3, hint: 'Konsonan D dari huruf tsu + ゛' },
      { character: 'で', romaji: 'de', strokes: 3, hint: 'Konsonan D dari huruf te + ゛' },
      { character: 'ど', romaji: 'do', strokes: 4, hint: 'Konsonan D dari huruf to + ゛' },
    ],
  },
  {
    name: 'Baris B (ば び ぶ べ ぼ)',
    desc: 'Berasal dari baris H + tanda tenten (゛)',
    items: [
      { character: 'ば', romaji: 'ba', strokes: 5, hint: 'Konsonan B dari huruf ha + ゛' },
      { character: 'び', romaji: 'bi', strokes: 3, hint: 'Konsonan B dari huruf hi + ゛' },
      { character: 'ぶ', romaji: 'bu', strokes: 6, hint: 'Konsonan B dari huruf fu + ゛' },
      { character: 'べ', romaji: 'be', strokes: 3, hint: 'Konsonan B dari huruf he + ゛' },
      { character: 'ぼ', romaji: 'bo', strokes: 6, hint: 'Konsonan B dari huruf ho + ゛' },
    ],
  },
  {
    name: 'Baris P (ぱ ぴ ぷ ぺ ぽ) — Handakuten',
    desc: 'Berasal dari baris H + tanda maru lingkaran kecil (゜)',
    items: [
      { character: 'ぱ', romaji: 'pa', strokes: 4, hint: 'Konsonan P dari huruf ha + ゜' },
      { character: 'ぴ', romaji: 'pi', strokes: 2, hint: 'Konsonan P dari huruf hi + ゜' },
      { character: 'ぷ', romaji: 'pu', strokes: 5, hint: 'Konsonan P dari huruf fu + ゜' },
      { character: 'ぺ', romaji: 'pe', strokes: 2, hint: 'Konsonan P dari huruf he + ゜' },
      { character: 'ぽ', romaji: 'po', strokes: 5, hint: 'Konsonan P dari huruf ho + ゜' },
    ],
  },
];

const YOON_COMBOS = [
  { combo: 'きゃ', romaji: 'kya' },
  { combo: 'きゅ', romaji: 'kyu' },
  { combo: 'きょ', romaji: 'kyo' },
  { combo: 'しゃ', romaji: 'sha' },
  { combo: 'しゅ', romaji: 'shu' },
  { combo: 'しょ', romaji: 'sho' },
  { combo: 'ちゃ', romaji: 'cha' },
  { combo: 'ちゅ', romaji: 'chu' },
  { combo: 'ちょ', romaji: 'cho' },
  { combo: 'にゃ', romaji: 'nya' },
  { combo: 'にゅ', romaji: 'nyu' },
  { combo: 'にょ', romaji: 'nyo' },
  { combo: 'ひゃ', romaji: 'hya' },
  { combo: 'ひゅ', romaji: 'hyu' },
  { combo: 'ひょ', romaji: 'hyo' },
  { combo: 'みゃ', romaji: 'mya' },
  { combo: 'みゅ', romaji: 'myu' },
  { combo: 'みょ', romaji: 'myo' },
  { combo: 'りゃ', romaji: 'rya' },
  { combo: 'りゅ', romaji: 'ryu' },
  { combo: 'りょ', romaji: 'ryo' },
  { combo: 'ぎゃ', romaji: 'gya' },
  { combo: 'ぎゅ', romaji: 'gyu' },
  { combo: 'ぎょ', romaji: 'gyo' },
  { combo: 'じゃ', romaji: 'ja' },
  { combo: 'じゅ', romaji: 'ju' },
  { combo: 'じょ', romaji: 'jo' },
  { combo: 'びゃ', romaji: 'bya' },
  { combo: 'びゅ', romaji: 'byu' },
  { combo: 'びょ', romaji: 'byo' },
  { combo: 'ぴゃ', romaji: 'pya' },
  { combo: 'ぴゅ', romaji: 'pyu' },
  { combo: 'ぴょ', romaji: 'pyo' },
];

export const ReferencePage: React.FC<ReferencePageProps> = ({
  onSelectCharacterPractice,
  onGoToLevel1,
  soundEnabled,
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'dakuten' | 'yoon'>('basic');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChar, setSelectedChar] = useState<CharacterItem>(
    HIRAGANA_GROUPS[0].characters[0]
  );

  const handleCharacterClick = (item: CharacterItem) => {
    setSelectedChar(item);
    playClickSound(soundEnabled);
    speakJapanese(item.character, soundEnabled);
  };

  const handleComboClick = (combo: { combo: string; romaji: string }) => {
    playClickSound(soundEnabled);
    speakJapanese(combo.combo, soundEnabled);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="rounded-md bg-red-100 text-red-700 px-2.5 py-0.5 text-xs font-bold border border-red-200 font-jp">
                五十音
              </span>
              <span className="text-xs text-stone-500 font-semibold">
                Kamus Tabel Aksara & Lafal Lengkap
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Tabel Referensi Karakter Jepang
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Kamus bunyi dan bentuk huruf Jepang lengkap. Klik pada setiap huruf untuk mendengarkan lafal aslinya secara instan, memeriksa tips goresan kuas, atau langsung membukanya di kanvas latihan menulis.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              id="ref-to-level1-btn"
              onClick={() => {
                playClickSound(soundEnabled);
                onGoToLevel1();
              }}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-red-700 active:scale-95 transition"
            >
              <span>Latihan di Level 1</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <div className="text-[11px] text-stone-500 text-center">
              Tersedia 46 Hiragana Pokok + Dakuten + Yōon
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="mt-6 pt-6 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setActiveTab('basic');
              }}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'basic'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              Hiragana Pokok (46 Huruf)
            </button>

            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setActiveTab('dakuten');
              }}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'dakuten'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              Dakuten & Handakuten (25 Huruf)
            </button>

            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setActiveTab('yoon');
              }}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'yoon'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              Kombinasi Yōon (33 Bunyi)
            </button>
          </div>

          {/* Romaji Search Box */}
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari huruf (misal: ka, shi)..."
              className="w-full rounded-xl border border-stone-200 bg-stone-50 pl-8 pr-3 py-1.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-red-400 focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Grid + Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Character Grid (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {activeTab === 'basic' && (
            <div className="space-y-4">
              {HIRAGANA_GROUPS.map((group) => {
                const visibleChars = group.characters.filter((c) =>
                  c.romaji.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  c.character.includes(searchQuery)
                );

                if (searchQuery && visibleChars.length === 0) return null;

                return (
                  <div
                    key={group.id}
                    className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-red-600">
                          {group.name}
                        </span>
                        <span className="text-xs text-stone-400">•</span>
                        <span className="text-xs font-semibold text-stone-700 font-jp">
                          {group.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-stone-400 uppercase">
                        Grup {group.order}
                      </span>
                    </div>

                    <div className="grid grid-cols-5 gap-2.5">
                      {visibleChars.map((item) => {
                        const isSelected = selectedChar?.character === item.character;

                        return (
                          <button
                            key={item.character}
                            id={`ref-char-${item.romaji}`}
                            onClick={() => handleCharacterClick(item)}
                            className={`group relative flex flex-col items-center justify-center rounded-xl p-2.5 transition-all ${
                              isSelected
                                ? 'border-2 border-red-500 bg-red-50/80 shadow-xs ring-2 ring-red-500/20'
                                : 'border border-stone-200 bg-stone-50/60 hover:border-red-300 hover:bg-white active:scale-95'
                            }`}
                            title={`Klik untuk dengar suara: ${item.character} (${item.romaji})`}
                          >
                            <span className="text-2xl sm:text-3xl font-bold font-jp text-stone-900 leading-none">
                              {item.character}
                            </span>
                            <span className="mt-1 font-mono text-xs font-semibold text-stone-600">
                              {item.romaji}
                            </span>
                            <span className="text-[9px] text-stone-400 mt-0.5">
                              {item.strokes} coretan
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'dakuten' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 text-xs text-amber-900 leading-relaxed">
                💡 <strong>Penjelasan Dakuten:</strong> Tanda petik dua (゛) disebut <em>dakuten</em> atau <em>tenten</em>, mengubah konsonan tak bersuara menjadi bersuara (K→G, S→Z, T→D, H→B). Sedangkan lingkaran kecil (゜) disebut <em>handakuten</em> atau <em>maru</em> (H→P).
              </div>

              {DAKUTEN_GROUPS.map((grp, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs"
                >
                  <div className="mb-2">
                    <h3 className="text-xs font-bold text-stone-900">{grp.name}</h3>
                    <p className="text-[11px] text-stone-500">{grp.desc}</p>
                  </div>

                  <div className="grid grid-cols-5 gap-2.5 mt-3">
                    {grp.items.map((item) => (
                      <button
                        key={item.character}
                        onClick={() => handleCharacterClick(item)}
                        className="group flex flex-col items-center justify-center rounded-xl border border-stone-200 bg-stone-50 p-2.5 hover:border-red-400 hover:bg-white active:scale-95 transition"
                      >
                        <span className="text-2xl sm:text-3xl font-bold font-jp text-stone-900">
                          {item.character}
                        </span>
                        <span className="mt-1 font-mono text-xs font-bold text-stone-700">
                          {item.romaji}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'yoon' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 text-xs text-blue-900 leading-relaxed">
                💡 <strong>Penjelasan Yōon:</strong> Bunyi gabungan terbentuk dari karakter berakhiran "i" (ki, shi, chi, ni, hi, mi, ri, gi, ji, bi, pi) yang diikuti oleh huruf <strong>ya (ゃ), yu (ゅ), yo (ょ)</strong> berukuran kecil.
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs">
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                  {YOON_COMBOS.map((combo) => (
                    <button
                      key={combo.combo}
                      onClick={() => handleComboClick(combo)}
                      className="group flex flex-col items-center justify-center rounded-xl border border-stone-200 bg-stone-50 p-2.5 hover:border-red-400 hover:bg-red-50/50 active:scale-95 transition"
                    >
                      <span className="text-xl sm:text-2xl font-bold font-jp text-stone-900">
                        {combo.combo}
                      </span>
                      <span className="mt-1 font-mono text-xs font-bold text-stone-700">
                        {combo.romaji}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Selected Character Detail Inspector (4 Cols) */}
        <div className="lg:col-span-4 sticky top-20">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Detail Huruf Terpilih
              </span>
              <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-mono text-stone-600 font-bold">
                {selectedChar?.romaji}
              </span>
            </div>

            {/* Big Character View */}
            <div className="relative flex flex-col items-center justify-center rounded-2xl border border-stone-200 bg-stone-50/60 py-6">
              <span className="text-7xl font-bold font-jp text-stone-900 leading-none">
                {selectedChar?.character}
              </span>
              <span className="mt-2 text-xl font-black font-mono text-red-600">
                /{selectedChar?.romaji}/
              </span>
              <span className="mt-1 text-xs text-stone-500 font-medium">
                {selectedChar?.strokes || 2} Coretan Kuas (Strokes)
              </span>

              {/* Instant Audio Replay Button */}
              <button
                id="ref-inspector-audio-btn"
                onClick={() => {
                  playClickSound(soundEnabled);
                  speakJapanese(selectedChar?.character || 'あ', soundEnabled);
                }}
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-4 py-2 text-xs font-bold text-stone-800 shadow-xs hover:border-red-300 hover:bg-red-50 hover:text-red-700 active:scale-95 transition"
              >
                <Volume2 className="h-4 w-4 text-red-600" />
                <span>Dengar Pelafalan</span>
              </button>
            </div>

            {/* Hint & Mnemonics */}
            {selectedChar?.hint && (
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase text-stone-400">
                  Tips Mengingat Visual
                </span>
                <p className="text-stone-700 leading-relaxed font-medium">
                  {selectedChar.hint}
                </p>
              </div>
            )}

            {/* Stroke Guide Steps */}
            {selectedChar?.strokeGuide && selectedChar.strokeGuide.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Urutan Tarikan Garis
                </span>
                <div className="space-y-1 text-xs">
                  {selectedChar.strokeGuide.map((step, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg bg-stone-50 p-2 text-stone-700 border border-stone-100"
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Big Action: Practice in Writing Canvas */}
            <div className="pt-2">
              <button
                id="ref-jump-writing-btn"
                onClick={() => {
                  playClickSound(soundEnabled);
                  onSelectCharacterPractice(selectedChar);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-xs font-bold text-white shadow-xs hover:bg-amber-600 active:scale-95 transition"
              >
                <PenTool className="h-4 w-4" />
                <span>Latih Tulis Karakter Ini di Kanvas</span>
              </button>
              <p className="text-[10px] text-stone-400 text-center mt-2">
                Membuka kanvas coret langsung untuk huruf {selectedChar?.character}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
