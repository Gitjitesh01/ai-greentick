import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface CTAFinalEditorProps {
  data: {
    badge: string;
    title: string;
    desc: string;
    primaryCta: string;
    secondaryCta: string;
  };
  onSave: (updatedData: any) => void;
}

const CTAFinalEditor: React.FC<CTAFinalEditorProps> = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {
    badge: 'Ready to scale?',
    title: 'Turn WhatsApp Into Your Growth Channel',
    desc: 'Join hundreds of high-growth brands using AI Greentick to simplify their WhatsApp strategy.',
    primaryCta: 'Start Free Trial Today',
    secondaryCta: 'Explore Plans'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6 max-w-2xl space-y-6">
      <h3 className="font-bold text-base text-white border-b border-slate-800 pb-4 mb-4">Final CTA Manager</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Badge Text</label>
          <input 
            type="text" 
            value={form.badge}
            onChange={(e) => setForm({ ...form, badge: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm font-semibold"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">CTA Title</label>
          <textarea 
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm h-24 font-semibold font-mono"
            placeholder="Use \n for line breaks"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">CTA Description</label>
          <textarea 
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm h-20 resize-none leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Primary CTA Button</label>
            <input 
              type="text" 
              value={form.primaryCta}
              onChange={(e) => setForm({ ...form, primaryCta: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Secondary CTA Button</label>
            <input 
              type="text" 
              value={form.secondaryCta}
              onChange={(e) => setForm({ ...form, secondaryCta: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition-all mt-6"
        >
          <Save className="w-4.5 h-4.5" />
          Save CTA Config
        </button>
      </form>
    </div>
  );
};

export default CTAFinalEditor;
