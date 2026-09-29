import React, { useState } from 'react';
import { 
  Music, 
  Feather, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Share2, 
  Sparkles, 
  Heart,
  BookOpen
} from 'lucide-react';
import { KudmaliScriptType } from '../types';
import { speakPoetry, stopRecitation, isSpeaking } from '../utils/recitation';

interface AalomoniPoetrySectionProps {
  activeScript: KudmaliScriptType;
  onScriptChange: (script: KudmaliScriptType) => void;
  onToast: (msg: string) => void;
  glassClass: string;
}

export const AalomoniPoetrySection: React.FC<AalomoniPoetrySectionProps> = ({
  activeScript,
  onScriptChange,
  onToast,
  glassClass
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeVerseIndex, setActiveVerseIndex] = useState(0);

  const poetryData = {
    title: {
      devanagari: 'आलोमोनि तोर नावे झुमुर बाजे',
      roman: 'Aalomoni Tor Naame Jhumur Baaje',
      bengali: 'আলোমনি তোর নামে ঝুমুর বাজে'
    },
    raga: 'भादुरिया झुमुर (Bhaduria Jhumur)',
    region: 'मानभूम — छोटानागपुर (Manbhum — Chotanagpur)',
    verses: [
      {
        id: 1,
        devanagari: [
          'आलोमोनि तोर नावे मांदर बाजे आखड़ा माँझे रे,',
          'भादर मासे मेघ गाजे, मनेर हुलास जागे रे।'
        ],
        roman: [
          'Aalomoni tor naame mandar baaje akhra maanjhe re,',
          'Bhadar maase megh gaaje, moner hulaas jaage re.'
        ],
        bengali: [
          'আলোমনি তোর নামে মান্দার বাজে আখড়া মাঝে রে,',
          'ভাদর মাসে মেঘ গাজে, মনের হুলাস জাগে রে।'
        ],
        meaning: 'O Aalomoni, in your honor the sacred Mandar drum echoes in the village akhra; the monsoon clouds roar in Bhado, awakening joy in the soul.'
      },
      {
        id: 2,
        devanagari: [
          'हाते धरि हाते जोड़ी, गोल हए घूरि-घूरि,',
          'कासी-फूल फूटे उठलक, नदी-नाला भरि-भरि।'
        ],
        roman: [
          'Haate dhori haate jori, gol hoye ghoori-ghoori,',
          'Kaasi-phool phoote uthlok, nodi-naala bhori-bhori.'
        ],
        bengali: [
          'হাতে ধরি হাতে জোড়ী, গোল হয়ে ঘূরি-ঘূরি,',
          'কাশী-ফুল ফুটে উঠলক, নদী-নালা ভরি-ভরি।'
        ],
        meaning: 'Clasping hands in a circular ring, moving in sync to the rhythmic cadence; the white Kans grass has blossomed, filling the overflowing streams.'
      },
      {
        id: 3,
        devanagari: [
          'मांदरेर ताले ताले, धुमसा डाके गुरु-गुरु,',
          'झुमुर गित गाई-गाई, राति हये शुरू रे।'
        ],
        roman: [
          'Maanderer taale taale, dhumsa daake guru-guru,',
          'Jhumur geet gaayi-gaayi, raati hoye shuru re.'
        ],
        bengali: [
          'মান্দারের তালে তালে, ধুমসা ডাকে গুরু-গুরু,',
          'ঝুমুর গীত গাই-গাই, রাতি হয়ে শুরু রে।'
        ],
        meaning: 'To the rhythm of the Mandar and the deep resonance of the Dhumsa drum, singing Jhumur songs as the night begins to awaken.'
      }
    ]
  };

  const currentTitle = poetryData.title[activeScript] || poetryData.title.devanagari;

  const handleRecite = () => {
    if (isPlaying) {
      stopRecitation();
      setIsPlaying(false);
    } else {
      const allVersesText = poetryData.verses.map(v => {
        const lines = v[activeScript] || v.devanagari;
        return `${lines[0]} ... ${lines[1]}`;
      }).join(' ... ');

      const lang = activeScript === 'bengali' ? 'bn-IN' : 'hi-IN';
      const success = speakPoetry(
        allVersesText,
        lang,
        () => setIsPlaying(false),
        () => setIsPlaying(false)
      );
      if (success) setIsPlaying(true);
    }
  };

  const handleCopyPoetry = () => {
    const fullText = poetryData.verses.map(v => {
      const lines = v[activeScript] || v.devanagari;
      return `${lines[0]}\n${lines[1]}`;
    }).join('\n\n');

    const copyBody = `"${poetryData.title[activeScript]}"\nताल: ${poetryData.raga}\n\n${fullText}\n\n— Aalomoni Kudmali Oral Literary Heritage`;
    navigator.clipboard.writeText(copyBody);
    setCopied(true);
    onToast('कविता कॉपी कर ली गई!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSharePoetry = () => {
    const fullText = poetryData.verses.map(v => {
      const lines = v[activeScript] || v.devanagari;
      return `${lines[0]}\n${lines[1]}`;
    }).join('\n\n');

    const shareBody = `"${poetryData.title[activeScript]}"\n\n${fullText}\n\n— Aalomoni Kudmali Archive`;
    if (navigator.share) {
      navigator.share({
        title: poetryData.title[activeScript],
        text: shareBody,
        url: window.location.href
      }).catch(() => {});
    } else {
      handleCopyPoetry();
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#E4DAC7] bg-[#FAF7F2] shadow-sm hover:shadow-md transition-shadow">
      {/* Decorative Traditional Motifs Background */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-linear-to-r from-amber-700 via-rose-600 to-amber-700 opacity-90" />
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="p-6 sm:p-10 md:p-12 relative">
        
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-8 border-b border-[#EAE0D0]">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/90 border border-amber-200 text-amber-950 font-sans text-xs font-semibold uppercase tracking-wider">
            <Feather size={13} className="text-amber-800" />
            <span>हामार माटिर अमर सुर • Signature Poetry</span>
          </div>

          {/* Trilingual script toggle pill */}
          <div className="flex items-center gap-1 bg-white/90 p-1 rounded-2xl border border-[#DCD2C0] shadow-2xs text-xs font-sans">
            <button
              onClick={() => onScriptChange('devanagari')}
              className={`px-3 py-1 rounded-xl transition cursor-pointer font-medium ${
                activeScript === 'devanagari'
                  ? 'bg-amber-900 text-white font-bold shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              देवनागरी
            </button>
            <button
              onClick={() => onScriptChange('roman')}
              className={`px-3 py-1 rounded-xl transition cursor-pointer font-medium ${
                activeScript === 'roman'
                  ? 'bg-amber-900 text-white font-bold shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Roman
            </button>
            <button
              onClick={() => onScriptChange('bengali')}
              className={`px-3 py-1 rounded-xl transition cursor-pointer font-medium ${
                activeScript === 'bengali'
                  ? 'bg-amber-900 text-white font-bold shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              বাংলা
            </button>
          </div>

        </div>

        {/* Center Poetry Presentation */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          {/* Main Title & Folk Details */}
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#2D1E16] tracking-tight">
              {currentTitle}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-sans text-amber-900/90 font-medium">
              <span className="flex items-center gap-1">
                <Music size={13} className="text-amber-700" />
                <span>सुर/राग: {poetryData.raga}</span>
              </span>
              <span>•</span>
              <span>क्षेत्र: {poetryData.region}</span>
            </div>
          </div>

          {/* Verses Stack */}
          <div className="py-4 space-y-8">
            {poetryData.verses.map((verse, idx) => {
              const lines = verse[activeScript] || verse.devanagari;
              return (
                <div 
                  key={verse.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white/60 border border-[#ECE2D2] hover:bg-white transition-colors duration-200 shadow-2xs space-y-3"
                >
                  <div className="space-y-2">
                    <p className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-stone-900 leading-relaxed tracking-wide">
                      {lines[0]}
                    </p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-stone-800 leading-relaxed tracking-wide">
                      {lines[1]}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-stone-600 italic max-w-xl mx-auto pt-1">
                    "{verse.meaning}"
                  </p>
                </div>
              );
            })}
          </div>

          {/* Cultural Context Note */}
          <div className="p-4 rounded-2xl bg-[#F4EFE6] border border-[#E3D8C5] text-stone-700 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto text-left">
            <div className="flex items-center gap-1.5 font-semibold text-amber-900 mb-1">
              <Sparkles size={14} className="text-rose-600" />
              <span>सांस्कृतिक प्रसंग (Cultural Essence):</span>
            </div>
            <p>
              कुड़मालि लोक-संस्कृति में <strong>'आलोमोनि'</strong> (प्रकाश की मणि / स्नेह का प्रतीक) आखड़ा के उल्लास, मांदर की गूंज और भादो मास के बादलों के आगमन के साथ अंतर्मन के जागरण का प्रतीक है। यह रचना मानभूम के लोक-कवियों द्वारा मौखिक परंपरा में गाई जाती रही है।
            </p>
          </div>

          {/* Audio & Action Toolbar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 font-sans text-xs">
            <button
              onClick={handleRecite}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold shadow-xs transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-rose-700 text-white'
                  : 'bg-[#3E2723] hover:bg-[#2D1E16] text-[#FAF7F2]'
              }`}
            >
              {isPlaying ? (
                <>
                  <VolumeX size={15} />
                  <span>Stop Recitation</span>
                </>
              ) : (
                <>
                  <Volume2 size={15} className="text-amber-300" />
                  <span>Listen to Full Poetry</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyPoetry}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white hover:bg-stone-50 border border-[#D7CCA8] text-stone-700 font-medium transition cursor-pointer"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy Poetry'}</span>
            </button>

            <button
              onClick={handleSharePoetry}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white hover:bg-stone-50 border border-[#D7CCA8] text-stone-700 font-medium transition cursor-pointer"
            >
              <Share2 size={14} />
              <span>Share</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
