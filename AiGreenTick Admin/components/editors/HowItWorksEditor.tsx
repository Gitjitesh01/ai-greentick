import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface HowItWorksEditorProps {
  data: {
    badge: string;
    title: string;
    steps: { step: string; title: string; desc: string }[];
  };
  onSave: (updatedData: any) => void;
}

const HowItWorksEditor: React.FC<HowItWorksEditorProps> = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {
    badge: 'SETUP PROCESS',
    title: 'Get Started In 3 Easy Steps',
    steps: [
      { step: '01', title: 'Connect WhatsApp API', desc: 'Secure your number verification via Meta Business console integration.' },
      { step: '02', title: 'Configure Automations', desc: 'Build your customized welcome messages and AI routing parameters.' },
      { step: '03', title: 'Go Live & Collaborate', desc: 'Launch broadcasts and reply to customer chats dynamically.' }
    ]
  });

  const handleAddStep = () => {
    setForm({ 
      ...form, 
      steps: [...form.steps, { step: String(form.steps.length + 1).padStart(2, '0'), title: '', desc: '' }] 
    });
  };

  const handleRemoveStep = (idx: number) => {
    const updated = form.steps.filter((_, i) => i !== idx).map((step, i) => ({
      ...step,
      step: String(i + 1).padStart(2, '0')
    }));
    setForm({ ...form, steps: updated });
  };

  const handleStepChange = (idx: number, field: string, value: string) => {
    const updated = [...form.steps];
    updated[idx] = { ...updated[idx], [field]: value };
    setForm({ ...form, steps: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6 max-w-4xl space-y-6">
      <h3 className="font-bold text-base text-white border-b border-slate-800 pb-4 mb-4">How It Works Section</h3>
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

        <div className="border-t border-slate-800 pt-6 space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Workflow Steps</label>
            <button 
              type="button" 
              onClick={handleAddStep}
              className="text-xs font-bold text-brand-500 hover:text-brand-400 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Step
            </button>
          </div>

          <div className="space-y-3">
            {form.steps.map((step, idx) => (
              <div key={idx} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-start gap-4 relative">
                <div className="w-10 h-10 rounded-full bg-brand-500/10 border border-brand-500/25 flex items-center justify-center font-bold text-brand-400 text-sm">
                  {step.step}
                </div>
                <div className="flex-1 space-y-2">
                  <input 
                    type="text" 
                    value={step.title}
                    onChange={(e) => handleStepChange(idx, 'title', e.target.value)}
                    className="w-[85%] px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-white text-xs font-bold"
                    placeholder="Step Title"
                  />
                  <textarea 
                    value={step.desc}
                    onChange={(e) => handleStepChange(idx, 'desc', e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-955 border border-slate-800 rounded text-white text-xs h-16 resize-none"
                    placeholder="Step details..."
                  />
                </div>
                <button 
                  type="button"
                  onClick={() => handleRemoveStep(idx)}
                  className="absolute top-4 right-4 p-1 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent"
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
          Save Steps Configuration
        </button>
      </form>
    </div>
  );
};

export default HowItWorksEditor;
