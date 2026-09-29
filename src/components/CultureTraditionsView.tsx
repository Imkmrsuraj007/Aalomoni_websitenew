import React, { useState } from 'react';
import { Compass, Sparkles, BookOpen, CheckCircle2, Music, X, Share2, Tag } from 'lucide-react';
import { CulturalTopic } from '../types';

interface CultureTraditionsViewProps {
  topics: CulturalTopic[];
  glassClass: string;
}

export const CultureTraditionsView: React.FC<CultureTraditionsViewProps> = ({
  topics,
  glassClass
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTopicModal, setActiveTopicModal] = useState<CulturalTopic | null>(null);

  const categories = [
    'all',
    'Traditions',
    'Dance & Music',
    'Food',
    'Attire',
    'Sacred Spaces',
    'Language & Lipi'
  ];

  const filteredTopics = topics.filter(t => {
    if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-sans text-xs font-semibold uppercase tracking-wider">
          <Compass size={13} className="text-amber-800" />
          <span>Heritage of Chotanagpur</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-light text-stone-900 tracking-tight">
          Culture & Traditions
        </h1>
        <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
          An in-depth cultural exploration of sacred nuptial rites, martial dances, forest food heritage, customary attire, and village sanctuaries.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 font-sans text-xs border-y border-[#EBE3D5] py-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-amber-900 text-white font-bold shadow-xs'
                : 'bg-white/80 text-stone-600 hover:bg-white border border-[#DDD3C2]'
            }`}
          >
            {cat === 'all' ? 'All Traditions' : cat}
          </button>
        ))}
      </div>

      {/* Topics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            onClick={() => setActiveTopicModal(topic)}
            className="group bg-[#FAF7F2] hover:bg-white border border-[#E5DAC6] hover:border-amber-700/40 rounded-3xl overflow-hidden transition-all duration-300 shadow-2xs hover:shadow-lg flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
          >
            <div>
              {/* Featured Image */}
              <div className="h-48 w-full overflow-hidden relative bg-stone-200">
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#3E2723]/90 text-amber-100 font-sans font-bold text-[10px] uppercase tracking-wider backdrop-blur-xs">
                  {topic.category}
                </span>
              </div>

              {/* Text Info */}
              <div className="p-6 space-y-3">
                <h3 className="font-serif font-bold text-xl text-stone-900 group-hover:text-amber-950 transition-colors leading-snug">
                  {topic.title}
                </h3>
                {topic.kudmaliTitle && (
                  <p className="font-serif italic text-xs text-amber-900">
                    {topic.kudmaliTitle}
                  </p>
                )}

                <p className="text-stone-600 font-sans text-xs leading-relaxed line-clamp-3">
                  {topic.summary}
                </p>

                {/* Key highlights bullet preview */}
                <div className="pt-2 space-y-1.5">
                  {topic.keyHighlights.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] font-sans text-stone-600">
                      <CheckCircle2 size={13} className="text-amber-800 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Explore Button */}
            <div className="px-6 py-4 border-t border-[#EFE7D8] bg-[#F7F2E7]/50 flex items-center justify-between text-xs font-sans font-semibold text-amber-950">
              <span>Read Full Documentation</span>
              <BookOpen size={14} className="text-amber-800 transform group-hover:scale-110 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Modal for Detailed Article Reading */}
      {activeTopicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-[#FAF6EE] text-stone-800 border border-[#E0D5C3] shadow-2xl overflow-hidden font-serif"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-stone-200/80 bg-white/70 backdrop-blur-xs flex items-center justify-between gap-3 shrink-0 font-sans text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold uppercase tracking-wider text-[10px]">
                {activeTopicModal.category}
              </span>
              <button
                onClick={() => setActiveTopicModal(null)}
                className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
              
              {/* Hero Banner inside modal */}
              <div className="rounded-2xl overflow-hidden h-56 sm:h-72 w-full relative">
                <img
                  src={activeTopicModal.image}
                  alt={activeTopicModal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif leading-tight">
                    {activeTopicModal.title}
                  </h2>
                  {activeTopicModal.kudmaliTitle && (
                    <p className="font-serif italic text-amber-200 text-sm mt-1">
                      {activeTopicModal.kudmaliTitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Summary Lead */}
              <p className="font-sans text-stone-700 text-sm sm:text-base leading-relaxed italic border-l-3 border-amber-800 pl-4 py-1">
                {activeTopicModal.summary}
              </p>

              {/* Key Highlights Box */}
              <div className="p-5 rounded-2xl bg-[#F0E8D9] border border-[#DDD0BC] font-sans space-y-2.5">
                <span className="font-bold text-xs uppercase tracking-wider text-amber-950 block">
                  Cultural Pillars & Key Practices
                </span>
                <div className="space-y-2 text-xs sm:text-sm text-stone-700">
                  {activeTopicModal.keyHighlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-800 shrink-0 mt-2" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Article Paragraphs */}
              <div className="space-y-4 font-sans text-sm sm:text-base text-stone-700 leading-relaxed">
                {activeTopicModal.fullArticle.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Associated Songs */}
              {activeTopicModal.relatedSongs && (
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 font-sans text-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-amber-900 font-bold">
                    <Music size={14} />
                    <span>संबद्ध लोक-गीत (Associated Folk Songs):</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeTopicModal.relatedSongs.map(s => (
                      <span key={s} className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-stone-800 font-serif">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-stone-200/80 bg-white/70 flex justify-end font-sans text-xs">
              <button
                onClick={() => setActiveTopicModal(null)}
                className="px-5 py-2 rounded-xl bg-stone-900 text-white font-semibold hover:bg-stone-800 cursor-pointer"
              >
                बंद करें (Close)
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
