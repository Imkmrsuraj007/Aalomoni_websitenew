import React, { useState, useEffect } from 'react';
import { Gift, Sparkles, Heart, Volume2, Pause, X, Music, Check, ArrowRight, Cake, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakPoetry, stopRecitation } from '../utils/recitation';

interface BirthdaySurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName?: string;
}

export const BirthdaySurpriseModal: React.FC<BirthdaySurpriseModalProps> = ({
  isOpen,
  onClose,
  recipientName = 'Aarti Mahato'
}) => {
  const [isUnwrapped, setIsUnwrapped] = useState(false);
  const [candleBlown, setCandleBlown] = useState(false);
  const [isPlayingPoem, setIsPlayingPoem] = useState(false);
  const [activeTab, setActiveTab] = useState<'verse' | 'blessing'>('verse');

  // Trigger confetti burst on reveal
  useEffect(() => {
    if (isOpen && isUnwrapped) {
      triggerCelebrationConfetti();
      playChime();
    }
  }, [isOpen, isUnwrapped]);

  if (!isOpen) return null;

  // Web Audio Synth Chime for celebratory sound
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 0.9);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.15);
        osc.stop(ctx.currentTime + idx * 0.15 + 1.0);
      });
    } catch (e) {
      // Audio autoplay might be prevented silently
    }
  };

  const triggerCelebrationConfetti = () => {
    try {
      // Multiple bursts for extra joy
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D97706', '#F59E0B', '#F43F5E', '#10B981', '#8B5CF6', '#FBBF24']
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#F59E0B', '#EC4899', '#3B82F6']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#F59E0B', '#EC4899', '#10B981']
        });
      }, 250);
    } catch (e) {
      // Ignore fallback
    }
  };

  const handleUnwrap = () => {
    setIsUnwrapped(true);
    triggerCelebrationConfetti();
    playChime();
  };

  const handleBlowCandle = () => {
    setCandleBlown(true);
    triggerCelebrationConfetti();
    playChime();
  };

  const poemTextEnglish = 
`Countless joyful greetings on your auspicious birthday, Aarti Mahato!
In celebration of your day, joyous melodies ring out in festive harmony.
May your life forever shine bright like the radiant jewel of Aalomoni,
And may your spirit bloom like fresh wild blossoms after summer rain.
May peace, flourishing happiness, good health, and abundant love bless every step of your journey!`;

  const verseStanzas = [
    {
      lines: [
        "A joyful day of celebration, of laughter, warmth, and light,",
        "May your special birthday shine with splendor pure and bright!"
      ]
    },
    {
      lines: [
        "Like the radiant jewel of Aalomoni, may your spirit ever glow,",
        "With peace, prosperity, and love in all the paths you go."
      ]
    },
    {
      lines: [
        "The drums of joy resound today, melodious notes unfold,",
        "Writing for you a vibrant year in harmonies of gold!"
      ]
    }
  ];

  const handleRecitePoem = () => {
    if (isPlayingPoem) {
      stopRecitation();
      setIsPlayingPoem(false);
    } else {
      const textToSpeak = activeTab === 'verse'
        ? verseStanzas.map(s => s.lines.join(' ')).join('. ') + '. Happy Birthday, Aarti Mahato!'
        : poemTextEnglish;
      const success = speakPoetry(
        textToSpeak,
        'en-US',
        () => setIsPlayingPoem(false),
        () => setIsPlayingPoem(false)
      );
      if (success) setIsPlayingPoem(true);
    }
  };

  const handleCloseAndExplore = () => {
    stopRecitation();
    setIsPlayingPoem(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-lg animate-in fade-in duration-300">
      <div 
        className="bg-[#FCFAF6] border-2 border-amber-200/90 shadow-2xl rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden text-stone-800 font-serif relative animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Festive top ribbon accent */}
        <div className="h-2 w-full bg-linear-to-r from-amber-400 via-rose-400 to-amber-500" />

        {/* Close Button */}
        <button
          onClick={handleCloseAndExplore}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 border border-stone-200 text-stone-500 hover:text-stone-800 hover:bg-white shadow-xs transition z-10 cursor-pointer"
          title="Close and explore the website"
        >
          <X size={18} />
        </button>

        {!isUnwrapped ? (
          /* PHASE 1: WRAPPED GIFT BOX PRESENTATION */
          <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-6 overflow-y-auto">
            
            {/* Pulsing Gift Icon Badge */}
            <div className="relative group cursor-pointer" onClick={handleUnwrap}>
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-linear-to-br from-amber-500 via-amber-600 to-rose-500 p-1 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-all duration-300">
                <div className="w-full h-full bg-[#FAF6EE] rounded-[22px] flex flex-col items-center justify-center relative overflow-hidden border border-amber-200">
                  {/* Decorative golden ribbons */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 bg-amber-400/30 border-y border-amber-500/40" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-6 bg-amber-400/30 border-x border-amber-500/40" />
                  
                  <Gift size={54} className="text-amber-700 relative z-10 animate-bounce" />
                </div>
              </div>
              <div className="absolute -bottom-2 inset-x-0 mx-auto w-max px-3 py-0.5 rounded-full bg-amber-900 text-white text-[10px] font-sans font-bold tracking-wider uppercase shadow-md">
                Special Birthday Gift 🎁
              </div>
            </div>

            {/* Gift Tag */}
            <div className="space-y-2 max-w-md">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/90 border border-rose-200 text-rose-900 text-xs font-sans font-semibold uppercase tracking-widest">
                <PartyPopper size={14} className="text-rose-600" />
                <span>Happy Birthday Surprise</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
                A Special Gift for Aarti Mahato
              </h2>
              <p className="text-stone-600 font-sans text-xs sm:text-sm leading-relaxed">
                On the auspicious occasion of your birthday, this entire website and cultural sanctuary, <strong className="text-amber-900 font-serif">Aalomoni</strong>, is lovingly dedicated to you.
              </p>
            </div>

            {/* Personalized Gift Tag Box */}
            <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-left w-full max-w-sm font-sans text-xs space-y-1.5 shadow-xs">
              <div className="flex justify-between items-center text-[11px] text-stone-500">
                <span>Gift Recipient (To):</span>
                <span className="font-bold font-serif text-stone-900 text-sm">Aarti Mahato</span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-stone-500 border-t border-amber-200/60 pt-1.5">
                <span>Dedicated Gift:</span>
                <span className="font-semibold text-amber-900">Aalomoni Cultural Sanctuary</span>
              </div>
            </div>

            {/* Unwrap Button */}
            <button
              onClick={handleUnwrap}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-linear-to-r from-amber-700 via-amber-800 to-rose-700 text-white font-sans font-bold text-sm sm:text-base hover:from-amber-800 hover:to-rose-800 transition shadow-xl hover:shadow-2xl hover:scale-[1.02] transform cursor-pointer"
            >
              <Gift size={18} />
              <span>Unwrap Your Gift 🎀</span>
            </button>
          </div>
        ) : (
          /* PHASE 2: UNWRAPPED CELEBRATION */
          <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
            
            {/* Celebratory Header */}
            <div className="text-center space-y-3 border-b border-stone-200/80 pb-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-sans font-semibold uppercase tracking-widest">
                <Sparkles size={14} className="text-rose-600" />
                <span>A Little Birthday Surprise</span>
              </div>

              <div className="py-2 px-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 max-w-xl mx-auto space-y-2">
                <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                  "This little space was created to celebrate your words, your creativity, and the culture you love."
                </p>
                <div className="text-xl sm:text-2xl font-serif font-bold text-rose-800 tracking-tight flex items-center justify-center gap-2">
                  <span>Happy Birthday</span>
                  <span className="text-rose-600">❤️</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight pt-1">
                Dearest Aarti Mahato
              </h1>
              <p className="text-stone-500 font-sans text-xs sm:text-sm">
                A warm digital home for your writings and your love for Kudmali culture.
              </p>
            </div>

            {/* Interactive Birthday Cake & Wish */}
            <div className="p-5 rounded-2xl bg-linear-to-br from-amber-50 to-rose-50/70 border border-amber-200/80 text-center space-y-3 relative overflow-hidden">
              <div className="flex flex-col items-center justify-center">
                <div 
                  onClick={handleBlowCandle}
                  className="cursor-pointer group relative p-3 rounded-2xl bg-white border border-amber-200/70 shadow-xs hover:shadow-md transition transform hover:scale-105"
                  title="Click to blow out the candle and make a birthday wish!"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl transition-transform">
                      {candleBlown ? '🎂✨' : '🕯️🎂'}
                    </span>
                    <div className="text-left font-sans">
                      <span className="text-[11px] uppercase font-bold text-amber-900 block">
                        {candleBlown ? 'Wish Made! ✨' : 'Make a Wish & Blow the Candle'}
                      </span>
                      <span className="text-xs text-stone-500">
                        {candleBlown ? 'May all your deepest dreams and hopes come true!' : 'Click here to blow out the birthday candle'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {candleBlown && (
                <p className="text-xs font-sans font-semibold text-rose-700 animate-in fade-in duration-300">
                  🎉 Wish granted! May this upcoming year bring you boundless happiness, peace, and beautiful memories!
                </p>
              )}
            </div>

            {/* Dedicated Birthday Poem in English for Aarti */}
            <div className="p-6 rounded-2xl bg-white border-2 border-amber-300/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <Music size={16} className="text-amber-800" />
                  <span className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                    Birthday Ode for Aarti Mahato
                  </span>
                </div>

                {/* Tab selector */}
                <div className="flex bg-stone-100 p-0.5 rounded-lg text-[11px] font-sans">
                  <button
                    onClick={() => setActiveTab('verse')}
                    className={`px-3 py-0.5 rounded-md transition cursor-pointer ${activeTab === 'verse' ? 'bg-white font-bold text-amber-950 shadow-xs' : 'text-stone-500 hover:text-stone-800'}`}
                  >
                    Poetic Verse
                  </button>
                  <button
                    onClick={() => setActiveTab('blessing')}
                    className={`px-3 py-0.5 rounded-md transition cursor-pointer ${activeTab === 'blessing' ? 'bg-white font-bold text-amber-950 shadow-xs' : 'text-stone-500 hover:text-stone-800'}`}
                  >
                    Blessing Message
                  </button>
                </div>
              </div>

              {/* Poem Content */}
              <div className="text-center py-2 space-y-3 font-serif text-base sm:text-lg leading-relaxed text-stone-900">
                {activeTab === 'verse' ? (
                  <div className="space-y-3">
                    {verseStanzas.map((stanza, idx) => (
                      <div key={idx} className="space-y-1">
                        {stanza.lines.map((line, lIdx) => (
                          <p 
                            key={lIdx} 
                            className={lIdx === 0 ? 'font-semibold text-amber-950' : 'text-stone-700'}
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm sm:text-base font-serif italic text-stone-700 leading-relaxed px-2 sm:px-6 space-y-2">
                    <p className="font-semibold text-amber-950">
                      "Countless joyful greetings on your auspicious birthday, Aarti Mahato!"
                    </p>
                    <p>
                      In your celebration, melodies resonate and fill hearts with warmth. May your life forever shine bright like the radiant gem of Aalomoni, and your spirit bloom like fresh wild blossoms.
                    </p>
                    <p className="font-medium text-amber-900">
                      May peace, flourishing prosperity, and deep love bless every step of your wonderful journey!
                    </p>
                  </div>
                )}
              </div>

              {/* Recitation & Confetti Buttons */}
              <div className="flex items-center justify-center gap-2 pt-2 border-t border-stone-100 flex-wrap">
                <button
                  onClick={handleRecitePoem}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-sans font-semibold transition cursor-pointer ${
                    isPlayingPoem 
                      ? 'bg-amber-800 text-white' 
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {isPlayingPoem ? <Pause size={14} /> : <Volume2 size={14} />}
                  <span>{isPlayingPoem ? 'Pause Voice Recitation' : 'Listen to Recitation (English Audio)'}</span>
                </button>

                <button
                  onClick={triggerCelebrationConfetti}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-sans bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition cursor-pointer"
                >
                  <Sparkles size={14} />
                  <span>Celebration Confetti 🎊</span>
                </button>
              </div>
            </div>

            {/* Dedication Letter */}
            <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 font-sans space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-800 block">
                Birthday Dedication Letter
              </span>
              <p className="text-stone-800 text-xs sm:text-sm leading-relaxed">
                Dear <strong>Aarti Mahato</strong>, on your birthday, this entire digital archive, <strong>Aalomoni</strong>, is dedicated in your honor. May this sanctuary of heritage, soulful songs, and nature-rooted rhythms always bring a bright smile to your face and fill your journey with music, tranquility, and endless joy.
              </p>
              <div className="pt-2 flex justify-between items-center text-xs text-stone-500 font-serif">
                <span>— Dedicated with heartfelt birthday wishes</span>
                <span className="font-sans font-bold text-amber-900">Aalomoni Digital Sanctuary</span>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans">
              <span className="text-xs text-stone-400">
                This birthday gift is permanently preserved for you.
              </span>

              <button
                onClick={handleCloseAndExplore}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-900 text-white font-semibold text-xs sm:text-sm hover:bg-stone-800 transition shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Explore the Website</span>
                <ArrowRight size={15} />
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
