import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface ProblemSolutionEditorProps {
  data: {
    badge: string;
    probTitle: string;
    probDesc: string;
    solTitle: string;
    solDesc: string;
    problems: { title: string; desc: string }[];
    solutions: { title: string; desc: string }[];
  };
  onSave: (updatedData: any) => void;
}

const ProblemSolutionEditor: React.FC<ProblemSolutionEditorProps> = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {
    badge: 'THE PROBLEM & THE SOLUTION',
    probTitle: 'Traditional Channels are Broken',
    probDesc: 'Emails go unread, calls are ignored, and SMS is filled with spam. Customers want instant, conversational interactions.',
    solTitle: 'AI Greentick Bridges the Gap',
    solDesc: 'Reach customers instantly on the app they use daily, automate replies, and coordinate team inboxes in one interface.',
    problems: [
      { title: 'Low Open Rates', desc: 'Email open rates hover around 15-20%.' },
      { title: 'Customer Frustration', desc: 'Waiting hours for email support leads to poor satisfaction.' }
    ],
    solutions: [
      { title: '98% Open Rates', desc: 'WhatsApp broadcasts are read within minutes.' },
      { title: 'Instant AI Support', desc: 'AI Chatbots resolve 80% of common queries instantly.' }
    ]
  });

  const handleAddProblem = () => {
    setForm({ ...form, problems: [...form.problems, { title: '', desc: '' }] });
  };

  const handleRemoveProblem = (idx: number) => {
    setForm({ ...form, problems: form.problems.filter((_, i) => i !== idx) });
  };

  const handleAddSolution = () => {
    setForm({ ...form, solutions: [...form.solutions, { title: '', desc: '' }] });
  };

  const handleRemoveSolution = (idx: number) => {
    setForm({ ...form, solutions: form.solutions.filter((_, i) => i !== idx) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6 space-y-6">
      <h3 className="font-bold text-base text-white border-b border-slate-800 pb-4 mb-4">Problem & Solution Section</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Core texts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Problem Config</h4>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Problem Header Title</label>
              <input 
                type="text" 
                value={form.probTitle}
                onChange={(e) => setForm({ ...form, probTitle: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Problem Description</label>
              <textarea 
                value={form.probDesc}
                onChange={(e) => setForm({ ...form, probDesc: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm h-24"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Solution Config</h4>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Solution Header Title</label>
              <input 
                type="text" 
                value={form.solTitle}
                onChange={(e) => setForm({ ...form, solTitle: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Solution Description</label>
              <textarea 
                value={form.solDesc}
                onChange={(e) => setForm({ ...form, solDesc: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm h-24"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-slate-800 pt-6">
          {/* Problems List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Problem Items</span>
              <button 
                type="button" 
                onClick={handleAddProblem}
                className="text-xs font-bold text-brand-500 hover:text-brand-400 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>
            <div className="space-y-3">
              {form.problems.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2 relative">
                  <input 
                    type="text" 
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...form.problems];
                      updated[idx].title = e.target.value;
                      setForm({ ...form, problems: updated });
                    }}
                    className="w-[85%] px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-white text-xs font-bold"
                    placeholder="Problem Title"
                  />
                  <textarea 
                    value={item.desc}
                    onChange={(e) => {
                      const updated = [...form.problems];
                      updated[idx].desc = e.target.value;
                      setForm({ ...form, problems: updated });
                    }}
                    className="w-full px-3 py-1.5 bg-slate-955 border border-slate-800 rounded text-white text-xs h-16 resize-none"
                    placeholder="Short description..."
                  />
                  <button 
                    type="button"
                    onClick={() => handleRemoveProblem(idx)}
                    className="absolute top-2 right-2 p-1.5 text-red-400 hover:bg-red-500/10 border border-transparent rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Solution Items</span>
              <button 
                type="button" 
                onClick={handleAddSolution}
                className="text-xs font-bold text-brand-500 hover:text-brand-400 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>
            <div className="space-y-3">
              {form.solutions.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2 relative">
                  <input 
                    type="text" 
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...form.solutions];
                      updated[idx].title = e.target.value;
                      setForm({ ...form, solutions: updated });
                    }}
                    className="w-[85%] px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-white text-xs font-bold"
                    placeholder="Solution Title"
                  />
                  <textarea 
                    value={item.desc}
                    onChange={(e) => {
                      const updated = [...form.solutions];
                      updated[idx].desc = e.target.value;
                      setForm({ ...form, solutions: updated });
                    }}
                    className="w-full px-3 py-1.5 bg-slate-955 border border-slate-800 rounded text-white text-xs h-16 resize-none"
                    placeholder="Short description..."
                  />
                  <button 
                    type="button"
                    onClick={() => handleRemoveSolution(idx)}
                    className="absolute top-2 right-2 p-1.5 text-red-400 hover:bg-red-500/10 border border-transparent rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition-all"
        >
          <Save className="w-4.5 h-4.5" />
          Save Problem & Solution Details
        </button>
      </form>
    </div>
  );
};

export default ProblemSolutionEditor;
