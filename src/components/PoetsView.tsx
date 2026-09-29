import React from 'react';
import { KudmaliIcon, KudmaliScriptType } from '../types';
import { Feather, MapPin, Calendar, ArrowRight, Music, Sparkles } from 'lucide-react';

interface PoetsViewProps {
  icons: KudmaliIcon[];
  activeScript: KudmaliScriptType;
  onSelectIcon: (iconId: string) => void;
  glassClass: string;
}

export const PoetsView: React.FC<PoetsViewProps> = ({
  icons,
  activeScript,
  onSelectIcon,
  glassClass
}) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* Header */}
      <header className="text-center mb-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-sans font-semibold uppercase tracking-widest mb-4">
          <Feather size={14} className="text-amber-800" />
          <span>कुड़मालि लोक-कवि व विभूतियाँ</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-light text-stone-900 mb-3 font-serif">
          Icons of Kudmali Culture
        </h1>
        <p className="text-stone-500 font-sans text-sm md:text-base leading-relaxed">
          The legendary poets, lyricists, and artists whose compositions gave voice to the sorrow, joy, agriculture, and pastoral love of the Kudmi and Chotanagpur community.
        </p>
      </header>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        {icons.map((icon) => {
          const name = icon.name[activeScript] || icon.name.devanagari;
          const line = icon.famousGeetLine[activeScript] || icon.famousGeetLine.devanagari;

          return (
            <div
              key={icon.id}
              onClick={() => onSelectIcon(icon.id)}
              className={`${glassClass} p-7 md:p-8 flex flex-col justify-between hover:border-amber-300 hover:shadow-2xl transition-all duration-300 group cursor-pointer relative overflow-hidden`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                      {icon.title}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-stone-900 group-hover:text-amber-950 transition-colors">
                      {name}
                    </h3>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-amber-100/60 border border-amber-200/80 flex items-center justify-center text-amber-900 font-serif font-bold text-lg shrink-0">
                    {name.charAt(0)}
                  </div>
                </div>

                {/* Era & Region */}
                <div className="flex flex-wrap gap-4 text-xs font-sans text-stone-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-stone-400" />
                    <span>{icon.era}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-stone-400" />
                    <span>{icon.region}</span>
                  </span>
                </div>

                {/* Bio */}
                <p className="text-stone-600 font-sans text-xs md:text-sm leading-relaxed line-clamp-3">
                  {icon.bio}
                </p>

                {/* Famous Couplet Card */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 font-serif space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-sans font-bold text-amber-800 flex items-center gap-1">
                    <Music size={12} /> अमर गीत पंक्ति
                  </span>
                  <p className="text-base text-stone-900 italic leading-relaxed">
                    "{line}"
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 mt-4 border-t border-stone-200/60 flex items-center justify-between text-xs font-sans">
                <span className="text-stone-500 text-[11px] line-clamp-1 max-w-[240px]">
                  {icon.contribution}
                </span>
                <span className="text-amber-800 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                  <span>रचनाएं देखें</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
