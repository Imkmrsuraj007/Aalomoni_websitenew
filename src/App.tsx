import React, { useState, useEffect } from 'react';
import { 
  Music, 
  FileText, 
  Newspaper, 
  User, 
  PlusCircle, 
  LogIn, 
  Sparkles, 
  Filter, 
  Bookmark, 
  BookA, 
  RefreshCw, 
  Volume2,
  Compass,
  Calendar,
  Camera,
  Clock,
  ArrowRight,
  BookOpen,
  Feather
} from 'lucide-react';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CulturalLibraryGrid } from './components/CulturalLibraryGrid';
import { WritingsView } from './components/WritingsView';
import { WritingDetailModal } from './components/WritingDetailModal';
import { CultureTraditionsView } from './components/CultureTraditionsView';
import { FestivalsView } from './components/FestivalsView';
import { CulturalGalleryView } from './components/CulturalGalleryView';
import { CulturalTimelineView } from './components/CulturalTimelineView';
import { AudioExperiencePlayer } from './components/AudioExperiencePlayer';

import { GeetOfTheDay } from './components/GeetOfTheDay';
import { GeetCard } from './components/GeetCard';
import { GeetDetailModal } from './components/GeetDetailModal';
import { ArticlesView } from './components/ArticlesView';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { BlogsView } from './components/BlogsView';
import { BlogDetailModal } from './components/BlogDetailModal';
import { PoetsView } from './components/PoetsView';
import { DictionaryModal } from './components/DictionaryModal';
import { SearchModal } from './components/SearchModal';
import { SubmitWorkView } from './components/SubmitWorkView';
import { AdminConsoleView } from './components/AdminConsoleView';
import { LoginView } from './components/LoginView';
import { Toast } from './components/Toast';
import { BirthdaySurpriseModal } from './components/BirthdaySurpriseModal';
import { BirthdayBanner } from './components/BirthdayBanner';

import { INITIAL_KUDMALI_GEET, INITIAL_SUBMISSIONS } from './data/kudmaliGeetData';
import { ARTICLES_DATA } from './data/articlesData';
import { BLOGS_DATA } from './data/blogsData';
import { KUDMALI_ICONS } from './data/kudmaliIconsData';
import { KUDMALI_WRITINGS } from './data/writingsData';
import { CULTURAL_TOPICS_DATA } from './data/cultureData';

import { 
  KudmaliGeet, 
  KudmaliArticle, 
  KudmaliBlog, 
  KudmaliScriptType, 
  Submission, 
  AppView, 
  KudmaliWriting 
} from './types';

export default function App() {
  const [view, setView] = useState<AppView>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeScript, setActiveScript] = useState<KudmaliScriptType>('devanagari');
  
  // Persistent Geet Data - Starts empty as requested; songs can be posted later
  const [geetList, setGeetList] = useState<KudmaliGeet[]>(() => {
    localStorage.removeItem('aalomoni_geet');
    const saved = localStorage.getItem('aalomoni_user_geet');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return INITIAL_KUDMALI_GEET; // []
  });

  // Persistent Articles Data
  const [articles, setArticles] = useState<KudmaliArticle[]>(() => {
    const saved = localStorage.getItem('aalomoni_articles');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return ARTICLES_DATA;
  });

  // Persistent Blogs Data
  const [blogs, setBlogs] = useState<KudmaliBlog[]>(() => {
    const saved = localStorage.getItem('aalomoni_blogs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return BLOGS_DATA;
  });

  // Persistent Submissions Data
  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    const saved = localStorage.getItem('aalomoni_submissions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_SUBMISSIONS;
  });

  // Liked Blog Ids
  const [likedBlogIds, setLikedBlogIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('aalomoni_liked_blogs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  });

  // Bookmarks for Geet
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('aalomoni_bookmarks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return ['geet-1'];
  });

  // Category & Tag filters for Geet
  const [selectedGeetCategory, setSelectedGeetCategory] = useState<string>('all');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // Modals state
  const [activeGeetDetail, setActiveGeetDetail] = useState<KudmaliGeet | null>(null);
  const [activeArticleDetail, setActiveArticleDetail] = useState<KudmaliArticle | null>(null);
  const [activeBlogDetail, setActiveBlogDetail] = useState<KudmaliBlog | null>(null);
  const [activeWritingDetail, setActiveWritingDetail] = useState<KudmaliWriting | null>(null);

  const [dictionaryOpen, setDictionaryOpen] = useState(false);
  const [dictionaryInitialWord, setDictionaryInitialWord] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Birthday Gift Surprise for Aarti Mahato
  const [birthdayModalOpen, setBirthdayModalOpen] = useState(() => {
    const openedBefore = localStorage.getItem('aalomoni_birthday_opened_v2');
    return !openedBefore;
  });

  // Banner visibility
  const [showBirthdayBanner, setShowBirthdayBanner] = useState(true);

  const handleCloseBirthdayModal = () => {
    setBirthdayModalOpen(false);
    localStorage.setItem('aalomoni_birthday_opened_v2', 'true');
  };

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('aalomoni_user_geet', JSON.stringify(geetList));
  }, [geetList]);

  useEffect(() => {
    localStorage.setItem('aalomoni_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('aalomoni_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('aalomoni_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('aalomoni_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('aalomoni_liked_blogs', JSON.stringify(likedBlogIds));
  }, [likedBlogIds]);

  // Handle Bookmarks Toggle
  const handleBookmarkToggle = (geetId: string) => {
    setBookmarks(prev => {
      if (prev.includes(geetId)) {
        setToastMessage('गीत पसंदीदा सूची से हटाया गया');
        return prev.filter(id => id !== geetId);
      } else {
        setToastMessage('गीत पसंदीदा सूची में जोड़ा गया ❤️');
        return [...prev, geetId];
      }
    });
  };

  // Handle Blog Like
  const handleLikeBlog = (blogId: string) => {
    if (likedBlogIds.includes(blogId)) {
      setLikedBlogIds(prev => prev.filter(id => id !== blogId));
      setBlogs(prev => prev.map(b => b.id === blogId ? { ...b, likes: Math.max(0, b.likes - 1) } : b));
    } else {
      setLikedBlogIds(prev => [...prev, blogId]);
      setBlogs(prev => prev.map(b => b.id === blogId ? { ...b, likes: b.likes + 1 } : b));
      setToastMessage('लेख को पसंद किया गया! ❤️');
    }
  };

  // Submit New Work
  const handleSubmitNewWork = (sub: Omit<Submission, 'id' | 'status' | 'submittedAt'>) => {
    const newSubmission: Submission = {
      ...sub,
      id: `sub-${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    setSubmissions(prev => [newSubmission, ...prev]);
    setToastMessage('रचना समीक्षा हेतु सुरक्षित रूप से जमा कर दी गई!');
    setView('home');
  };

  // Admin Actions
  const handleApproveSubmission = (id: string) => {
    const sub = submissions.find(s => s.id === id);
    if (!sub) return;

    if (sub.type === 'geet') {
      const newGeet: KudmaliGeet = {
        id: `geet-user-${Date.now()}`,
        title: {
          devanagari: sub.title,
          roman: sub.title,
          bengali: sub.title
        },
        poet: {
          devanagari: sub.authorName || 'अज्ञात कवि',
          roman: sub.authorName || 'Folk Bard',
          bengali: sub.authorName || 'অজ্ঞাত কবি'
        },
        category: (sub.category as any) || 'Jhumur',
        taalOrSur: 'Bhaduria Jhumur Sur',
        region: 'Manbhum / Jharkhand',
        verses: [
          {
            id: 'v1',
            devanagari: [sub.content.slice(0, 40), sub.content.slice(40, 80)],
            roman: [sub.content.slice(0, 40), sub.content.slice(40, 80)],
            bengali: [sub.content.slice(0, 40), sub.content.slice(40, 80)],
            meaning: sub.content
          }
        ],
        tags: [sub.category || 'Folk']
      };
      setGeetList(prev => [newGeet, ...prev]);
    } else if (sub.type === 'article') {
      const newArticle: KudmaliArticle = {
        id: `art-user-${Date.now()}`,
        title: sub.title,
        author: sub.authorName || 'अतिथि शोधकर्ता',
        authorRole: 'Community Contributor',
        publishedDate: new Date().toLocaleDateString('hi-IN'),
        readTime: '4 मिनट',
        category: 'History & Kudmi Heritage',
        excerpt: sub.content.slice(0, 120),
        sections: [
          {
            heading: sub.title,
            body: sub.content
          }
        ],
        tags: ['Folk', sub.category]
      };
      setArticles(prev => [newArticle, ...prev]);
    } else {
      const newBlog: KudmaliBlog = {
        id: `blg-user-${Date.now()}`,
        title: sub.title,
        author: sub.authorName || 'अतिथि लेखक',
        publishedDate: new Date().toLocaleDateString('hi-IN'),
        readTime: '3 मिनट',
        summary: sub.content.slice(0, 120),
        content: sub.content.split('\n\n').filter(p => p.trim()),
        tags: ['Musings', sub.category],
        likes: 1
      };
      setBlogs(prev => [newBlog, ...prev]);
    }

    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: 'approved' } : s));
    setToastMessage('रचना स्वीकृत कर आर्काइव में जोड़ दी गई!');
  };

  const handleRejectSubmission = (id: string) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: 'rejected' } : s));
    setToastMessage('रचना अस्वीकृत कर दी गई');
  };

  const handleDeleteSubmission = (id: string) => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
    setToastMessage('सबमिशन हटाया गया');
  };

  // Open dictionary for a specific word
  const handleOpenWordMeaning = (word: string) => {
    setDictionaryInitialWord(word);
    setDictionaryOpen(true);
  };

  // Filtered Geet List
  const filteredGeet = geetList.filter(geet => {
    if (showBookmarksOnly && !bookmarks.includes(geet.id)) return false;
    if (selectedGeetCategory !== 'all' && geet.category !== selectedGeetCategory) return false;
    return true;
  });

  const categories = [
    'all',
    'Jhumur',
    'Karam Geet',
    'Sohrai / Bandna',
    'Tusu Geet',
    'Biha Geet',
    'Sarhul / Baha',
    'Domkach'
  ];

  const glassClass = "bg-[#FAF7F2]/90 backdrop-blur-xl border border-[#E7DECD] shadow-sm rounded-3xl";
  const inputClass = "w-full bg-[#FAF7F2] border border-[#DDD3C2] rounded-2xl px-4 py-3 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-800/40 text-sm font-sans transition";

  return (
    <div className="min-h-screen bg-earthen-texture text-[#2D1E16] font-serif selection:bg-amber-100 selection:text-amber-900 pb-28">
      
      {/* Navbar with full navigation links, script toggle, search, dictionary, and gift trigger */}
      <Navbar
        currentView={view}
        onNavigate={(newView) => {
          setView(newView);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isLoggedIn={isLoggedIn}
        onLogout={() => {
          setIsLoggedIn(false);
          setToastMessage('लॉगआउट संपन्न हुआ');
        }}
        activeScript={activeScript}
        onScriptChange={setActiveScript}
        onOpenDictionary={() => setDictionaryOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBirthdaySurprise={() => setBirthdayModalOpen(true)}
        pendingCount={submissions.filter(s => s.status === 'pending').length}
      />

      {/* Main Content Area */}
      <main className="pt-24 sm:pt-28 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Subtle Birthday Banner */}
        <BirthdayBanner
          onOpenSurprise={() => setBirthdayModalOpen(true)}
          onDismiss={() => setShowBirthdayBanner(false)}
          visible={showBirthdayBanner}
        />

        {/* -------------------- VIEW 1: HOME PAGE -------------------- */}
        {view === 'home' && (
          <div className="space-y-16 animate-in fade-in duration-300">
            
            {/* Hero Section */}
            <HeroSection
              onExploreWritings={() => {
                setView('writings');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onDiscoverCulture={() => {
                setView('culture');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenBirthdaySurprise={() => setBirthdayModalOpen(true)}
              onSelectWord={handleOpenWordMeaning}
              activeScript={activeScript}
            />

            {/* Cultural Library Pillars Grid */}
            <CulturalLibraryGrid
              onNavigate={(targetView, categoryFilter) => {
                setView(targetView as AppView);
                if (targetView === 'geet' && categoryFilter) {
                  setSelectedGeetCategory(categoryFilter);
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Recent Writings Preview */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#EBE3D5] pb-3">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                    Aarti's Recent Writings & Tales
                  </h2>
                  <p className="text-xs font-sans text-stone-500 mt-0.5">
                    Soulful verses, village memoirs, and folklore reflections
                  </p>
                </div>
                <button
                  onClick={() => setView('writings')}
                  className="px-4 py-2 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-sans text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                >
                  <span>View All ({KUDMALI_WRITINGS.length})</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {KUDMALI_WRITINGS.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveWritingDetail(item)}
                    className="group bg-[#FAF7F2] hover:bg-white border border-[#E5DAC6] hover:border-amber-700/40 rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between cursor-pointer"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 text-[10px] font-sans font-bold uppercase tracking-wider">
                          {item.type}
                        </span>
                        <span className="text-[11px] font-sans text-stone-400">
                          {item.readTime}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-xl text-stone-900 group-hover:text-amber-950 transition-colors">
                        {item.title}
                      </h3>
                      {item.kudmaliTitle && (
                        <p className="font-serif italic text-xs text-amber-800">
                          {item.kudmaliTitle}
                        </p>
                      )}
                      <p className="text-stone-600 font-sans text-xs sm:text-sm line-clamp-3 leading-relaxed">
                        {item.originalText}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#EFE7D8] flex items-center justify-between text-xs font-sans">
                      <span className="text-stone-500 font-medium">By {item.author}</span>
                      <span className="font-bold text-amber-900 flex items-center gap-1 group-hover:underline">
                        Read Story <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Link Banner to Festivals & Traditions */}
            <div className="rounded-3xl bg-linear-to-r from-amber-900 via-[#3E2723] to-stone-900 text-amber-50 p-8 sm:p-12 shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-xs uppercase font-sans font-bold tracking-widest text-amber-300 block">
                  Agrarian Rhythms & Festivals
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-light text-white">
                  Discover Karam, Tusu & Sohrai
                </h3>
                <p className="text-xs sm:text-sm font-sans text-stone-300 max-w-xl leading-relaxed">
                  Learn about sacred practices, ancestral mythologies, seasonal blessings, and festival folk songs.
                </p>
              </div>
              <button
                onClick={() => setView('festivals')}
                className="px-6 py-3 rounded-2xl bg-amber-100 hover:bg-white text-stone-900 font-sans font-bold text-xs sm:text-sm transition shadow-md hover:scale-105 transform cursor-pointer shrink-0"
              >
                Explore Festivals 🌿
              </button>
            </div>

          </div>
        )}

        {/* -------------------- VIEW 2: WRITINGS (POEMS & STORIES) -------------------- */}
        {view === 'writings' && (
          <WritingsView
            writings={KUDMALI_WRITINGS}
            onSelectWriting={(item) => setActiveWritingDetail(item)}
            glassClass={glassClass}
          />
        )}

        {/* -------------------- VIEW 3: KUDMALI GEET (FOLK SONGS ARCHIVE) -------------------- */}
        {view === 'geet' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Header */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-sans text-xs font-semibold uppercase tracking-wider">
                <Music size={13} className="text-amber-800" />
                <span>Living Oral Archive</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif font-light text-stone-900 tracking-tight">
                Kudmali Folk Songs (कुड़मालि लोक-गीत)
              </h1>
              <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
                Oral verses preserved across generations — Jhumur, Karam, Sohrai, Tusu, and Biha songs, with line-by-line meanings and audio recitations.
              </p>
            </div>

            {/* Filter Pills and Bookmarks */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-y border-[#EBE3D5] py-4 font-sans text-xs">
              
              {/* Category selector */}
              <div className="flex flex-wrap gap-1.5 items-center justify-center md:justify-start">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedGeetCategory(cat);
                      setShowBookmarksOnly(false);
                    }}
                    className={`px-3.5 py-1.5 rounded-full transition cursor-pointer ${
                      selectedGeetCategory === cat && !showBookmarksOnly
                        ? 'bg-amber-900 text-white font-bold shadow-xs'
                        : 'bg-white/80 text-stone-600 hover:bg-white border border-[#DDD3C2]'
                    }`}
                  >
                    {cat === 'all' ? 'All Songs' : cat}
                  </button>
                ))}
              </div>

              {/* Bookmarks toggle */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition cursor-pointer ${
                    showBookmarksOnly
                      ? 'bg-amber-900 border-amber-900 text-white font-bold'
                      : 'bg-white/80 border-[#DDD3C2] text-stone-600 hover:bg-white'
                  }`}
                >
                  <Bookmark size={13} className={showBookmarksOnly ? 'fill-white' : ''} />
                  <span>Bookmarks ({bookmarks.length})</span>
                </button>
              </div>
            </div>

            {/* Geet Cards Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {filteredGeet.map(geet => (
                <GeetCard
                  key={geet.id}
                  geet={geet}
                  activeScript={activeScript}
                  onOpenGeet={(g) => setActiveGeetDetail(g)}
                  onBookmark={handleBookmarkToggle}
                  isBookmarked={bookmarks.includes(geet.id)}
                  onCopyNotice={(msg) => setToastMessage(msg)}
                  glassClass={glassClass}
                />
              ))}
            </div>

            {filteredGeet.length === 0 && (
              <div className="p-10 sm:p-14 text-center max-w-2xl mx-auto rounded-3xl bg-white/70 border border-[#E5DAC6] shadow-xs space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-amber-100 flex items-center justify-center mx-auto text-amber-900 shadow-2xs">
                  <Music size={28} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-2xl text-stone-900">
                    कुड़मालि लोक-गीत संग्रह
                  </h3>
                  <p className="text-stone-600 font-sans text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                    गीत अनुभाग तैयार है। आरती महतो एवं सहयोगियों द्वारा पारंपरिक झुमुर, करम, टुसू, बिहा और सोहराय गीत यहाँ शीघ्र प्रकाशित किए जाएंगे। आप भी नया गीत जोड़ सकते हैं।
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3 font-sans text-xs">
                  <button
                    onClick={() => {
                      setView('submit');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-[#3E2723] hover:bg-[#2D1E16] text-[#FAF7F2] font-bold shadow-xs transition cursor-pointer"
                  >
                    <PlusCircle size={14} className="text-amber-300" />
                    <span>+ नया गीत जोड़ें (Post a Geet)</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedGeetCategory('all');
                      setShowBookmarksOnly(false);
                      setView('festivals');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2.5 rounded-2xl bg-white hover:bg-stone-50 border border-[#D7CCA8] text-stone-800 font-semibold transition cursor-pointer"
                  >
                    पर्व एवं परंपराएं देखें (Festivals)
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------- VIEW 4: CULTURE & TRADITIONS -------------------- */}
        {view === 'culture' && (
          <CultureTraditionsView
            topics={CULTURAL_TOPICS_DATA}
            glassClass={glassClass}
          />
        )}

        {/* -------------------- VIEW 5: FESTIVALS & PARABS -------------------- */}
        {view === 'festivals' && (
          <FestivalsView
            glassClass={glassClass}
          />
        )}

        {/* -------------------- VIEW 6: ARTICLES -------------------- */}
        {view === 'articles' && (
          <ArticlesView
            articles={articles}
            onSelectArticle={(art) => setActiveArticleDetail(art)}
            glassClass={glassClass}
          />
        )}

        {/* -------------------- VIEW 7: BLOGS -------------------- */}
        {view === 'blogs' && (
          <BlogsView
            blogs={blogs}
            onSelectBlog={(blg) => setActiveBlogDetail(blg)}
            onLikeBlog={handleLikeBlog}
            likedBlogIds={likedBlogIds}
            glassClass={glassClass}
          />
        )}

        {/* -------------------- VIEW 8: GALLERY -------------------- */}
        {view === 'gallery' && (
          <CulturalGalleryView
            glassClass={glassClass}
          />
        )}

        {/* -------------------- VIEW 9: TIMELINE / FOLK HISTORY -------------------- */}
        {view === 'timeline' && (
          <CulturalTimelineView
            glassClass={glassClass}
          />
        )}

        {/* -------------------- VIEW 10: ARCHIVE & FOLK HISTORY -------------------- */}
        {view === 'about' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* Cultural Journey / Timeline */}
            <CulturalTimelineView
              glassClass={glassClass}
            />
          </div>
        )}

        {/* -------------------- VIEW 11: ICONS & POETS -------------------- */}
        {view === 'poets' && (
          <PoetsView
            icons={KUDMALI_ICONS}
            activeScript={activeScript}
            onSelectIcon={(id) => {
              const matchedGeet = geetList.find(g => g.poet.devanagari.includes('बिनु') || g.poet.devanagari.includes('गौरांगिया'));
              if (matchedGeet) {
                setActiveGeetDetail(matchedGeet);
              } else {
                setToastMessage('कवि की रचनाएं लोड की जा रही हैं...');
              }
            }}
            glassClass={glassClass}
          />
        )}

        {/* -------------------- VIEW 12: SUBMIT WORK -------------------- */}
        {view === 'submit' && (
          <SubmitWorkView
            onSubmit={handleSubmitNewWork}
            glassClass={glassClass}
            inputClass={inputClass}
          />
        )}

        {/* -------------------- VIEW 13: ADMIN CONSOLE -------------------- */}
        {view === 'admin' && (
          isLoggedIn ? (
            <AdminConsoleView
              submissions={submissions}
              onApprove={handleApproveSubmission}
              onReject={handleRejectSubmission}
              onDelete={handleDeleteSubmission}
              onBackToHome={() => setView('home')}
              glassClass={glassClass}
            />
          ) : (
            <LoginView
              onLoginSuccess={() => {
                setIsLoggedIn(true);
                setView('admin');
                setToastMessage('क्यूरेटर लॉगिन सफल!');
              }}
              onCancel={() => setView('home')}
              glassClass={glassClass}
              inputClass={inputClass}
            />
          )
        )}

        {/* -------------------- VIEW 14: LOGIN VIEW -------------------- */}
        {view === 'login' && (
          <LoginView
            onLoginSuccess={() => {
              setIsLoggedIn(true);
              setView('admin');
              setToastMessage('क्यूरेटर लॉगिन सफल!');
            }}
            onCancel={() => setView('home')}
            glassClass={glassClass}
            inputClass={inputClass}
          />
        )}

      </main>

      {/* Floating Audio Experience Player (Dockable bottom bar) */}
      <AudioExperiencePlayer />

      {/* --- Modals & Overlays --- */}

      {/* Writing Detail Reader Modal (Aarti's Poems & Stories) */}
      {activeWritingDetail && (
        <WritingDetailModal
          writing={activeWritingDetail}
          onClose={() => setActiveWritingDetail(null)}
          onCopyNotice={(msg) => setToastMessage(msg)}
        />
      )}

      {/* Geet Detail Lyric Reader Modal */}
      {activeGeetDetail && (
        <GeetDetailModal
          geet={activeGeetDetail}
          onClose={() => setActiveGeetDetail(null)}
          activeScript={activeScript}
          onScriptChange={setActiveScript}
          onSelectWord={handleOpenWordMeaning}
          onBookmark={handleBookmarkToggle}
          isBookmarked={bookmarks.includes(activeGeetDetail.id)}
          onCopyNotice={(msg) => setToastMessage(msg)}
        />
      )}

      {/* Article Detail Reader Modal */}
      {activeArticleDetail && (
        <ArticleDetailModal
          article={activeArticleDetail}
          onClose={() => setActiveArticleDetail(null)}
          onCopyNotice={(msg) => setToastMessage(msg)}
        />
      )}

      {/* Blog Detail Reader Modal */}
      {activeBlogDetail && (
        <BlogDetailModal
          blog={activeBlogDetail}
          onClose={() => setActiveBlogDetail(null)}
          onLike={handleLikeBlog}
          isLiked={likedBlogIds.includes(activeBlogDetail.id)}
          onCopyNotice={(msg) => setToastMessage(msg)}
        />
      )}

      {/* Kudmali Dictionary / Lexicon Modal */}
      <DictionaryModal
        isOpen={dictionaryOpen}
        onClose={() => setDictionaryOpen(false)}
        initialWord={dictionaryInitialWord}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        geetList={geetList}
        articles={articles}
        blogs={blogs}
        icons={KUDMALI_ICONS}
        activeScript={activeScript}
        onSelectGeet={(g) => setActiveGeetDetail(g)}
        onSelectArticle={(art) => setActiveArticleDetail(art)}
        onSelectBlog={(blg) => setActiveBlogDetail(blg)}
        onSelectIcon={(id) => {
          setView('poets');
        }}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Birthday Surprise Modal for Aarti Mahato */}
      <BirthdaySurpriseModal
        isOpen={birthdayModalOpen}
        onClose={handleCloseBirthdayModal}
        recipientName="Aarti Mahato"
      />

      {/* Footer */}
      <footer className="border-t border-[#EBE3D5] bg-[#F7F2E7]/80 backdrop-blur-md py-10 text-center font-sans text-xs text-stone-500 mt-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-stone-700">
            <Feather size={16} className="text-amber-800" />
            <span className="font-serif font-bold text-stone-900 text-sm">AALOMONI Digital Archive</span>
            <span className="text-stone-300">•</span>
            <span className="font-serif italic text-amber-900">A Cultural Home for Aarti's Writings</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-stone-500">
            <button onClick={() => setView('home')} className="hover:text-amber-900 cursor-pointer">Home</button>
            <button onClick={() => setView('writings')} className="hover:text-amber-900 cursor-pointer">Writings</button>
            <button onClick={() => setView('geet')} className="hover:text-amber-900 cursor-pointer">Kudmali Geet</button>
            <button onClick={() => setView('culture')} className="hover:text-amber-900 cursor-pointer">Culture</button>
            <button onClick={() => setView('festivals')} className="hover:text-amber-900 cursor-pointer">Festivals</button>
            <button onClick={() => setView('gallery')} className="hover:text-amber-900 cursor-pointer">Gallery</button>
            <button onClick={() => setView('timeline')} className="hover:text-amber-900 cursor-pointer">History</button>
            <button onClick={() => setDictionaryOpen(true)} className="hover:text-amber-900 cursor-pointer">Dictionary</button>
          </div>
        </div>

        {/* Aarti Mahato Birthday Dedication in Footer */}
        <div className="max-w-6xl mx-auto px-4 pt-4 mt-4 border-t border-[#E6DCC9] flex flex-wrap items-center justify-center gap-2 text-[11px] text-stone-500">
          <span>🎂 Dedicated with affectionate admiration and cultural pride as a Birthday Gift for <strong className="text-amber-950 font-serif">Aarti Mahato</strong></span>
          <span>•</span>
          <button
            onClick={() => setBirthdayModalOpen(true)}
            className="text-amber-800 hover:text-amber-950 font-semibold underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Revisit Birthday Gift 🎁</span>
          </button>
        </div>
      </footer>

    </div>
  );
}
