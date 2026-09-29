/**
 * Speech synthesis utility for Kudmali geet and poetry recitation
 */
let currentUtterance: SpeechSynthesisUtterance | null = null;

export const speakPoetry = (
  text: string, 
  lang: 'hi-IN' | 'bn-IN' | 'en-IN' | 'en-US' = 'hi-IN', 
  onEnd?: () => void,
  onError?: () => void
): boolean => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  currentUtterance = utterance;
  utterance.lang = lang;
  utterance.rate = 0.88; // Unhurried, contemplative folk cadence
  utterance.pitch = 1.0;

  // Try to find a matching voice if available
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onend = () => {
    currentUtterance = null;
    onEnd?.();
  };

  utterance.onerror = () => {
    currentUtterance = null;
    onError?.();
  };

  window.speechSynthesis.speak(utterance);
  return true;
};

export const stopRecitation = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
};

export const isSpeaking = (): boolean => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    return window.speechSynthesis.speaking;
  }
  return false;
};
