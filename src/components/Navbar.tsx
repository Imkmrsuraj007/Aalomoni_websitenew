import React, { useState } from 'react';
import { 
  Feather, 
  BookOpen, 
  Music, 
  Compass, 
  Calendar, 
  FileText, 
  Newspaper, 
  Camera, 
  Clock,
  User, 
  PlusCircle, 
  LogIn, 
  Search, 
  LogOut, 
  BookA, 
  Menu, 
  X, 
  Gift, 
  Sparkles,
  Home
} from 'lucide-react';
import { KudmaliScriptType, AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  activeScript: KudmaliScriptType;
  onScriptChange: (script: KudmaliScriptType) => void;
  onOpenDictionary: () => void;
  onOpenSearch: () => void;
  onOpenBirthdaySurprise?: () => void;
  pendingCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  isLoggedIn,
  onLogout,
  activeScript,
  onScriptChange,
  onOpenDictionary,
  onOpenSearch,
  onOpenBirthdaySurprise,
  pendingCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const glassClass = "bg-[#FAF7F2]/90 backdrop-blur-xl border border-[#E7DECD] shadow-lg rounded-2xl";

  const handleNav = (view: AppView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const navLinks: { view: AppView; label: string; icon: React.ReactNode }[] = [
    { view: 'home', label: 'Home', icon: <Home size={14} /> },
    { view: 'writings', label: 'Writings', icon: <BookOpen size={14} /> },
    { view: 'geet', label: 'Kudmali Geet', icon: <Music size={14} /> },
    { view: 'culture', label: 'Culture', icon: <Compass size={14} /> },
    { view: 'festivals', label: 'Festivals', icon: <Calendar size={14} /> },
    { view: 'blogs', label: 'Blogs', icon: <Newspaper size={14} /> },
    { view: 'gallery', label: 'Gallery', icon: <Camera size={14} /> },
    { view: 'timeline', label: 'History', icon: <Clock size={14} /> },
  ];

  return (
    <nav className="fixed top-2 md:top-4 left-1/2 -translate-x-1/2 w-[96%] max-w-7xl z-50 transition-all duration-300">
      <div className={`${glassClass} px-3.5 sm:px-5 py-2.5 flex justify-between items-center`}>
        
        {/* Brand & Logo */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          onClick={() => handleNav('home')}
        >
          <div className="w-9 h-9 rounded-xl bg-amber-800 text-white flex items-center justify-center group-hover:bg-amber-900 transition-colors shadow-xs">
            <Feather className="w-4 h-4 transition-transform group-hover:scale-110" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold tracking-tight text-stone-900 font-serif">AALOMONI</span>
              <span className="text-[10px] text-amber-800 font-serif font-bold uppercase tracking-wider hidden sm:inline-block">
                Archive
              </span>
            </div>
            <p className="text-[9px] text-stone-500 font-sans tracking-wider uppercase -mt-0.5 hidden md:block">
              Kudmali Cultural & Literary Home
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex gap-4 items-center font-sans text-xs font-semibold text-stone-600">
          {navLinks.map((item) => (
            <button
              key={item.view}
              onClick={() => handleNav(item.view)}
              className={`flex items-center gap-1.5 transition py-1 px-2 rounded-lg cursor-pointer ${
                currentView === item.view
                  ? 'text-amber-950 font-bold bg-amber-100/70 shadow-2xs'
                  : 'hover:text-amber-900 hover:bg-stone-100/60'
              }`}
            >
              <span className={currentView === item.view ? 'text-amber-800' : 'text-stone-400'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Medium-screen Compact Nav */}
        <div className="hidden lg:flex xl:hidden gap-3 items-center font-sans text-xs font-semibold text-stone-600">
          <button 
            onClick={() => handleNav('home')} 
            className={`transition py-1 px-1.5 rounded ${currentView === 'home' ? 'text-amber-950 font-bold bg-amber-100/70' : 'hover:text-amber-900'}`}
          >
            Home
          </button>
          <button 
            onClick={() => handleNav('writings')} 
            className={`transition py-1 px-1.5 rounded ${currentView === 'writings' ? 'text-amber-950 font-bold bg-amber-100/70' : 'hover:text-amber-900'}`}
          >
            Writings
          </button>
          <button 
            onClick={() => handleNav('geet')} 
            className={`transition py-1 px-1.5 rounded ${currentView === 'geet' ? 'text-amber-950 font-bold bg-amber-100/70' : 'hover:text-amber-900'}`}
          >
            Geet
          </button>
          <button 
            onClick={() => handleNav('culture')} 
            className={`transition py-1 px-1.5 rounded ${currentView === 'culture' ? 'text-amber-950 font-bold bg-amber-100/70' : 'hover:text-amber-900'}`}
          >
            Culture
          </button>
          <button 
            onClick={() => handleNav('festivals')} 
            className={`transition py-1 px-1.5 rounded ${currentView === 'festivals' ? 'text-amber-950 font-bold bg-amber-100/70' : 'hover:text-amber-900'}`}
          >
            Festivals
          </button>
          <button 
            onClick={() => handleNav('gallery')} 
            className={`transition py-1 px-1.5 rounded ${currentView === 'gallery' ? 'text-amber-950 font-bold bg-amber-100/70' : 'hover:text-amber-900'}`}
          >
            Gallery
          </button>
          <button 
            onClick={() => handleNav('timeline')} 
            className={`transition py-1 px-1.5 rounded ${currentView === 'timeline' ? 'text-amber-950 font-bold bg-amber-100/70' : 'hover:text-amber-900'}`}
          >
            History
          </button>
        </div>

        {/* Right Side Tools: Birthday Gift, Search, Dictionary, Script Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Subtle Birthday Gift Button */}
          {onOpenBirthdaySurprise && (
            <button
              onClick={onOpenBirthdaySurprise}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-linear-to-r from-amber-700 via-amber-800 to-rose-700 hover:from-amber-800 hover:to-rose-800 text-white font-sans text-xs font-bold shadow-xs hover:shadow-md transition transform hover:scale-105 active:scale-95 cursor-pointer"
              title="A Special Birthday Surprise for Aarti Mahato"
            >
              <Gift size={13} className="text-amber-200 animate-bounce" />
              <span className="hidden sm:inline">Aarti's Gift 🎁</span>
              <span className="sm:hidden text-[11px]">Gift 🎁</span>
            </button>
          )}

          {/* Script Selector Pill */}
          <div className="bg-stone-100/90 p-0.5 rounded-xl border border-stone-200/80 flex text-[10px] sm:text-[11px] font-sans font-medium">
            <button
              onClick={() => onScriptChange('devanagari')}
              className={`px-2 py-0.5 rounded-lg transition cursor-pointer ${
                activeScript === 'devanagari' 
                  ? 'bg-white shadow-2xs text-amber-950 font-bold' 
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="देवनागरी लिपि"
            >
              देव
            </button>
            <button
              onClick={() => onScriptChange('roman')}
              className={`px-2 py-0.5 rounded-lg transition cursor-pointer ${
                activeScript === 'roman' 
                  ? 'bg-white shadow-2xs text-amber-950 font-bold' 
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Roman Script"
            >
              Eng
            </button>
            <button
              onClick={() => onScriptChange('bengali')}
              className={`px-2 py-0.5 rounded-lg transition cursor-pointer ${
                activeScript === 'bengali' 
                  ? 'bg-white shadow-2xs text-amber-950 font-bold' 
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="বাংলা লিপি"
            >
              বাং
            </button>
          </div>

          {/* Dictionary Trigger */}
          <button
            onClick={onOpenDictionary}
            className="p-1.5 sm:p-2 text-stone-600 hover:text-amber-950 rounded-xl hover:bg-stone-100 transition cursor-pointer"
            title="Kudmali Dictionary (शब्दकोश)"
          >
            <BookA size={16} />
          </button>

          {/* Global Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-1.5 sm:p-2 text-stone-600 hover:text-amber-950 rounded-xl hover:bg-stone-100 transition cursor-pointer"
            title="Search Archive"
          >
            <Search size={16} />
          </button>

          {/* Submit Work button (Desktop) */}
          <button
            onClick={() => handleNav('submit')}
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 text-xs font-sans font-semibold rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
            title="Submit Folklore or Writing"
          >
            <PlusCircle size={14} className="text-amber-800" />
            <span className="hidden lg:inline">Submit</span>
          </button>

          {/* Admin / Login */}
          {isLoggedIn ? (
            <div className="flex items-center gap-1">
              <button 
                onClick={() => handleNav('admin')} 
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-sans font-semibold transition cursor-pointer ${
                  currentView === 'admin' 
                    ? 'bg-amber-900 text-white shadow-2xs' 
                    : 'bg-amber-100 text-amber-950 hover:bg-amber-200'
                }`}
                title="Curator Admin Panel"
              >
                <span>Curator</span>
                {pendingCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center font-bold">
                    {pendingCount}
                  </span>
                )}
              </button>
              <button
                onClick={onLogout}
                className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                title="Log Out"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => handleNav('login')} 
              className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-100 transition cursor-pointer hidden sm:block"
              title="Curator Login"
            >
              <LogIn size={15} />
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-stone-700 hover:text-stone-900 rounded-xl hover:bg-stone-100 transition cursor-pointer lg:hidden"
            title="Open Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 bg-[#FAF7F2]/95 backdrop-blur-xl border border-[#E7DECD] shadow-2xl rounded-3xl animate-in fade-in slide-in-from-top-3 duration-200 font-sans text-sm space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNav(item.view)}
                className={`flex items-center gap-2 p-2.5 rounded-xl font-medium transition cursor-pointer ${
                  currentView === item.view
                    ? 'bg-amber-900 text-white font-bold'
                    : 'bg-white/70 text-stone-700 hover:bg-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-200/60 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNav('submit')}
              className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-amber-50 text-amber-900 font-semibold text-xs border border-amber-200"
            >
              <PlusCircle size={14} />
              <span>Submit Writing</span>
            </button>

            {isLoggedIn ? (
              <button
                onClick={() => handleNav('admin')}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-amber-900 text-white font-semibold text-xs"
              >
                <span>Curator Panel</span>
                {pendingCount > 0 && <span>({pendingCount})</span>}
              </button>
            ) : (
              <button
                onClick={() => handleNav('login')}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-stone-100 text-stone-700 font-semibold text-xs"
              >
                <LogIn size={14} />
                <span>Curator Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
