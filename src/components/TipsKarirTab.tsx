import React, { useState } from 'react';
import { INITIAL_TIPS } from '../data/peluang-setara';
import { CareerTip } from '../types';
import { BookOpen, Calendar, Clock, ArrowRight, User2, MessageSquareText, Lightbulb, ChevronRight } from 'lucide-react';

export default function TipsKarirTab() {
  const [tips, setTips] = useState<CareerTip[]>(INITIAL_TIPS);
  const [selectedTip, setSelectedTip] = useState<CareerTip | null>(INITIAL_TIPS[0] || null);

  return (
    <div className="space-y-10 max-w-5xl mx-auto animate-in fade-in duration-300">
      
      {/* Tab Header visuals - modern premium centered look */}
      <div className="space-y-3.5 max-w-3xl">
        <div className="flex items-center gap-2 text-[#c13a29]">
          <span className="p-1.5 bg-[#c13a29]/10 rounded-lg">
            <BookOpen className="w-5 h-5" />
          </span>
          <h2 className="text-xs font-black uppercase tracking-widest text-[#c13a29]">Tips Karir & Informasi Inklusif</h2>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Pusat Pengetahuan Sukses Kerja & Teknologi Asistif
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
          Artikel terkurasi buatan tim ahli rekrutasi inklusif untuk membekali Anda dengan pengetahuan hukum ketenagakerjaan, trik wawancara khusus, dan kecerdasan asistif.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8">
        
        {/* Render catalog items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Daftar Artikel</span>
            <span className="text-xs font-bold text-slate-400 font-mono">{tips.length} Panduan</span>
          </div>
          
          {tips.map((tip) => {
            const isSelected = selectedTip?.id === tip.id;
            return (
              <div 
                key={tip.id}
                onClick={() => setSelectedTip(tip)}
                className={`p-5.5 h-auto cursor-pointer rounded-2xl border text-left transition-all duration-250 flex flex-col justify-between gap-4 scale-val hover:scale-[1.01] ${
                  isSelected 
                    ? 'border-[#c13a29] bg-gradient-to-br from-white to-red-50/20 shadow-md shadow-red-500/5 ring-1 ring-[#c13a29]/40' 
                    : 'border-slate-150 bg-white/70 hover:border-slate-300 hover:bg-white shadow-[0_2px_12px_-5px_rgba(0,0,0,0.01)]'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="inline-block bg-[#c13a29]/10 text-[#c13a29] font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full">
                      {tip.category}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 font-mono flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {tip.readTime}
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold text-slate-900 transition-colors line-clamp-2 leading-snug">
                    {tip.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold line-clamp-2 leading-relaxed">
                    {tip.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold text-[#c13a29] pt-1 border-t border-slate-100/50">
                  <span className="text-slate-400 font-medium font-mono text-[10px]">Oleh: {tip.author.split('(')[0]}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wide group">
                    <span>Baca Artikel</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected read detail pane */}
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-[2rem] p-6 sm:p-8 space-y-5 shadow-sm h-fit sticky top-28 self-start">
          {selectedTip ? (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              <div className="relative h-48 rounded-2xl bg-slate-50 overflow-hidden border border-slate-150">
                <img 
                  src={selectedTip.imageUrl} 
                  alt={selectedTip.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#c13a29] text-white font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    {selectedTip.category}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                  {selectedTip.title}
                </h3>
                
                <div className="flex flex-wrap gap-2.5 text-[10px] text-slate-400 font-bold font-mono">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600">
                    <User2 className="w-3.5 h-3.5" />
                    <span>{selectedTip.author}</span>
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-600 leading-relaxed font-semibold bg-slate-50 p-4 rounded-xl border border-slate-100/80 italic">
                "{selectedTip.summary}"
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-normal whitespace-pre-wrap">
                {selectedTip.content}
              </p>

              <div className="bg-[#c13a29]/5 border border-[#c13a29]/10 p-3.5 rounded-xl flex gap-3 text-[#c13a29] text-[10px] leading-relaxed">
                <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="font-semibold">
                  <strong className="font-black uppercase tracking-wider block mb-0.5">Tip Sukses:</strong> Bagikan / diskusikan materi artikel ini dengan mentor kerja mandiri Anda untuk menyusun strategi simulasi rekrutmen.
                </span>
              </div>

            </div>
          ) : (
            <div className="py-28 text-center space-y-4">
              <span className="text-5xl block animate-bounce">📖</span>
              <h4 className="text-sm font-black text-slate-700">Pilihlah salah satu panduan membaca</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed font-medium">
                Ketuk di antara daftar artikel di sebelah kiri layar Anda untuk membuka lembar informasi selengkapnya secara detail.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
