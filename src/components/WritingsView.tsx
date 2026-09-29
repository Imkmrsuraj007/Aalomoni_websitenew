import React, { useState } from 'react';
import { BookOpen, PenLine, Sparkles, Clock, Calendar, Search, ArrowRight, Tag } from 'lucide-react';
import { KudmaliWriting, WritingType } from '../types';

interface WritingsViewProps {
  writings: KudmaliWriting[];
  onSelectWriting: (writing: KudmaliWriting) => void;
  glassClass: string;
}

export const WritingsView: React.FC<WritingsViewProps> = ({
  writings,
  onSelectWriting,
  glassClass
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | WritingType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterOptions = [
    { key: 'all', label: 'All Writings' },
    { key: 'poem', label: 'Poems (कविता)' },
    { key: 'story', label: 'Stories (कथा)' },
    { key: 'reflection', label: 'Reflections (संस्मरण)' },
    { key: 'essay', label: 'Essays (निबंध)' }
  ];

  const filteredWritings = writings.filter(item => {
    if (selectedFilter !== 'all' && item.type !== selectedFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q) || (item.kudmaliTitle && item.kudmaliTitle.toLowerCase().includes(q));
      const matchContent = item.originalText.toLowerCase().includes(q);
      const matchTag = item.tags.some(t => t.toLowerCase().includes(q));
      return matchTitle || matchContent || matchTag;
    }
    return true;
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-sans text-xs font-semibold uppercase tracking-wider">
          <PenLine size={13} className="text-amber-800" />
          <span>Literary Sanctuary</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-light text-stone-900 tracking-tight">
          Writings & Stories
        </h1>
        <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
          Kudmali poems, folk tales, village memories, and literary reflections penned by Aarti Mahato and honoring oral heritage.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs border-y border-[#EBE3D5] py-4">
        
        {/* Type Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {filterOptions.map(opt => (
            <button
              key={opt.key}
              onClick={() => setSelectedFilter(opt.key as any)}
              className={`px-3.5 py-1.5 rounded-full transition cursor-pointer ${
                selectedFilter === opt.key
                  ? 'bg-amber-900 text-white font-bold shadow-xs'
                  : 'bg-white/80 text-stone-600 hover:bg-white border border-[#DDD3C2]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search poems, stories..."
            className="w-full pl-9 pr-3 py-1.5 rounded-full bg-white/80 border border-[#DDD3C2] text-xs outline-none focus:ring-2 ring-amber-300 text-stone-800"
          />
        </div>
      </div>

      {/* Writings Cards Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {filteredWritings.map((item) => (
          <article
            key={item.id}
            onClick={() => onSelectWriting(item)}
            className="group bg-[#FAF7F2] hover:bg-white border border-[#E5DAC6] hover:border-amber-700/40 rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-2xs hover:shadow-lg flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
          >
            <div className="space-y-4">
              {/* Top metadata */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-sans font-bold uppercase tracking-wider">
                  {item.type}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-sans text-stone-400">
                  <Clock size={12} /> {item.readTime}
                </span>
              </div>

              {/* Title & Kudmali Title */}
              <div>
                <h3 className="font-serif font-bold text-2xl text-stone-900 group-hover:text-amber-950 transition-colors leading-snug">
                  {item.title}
                </h3>
                {item.kudmaliTitle && (
                  <p className="font-serif italic text-sm text-amber-800 mt-1">
                    {item.kudmaliTitle}
                  </p>
                )}
              </div>

              {/* Excerpt */}
              <p className="text-stone-600 font-sans text-xs sm:text-sm leading-relaxed line-clamp-3">
                {item.originalText}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-sans px-2 py-0.5 rounded-md bg-[#EFE8DC] text-stone-600">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Author & Read Link */}
            <div className="pt-6 mt-6 border-t border-[#EFE7D8] flex items-center justify-between text-xs font-sans">
              <span className="text-stone-500 font-semibold">
                By {item.author} • {item.date}
              </span>
              <span className="inline-flex items-center gap-1 font-bold text-amber-900 group-hover:underline">
                Read Piece <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {filteredWritings.length === 0 && (
        <div className="p-12 text-center text-stone-400 font-sans text-sm bg-white/50 border border-stone-200 rounded-3xl">
          कोई रचना नहीं मिली। कृपया फ़िल्टर या खोज शब्द बदलें।
        </div>
      )}

    </div>
  );
};
