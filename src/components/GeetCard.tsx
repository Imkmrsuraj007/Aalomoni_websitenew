import React, { useState } from 'react';
import { Play, Pause, Bookmark, Share2, Copy, Check, ChevronRight, Sparkles, Music } from 'lucide-react';
import { KudmaliGeet, KudmaliScriptType } from '../types';
import { speakPoetry, stopRecitation, isSpeaking } from '../utils/recitation';

interface GeetCardProps {
  geet: KudmaliGeet;
  activeScript: KudmaliScriptType;
  onOpenGeet: (geet: KudmaliGeet) => void;
  onBookmark: (geetId: string) => void;
  isBookmarked: boolean;
  onCopyNotice: (msg: string) => void;
  glassClass: string;
}

export const GeetCard: React.FC<GeetCardProps> = ({
  geet,
  activeScript,
  onOpenGeet,
  onBookmark,
  isBookmarked,
  onCopyNotice,
  glassClass
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const title = geet.title[activeScript] || geet.title.devanagari;
  const poet = geet.poet[activeScript] || geet.poet.devanagari;
  const firstVerse = geet.verses[0];
  const lines = firstVerse ? firstVerse[activeScript] || firstVerse.devanagari : ['', ''];

  const handlePlayRecitation = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stopRecitation();
      setIsPlaying(false);
    } else {
      const textToSpeak = `${lines[0]} ... ${lines[1]}`;
      const lang = activeScript === 'bengali' ? 'bn-IN' : 'hi-IN';
      const success = speakPoetry(textToSpeak, lang, () => setIsPlaying(false), () => setIsPlaying(false));
      if (success) setIsPlaying(true);
    }
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `"${lines[0]}\n${lines[1]}"\n— ${poet}\n(${geet.category} • Aalomoni Kudmali Archive)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    onCopyNotice('गीत की पंक्तियाँ कॉपी कर ली गईं!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmark(geet.id);
  };

  return (
    <div
      onClick={() => onOpenGeet(geet)}
      className={`${glassClass} p-6 md:p-8 flex flex-col justify-between group hover:border-amber-300/80 transition-all duration-300 hover:shadow-2xl cursor-pointer relative overflow-hidden`}
    >
      {/* Subtle decorative warm accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl -z-10 group-hover:bg-amber-500/10 transition-colors" />

      <div>
        {/* Category & Taal Header */}
        <div className="flex items-center justify-between gap-2 mb-4 font-sans text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold uppercase tracking-wider text-[10px]">
              {geet.category}
            </span>
            <span className="text-stone-400">•</span>
            <span className="text-stone-500 italic text-[11px]">
              {geet.taalOrSur}
            </span>
          </div>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handlePlayRecitation}
              className={`p-1.5 rounded-lg border transition ${
                isPlaying 
                  ? 'bg-amber-800 text-white border-amber-800' 
                  : 'bg-white/80 text-stone-600 border-stone-200 hover:text-amber-900 hover:border-amber-300'
              }`}
              title={isPlaying ? 'रोकें (Pause)' : 'गायन सुनें (Listen)'}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            </button>

            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg border border-stone-200 bg-white/80 text-stone-600 hover:text-stone-900 hover:border-stone-300 transition"
              title="पंक्तियाँ कॉपी करें"
            >
              {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
            </button>

            <button
              onClick={handleBookmarkClick}
              className={`p-1.5 rounded-lg border transition ${
                isBookmarked 
                  ? 'bg-amber-100 text-amber-900 border-amber-300' 
                  : 'border-stone-200 bg-white/80 text-stone-400 hover:text-amber-800'
              }`}
              title={isBookmarked ? 'सहेजा गया' : 'सहेजें'}
            >
              <Bookmark size={13} className={isBookmarked ? 'fill-amber-800 text-amber-800' : ''} />
            </button>
          </div>
        </div>

        {/* Geet Title */}
        <h3 className="text-xl md:text-2xl font-serif text-stone-900 font-bold mb-1 tracking-tight group-hover:text-amber-950 transition-colors">
          {title}
        </h3>

        {/* Region & Poet */}
        <p className="text-xs font-sans text-stone-500 mb-6 flex items-center gap-1.5">
          <span>रचयिता:</span>
          <span className="font-semibold text-stone-700">{poet}</span>
          <span className="text-stone-300">|</span>
          <span className="text-stone-400">{geet.region}</span>
        </p>

        {/* Verses Preview */}
        <div className="space-y-3 py-2 border-y border-stone-200/60 my-4 bg-white/30 rounded-xl p-4">
          <p className="text-lg md:text-xl font-serif text-stone-900 leading-relaxed tracking-wide">
            {lines[0]}
          </p>
          <p className="text-lg md:text-xl font-serif text-stone-800 leading-relaxed tracking-wide">
            {lines[1]}
          </p>
        </div>

        {/* Meaning Preview if available */}
        {firstVerse?.meaning && (
          <p className="text-xs font-sans italic text-stone-500 mt-2 line-clamp-2">
            भावार्थ: {firstVerse.meaning}
          </p>
        )}
      </div>

      {/* Footer Details */}
      <div className="pt-4 mt-3 flex items-center justify-between font-sans text-xs border-t border-stone-200/40">
        <div className="flex flex-wrap gap-1.5">
          {geet.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-stone-100 text-stone-600">
              #{tag}
            </span>
          ))}
        </div>

        <span className="text-amber-800 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          <span>सम्पूर्ण गीत</span>
          <ChevronRight size={14} />
        </span>
      </div>
    </div>
  );
};
