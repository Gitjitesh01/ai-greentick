import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface FeaturesPageEditorProps {
  data: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
      showcaseText: string;
    };
    ctaFinal: {
      title: string;
      desc: string;
      buttonText: string;
    };
    faqs: { q: string; a: string }[];
  };
  onSave: (updatedData: any) => void;
}

const FeaturesPageEditor: React.FC<FeaturesPageEditorProps> = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {
    hero: {
      badge: 'WhatsApp Marketing Suite 2.0',
      title: 'Everything You Need To\nGrow on WhatsApp',
      subtitle: "Launch campaigns, build automated flows, and manage team workflows at scale with the world's most intuitive official WhatsApp platform.",
      primaryCta: 'Start Free Trial Today',
      secondaryCta: 'Book A Demo',
      showcaseText: 'Interactive Dashboard Preview'
    },
    ctaFinal: {
      title: 'Ready to Win on WhatsApp?',
      desc: 'Join hundreds of growing brands using AI Greentick to simplify their customer communication.',
      buttonText: 'Get Started Now'
    },
    faqs: []
  });

  const handleFAQChange = (index: number, key: 'q' | 'a', val: string) => {
    const newFaqs = [...form.faqs];
    newFaqs[index][key] = val;
    setForm({ ...form, faqs: newFaqs });
  };

  const addFAQ = () => {
    setForm({
      ...form,
      faqs: [...form.faqs, { q: 'New Question', a: 'Answer text...' }]
    });
  };

  const deleteFAQ = (index: number) => {
    setForm({
      ...form,
      faqs: form.faqs.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* HERO SECTION */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 mb-5">Features Hero Copy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase block">Badge</label>
              <input 
                type="text" 
                value={form.hero.badge}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, badge: e.target.value } })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase block">Dashboard Showcase Text</label>
              <input 
                type="text" 
                value={form.hero.showcaseText}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, showcaseText: e.target.value } })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
          </div>
          <div className="space-y-1.5 mt-4">
            <label className="text-xs font-bold text-slate-400 uppercase block">Hero Title</label>
            <textarea 
              value={form.hero.title}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, title: e.target.value } })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm h-20 font-mono"
            />
          </div>
          <div className="space-y-1.5 mt-4">
            <label className="text-xs font-bold text-slate-400 uppercase block">Hero Subtitle</label>
            <textarea 
              value={form.hero.subtitle}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, subtitle: e.target.value } })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm h-20"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase block">Primary CTA Text</label>
              <input 
                type="text" 
                value={form.hero.primaryCta}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, primaryCta: e.target.value } })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase block">Secondary CTA Text</label>
              <input 
                type="text" 
                value={form.hero.secondaryCta}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, secondaryCta: e.target.value } })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 mb-5">Features Final CTA Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase block">CTA Title</label>
              <input 
                type="text" 
                value={form.ctaFinal.title}
                onChange={(e) => setForm({ ...form, ctaFinal: { ...form.ctaFinal, title: e.target.value } })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase block">Button Text</label>
              <input 
                type="text" 
                value={form.ctaFinal.buttonText}
                onChange={(e) => setForm({ ...form, ctaFinal: { ...form.ctaFinal, buttonText: e.target.value } })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
          </div>
          <div className="space-y-1.5 mt-4">
            <label className="text-xs font-bold text-slate-400 uppercase block">CTA Description</label>
            <textarea 
              value={form.ctaFinal.desc}
              onChange={(e) => setForm({ ...form, ctaFinal: { ...form.ctaFinal, desc: e.target.value } })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm h-16"
            />
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-5">
            <h3 className="font-bold text-sm text-white">Features FAQs</h3>
            <button 
              type="button" 
              onClick={addFAQ}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-300 font-bold rounded-lg border border-emerald-500/20 text-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add FAQ Item
            </button>
          </div>
          <div className="space-y-4">
            {form.faqs.map((faq, i) => (
              <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 relative">
                <button 
                  type="button" 
                  onClick={() => deleteFAQ(i)}
                  className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="space-y-1.5 w-[90%]">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Question</label>
                  <input 
                    type="text" 
                    value={faq.q}
                    onChange={(e) => handleFAQChange(i, 'q', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs"
                  />
                </div>
                <div className="space-y-1.5 w-[90%]">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Answer</label>
                  <textarea 
                    value={faq.a}
                    onChange={(e) => handleFAQChange(i, 'a', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs h-16"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition-all"
        >
          <Save className="w-5 h-5" /> Save Features Page Content
        </button>

      </form>
    </div>
  );
};

export default FeaturesPageEditor;
