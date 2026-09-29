import React from 'react';
import { X, Calendar, Clock, User, Heart, Share2 } from 'lucide-react';
import { KudmaliBlog } from '../types';

interface BlogDetailModalProps {
  blog: KudmaliBlog | null;
  onClose: () => void;
  onLike: (id: string) => void;
  isLiked: boolean;
  onCopyNotice: (msg: string) => void;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({
  blog,
  onClose,
  onLike,
  isLiked,
  onCopyNotice
}) => {
  if (!blog) return null;

  const handleShare = () => {
    const text = `${blog.title}\nBy ${blog.author}\nRead on Aalomoni Kudmali Archive`;
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      onCopyNotice('ब्लॉग लिंक कॉपी कर लिया गया!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-md">
      <div 
        className="bg-[#FCFAF6] border border-white/80 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200/80 bg-white/70 backdrop-blur-md flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
              कुड़मालि ब्लॉग
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-600 hover:text-stone-900"
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

        {/* Content */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          <div className="space-y-3 border-b border-stone-200/60 pb-5">
            <h1 className="text-2xl md:text-3xl font-serif text-stone-900 font-bold leading-snug">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-stone-500">
              <span className="flex items-center gap-1 font-semibold text-stone-800">
                <User size={13} className="text-amber-700" />
                <span>{blog.author}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                <span>{blog.publishedDate}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock size={13} />
                <span>{blog.readTime}</span>
              </span>
            </div>
          </div>

          <p className="text-base font-serif italic text-stone-600 bg-amber-50/70 p-4 rounded-xl border border-amber-200/50 leading-relaxed">
            {blog.summary}
          </p>

          <div className="space-y-4 font-sans text-stone-700 text-sm md:text-base leading-relaxed">
            {blog.content.map((para, idx) => (
              <p key={idx} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-200/60 flex flex-wrap gap-1.5">
            {blog.tags.map(t => (
              <span key={t} className="text-xs px-2.5 py-0.5 rounded bg-stone-100 text-stone-600 font-sans">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200/80 bg-white/80 backdrop-blur-md flex items-center justify-between font-sans text-xs">
          <button
            onClick={() => onLike(blog.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition ${
              isLiked
                ? 'bg-red-50 text-red-600 border-red-200 font-semibold'
                : 'bg-white text-stone-600 border-stone-200 hover:text-stone-900'
            }`}
          >
            <Heart size={15} className={isLiked ? 'fill-red-600' : ''} />
            <span>{blog.likes + (isLiked ? 1 : 0)} लोगों को पसंद आया</span>
          </button>

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
