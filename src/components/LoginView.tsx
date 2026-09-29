import React, { useState } from 'react';
import { User, ShieldCheck, KeyRound, ArrowLeft } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess?: () => void;
  onSuccess?: () => void;
  onCancel: () => void;
  glassClass: string;
  inputClass: string;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  onSuccess,
  onCancel,
  glassClass,
  inputClass
}) => {
  const [email, setEmail] = useState('curator@aalomoni.org');
  const [password, setPassword] = useState('kudmali2025');
  const [error, setError] = useState('');

  const triggerSuccess = () => {
    if (onLoginSuccess) onLoginSuccess();
    else if (onSuccess) onSuccess();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('कृपया ईमेल और पासवर्ड दर्ज करें।');
      return;
    }
    triggerSuccess();
  };

  const handleQuickDemo = () => {
    setEmail('curator@aalomoni.org');
    setPassword('kudmali2025');
    triggerSuccess();
  };

  return (
    <div className={`${glassClass} max-w-md mx-auto p-8 md:p-10 mt-6 text-center animate-in fade-in duration-300 relative`}>
      <button
        onClick={onCancel}
        className="absolute top-6 left-6 text-xs text-stone-400 hover:text-stone-700 flex items-center gap-1 font-sans"
      >
        <ArrowLeft size={14} /> वापस (Back)
      </button>

      <div className="w-16 h-16 bg-amber-100 text-amber-900 rounded-full flex items-center justify-center mx-auto mb-5 shadow-xs">
        <ShieldCheck size={30} />
      </div>

      <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mb-2 font-bold">
        संपादक मंडल लॉगिन
      </h2>
      <p className="text-stone-500 font-sans text-xs mb-6">
        आलोमोनि कुड़मालि संकलन में प्रविष्टियों की समीक्षा और संपादन हेतु अधिकृत प्रवेश।
      </p>

      {error && (
        <div className="p-3 mb-4 rounded-xl bg-rose-50 text-rose-700 text-xs font-sans">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-left">
        <div>
          <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
            क्यूरेटर ईमेल (Curator ID)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="curator@aalomoni.org"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
            पासकोड (Password)
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-stone-900 text-white rounded-xl font-semibold hover:bg-stone-800 transition shadow-xs text-xs mt-2"
        >
          प्रवेश करें (Sign In)
        </button>

        <button
          type="button"
          onClick={handleQuickDemo}
          className="w-full py-2.5 bg-amber-100 text-amber-950 rounded-xl font-semibold hover:bg-amber-200 transition text-xs flex items-center justify-center gap-1.5"
        >
          <KeyRound size={14} />
          <span>त्वरित डेमो प्रवेश (1-Click Demo Login)</span>
        </button>
      </form>
    </div>
  );
};
