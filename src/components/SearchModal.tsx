import React, { useState } from 'react';
import { Search, X, Music, FileText, Newspaper, User, Sparkles } from 'lucide-react';
import { KudmaliGeet, KudmaliArticle, KudmaliBlog, KudmaliIcon, KudmaliScriptType } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  geetList: KudmaliGeet[];
  articles: KudmaliArticle[];
  blogs: KudmaliBlog[];
  icons: KudmaliIcon[];
  activeScript: KudmaliScriptType;
  onSelectGeet: (geet: KudmaliGeet) => void;
  onSelectArticle: (article: KudmaliArticle) => void;
  onSelectBlog: (blog: KudmaliBlog) => void;
  onSelectIcon: (iconId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  geetList,
  articles,
  blogs,
  icons,
  activeScript,
  onSelectGeet,
  onSelectArticle,
  onSelectBlog,
  onSelectIcon
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingGeet = trimmed
    ? geetList.filter(g => {
        const titleMatch = 
          g.title.devanagari.toLowerCase().includes(trimmed) ||
          g.title.roman.toLowerCase().includes(trimmed) ||
          g.title.bengali.includes(trimmed);
        
        const poetMatch = 
          g.poet.devanagari.toLowerCase().includes(trimmed) ||
          g.poet.roman.toLowerCase().includes(trimmed);

        const verseMatch = g.verses.some(v => 
          v.devanagari[0].includes(trimmed) ||
          v.devanagari[1].includes(trimmed) ||
          v.roman[0].toLowerCase().includes(trimmed) ||
          v.roman[1].toLowerCase().includes(trimmed) ||
          v.bengali[0].includes(trimmed) ||
          v.bengali[1].includes(trimmed)
        );

        const tagMatch = g.tags.some(t => t.toLowerCase().includes(trimmed));
        const categoryMatch = g.category.toLowerCase().includes(trimmed);

        return titleMatch || poetMatch || verseMatch || tagMatch || categoryMatch;
      })
    : [];

  const matchingArticles = trimmed
    ? articles.filter(a => 
        a.title.toLowerCase().includes(trimmed) ||
        (a.kudmaliTitle && a.kudmaliTitle.toLowerCase().includes(trimmed)) ||
        a.author.toLowerCase().includes(trimmed) ||
        a.excerpt.toLowerCase().includes(trimmed) ||
        a.tags.some(t => t.toLowerCase().includes(trimmed))
      )
    : [];

  const matchingBlogs = trimmed
    ? blogs.filter(b => 
        b.title.toLowerCase().includes(trimmed) ||
        b.author.toLowerCase().includes(trimmed) ||
        b.summary.toLowerCase().includes(trimmed) ||
        b.tags.some(t => t.toLowerCase().includes(trimmed))
      )
    : [];

  const matchingIcons = trimmed
    ? icons.filter(ic => 
        ic.name.devanagari.toLowerCase().includes(trimmed) ||
        ic.name.roman.toLowerCase().includes(trimmed) ||
        ic.bio.toLowerCase().includes(trimmed)
      )
    : [];

  const totalResults = matchingGeet.length + matchingArticles.length + matchingBlogs.length + matchingIcons.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 p-4 bg-stone-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-[#FCFAF6] border border-white/90 shadow-2xl rounded-3xl w-full max-w-2xl overflow-hidden font-serif"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200/80 flex items-center gap-3 bg-white/80">
          <Search size={20} className="text-amber-800 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="गीत, निबंध, ब्लॉग या कवि खोजें (e.g. Aalomoni, Jhumur, Karam, Sohrai, Binu)..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent font-sans text-stone-900 placeholder:text-stone-400 text-sm md:text-base outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-600 text-xs font-sans"
            >
              हटाएँ
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {trimmed === '' ? (
            <div className="text-center py-10 space-y-3 font-sans">
              <p className="text-stone-400 text-xs sm:text-sm">
                आलोमोनि संकलन में कुड़मालि गीत, निबंध या ब्लॉग खोजने के लिए टाइप करें।
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['आलोमोनि', 'झुमुर', 'करम', 'सोहराय', 'टुसू', 'मांदर', 'बिनु महतो'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs px-3 py-1 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 transition"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-12 text-stone-400 font-sans text-sm">
              "{query}" के लिए कोई परिणाम नहीं मिला।
            </div>
          ) : (
            <div className="space-y-6 font-sans">
              
              {/* Geet Results */}
              {matchingGeet.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider px-1">
                    <Music size={14} />
                    <span>कुड़मालि गीत ({matchingGeet.length})</span>
                  </div>
                  {matchingGeet.map(geet => (
                    <div
                      key={geet.id}
                      onClick={() => {
                        onSelectGeet(geet);
                        onClose();
                      }}
                      className="p-3.5 rounded-xl bg-white border border-stone-200 hover:border-amber-400 hover:shadow-xs cursor-pointer transition"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif font-bold text-stone-900 text-base">
                          {geet.title[activeScript] || geet.title.devanagari}
                        </h4>
                        <span className="text-[10px] uppercase font-sans font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                          {geet.category}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 font-sans mt-0.5">
                        रचयिता: {geet.poet[activeScript] || geet.poet.devanagari} • {geet.taalOrSur}
                      </p>
                      <p className="text-xs font-serif text-stone-700 italic mt-2 line-clamp-1">
                        "{geet.verses[0]?.devanagari[0]}"
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Articles Results */}
              {matchingArticles.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider px-1">
                    <FileText size={14} />
                    <span>निबंध व आलेख ({matchingArticles.length})</span>
                  </div>
                  {matchingArticles.map(article => (
                    <div
                      key={article.id}
                      onClick={() => {
                        onSelectArticle(article);
                        onClose();
                      }}
                      className="p-3.5 rounded-xl bg-white border border-stone-200 hover:border-amber-400 hover:shadow-xs cursor-pointer transition"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif font-bold text-stone-900 text-base">
                          {article.title}
                        </h4>
                        <span className="text-[10px] font-sans font-semibold bg-blue-50 text-blue-900 px-2 py-0.5 rounded-full">
                          {article.category}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 font-sans mt-0.5">
                        लेखक: {article.author} • {article.readTime}
                      </p>
                      <p className="text-xs font-sans text-stone-600 mt-1 line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Blogs Results */}
              {matchingBlogs.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider px-1">
                    <Newspaper size={14} />
                    <span>ब्लॉग व विचार ({matchingBlogs.length})</span>
                  </div>
                  {matchingBlogs.map(blog => (
                    <div
                      key={blog.id}
                      onClick={() => {
                        onSelectBlog(blog);
                        onClose();
                      }}
                      className="p-3.5 rounded-xl bg-white border border-stone-200 hover:border-amber-400 hover:shadow-xs cursor-pointer transition"
                    >
                      <h4 className="font-serif font-bold text-stone-900 text-base">
                        {blog.title}
                      </h4>
                      <p className="text-xs text-stone-500 font-sans mt-0.5">
                        लेखक: {blog.author} • {blog.readTime}
                      </p>
                      <p className="text-xs font-sans text-stone-600 mt-1 line-clamp-2">
                        {blog.summary}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Icons Results */}
              {matchingIcons.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider px-1">
                    <User size={14} />
                    <span>कवि व विभूतियाँ ({matchingIcons.length})</span>
                  </div>
                  {matchingIcons.map(icon => (
                    <div
                      key={icon.id}
                      onClick={() => {
                        onSelectIcon(icon.id);
                        onClose();
                      }}
                      className="p-3.5 rounded-xl bg-white border border-stone-200 hover:border-amber-400 hover:shadow-xs cursor-pointer transition"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-serif font-bold text-stone-900 text-base">
                          {icon.name[activeScript] || icon.name.devanagari}
                        </h4>
                        <span className="text-xs text-stone-500 font-sans">{icon.era}</span>
                      </div>
                      <p className="text-xs text-amber-900 font-sans font-medium mt-0.5">
                        {icon.title}
                      </p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-stone-200/80 bg-stone-50 text-right font-sans text-xs text-stone-400">
          Esc या बाहर क्लिक करके बंद करें
        </div>
      </div>
    </div>
  );
};
