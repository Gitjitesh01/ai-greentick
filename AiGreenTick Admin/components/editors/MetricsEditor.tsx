import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface MetricsEditorProps {
  data: {
    badge: string;
    title: string;
    items: { value: string; label: string; desc: string }[];
  };
  onSave: (updatedData: any) => void;
}

const MetricsEditor: React.FC<MetricsEditorProps> = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {
    badge: 'OUR PERFORMANCE',
    title: 'Proven Results at Global Scale',
    items: [
      { value: '98%', label: 'Delivery Rate', desc: 'Campaign notifications bypass email filters and arrive instantly.' },
      { value: '4.5x', label: 'ROI Boost', desc: 'D2C brands achieve multiple returns on marketing broadcasts.' },
      { value: '3M+', label: 'Daily Messages', desc: 'Our messaging queue handles millions of API operations daily.' }
    ]
  });

  const handleAddMetric = () => {
    setForm({ 
      ...form, 
      items: [...form.items, { value: '', label: '', desc: '' }] 
    });
  };

  const handleRemoveMetric = (idx: number) => {
    setForm({ ...form, items: form.items.filter((_, i) => i !== idx) });
  };

  const handleMetricChange = (idx: number, field: string, value: string) => {
    const updated = [...form.items];
    updated[idx] = { ...updated[idx], [field]: value };
    setForm({ ...form, items: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6 max-w-4xl space-y-6">
      <h3 className="font-bold text-base text-white border-b border-slate-800 pb-4 mb-4">Metrics Section</h3>
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
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Individual Stat Cards</label>
            <button 
              type="button" 
              onClick={handleAddMetric}
              className="text-xs font-bold text-brand-500 hover:text-brand-400 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Stat Card
            </button>
          </div>

          <div className="space-y-4">
            {form.items.map((metric, idx) => (
              <div key={idx} className="p-4 bg-slate-900 border border-slate-800 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Big Value</label>
                  <input 
                    type="text" 
                    value={metric.value}
                    onChange={(e) => handleMetricChange(idx, 'value', e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-white text-xs font-extrabold"
                    placeholder="e.g. 98% or 4.5x"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Stat Label</label>
                  <input 
                    type="text" 
                    value={metric.label}
                    onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-white text-xs font-bold"
                    placeholder="e.g. Open Rates"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Short Description</label>
                  <textarea 
                    value={metric.desc}
                    onChange={(e) => handleMetricChange(idx, 'desc', e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-955 border border-slate-800 rounded text-white text-xs h-12 resize-none leading-tight"
                    placeholder="Brief description details..."
                  />
                </div>
                <button 
                  type="button"
                  onClick={() => handleRemoveMetric(idx)}
                  className="absolute top-2 right-2 p-1 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent"
                  title="Remove Stat"
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
          Save Metrics Config
        </button>
      </form>
    </div>
  );
};

export default MetricsEditor;
