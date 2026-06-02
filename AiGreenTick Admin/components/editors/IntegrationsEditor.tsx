import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface IntegrationItem {
  name: string;
  desc: string;
}

interface IntegrationsEditorProps {
  data: {
    title: string;
    desc: string;
    items: IntegrationItem[];
  };
  onSave: (updatedData: any) => void;
}

const IntegrationsEditor: React.FC<IntegrationsEditorProps> = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {
    title: 'Works With Your Existing Tools',
    desc: 'Connect AI Greentick with your store, CRM and internal tools so your WhatsApp data is never isolated.',
    items: []
  });

  const handleAddItem = () => {
    setForm({
      ...form,
      items: [...form.items, { name: '', desc: '' }]
    });
  };

  const handleRemoveItem = (index: number) => {
    const updated = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: updated });
  };

  const handleFieldChange = (index: number, field: keyof IntegrationItem, value: string) => {
    const updated = [...form.items];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, items: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6 max-w-4xl space-y-6">
      <h3 className="font-bold text-base text-white border-b border-slate-800 pb-4 mb-4">Integrations Manager</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Section Heading</label>
            <input 
              type="text" 
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Section Description</label>
            <input 
              type="text" 
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm"
            />
          </div>
        </div>

        <div className="space-y-4 border-t border-slate-800 pt-6">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Integration Tiers / Cards</label>
            <button 
              type="button"
              onClick={handleAddItem}
              className="text-xs font-bold text-brand-500 hover:text-brand-400 flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Integration
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {form.items.map((item, index) => (
              <div key={index} className="p-4 bg-slate-900/50 border border-slate-800/80 rounded-2xl space-y-3 relative group">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Tool / App Name</label>
                  <input 
                    type="text" 
                    value={item.name}
                    onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                    className="w-[85%] px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-none focus:border-brand-500 font-bold"
                    placeholder="e.g. Shopify, Zapier"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Short Description</label>
                  <textarea 
                    value={item.desc}
                    onChange={(e) => handleFieldChange(index, 'desc', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs h-16 resize-none leading-relaxed"
                    placeholder="Describe how the integration works..."
                  />
                </div>

                <button 
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="absolute top-2 right-2 p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent rounded-lg"
                  title="Remove Integration"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition-all mt-6"
        >
          <Save className="w-4.5 h-4.5" />
          Save Integrations List
        </button>
      </form>
    </div>
  );
};

export default IntegrationsEditor;
