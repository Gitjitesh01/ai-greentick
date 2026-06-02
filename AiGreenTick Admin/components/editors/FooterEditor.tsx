import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface FooterEditorProps {
  data: {
    desc: string;
    copyright: string;
    twitterUrl: string;
    linkedinUrl: string;
    facebookUrl: string;
  };
  onSave: (updatedData: any) => void;
}

const FooterEditor: React.FC<FooterEditorProps> = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {
    desc: 'The complete WhatsApp Marketing Suite for modern teams. Broadcasts, Chatbots, and Shared Inbox in one place.',
    copyright: '© 2026 AI Greentick. All rights reserved.',
    twitterUrl: '#',
    linkedinUrl: '#',
    facebookUrl: '#'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6 max-w-2xl space-y-6">
      <h3 className="font-bold text-base text-white border-b border-slate-800 pb-4 mb-4">Footer Details Manager</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Footer Tagline / Description</label>
          <textarea 
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm h-24 resize-none leading-relaxed"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Copyright Text</label>
          <input 
            type="text" 
            value={form.copyright}
            onChange={(e) => setForm({ ...form, copyright: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm font-semibold"
          />
        </div>

        <div className="border-t border-slate-800 pt-4 space-y-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Social Channels URLs</h4>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Twitter (X) URL</label>
              <input 
                type="text" 
                value={form.twitterUrl}
                onChange={(e) => setForm({ ...form, twitterUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-none focus:border-brand-500 font-mono"
                placeholder="https://twitter.com/username"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">LinkedIn URL</label>
              <input 
                type="text" 
                value={form.linkedinUrl}
                onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-none focus:border-brand-500 font-mono"
                placeholder="https://linkedin.com/company/name"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Facebook URL</label>
              <input 
                type="text" 
                value={form.facebookUrl}
                onChange={(e) => setForm({ ...form, facebookUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-none focus:border-brand-500 font-mono"
                placeholder="https://facebook.com/page"
              />
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition-all mt-6"
        >
          <Save className="w-4.5 h-4.5" />
          Save Footer Details
        </button>
      </form>
    </div>
  );
};

export default FooterEditor;
