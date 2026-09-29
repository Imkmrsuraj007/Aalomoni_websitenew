import React, { useState } from 'react';
import { PlusCircle, Send, CheckCircle2, Eye, Music, FileText, Newspaper, Sparkles } from 'lucide-react';
import { KudmaliScriptType, Submission } from '../types';

interface SubmitWorkViewProps {
  onSubmit: (submission: Omit<Submission, 'id' | 'status' | 'submittedAt'>) => void;
  glassClass: string;
  inputClass: string;
}

export const SubmitWorkView: React.FC<SubmitWorkViewProps> = ({
  onSubmit,
  glassClass,
  inputClass
}) => {
  const [workType, setWorkType] = useState<'geet' | 'article' | 'blog'>('geet');
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [category, setCategory] = useState<string>('Jhumur');
  const [script, setScript] = useState<KudmaliScriptType>('devanagari');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSubmit({
      title: title.trim(),
      authorName: authorName.trim() || 'कुड़मालि लोक-रचनाकार (Anonymous)',
      type: workType,
      category,
      script,
      content: content.trim()
    });

    setSubmitted(true);
    setTimeout(() => {
      setTitle('');
      setAuthorName('');
      setContent('');
      setSubmitted(false);
    }, 3500);
  };

  const geetCategories = ['Jhumur', 'Karam Geet', 'Sohrai / Bandna', 'Tusu Geet', 'Biha Geet', 'Sarhul / Baha', 'Domkach'];
  const articleCategories = ['Festivals & Rituals', 'Music & Mandar', 'Language & Lipi', 'History & Kudmi Heritage'];
  const blogCategories = ['Personal Story', 'Festival Notes', 'Folklore & Kahini', 'Cultural Reflection'];

  const currentCategories = 
    workType === 'geet' ? geetCategories :
    workType === 'article' ? articleCategories : blogCategories;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className={`${glassClass} p-8 md:p-12 relative overflow-hidden`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-amber-700/10 text-amber-800 flex items-center justify-center mx-auto mb-3">
            <PlusCircle size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-stone-900 font-bold">
            अपनी रचना भेजें (Submit Work)
          </h1>
          <p className="text-stone-500 font-sans mt-2 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            आलोमोनि डिजिटल संकलन में अपने कुड़मालि गीत, निबंध, शोध पत्र या ब्लॉग प्रेषित करें। स्वीकृत रचनाएँ सीधे मुख्य अभिलेखागार में प्रकाशित की जाती हैं।
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12 space-y-3 animate-in zoom-in-95 duration-200">
            <CheckCircle2 size={48} className="mx-auto text-emerald-600" />
            <h3 className="text-2xl font-serif text-stone-900 font-bold">जोहार! रचना सफलता पूर्वक प्रेषित हुई</h3>
            <p className="text-sm font-sans text-stone-600 max-w-md mx-auto">
              आपकी रचना आलोमोनि संपादकीय मंडल (Admin Console) में समीक्षा हेतु सुरक्षित कर ली गई है।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Select Work Type */}
            <div className="space-y-2">
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-600 block">
                रचना का प्रकार चुनें (Select Type)
              </label>
              <div className="grid grid-cols-3 gap-3 font-sans text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setWorkType('geet');
                    setCategory('Jhumur');
                  }}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                    workType === 'geet'
                      ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold shadow-xs'
                      : 'bg-white/60 border-stone-200 text-stone-600 hover:bg-white'
                  }`}
                >
                  <Music size={18} className="text-amber-800" />
                  <span>कुड़मालि गीत (Geet)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setWorkType('article');
                    setCategory('Festivals & Rituals');
                  }}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                    workType === 'article'
                      ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold shadow-xs'
                      : 'bg-white/60 border-stone-200 text-stone-600 hover:bg-white'
                  }`}
                >
                  <FileText size={18} className="text-amber-800" />
                  <span>शोध निबंध (Article)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setWorkType('blog');
                    setCategory('Personal Story');
                  }}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                    workType === 'blog'
                      ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold shadow-xs'
                      : 'bg-white/60 border-stone-200 text-stone-600 hover:bg-white'
                  }`}
                >
                  <Newspaper size={18} className="text-amber-800" />
                  <span>ब्लॉग व डायरी (Blog)</span>
                </button>
              </div>
            </div>

            {/* Title & Author */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-600 block">
                  रचना का शीर्षक (Title) *
                </label>
                <input
                  type="text"
                  required
                  placeholder={workType === 'geet' ? 'जैसे: आलोमोनि तोर नावे मांदर बाजे' : 'जैसे: करम परब आरु प्रकृति पूजा'}
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-600 block">
                  रचयिता / लेखक का नाम (Author / Poet)
                </label>
                <input
                  type="text"
                  placeholder="आपका नाम या पारंपरिक कवि"
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Category & Script */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-600 block">
                  विधा / श्रेणी (Category)
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className={inputClass}
                >
                  {currentCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-600 block">
                  लिपि (Script)
                </label>
                <div className="flex gap-2">
                  {[
                    { id: 'devanagari', label: 'देवनागरी (हिंदी)' },
                    { id: 'roman', label: 'Roman (English)' },
                    { id: 'bengali', label: 'বাংলা (Bengali)' }
                  ].map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setScript(s.id as KudmaliScriptType)}
                      className={`flex-1 py-2.5 rounded-xl border text-xs font-sans font-semibold transition ${
                        script === s.id
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-white/60 border-stone-200 text-stone-600 hover:bg-white'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Textarea */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-sans font-bold uppercase tracking-wider text-stone-600">
                  {workType === 'geet' ? 'गीत के पद / पंक्तियाँ (Lyrics) *' : 'विषय वस्तु / आलेख (Content) *'}
                </label>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-xs font-sans text-amber-800 hover:underline flex items-center gap-1"
                >
                  <Eye size={13} />
                  <span>{showPreview ? 'पूर्वावलोकन छुपाएँ' : 'पूर्वावलोकन देखें'}</span>
                </button>
              </div>

              <textarea
                required
                rows={workType === 'geet' ? 8 : 10}
                placeholder={
                  workType === 'geet'
                    ? 'प्रत्येक पद को दो-दो पंक्तियों में लिखें:\nपंक्ति 1...\nपंक्ति 2...\n\nपंक्ति 3...\nपंक्ति 4...'
                    : 'यहाँ अपना लेख, निबंध या ब्लॉग का पूरा विवरण लिखें...'
                }
                value={content}
                onChange={e => setContent(e.target.value)}
                className={`${inputClass} leading-relaxed font-serif text-base resize-y`}
              />
            </div>

            {/* Live Glass Preview */}
            {showPreview && (title || content) && (
              <div className="p-6 rounded-2xl bg-white/70 border border-amber-200/80 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-amber-700" />
                    <span className="text-xs font-sans font-bold uppercase tracking-wider text-amber-900">
                      लाइव पूर्वावलोकन (Live Preview)
                    </span>
                  </div>
                  <span className="text-[11px] font-sans px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold">
                    {category} • {workType.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h4 className="text-xl font-serif font-bold text-stone-900">
                    {title || 'शीर्षक यहाँ दिखेगा'}
                  </h4>
                  <p className="text-xs font-sans text-stone-500 mt-0.5">
                    रचनाकार: {authorName || 'गुमनाम'}
                  </p>
                </div>

                <div className="bg-amber-50/50 p-4 rounded-xl border border-stone-200/50 text-stone-800 font-serif text-sm whitespace-pre-wrap leading-relaxed">
                  {content || 'यहाँ आपकी रचना की पंक्तियाँ प्रदर्शित होंगी...'}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-800 text-white font-sans font-semibold text-sm hover:bg-amber-900 transition shadow-md hover:shadow-lg"
              >
                <Send size={16} />
                <span>रचना सबमिट करें (Submit Work)</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
