import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface SharedTeamInboxEditorProps {
  data: {
    title: string;
    desc: string;
    features: string[];
  };
  onSave: (updatedData: any) => void;
}

const SharedTeamInboxEditor: React.FC<SharedTeamInboxEditorProps> = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {
    title: 'One Number, Infinite Team Members',
    desc: 'Scale your customer support and sales without sharing physical phones. Our shared team inbox gives everyone a transparent view of all conversations.',
    features: [
      'Assign chats to specific agents automatically',
      'Add private internal notes for collaboration',
      'Tag conversations for easy filtering',
      'Set up automatic out-of-office replies'
    ]
  });

  const handleItemChange = (index: number, val: string) => {
    const newFeatures = [...form.features];
    newFeatures[index] = val;
    setForm({ ...form, features: newFeatures });
  };

  const addFeature = () => {
    setForm({
      ...form,
      features: [...form.features, 'New Inbox Feature']
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
    <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6 max-w-3xl">
      <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 mb-5">Shared Team Inbox Settings</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 block">Section Title</label>
          <input 
            type="text" 
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 block">Section Description</label>
          <textarea 
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm h-24"
          />
        </div>

        <div className="space-y-3 pt-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-400 block">Bullet Features List</label>
            <button 
              type="button" 
              onClick={addFeature}
              className="text-[10px] font-bold text-emerald-400 bg-emerald-600/10 border border-emerald-500/20 px-2.5 py-1 rounded-md hover:bg-emerald-600/20 transition-colors"
            >
              + Add Feature
            </button>
          </div>
          {form.features.map((feature, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input 
                type="text" 
                value={feature}
                onChange={(e) => handleItemChange(i, e.target.value)}
                className="flex-1 px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-lg outline-none focus:border-brand-500 text-white text-xs"
              />
              <button 
                type="button" 
                onClick={() => deleteFeature(i)}
                className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <button 
          type="submit"
          className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition-all mt-6"
        >
          <Save className="w-4.5 h-4.5" /> Save Team Inbox Settings
        </button>
      </form>
    </div>
  );
};

export default SharedTeamInboxEditor;
