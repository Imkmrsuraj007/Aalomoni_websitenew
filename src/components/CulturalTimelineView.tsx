import React from 'react';
import { Clock, Scroll, Sparkles, BookOpen, Music, CheckCircle } from 'lucide-react';
import { TIMELINE_DATA } from '../data/timelineData';

interface CulturalTimelineViewProps {
  glassClass: string;
}

export const CulturalTimelineView: React.FC<CulturalTimelineViewProps> = ({ glassClass }) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-sans text-xs font-semibold uppercase tracking-wider">
          <Clock size={13} className="text-amber-800" />
          <span>Epochs of Resilience</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-light text-stone-900 tracking-tight">
          Kudmali Cultural Journey
        </h1>
        <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
          Tracing five monumental chapters of the Kudmi identity — from the ancient sacred grove covenant to the classical Jhumur renaissance and today’s digital archival resurgence.
        </p>
      </div>

      {/* Timeline Stream */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Central Vertical Line */}
        <div className="absolute left-8 sm:left-1/2 top-4 bottom-4 w-0.5 bg-[#DFD4C1] -translate-x-1/2" />

        <div className="space-y-12">
          {TIMELINE_DATA.map((milestone, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={milestone.id}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-6 sm:gap-12`}
              >
                {/* Center Indicator Pin */}
                <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 top-6 w-7 h-7 rounded-full bg-[#FAF7F2] border-4 border-amber-900 shadow-sm flex items-center justify-center z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                </div>

                {/* Content Box */}
                <div className="ml-14 sm:ml-0 sm:w-1/2">
                  <div className="bg-[#FAF7F2] border border-[#E5DAC6] rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow space-y-3">
                    
                    {/* Period badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-950 font-sans font-bold text-xs uppercase tracking-wider">
                        {milestone.period}
                      </span>
                      <span className="text-[11px] font-sans text-stone-400 font-semibold">
                        {milestone.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 leading-snug">
                      {milestone.title}
                    </h3>
                    <p className="font-serif italic text-xs sm:text-sm text-amber-900">
                      {milestone.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-stone-600 font-sans text-xs sm:text-sm leading-relaxed">
                      {milestone.description}
                    </p>

                    {/* Cultural Note */}
                    <div className="p-3 rounded-xl bg-[#F2EADB] border border-[#E0D3BD] font-sans text-xs text-stone-700">
                      <span className="font-bold text-amber-950 block text-[10px] uppercase tracking-wider mb-0.5">
                        Cultural Footprint:
                      </span>
                      <span>{milestone.culturalNote}</span>
                    </div>

                  </div>
                </div>

                {/* Spacer for Alternate column */}
                <div className="hidden sm:block sm:w-1/2" />
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
