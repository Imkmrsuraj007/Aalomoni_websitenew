import React, { useState } from 'react';
import { Calendar, Sun, Moon, Music, Check, Sparkles, BookOpen, Quote, ChevronRight } from 'lucide-react';
import { FESTIVALS_DATA } from '../data/festivalsData';
import { FestivalItem } from '../types';

interface FestivalsViewProps {
  onSelectGeetName?: (songName: string) => void;
  glassClass: string;
}

export const FestivalsView: React.FC<FestivalsViewProps> = ({ onSelectGeetName, glassClass }) => {
  const [activeFestival, setActiveFestival] = useState<FestivalItem>(FESTIVALS_DATA[0]);

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-sans text-xs font-semibold uppercase tracking-wider">
          <Calendar size={13} className="text-amber-800" />
          <span>Seasonal Agrarian Calendar</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-light text-stone-900 tracking-tight">
          Kudmali Festivals & Parabs
        </h1>
        <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
          From the sisterly vigil of Karam to the floating shrines of Tusu and the cattle gratitude of Sohrai — celebrate nature's eternal cycles.
        </p>
      </div>

      {/* Festival Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#EBE3D5] pb-4 font-sans text-xs sm:text-sm">
        {FESTIVALS_DATA.map((fest) => (
          <button
            key={fest.id}
            onClick={() => setActiveFestival(fest)}
            className={`px-4 sm:px-5 py-2.5 rounded-2xl transition cursor-pointer font-semibold flex items-center gap-2 ${
              activeFestival.id === fest.id
                ? 'bg-amber-900 text-white shadow-md'
                : 'bg-white/80 text-stone-600 hover:bg-white border border-[#DDD3C2]'
            }`}
          >
            <span>{fest.name}</span>
            <span className="text-[11px] opacity-75 font-serif hidden md:inline">
              ({fest.kudmaliName.split(' ')[0]})
            </span>
          </button>
        ))}
      </div>

      {/* Active Festival Spotlight Showcase */}
      <div className="bg-[#FAF7F2] border border-[#E5DAC6] rounded-3xl overflow-hidden shadow-sm grid lg:grid-cols-12 gap-0">
        
        {/* Left Column: Image & Quick Stats */}
        <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full">
          <img
            src={activeFestival.image}
            alt={activeFestival.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
            <span className="px-2.5 py-1 rounded-full bg-amber-600/90 text-white font-sans text-[11px] font-bold uppercase tracking-wider w-max mb-2">
              {activeFestival.season}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
              {activeFestival.name}
            </h2>
            <p className="text-amber-200 font-serif italic text-sm mt-1">
              {activeFestival.kudmaliName}
            </p>
            <div className="flex items-center gap-2 font-sans text-xs text-stone-300 mt-3 pt-3 border-t border-white/20">
              <Calendar size={13} />
              <span>{activeFestival.month}</span>
            </div>
          </div>
        </div>

        {/* Right Column: In-depth Culture, Practices, Songs */}
        <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 text-stone-800">
          
          {/* Significance Lead */}
          <div className="space-y-2">
            <span className="font-sans text-[11px] uppercase tracking-widest font-bold text-amber-800 block">
              Spiritual & Agrarian Significance
            </span>
            <p className="font-serif italic text-base sm:text-lg text-stone-900 leading-relaxed">
              "{activeFestival.significance}"
            </p>
          </div>

          {/* History / Background */}
          <div className="space-y-2 font-sans text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/80 pt-4">
            <span className="font-bold text-xs uppercase tracking-wider text-stone-800 block">
              Origin & Folk Legend
            </span>
            <p>{activeFestival.history}</p>
          </div>

          {/* Traditional Practices Checklist */}
          <div className="space-y-3 border-t border-stone-200/80 pt-4">
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-stone-800 block">
              Core Customs & Ritual Practices
            </span>
            <div className="space-y-2 font-sans text-xs sm:text-sm text-stone-700">
              {activeFestival.traditionalPractices.map((practice, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2 rounded-xl bg-white border border-[#EBE1CF]">
                  <Check size={15} className="text-amber-800 shrink-0 mt-0.5" />
                  <span className="leading-snug">{practice}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Associated Songs */}
          <div className="space-y-3 border-t border-stone-200/80 pt-4">
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-amber-900 block flex items-center gap-1.5">
              <Music size={14} />
              <span>संबद्ध लोक-गीत (Associated Folk Songs)</span>
            </span>
            <div className="grid sm:grid-cols-2 gap-3 font-sans text-xs">
              {activeFestival.associatedSongs.map((song, i) => (
                <div key={i} className="p-3 bg-[#F4EDE0] rounded-xl border border-[#E6DBC6] space-y-1">
                  <h4 className="font-serif font-bold text-sm text-stone-900">
                    {song.title}
                  </h4>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    {song.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Cultural Wisdom Quote Box */}
          <div className="p-4 rounded-2xl bg-[#EFE7D8] border border-[#DDD0BC] font-sans text-xs text-amber-950 flex items-start gap-2.5">
            <Quote size={20} className="text-amber-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase tracking-wider text-[10px] text-amber-900 block">
                Ancestral Philosophy
              </span>
              <p className="font-serif italic text-sm mt-0.5 text-stone-800">
                {activeFestival.culturalWisdom}
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
