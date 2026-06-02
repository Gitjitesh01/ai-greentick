import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface ComparePageEditorProps {
  data: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
    };
    overview: {
      title: string;
      desc: string;
      highlights: string[];
    };
    differences: { title: string; desc: string }[];
    comparisonGrid: { feature: string; aigreentick: boolean; wati: boolean }[];
    migration: string[];
  };
  onSave: (updatedData: any) => void;
}

const ComparePageEditor: React.FC<ComparePageEditorProps> = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {
    hero: {
      badge: 'Comparison',
      title: 'AI Greentick vs WATI\nA Clear, Honest Comparison',
      subtitle: 'Both AI Greentick and WATI help businesses communicate on WhatsApp. But the way they handle broadcasts, automation, inbox management and pricing is very different.'
    },
    overview: {
      title: 'Quick Summary: Differences Between Platforms',
      desc: 'WATI is a well known WhatsApp marketing tool with a strong presence in the industry. AI Greentick focuses on simplicity, speed, automation and affordability.',
      highlights: ['Easier onboarding', 'Cleaner UI', 'Lower pricing', 'Stronger automation', 'Faster support']
    },
    differences: [],
    comparisonGrid: [],
    migration: []
  });

  const handleHighlightChange = (index: number, val: string) => {
    const newHl = [...form.overview.highlights];
    newHl[index] = val;
    setForm({
      ...form,
      overview: { ...form.overview, highlights: newHl }
    });
  };

  const addHighlight = () => {
    setForm({
      ...form,
      overview: {
        ...form.overview,
        highlights: [...form.overview.highlights, 'New summary point']
      }
    });
  };

  const deleteHighlight = (index: number) => {
    setForm({
      ...form,
      overview: {
        ...form.overview,
        highlights: form.overview.highlights.filter((_, i) => i !== index)
      }
    });
  };

  const handleDiffChange = (index: number, key: 'title' | 'desc', val: string) => {
    const newDiffs = [...form.differences];
    newDiffs[index][key] = val;
    setForm({ ...form, differences: newDiffs });
  };

  const addDiff = () => {
    setForm({
      ...form,
      differences: [...form.differences, { title: 'Difference Title', desc: 'Explanation...' }]
    });
  };

  const deleteDiff = (index: number) => {
    setForm({ ...form, differences: form.differences.filter((_, i) => i !== index) });
  };

  const handleGridChange = (index: number, key: 'feature' | 'aigreentick' | 'wati', val: any) => {
    const newGrid = [...form.comparisonGrid];
    newGrid[index] = { ...newGrid[index], [key]: val };
    setForm({ ...form, comparisonGrid: newGrid });
  };

  const addGridRow = () => {
    setForm({
      ...form,
      comparisonGrid: [...form.comparisonGrid, { feature: 'New Feature Check', aigreentick: true, wati: false }]
    });
  };

  const deleteGridRow = (index: number) => {
    setForm({ ...form, comparisonGrid: form.comparisonGrid.filter((_, i) => i !== index) });
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
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 mb-5">Compare Hero Copy</h3>
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

        {/* OVERVIEW & HIGHLIGHTS */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 mb-5">Section Overview Copy</h3>
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

          <div className="space-y-3 pt-4 border-t border-slate-800 mt-6">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-400 block">Highlights Bullets</label>
              <button 
                type="button" 
                onClick={addHighlight}
                className="text-[10px] font-bold text-emerald-400 bg-emerald-600/10 border border-emerald-500/20 px-2.5 py-1 rounded-md hover:bg-emerald-600/20 transition-colors"
              >
                + Add Highlight
              </button>
            </div>
            {form.overview.highlights.map((hl, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input 
                  type="text" 
                  value={hl}
                  onChange={(e) => handleHighlightChange(i, e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs"
                />
                <button 
                  type="button" 
                  onClick={() => deleteHighlight(i)}
                  className="p-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* DETAILED DIFFERENCES */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-5">
            <h3 className="font-bold text-sm text-white">Key Differences</h3>
            <button 
              type="button" 
              onClick={addDiff}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-300 font-bold rounded-lg border border-emerald-500/20 text-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Difference
            </button>
          </div>
          <div className="space-y-4">
            {form.differences.map((diff, i) => (
              <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 relative">
                <button 
                  type="button" 
                  onClick={() => deleteDiff(i)}
                  className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="space-y-1.5 w-[90%]">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block">Difference Title</label>
                  <input 
                    type="text" 
                    value={diff.title}
                    onChange={(e) => handleDiffChange(i, 'title', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs"
                  />
                </div>
                <div className="space-y-1.5 w-[90%]">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block">Description</label>
                  <textarea 
                    value={diff.desc}
                    onChange={(e) => handleDiffChange(i, 'desc', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs h-16"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COMPARISON CHECKLIST GRID */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-5">
            <h3 className="font-bold text-sm text-white">Comparison Grid Checklist</h3>
            <button 
              type="button" 
              onClick={addGridRow}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-300 font-bold rounded-lg border border-emerald-500/20 text-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Grid Row
            </button>
          </div>
          <div className="space-y-4">
            {form.comparisonGrid.map((row, i) => (
              <div key={i} className="flex gap-4 items-center bg-slate-900 border border-slate-800 p-3 rounded-xl relative">
                <div className="flex-1 space-y-1">
                  <label className="text-[9px] text-slate-500 font-bold block uppercase">Feature / Parameter</label>
                  <input 
                    type="text" 
                    value={row.feature}
                    onChange={(e) => handleGridChange(i, 'feature', e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs"
                  />
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={row.aigreentick}
                      onChange={(e) => handleGridChange(i, 'aigreentick', e.target.checked)}
                      className="accent-brand-500"
                    />
                    GreenTick
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={row.wati}
                      onChange={(e) => handleGridChange(i, 'wati', e.target.checked)}
                      className="accent-brand-500"
                    />
                    WATI
                  </label>
                  <button 
                    type="button" 
                    onClick={() => deleteGridRow(i)}
                    className="p-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition-all"
        >
          <Save className="w-5 h-5" /> Save Comparison Page Content
        </button>

      </form>
    </div>
  );
};

export default ComparePageEditor;
