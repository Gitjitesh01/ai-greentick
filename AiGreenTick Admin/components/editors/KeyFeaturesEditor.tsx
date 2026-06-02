import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface KeyFeaturesEditorProps {
  data: {
    badge: string;
    title: string;
    desc: string;
    features: { title: string; desc: string }[];
  };
  onSave: (updatedData: any) => void;
}

const KeyFeaturesEditor: React.FC<KeyFeaturesEditorProps> = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {
    badge: 'PRODUCT OVERVIEW',
    title: 'Everything You Need to Scale WhatsApp',
    desc: 'Scale up your client operations and build beautiful broadcast sequences with all our key modular automation integrations.',
    features: [
      { title: 'Shared Team Inbox', desc: 'Manage chats collaboratively with your team in a single multi-agent workspace.' },
      { title: 'Broadcast Campaigns', desc: 'Send bulk updates and promotional notifications with high delivery rates.' },
      { title: 'AI Chatbot Builder', desc: 'Create codeless chatbot conversation flows to handle recurring customer queries.' },
      { title: 'CRM Integration', desc: 'Sync customer chats and metadata instantly with HubSpot, Salesforce, and Zoho.' }
    ]
  });

  const handleAddFeature = () => {
    setForm({ ...form, features: [...form.features, { title: '', desc: '' }] });
  };

  const handleRemoveFeature = (idx: number) => {
    setForm({ ...form, features: form.features.filter((_, i) => i !== idx) });
  };

  const handleFeatureChange = (idx: number, field: string, value: string) => {
    const updated = [...form.features];
    updated[idx] = { ...updated[idx], [field]: value };
    setForm({ ...form, features: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6 max-w-4xl space-y-6">
      <h3 className="font-bold text-base text-white border-b border-slate-800 pb-4 mb-4">Key Features Section</h3>
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
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Individual Features Cards</label>
            <button 
              type="button" 
              onClick={handleAddFeature}
              className="text-xs font-bold text-brand-500 hover:text-brand-400 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Feature Card
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {form.features.map((feature, idx) => (
              <div key={idx} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2 relative">
                <input 
                  type="text" 
                  value={feature.title}
                  onChange={(e) => handleFeatureChange(idx, 'title', e.target.value)}
                  className="w-[85%] px-3 py-2 bg-slate-950 border border-slate-800 rounded text-white text-xs font-bold"
                  placeholder="Card Title"
                />
                <textarea 
                  value={feature.desc}
                  onChange={(e) => handleFeatureChange(idx, 'desc', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-955 border border-slate-800 rounded text-white text-xs h-16 resize-none"
                  placeholder="Card description text..."
                />
                <button 
                  type="button"
                  onClick={() => handleRemoveFeature(idx)}
                  className="absolute top-2.5 right-2.5 p-1 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent"
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
          Save Features List
        </button>
      </form>
    </div>
  );
};

export default KeyFeaturesEditor;
