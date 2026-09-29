import React, { useState } from 'react';
import { 
  X, 
  Volume2, 
  Pause, 
  Share2, 
  Copy, 
  Check, 
  Type, 
  BookOpen, 
  Sun, 
  Moon, 
  FileText, 
  Clock, 
  Calendar, 
  User, 
  Feather 
} from 'lucide-react';
import { KudmaliWriting } from '../types';
import { speakPoetry, stopRecitation } from '../utils/recitation';

interface WritingDetailModalProps {
  writing: KudmaliWriting | null;
  onClose: () => void;
  onCopyNotice: (msg: string) => void;
}

export const WritingDetailModal: React.FC<WritingDetailModalProps> = ({
  writing,
  onClose,
  onCopyNotice
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [readingTheme, setReadingTheme] = useState<'parchment' | 'light' | 'dark'>('parchment');
  const [activeTab, setActiveTab] = useState<'original' | 'roman' | 'hindi' | 'english'>('original');
  const [copied, setCopied] = useState(false);

  if (!writing) return null;

  const handleTogglePlay = () => {
    if (isPlayingAudio) {
      stopRecitation();
      setIsPlayingAudio(false);
    } else {
      let textToRead = writing.originalText;
      let lang: 'hi-IN' | 'en-US' = 'hi-IN';

      if (activeTab === 'english' && writing.englishTranslation) {
        textToRead = writing.englishTranslation;
        lang = 'en-US';
      } else if (activeTab === 'hindi' && writing.hindiTranslation) {
        textToRead = writing.hindiTranslation;
        lang = 'hi-IN';
      }

      const success = speakPoetry(
        textToRead,
        lang,
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false)
      );
      if (success) setIsPlayingAudio(true);
    }
  };

  const handleCopy = () => {
    const fullText = `${writing.title}\nBy ${writing.author}\n\n${writing.originalText}\n\n(Aalomoni Kudmali Archive)`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    onCopyNotice('रचना कॉपी कर ली गई!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const shareText = `Read "${writing.title}" by ${writing.author} on Aalomoni Kudmali Archive`;
    if (navigator.share) {
      navigator.share({
        title: writing.title,
        text: shareText,
        url: window.location.href
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  // Theme styles
  const themeStyles = {
    parchment: 'bg-[#FAF6EE] text-[#2C1F16] border-[#DFD3C0]',
    light: 'bg-[#FFFFFF] text-stone-800 border-stone-200',
    dark: 'bg-[#1C1815] text-[#ECE2D0] border-[#382F28]'
  };

  const textSizes = {
    normal: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-relaxed',
    xlarge: 'text-xl sm:text-2xl leading-relaxed'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-colors duration-300 ${themeStyles[readingTheme]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls Header */}
        <div className="px-6 py-3.5 border-b border-black/10 flex items-center justify-between gap-3 shrink-0 bg-black/5 backdrop-blur-xs font-sans text-xs">
          
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wider text-[10px] bg-amber-900/10 text-amber-900">
              {writing.type.toUpperCase()}
            </span>
            <span className="text-stone-400 hidden sm:inline">•</span>
            <span className="text-stone-500 hidden sm:inline flex items-center gap-1">
              <Clock size={12} /> {writing.readTime}
            </span>
          </div>

          {/* Reading Preferences */}
          <div className="flex items-center gap-2">
            
            {/* Theme Toggle */}
            <div className="flex items-center bg-black/5 rounded-lg p-0.5 border border-black/10">
              <button
                onClick={() => setReadingTheme('parchment')}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition ${readingTheme === 'parchment' ? 'bg-amber-100 text-amber-950 shadow-xs' : 'text-stone-500'}`}
                title="Parchment Theme"
              >
                Parchment
              </button>
              <button
                onClick={() => setReadingTheme('light')}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition ${readingTheme === 'light' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'}`}
                title="Clean Light Theme"
              >
                Light
              </button>
              <button
                onClick={() => setReadingTheme('dark')}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition ${readingTheme === 'dark' ? 'bg-stone-800 text-amber-200 shadow-xs' : 'text-stone-500'}`}
                title="Dark Atmosphere Theme"
              >
                Dark
              </button>
            </div>

            {/* Font Size Toggle */}
            <button
              onClick={() => {
                if (fontSize === 'normal') setFontSize('large');
                else if (fontSize === 'large') setFontSize('xlarge');
                else setFontSize('normal');
              }}
              className="p-1.5 rounded-lg border border-black/10 bg-black/5 text-stone-600 hover:text-stone-900"
              title="Toggle font size"
            >
              <Type size={15} />
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                stopRecitation();
                onClose();
              }}
              className="p-1.5 rounded-full hover:bg-black/10 text-stone-500 transition"
              title="Close reader"
            >
              <X size={18} />
            </button>
          </div>

        </div>

        {/* Scrollable Reader Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
          
          {/* Header Info */}
          <div className="text-center space-y-3 border-b border-black/10 pb-6 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
              {writing.title}
            </h2>
            {writing.kudmaliTitle && (
              <p className="font-serif italic text-lg text-amber-800">
                {writing.kudmaliTitle}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-sans text-stone-500">
              <span className="flex items-center gap-1 font-semibold text-stone-700">
                <User size={13} /> {writing.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar size={13} /> {writing.date}
              </span>
            </div>
          </div>

          {/* Translation / Script Tabs */}
          <div className="flex justify-center font-sans text-xs">
            <div className="inline-flex bg-black/5 p-1 rounded-xl border border-black/10">
              <button
                onClick={() => setActiveTab('original')}
                className={`px-3 py-1 rounded-lg font-semibold transition ${activeTab === 'original' ? 'bg-amber-900 text-white shadow-xs' : 'text-stone-600'}`}
              >
                Original (मूल पाठ)
              </button>
              {writing.romanTransliteration && (
                <button
                  onClick={() => setActiveTab('roman')}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${activeTab === 'roman' ? 'bg-amber-900 text-white shadow-xs' : 'text-stone-600'}`}
                >
                  Roman Transliteration
                </button>
              )}
              {writing.hindiTranslation && (
                <button
                  onClick={() => setActiveTab('hindi')}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${activeTab === 'hindi' ? 'bg-amber-900 text-white shadow-xs' : 'text-stone-600'}`}
                >
                  हिंदी अनुवाद
                </button>
              )}
              {writing.englishTranslation && (
                <button
                  onClick={() => setActiveTab('english')}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${activeTab === 'english' ? 'bg-amber-900 text-white shadow-xs' : 'text-stone-600'}`}
                >
                  English Meaning
                </button>
              )}
            </div>
          </div>

          {/* Main Reading Text */}
          <div className="max-w-2xl mx-auto py-2">
            <div className={`font-serif whitespace-pre-line text-center sm:text-left ${textSizes[fontSize]}`}>
              {activeTab === 'original' && writing.originalText}
              {activeTab === 'roman' && writing.romanTransliteration}
              {activeTab === 'hindi' && writing.hindiTranslation}
              {activeTab === 'english' && writing.englishTranslation}
            </div>
          </div>

          {/* Cultural Context Note */}
          {writing.culturalContext && (
            <div className="max-w-2xl mx-auto p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 font-sans text-xs space-y-1">
              <span className="font-bold uppercase tracking-wider text-[10px] text-amber-900">
                सांस्कृतिक पृष्ठभूमि (Cultural Context)
              </span>
              <p className="leading-relaxed opacity-90">
                {writing.culturalContext}
              </p>
            </div>
          )}

        </div>

        {/* Bottom Actions Bar */}
        <div className="px-6 py-4 border-t border-black/10 flex items-center justify-between gap-3 shrink-0 bg-black/5 font-sans text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleTogglePlay}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition ${isPlayingAudio ? 'bg-amber-800 text-white' : 'bg-stone-900 text-white hover:bg-stone-800'}`}
            >
              {isPlayingAudio ? <Pause size={14} /> : <Volume2 size={14} />}
              <span>{isPlayingAudio ? 'रोकें' : 'पाठ सुनें'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/80 border border-black/10 text-stone-700 hover:bg-white"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copied ? 'कॉपी हो गया' : 'कॉपी'}</span>
            </button>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/80 border border-black/10 text-stone-700 hover:bg-white"
          >
            <Share2 size={14} />
            <span className="hidden sm:inline">साझा करें</span>
          </button>
        </div>

      </div>
    </div>
  );
};
