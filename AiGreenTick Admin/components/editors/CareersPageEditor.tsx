import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface CareersPageEditorProps {
  data: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      primaryBtn: string;
      secondaryBtn: string;
    };
    culture: {
      title: string;
      desc: string;
      bulletPoints: string[];
    };
    values: { title: string; desc: string }[];
    roles: { title: string; type: string; loc: string; desc: string }[];
    process: { step: string; title: string; desc: string }[];
    benefits: string[];
    faqs: { q: string; a: string }[];
    cta: {
      title: string;
      desc: string;
      primaryBtn: string;
      secondaryBtn: string;
    };
    lifeAt?: {
      desc: string;
    };
  };
  onSave: (updatedData: any) => void;
}

const CareersPageEditor: React.FC<CareersPageEditorProps> = ({ data, onSave }) => {
  const [form, setForm] = useState(() => {
    const base = data || {
      hero: {
        badge: 'CAREERS',
        title: 'Join Us in Building the Future of WhatsApp Automation',
        subtitle: "At AI Greentick, we’re creating tools that help thousands of businesses communicate better. If you're passionate about product, technology and customer experience — you’ll feel right at home here.",
        primaryBtn: 'View Open Roles',
        secondaryBtn: 'Connect With HR'
      },
      culture: {
        title: 'A Culture Built on Innovation, Ownership & Growth',
        desc: 'We believe great products come from teams who feel empowered, trusted and encouraged to experiment. Everyone at AI Greentick contributes ideas, solves problems and builds with purpose.',
        bulletPoints: ['Remote friendly team', 'Fast paced and collaborative', 'Ownership over your work', 'Transparent communication']
      },
      values: [],
      roles: [],
      process: [],
      benefits: [],
      faqs: [],
      cta: {
        title: 'Ready to Build Something Meaningful?',
        desc: "If you're passionate about creating modern communication tools and want to be part of a fast growing SaaS team, we’d love to meet you.",
        primaryBtn: 'View Open Roles',
        secondaryBtn: 'Connect With HR'
      }
    };
    return {
      ...base,
      lifeAt: base.lifeAt || { desc: "We work hard, play hard, and always push the boundaries of what's possible in the WhatsApp automation space." }
    };
  });

  const handleRoleChange = (index: number, key: 'title' | 'type' | 'loc' | 'desc', val: string) => {
    const newRoles = [...form.roles];
    newRoles[index][key] = val;
    setForm({ ...form, roles: newRoles });
  };

  const addRole = () => {
    setForm({
      ...form,
      roles: [...form.roles, { title: 'New Role Title', type: 'Full time', loc: 'Remote', desc: 'Short job desc...' }]
    });
  };

  const deleteRole = (index: number) => {
    setForm({ ...form, roles: form.roles.filter((_, i) => i !== index) });
  };

  const handleBenefitChange = (index: number, val: string) => {
    const newBens = [...form.benefits];
    newBens[index] = val;
    setForm({ ...form, benefits: newBens });
  };

  const addBenefit = () => {
    setForm({ ...form, benefits: [...form.benefits, 'New Benefit Point'] });
  };

  const deleteBenefit = (index: number) => {
    setForm({ ...form, benefits: form.benefits.filter((_, i) => i !== index) });
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
    setForm({ ...form, faqs: form.faqs.filter((_, i) => i !== index) });
  };

  const handleProcessChange = (index: number, key: 'step' | 'title' | 'desc', val: string) => {
    const newProc = [...form.process];
    newProc[index][key] = val;
    setForm({ ...form, process: newProc });
  };

  const addProcessStep = () => {
    setForm({
      ...form,
      process: [...form.process, { step: (form.process.length + 1).toString(), title: 'New Step', desc: 'Details...' }]
    });
  };

  const deleteProcessStep = (index: number) => {
    setForm({ ...form, process: form.process.filter((_, i) => i !== index) });
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
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 mb-5">Careers Hero Copy</h3>
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
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm h-20"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">Primary Btn Text</label>
              <input 
                type="text" 
                value={form.hero.primaryBtn}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, primaryBtn: e.target.value } })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">Secondary Btn Text</label>
              <input 
                type="text" 
                value={form.hero.secondaryBtn}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, secondaryBtn: e.target.value } })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
          </div>
        </div>

        {/* OPEN POSITIONS */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-5">
            <h3 className="font-bold text-sm text-white">Open Positions</h3>
            <button 
              type="button" 
              onClick={addRole}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-300 font-bold rounded-lg border border-emerald-500/20 text-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Open Role
            </button>
          </div>
          <div className="space-y-6">
            {form.roles.map((role, i) => (
              <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-4 relative">
                <button 
                  type="button" 
                  onClick={() => deleteRole(i)}
                  className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-3 gap-4 w-[90%]">
                  <div className="space-y-1.5 col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 block">Job Title</label>
                    <input 
                      type="text" 
                      value={role.title}
                      onChange={(e) => handleRoleChange(i, 'title', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 block">Type (e.g. Full time)</label>
                    <input 
                      type="text" 
                      value={role.type}
                      onChange={(e) => handleRoleChange(i, 'type', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 w-[90%]">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 block">Location</label>
                    <input 
                      type="text" 
                      value={role.loc}
                      onChange={(e) => handleRoleChange(i, 'loc', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 block">Job Description</label>
                    <textarea 
                      value={role.desc}
                      onChange={(e) => handleRoleChange(i, 'desc', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs h-16"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HIRING PROCESS */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-5">
            <h3 className="font-bold text-sm text-white">Hiring Process Steps</h3>
            <button 
              type="button" 
              onClick={addProcessStep}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-300 font-bold rounded-lg border border-emerald-500/20 text-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Process Step
            </button>
          </div>
          <div className="space-y-4">
            {form.process.map((step, i) => (
              <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 relative">
                <button 
                  type="button" 
                  onClick={() => deleteProcessStep(i)}
                  className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-3 gap-4 w-[90%]">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 block">Step Number</label>
                    <input 
                      type="text" 
                      value={step.step}
                      onChange={(e) => handleProcessChange(i, 'step', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs font-bold"
                    />
                  </div>
                  <div className="space-y-1.5 col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 block">Step Title</label>
                    <input 
                      type="text" 
                      value={step.title}
                      onChange={(e) => handleProcessChange(i, 'title', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs"
                    />
                  </div>
                </div>
                <div className="space-y-1.5 w-[90%]">
                  <label className="text-[10px] font-bold text-slate-400 block">Step Details</label>
                  <input 
                    type="text" 
                    value={step.desc}
                    onChange={(e) => handleProcessChange(i, 'desc', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BENEFITS */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-5">
            <h3 className="font-bold text-sm text-white">Benefits list</h3>
            <button 
              type="button" 
              onClick={addBenefit}
              className="text-[10px] font-bold text-emerald-400 bg-emerald-600/10 border border-emerald-500/20 px-2.5 py-1 rounded-md hover:bg-emerald-600/20 transition-colors"
            >
              + Add Benefit
            </button>
          </div>
          <div className="space-y-3">
            {form.benefits.map((benefit, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input 
                  type="text" 
                  value={benefit}
                  onChange={(e) => handleBenefitChange(i, e.target.value)}
                  className="flex-1 px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs"
                />
                <button 
                  type="button" 
                  onClick={() => deleteBenefit(i)}
                  className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-5">
            <h3 className="font-bold text-sm text-white">Careers FAQs</h3>
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

        {/* LIFE AT AI GREENTICK */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 mb-5">Life at AI Greentick Description</h3>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 block">Description</label>
            <textarea 
              value={form.lifeAt.desc}
              onChange={(e) => setForm({ ...form, lifeAt: { ...form.lifeAt, desc: e.target.value } })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm h-20"
            />
          </div>
        </div>

        {/* CTA FINAL */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 mb-5">Careers Final CTA</h3>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 block">CTA Title</label>
            <input 
              type="text" 
              value={form.cta.title}
              onChange={(e) => setForm({ ...form, cta: { ...form.cta, title: e.target.value } })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
            />
          </div>
          <div className="space-y-1.5 mt-4">
            <label className="text-xs font-bold text-slate-400 block">CTA Description</label>
            <textarea 
              value={form.cta.desc}
              onChange={(e) => setForm({ ...form, cta: { ...form.cta, desc: e.target.value } })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm h-16"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">Primary Btn Text</label>
              <input 
                type="text" 
                value={form.cta.primaryBtn}
                onChange={(e) => setForm({ ...form, cta: { ...form.cta, primaryBtn: e.target.value } })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">Secondary Btn Text</label>
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
          <Save className="w-5 h-5" /> Save Careers Content
        </button>

      </form>
    </div>
  );
};

export default CareersPageEditor;
