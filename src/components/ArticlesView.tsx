import React, { useState } from 'react';
import { FileText, Clock, Calendar, User, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { KudmaliArticle } from '../types';

interface ArticlesViewProps {
  articles: KudmaliArticle[];
  onSelectArticle: (article: KudmaliArticle) => void;
  glassClass: string;
}

export const ArticlesView: React.FC<ArticlesViewProps> = ({
  articles,
  onSelectArticle,
  glassClass
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Festivals & Rituals', 'Music & Mandar', 'Language & Lipi', 'History & Kudmi Heritage'];

  const filtered = articles.filter(a => {
    if (selectedCategory !== 'all' && a.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-sans font-semibold uppercase tracking-widest">
          <FileText size={14} className="text-amber-800" />
          <span>कुड़मालि निबंध व शोध पत्रिका</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 font-light tracking-tight">
          Articles & Essays
        </h1>
        <p className="text-stone-500 font-sans text-sm md:text-base leading-relaxed">
          Critical research essays, cultural treatises, and anthropological writings exploring Kudmali rituals, percussion instruments, language, and social philosophy.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 font-sans text-xs">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl transition ${
              selectedCategory === cat
                ? 'bg-amber-900 text-white font-bold shadow-xs'
                : 'bg-white/70 text-stone-600 hover:bg-white border border-stone-200'
            }`}
          >
            {cat === 'all' ? 'सभी विषय (All Subjects)' : cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {filtered.map(article => (
          <div
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className={`${glassClass} p-7 md:p-8 flex flex-col justify-between cursor-pointer group hover:border-amber-300 hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
          >
            <div className="space-y-4">
              {/* Category & Read time */}
              <div className="flex items-center justify-between font-sans text-xs">
                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 font-bold border border-amber-200/70 text-[11px]">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-stone-400">
                  <Clock size={12} />
                  <span>{article.readTime}</span>
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl md:text-2xl font-serif text-stone-900 font-bold group-hover:text-amber-950 transition-colors leading-snug">
                {article.title}
              </h2>

              {article.kudmaliTitle && (
                <p className="text-sm font-serif text-amber-900 italic -mt-1">
                  {article.kudmaliTitle}
                </p>
              )}

              {/* Excerpt */}
              <p className="text-stone-600 font-sans text-xs md:text-sm line-clamp-3 leading-relaxed">
                {article.excerpt}
              </p>

              {/* Author Attribution */}
              <div className="pt-2 flex items-center gap-2 text-xs font-sans text-stone-500">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-900 font-bold text-[10px]">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <span className="font-semibold text-stone-800">{article.author}</span>
                  <span className="text-stone-400 text-[11px] block">{article.authorRole}</span>
                </div>
              </div>
            </div>

            {/* Bottom link */}
            <div className="pt-6 mt-4 border-t border-stone-200/50 flex items-center justify-between font-sans text-xs">
              <div className="flex gap-1.5">
                {article.tags.slice(0, 2).map(t => (
                  <span key={t} className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                    #{t}
                  </span>
                ))}
              </div>
              <span className="text-amber-800 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>सम्पूर्ण निबंध पढ़ें</span>
                <ArrowRight size={13} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
