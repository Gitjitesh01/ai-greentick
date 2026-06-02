import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface UseCasesEditorProps {
  data: {
    badge: string;
    title: string;
    desc: string;
    useCases: { tag: string; title: string; desc: string }[];
  };
  onSave: (updatedData: any) => void;
}

const UseCasesEditor: React.FC<UseCasesEditorProps> = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {
    badge: 'USE CASES',
    title: 'Built For High-Growth Business Models',
    desc: 'Automate interactions and build dynamic pipelines tailored specifically for support, sales, and operations.',
    useCases: [
      { tag: 'D2C BRANDS', title: 'Automate Order Updates', desc: 'Send direct shipping tracks and abandoned checkout carts automatically.' },
      { tag: 'SUPPORT TEAMS', title: 'Resolve FAQs Instantly', desc: 'Equip your customer support representatives with AI chatbot deflection.' },
      { tag: 'MARKETERS', title: 'Scale Broadcast Marketing', desc: 'Broadcast campaigns directly to categorized contact sheets.' }
    ]
  });

  const handleAddUseCase = () => {
    setForm({ 
      ...form, 
      useCases: [...form.useCases, { tag: '', title: '', desc: '' }] 
    });
  };

  const handleRemoveUseCase = (idx: number) => {
    setForm({ ...form, useCases: form.useCases.filter((_, i) => i !== idx) });
  };

  const handleUseCaseChange = (idx: number, field: string, value: string) => {
    const updated = [...form.useCases];
    updated[idx] = { ...updated[idx], [field]: value };
    setForm({ ...form, useCases: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="bg-slate-955/40 border border-slate-800 rounded-2xl p-6 max-w-4xl space-y-6">
      <h3 className="font-bold text-base text-white border-b border-slate-800 pb-4 mb-4">Use Cases Section</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Badge Text</label>
            <input 
              type="text" 
              value={form.badge}
              onChange={(e) => setForm({ ...form, badge: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm"
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Section Title</label>
            <input 
              type="text" 
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Section Description</label>
          <textarea 
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm h-20"
          />
        </div>

        <div className="border-t border-slate-800 pt-6 space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Individual Use Cases</label>
            <button 
              type="button" 
              onClick={handleAddUseCase}
              className="text-xs font-bold text-brand-500 hover:text-brand-400 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Use Case
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {form.useCases.map((useCase, idx) => (
              <div key={idx} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2 relative">
                <input 
                  type="text" 
                  value={useCase.tag}
                  onChange={(e) => handleUseCaseChange(idx, 'tag', e.target.value.toUpperCase())}
                  className="w-[85%] px-3 py-1 bg-slate-950 border border-slate-800 rounded text-brand-400 text-[10px] font-bold tracking-wider"
                  placeholder="TAG (e.g. MARKETING)"
                />
                <input 
                  type="text" 
                  value={useCase.title}
                  onChange={(e) => handleUseCaseChange(idx, 'title', e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-white text-xs font-bold"
                  placeholder="Use Case Title"
                />
                <textarea 
                  value={useCase.desc}
                  onChange={(e) => handleUseCaseChange(idx, 'desc', e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-955 border border-slate-800 rounded text-white text-xs h-16 resize-none"
                  placeholder="Short description..."
                />
                <button 
                  type="button"
                  onClick={() => handleRemoveUseCase(idx)}
                  className="absolute top-3 right-3 p-1 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition-all"
        >
          <Save className="w-4.5 h-4.5" />
          Save Use Cases Config
        </button>
      </form>
    </div>
  );
};

export default UseCasesEditor;
