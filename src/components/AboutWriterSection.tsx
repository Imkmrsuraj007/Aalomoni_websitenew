import React from 'react';
import { PenTool, Heart, Feather, BookOpen, Quote, Sparkles } from 'lucide-react';

interface AboutWriterSectionProps {
  onReadWritings: () => void;
  onOpenBirthdaySurprise: () => void;
}

export const AboutWriterSection: React.FC<AboutWriterSectionProps> = ({
  onReadWritings,
  onOpenBirthdaySurprise
}) => {
  return (
    <section className="py-16 md:py-24 border-b border-[#EBE3D5] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-sans text-xs font-semibold uppercase tracking-wider">
            <Feather size={13} className="text-amber-800" />
            <span>Voice of the Soil</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#2D1E16] tracking-tight">
            About the Writer
          </h2>
          <p className="font-handwritten text-xl text-amber-800">
            Dedicated with admiration to Aarti Mahato
          </p>
        </div>

        {/* Content Bento Card */}
        <div className="bg-[#FAF7F2] border border-[#E4DAC7] rounded-3xl p-6 sm:p-10 shadow-sm grid md:grid-cols-12 gap-8 items-center">
          
          {/* Portrait Column */}
          <div className="md:col-span-5 flex flex-col items-center text-center space-y-4">
            <div className="relative">
              {/* Outer decorative terracotta ring */}
              <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-full p-2 bg-linear-to-tr from-amber-700 via-rose-600 to-amber-500 shadow-xl">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#FAF7F2] bg-stone-200">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
                    alt="Aarti Mahato - Writer and Cultural Guardian"
                    className="w-full h-full object-cover object-center filter saturate-[0.95]"
                  />
                </div>
              </div>
              <div className="absolute -bottom-2 inset-x-0 mx-auto w-max px-3 py-1 rounded-full bg-[#3E2723] text-amber-100 text-xs font-sans font-bold shadow-md">
                Aarti Mahato
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif font-bold text-xl text-stone-900">
                Aarti Mahato
              </h3>
              <p className="text-xs font-sans text-stone-500 uppercase tracking-wider font-semibold">
                Kudmali Poetess, Storyteller & Archivist
              </p>
            </div>

            <button
              onClick={onOpenBirthdaySurprise}
              className="inline-flex items-center gap-1.5 text-xs font-sans text-amber-900 bg-amber-100/80 hover:bg-amber-200/80 px-3 py-1.5 rounded-full transition font-semibold cursor-pointer"
            >
              <Sparkles size={13} className="text-rose-600" />
              <span>Celebrate Aarti's Birthday 🎂</span>
            </button>
          </div>

          {/* Narrative Column */}
          <div className="md:col-span-7 space-y-5 text-stone-700 font-sans text-sm sm:text-base leading-relaxed">
            
            {/* Handwritten Quote */}
            <div className="p-4 rounded-2xl bg-[#F2EBDE] border border-[#E0D4BE] relative">
              <Quote className="absolute top-2 right-2 text-stone-300 w-8 h-8 pointer-events-none" />
              <p className="font-handwritten text-lg sm:text-xl text-[#3E2723] leading-snug">
                "Our mother tongue Kudmali is not merely a collection of words; it is the fragrance of the damp monsoon earth, the rhythm of the village mandar, and the sacred breath of our ancestors."
              </p>
              <span className="block text-right font-sans text-xs text-amber-900 font-bold mt-1">
                — Aarti Mahato
              </span>
            </div>

            {/* Biography Paragraphs */}
            <div className="space-y-3 font-normal text-stone-600">
              <p>
                Rooted in the red earth of Chotanagpur, <strong>Aarti Mahato</strong> carries a deep and gentle reverence for the folk literature, songs, and traditions of the Kudmi people. Growing up listening to her grandmother weave Tusu verses and the cadence of the village Akhra on autumn nights, her heart found its creative calling in the Kudmali tongue.
              </p>
              <p>
                Her poems and stories celebrate the unhurried life of the countryside — the majesty of the Sal forest canopy, the quiet endurance of agrarian women, and the joyful fellowship of Karam and Sohrai celebrations.
              </p>
              <p>
                In a rapidly changing world, Aarti's writings bridge generational divides, rendering oral folklore into trilingual expressions (Devanagari, Roman, and Bengali) so that youth everywhere can take pride in their cultural heritage.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onReadWritings}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-sans text-xs sm:text-sm font-semibold transition shadow-xs cursor-pointer"
              >
                <BookOpen size={15} />
                <span>Read Aarti's Writings & Stories</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
