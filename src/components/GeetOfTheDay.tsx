import React, { useState } from 'react';
import { Play, Pause, Bookmark, Share2, Copy, Check, Sparkles, BookOpen, Volume2, Music } from 'lucide-react';
import { KudmaliGeet, KudmaliScriptType } from '../types';
import { speakPoetry, stopRecitation, isSpeaking } from '../utils/recitation';

interface GeetOfTheDayProps {
  geet: KudmaliGeet;
  activeScript: KudmaliScriptType;
  onSelectWord: (word: string) => void;
  onBookmark: (geetId: string) => void;
  isBookmarked: boolean;
  onCopyNotice: (msg: string) => void;
  glassClass: string;
}

export const GeetOfTheDay: React.FC<GeetOfTheDayProps> = ({
  geet,
  activeScript,
  onSelectWord,
  onBookmark,
  isBookmarked,
  onCopyNotice,
  glassClass
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const title = geet.title[activeScript] || geet.title.devanagari;
  const poet = geet.poet[activeScript] || geet.poet.devanagari;
  const verse = geet.verses[0];
  const lines = verse ? verse[activeScript] || verse.devanagari : ['', ''];

  const handleRecite = () => {
    if (isPlaying) {
      stopRecitation();
      setIsPlaying(false);
    } else {
      const text = `${lines[0]} ... ${lines[1]}`;
      const lang = activeScript === 'bengali' ? 'bn-IN' : 'hi-IN';
      const success = speakPoetry(text, lang, () => setIsPlaying(false), () => setIsPlaying(false));
      if (success) setIsPlaying(true);
    }
  };

  const handleCopy = () => {
    const text = `"${lines[0]}\n${lines[1]}"\n— ${poet}\n(${geet.category} • Aalomoni Kudmali Digital Archive)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    onCopyNotice('पंक्तियाँ कॉपी कर ली गईं!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const shareText = `"${lines[0]}\n${lines[1]}"\n— ${poet}\n(Aalomoni Kudmali Archive: ${geet.category})`;
    if (navigator.share) {
      navigator.share({
        title: 'Kudmali Geet-e-Khaas | Aalomoni',
        text: shareText,
        url: window.location.href
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className={`${glassClass} p-8 md:p-12 relative overflow-hidden text-center`}>
      {/* Decorative ambient background glows */}
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-stone-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/90 border border-amber-200/80 text-amber-900 text-xs font-sans font-semibold uppercase tracking-widest mb-6">
        <Sparkles size={14} className="text-amber-700" />
        <span>आज का विशेष गीत (Geet-e-Khaas) • {geet.category}</span>
      </div>

      {/* Main Couplet Lines */}
      <div className="max-w-3xl mx-auto space-y-4 my-4">
        <p className="text-2xl md:text-4xl font-serif font-light text-stone-900 leading-relaxed tracking-wide">
          {lines[0]}
        </p>
        <p className="text-2xl md:text-4xl font-serif font-light text-stone-800 leading-relaxed tracking-wide">
          {lines[1]}
        </p>
      </div>

      {/* Poet & Composition attribution */}
      <div className="mt-6 flex flex-col items-center justify-center gap-1 font-sans">
        <div className="flex items-center gap-2 text-stone-700 font-serif text-lg font-semibold">
          <span>— {poet}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <span>सुर: {geet.taalOrSur}</span>
          <span>•</span>
          <span>क्षेत्र: {geet.region}</span>
        </div>
      </div>

      {/* English/Hindi meaning translation */}
      {verse?.meaning && (
        <p className="mt-4 text-stone-500 font-sans italic text-sm max-w-xl mx-auto border-t border-stone-200/60 pt-3">
          "{verse.meaning}"
        </p>
      )}

      {/* Interactive word chips for Kudmali lexicon */}
      {geet.highlightWords && Object.keys(geet.highlightWords).length > 0 && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 font-sans text-xs">
          <span className="text-stone-400 uppercase tracking-wider text-[11px]">शब्दावली अर्थ:</span>
          {Object.entries(geet.highlightWords).map(([key, data]) => (
            <button
              key={key}
              onClick={() => onSelectWord(key)}
              className="px-3 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200/60 text-amber-900 font-medium transition cursor-pointer flex items-center gap-1"
            >
              <span>{data.devanagari} ({data.word})</span>
              <span className="text-[10px] text-amber-700 underline">अर्थ</span>
            </button>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 flex items-center justify-center gap-3 font-sans text-xs">
        <button
          onClick={handleRecite}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition shadow-xs ${
            isPlaying
              ? 'bg-amber-800 text-white'
              : 'bg-stone-900 text-white hover:bg-stone-800'
          }`}
        >
          {isPlaying ? <Pause size={15} /> : <Volume2 size={15} />}
          <span>{isPlaying ? 'गायन रोकें' : 'गायन पाठ सुनें'}</span>
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 transition"
        >
          {copied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
          <span>{copied ? 'कॉपी हो गया' : 'कॉपी करें'}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 transition"
        >
          <Share2 size={15} />
          <span>साझा करें</span>
        </button>

        <button
          onClick={() => onBookmark(geet.id)}
          className={`p-2.5 rounded-xl border transition ${
            isBookmarked
              ? 'bg-amber-100 text-amber-900 border-amber-300'
              : 'bg-white border-stone-200 text-stone-600 hover:text-amber-800'
          }`}
          title={isBookmarked ? 'सहेजा गया' : 'सहेजें'}
        >
          <Bookmark size={16} className={isBookmarked ? 'fill-amber-800' : ''} />
        </button>
      </div>
    </div>
  );
};
