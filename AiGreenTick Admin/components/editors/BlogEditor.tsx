import React, { useState } from 'react';
import { Save, Plus, Edit2, Trash2, Calendar, User, Clock, FileText } from 'lucide-react';
import ImagePickerModal from './ImagePickerModal.tsx';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  theme: string;
  visualType: string;
  author: string;
  readTime: string;
  content: string;
  image?: string;
}

interface BlogEditorProps {
  data: BlogPost[];
  onSave: (updatedData: BlogPost[]) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ data, onSave }) => {
  const apiBase = import.meta.env.VITE_API_URL || '';
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(data || []);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [form, setForm] = useState<BlogPost>({
    id: 0,
    title: '',
    excerpt: '',
    category: 'WhatsApp Marketing',
    date: new Date().toISOString().split('T')[0],
    theme: 'blue',
    visualType: 'productivity',
    author: 'Admin',
    readTime: '5 min read',
    content: '',
    image: ''
  });

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setForm({
      image: '',
      ...blogPosts[index]
    });
    setShowModal(true);
  };

  const handleNewClick = () => {
    setEditingIndex(null);
    setForm({
      id: 0,
      title: '',
      excerpt: '',
      category: 'WhatsApp Marketing',
      date: new Date().toISOString().split('T')[0],
      theme: 'blue',
      visualType: 'productivity',
      author: 'Admin',
      readTime: '5 min read',
      content: '',
      image: ''
    });
    setShowModal(true);
  };

  const handleSave = () => {
    let updated = [...blogPosts];
    if (editingIndex !== null) {
      updated[editingIndex] = form;
    } else {
      const nextId = blogPosts.length > 0 ? Math.max(...blogPosts.map(p => p.id)) + 1 : 1;
      updated.push({
        ...form,
        id: nextId
      });
    }
    setBlogPosts(updated);
    setShowModal(false);
    onSave(updated);
  };

  const handleDelete = (index: number) => {
    if (!confirm(`Are you sure you want to delete "${blogPosts[index].title}"?`)) return;
    const updated = blogPosts.filter((_, i) => i !== index);
    setBlogPosts(updated);
    onSave(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <h3 className="font-bold text-base text-white">Articles & Guides Manager</h3>
        <button 
          onClick={handleNewClick}
          className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-brand-500/20 transition-all active:scale-98"
        >
          <Plus className="w-4.5 h-4.5" />
          Write Article
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <div key={index} className="bg-slate-955/40 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between min-h-[22rem] hover:border-slate-700 transition-colors">
            <div className="space-y-3">
              {post.image && (
                <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-850 bg-slate-950 mb-2 shrink-0">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover animate-in fade-in" />
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest bg-brand-500/10 border border-brand-500/20 px-2 py-0.5 rounded">
                  {post.category}
                </span>
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
              </div>
              <h4 className="font-bold text-sm text-white line-clamp-2 leading-snug">{post.title}</h4>
              <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed font-light">{post.excerpt}</p>
            </div>

            <div className="flex gap-2 border-t border-slate-850 pt-4 mt-4">
              <button 
                onClick={() => handleEditClick(index)}
                className="flex-1 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5 animate-pulse" />
                Edit Content
              </button>
              <button 
                onClick={() => handleDelete(index)}
                className="p-2.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl transition-all"
                title="Delete Article"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BLOG ADD/EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-lg text-white mb-6 border-b border-slate-800 pb-4">
              {editingIndex !== null ? 'Modify Article Details' : 'Draft New Blog Article'}
            </h3>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Article Title</label>
                <input 
                  type="text" 
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm"
                  placeholder="e.g. 5 WhatsApp Marketing Secrets"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Excerpt / Summary (Shows on Feed Grid)</label>
                <textarea 
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm h-20 resize-none leading-relaxed"
                  placeholder="Short engaging excerpt"
                />
              </div>

              {/* Cover Image Block */}
              <div className="space-y-2 bg-slate-950/50 border border-slate-800/80 p-4 rounded-xl">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cover Image</label>
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
                              setForm(prev => ({ ...prev, image: reader.result as string }));
                            };
                          }
                        }}
                      />
                    </label>
                    <span className="text-[9px] text-slate-700">|</span>
                    <button
                      type="button"
                      onClick={() => setPickerOpen(true)}
                      className="text-[9px] font-extrabold text-emerald-500 hover:text-emerald-400 uppercase tracking-wider transition-colors bg-transparent border-none cursor-pointer"
                    >
                      Select from Library
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  {form.image && (
                    <div className="w-16 h-10 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shrink-0">
                      <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <input 
                    type="text" 
                    value={form.image || ''}
                    onChange={(e) => setForm(prev => ({ ...prev, image: e.target.value }))}
                    className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-xs font-mono"
                    placeholder="Cover image URL or base64 data"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</label>
                  <select 
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 outline-none focus:border-brand-500 text-sm cursor-pointer"
                  >
                    <option value="WhatsApp Marketing">WhatsApp Marketing</option>
                    <option value="Business Growth">Business Growth</option>
                    <option value="Customer Engagement">Customer Engagement</option>
                    <option value="Automation">Automation</option>
                    <option value="Productivity">Productivity</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Publication Date</label>
                  <input 
                    type="date" 
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Card Palette Theme</label>
                  <select 
                    value={form.theme}
                    onChange={(e) => setForm({ ...form, theme: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 outline-none focus:border-brand-500 text-sm cursor-pointer"
                  >
                    <option value="blue">Blue Sky</option>
                    <option value="purple">Royal Purple</option>
                    <option value="pink">Blossom Pink</option>
                    <option value="green">Emerald Green</option>
                    <option value="orange">Sunny Orange</option>
                    <option value="rose">Sunset Rose</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visual Graphic Type</label>
                  <select 
                    value={form.visualType}
                    onChange={(e) => setForm({ ...form, visualType: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 outline-none focus:border-brand-500 text-sm cursor-pointer"
                  >
                    <option value="productivity">Member Productivity Chart</option>
                    <option value="workflow">Dynamic Workflow Connector</option>
                    <option value="prioritization">Task Prioritization List</option>
                    <option value="adaptive">Performance Bar Chart</option>
                    <option value="transparency">Sprint Progress Tracker</option>
                    <option value="focus">Focus User Activity List</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Author Name</label>
                  <input 
                    type="text" 
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full px-4.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm"
                    placeholder="Sarah Jenkins"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Read Time Estimator</label>
                  <input 
                    type="text" 
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    className="w-full px-4.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm"
                    placeholder="e.g. 5 min read"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Full Article Body Content</label>
                <textarea 
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full px-4.5 py-3 bg-slate-955 border border-slate-800 rounded-xl text-white outline-none focus:border-brand-500 text-sm h-60 leading-relaxed font-light font-mono"
                  placeholder="Write the full markdown or text body of the blog article here..."
                />
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
                Publish Article
              </button>
            </div>
          </div>
        </div>
      )}

      <ImagePickerModal 
        isOpen={pickerOpen} 
        onClose={() => setPickerOpen(false)} 
        onSelect={(url) => setForm(prev => ({ ...prev, image: url }))} 
        apiBase={apiBase}
      />
    </div>
  );
};

export default BlogEditor;
