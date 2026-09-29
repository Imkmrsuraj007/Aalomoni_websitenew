import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Sunset, 
  Moon, 
  CloudSun, 
  Sparkles, 
  Music, 
  Volume2, 
  VolumeX, 
  Copy, 
  Share2, 
  Check, 
  PlusCircle, 
  Calendar, 
  Clock, 
  Compass, 
  Leaf,
  Layers
} from 'lucide-react';
import { KudmaliScriptType, KudmaliGeet } from '../types';
import { speakPoetry, stopRecitation, isSpeaking } from '../utils/recitation';

export type TimePhase = 'morning' | 'afternoon' | 'evening' | 'night';

interface FrontDaySceneProps {
  activeScript: KudmaliScriptType;
  geetList: KudmaliGeet[];
  onNavigateToGeet: () => void;
  onNavigateToSubmit: () => void;
  onNavigateToCulture: () => void;
  onOpenGeetDetail?: (geet: KudmaliGeet) => void;
  onBookmarkGeet?: (id: string) => void;
  isGeetBookmarked?: (id: string) => boolean;
  onToast: (msg: string) => void;
  glassClass: string;
}

export const FrontDayScene: React.FC<FrontDaySceneProps> = ({
  activeScript,
  geetList,
  onNavigateToGeet,
  onNavigateToSubmit,
  onNavigateToCulture,
  onOpenGeetDetail,
  onBookmarkGeet,
  isGeetBookmarked,
  onToast,
  glassClass
}) => {
  // Determine real-time phase based on local hour
  const getRealTimePhase = (): TimePhase => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 20) return 'evening';
    return 'night';
  };

  const [selectedPhase, setSelectedPhase] = useState<TimePhase>(getRealTimePhase());
  const [isAutoLive, setIsAutoLive] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);

  // Periodically refresh phase if in auto live mode
  useEffect(() => {
    if (!isAutoLive) return;
    const interval = setInterval(() => {
      setSelectedPhase(getRealTimePhase());
    }, 60000);
    return () => clearInterval(interval);
  }, [isAutoLive]);

  // Day of week details
  const today = new Date();
  const dayIndex = today.getDay(); // 0 is Sunday

  const kudmaliDays = [
    {
      kudmali: 'एतबार (Etbar)',
      roman: 'Etbar (Sunday)',
      bengali: 'এতবার (রবিবার)',
      essence: 'हाट-बाजार आरु मेल-जोल केर दिन',
      tagline: 'Day of community gathering and village Haat'
    },
    {
      kudmali: 'सोमबार (Sombar)',
      roman: 'Sombar (Monday)',
      bengali: 'সোমবার (সোমবার)',
      essence: 'प्रकृति आरु जल-धाराक बंदना',
      tagline: 'Reverence of sacred hills and crystal streams'
    },
    {
      kudmali: 'मंगरबार (Mangarbar)',
      roman: 'Mangarbar (Tuesday)',
      bengali: 'মঙ্গরবার (মঙ্গলবার)',
      essence: 'धरती माए केर शक्ति आरु धीरज',
      tagline: 'Strength and endurance of Mother Earth'
    },
    {
      kudmali: 'बुधबार (Budhbar)',
      roman: 'Budhbar (Wednesday)',
      bengali: 'বুধবার (বুধবার)',
      essence: 'खेती-बारी आरु हरियालीक चिंतन',
      tagline: 'Care for green shoots and fertile soil'
    },
    {
      kudmali: 'बिहिबार (Bihibar)',
      roman: 'Bihibar (Thursday)',
      bengali: 'বিহিবার (বৃহস্পতিবার)',
      essence: 'संस्कार आरु पुरखाक सुमिरन',
      tagline: 'Remembrance of ancestors and folk roots'
    },
    {
      kudmali: 'सुकुरबार (Sukurbar)',
      roman: 'Sukurbar (Friday)',
      bengali: 'সুকুরবার (শুক্রবার)',
      essence: 'मांदर, झांझ आरु आखड़ाक सिंगार',
      tagline: 'Rhythm of Mandar drums and Akhra resonance'
    },
    {
      kudmali: 'सुनिचर (Sunichar)',
      roman: 'Sunichar (Saturday)',
      bengali: 'সুনিচর (শনিবার)',
      essence: 'ग्राम-देवता आरु जाहेरथान केर नेग',
      tagline: 'Sacred grove peace and ancestral shelter'
    }
  ];

  const currentDayInfo = kudmaliDays[dayIndex];

  // Atmospheric Scenes Data for the 4 periods of the day
  const scenes = {
    morning: {
      id: 'morning',
      phaseName: {
        devanagari: 'बिहान / प्रभात (Bihan)',
        roman: 'Bihan (Dawn & Morning)',
        bengali: 'বিহান / প্রভাত (Bihan)'
      },
      timeRange: '05:00 — 11:59',
      icon: <Sun className="w-5 h-5 text-amber-600 animate-spin-slow" />,
      skyDescription: 'Golden morning light filtering through sacred Sal canopies, bird song across the Akhra',
      cardGradient: 'bg-linear-to-br from-amber-50 via-orange-50/60 to-[#FDFBF7] border-amber-200/90 text-stone-900',
      badgeBg: 'bg-amber-100/90 text-amber-950 border-amber-300/80',
      glowColor: 'bg-amber-400/20',
      verse: {
        devanagari: [
          'धरम सुरुज उगल रे, माटिर सनेह जागल।',
          'बिहानेर शीतल बातास, सारजोम गाछेक छांवे नविन आस।'
        ],
        roman: [
          'Dhorom suruj ugal re, maatir sneh jaagal.',
          'Bihaaner sheetal baataas, saarjom gaachek chaanve navin aas.'
        ],
        bengali: [
          'ধরম সুরুজ উগল রে, মাটির সনেহ জাগল।',
          'বিহানের শীতল বাতাস, সারজোম গাছের ছাঁওয়ে নবীন আস।'
        ],
        meaning: 'The sacred sun ascends in golden radiance; the village awakens with devotion to the soil. In the morning breeze under the Sal trees, new hope blooms.'
      },
      proverb: {
        devanagari: 'बिहानेर काज, दिनभर केर ताज।',
        roman: 'Bihaaner kaaj, dinbhor ker taaj.',
        meaning: 'A mindful morning step sets harmony for the entire day.'
      }
    },
    afternoon: {
      id: 'afternoon',
      phaseName: {
        devanagari: 'दुपहरिया / माझ-दिन (Dupahar)',
        roman: 'Dupahar (Midday Sun)',
        bengali: 'দুপহরিয়া (Dupahar)'
      },
      timeRange: '12:00 — 16:59',
      icon: <CloudSun className="w-5 h-5 text-amber-700" />,
      skyDescription: 'Sunlit terracotta courtyards, rustle of dry Mahua boughs, steady agrarian pulse',
      cardGradient: 'bg-linear-to-br from-amber-100/50 via-[#FAF7F2] to-amber-50/70 border-[#DFCDB2] text-stone-900',
      badgeBg: 'bg-amber-200/80 text-amber-950 border-amber-300',
      glowColor: 'bg-amber-500/20',
      verse: {
        devanagari: [
          'माटिक गंध, रोदेर तेज, कर्मेर धर्म महान।',
          'खेत-खामारे हामार जीवन, माटिए हामार जान।'
        ],
        roman: [
          'Maatik gondho, roder tej, kormer dhorom mohaan.',
          'Khet-khaamaare haamaar jeevan, maatie haamaar jaan.'
        ],
        bengali: [
          'মাটির গন্ধ, রোদের তেজ, কর্মের ধরম মহান।',
          'খেত-খামারে হামার জীবন, মাটিতে হামার জান।'
        ],
        meaning: 'The scent of warm earth and the strength of the sun honor agrarian labor. In the fields and courtyards breathes our collective vitality.'
      },
      proverb: {
        devanagari: 'माटि संगे जेकर मिता, सेहे हेक जगतेर दाता।',
        roman: 'Maati songe jekar mita, sehe hek jogoter daata.',
        meaning: 'One who remains faithful to the earth nurtures the living world.'
      }
    },
    evening: {
      id: 'evening',
      phaseName: {
        devanagari: 'साँझ / गोधूली (Sanjh)',
        roman: 'Sanjh (Twilight & Dusk)',
        bengali: 'সাঁঝ / গোধূলী (Sanjh)'
      },
      timeRange: '17:00 — 19:59',
      icon: <Sunset className="w-5 h-5 text-rose-600" />,
      skyDescription: 'Vermilion twilight, returning cowherds with dust bells, oil lamps illuminating Jahersthan',
      cardGradient: 'bg-linear-to-br from-rose-50/80 via-amber-50/70 to-[#FDFBF7] border-rose-200/80 text-stone-900',
      badgeBg: 'bg-rose-100/90 text-rose-950 border-rose-300/80',
      glowColor: 'bg-rose-400/20',
      verse: {
        devanagari: [
          'साँझेर दिया बाले, गांवेर आखड़ा सजे।',
          'मांदरेर आकुति सुनि, घरे-घरे हुलास जागे।'
        ],
        roman: [
          'Saanjher diya baale, gaanver aakhra saje.',
          'Maanderer aakuti suni, ghare-ghare hulaas jaage.'
        ],
        bengali: [
          'সাঁঝের দিয়া বালে, গাঁওয়ের আখড়া সাজে।',
          'মান্দারের আকুতি শুনি, ঘরে-ঘরে হুলাস জাগে।'
        ],
        meaning: 'The evening earthen lamps are lit; the village akhra gathers for song. Hearing the reverberation of the Mandar drum, joyful warmth stirs in every home.'
      },
      proverb: {
        devanagari: 'साँझेर आखड़ा, मनेर साथी।',
        roman: 'Saanjher aakhra, moner saathi.',
        meaning: 'The evening akhra is the soul’s truest refuge.'
      }
    },
    night: {
      id: 'night',
      phaseName: {
        devanagari: 'राति / चांदनि (Rati)',
        roman: 'Rati (Starlit Night)',
        bengali: 'রাতি / চাঁদনি (Rati)'
      },
      timeRange: '20:00 — 04:59',
      icon: <Moon className="w-5 h-5 text-indigo-400" />,
      skyDescription: 'Moonlit Sal forest canopy, starlight over Subarnarekha, quiet nocturnal stillness',
      cardGradient: 'bg-linear-to-br from-[#1E1815] via-[#2A1F1B] to-[#17120F] border-amber-900/40 text-amber-50',
      badgeBg: 'bg-amber-950/90 text-amber-200 border-amber-800/60',
      glowColor: 'bg-indigo-600/20',
      verse: {
        devanagari: [
          'चांदनि राते सारजोम वन, शांत हामार देस।',
          'पुरखाक आसीस झरे, मिटे सब कलेस।'
        ],
        roman: [
          'Chaandni raate saarjom bon, shaanto haamaar des.',
          'Purkhaak aasees jhore, mite sob koles.'
        ],
        bengali: [
          'চাঁদনি রাতে সারজোম বন, শান্ত হামার দেস।',
          'পুরখার আসীস ঝরে, মিটে সব কলেস।'
        ],
        meaning: 'Under the silver moonlight, the Sal forest and our lands embrace serenity. Ancestral blessings descend like gentle mist, dissolving all sorrow.'
      },
      proverb: {
        devanagari: 'रातिक निंद, पुरखाक आसीस।',
        roman: 'Raatik nind, purkhaak aasees.',
        meaning: 'Night’s peaceful rest is watched over by ancestors.'
      }
    }
  };

  const currentScene = scenes[selectedPhase];
  const isNightTheme = selectedPhase === 'night';

  const verseLines = currentScene.verse[activeScript] || currentScene.verse.devanagari;
  const phaseTitle = currentScene.phaseName[activeScript] || currentScene.phaseName.devanagari;

  const handleReciteVerse = () => {
    if (isPlayingAudio) {
      stopRecitation();
      setIsPlayingAudio(false);
    } else {
      const textToRecite = `${verseLines[0]} ... ${verseLines[1]}`;
      const lang = activeScript === 'bengali' ? 'bn-IN' : 'hi-IN';
      const success = speakPoetry(
        textToRecite,
        lang,
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false)
      );
      if (success) setIsPlayingAudio(true);
    }
  };

  const handleCopyScene = () => {
    const text = `"${verseLines[0]}\n${verseLines[1]}"\n— ${phaseTitle} (${currentDayInfo.kudmali} • Aalomoni Kudmali Archive)\n"${currentScene.verse.meaning}"`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    onToast('आज का दृश्य एवं भाव कॉपी कर लिया गया!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareScene = () => {
    const shareText = `"${verseLines[0]}\n${verseLines[1]}"\n— ${phaseTitle} (${currentDayInfo.kudmali} • Aalomoni Kudmali Archive)`;
    if (navigator.share) {
      navigator.share({
        title: `Kudmali Day Scene: ${phaseTitle}`,
        text: shareText,
        url: window.location.href
      }).catch(() => {});
    } else {
      handleCopyScene();
    }
  };

  // Check if there are any geet in the archive
  const hasGeet = geetList && geetList.length > 0;
  const featuredGeet = hasGeet ? geetList[0] : null;

  return (
    <section className="relative overflow-hidden rounded-3xl border transition-all duration-700 shadow-sm hover:shadow-md">
      {/* Background card styling */}
      <div className={`p-6 sm:p-10 md:p-12 relative overflow-hidden ${currentScene.cardGradient}`}>
        
        {/* Ambient atmospheric blur */}
        <div className={`absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none ${currentScene.glowColor}`} />
        <div className={`absolute -bottom-16 -left-16 w-64 h-64 rounded-full blur-3xl pointer-events-none ${currentScene.glowColor}`} />

        {/* Top Header Bar: Day of Week & Live Scene Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-5 mb-6 border-stone-200/40 dark:border-stone-800">
          
          {/* Day of Week & Date */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
              isNightTheme ? 'bg-amber-950/70 border-amber-800/80 text-amber-300' : 'bg-white/90 border-[#E2D6C3] text-amber-900'
            }`}>
              <Calendar size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-serif font-bold ${isNightTheme ? 'text-amber-200' : 'text-stone-900'}`}>
                  {currentDayInfo.kudmali}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${currentScene.badgeBg} font-semibold`}>
                  {currentScene.timeRange}
                </span>
              </div>
              <p className={`text-xs ${isNightTheme ? 'text-stone-400' : 'text-stone-600'}`}>
                {currentDayInfo.essence} • {today.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Time-of-Day Scene Selector Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-black/5 dark:bg-white/10 backdrop-blur-xs text-xs font-sans">
            <button
              onClick={() => {
                setIsAutoLive(true);
                setSelectedPhase(getRealTimePhase());
              }}
              title="Sync with real clock time"
              className={`px-2.5 py-1 rounded-xl transition cursor-pointer flex items-center gap-1 ${
                isAutoLive 
                  ? 'bg-amber-900 text-white font-bold shadow-2xs' 
                  : (isNightTheme ? 'text-stone-300 hover:text-white' : 'text-stone-600 hover:text-stone-900')
              }`}
            >
              <Clock size={12} />
              <span>Auto Live</span>
            </button>

            {(['morning', 'afternoon', 'evening', 'night'] as TimePhase[]).map((phase) => (
              <button
                key={phase}
                onClick={() => {
                  setIsAutoLive(false);
                  setSelectedPhase(phase);
                }}
                className={`px-2.5 py-1 rounded-xl capitalize transition cursor-pointer ${
                  selectedPhase === phase && !isAutoLive
                    ? 'bg-amber-800 text-white font-bold shadow-2xs'
                    : (isNightTheme ? 'text-stone-300 hover:text-white' : 'text-stone-600 hover:text-stone-900')
                }`}
              >
                {phase === 'morning' && 'बिहान'}
                {phase === 'afternoon' && 'दुपहर'}
                {phase === 'evening' && 'साँझ'}
                {phase === 'night' && 'राति'}
              </button>
            ))}
          </div>

        </div>

        {/* Center Main Stage: The Living Front Scene of the Day */}
        <div className="text-center max-w-3xl mx-auto space-y-6 my-4">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-2xs font-sans text-xs font-semibold tracking-wide uppercase">
            <span className="shrink-0">{currentScene.icon}</span>
            <span className={isNightTheme ? 'text-amber-200' : 'text-amber-950'}>
              दृश्य एवं सुर (Scene of the Hour) • {phaseTitle}
            </span>
          </div>

          {/* Sky & Landscape description */}
          <p className={`text-xs sm:text-sm font-sans italic max-w-xl mx-auto ${isNightTheme ? 'text-stone-400' : 'text-stone-600'}`}>
            "{currentScene.skyDescription}"
          </p>

          {/* Main Couplet / Poetic Verse */}
          <div className="space-y-3 py-2">
            <p className={`text-2xl sm:text-3xl md:text-4xl font-serif font-light leading-relaxed tracking-wide ${
              isNightTheme ? 'text-amber-100' : 'text-stone-900'
            }`}>
              {verseLines[0]}
            </p>
            <p className={`text-2xl sm:text-3xl md:text-4xl font-serif font-light leading-relaxed tracking-wide ${
              isNightTheme ? 'text-amber-200' : 'text-stone-800'
            }`}>
              {verseLines[1]}
            </p>
          </div>

          {/* Meaning translation */}
          <div className={`max-w-2xl mx-auto p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
            isNightTheme 
              ? 'bg-stone-900/80 border-amber-900/40 text-stone-300' 
              : 'bg-white/80 border-[#EAE0D0] text-stone-700 shadow-2xs'
          }`}>
            <span className="font-semibold block mb-1 text-amber-800 dark:text-amber-300">
              🌾 भावार्थ (Living Meaning):
            </span>
            <span>{currentScene.verse.meaning}</span>
          </div>

          {/* Kudmali Saying / Ahra for this scene */}
          <div className="flex items-center justify-center gap-2 text-xs font-sans">
            <Leaf size={13} className="text-amber-700" />
            <span className={`font-serif italic ${isNightTheme ? 'text-stone-400' : 'text-stone-600'}`}>
              लोकोक्ति (Ahra): <strong className={isNightTheme ? 'text-amber-200' : 'text-stone-900'}>{currentScene.proverb.devanagari}</strong> — {currentScene.proverb.meaning}
            </span>
          </div>

        </div>

        {/* Action Controls for the Day Scene */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-stone-200/40 dark:border-stone-800 font-sans text-xs">
          
          {/* Recite Audio Button */}
          <button
            onClick={handleReciteVerse}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition cursor-pointer ${
              isPlayingAudio
                ? 'bg-rose-700 text-white'
                : (isNightTheme ? 'bg-amber-900 hover:bg-amber-800 text-amber-100' : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300')
            }`}
          >
            {isPlayingAudio ? (
              <>
                <VolumeX size={15} />
                <span>Stop Recitation</span>
              </>
            ) : (
              <>
                <Volume2 size={15} />
                <span>Listen to Verse</span>
              </>
            )}
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopyScene}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition cursor-pointer ${
              isNightTheme 
                ? 'bg-stone-900 hover:bg-stone-800 border-stone-700 text-stone-200' 
                : 'bg-white hover:bg-stone-50 border-[#DDD3C2] text-stone-700'
            }`}
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShareScene}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition cursor-pointer ${
              isNightTheme 
                ? 'bg-stone-900 hover:bg-stone-800 border-stone-700 text-stone-200' 
                : 'bg-white hover:bg-stone-50 border-[#DDD3C2] text-stone-700'
            }`}
          >
            <Share2 size={14} />
            <span>Share</span>
          </button>

        </div>

        {/* Section Notice: Kudmali Geet Archive Status & Post Option */}
        <div className={`mt-8 pt-6 border-t rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 ${
          isNightTheme 
            ? 'bg-stone-900/60 border-amber-900/30' 
            : 'bg-[#F9F5EC] border-[#E8DDCA]'
        }`}>
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              isNightTheme ? 'bg-amber-950 text-amber-300' : 'bg-amber-100 text-amber-900'
            }`}>
              <Music size={18} />
            </div>
            <div>
              <p className={`text-xs font-semibold ${isNightTheme ? 'text-amber-200' : 'text-stone-900'}`}>
                {hasGeet 
                  ? `कुड़मालि लोक-गीत संग्रह • ${geetList.length} Songs in Archive` 
                  : 'कुड़मालि लोक-गीत संग्रह अनुभाग (Kudmali Geet Section Ready)'}
              </p>
              <p className={`text-[11px] ${isNightTheme ? 'text-stone-400' : 'text-stone-600'}`}>
                {hasGeet 
                  ? 'Folk songs are archived with line-by-line meanings and audio.' 
                  : 'Folk songs will be published here soon by Aarti Mahato & contributors. You can also post new geet anytime.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onNavigateToGeet}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                isNightTheme 
                  ? 'bg-stone-800 hover:bg-stone-700 text-amber-200 border border-stone-700' 
                  : 'bg-white hover:bg-stone-100 text-stone-800 border border-[#DDD3C2]'
              }`}
            >
              Browse Geet Section
            </button>
            <button
              onClick={onNavigateToSubmit}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#3E2723] hover:bg-[#2D1E16] text-[#FAF7F2] transition shadow-xs cursor-pointer"
            >
              <PlusCircle size={13} className="text-amber-300" />
              <span>Post a Geet</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
