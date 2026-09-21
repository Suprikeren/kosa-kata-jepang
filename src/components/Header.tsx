import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Map, 
  BookOpen, 
  ChevronLeft, 
  HelpCircle, 
  Home, 
  FileText,
  X,
  Menu,
  ChevronRight,
  Sparkles,
  Flame
} from 'lucide-react';
import { AppView } from '../types';
import { playClickSound } from '../utils/audio';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onBack?: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  streak?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onBack,
  soundEnabled,
  onToggleSound,
  streak = 0,
}) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  // Close sidebar on Escape key or when resizing to large desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSideMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Prevent background scroll when side drawer is open
  useEffect(() => {
    if (isSideMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSideMenuOpen]);

  const navItems: { 
    id: AppView; 
    label: string; 
    shortLabel: string; 
    description: string;
    icon: React.ReactNode; 
  }[] = [
    {
      id: 'path-select',
      label: 'Beranda Utama',
      shortLabel: 'Beranda',
      description: 'Halaman beranda & pemilihan jalur petualangan',
      icon: <Home className="h-4 w-4" />,
    },
    {
      id: 'level-1-dashboard',
      label: 'Level 1: Hiragana',
      shortLabel: 'Level 1',
      description: '10 grup aksara, latihan kanvas, & kuis',
      icon: <span className="font-bold text-xs font-jp">あ</span>,
    },
    {
      id: 'sentences-dashboard',
      label: 'Kata & Cerita',
      shortLabel: 'Kalimat',
      description: 'Kata dasar, kalimat, & cerita (PG & Isian Teks)',
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: 'reference-page',
      label: 'Tabel Karakter & Audio',
      shortLabel: 'Tabel',
      description: 'Tabel lengkap 46 aksara, dakuten, & pelafalan audio',
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: 'roadmap-page',
      label: 'Peta 17 Level',
      shortLabel: 'Peta',
      description: 'Kurikulum perjalanan dari pemula sampai mahir',
      icon: <Map className="h-4 w-4" />,
    },
    {
      id: 'guide-page',
      label: 'Panduan & Cara Pakai',
      shortLabel: 'Panduan',
      description: 'Panduan navigasi, strategi belajar & FAQ',
      icon: <HelpCircle className="h-4 w-4" />,
    },
  ];

  // Sub-mode classification
  const isLevel1SubMode = ['mode-learn', 'mode-quiz', 'mode-writing'].includes(currentView);
  const isSentencesSubMode = currentView === 'sentences-quiz';
  const isSubMode = isLevel1SubMode || isSentencesSubMode;

  // Active state checker
  const isItemActive = (itemId: AppView) => {
    if (currentView === itemId) return true;
    if (itemId === 'level-1-dashboard' && isLevel1SubMode) return true;
    if (itemId === 'sentences-dashboard' && isSentencesSubMode) return true;
    return false;
  };

  // Get active mode label
  const getSubModeLabel = () => {
    switch (currentView) {
      case 'mode-learn':
        return { label: 'Mode Belajar', icon: '📖' };
      case 'mode-quiz':
        return { label: 'Mode Kuis', icon: '🎯' };
      case 'mode-writing':
        return { label: 'Kanvas Menulis', icon: '✍️' };
      case 'sentences-quiz':
        return { label: 'Kuis Kata & Cerita', icon: '⚡' };
      default:
        return null;
    }
  };

  const activeModeInfo = getSubModeLabel();

  const handleNavItemClick = (view: AppView) => {
    playClickSound(soundEnabled);
    setIsSideMenuOpen(false);
    onNavigate(view);
  };

  return (
    <>
      {/* Top Main Navigation Header */}
      <header className="sticky top-0 z-30 w-full border-b border-stone-200/90 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3">
          {/* Left: Back button & Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onBack && (isSubMode || currentView !== 'path-select') && (
              <button
                id="header-back-btn"
                onClick={() => {
                  playClickSound(soundEnabled);
                  onBack();
                }}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-bold shadow-xs transition active:scale-95 ${
                  isSubMode
                    ? 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:border-red-300'
                    : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                }`}
                title={isSubMode ? 'Keluar dari mode latihan ini' : 'Kembali ke halaman sebelumnya'}
              >
                {isSubMode ? <X className="h-3.5 w-3.5" /> : <ChevronLeft className="h-4 w-4" />}
                <span className="font-semibold text-[11px] sm:text-xs">
                  {isSubMode ? 'Keluar Mode' : 'Kembali'}
                </span>
              </button>
            )}

            <button
              onClick={() => handleNavItemClick('path-select')}
              className="flex items-center gap-2 text-left group"
              title="Ke Halaman Utama"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 font-bold text-white shadow-xs group-hover:scale-105 transition">
                <span className="text-base font-black font-jp">日</span>
              </div>
              <div className="hidden min-[380px]:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm sm:text-base font-black tracking-tight text-stone-900">
                    Nihongo Quest
                  </span>
                  <span className="rounded-md bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-700 border border-red-200">
                    Level 1
                  </span>
                </div>
                <p className="hidden text-[10px] text-stone-500 sm:block leading-none mt-0.5">
                  Belajar Bahasa Jepang Interaktif
                </p>
              </div>
            </button>
          </div>

          {/* Center: Active Mode Indicator Badge (when in submode) OR Desktop Navigation Tabs */}
          <div className="flex items-center gap-2">
            {isSubMode && activeModeInfo && (
              <div className="flex items-center gap-1.5 rounded-full bg-red-50 border border-red-200/90 px-3 py-1 text-xs font-bold text-red-700 shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                <span>{activeModeInfo.icon}</span>
                <span className="font-extrabold">{activeModeInfo.label}</span>
              </div>
            )}

            {/* Desktop Navigation Tabs (Visible on Large Screens >= lg) */}
            <nav className="hidden lg:flex items-center gap-1 bg-stone-100/80 p-1 rounded-2xl border border-stone-200/80">
              {navItems.map((item) => {
                const active = isItemActive(item.id);

                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => handleNavItemClick(item.id)}
                    className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold transition ${
                      active
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right: Quick actions (Streak, Sound & Hamburger Sidebar Button) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {streak > 0 && (
              <div className="flex items-center gap-1 rounded-xl border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-bold text-amber-800">
                <span>🔥</span>
                <span>{streak}</span>
              </div>
            )}

            {/* Sound Toggle */}
            <button
              id="sound-toggle-btn"
              onClick={() => {
                onToggleSound();
              }}
              className={`flex h-8.5 w-8.5 items-center justify-center rounded-xl border transition sm:h-9 sm:w-9 ${
                soundEnabled
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  : 'border-stone-200 bg-white text-stone-400 hover:bg-stone-100'
              }`}
              title={soundEnabled ? 'Suara Aktif (Klik untuk Matikan)' : 'Suara Mati (Klik untuk Nyalakan)'}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

            {/* Hamburger Button (Opens Slide-in Sidebar dari Sisi Kanan) */}
            <button
              id="header-hamburger-btn"
              onClick={() => {
                playClickSound(soundEnabled);
                setIsSideMenuOpen(true);
              }}
              className="flex h-8.5 w-8.5 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition sm:h-9 sm:w-9 lg:hidden active:scale-95"
              title="Buka Menu Sisi (Sidebar)"
              aria-label="Buka Menu Sisi"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* SIDEBAR DARI SISI KANAN (SLIDE-OVER SIDE DRAWER WITH BACKDROP) */}
      {/* ========================================================= */}
      {isSideMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Dark Blurred Backdrop */}
          <div
            onClick={() => setIsSideMenuOpen(false)}
            className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            aria-hidden="true"
          />

          {/* Right Slide-in Side Panel (Menu Sisi) */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-50">
            <aside 
              id="sidebar-side-panel"
              className="w-screen max-w-sm bg-white border-l border-stone-200 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 ease-out"
            >
              {/* Sidebar Header */}
              <div className="px-5 py-4 border-b border-stone-100 bg-stone-50/70 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-600 font-bold text-white shadow-xs">
                    <span className="font-jp text-sm">日</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-stone-900 tracking-tight">
                      Menu Navigasi
                    </h3>
                    <p className="text-[10px] text-stone-500 font-medium">
                      Nihongo Quest • Level 1
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  id="close-sidebar-btn"
                  onClick={() => setIsSideMenuOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition active:scale-95"
                  title="Tutup Menu Sisi"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Sidebar Content (Scrollable without visible scrollbar) */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {/* Active Submode Warning & Action */}
                {isSubMode && activeModeInfo && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-xs">
                    <div className="flex items-center justify-between font-bold text-red-900 mb-1">
                      <span className="flex items-center gap-1.5">
                        <span>{activeModeInfo.icon}</span>
                        <span>{activeModeInfo.label} Sedang Aktif</span>
                      </span>
                      <span className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
                    </div>
                    <p className="text-[11px] text-red-700 mb-2">
                      Kamu sedang berada dalam sesi latihan. Ingin keluar ke menu utama?
                    </p>
                    {onBack && (
                      <button
                        onClick={() => {
                          playClickSound(soundEnabled);
                          setIsSideMenuOpen(false);
                          onBack();
                        }}
                        className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-red-600 py-1.5 text-white font-bold text-[11px] shadow-xs hover:bg-red-700 active:scale-95 transition"
                      >
                        <X className="h-3.5 w-3.5" />
                        <span>Hentikan & Keluar Mode</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Navigation Items List */}
                <div className="space-y-1.5">
                  <div className="px-1 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    Halaman & Menu Utama
                  </div>

                  {navItems.map((item) => {
                    const active = isItemActive(item.id);

                    return (
                      <button
                        key={item.id}
                        id={`sidebar-link-${item.id}`}
                        onClick={() => handleNavItemClick(item.id)}
                        className={`w-full flex items-center gap-3 rounded-2xl p-3 text-left transition border ${
                          active
                            ? 'border-red-300 bg-red-50/80 text-stone-900 shadow-xs'
                            : 'border-transparent bg-stone-50/40 hover:bg-stone-100/80 hover:border-stone-200 text-stone-700'
                        }`}
                      >
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold ${
                            active
                              ? 'bg-red-600 text-white shadow-xs'
                              : 'bg-white text-stone-700 border border-stone-200'
                          }`}
                        >
                          {item.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-sm font-bold truncate ${
                                active ? 'text-red-700 font-black' : 'text-stone-900'
                              }`}
                            >
                              {item.label}
                            </span>
                            {active && (
                              <span className="rounded-full bg-red-600 px-1.5 py-0.5 text-[9px] font-black text-white uppercase tracking-wider">
                                Aktif
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                            {item.description}
                          </p>
                        </div>

                        <ChevronRight
                          className={`h-4 w-4 shrink-0 transition ${
                            active ? 'text-red-600 translate-x-0.5' : 'text-stone-300'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Quick Info Card inside Sidebar */}
                <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-3.5 text-xs text-stone-600 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-stone-900">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span>Nihongo Quest Local-First</span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Semua progres karakter terbuka, skor kuis, dan data latihan tersimpan langsung di browser perangkatmu.
                  </p>
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-stone-100 bg-stone-50/50 space-y-2">
                <button
                  onClick={() => {
                    onToggleSound();
                  }}
                  className="w-full flex items-center justify-between rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
                >
                  <div className="flex items-center gap-2">
                    {soundEnabled ? (
                      <Volume2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <VolumeX className="h-4 w-4 text-stone-400" />
                    )}
                    <span>Efek Suara & Lafal Audio</span>
                  </div>
                  <span className={`text-[11px] font-bold ${soundEnabled ? 'text-emerald-700' : 'text-stone-400'}`}>
                    {soundEnabled ? 'Menyala' : 'Mati'}
                  </span>
                </button>

                <div className="text-center text-[10px] text-stone-400 pt-1">
                  Nihongo Quest • Versi 1.2
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (Sticky at bottom for rapid thumb access) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-stone-200 bg-white/95 backdrop-blur-md px-2 py-1.5 shadow-lg">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const active = isItemActive(item.id);

            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavItemClick(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl text-[10px] font-bold transition relative ${
                  active
                    ? 'text-red-600 font-black'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <div
                  className={`p-1 rounded-lg ${
                    active ? 'bg-red-50 text-red-600' : ''
                  }`}
                >
                  {item.icon}
                </div>
                <span className="mt-0.5 tracking-tight">{item.shortLabel}</span>
                {active && (
                  <span className="absolute -top-0.5 right-1 h-1.5 w-1.5 rounded-full bg-red-600 ring-2 ring-white" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
