import React, { useRef, useState, useEffect } from 'react';
import { Volume2, Trash2, Eye, EyeOff, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { CharacterGroup, CharacterItem } from '../types';
import { speakJapanese, playClickSound } from '../utils/audio';

interface ModeWritingPracticeProps {
  group: CharacterGroup;
  initialCharIndex?: number;
  onBackToLevel: () => void;
  soundEnabled: boolean;
}

export const ModeWritingPractice: React.FC<ModeWritingPracticeProps> = ({
  group,
  initialCharIndex = 0,
  onBackToLevel,
  soundEnabled,
}) => {
  const [charIndex, setCharIndex] = useState(initialCharIndex);
  const [showGuide, setShowGuide] = useState(true);
  const [strokeWidth, setStrokeWidth] = useState(8);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const currentChar: CharacterItem = group.characters[charIndex] || group.characters[0];

  // Draw background grid (crosshairs)
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);

    // Subtle background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Crosshairs
    ctx.save();
    ctx.strokeStyle = '#e7e5e4'; // stone-200
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);

    // Horizontal center line
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Vertical center line
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    ctx.restore();
  };

  const clearCanvas = () => {
    playClickSound(soundEnabled);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawGrid(ctx, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  // Setup canvas size with DPI scaling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset when character changes
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    drawGrid(ctx, rect.width, rect.height);
    setHasDrawn(false);
  }, [charIndex]);

  // Handle drawing events
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else if ('clientX' in e) {
      return {
        x: (e as React.MouseEvent).clientX - rect.left,
        y: (e as React.MouseEvent).clientY - rect.top,
      };
    }
    return { x: 0, y: 0 };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1c1917'; // stone-900
    ctx.lineWidth = strokeWidth;

    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleNext = () => {
    playClickSound(soundEnabled);
    if (charIndex < group.characters.length - 1) {
      setCharIndex((prev) => prev + 1);
    } else {
      onBackToLevel();
    }
  };

  const handlePrev = () => {
    playClickSound(soundEnabled);
    if (charIndex > 0) {
      setCharIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      {/* Top Breadcrumb */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Mode E • Latihan Menulis Kanvas
          </span>
          <h2 className="text-xl font-black text-stone-900 sm:text-2xl">
            Tulis: <span className="font-['Noto_Sans_JP']">{currentChar.character}</span> ({currentChar.romaji})
          </h2>
        </div>
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-600">
          {charIndex + 1} dari {group.characters.length}
        </span>
      </div>

      {/* Main Drawing Card */}
      <div className="rounded-3xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm flex flex-col items-center">
        {/* Prompt Header with Audio */}
        <div className="w-full flex items-center justify-between mb-3 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span>Bunyi: <strong className="text-stone-800 font-mono text-sm font-bold">{currentChar.romaji}</strong></span>
            {currentChar.strokes && (
              <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] text-stone-600 font-medium">
                {currentChar.strokes} Goresan
              </span>
            )}
          </div>

          <button
            onClick={() => speakJapanese(currentChar.character, soundEnabled)}
            className="flex items-center gap-1 rounded-lg bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700 hover:bg-red-50 hover:text-red-600 transition"
          >
            <Volume2 className="h-3.5 w-3.5" />
            <span>Dengarkan</span>
          </button>
        </div>

        {/* The Square Canvas Box (Square Japanese Grid) */}
        <div className="relative h-72 w-72 sm:h-80 sm:w-80 rounded-2xl border-2 border-stone-300 shadow-inner overflow-hidden touch-none select-none">
          {/* Watermark Reference Guide (Can be toggled) */}
          {showGuide && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-15 select-none">
              <span className="text-[190px] sm:text-[210px] font-black text-stone-900 font-['Noto_Sans_JP'] leading-none">
                {currentChar.character}
              </span>
            </div>
          )}

          <canvas
            ref={canvasRef}
            id="writing-practice-canvas"
            className="h-full w-full cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>

        {/* Canvas Toolbar Controls */}
        <div className="mt-4 w-full flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 pt-4">
          <div className="flex items-center gap-2">
            {/* Clear button */}
            <button
              id="canvas-clear-btn"
              onClick={clearCanvas}
              className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 shadow-xs hover:bg-stone-50 active:scale-95 transition"
            >
              <Trash2 className="h-3.5 w-3.5 text-stone-500" />
              <span>Bersihkan</span>
            </button>

            {/* Guide Toggle */}
            <button
              id="canvas-guide-toggle-btn"
              onClick={() => setShowGuide((prev) => !prev)}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold shadow-xs transition active:scale-95 ${
                showGuide
                  ? 'border-red-200 bg-red-50 text-red-700'
                  : 'border-stone-200 bg-white text-stone-500 hover:bg-stone-50'
              }`}
            >
              {showGuide ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              <span>{showGuide ? 'Panduan Nyala' : 'Panduan Mati'}</span>
            </button>
          </div>

          {/* Stroke width selector */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <span>Tebal:</span>
            {[4, 8, 12].map((w) => (
              <button
                key={w}
                onClick={() => setStrokeWidth(w)}
                className={`h-7 w-7 rounded-lg border flex items-center justify-center font-bold text-xs transition ${
                  strokeWidth === w
                    ? 'border-stone-800 bg-stone-900 text-white'
                    : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                {w === 4 ? 'S' : w === 8 ? 'M' : 'L'}
              </button>
            ))}
          </div>
        </div>

        {/* Stroke Steps Guide */}
        {currentChar.strokeGuide && (
          <div className="mt-4 w-full rounded-2xl bg-stone-50 border border-stone-200 p-3 text-left text-xs text-stone-600">
            <div className="font-bold text-stone-800 mb-1">
              Petunjuk Langkah Penulisan:
            </div>
            <ul className="space-y-1 text-[11px]">
              {currentChar.strokeGuide.map((step, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="font-bold text-red-600">{idx + 1}.</span>
                  <span>{step.replace(/^\d+\.\s*/, '')}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Navigation bottom controls: Previous & Next */}
        <div className="mt-6 flex w-full items-center justify-between gap-3">
          <button
            id="writing-prev-btn"
            onClick={handlePrev}
            disabled={charIndex === 0}
            className={`flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-bold transition active:scale-95 ${
              charIndex === 0
                ? 'border-stone-200 text-stone-300 cursor-not-allowed'
                : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            Sebelumnya
          </button>

          {charIndex < group.characters.length - 1 ? (
            <button
              id="writing-next-btn"
              onClick={handleNext}
              className="flex items-center gap-1.5 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-red-700 active:scale-95 transition"
            >
              <span>Lanjut Karakter</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              id="writing-finish-btn"
              onClick={onBackToLevel}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 active:scale-95 transition"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Selesai Latihan</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
