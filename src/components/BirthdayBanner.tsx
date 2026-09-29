import React from 'react';
import { Gift, Sparkles, X } from 'lucide-react';

interface BirthdayBannerProps {
  onOpenSurprise: () => void;
  onDismiss: () => void;
  visible: boolean;
}

export const BirthdayBanner: React.FC<BirthdayBannerProps> = ({
  onOpenSurprise,
  onDismiss,
  visible
}) => {
  if (!visible) return null;

  return (
    <div className="w-full max-w-6xl mx-auto mb-6 px-4 animate-in slide-in-from-top duration-300">
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-amber-500/15 via-rose-500/15 to-amber-500/15 backdrop-blur-md border border-amber-300/60 p-3 sm:p-3.5 shadow-sm flex items-center justify-between gap-3 text-stone-800">
        
        {/* Glow effect */}
        <div className="absolute top-0 left-1/4 w-32 h-8 bg-amber-400/20 blur-xl pointer-events-none" />

        <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs animate-pulse">
            <Gift size={16} />
          </div>
          
          <div className="text-xs font-sans min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-stone-900 flex items-center gap-1">
                <span>Special Birthday Gift for Aarti Mahato</span>
                <Sparkles size={12} className="text-amber-600 inline" />
              </span>
              <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.2 rounded-full uppercase tracking-wider hidden sm:inline-block">
                Birthday Special
              </span>
            </div>
            <p className="text-stone-600 text-[11px] truncate hidden md:block">
              This entire website is lovingly dedicated in celebration of Aarti Mahato's birthday.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenSurprise}
            className="px-3.5 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-sans font-semibold flex items-center gap-1.5 shadow-xs transition transform hover:scale-105 cursor-pointer"
          >
            <Gift size={13} />
            <span className="hidden sm:inline">Open Birthday Gift 🎁</span>
            <span className="sm:hidden">Open Gift 🎁</span>
          </button>

          <button
            onClick={onDismiss}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-black/5 transition cursor-pointer"
            title="Dismiss banner"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
