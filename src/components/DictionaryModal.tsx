import React, { useState } from 'react';
import { Search, BookA, X, ExternalLink, Sparkles, Volume2 } from 'lucide-react';
import { KUDMALI_DICTIONARY } from '../data/kudmaliDictionary';
import { KudmaliWordMeaning } from '../types';
import { speakPoetry } from '../utils/recitation';

interface DictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialWord?: string;
}

export const DictionaryModal: React.FC<DictionaryModalProps> = ({
  isOpen,
  onClose,
  initialWord = ''
}) => {
  const [searchTerm, setSearchTerm] = useState(initialWord);
  const [selectedWord, setSelectedWord] = useState<KudmaliWordMeaning | null>(() => {
    if (initialWord && KUDMALI_DICTIONARY[initialWord.toLowerCase()]) {
      return KUDMALI_DICTIONARY[initialWord.toLowerCase()];
    }
    return Object.values(KUDMALI_DICTIONARY)[0];
  });

  if (!isOpen) return null;

  const words = Object.values(KUDMALI_DICTIONARY).filter(item => {
    const term = searchTerm.toLowerCase();
    return (
      item.word.toLowerCase().includes(term) ||
      item.transliteration.toLowerCase().includes(term) ||
      item.devanagari.includes(term) ||
      item.bengali.includes(term) ||
      item.englishMeaning.toLowerCase().includes(term) ||
      item.hindiMeaning.toLowerCase().includes(term)
    );
  });

  const handlePronounce = (word: KudmaliWordMeaning) => {
    speakPoetry(word.devanagari, 'hi-IN');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-[#FCFAF6] border border-white/80 shadow-2xl rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden text-stone-800 font-serif"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200/80 flex items-center justify-between bg-white/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-700/10 text-amber-800 flex items-center justify-center">
              <BookA size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-stone-900 tracking-tight">कुड़मालि शब्दकोश (Lexicon)</h2>
                <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-sans uppercase font-bold tracking-wider">
                  Kudmali • Hindi • English
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-sans">
                Authentic cultural vocabulary, folklore idioms, and percussion terminology
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-stone-200/60 bg-stone-50/50">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
            <input
              type="text"
              placeholder="शब्द खोजें / Search word (e.g., Aalomoni, Mandar, Akhra, Jawa, Karam)..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white font-sans text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>
        </div>

        {/* Content Split: Word List + Detail Panel */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-5 min-h-[350px]">
          {/* List Sidebar */}
          <div className="md:col-span-2 border-r border-stone-200/60 overflow-y-auto p-3 space-y-1.5 max-h-[50vh] md:max-h-none">
            {words.length === 0 ? (
              <p className="p-4 text-xs font-sans text-stone-400 text-center">कोई शब्द नहीं मिला।</p>
            ) : (
              words.map(item => (
                <div
                  key={item.word}
                  onClick={() => setSelectedWord(item)}
                  className={`p-3 rounded-xl cursor-pointer transition text-left ${
                    selectedWord?.word === item.word
                      ? 'bg-amber-100/80 border border-amber-300 shadow-xs'
                      : 'hover:bg-stone-100 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-base">{item.devanagari}</span>
                    <span className="text-xs text-stone-500 font-sans">{item.transliteration}</span>
                  </div>
                  <p className="text-xs text-stone-600 font-sans line-clamp-1 mt-0.5">
                    {item.hindiMeaning}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Word Detail Panel */}
          <div className="md:col-span-3 p-6 overflow-y-auto space-y-6 bg-white/40">
            {selectedWord ? (
              <div className="space-y-6">
                {/* Word Title & Pronunciation */}
                <div className="border-b border-stone-200/70 pb-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-3xl font-bold text-stone-900 tracking-tight">
                        {selectedWord.devanagari}
                      </h3>
                      <p className="text-sm font-sans text-stone-500 mt-1">
                        {selectedWord.transliteration} • {selectedWord.bengali}
                      </p>
                    </div>

                    <button
                      onClick={() => handlePronounce(selectedWord)}
                      className="p-2.5 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200 transition flex items-center gap-1.5 text-xs font-sans font-semibold"
                      title="उच्चारण सुनें"
                    >
                      <Volume2 size={16} />
                      <span className="hidden sm:inline">उच्चारण</span>
                    </button>
                  </div>
                </div>

                {/* Meanings */}
                <div className="space-y-4 font-sans text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                      हिन्दी अर्थ (Hindi Meaning)
                    </span>
                    <p className="text-stone-900 text-sm font-serif">
                      {selectedWord.hindiMeaning}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                      English Translation
                    </span>
                    <p className="text-stone-700">
                      {selectedWord.englishMeaning}
                    </p>
                  </div>

                  {selectedWord.culturalNote && (
                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">
                        सांस्कृतिक संदर्भ (Cultural Note)
                      </span>
                      <p className="text-stone-600 text-xs leading-relaxed">
                        {selectedWord.culturalNote}
                      </p>
                    </div>
                  )}

                  {selectedWord.exampleUsage && (
                    <div className="p-4 rounded-xl bg-amber-100/30 border border-amber-200/50 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                        लोक-गीत में प्रयोग
                      </span>
                      <p className="font-serif italic text-stone-900 text-sm">
                        "{selectedWord.exampleUsage}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-stone-400 font-sans text-xs">
                विवरण देखने के लिए बाएँ से कोई शब्द चुनें।
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-200/80 bg-stone-50 flex items-center justify-between font-sans text-xs text-stone-500">
          <span>Aalomoni Kudmali Lexicography Initiative</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-900 text-white font-medium hover:bg-stone-800 transition"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );
};
