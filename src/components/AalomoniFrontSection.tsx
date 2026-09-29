import React, { useState } from 'react';
import { 
  Music, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Share2, 
  Bookmark, 
  BookOpen, 
  Feather,
  Languages,
  ChevronDown
} from 'lucide-react';
import { KudmaliScriptType } from '../types';
import { speakPoetry, stopRecitation, isSpeaking } from '../utils/recitation';

interface AalomoniFrontSectionProps {
  activeScript: KudmaliScriptType;
  onScriptChange: (script: KudmaliScriptType) => void;
  onSelectWord: (wordKey: string) => void;
  onToast: (msg: string) => void;
  glassClass: string;
}

export const AalomoniFrontSection: React.FC<AalomoniFrontSectionProps> = ({
  activeScript,
  onScriptChange,
  onSelectWord,
  onToast,
  glassClass
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showFullMeaning, setShowFullMeaning] = useState(true);

  // Couplet lines in the three scripts
  const couplet = {
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
    ]
  };

  const lines = couplet[activeScript] || couplet.devanagari;

  // Kudmali Meaning & Word breakdown
  const kudmaliMeaning = {
    kudmaliExplanation: 'हे आलोमोनि, तोर नावे (तोर सम्माने) गांवेक आखड़ाक माँझे मांदर बाजेक धमक गुंजि उठलक। भादर मासेर बरखाक मेघ गाजैत है आरु मनेर भितरे आनंद आरु हुलास जागी गेलक।',
    kudmaliExplanationRoman: 'He Aalomoni, tor naame (tor sommane) gaanvek akhrak maanjhe mandar baajek dhomok gunji uthlok. Bhadar maaser borkhaak megh gaajait hai aaru moner bhitore aanondo aaru hulaas jaagi gelok.',
    hindiMeaning: 'हे आलोमोनि, तुम्हारे नाम पर गांव के पवित्र आखड़ा में मांदर बज रहा है। भादो मास में मेघ गरज रहे हैं और मन में असीम आनंद और उल्लास जाग उठा है।',
    englishMeaning: 'O Aalomoni, in your honor the sacred Mandar drum resonates in the heart of the village akhra; the monsoon clouds roar in Bhado, awakening boundless joy in the soul.'
  };

  // Important Kudmali vocabulary in this couplet
  const words = [
    {
      word: 'आलोमोनि (Aalomoni)',
      key: 'aalomoni',
      meaning: 'आलो (प्रकाश/उजाला) + मोनि (मणि/रत्न) = प्रकाशमयी स्नेह-स्वरूपा मणि'
    },
    {
      word: 'नावे (Naave)',
      key: 'naave',
      meaning: 'नामे / नाम पर / सम्मान में'
    },
    {
      word: 'मांदर (Mandar)',
      key: 'mandar',
      meaning: 'कुड़मी संस्कृतिक मुख्य ताल-वाद्य (माटिक काया आरु चमड़ाक छावनी)'
    },
    {
      word: 'आखड़ा (Akhra)',
      key: 'akhra',
      meaning: 'गांव के बीच नाच-गान, गीत-संगीत और मिलन का पारंपरिक केंद्र'
    },
    {
      word: 'भादर मास (Bhadar Maase)',
      key: 'bhadar',
      meaning: 'भादो का पावन मास जब करम परब और झुमुर गीत गाए जाते हैं'
    },
    {
      word: 'मेघ गाजे (Megh Gaaje)',
      key: 'megh',
      meaning: 'बादलों की गड़गड़ाहट और जीवनदायी वर्षा की पुकार'
    },
    {
      word: 'हुलास (Hulaas)',
      key: 'hulaas',
      meaning: 'उमंग, अंतर्मन का उल्लास, आंतरिक खुशी और स्फूर्ति'
    }
  ];

  const handleRecite = () => {
    if (isPlaying) {
      stopRecitation();
      setIsPlaying(false);
    } else {
      const text = `${lines[0]} ... ${lines[1]}`;
      const lang = activeScript === 'bengali' ? 'bn-IN' : 'hi-IN';
      const success = speakPoetry(
        text,
        lang,
        () => setIsPlaying(false),
        () => setIsPlaying(false)
      );
      if (success) setIsPlaying(true);
    }
  };

  const handleCopy = () => {
    const text = `"${lines[0]}\n${lines[1]}"\n\n🌾 कुड़मालि माने:\n${kudmaliMeaning.kudmaliExplanation}\n\n— बिनु महतो (भादुरिया झुमुर • मानभूम) | Aalomoni Kudmali Archive`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    onToast('पंक्तियाँ एवं कुड़मालि अर्थ कॉपी कर लिए गए!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const shareText = `"${lines[0]}\n${lines[1]}"\n\n🌾 कुड़मालि माने:\n${kudmaliMeaning.kudmaliExplanation}\n\n(Aalomoni Kudmali Archive)`;
    if (navigator.share) {
      navigator.share({
        title: 'आलोमोनि तोर नावे झुमुर बाजे',
        text: shareText,
        url: window.location.href
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onToast(!isBookmarked ? 'गीत सहेज लिया गया!' : 'सहेजा गया गीत हटा दिया गया');
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#E2D5C0] bg-[#FAF7F2] shadow-sm hover:shadow-md transition-shadow">
      {/* Decorative Traditional Border & Ambient Glow */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-linear-to-r from-amber-700 via-rose-600 to-amber-700 opacity-90" />
      <div className="absolute -top-12 -left-12 w-56 h-56 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-rose-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="p-6 sm:p-10 md:p-12 relative text-center">
        
        {/* Top Control Bar: Badge + Script Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-6 mb-6 border-b border-[#EAE0D0]">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/90 border border-amber-200/90 text-amber-950 font-sans text-xs font-semibold uppercase tracking-wider shadow-2xs">
            <Sparkles size={14} className="text-amber-700" />
            <span>विशेष लोक-गीत (Featured Oral Heritage) • भादुरिया झुमुर</span>
          </div>

          {/* Trilingual script switcher pills */}
          <div className="flex items-center gap-1 bg-white/95 p-1 rounded-2xl border border-[#DCD2C0] shadow-2xs text-xs font-sans">
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

        {/* Main Couplet Lines */}
        <div className="max-w-3xl mx-auto space-y-4 my-6">
          <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-stone-900 leading-relaxed tracking-wide">
            {lines[0]}
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-stone-800 leading-relaxed tracking-wide">
            {lines[1]}
          </p>
        </div>

        {/* Poet & Folk Origin Attribution */}
        <div className="mt-4 flex flex-col items-center justify-center gap-1 font-sans">
          <div className="flex items-center gap-2 text-stone-700 font-serif text-lg font-semibold">
            <span>— बिनु महतो (परंपरागत लोक-कवि)</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>सुर: भादुरिया झुमुर (Bhaduria Jhumur)</span>
            <span>•</span>
            <span>क्षेत्र: मानभूम — छोटानागपुर</span>
          </div>
        </div>

        {/* Dedicated Kudmali Meaning Section */}
        <div className="mt-8 max-w-3xl mx-auto text-left space-y-4">
          
          {/* Kudmali Explanation Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E6DCC9] shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#F0E8DA] pb-2.5">
              <div className="flex items-center gap-2 font-serif font-bold text-base sm:text-lg text-amber-950">
                <span className="w-2 h-2 rounded-full bg-amber-700 inline-block" />
                <span>कुड़मालि माने (Kudmali Meaning):</span>
              </div>
              <span className="text-[11px] font-sans px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                भाखाक अर्थ
              </span>
            </div>
            
            <p className="text-stone-800 font-sans text-sm sm:text-base leading-relaxed">
              "{kudmaliMeaning.kudmaliExplanation}"
            </p>

            {/* Roman Transliteration of Kudmali Meaning for global readers */}
            {activeScript === 'roman' && (
              <p className="text-stone-600 font-sans italic text-xs leading-relaxed border-t border-stone-100 pt-2">
                "{kudmaliMeaning.kudmaliExplanationRoman}"
              </p>
            )}

            {/* Hindi & English Parallel Meaning */}
            <div className="pt-2 border-t border-[#F2ECE1] space-y-1.5 text-xs text-stone-600 font-sans">
              <p>
                <strong className="text-stone-800">हिंदी भावार्थ:</strong> {kudmaliMeaning.hindiMeaning}
              </p>
              <p className="italic text-stone-500">
                <strong className="text-stone-700 not-italic">English:</strong> "{kudmaliMeaning.englishMeaning}"
              </p>
            </div>
          </div>

          {/* Kudmali Word Meaning Breakdown Chips */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F5EFE4] border border-[#E2D6C0] space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-amber-950 uppercase tracking-wider">
              <BookOpen size={14} className="text-amber-800" />
              <span>कुड़मालि शब्दावली केर अर्थ (Kudmali Word Meanings):</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-sans text-xs">
              {words.map((item, index) => (
                <div 
                  key={index} 
                  onClick={() => onSelectWord(item.key)}
                  className="p-2.5 rounded-xl bg-white/80 border border-[#E5DAC6] hover:bg-white hover:border-amber-400 transition-colors cursor-pointer group shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-950 group-hover:text-amber-800">
                      {item.word}
                    </span>
                    <span className="text-[10px] text-amber-700 font-medium group-hover:underline">
                      शब्दकोश →
                    </span>
                  </div>
                  <p className="text-stone-600 text-[11px] mt-0.5 line-clamp-2">
                    {item.meaning}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Action Controls Toolbar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 font-sans text-xs">
          
          {/* Audio Recitation Button */}
          <button
            onClick={handleRecite}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold transition-all shadow-xs cursor-pointer ${
              isPlaying
                ? 'bg-rose-700 text-white'
                : 'bg-[#3E2723] hover:bg-[#2D1E16] text-[#FAF7F2]'
            }`}
          >
            {isPlaying ? (
              <>
                <VolumeX size={15} />
                <span>गायन रोकें (Pause)</span>
              </>
            ) : (
              <>
                <Volume2 size={15} className="text-amber-300" />
                <span>गायन पाठ सुनें (Listen Audio)</span>
              </>
            )}
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white border border-[#D7CCA8] text-stone-700 hover:bg-stone-50 transition cursor-pointer font-medium"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copied ? 'कॉपी हो गया' : 'कॉपी करें (Copy)'}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white border border-[#D7CCA8] text-stone-700 hover:bg-stone-50 transition cursor-pointer font-medium"
          >
            <Share2 size={14} />
            <span>साझा करें (Share)</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={toggleBookmark}
            className={`p-2.5 rounded-2xl border transition cursor-pointer ${
              isBookmarked
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-white border-[#D7CCA8] text-stone-600 hover:text-amber-800'
            }`}
            title={isBookmarked ? 'सहेजा गया' : 'सहेजें'}
          >
            <Bookmark size={15} className={isBookmarked ? 'fill-amber-800' : ''} />
          </button>

        </div>

      </div>
    </section>
  );
};
