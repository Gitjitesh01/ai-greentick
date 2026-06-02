import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface AboutPageEditorProps {
  data: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
    };
    mission: {
      title: string;
      quote: string;
    };
    story: {
      title: string;
      paragraphs: string[];
    };
    values: { title: string; desc: string }[];
    stats: { label: string; value: string }[];
    cta: {
      title: string;
      primaryBtn: string;
      secondaryBtn: string;
    };
  };
  onSave: (updatedData: any) => void;
}

const AboutPageEditor: React.FC<AboutPageEditorProps> = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {
    hero: {
      badge: 'About AI Greentick',
      title: 'We’re making WhatsApp work for business.',
      subtitle: 'Simplifying communication for teams everywhere. Faster replies, smarter automation, and better customer relationships.'
    },
    mission: {
      title: 'Our Mission',
      quote: 'To empower businesses with simple, powerful WhatsApp tools that automate communication and organize teams — without the complexity.'
    },
    story: {
      title: 'Our Story',
      paragraphs: [
        "It started with a simple observation: WhatsApp is where customers are, but businesses were struggling to keep up. Personal phones, scattered chats, and manual replies just weren't scaling.",
        'We built AI Greentick to solve this. A single platform where teams can manage conversations, automate responses, and grow their business efficiently.'
      ]
    },
    values: [],
    stats: [],
    cta: {
      title: 'Ready to get started?',
      primaryBtn: 'Start Free Trial',
      secondaryBtn: 'Contact Sales'
    }
  });

  const handleParagraphChange = (index: number, val: string) => {
    const newParas = [...form.story.paragraphs];
    newParas[index] = val;
    setForm({ ...form, story: { ...form.story, paragraphs: newParas } });
  };

  const addParagraph = () => {
    setForm({
      ...form,
      story: { ...form.story, paragraphs: [...form.story.paragraphs, 'New story paragraph text...'] }
    });
  };

  const deleteParagraph = (index: number) => {
    setForm({
      ...form,
      story: { ...form.story, paragraphs: form.story.paragraphs.filter((_, i) => i !== index) }
    });
  };

  const handleValueChange = (index: number, key: 'title' | 'desc', val: string) => {
    const newVals = [...form.values];
    newVals[index][key] = val;
    setForm({ ...form, values: newVals });
  };

  const addValue = () => {
    setForm({ ...form, values: [...form.values, { title: 'New Core Value', desc: 'Core value explanation...' }] });
  };

  const deleteValue = (index: number) => {
    setForm({ ...form, values: form.values.filter((_, i) => i !== index) });
  };

  const handleStatChange = (index: number, key: 'label' | 'value', val: string) => {
    const newStats = [...form.stats];
    newStats[index][key] = val;
    setForm({ ...form, stats: newStats });
  };

  const addStat = () => {
    setForm({ ...form, stats: [...form.stats, { label: 'New Metric Label', value: '100+' }] });
  };

  const deleteStat = (index: number) => {
    setForm({ ...form, stats: form.stats.filter((_, i) => i !== index) });
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
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 mb-5">About Us Hero Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">Badge</label>
              <input 
                type="text" 
                value={form.hero.badge}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, badge: e.target.value } })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">Hero Title</label>
              <input 
                type="text" 
                value={form.hero.title}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, title: e.target.value } })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
          </div>
          <div className="space-y-1.5 mt-4">
            <label className="text-xs font-bold text-slate-400 block">Hero Subtitle</label>
            <textarea 
              value={form.hero.subtitle}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, subtitle: e.target.value } })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm h-16"
            />
          </div>
        </div>

        {/* MISSION & QUOTE */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 mb-5">Mission Statement</h3>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 block">Mission Heading</label>
            <input 
              type="text" 
              value={form.mission.title}
              onChange={(e) => setForm({ ...form, mission: { ...form.mission, title: e.target.value } })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
            />
          </div>
          <div className="space-y-1.5 mt-4">
            <label className="text-xs font-bold text-slate-400 block">Mission Quote / Text</label>
            <textarea 
              value={form.mission.quote}
              onChange={(e) => setForm({ ...form, mission: { ...form.mission, quote: e.target.value } })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm h-20"
            />
          </div>
        </div>

        {/* STORY */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-5">
            <h3 className="font-bold text-sm text-white">Our Story Paragraphs</h3>
            <button 
              type="button" 
              onClick={addParagraph}
              className="text-[10px] font-bold text-emerald-400 bg-emerald-600/10 border border-emerald-500/20 px-2.5 py-1 rounded-md hover:bg-emerald-600/20 transition-colors"
            >
              + Add Paragraph
            </button>
          </div>
          <div className="space-y-1.5 mb-4">
            <label className="text-xs font-bold text-slate-400 block">Story Heading</label>
            <input 
              type="text" 
              value={form.story.title}
              onChange={(e) => setForm({ ...form, story: { ...form.story, title: e.target.value } })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
            />
          </div>
          <div className="space-y-3 pt-2">
            {form.story.paragraphs.map((p, i) => (
              <div key={i} className="flex gap-2 items-start">
                <textarea 
                  value={p}
                  onChange={(e) => handleParagraphChange(i, e.target.value)}
                  className="flex-1 px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs h-20 leading-relaxed"
                />
                <button 
                  type="button" 
                  onClick={() => deleteParagraph(i)}
                  className="p-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* VALUES */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-5">
            <h3 className="font-bold text-sm text-white">Company Values</h3>
            <button 
              type="button" 
              onClick={addValue}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-300 font-bold rounded-lg border border-emerald-500/20 text-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Core Value
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {form.values.map((v, i) => (
              <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 relative">
                <button 
                  type="button" 
                  onClick={() => deleteValue(i)}
                  className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="space-y-1.5 w-[90%]">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Value Title</label>
                  <input 
                    type="text" 
                    value={v.title}
                    onChange={(e) => handleValueChange(i, 'title', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs"
                  />
                </div>
                <div className="space-y-1.5 w-[90%]">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Value Description</label>
                  <textarea 
                    value={v.desc}
                    onChange={(e) => handleValueChange(i, 'desc', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs h-16"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IMPACT METRICS */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-5">
            <h3 className="font-bold text-sm text-white">Impact / Stat Metrics</h3>
            <button 
              type="button" 
              onClick={addStat}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-300 font-bold rounded-lg border border-emerald-500/20 text-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Stat Card
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {form.stats.map((st, i) => (
              <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 relative">
                <button 
                  type="button" 
                  onClick={() => deleteStat(i)}
                  className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/20"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 block">Value (e.g. 5,000+)</label>
                  <input 
                    type="text" 
                    value={st.value}
                    onChange={(e) => handleStatChange(i, 'value', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 block">Metric label</label>
                  <input 
                    type="text" 
                    value={st.label}
                    onChange={(e) => handleStatChange(i, 'label', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 mb-5">About Final CTA Settings</h3>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 block">CTA Title</label>
            <input 
              type="text" 
              value={form.cta.title}
              onChange={(e) => setForm({ ...form, cta: { ...form.cta, title: e.target.value } })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">Primary Button Text</label>
              <input 
                type="text" 
                value={form.cta.primaryBtn}
                onChange={(e) => setForm({ ...form, cta: { ...form.cta, primaryBtn: e.target.value } })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">Secondary Button Text</label>
              <input 
                type="text" 
                value={form.cta.secondaryBtn}
                onChange={(e) => setForm({ ...form, cta: { ...form.cta, secondaryBtn: e.target.value } })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition-all"
        >
          <Save className="w-5 h-5" /> Save About Us Content
        </button>

      </form>
    </div>
  );
};

export default AboutPageEditor;
