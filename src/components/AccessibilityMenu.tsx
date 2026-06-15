import React, { useEffect, useState } from 'react';
import { 
  X, 
  RotateCcw,
  Eye, 
  Link2, 
  Type, 
  MoveRight, 
  Pause, 
  Sparkles, 
  MousePointer, 
  HelpCircle, 
  FileText,
  Minimize2,
  Lock,
  ChevronDown,
  Info
} from 'lucide-react';
import { AccessibilitySettings } from '../types';

interface AccessibilityMenuProps {
  settings: AccessibilitySettings;
  onChange: (settings: AccessibilitySettings) => void;
}

export default function AccessibilityMenu({ settings, onChange }: AccessibilityMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'right' | 'left'>('right');

  // Load accessibility shortcut (Ctrl + U or Alt + U)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key.toLowerCase() === 'u') || (e.altKey && e.key.toLowerCase() === 'u')) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleContrast = () => {
    onChange({
      ...settings,
      contrast: settings.contrast === 'normal' ? 'high' : 'normal'
    });
  };

  const handleToggleHighlightLinks = () => {
    onChange({
      ...settings,
      highlightLinks: !settings.highlightLinks
    });
  };

  const handleToggleFontSize = () => {
    let nextSize: 'normal' | 'large' | 'extra-large' = 'normal';
    if (settings.fontSize === 'normal') nextSize = 'large';
    else if (settings.fontSize === 'large') nextSize = 'extra-large';
    onChange({ ...settings, fontSize: nextSize });
  };

  const handleToggleTextSpacing = () => {
    let nextSpacing: 'normal' | 'wide' | 'extra-wide' = 'normal';
    if (settings.textSpacing === 'normal') nextSpacing = 'wide';
    else if (settings.textSpacing === 'wide') nextSpacing = 'extra-wide';
    onChange({ ...settings, textSpacing: nextSpacing });
  };

  const handleToggleAnimations = () => {
    onChange({ ...settings, pauseAnimations: !settings.pauseAnimations });
  };

  const handleToggleDyslexia = () => {
    onChange({ ...settings, dyslexiaFont: !settings.dyslexiaFont });
  };

  const handleToggleCursor = () => {
    onChange({ ...settings, bigCursor: !settings.bigCursor });
  };

  const handleToggleTooltips = () => {
    onChange({ ...settings, tooltips: !settings.tooltips });
  };

  const handleToggleLineHeight = () => {
    let nextLH: 'normal' | 'tall' | 'extra-tall' = 'normal';
    if (settings.lineHeight === 'normal') nextLH = 'tall';
    else if (settings.lineHeight === 'tall') nextLH = 'extra-tall';
    onChange({ ...settings, lineHeight: nextLH });
  };

  const handleResetAll = () => {
    onChange({
      contrast: 'normal',
      highlightLinks: false,
      fontSize: 'normal',
      textSpacing: 'normal',
      pauseAnimations: false,
      dyslexiaFont: false,
      bigCursor: false,
      tooltips: false,
      lineHeight: 'normal'
    });
  };

  const togglePosition = () => {
    setPosition(prev => prev === 'right' ? 'left' : 'right');
  };

  return (
    <div className="relative z-50">
      {/* Floating Widget Toggle Trigger Button - Modern with elegant pulse ring */}
      <div className={`fixed bottom-6 ${position === 'right' ? 'right-6' : 'left-6'} z-50 flex items-center justify-center`}>
        <span className="absolute inline-flex h-14 w-14 rounded-full bg-red-400 opacity-20 animate-ping" />
        <button
          id="btn-accessibility-widget-trigger"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 bg-gradient-to-tr from-[#9e2a1b] to-[#dc4c38] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(220,76,56,0.3)] transition-all duration-300 hover:scale-[1.08] hover:rotate-3 cursor-pointer select-none"
          title="Menu Aksesibilitas (Ctrl + U)"
        >
          <span className="text-2xl leading-none">♿</span>
        </button>
      </div>

      {/* Actual Accessibility Panel */}
      {isOpen && (
        <div 
          id="accessibility-control-panel-drawer"
          className={`fixed top-4 bottom-24 ${position === 'right' ? 'right-4' : 'left-4'} w-80 sm:w-96 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col z-50 animate-in slide-in-from-bottom-8 duration-300`}
        >
          {/* Header Bar */}
          <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-extrabold text-xs tracking-widest uppercase text-slate-100">Kustomisasi Menu</h3>
              <p className="text-[9px] text-red-400 font-bold uppercase tracking-widest leading-none">Shortcut: Ctrl + U</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Settings Grid Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/70">
            <div className="grid grid-cols-2 gap-3">
              
              {/* 1. Contrast Toggle */}
              <button
                type="button"
                onClick={handleToggleContrast}
                className={`flex flex-col items-center justify-center p-4.5 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                  settings.contrast === 'high' 
                    ? 'bg-[#c13a29] border-[#c13a29] text-white font-extrabold shadow-md shadow-red-500/10 scale-[1.02]' 
                    : 'bg-white border-slate-200/80 text-slate-700 hover:border-slate-350 hover:bg-white/95'
                }`}
              >
                <Eye className="w-5 h-5 mb-1.5" />
                <span className="text-[11px] font-extrabold">Kontras Tinggi</span>
                <span className="text-[8px] opacity-75 font-mono mt-0.5 uppercase">
                  {settings.contrast === 'high' ? 'Aktif' : 'Standar'}
                </span>
              </button>

              {/* 2. Highlight Links */}
              <button
                type="button"
                onClick={handleToggleHighlightLinks}
                className={`flex flex-col items-center justify-center p-4.5 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                  settings.highlightLinks 
                    ? 'bg-[#c13a29] border-[#c13a29] text-white font-extrabold shadow-md shadow-red-500/10 scale-[1.02]' 
                    : 'bg-white border-slate-200/80 text-slate-700 hover:border-slate-350 hover:bg-white/95'
                }`}
              >
                <Link2 className="w-5 h-5 mb-1.5" />
                <span className="text-[11px] font-extrabold">Sorot Link</span>
                <span className="text-[8px] opacity-75 font-mono mt-0.5 uppercase">
                  {settings.highlightLinks ? 'Sorotan Aktif' : 'Standar'}
                </span>
              </button>

              {/* 3. Bigger Text Sizes */}
              <button
                type="button"
                onClick={handleToggleFontSize}
                className={`flex flex-col items-center justify-center p-4.5 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                  settings.fontSize !== 'normal' 
                    ? 'bg-[#c13a29] border-[#c13a29] text-white font-extrabold shadow-md shadow-red-500/10 scale-[1.02]' 
                    : 'bg-white border-slate-200/80 text-slate-700 hover:border-slate-350 hover:bg-white/95'
                }`}
              >
                <Type className="w-5 h-5 mb-1.5" />
                <span className="text-[11px] font-extrabold">Ukuran Teks</span>
                <span className="text-[8px] opacity-75 font-mono mt-0.5 uppercase">
                  {settings.fontSize === 'normal' && 'Standard'}
                  {settings.fontSize === 'large' && 'Besar (115%)'}
                  {settings.fontSize === 'extra-large' && 'Sangat Besar'}
                </span>
              </button>

              {/* 4. Letter spacing */}
              <button
                type="button"
                onClick={handleToggleTextSpacing}
                className={`flex flex-col items-center justify-center p-4.5 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                  settings.textSpacing !== 'normal' 
                    ? 'bg-[#c13a29] border-[#c13a29] text-white font-extrabold shadow-md shadow-red-500/10 scale-[1.02]' 
                    : 'bg-white border-slate-200/80 text-slate-700 hover:border-slate-350 hover:bg-white/95'
                }`}
              >
                <MoveRight className="w-5 h-5 mb-1.5" />
                <span className="text-[11px] font-extrabold">Spasi Tulisan</span>
                <span className="text-[8px] opacity-75 font-mono mt-0.5 uppercase">
                  {settings.textSpacing === 'normal' && 'Standard'}
                  {settings.textSpacing === 'wide' && 'Lebar'}
                  {settings.textSpacing === 'extra-wide' && 'Sangat Lebar'}
                </span>
              </button>

              {/* 5. Pause Animations */}
              <button
                type="button"
                onClick={handleToggleAnimations}
                className={`flex flex-col items-center justify-center p-4.5 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                  settings.pauseAnimations 
                    ? 'bg-[#c13a29] border-[#c13a29] text-white font-extrabold shadow-md shadow-red-500/10 scale-[1.02]' 
                    : 'bg-white border-slate-200/80 text-slate-700 hover:border-slate-350 hover:bg-white/95'
                }`}
              >
                <Pause className="w-5 h-5 mb-1.5" />
                <span className="text-[11px] font-extrabold">Henti Gerak</span>
                <span className="text-[8px] opacity-75 font-mono mt-0.5 uppercase">
                  {settings.pauseAnimations ? 'Henti' : 'Normal'}
                </span>
              </button>

              {/* 6. Dyslexia Friendly */}
              <button
                type="button"
                onClick={handleToggleDyslexia}
                className={`flex flex-col items-center justify-center p-4.5 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                  settings.dyslexiaFont 
                    ? 'bg-[#c13a29] border-[#c13a29] text-white font-extrabold shadow-md shadow-red-500/10 scale-[1.02]' 
                    : 'bg-white border-slate-200/80 text-slate-700 hover:border-slate-350 hover:bg-white/95'
                }`}
              >
                <Sparkles className="w-5 h-5 mb-1.5" />
                <span className="text-[11px] font-extrabold">Font Disleksia</span>
                <span className="text-[8px] opacity-75 font-mono mt-0.5 uppercase">
                  {settings.dyslexiaFont ? 'Aktif' : 'Standard'}
                </span>
              </button>

              {/* 7. Cursor Pointer Big */}
              <button
                type="button"
                onClick={handleToggleCursor}
                className={`flex flex-col items-center justify-center p-4.5 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                  settings.bigCursor 
                    ? 'bg-[#c13a29] border-[#c13a29] text-white font-extrabold shadow-md shadow-red-500/10 scale-[1.02]' 
                    : 'bg-white border-slate-200/80 text-slate-700 hover:border-slate-350 hover:bg-white/95'
                }`}
              >
                <MousePointer className="w-5 h-5 mb-1.5" />
                <span className="text-[11px] font-extrabold">Kursor Besar</span>
                <span className="text-[8px] opacity-75 font-mono mt-0.5 uppercase">
                  {settings.bigCursor ? 'Aktif' : 'Standard'}
                </span>
              </button>

              {/* 8. Show Tooltips / Guides */}
              <button
                type="button"
                onClick={handleToggleTooltips}
                className={`flex flex-col items-center justify-center p-4.5 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                  settings.tooltips 
                    ? 'bg-[#c13a29] border-[#c13a29] text-white font-extrabold shadow-md shadow-red-500/10 scale-[1.02]' 
                    : 'bg-white border-slate-200/80 text-slate-700 hover:border-slate-350 hover:bg-white/95'
                }`}
              >
                <HelpCircle className="w-5 h-5 mb-1.5" />
                <span className="text-[11px] font-extrabold">Bantuan Teks</span>
                <span className="text-[8px] opacity-75 font-mono mt-0.5 uppercase">
                  {settings.tooltips ? 'Aktif' : 'Standar'}
                </span>
              </button>

              {/* 9. Line Height */}
              <button
                type="button"
                onClick={handleToggleLineHeight}
                className={`flex flex-col items-center justify-center p-4.5 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                  settings.lineHeight !== 'normal' 
                    ? 'bg-[#c13a29] border-[#c13a29] text-white font-extrabold shadow-md shadow-red-500/10 scale-[1.02]' 
                    : 'bg-white border-slate-200/80 text-slate-700 hover:border-slate-350 hover:bg-white/95'
                }`}
              >
                <FileText className="w-5 h-5 mb-1.5" />
                <span className="text-[11px] font-extrabold">Tinggi Lin</span>
                <span className="text-[8px] opacity-75 font-mono mt-0.5 uppercase">
                  {settings.lineHeight === 'normal' && 'Standard'}
                  {settings.lineHeight === 'tall' && 'Renggang'}
                  {settings.lineHeight === 'extra-tall' && 'Sangat Renggang'}
                </span>
              </button>

              {/* 10. Reset All - Crimson styled */}
              <button
                type="button"
                onClick={handleResetAll}
                className="flex flex-col items-center justify-center p-4.5 rounded-2xl border border-dashed border-red-300 bg-red-50 hover:bg-red-100/70 text-red-700 text-center transition-all duration-200 cursor-pointer"
              >
                <RotateCcw className="w-5 h-5 mb-1.5 text-red-600 animate-spin-once" />
                <span className="text-[11px] font-extrabold">Reset Setelan</span>
                <span className="text-[8px] opacity-75 font-mono mt-0.5 uppercase mb-px">Kembali Normal</span>
              </button>

            </div>

            {/* Quick guide alerts or tooltip helpers */}
            {settings.tooltips && (
              <div className="bg-amber-50 border border-amber-200/70 p-4 rounded-xl flex gap-3 text-amber-800 animate-in fade-in zoom-in-95 duration-150">
                <Info className="w-4.5 h-4.5 shrink-0 mt-0.5 text-amber-600" />
                <p className="text-[10px] leading-relaxed font-semibold">
                  <strong>Mode Bantuan Visual:</strong> Arahkan pilihan Anda ke modul mana saja untuk memaparkan teks penjelas. Gunakan tombol di atas untuk menyesuaikan kenyamanan Anda melamar pekerjaan.
                </p>
              </div>
            )}
          </div>

          {/* Footer controls & Branding */}
          <div className="p-4 bg-white border-t border-slate-100 flex flex-col gap-3">
            <button
              onClick={togglePosition}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-black text-slate-700 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
            >
              <Minimize2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Geser Kiri / Kanan Panel</span>
            </button>

            <div className="text-center space-y-0.5">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                Sistem Aksesibilitas Peluang Setara @ 2026
              </p>
              <p className="text-[8px] text-slate-400 font-semibold">
                Mendukung WCAG 2.1 & Akses Kesetaraan Bersama
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
