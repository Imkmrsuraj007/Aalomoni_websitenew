import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3.5 bg-stone-900/90 backdrop-blur-md text-stone-100 rounded-xl shadow-2xl border border-stone-700/50 text-sm font-sans"
        >
          {type === 'success' ? (
            <CheckCircle2 size={18} className="text-amber-400 shrink-0" />
          ) : (
            <Info size={18} className="text-amber-400 shrink-0" />
          )}
          <span>{message}</span>
          <button
            onClick={onClose}
            className="ml-2 text-stone-400 hover:text-white transition-colors text-xs uppercase tracking-wider"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
