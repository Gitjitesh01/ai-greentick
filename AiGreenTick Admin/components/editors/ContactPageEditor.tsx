import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface ContactPageEditorProps {
  data: {
    hero: {
      title: string;
      desc: string;
      primaryBtn: string;
    };
    faqs: { q: string; a: string }[];
  };
  onSave: (updatedData: any) => void;
}

const ContactPageEditor: React.FC<ContactPageEditorProps> = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {
    hero: {
      title: 'We’re Here to Help Succeed on WhatsApp',
      desc: 'Build rich customer profiles, automate responses, and manage your team efficiently. Whether you have questions about pricing, onboarding or integrations — our team is ready to assist.',
      primaryBtn: 'Talk to Sales'
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
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 mb-5">Contact Hero settings</h3>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 block">Hero Title</label>
            <input 
              type="text" 
              value={form.hero.title}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, title: e.target.value } })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
            />
          </div>
          <div className="space-y-1.5 mt-4">
            <label className="text-xs font-bold text-slate-400 block">Hero Description</label>
            <textarea 
              value={form.hero.desc}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, desc: e.target.value } })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm h-20"
            />
          </div>
          <div className="space-y-1.5 mt-4">
            <label className="text-xs font-bold text-slate-400 block">Button CTA Text</label>
            <input 
              type="text" 
              value={form.hero.primaryBtn}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, primaryBtn: e.target.value } })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
            />
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-5">
            <h3 className="font-bold text-sm text-white">Contact Page FAQs</h3>
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
                  <label className="text-[10px] font-bold text-slate-400 uppercase block">Question</label>
                  <input 
                    type="text" 
                    value={faq.q}
                    onChange={(e) => handleFAQChange(i, 'q', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs"
                  />
                </div>
                <div className="space-y-1.5 w-[90%]">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block">Answer</label>
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
          <Save className="w-5 h-5" /> Save Contact Us Content
        </button>

      </form>
    </div>
  );
};

export default ContactPageEditor;
