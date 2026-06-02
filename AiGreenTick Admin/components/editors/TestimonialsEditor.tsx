import React, { useState } from 'react';
import { Save, Plus, Trash2, User } from 'lucide-react';
import ImagePickerModal from './ImagePickerModal.tsx';

interface Testimonial {
  name: string;
  role: string;
  image: string;
  text: string;
}

interface TestimonialsEditorProps {
  data: {
    title: string;
    desc: string;
    row1: Testimonial[];
    row2: Testimonial[];
  };
  onSave: (updatedData: any) => void;
}

const TestimonialsEditor: React.FC<TestimonialsEditorProps> = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {
    title: 'Loved by Businesses Worldwide',
    desc: 'See what over 500+ businesses are saying about their experience with AI Greentick.',
    row1: [],
    row2: []
  });

  const [pickerOpen, setPickerOpen] = useState(false);
  const [activePickerRow, setActivePickerRow] = useState<'row1' | 'row2' | null>(null);
  const [activePickerIndex, setActivePickerIndex] = useState<number | null>(null);

  const handleAddTestimonial = (row: 'row1' | 'row2') => {
    setForm({
      ...form,
      [row]: [...form[row], { name: '', role: '', image: '', text: '' }]
    });
  };

  const handleRemoveTestimonial = (row: 'row1' | 'row2', index: number) => {
    const updatedRow = form[row].filter((_, i) => i !== index);
    setForm({
      ...form,
      [row]: updatedRow
    });
  };

  const handleFieldChange = (row: 'row1' | 'row2', index: number, field: keyof Testimonial, value: string) => {
    const updatedRow = [...form[row]];
    updatedRow[index] = { ...updatedRow[index], [field]: value };
    setForm({
      ...form,
      [row]: updatedRow
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  const renderTestimonialRowEditor = (rowName: 'row1' | 'row2', label: string) => {
    return (
      <div className="space-y-4 border-t border-slate-800 pt-6">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</h4>
          <button 
            type="button"
            onClick={() => handleAddTestimonial(rowName)}
            className="text-xs font-bold text-brand-500 hover:text-brand-400 flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Add Review
          </button>
        </div>

        <div className="space-y-4">
          {form[rowName].map((item, index) => (
            <div key={index} className="p-4 bg-slate-900/50 border border-slate-800/80 rounded-2xl flex flex-col gap-4 relative group">
              <div className="flex flex-col md:flex-row gap-4 items-start w-full">
                
                {/* Avatar Preview */}
                <div className="w-12 h-12 bg-white/5 border border-slate-800 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name || 'User Avatar'} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <User className="w-5 h-5 text-slate-600" />
                  )}
                </div>

                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Reviewer Name</label>
                    <input 
                      type="text" 
                      value={item.name}
                      onChange={(e) => handleFieldChange(rowName, index, 'name', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-none focus:border-brand-500"
                      placeholder="e.g. Mila McSabbu"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Designation / Role</label>
                    <input 
                      type="text" 
                      value={item.role}
                      onChange={(e) => handleFieldChange(rowName, index, 'role', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-none focus:border-brand-500"
                      placeholder="e.g. Freelance Designer"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Avatar Image URL</label>
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
                                  handleFieldChange(rowName, index, 'image', reader.result as string);
                                };
                              }
                            }}
                          />
                        </label>
                        <span className="text-[9px] text-slate-700">|</span>
                        <button
                          type="button"
                          onClick={() => {
                            setActivePickerRow(rowName);
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
                      value={item.image}
                      onChange={(e) => handleFieldChange(rowName, index, 'image', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-none focus:border-brand-500 font-mono"
                      placeholder="https://images.unsplash.com/... or leave blank"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Review Message</label>
                    <textarea 
                      value={item.text}
                      onChange={(e) => handleFieldChange(rowName, index, 'text', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs h-20 resize-none leading-relaxed"
                      placeholder="Write review copy here..."
                    />
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => handleRemoveTestimonial(rowName, index)}
                  className="absolute top-2.5 right-2.5 p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent rounded-lg shrink-0"
                  title="Remove Testimonial"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6 max-w-4xl space-y-6">
      <h3 className="font-bold text-base text-white border-b border-slate-800 pb-4 mb-4">Testimonials & Reviews</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Section Header Title</label>
            <input 
              type="text" 
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Section Subtitle</label>
            <input 
              type="text" 
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm"
            />
          </div>
        </div>

        {renderTestimonialRowEditor('row1', 'Row 1 Testimonials (Scrolling Left)')}
        {renderTestimonialRowEditor('row2', 'Row 2 Testimonials (Scrolling Right)')}

        <button 
          type="submit"
          className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition-all mt-6"
        >
          <Save className="w-4.5 h-4.5" />
          Save Testimonials Config
        </button>
      </form>

      <ImagePickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(url) => {
          if (activePickerRow !== null && activePickerIndex !== null) {
            handleFieldChange(activePickerRow, activePickerIndex, 'image', url);
          }
        }}
      />
    </div>
  );
};

export default TestimonialsEditor;
