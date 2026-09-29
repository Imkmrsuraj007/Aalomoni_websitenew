import React, { useState } from 'react';
import { X, Play, Pause, Bookmark, Share2, Copy, Check, Type, Sparkles, BookOpen, Volume2, Globe } from 'lucide-react';
import { KudmaliGeet, KudmaliScriptType } from '../types';
import { speakPoetry, stopRecitation } from '../utils/recitation';

interface GeetDetailModalProps {
  geet: KudmaliGeet | null;
  onClose: () => void;
  activeScript: KudmaliScriptType;
  onScriptChange: (script: KudmaliScriptType) => void;
  onSelectWord: (word: string) => void;
  onBookmark: (geetId: string) => void;
  isBookmarked: boolean;
  onCopyNotice: (msg: string) => void;
}

export const GeetDetailModal: React.FC<GeetDetailModalProps> = ({
  geet,
  onClose,
  activeScript,
  onScriptChange,
  onSelectWord,
  onBookmark,
  isBookmarked,
  onCopyNotice
}) => {
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [playingVerseIndex, setPlayingVerseIndex] = useState<number | null>(null);
  const [fontSizeClass, setFontSizeClass] = useState<'text-lg' | 'text-xl' | 'text-2xl'>('text-xl');
  const [copied, setCopied] = useState(false);

  if (!geet) return null;

  const title = geet.title[activeScript] || geet.title.devanagari;
  const poet = geet.poet[activeScript] || geet.poet.devanagari;

  const handlePlayFullGeet = () => {
    if (isPlayingAll) {
      stopRecitation();
      setIsPlayingAll(false);
      setPlayingVerseIndex(null);
    } else {
      const allText = geet.verses
        .map(v => {
          const l = v[activeScript] || v.devanagari;
          return `${l[0]} ... ${l[1]}`;
        })
        .join(' ... ');
      
      const lang = activeScript === 'bengali' ? 'bn-IN' : 'hi-IN';
      const success = speakPoetry(
        allText, 
        lang, 
        () => {
          setIsPlayingAll(false);
          setPlayingVerseIndex(null);
        }, 
        () => {
          setIsPlayingAll(false);
          setPlayingVerseIndex(null);
        }
      );
      if (success) setIsPlayingAll(true);
    }
  };

  const handleCopyFullGeet = () => {
    const versesText = geet.verses
      .map(v => {
        const l = v[activeScript] || v.devanagari;
        return `${l[0]}\n${l[1]}`;
      })
      .join('\n\n');
    
    const fullText = `${title}\n— ${poet}\n\n${versesText}\n\n(Aalomoni Kudmali Archive: ${geet.category})`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    onCopyNotice('सम्पूर्ण गीत कॉपी कर लिया गया!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-md">
      <div 
        className="bg-[#FCFAF6] border border-white/80 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Header */}
        <div className="px-6 py-4 border-b border-stone-200/80 bg-white/70 backdrop-blur-md flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-sans font-bold uppercase tracking-wider">
              {geet.category}
            </span>
            <span className="text-xs font-sans text-stone-500 hidden sm:inline-block">
              {geet.taalOrSur}
            </span>
          </div>

          {/* Tools: Script toggle, Font scale, Close */}
          <div className="flex items-center gap-2">
            {/* Script Selector */}
            <div className="bg-stone-100 p-0.5 rounded-xl border border-stone-200 text-xs font-sans flex">
              <button
                onClick={() => onScriptChange('devanagari')}
                className={`px-2 py-1 rounded-lg transition ${
                  activeScript === 'devanagari' ? 'bg-white shadow-xs font-bold text-amber-900' : 'text-stone-500'
                }`}
              >
                देव
              </button>
              <button
                onClick={() => onScriptChange('roman')}
                className={`px-2 py-1 rounded-lg transition ${
                  activeScript === 'roman' ? 'bg-white shadow-xs font-bold text-amber-900' : 'text-stone-500'
                }`}
              >
                Eng
              </button>
              <button
                onClick={() => onScriptChange('bengali')}
                className={`px-2 py-1 rounded-lg transition ${
                  activeScript === 'bengali' ? 'bg-white shadow-xs font-bold text-amber-900' : 'text-stone-500'
                }`}
              >
                বাংলা
              </button>
            </div>

            {/* Font size toggle */}
            <button
              onClick={() => {
                if (fontSizeClass === 'text-lg') setFontSizeClass('text-xl');
                else if (fontSizeClass === 'text-xl') setFontSizeClass('text-2xl');
                else setFontSizeClass('text-lg');
              }}
              className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-600 hover:text-stone-900"
              title="अक्षर का आकार बदलें"
            >
              <Type size={16} />
            </button>

            {/* Close */}
            <button
              onClick={() => {
                stopRecitation();
                onClose();
              }}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Song Body */}
        <div className="overflow-y-auto p-6 md:p-10 space-y-8">
          {/* Song Header */}
          <div className="text-center space-y-2 border-b border-stone-200/60 pb-6">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-bold tracking-tight">
              {title}
            </h2>
            <p className="text-stone-600 font-sans text-sm">
              रचयिता: <span className="font-semibold text-stone-900">{poet}</span> • {geet.region}
            </p>
          </div>

          {/* Verses Container */}
          <div className="space-y-8 max-w-2xl mx-auto">
            {geet.verses.map((v, idx) => {
              const lines = v[activeScript] || v.devanagari;
              return (
                <div 
                  key={v.id} 
                  className="text-center p-6 rounded-2xl bg-white/60 border border-stone-200/60 space-y-3 shadow-xs hover:border-amber-200 transition-colors"
                >
                  <p className={`${fontSizeClass} font-serif text-stone-900 leading-relaxed`}>
                    {lines[0]}
                  </p>
                  <p className={`${fontSizeClass} font-serif text-stone-800 leading-relaxed`}>
                    {lines[1]}
                  </p>

                  {v.meaning && (
                    <p className="text-xs font-sans italic text-stone-500 pt-2 border-t border-stone-100">
                      भावार्थ: {v.meaning}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Cultural Context */}
          {geet.culturalContext && (
            <div className="max-w-2xl mx-auto p-5 rounded-2xl bg-amber-50/80 border border-amber-200/60 font-sans text-xs text-amber-950 space-y-1">
              <span className="font-bold uppercase tracking-wider block text-[10px] text-amber-800">
                सांस्कृतिक पृष्ठभूमि (Cultural Context)
              </span>
              <p className="leading-relaxed">{geet.culturalContext}</p>
            </div>
          )}

          {/* Vocabulary Highlight Box */}
          {geet.highlightWords && Object.keys(geet.highlightWords).length > 0 && (
            <div className="max-w-2xl mx-auto p-5 rounded-2xl bg-stone-100/80 border border-stone-200 font-sans space-y-3">
              <span className="font-bold uppercase tracking-wider block text-[11px] text-stone-500">
                विशेष कुड़मालि शब्दावली
              </span>
              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                {Object.entries(geet.highlightWords).map(([k, wordData]) => (
                  <div key={k} className="p-3 bg-white rounded-xl border border-stone-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-amber-900">{wordData.devanagari} ({wordData.word})</span>
                      <button 
                        onClick={() => onSelectWord(k)}
                        className="text-[10px] text-amber-800 underline hover:text-amber-950"
                      >
                        विस्तार
                      </button>
                    </div>
                    <p className="text-stone-600">{wordData.hindiMeaning}</p>
                    <p className="text-[11px] text-stone-400 italic mt-0.5">{wordData.englishMeaning}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar Controls */}
        <div className="px-6 py-4 border-t border-stone-200/80 bg-white/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shrink-0 font-sans text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayFullGeet}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition ${
                isPlayingAll ? 'bg-amber-800 text-white' : 'bg-stone-900 text-white hover:bg-stone-800'
              }`}
            >
              {isPlayingAll ? <Pause size={14} /> : <Volume2 size={14} />}
              <span>{isPlayingAll ? 'गायन रोकें' : 'सम्पूर्ण पाठ सुनें'}</span>
            </button>

            <button
              onClick={handleCopyFullGeet}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copied ? 'कॉपी हो गया' : 'कॉपी'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onBookmark(geet.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition ${
                isBookmarked ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-white border-stone-200 text-stone-600'
              }`}
            >
              <Bookmark size={14} className={isBookmarked ? 'fill-amber-800' : ''} />
              <span>{isBookmarked ? 'सहेजा गया' : 'सहेजें'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
