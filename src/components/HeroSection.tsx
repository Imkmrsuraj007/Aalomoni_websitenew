import React, { useState } from 'react';
import { BookOpen, Sparkles, Compass, ChevronDown, Leaf, Volume2, VolumeX, Copy, Check } from 'lucide-react';
import { KudmaliScriptType } from '../types';
import { speakPoetry, stopRecitation } from '../utils/recitation';

interface HeroSectionProps {
  onExploreWritings: () => void;
  onDiscoverCulture: () => void;
  onOpenBirthdaySurprise: () => void;
  onSelectWord?: (wordKey: string) => void;
  activeScript: KudmaliScriptType;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWritings,
  onDiscoverCulture,
  onOpenBirthdaySurprise,
  onSelectWord,
  activeScript
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  // Couplet lines in active script
  const couplet = {
    devanagari: [
      'आलोमोनि तोर नावे मांदर बाजे आखड़ा माँझे रे,',
      'भादर मासे मेघ गाजे, मनेर हुलास जागे रे।'
    ],
    roman: [
      'Aalomoni tor naame mandar baaje akhra maanjhe re,',
      'Bhadar maase megh gaaje, moner hulaas jaage re.'
    ],
    bengali: [
      'আলোমনি তোর নামে মান্দার বাজে আখড়া মাঝে রে,',
      'ভাদর মাসে মেঘ গাজে, মনের হুলাস জাগে রে।'
    ]
  };

  const lines = couplet[activeScript] || couplet.devanagari;

  // Exactly 6 word vocabulary chips as earlier
  const vocabularyWords = [
    {
      word: activeScript === 'roman' ? 'Aalomoni' : activeScript === 'bengali' ? 'আলোমনি' : 'आलोमोनि',
      key: 'aalomoni',
      meaning: activeScript === 'roman' ? 'Radiant Jewel / Light' : 'प्रकाशमयी मणि'
    },
    {
      word: activeScript === 'roman' ? 'Naame' : activeScript === 'bengali' ? 'নামে' : 'नावे',
      key: 'naave',
      meaning: activeScript === 'roman' ? 'In honor of' : 'नाम पर / सम्मान में'
    },
    {
      word: activeScript === 'roman' ? 'Mandar' : activeScript === 'bengali' ? 'মান্দার' : 'मांदर',
      key: 'mandar',
      meaning: activeScript === 'roman' ? 'Kudmali folk drum' : 'कुड़मी लोक-बाजा'
    },
    {
      word: activeScript === 'roman' ? 'Akhra' : activeScript === 'bengali' ? 'আখড়া' : 'आखड़ा',
      key: 'akhra',
      meaning: activeScript === 'roman' ? 'Village dancing ground' : 'नाच-गान ठांय'
    },
    {
      word: activeScript === 'roman' ? 'Bhadar' : activeScript === 'bengali' ? 'ভাদর' : 'भादर',
      key: 'bhadar',
      meaning: activeScript === 'roman' ? 'Bhado monsoon month' : 'करमक पावन मास'
    },
    {
      word: activeScript === 'roman' ? 'Hulaas' : activeScript === 'bengali' ? 'হুলাস' : 'हुलास',
      key: 'hulaas',
      meaning: activeScript === 'roman' ? 'Boundless inner joy' : 'अंतर्मन का उल्लास'
    }
  ];

  const handleRecite = () => {
    if (isPlaying) {
      stopRecitation();
      setIsPlaying(false);
    } else {
      const text = `${lines[0]} ... ${lines[1]}`;
      const lang = activeScript === 'bengali' ? 'bn-IN' : 'hi-IN';
      const success = speakPoetry(
        text,
        lang,
        () => setIsPlaying(false),
        () => setIsPlaying(false)
      );
      if (success) setIsPlaying(true);
    }
  };

  const handleCopy = () => {
    const text = `"${lines[0]}\n${lines[1]}"\n— बिनु महतो (भादुरिया झुमुर • मानभूम) | Aalomoni Kudmali Archive`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-20 border-b border-[#EBE3D5]">
      {/* Decorative Traditional Border & Background Glow */}
      <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-amber-700 via-amber-500 to-rose-700 opacity-80" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[28rem] bg-amber-100/40 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
        
        {/* Subtle Cultural Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4EFE6] border border-[#DDD3C2] text-amber-950 font-sans text-xs font-semibold uppercase tracking-widest shadow-xs">
          <Leaf size={13} className="text-amber-800" />
          <span>The Radiant Cultural Home of Kudmali Soil</span>
          <span className="text-stone-300">•</span>
          <span className="font-serif italic font-normal text-stone-600">Aarti's Sanctuary</span>
        </div>

        {/* Primary Title & Signature Couplet */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-light text-[#2D1E16] tracking-tight leading-[1.08]">
            Aalomoni
          </h1>

          {/* Requested Signature Couplet Lines */}
          <div className="max-w-3xl mx-auto space-y-2 py-1">
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-stone-900 leading-relaxed tracking-wide">
              {lines[0]}
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-amber-950 leading-relaxed tracking-wide">
              {lines[1]}
            </p>
          </div>
        </div>

        {/* 6 Word Vocabulary Chips Only (as earlier) */}
        <div className="max-w-3xl mx-auto pt-1">
          <div className="flex flex-wrap items-center justify-center gap-2 font-sans text-xs">
            <span className="text-stone-400 uppercase tracking-wider text-[11px] font-semibold">
              शब्दावली अर्थ:
            </span>
            {vocabularyWords.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onSelectWord && onSelectWord(item.key)}
                className="px-3 py-1 rounded-xl bg-white/90 hover:bg-white border border-[#E2D5C0] hover:border-amber-400 text-stone-800 font-medium transition cursor-pointer flex items-center gap-1 shadow-2xs group"
              >
                <strong className="text-amber-950 group-hover:text-amber-800">{item.word}</strong>:
                <span className="text-stone-600">{item.meaning}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Subtle Recitation & Copy Controls */}
        <div className="flex items-center justify-center gap-2.5 font-sans text-xs pt-1">
          <button
            onClick={handleRecite}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-100/90 hover:bg-amber-200/90 text-amber-950 font-semibold transition cursor-pointer shadow-2xs"
          >
            {isPlaying ? <VolumeX size={13} className="text-rose-700" /> : <Volume2 size={13} className="text-amber-800" />}
            <span>{isPlaying ? 'गायन रोकें' : 'गायन पाठ सुनें'}</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 border border-[#DCD2C0] text-stone-700 font-medium transition cursor-pointer shadow-2xs"
          >
            {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
            <span>{copied ? 'कॉपी हो गया' : 'पंक्तियाँ कॉपी करें'}</span>
          </button>
        </div>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-2xl mx-auto leading-relaxed font-normal pt-1">
          A digital space for Kudmali songs, stories, traditions, and memories. Preserving the living resonance of the Akhra, the rustle of the sacred Sal canopy, and the timeless bards of Chotanagpur.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 font-sans text-sm">
          <button
            onClick={onExploreWritings}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#3E2723] hover:bg-[#2D1E16] text-[#FAF7F2] font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 transform cursor-pointer"
          >
            <BookOpen size={17} className="text-amber-300" />
            <span>Explore Writings</span>
          </button>

          <button
            onClick={onDiscoverCulture}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#FAF7F2] hover:bg-white text-stone-800 border border-[#DCD2C0] hover:border-amber-700/50 font-semibold transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 transform cursor-pointer"
          >
            <Compass size={17} className="text-amber-800" />
            <span>Discover Kudmali Culture</span>
          </button>
        </div>

        {/* Subtle Birthday Gift Touch */}
        <div className="pt-3 flex items-center justify-center">
          <button
            onClick={onOpenBirthdaySurprise}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50/90 hover:bg-amber-100/90 border border-amber-200/90 text-amber-950 font-sans text-xs font-semibold transition shadow-xs hover:shadow-sm cursor-pointer"
          >
            <Sparkles size={14} className="text-rose-600 group-hover:rotate-12 transition-transform" />
            <span>A Special Birthday Gift for Aarti Mahato</span>
            <span className="text-rose-700 font-serif italic">🎁 View Dedication</span>
          </button>
        </div>

        {/* Scroll cue */}
        <div className="pt-4 flex flex-col items-center justify-center text-stone-400 gap-1">
          <span className="text-[11px] font-sans uppercase tracking-widest">Scroll to wander</span>
          <ChevronDown size={15} className="animate-bounce text-stone-400" />
        </div>

      </div>
    </section>
  );
};
