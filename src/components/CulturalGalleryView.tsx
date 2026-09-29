import React, { useState } from 'react';
import { Camera, MapPin, X, Maximize2, Tag } from 'lucide-react';
import { GALLERY_DATA } from '../data/galleryData';
import { GalleryPhoto } from '../types';

interface CulturalGalleryViewProps {
  glassClass: string;
}

export const CulturalGalleryView: React.FC<CulturalGalleryViewProps> = ({ glassClass }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const categories = [
    'all',
    'Festivals',
    'Village Life',
    'Music & Instruments',
    'Art & Craft',
    'Ceremonies',
    'Nature'
  ];

  const filteredPhotos = GALLERY_DATA.filter(photo => {
    if (selectedCategory !== 'all' && photo.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-sans text-xs font-semibold uppercase tracking-wider">
          <Camera size={13} className="text-amber-800" />
          <span>Visual Heritage</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-light text-stone-900 tracking-tight">
          Cultural Gallery
        </h1>
        <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
          Moments of rural reverence: clay Mandar drums, Sohrai wall murals, floating river shrines, and festive village courtyards.
        </p>
      </div>

      {/* Category Pills */}
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
            {cat === 'all' ? 'All Photographs' : cat}
          </button>
        ))}
      </div>

      {/* Masonry / Photo Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="group relative bg-[#FAF7F2] border border-[#E5DAC6] hover:border-amber-700/50 rounded-2xl overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
          >
            <div className="h-64 w-full overflow-hidden bg-stone-200 relative">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/60 text-white font-sans text-[10px] uppercase font-bold tracking-wider backdrop-blur-xs">
                {photo.category}
              </span>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-2.5 rounded-full bg-white/90 text-stone-900 shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                  <Maximize2 size={16} />
                </span>
              </div>
            </div>

            <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-stone-900 leading-snug group-hover:text-amber-950 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs font-sans text-stone-600 line-clamp-2 mt-1">
                  {photo.caption}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-[11px] font-sans text-stone-400">
                <MapPin size={12} className="text-amber-800" />
                <span>{photo.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className="max-w-4xl w-full bg-[#1C1815] text-white rounded-3xl overflow-hidden border border-stone-800 shadow-2xl relative flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="p-4 flex items-center justify-between border-b border-stone-800 font-sans text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-900/60 text-amber-200 uppercase font-bold text-[10px]">
                {activePhoto.category}
              </span>
              <button
                onClick={() => setActivePhoto(null)}
                className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Photo */}
            <div className="overflow-hidden flex-1 max-h-[65vh] bg-black flex items-center justify-center">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-[65vh] w-auto max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Caption & Location */}
            <div className="p-5 sm:p-6 bg-[#25201C] space-y-2 border-t border-stone-800">
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-100">
                {activePhoto.title}
              </h3>
              <p className="font-sans text-stone-300 text-xs sm:text-sm leading-relaxed">
                {activePhoto.caption}
              </p>
              <div className="flex items-center gap-1.5 text-xs font-sans text-amber-400 pt-1">
                <MapPin size={13} />
                <span>{activePhoto.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
