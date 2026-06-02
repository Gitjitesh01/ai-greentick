import React, { useState } from 'react';
import { Save, Plus, Trash2, Link } from 'lucide-react';
import ImagePickerModal from './ImagePickerModal.tsx';

interface Brand {
  name: string;
  url: string;
  h: string;
}

interface SocialProofEditorProps {
  data: {
    heading: string;
    desc: string;
    companies: Brand[];
  };
  onSave: (updatedData: any) => void;
}

const SocialProofEditor: React.FC<SocialProofEditorProps> = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {
    heading: 'Trusted by Agencies, D2C Brands and Service Companies',
    desc: 'From early stage startups to established brands, teams use AI Greentick to manage WhatsApp conversations at scale.',
    companies: [
      { name: 'Dell', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/1024px-Dell_Logo.svg.png', h: 'h-8' },
      { name: 'Microsoft', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png', h: 'h-8' }
    ]
  });

  const [pickerOpen, setPickerOpen] = useState(false);
  const [activePickerIndex, setActivePickerIndex] = useState<number | null>(null);

  const handleAddCompany = () => {
    setForm({ 
      ...form, 
      companies: [...form.companies, { name: '', url: '', h: 'h-8' }] 
    });
  };

  const handleRemoveCompany = (index: number) => {
    const updated = form.companies.filter((_, i) => i !== index);
    setForm({ ...form, companies: updated });
  };

  const handleCompanyFieldChange = (index: number, field: keyof Brand, value: string) => {
    const updated = [...form.companies];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, companies: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6 max-w-4xl">
      <h3 className="font-bold text-base text-white border-b border-slate-800 pb-4 mb-6">Social Proof Logos Manager</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Heading</label>
            <input 
              type="text" 
              value={form.heading}
              onChange={(e) => setForm({ ...form, heading: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Description Text</label>
            <textarea 
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-brand-500 text-white text-sm h-20 resize-none leading-relaxed"
            />
          </div>
        </div>

        <div className="space-y-4 border-t border-slate-800 pt-6">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Client Brand Logos</label>
            <button 
              type="button"
              onClick={handleAddCompany}
              className="text-xs font-bold text-brand-500 hover:text-brand-400 flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg px-3 py-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Brand Logo
            </button>
          </div>

          <div className="space-y-4">
            {form.companies.map((company, index) => (
              <div key={index} className="p-4 bg-slate-900/50 border border-slate-800/80 rounded-2xl flex flex-col md:flex-row gap-4 items-center relative group">
                {/* Logo Image Preview */}
                <div className="w-24 h-16 bg-white/5 border border-slate-800 rounded-xl flex items-center justify-center p-2 shrink-0 overflow-hidden">
                  {company.url ? (
                    <img 
                      src={company.url} 
                      alt={company.name || 'Brand Logo'} 
                      className="max-h-full max-w-full object-contain filter invert opacity-80 brightness-200"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <Link className="w-6 h-6 text-slate-600" />
                  )}
                </div>

                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Brand Name</label>
                    <input 
                      type="text" 
                      value={company.name}
                      onChange={(e) => handleCompanyFieldChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-none focus:border-brand-500"
                      placeholder="e.g. Meta, Slack"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Logo Image URL</label>
                      <div className="flex items-center gap-2">
                        <label className="text-[9px] font-extrabold text-emerald-500 hover:text-emerald-450 uppercase tracking-wider cursor-pointer transition-colors">
                          Upload File
                          <input 
                            type="file" 
                            accept="image/*"
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => {
                                  handleCompanyFieldChange(index, 'url', reader.result as string);
                                };
                              }
                            }}
                          />
                        </label>
                        <span className="text-[9px] text-slate-700">|</span>
                        <button
                          type="button"
                          onClick={() => {
                            setActivePickerIndex(index);
                            setPickerOpen(true);
                          }}
                          className="text-[9px] font-extrabold text-emerald-500 hover:text-emerald-400 uppercase tracking-wider transition-colors"
                        >
                          Select from Library
                        </button>
                      </div>
                    </div>
                    <input 
                      type="text" 
                      value={company.url}
                      onChange={(e) => handleCompanyFieldChange(index, 'url', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-none focus:border-brand-500 font-mono"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-auto self-stretch justify-center items-end">
                  <div className="space-y-1 w-full">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Height Class</label>
                    <select
                      value={company.h || 'h-8'}
                      onChange={(e) => handleCompanyFieldChange(index, 'h', e.target.value)}
                      className="w-full px-2 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 outline-none focus:border-brand-500 cursor-pointer"
                    >
                      <option value="h-6">Small (h-6)</option>
                      <option value="h-8">Normal (h-8)</option>
                      <option value="h-10">Large (h-10)</option>
                      <option value="h-12">Extra Large (h-12)</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => handleRemoveCompany(index)}
                  className="absolute top-2 right-2 p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent rounded-lg md:relative md:top-auto md:right-auto md:self-center"
                  title="Remove Logo"
                >
                  <Trash2 className="w-4.5 h-4.5" />
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
          Save Social Proof Section
        </button>
      </form>

      <ImagePickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(url) => {
          if (activePickerIndex !== null) {
            handleCompanyFieldChange(activePickerIndex, 'url', url);
          }
        }}
      />
    </div>
  );
};

export default SocialProofEditor;
