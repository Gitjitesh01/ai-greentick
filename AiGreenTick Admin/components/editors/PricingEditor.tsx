import React, { useState } from 'react';
import { Save, Plus, Edit2, Trash2, Check, X } from 'lucide-react';

interface PricingEditorProps {
  data: any[];
  onSave: (updatedData: any[]) => void;
}

const PricingEditor: React.FC<PricingEditorProps> = ({ data, onSave }) => {
  const [plans, setPlans] = useState<any[]>(data || []);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<any>({
    name: '',
    priceMonthly: '',
    priceYearly: '',
    isCustom: false,
    desc: '',
    button: 'Get started',
    isPrimary: false,
    badge: '',
    featuresHeader: 'Key features',
    features: ['']
  });

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setForm({ ...plans[index] });
    setShowModal(true);
  };

  const handleNewClick = () => {
    setEditingIndex(null);
    setForm({
      name: '',
      priceMonthly: '',
      priceYearly: '',
      isCustom: false,
      desc: '',
      button: 'Get started',
      isPrimary: false,
      badge: '',
      featuresHeader: 'Key features',
      features: ['']
    });
    setShowModal(true);
  };

  const handleSave = () => {
    let updated = [...plans];
    if (editingIndex !== null) {
      updated[editingIndex] = form;
    } else {
      updated.push(form);
    }
    setPlans(updated);
    setShowModal(false);
    onSave(updated);
  };

  const handleDelete = (index: number) => {
    if (!confirm(`Are you sure you want to delete "${plans[index].name}"?`)) return;
    const updated = plans.filter((_, i) => i !== index);
    setPlans(updated);
    onSave(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <h3 className="font-bold text-base text-white">Pricing Tiers Configuration</h3>
        <button 
          onClick={handleNewClick}
          className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-brand-500/20 transition-all active:scale-98"
        >
          <Plus className="w-4 h-4" /> Add Plan Tier
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div key={index} className={`bg-slate-950/40 border p-6 rounded-2xl flex flex-col justify-between relative ${plan.isPrimary ? 'border-brand-500/50 shadow-lg shadow-brand-500/5' : 'border-slate-800'}`}>
            {plan.badge && (
              <span className="absolute -top-3 left-6 px-3 py-1 bg-brand-500 text-white text-[9px] font-bold rounded-full border border-slate-900 shadow-md">
                {plan.badge}
              </span>
            )}

            <div className="space-y-4">
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-widest">{plan.name}</div>
                <div className="text-2xl font-extrabold text-white mt-1">
                  {plan.isCustom ? '' : '₹'}{plan.priceMonthly}
                  {!plan.isCustom && <span className="text-slate-500 text-xs font-normal">/mo</span>}
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mt-2 line-clamp-3 min-h-[50px]">{plan.desc}</p>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">{plan.featuresHeader}</div>
                <ul className="space-y-2">
                  {plan.features.slice(0, 5).map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-400">
                      <Check className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                      <span className="truncate">{feature}</span>
                    </li>
                  ))}
                  {plan.features.length > 5 && (
                    <li className="text-[10px] text-slate-500 font-semibold pl-5">
                      + {plan.features.length - 5} more features
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="flex gap-2 mt-6 border-t border-slate-855 pt-4">
              <button 
                onClick={() => handleEditClick(index)}
                className="flex-1 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit Plan
              </button>
              <button 
                onClick={() => handleDelete(index)}
                className="p-2.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PLAN ADD/EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-lg text-white mb-6 border-b border-slate-800 pb-4">
              {editingIndex !== null ? 'Modify Subscription Plan' : 'Create Subscription Plan'}
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Plan Name</label>
                  <input 
                    type="text" 
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm"
                    placeholder="e.g. Starter, Growth"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Header Badge</label>
                  <input 
                    type="text" 
                    value={form.badge || ''}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm"
                    placeholder="e.g. Popular, Save 20%"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price (Monthly)</label>
                  <input 
                    type="text" 
                    value={form.priceMonthly}
                    onChange={(e) => setForm({ ...form, priceMonthly: e.target.value })}
                    disabled={form.isCustom}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm disabled:opacity-50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price (Yearly)</label>
                  <input 
                    type="text" 
                    value={form.priceYearly}
                    onChange={(e) => setForm({ ...form, priceYearly: e.target.value })}
                    disabled={form.isCustom}
                    className="w-full px-4 py-2.5 bg-slate-955 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 py-1">
                <input 
                  type="checkbox" 
                  id="isCustom" 
                  checked={form.isCustom} 
                  onChange={(e) => setForm({ ...form, isCustom: e.target.checked })}
                  className="w-4 h-4 accent-brand-500 rounded cursor-pointer"
                />
                <label htmlFor="isCustom" className="text-xs font-semibold text-slate-300 cursor-pointer">
                  This is a "Custom / Enterprise" plan
                </label>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Description</label>
                <textarea 
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm h-16 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Button Label</label>
                  <input 
                    type="text" 
                    value={form.button}
                    onChange={(e) => setForm({ ...form, button: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Features Header</label>
                  <input 
                    type="text" 
                    value={form.featuresHeader}
                    onChange={(e) => setForm({ ...form, featuresHeader: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-955 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 py-1">
                <input 
                  type="checkbox" 
                  id="isPrimary" 
                  checked={form.isPrimary} 
                  onChange={(e) => setForm({ ...form, isPrimary: e.target.checked })}
                  className="w-4 h-4 accent-brand-500 rounded cursor-pointer"
                />
                <label htmlFor="isPrimary" className="text-xs font-semibold text-slate-300 cursor-pointer">
                  Highlight this plan as "Popular"
                </label>
              </div>

              {/* FEATURES BULLET BUILDER */}
              <div className="space-y-2 border-t border-slate-850 pt-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Plan Bullet Features</label>
                  <button 
                    type="button"
                    onClick={() => setForm({ ...form, features: [...form.features, ''] })}
                    className="text-[10px] font-bold text-brand-500 hover:text-brand-400 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Bullet
                  </button>
                </div>
                
                <div className="space-y-2">
                  {form.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex gap-2">
                      <input 
                        type="text" 
                        value={feature}
                        onChange={(e) => {
                          const updated = [...form.features];
                          updated[idx] = e.target.value;
                          setForm({ ...form, features: updated });
                        }}
                        className="flex-1 px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-brand-500 text-xs"
                      />
                      <button 
                        type="button"
                        onClick={() => {
                          const updated = form.features.filter((_: any, i: number) => i !== idx);
                          setForm({ ...form, features: updated });
                        }}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="flex gap-3 justify-end mt-8 border-t border-slate-800 pt-6">
              <button 
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white font-bold text-xs transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-lg shadow-brand-500/20 transition-all"
              >
                Save Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingEditor;
