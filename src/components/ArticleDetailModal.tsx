import React from 'react';
import { X, Clock, Calendar, User, Bookmark, Share2, Tag, BookOpen, Quote } from 'lucide-react';
import { KudmaliArticle } from '../types';

interface ArticleDetailModalProps {
  article: KudmaliArticle | null;
  onClose: () => void;
  onCopyNotice: (msg: string) => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  onCopyNotice
}) => {
  if (!article) return null;

  const handleShare = () => {
    const text = `${article.title}\nBy ${article.author}\nRead on Aalomoni Kudmali Archive`;
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      onCopyNotice('लेख का लिंक कॉपी कर लिया गया!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-md">
      <div 
        className="bg-[#FCFAF6] border border-white/80 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-stone-200/80 bg-white/70 backdrop-blur-md flex items-center justify-between gap-4 shrink-0">
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-sans font-bold uppercase tracking-wider">
            {article.category}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-stone-900 transition"
              title="साझा करें"
            >
              <Share2 size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="overflow-y-auto p-6 md:p-10 space-y-8">
          {/* Article Header */}
          <div className="space-y-4 border-b border-stone-200/60 pb-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-stone-900 font-bold leading-snug">
              {article.title}
            </h1>
            {article.kudmaliTitle && (
              <p className="text-lg md:text-xl font-serif text-amber-900 italic">
                {article.kudmaliTitle}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-stone-500 pt-2">
              <span className="flex items-center gap-1.5 font-medium text-stone-800">
                <User size={14} className="text-amber-700" />
                <span>{article.author} ({article.authorRole})</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{article.publishedDate}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                <span>{article.readTime}</span>
              </span>
            </div>
          </div>

          {/* Excerpt Lead */}
          <p className="text-base md:text-lg font-serif italic text-stone-700 bg-amber-50/70 p-5 rounded-2xl border-l-4 border-amber-800 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Sections */}
          <div className="space-y-8 font-sans">
            {article.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-xl font-serif font-bold text-stone-900 tracking-tight">
                  {sec.heading}
                </h3>
                <p className="text-stone-700 text-sm md:text-base leading-relaxed">
                  {sec.body}
                </p>
                {sec.quote && (
                  <div className="my-4 p-4 rounded-xl bg-white border border-amber-200/70 text-amber-950 font-serif italic flex gap-3">
                    <Quote size={20} className="text-amber-700 shrink-0 mt-0.5" />
                    <p className="text-sm md:text-base">{sec.quote}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-stone-200/60 flex flex-wrap items-center gap-2">
            <span className="text-xs font-sans text-stone-400 uppercase tracking-wider font-semibold">
              विषय:
            </span>
            {article.tags.map(t => (
              <span key={t} className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-600 text-xs font-sans">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200/80 bg-white/80 backdrop-blur-md flex items-center justify-between font-sans text-xs text-stone-500">
          <span>Aalomoni Kudmali Research & Cultural Archive</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-900 text-white font-medium hover:bg-stone-800 transition"
          >
            बंद करें (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
