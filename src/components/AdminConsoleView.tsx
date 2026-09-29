import React, { useState } from 'react';
import { Submission } from '../types';
import { ShieldCheck, Check, X, Sparkles, Clock, AlertCircle, Trash2, ArrowLeft, Music, FileText, Newspaper } from 'lucide-react';

interface AdminConsoleViewProps {
  submissions: Submission[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
  onBackToHome: () => void;
  glassClass: string;
}

export const AdminConsoleView: React.FC<AdminConsoleViewProps> = ({
  submissions,
  onApprove,
  onReject,
  onDelete,
  onBackToHome,
  glassClass
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  const filteredSubmissions = submissions.filter(s => {
    if (filter === 'all') return true;
    return s.status === filter;
  });

  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const approvedCount = submissions.filter(s => s.status === 'approved').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider text-amber-800 font-semibold mb-2 hover:underline"
          >
            <ArrowLeft size={14} />
            <span>मुख्य पृष्ठ पर लौटें (Back to Home)</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-serif text-stone-900 font-bold">
              Aalomoni Editorial & Admin Console
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-900 text-white text-xs font-sans font-semibold">
              संपादकीय मंडल
            </span>
          </div>
          <p className="text-stone-500 text-sm font-sans mt-1">
            कुड़मालि गीत, निबंध व ब्लॉग रचनाओं की समीक्षा करें और स्वीकृत कर सीधे मुख्य आर्काइव में प्रकाशित करें।
          </p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-sans">
        <div className={`${glassClass} p-5`}>
          <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block">
            लंबित समीक्षा (Pending)
          </span>
          <span className="text-3xl font-serif font-bold text-amber-900">{pendingCount}</span>
        </div>

        <div className={`${glassClass} p-5`}>
          <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block">
            प्रकाशित (Approved)
          </span>
          <span className="text-3xl font-serif font-bold text-emerald-800">{approvedCount}</span>
        </div>

        <div className={`${glassClass} p-5`}>
          <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block">
            कुल प्रविष्टियाँ (Total)
          </span>
          <span className="text-3xl font-serif font-bold text-stone-800">{submissions.length}</span>
        </div>

        <div className={`${glassClass} p-5`}>
          <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block">
            आर्काइव स्थिति
          </span>
          <span className="text-sm font-semibold text-emerald-700 mt-2 block flex items-center gap-1">
            <Sparkles size={14} /> सक्रिय (Live)
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200/70 pb-3 font-sans text-xs">
        {[
          { id: 'pending', label: `समीक्षा हेतु (${pendingCount})` },
          { id: 'approved', label: `स्वीकृत (${approvedCount})` },
          { id: 'rejected', label: 'अस्वीकृत' },
          { id: 'all', label: 'सभी प्रविष्टियाँ' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-4 py-1.5 rounded-full font-semibold transition ${
              filter === tab.id
                ? 'bg-stone-900 text-white'
                : 'bg-white/60 text-stone-600 hover:bg-white border border-stone-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <div className={`${glassClass} p-12 text-center text-stone-400 font-sans text-sm`}>
            इस फ़िल्टर में कोई प्रविष्टि नहीं है।
          </div>
        ) : (
          filteredSubmissions.map(sub => (
            <div
              key={sub.id}
              className={`${glassClass} p-6 border border-stone-200/80 space-y-4 hover:border-amber-300 transition-all`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  {sub.type === 'geet' ? (
                    <span className="p-1.5 rounded-lg bg-amber-100 text-amber-900">
                      <Music size={14} />
                    </span>
                  ) : sub.type === 'article' ? (
                    <span className="p-1.5 rounded-lg bg-blue-100 text-blue-900">
                      <FileText size={14} />
                    </span>
                  ) : (
                    <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-900">
                      <Newspaper size={14} />
                    </span>
                  )}
                  <span className="font-bold text-lg font-serif text-stone-900">{sub.title}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 font-sans">
                    {sub.category}
                  </span>
                  <span className="text-[11px] uppercase text-stone-400 font-sans">
                    ({sub.script})
                  </span>
                </div>

                <div className="flex items-center gap-2 font-sans text-xs">
                  <span className="text-stone-400">{sub.submittedAt}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-semibold uppercase text-[10px] ${
                      sub.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : sub.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-sans text-stone-600">
                <span>रचनाकार / लेखक:</span>
                <span className="font-semibold text-stone-900">{sub.authorName}</span>
              </div>

              {/* Content Preview */}
              <div className="p-4 rounded-xl bg-white/70 border border-stone-200/60 font-serif text-sm text-stone-800 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                {sub.content}
              </div>

              {/* Moderation Controls */}
              <div className="pt-2 flex items-center justify-between font-sans text-xs">
                <div className="flex items-center gap-2">
                  {sub.status !== 'approved' && (
                    <button
                      onClick={() => onApprove(sub.id)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition"
                    >
                      <Check size={14} />
                      <span>स्वीकार कर प्रकाशित करें (Approve & Publish)</span>
                    </button>
                  )}

                  {sub.status !== 'rejected' && (
                    <button
                      onClick={() => onReject(sub.id)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 transition"
                    >
                      <X size={14} />
                      <span>अस्वीकृत करें (Reject)</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={() => onDelete(sub.id)}
                  className="p-2 text-stone-400 hover:text-red-600 transition"
                  title="हटाएँ"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
