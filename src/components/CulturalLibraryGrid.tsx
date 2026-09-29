import React from 'react';
import { 
  Music, 
  Heart, 
  Leaf, 
  Flower2, 
  BookOpen, 
  PenLine, 
  FileText, 
  Home, 
  Scroll, 
  ArrowRight 
} from 'lucide-react';

interface CategoryCardItem {
  id: string;
  name: string;
  kudmaliName: string;
  icon: React.ReactNode;
  description: string;
  countLabel: string;
  targetView: string;
  targetCategoryFilter?: string;
  badgeColor: string;
}

interface CulturalLibraryGridProps {
  onNavigate: (view: string, categoryFilter?: string) => void;
}

export const CulturalLibraryGrid: React.FC<CulturalLibraryGridProps> = ({ onNavigate }) => {
  const categories: CategoryCardItem[] = [
    {
      id: 'geet-general',
      name: 'Kudmali Geet',
      kudmaliName: 'कुड़मालि लोक-गीत',
      icon: <Music className="w-5 h-5 text-amber-800" />,
      description: 'Living oral folk songs spanning Bhaduria Jhumur, pastoral ballads, and seasonal field melodies.',
      countLabel: 'Oral Heritage',
      targetView: 'geet',
      targetCategoryFilter: 'all',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200'
    },
    {
      id: 'geet-biha',
      name: 'Biha Geet',
      kudmaliName: 'बिहा आरु नेग गीत',
      icon: <Heart className="w-5 h-5 text-rose-700" />,
      description: 'Nuptial choral melodies blessing the bride and groom, celebrating tree marriages and tearful farewells.',
      countLabel: 'Wedding Rites',
      targetView: 'geet',
      targetCategoryFilter: 'Biha Geet',
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-200'
    },
    {
      id: 'geet-karam',
      name: 'Karam Geet',
      kudmaliName: 'करम आरु जावा गीत',
      icon: <Leaf className="w-5 h-5 text-emerald-800" />,
      description: 'Reverent songs accompanying the sprouting of Jawa seeds and nocturnal dances around the Karam branch.',
      countLabel: 'Bhado Ekadashi',
      targetView: 'geet',
      targetCategoryFilter: 'Karam Geet',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200'
    },
    {
      id: 'geet-tusu',
      name: 'Tusu Geet',
      kudmaliName: 'टुसू धनेर गान',
      icon: <Flower2 className="w-5 h-5 text-amber-700" />,
      description: 'Winter harvest verses sung by maidens carrying handcrafted bamboo Chouradol shrines to the river.',
      countLabel: 'Poush & Makar',
      targetView: 'geet',
      targetCategoryFilter: 'Tusu Geet',
      badgeColor: 'bg-orange-100 text-orange-900 border-orange-200'
    },
    {
      id: 'writings-stories',
      name: 'Stories & Tales',
      kudmaliName: 'कहाणी आरु लोक-कथा',
      icon: <BookOpen className="w-5 h-5 text-stone-700" />,
      description: 'Village memoirs, folklore passed across firesides, and nostalgic tales of ancestral wisdom.',
      countLabel: 'Prose & Lore',
      targetView: 'writings',
      targetCategoryFilter: 'story',
      badgeColor: 'bg-stone-100 text-stone-800 border-stone-200'
    },
    {
      id: 'writings-poems',
      name: 'Kudmali Poems',
      kudmaliName: 'कुड़मालि कविता आरु भाव',
      icon: <PenLine className="w-5 h-5 text-amber-900" />,
      description: 'Lyrical verses dedicated to the Sal forests, monsoon clouds, and cultural identity.',
      countLabel: 'Poetic Verses',
      targetView: 'writings',
      targetCategoryFilter: 'poem',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200'
    },
    {
      id: 'writings-blogs',
      name: 'Blogs & Musings',
      kudmaliName: 'विचार आरु निबंध',
      icon: <FileText className="w-5 h-5 text-stone-800" />,
      description: 'Reflective essays examining language revitalization, linguistic pride, and rural community life.',
      countLabel: 'Curated Essays',
      targetView: 'blogs',
      badgeColor: 'bg-stone-100 text-stone-800 border-stone-200'
    },
    {
      id: 'culture-traditions',
      name: 'Culture & Traditions',
      kudmaliName: 'हामार रीति आरु नेग-चार',
      icon: <Home className="w-5 h-5 text-amber-800" />,
      description: 'Deep dives into culinary treasures (Dhuska, Pitha), attire, sacred groves (Jahersthan), and dance.',
      countLabel: 'Heritage Guide',
      targetView: 'culture',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200'
    },
    {
      id: 'culture-history',
      name: 'Folk History & Icons',
      kudmaliName: 'इतिहास आरु अमर कवि',
      icon: <Scroll className="w-5 h-5 text-stone-700" />,
      description: 'Chronicles of classical Jhumur bards, the development of the Chis script, and historical milestones.',
      countLabel: '5 Epochs',
      targetView: 'timeline',
      badgeColor: 'bg-stone-100 text-stone-800 border-stone-200'
    }
  ];

  return (
    <section className="py-16 md:py-24 border-b border-[#EBE3D5] bg-[#FDFBF7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4EFE6] border border-[#DDD3C2] text-amber-950 font-sans text-xs font-semibold uppercase tracking-wider">
            <span>The Living Tapestry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#2D1E16] tracking-tight">
            Kudmali Cultural Library
          </h2>
          <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
            Browse through nine foundational pillars of Kudmali oral literature, ancestral songs, seasonal celebrations, and contemporary writings.
          </p>
        </div>

        {/* 9 Category Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate(cat.targetView, cat.targetCategoryFilter)}
              className="group bg-[#FAF7F2] hover:bg-white border border-[#E5DAC6] hover:border-amber-700/40 rounded-2xl p-6 transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
            >
              <div>
                {/* Top Row: Icon + Count */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F0E8D9] group-hover:bg-amber-100 flex items-center justify-center transition-colors shadow-2xs">
                    {cat.icon}
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-sans font-semibold ${cat.badgeColor}`}>
                    {cat.countLabel}
                  </span>
                </div>

                {/* Names */}
                <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-amber-950 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs font-serif text-amber-900 mb-2">
                  {cat.kudmaliName}
                </p>

                {/* Description */}
                <p className="text-stone-600 font-sans text-xs leading-relaxed line-clamp-3">
                  {cat.description}
                </p>
              </div>

              {/* Bottom Explore Link */}
              <div className="pt-4 mt-4 border-t border-[#EFE7D8] flex items-center justify-between text-xs font-sans font-semibold text-stone-700 group-hover:text-amber-950">
                <span>Explore Category</span>
                <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform text-amber-800" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
