import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface HeroEditorProps {
  data: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  onSave: (updatedData: any) => void;
}

const HeroEditor: React.FC<HeroEditorProps> = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {
    badge: 'WHATSAPP MARKETING SUITE FOR MODERN TEAMS',
    title: 'Grow Faster With\nSmarter WhatsApp Conversations',
    subtitle: 'Send high-delivery broadcasts, manage every chat in a shared inbox and automate replies with AI chatbots.',
    primaryCta: 'Start Free Trial',
    secondaryCta: 'Book A Demo'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
        <h3 className="font-bold text-base text-white border-b border-slate-800 pb-4 mb-6">Hero Section Fields</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Badge Text</label>
            <input 
              type="text" 
              value={form.badge}
              onChange={(e) => setForm({ ...form, badge: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Hero Title</label>
            <textarea 
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm h-28 font-mono"
              placeholder="Use \n for line breaks"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Hero Subtitle</label>
            <textarea 
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm h-32 leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Primary CTA Text</label>
              <input 
                type="text" 
                value={form.primaryCta}
                onChange={(e) => setForm({ ...form, primaryCta: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Secondary CTA Text</label>
              <input 
                type="text" 
                value={form.secondaryCta}
                onChange={(e) => setForm({ ...form, secondaryCta: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition-all mt-6"
          >
            <Save className="w-4.5 h-4.5" />
            Save Hero Section
          </button>
        </form>
      </div>

      {/* Real-time Preview */}
      <div className="bg-slate-950/20 border border-slate-800/85 rounded-2xl p-8 sticky top-8">
        <h3 className="font-bold text-slate-500 text-xs uppercase tracking-widest mb-6">Realtime Hero Preview</h3>
        <div className="bg-[#0A0A0A] p-8 rounded-2xl border border-slate-950 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#001a0d] via-[#050505] to-black opacity-60"></div>
          <div className="relative z-10 flex flex-col items-center">
            <span className="inline-block px-4 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold text-white tracking-widest uppercase mb-6 scale-90">
              {form.badge || 'BADGE TEXT'}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              {form.title ? form.title.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < form.title.split('\n').length - 1 && <br />}
                </React.Fragment>
              )) : 'Hero Title'}
            </h1>
            <p className="text-slate-400 text-[11px] max-w-md mx-auto mb-6 leading-relaxed font-light">
              {form.subtitle || 'Subtitle description...'}
            </p>
            <div className="flex gap-4 items-center scale-90">
              <span className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold rounded-full text-[9px] border border-white/15 cursor-default">
                {form.primaryCta || 'Primary CTA'}
              </span>
              <span className="px-5 py-2 border border-white/20 text-white font-bold rounded-full text-[9px] cursor-default">
                {form.secondaryCta || 'Secondary CTA'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroEditor;
