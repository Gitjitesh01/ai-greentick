import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface SolutionsPageEditorProps {
  data: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
    };
    overview: {
      title: string;
      desc: string;
      items: string[];
    };
    industries: { title: string; desc: string }[];
    roles: { role: string; title: string; desc: string; items: string[] }[];
    benefits: { title: string; desc: string }[];
  };
  onSave: (updatedData: any) => void;
}

const SolutionsPageEditor: React.FC<SolutionsPageEditorProps> = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {
    hero: {
      badge: 'SOLUTIONS',
      title: 'WhatsApp Solutions for Every Type of Business',
      subtitle: 'Whether you run an ecommerce brand, a coaching centre, a service agency or a real estate business, AI Greentick helps you automate conversations, increase engagement and stay organised — all through WhatsApp.',
      primaryCta: 'Explore Industry Solutions',
      secondaryCta: 'Book a Demo'
    },
    overview: {
      title: 'Tailored WhatsApp Solutions for Your Industry',
      desc: 'Different businesses use WhatsApp differently — sales conversations, order updates, lead qualification, support chats, class reminders, booking confirmations and more. AI Greentick adapts to the workflows that matter most to your team.',
      items: ['Industry focused automation', 'Role based workflows', 'Easy to customise', 'Built for speed & scale']
    },
    industries: [],
    roles: [],
    benefits: []
  });

  const handleIndustryChange = (index: number, key: 'title' | 'desc', val: string) => {
    const newInd = [...form.industries];
    newInd[index][key] = val;
    setForm({ ...form, industries: newInd });
  };

  const addIndustry = () => {
    setForm({
      ...form,
      industries: [...form.industries, { title: 'New Industry Sector', desc: 'Sector details...' }]
    });
  };

  const deleteIndustry = (index: number) => {
    setForm({ ...form, industries: form.industries.filter((_, i) => i !== index) });
  };

  const handleRoleChange = (index: number, key: 'role' | 'title' | 'desc', val: string) => {
    const newRoles = [...form.roles];
    newRoles[index][key] = val;
    setForm({ ...form, roles: newRoles });
  };

  const handleRoleBulletChange = (roleIndex: number, bulletIndex: number, val: string) => {
    const newRoles = [...form.roles];
    newRoles[roleIndex].items[bulletIndex] = val;
    setForm({ ...form, roles: newRoles });
  };

  const addRoleBullet = (roleIndex: number) => {
    const newRoles = [...form.roles];
    newRoles[roleIndex].items.push('New role bullet point');
    setForm({ ...form, roles: newRoles });
  };

  const deleteRoleBullet = (roleIndex: number, bulletIndex: number) => {
    const newRoles = [...form.roles];
    newRoles[roleIndex].items = newRoles[roleIndex].items.filter((_, i) => i !== bulletIndex);
    setForm({ ...form, roles: newRoles });
  };

  const addRole = () => {
    setForm({
      ...form,
      roles: [...form.roles, { role: 'New Team Role', title: 'Header info', desc: 'Short details', items: [] }]
    });
  };

  const deleteRole = (index: number) => {
    setForm({ ...form, roles: form.roles.filter((_, i) => i !== index) });
  };

  const handleBenefitChange = (index: number, key: 'title' | 'desc', val: string) => {
    const newBen = [...form.benefits];
    newBen[index][key] = val;
    setForm({ ...form, benefits: newBen });
  };

  const addBenefit = () => {
    setForm({ ...form, benefits: [...form.benefits, { title: 'New Benefit', desc: 'Details...' }] });
  };

  const deleteBenefit = (index: number) => {
    setForm({ ...form, benefits: form.benefits.filter((_, i) => i !== index) });
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
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 mb-5">Solutions Hero Copy</h3>
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

        {/* OVERVIEW SECTION */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 mb-5">Solutions Section Overview Copy</h3>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 block">Overview Title</label>
            <input 
              type="text" 
              value={form.overview.title}
              onChange={(e) => setForm({ ...form, overview: { ...form.overview, title: e.target.value } })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
            />
          </div>
          <div className="space-y-1.5 mt-4">
            <label className="text-xs font-bold text-slate-400 block">Overview Description</label>
            <textarea 
              value={form.overview.desc}
              onChange={(e) => setForm({ ...form, overview: { ...form.overview, desc: e.target.value } })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm h-16"
            />
          </div>
        </div>

        {/* INDUSTRIES LIST */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-5">
            <h3 className="font-bold text-sm text-white">Industry Verticals</h3>
            <button 
              type="button" 
              onClick={addIndustry}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-300 font-bold rounded-lg border border-emerald-500/20 text-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Industry
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {form.industries.map((ind, i) => (
              <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 relative">
                <button 
                  type="button" 
                  onClick={() => deleteIndustry(i)}
                  className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="space-y-1.5 w-[90%]">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Industry Title</label>
                  <input 
                    type="text" 
                    value={ind.title}
                    onChange={(e) => handleIndustryChange(i, 'title', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs"
                  />
                </div>
                <div className="space-y-1.5 w-[90%]">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Industry Details</label>
                  <textarea 
                    value={ind.desc}
                    onChange={(e) => handleIndustryChange(i, 'desc', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs h-16"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROLE BASED WORKFLOWS */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-5">
            <h3 className="font-bold text-sm text-white">Role-Based Workflows</h3>
            <button 
              type="button" 
              onClick={addRole}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-300 font-bold rounded-lg border border-emerald-500/20 text-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Role workflow
            </button>
          </div>
          <div className="space-y-6">
            {form.roles.map((role, rIndex) => (
              <div key={rIndex} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-4 relative">
                <button 
                  type="button" 
                  onClick={() => deleteRole(rIndex)}
                  className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-2 gap-4 w-[90%]">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase block">Role Name</label>
                    <input 
                      type="text" 
                      value={role.role}
                      onChange={(e) => handleRoleChange(rIndex, 'role', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase block">Role Title</label>
                    <input 
                      type="text" 
                      value={role.title}
                      onChange={(e) => handleRoleChange(rIndex, 'title', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs"
                    />
                  </div>
                </div>
                <div className="space-y-1.5 w-[90%]">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block">Role Description</label>
                  <textarea 
                    value={role.desc}
                    onChange={(e) => handleRoleChange(rIndex, 'desc', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs h-16"
                  />
                </div>
                {/* Role bullets list */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400">Bullet points</span>
                    <button 
                      type="button" 
                      onClick={() => addRoleBullet(rIndex)}
                      className="text-[9px] font-bold text-emerald-400 bg-emerald-600/10 border border-emerald-500/20 px-2 py-0.5 rounded"
                    >
                      + Add Bullet
                    </button>
                  </div>
                  {role.items.map((bullet, bIndex) => (
                    <div key={bIndex} className="flex gap-2 items-center">
                      <input 
                        type="text" 
                        value={bullet}
                        onChange={(e) => handleRoleBulletChange(rIndex, bIndex, e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs"
                      />
                      <button 
                        type="button" 
                        onClick={() => deleteRoleBullet(rIndex, bIndex)}
                        className="p-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BENEFITS */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-5">
            <h3 className="font-bold text-sm text-white">Benefits List</h3>
            <button 
              type="button" 
              onClick={addBenefit}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-300 font-bold rounded-lg border border-emerald-500/20 text-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Benefit
            </button>
          </div>
          <div className="space-y-4">
            {form.benefits.map((ben, i) => (
              <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 relative">
                <button 
                  type="button" 
                  onClick={() => deleteBenefit(i)}
                  className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="space-y-1.5 w-[90%]">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Benefit Title</label>
                  <input 
                    type="text" 
                    value={ben.title}
                    onChange={(e) => handleBenefitChange(i, 'title', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs"
                  />
                </div>
                <div className="space-y-1.5 w-[90%]">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Benefit Details</label>
                  <textarea 
                    value={ben.desc}
                    onChange={(e) => handleBenefitChange(i, 'desc', e.target.value)}
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
          <Save className="w-5 h-5" /> Save Solutions Page Content
        </button>

      </form>
    </div>
  );
};

export default SolutionsPageEditor;
