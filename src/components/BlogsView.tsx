import React, { useState } from 'react';
import { Newspaper, Clock, Calendar, User, Heart, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { KudmaliBlog } from '../types';

interface BlogsViewProps {
  blogs: KudmaliBlog[];
  onSelectBlog: (blog: KudmaliBlog) => void;
  onLikeBlog: (blogId: string) => void;
  likedBlogIds: string[];
  glassClass: string;
}

export const BlogsView: React.FC<BlogsViewProps> = ({
  blogs,
  onSelectBlog,
  onLikeBlog,
  likedBlogIds,
  glassClass
}) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-sans font-semibold uppercase tracking-widest">
          <Newspaper size={14} className="text-amber-800" />
          <span>कुड़मालि लोक-डायरी आरु विचार</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 font-light tracking-tight">
          Community Blogs & Notes
        </h1>
        <p className="text-stone-500 font-sans text-sm md:text-base leading-relaxed">
          First-hand narratives, festival reminiscences, folklore explorations, and lived experiences from Kudmali culture, shared by writers and community voices.
        </p>
      </div>

      {/* Blogs Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map(blog => {
          const isLiked = likedBlogIds.includes(blog.id);
          return (
            <div
              key={blog.id}
              onClick={() => onSelectBlog(blog)}
              className={`${glassClass} p-6 flex flex-col justify-between cursor-pointer group hover:border-amber-300 hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
            >
              <div className="space-y-3">
                {/* Meta */}
                <div className="flex items-center justify-between font-sans text-[11px] text-stone-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{blog.publishedDate}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{blog.readTime}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-serif text-stone-900 font-bold group-hover:text-amber-950 transition-colors leading-snug">
                  {blog.title}
                </h3>

                {/* Summary */}
                <p className="text-stone-600 font-sans text-xs line-clamp-4 leading-relaxed">
                  {blog.summary}
                </p>

                {/* Author */}
                <div className="pt-2 flex items-center gap-2 text-xs font-sans text-stone-700">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-900 font-bold text-[10px]">
                    {blog.author.charAt(0)}
                  </div>
                  <span className="font-semibold">{blog.author}</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 mt-4 border-t border-stone-200/50 flex items-center justify-between font-sans text-xs">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLikeBlog(blog.id);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition ${
                    isLiked
                      ? 'bg-red-50 text-red-600 border-red-200'
                      : 'bg-white text-stone-500 border-stone-200 hover:text-stone-900'
                  }`}
                >
                  <Heart size={13} className={isLiked ? 'fill-red-600' : ''} />
                  <span>{blog.likes + (isLiked ? 1 : 0)}</span>
                </button>

                <span className="text-amber-800 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>पूरा पढ़ें</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
