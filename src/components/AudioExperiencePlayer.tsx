import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Disc3, Minimize2, Maximize2, SkipForward } from 'lucide-react';

interface AudioTrack {
  id: string;
  title: string;
  kudmaliTitle: string;
  category: string;
  melodyType: 'flute' | 'mandar' | 'ambient';
  durationSeconds: number;
}

const TRACKS: AudioTrack[] = [
  {
    id: 'track-1',
    title: 'Sal Canopy Flute & Earthen Mandar',
    kudmaliTitle: 'साल बनेर सुर आरु मांदारेर थाप',
    category: 'Bhaduria Sur',
    melodyType: 'flute',
    durationSeconds: 180
  },
  {
    id: 'track-2',
    title: 'Karam Dahar Akhra Rhythm',
    kudmaliTitle: 'डहर सुर आरु करम झुमुर ताल',
    category: 'Karam Folk',
    melodyType: 'mandar',
    durationSeconds: 210
  },
  {
    id: 'track-3',
    title: 'Tusu River Twilight Melody',
    kudmaliTitle: 'टुसू नदिया तीरे साँझ बाँसी',
    category: 'Tusu Folk',
    melodyType: 'ambient',
    durationSeconds: 195
  }
];

export const AudioExperiencePlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMinimized, setIsMinimized] = useState(true);

  // Web Audio Context refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorTimerRef = useRef<number | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  // Stop synthesis safely
  const stopAudioSynth = () => {
    if (oscillatorTimerRef.current) {
      window.clearInterval(oscillatorTimerRef.current);
      oscillatorTimerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.suspend().catch(() => {});
    }
  };

  // Start meditative folk flute & drum pulse synth
  const startAudioSynth = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioCtx();
      } else if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }

      const ctx = audioCtxRef.current;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : 0.15, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Pentatonic folk notes inspired by Bhaduria Jhumur & Banshi (Raag Desh / Pahadi roots)
      // D4, F#4, G4, A4, C5, D5
      const fluteNotes = [293.66, 369.99, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];
      let step = 0;

      const playFlutePulse = () => {
        if (!ctx || ctx.state === 'suspended') return;
        const now = ctx.currentTime;
        
        // Bamboo flute synthesis (sine with soft vibrato)
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = 'sine';

        // Select melodic note sequence
        const noteFreq = fluteNotes[step % fluteNotes.length];
        step = (step + 1) % fluteNotes.length;

        osc.frequency.setValueAtTime(noteFreq, now);
        // Gentle breath envelope
        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.linearRampToValueAtTime(0.08, now + 0.3);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

        osc.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 1.7);

        // Clay Mandar soft resonant bass pulse (low triangle wave) every 2 beats
        if (step % 2 === 0) {
          const mandarOsc = ctx.createOscillator();
          const mandarGain = ctx.createGain();
          mandarOsc.type = 'triangle';
          mandarOsc.frequency.setValueAtTime(110, now + 0.1); // Low A2
          mandarOsc.frequency.exponentialRampToValueAtTime(65, now + 0.3);

          mandarGain.gain.setValueAtTime(0.12, now + 0.1);
          mandarGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

          mandarOsc.connect(mandarGain);
          mandarGain.connect(masterGain);

          mandarOsc.start(now + 0.1);
          mandarOsc.stop(now + 0.55);
        }
      };

      playFlutePulse();
      oscillatorTimerRef.current = window.setInterval(playFlutePulse, 1200);

    } catch (e) {
      console.warn('Audio synthesis not supported or prevented by autoplay policy', e);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAudioSynth();
      setIsPlaying(false);
    } else {
      startAudioSynth();
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    stopAudioSynth();
    const nextIdx = (currentTrackIndex + 1) % TRACKS.length;
    setCurrentTrackIndex(nextIdx);
    setProgress(0);
    if (isPlaying) {
      setTimeout(() => startAudioSynth(), 100);
    }
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(next ? 0 : 0.15, audioCtxRef.current.currentTime);
    }
  };

  // Progress timer simulation
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNextTrack();
            return 0;
          }
          return prev + 0.5;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentTrackIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudioSynth();
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentTimeSeconds = (progress / 100) * currentTrack.durationSeconds;

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm sm:max-w-md w-[calc(100vw-2rem)] select-none animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="bg-[#FAF7F2]/95 backdrop-blur-md border border-[#E7DECD] shadow-xl rounded-2xl p-3 sm:p-4 text-stone-800 font-sans transition-all">
        
        {/* Minimized Bar */}
        {isMinimized ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <button 
                onClick={handleTogglePlay}
                className="w-9 h-9 rounded-full bg-amber-900 hover:bg-amber-800 text-white flex items-center justify-center shrink-0 shadow-xs cursor-pointer transition transform active:scale-95"
                title={isPlaying ? "Pause music" : "Play soothing folk acoustic melody"}
              >
                {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
              </button>

              <div className="min-w-0 cursor-pointer" onClick={() => setIsMinimized(false)}>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-1.5 py-0.5 rounded">
                    {currentTrack.category}
                  </span>
                  {isPlaying && (
                    <span className="flex gap-0.5 items-end h-3">
                      <span className="w-0.5 h-2 bg-amber-700 animate-pulse" />
                      <span className="w-0.5 h-3 bg-amber-700 animate-pulse delay-75" />
                      <span className="w-0.5 h-1.5 bg-amber-700 animate-pulse delay-150" />
                    </span>
                  )}
                </div>
                <p className="text-xs font-serif font-bold text-stone-900 truncate">
                  {currentTrack.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handleToggleMute}
                className="p-1.5 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-200/50 transition cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
              <button
                onClick={() => setIsMinimized(false)}
                className="p-1.5 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-200/50 transition cursor-pointer"
                title="Expand audio player"
              >
                <Maximize2 size={15} />
              </button>
            </div>
          </div>
        ) : (
          /* Expanded Player */
          <div className="space-y-3">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
              <div className="flex items-center gap-2">
                <Disc3 size={15} className={`text-amber-800 ${isPlaying ? 'animate-spin' : ''}`} />
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-900 font-sans">
                  Kudmali Acoustic Sanctuary
                </span>
              </div>
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/50 cursor-pointer"
                title="Minimize player"
              >
                <Minimize2 size={14} />
              </button>
            </div>

            {/* Track Info */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base leading-snug">
                  {currentTrack.title}
                </h4>
                <p className="text-xs font-serif text-amber-900">
                  {currentTrack.kudmaliTitle}
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Live synthesized Bamboo Flute (बाँसी) & Clay Mandar (मांदर)
                </p>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-amber-100 text-amber-900 shrink-0">
                {currentTrack.category}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="w-full bg-stone-200/80 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-amber-800 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>{formatTime(currentTimeSeconds)}</span>
                <span>{formatTime(currentTrack.durationSeconds)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={handleToggleMute}
                className="p-2 text-stone-500 hover:text-stone-800 rounded-xl hover:bg-stone-100 transition cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleTogglePlay}
                  className="px-4 py-2 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition transform active:scale-95 cursor-pointer"
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                  <span>{isPlaying ? 'Pause Melody' : 'Play Soothing Flute'}</span>
                </button>

                <button
                  onClick={handleNextTrack}
                  className="p-2 text-stone-600 hover:text-stone-900 rounded-xl hover:bg-stone-100 transition cursor-pointer"
                  title="Next Melody"
                >
                  <SkipForward size={16} />
                </button>
              </div>

              <span className="text-[10px] text-stone-400 font-sans italic hidden sm:inline">
                Listen while reading
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
