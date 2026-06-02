import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface BroadcastsPageEditorProps {
  data: {
    hero: {
      title: string;
      desc: string;
      primaryCta: string;
      secondaryCta: string;
      badgeText: string;
      deliveryText: string;
    };
    smartAutomation: {
      badge: string;
      title: string;
      desc: string;
      items: string[];
      buttonText: string;
    };
    features: { title: string; desc: string }[];
    faqs: { q: string; a: string }[];
    ctaFinal: {
      title: string;
      desc: string;
      primaryCta: string;
      secondaryCta: string;
    };
  };
  onSave: (updatedData: any) => void;
}

const BroadcastsPageEditor: React.FC<BroadcastsPageEditorProps> = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {
    hero: {
      title: 'Send High Delivery\nWhatsApp Campaigns',
      desc: "Reach thousands instantly with personalised WhatsApp broadcasts equipped with interactive buttons (e.g. 'Call Now', 'Visit Website'). Promote offers, send reminders, share updates and drive conversions with better delivery.",
      primaryCta: 'Start Sending Broadcasts',
      secondaryCta: 'Book a Demo',
      badgeText: 'Campaign Sent!',
      deliveryText: '98% Delivery Rate'
    },
    smartAutomation: {
      badge: 'Smart Automation',
      title: "Don't Let Broadcast Replies Overwhelm You",
      desc: 'Sending a campaign to 5,000 customers? You might get hundreds of replies in minutes. Instead of manual handling, let our AI Chatbot instantly answer FAQs, qualify leads, and schedule appointments 24/7.',
      items: [
        'Auto-reply to common questions (Price, Location, etc.)',
        'Qualify interested leads before human handover',
        'Book meetings or collect details automatically'
      ],
      buttonText: 'Explore Chatbot Builder'
    },
    features: [],
    faqs: [],
    ctaFinal: {
      title: 'Start Sending Smarter Broadcasts',
      desc: 'Join thousands of businesses engaging their customers on WhatsApp with AI Greentick.',
      primaryCta: 'Start Free Trial',
      secondaryCta: 'Book a Demo'
    }
  });

  const handleItemChange = (index: number, val: string) => {
    const newItems = [...form.smartAutomation.items];
    newItems[index] = val;
    setForm({
      ...form,
      smartAutomation: { ...form.smartAutomation, items: newItems }
    });
  };

  const addItem = () => {
    setForm({
      ...form,
      smartAutomation: {
        ...form.smartAutomation,
        items: [...form.smartAutomation.items, 'New feature bullet point']
      }
    });
  };

  const deleteItem = (index: number) => {
    setForm({
      ...form,
      smartAutomation: {
        ...form.smartAutomation,
        items: form.smartAutomation.items.filter((_, i) => i !== index)
      }
    });
  };

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

  const handleFeatureChange = (index: number, key: 'title' | 'desc', val: string) => {
    const newFeatures = [...form.features];
    newFeatures[index][key] = val;
    setForm({ ...form, features: newFeatures });
  };

  const addFeature = () => {
    setForm({
      ...form,
      features: [...form.features, { title: 'New Feature Card', desc: 'Card details...' }]
    });
  };

  const deleteFeature = (index: number) => {
    setForm({
      ...form,
      features: form.features.filter((_, i) => i !== index)
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
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 mb-5">Broadcasts Hero Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">Floating Status Title</label>
              <input 
                type="text" 
                value={form.hero.badgeText}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, badgeText: e.target.value } })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">Floating Status Subtitle</label>
              <input 
                type="text" 
                value={form.hero.deliveryText}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, deliveryText: e.target.value } })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
          </div>
          <div className="space-y-1.5 mt-4">
            <label className="text-xs font-bold text-slate-400 block">Hero Title</label>
            <textarea 
              value={form.hero.title}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, title: e.target.value } })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm h-20 font-mono"
            />
          </div>
          <div className="space-y-1.5 mt-4">
            <label className="text-xs font-bold text-slate-400 block">Hero Description</label>
            <textarea 
              value={form.hero.desc}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, desc: e.target.value } })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm h-24"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">Primary CTA Text</label>
              <input 
                type="text" 
                value={form.hero.primaryCta}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, primaryCta: e.target.value } })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">Secondary CTA Text</label>
              <input 
                type="text" 
                value={form.hero.secondaryCta}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, secondaryCta: e.target.value } })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
          </div>
        </div>

        {/* FEATURES CARDS */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-5">
            <h3 className="font-bold text-sm text-white">Broadcast Value Features</h3>
            <button 
              type="button" 
              onClick={addFeature}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-300 font-bold rounded-lg border border-emerald-500/20 text-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Feature Card
            </button>
          </div>
          <div className="space-y-4">
            {form.features.map((feat, i) => (
              <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 relative">
                <button 
                  type="button" 
                  onClick={() => deleteFeature(i)}
                  className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="space-y-1.5 w-[90%]">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Feature Title</label>
                  <input 
                    type="text" 
                    value={feat.title}
                    onChange={(e) => handleFeatureChange(i, 'title', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs"
                  />
                </div>
                <div className="space-y-1.5 w-[90%]">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Feature Description</label>
                  <textarea 
                    value={feat.desc}
                    onChange={(e) => handleFeatureChange(i, 'desc', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs h-16"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SMART AUTOMATION SECTION */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 mb-5">Smart Chatbot Automation Section</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">Badge Text</label>
              <input 
                type="text" 
                value={form.smartAutomation.badge}
                onChange={(e) => setForm({ ...form, smartAutomation: { ...form.smartAutomation, badge: e.target.value } })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">Button Text</label>
              <input 
                type="text" 
                value={form.smartAutomation.buttonText}
                onChange={(e) => setForm({ ...form, smartAutomation: { ...form.smartAutomation, buttonText: e.target.value } })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
          </div>
          <div className="space-y-1.5 mt-4">
            <label className="text-xs font-bold text-slate-400 block">Section Title</label>
            <input 
              type="text" 
              value={form.smartAutomation.title}
              onChange={(e) => setForm({ ...form, smartAutomation: { ...form.smartAutomation, title: e.target.value } })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
            />
          </div>
          <div className="space-y-1.5 mt-4">
            <label className="text-xs font-bold text-slate-400 block">Description Text</label>
            <textarea 
              value={form.smartAutomation.desc}
              onChange={(e) => setForm({ ...form, smartAutomation: { ...form.smartAutomation, desc: e.target.value } })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm h-20"
            />
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-400 block">Bullets List</label>
              <button 
                type="button" 
                onClick={addItem}
                className="text-[10px] font-bold text-emerald-400 bg-emerald-600/10 border border-emerald-500/20 px-2.5 py-1 rounded-md hover:bg-emerald-600/20 transition-colors"
              >
                + Add Bullet
              </button>
            </div>
            {form.smartAutomation.items.map((bullet, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input 
                  type="text" 
                  value={bullet}
                  onChange={(e) => handleItemChange(i, e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs"
                />
                <button 
                  type="button" 
                  onClick={() => deleteItem(i)}
                  className="p-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-5">
            <h3 className="font-bold text-sm text-white">Broadcasts FAQs</h3>
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

        {/* CTA FINAL */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 mb-5">Broadcasts Final CTA Settings</h3>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 block">CTA Title</label>
            <input 
              type="text" 
              value={form.ctaFinal.title}
              onChange={(e) => setForm({ ...form, ctaFinal: { ...form.ctaFinal, title: e.target.value } })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
            />
          </div>
          <div className="space-y-1.5 mt-4">
            <label className="text-xs font-bold text-slate-400 block">CTA Description</label>
            <textarea 
              value={form.ctaFinal.desc}
              onChange={(e) => setForm({ ...form, ctaFinal: { ...form.ctaFinal, desc: e.target.value } })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm h-16"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">Primary Btn Text</label>
              <input 
                type="text" 
                value={form.ctaFinal.primaryCta}
                onChange={(e) => setForm({ ...form, ctaFinal: { ...form.ctaFinal, primaryCta: e.target.value } })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">Secondary Btn Text</label>
              <input 
                type="text" 
                value={form.ctaFinal.secondaryCta}
                onChange={(e) => setForm({ ...form, ctaFinal: { ...form.ctaFinal, secondaryCta: e.target.value } })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition-all"
        >
          <Save className="w-5 h-5" /> Save Broadcasts Page Content
        </button>

      </form>
    </div>
  );
};

export default BroadcastsPageEditor;
