import React, { useState, useEffect } from 'react';
import { 
  Upload, Trash2, Edit2, Copy, Search, Check, 
  X, Image as ImageIcon, RefreshCw, FileText
} from 'lucide-react';

interface ImageItem {
  id: string;
  name: string;
  url: string;
  description: string;
  created_at: string;
  filename: string;
  isSupabase: boolean;
}

interface ImageLibraryProps {
  apiBase?: string;
  selectMode?: boolean;
  onSelect?: (url: string) => void;
  onClosePicker?: () => void;
}

const ImageLibrary: React.FC<ImageLibraryProps> = ({ 
  apiBase = '', 
  selectMode = false, 
  onSelect,
  onClosePicker
}) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>('');
  
  // Edit Modal State
  const [editingImage, setEditingImage] = useState<ImageItem | null>(null);
  const [editName, setEditName] = useState<string>('');
  const [editDesc, setEditDesc] = useState<string>('');
  
  // Copied URL Feedback State
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Fetch images
  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBase}/api/images`);
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (err) {
      console.error('Failed to fetch images:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Only image files are allowed.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File is too large. Max size is 5MB.');
      return;
    }

    setUploading(true);
    setUploadError('');

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result as string;
      const token = localStorage.getItem('admin_token');
      
      try {
        const res = await fetch(`${apiBase}/api/images/upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: file.name,
            type: file.type,
            base64: base64,
            description: ''
          })
        });

        if (res.ok) {
          const newImg = await res.json();
          setImages(prev => [newImg, ...prev]);
        } else {
          const errData = await res.json();
          setUploadError(errData.error || 'Failed to upload image.');
        }
      } catch (err) {
        setUploadError('Network error uploading image.');
      } finally {
        setUploading(false);
      }
    };
    reader.onerror = () => {
      setUploadError('Failed to read file.');
      setUploading(false);
    };
  };

  // Edit metadata save
  const handleSaveEdit = async () => {
    if (!editingImage) return;

    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`${apiBase}/api/images/${editingImage.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: editName,
          description: editDesc
        })
      });

      if (res.ok) {
        const updatedImg = await res.json();
        setImages(prev => prev.map(img => img.id === editingImage.id ? updatedImg : img));
        setEditingImage(null);
      }
    } catch (err) {
      console.error('Failed to update image:', err);
    }
  };

  // Delete image
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this image?')) return;

    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`${apiBase}/api/images/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        setImages(prev => prev.filter(img => img.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete image:', err);
    }
  };

  // Copy URL to Clipboard
  const handleCopyUrl = (url: string, id: string) => {
    // Resolve relative URLs to absolute URLs so they can be easily copied and used
    const absoluteUrl = url.startsWith('/') 
      ? `${window.location.origin}${url}`
      : url;

    navigator.clipboard.writeText(absoluteUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered Images list
  const filteredImages = images.filter(img => 
    img.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    img.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`space-y-6 ${selectMode ? 'p-1' : ''}`}>
      {/* Search and Upload bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="font-extrabold text-base text-white uppercase tracking-wider flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-500" />
            Image & Media Library
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-light">
            Upload website images, logos, and media directly to Supabase Storage.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text"
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-emerald-500 outline-none w-48 md:w-60 transition-all"
            />
          </div>

          <label className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-extrabold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-600/10 active:scale-95 transition-all select-none">
            <Upload className="w-4 h-4" />
            <span>Upload Image</span>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileUpload} 
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {/* Upload State & Errors */}
      {uploading && (
        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2.5 animate-pulse">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>Uploading file and syncing storage, please wait...</span>
        </div>
      )}

      {uploadError && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex justify-between items-center">
          <span>{uploadError}</span>
          <button onClick={() => setUploadError('')} className="p-1 hover:bg-red-500/10 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Library Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin text-emerald-500" />
          <span className="text-xs">Loading media library...</span>
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 border border-dashed border-slate-800 rounded-3xl">
          <ImageIcon className="w-12 h-12 text-slate-700 mb-3" />
          <span className="text-sm font-bold text-slate-400">No images found</span>
          <span className="text-xs text-slate-650 mt-1">Upload files using the button above.</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {filteredImages.map((img) => (
            <div 
              key={img.id} 
              className={`bg-slate-950/40 border rounded-2xl overflow-hidden flex flex-col group transition-all relative ${
                selectMode 
                  ? 'cursor-pointer hover:border-emerald-500 border-slate-800/80 hover:shadow-lg hover:shadow-emerald-500/5' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
              onClick={() => {
                if (selectMode && onSelect) {
                  onSelect(img.url);
                }
              }}
            >
              {/* Image Preview Container */}
              <div className="aspect-square bg-slate-950 flex items-center justify-center p-3 relative overflow-hidden shrink-0 border-b border-slate-900">
                <img 
                  src={img.url} 
                  alt={img.name} 
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay with Source Indicator */}
                <div className="absolute top-2 left-2 bg-slate-950/80 border border-slate-800 text-[9px] font-bold text-slate-400 rounded-full px-2 py-0.5 pointer-events-none">
                  {img.isSupabase ? 'Supabase' : 'Local'}
                </div>
              </div>

              {/* Info Container */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="text-xs font-bold text-white truncate" title={img.name}>
                    {img.name}
                  </h4>
                  {img.description && (
                    <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-normal font-light">
                      {img.description}
                    </p>
                  )}
                </div>

                {/* Operations Toolbar */}
                <div className="flex gap-1.5 pt-1.5 border-t border-slate-900/60" onClick={e => e.stopPropagation()}>
                  <button 
                    onClick={() => handleCopyUrl(img.url, img.id)}
                    className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-[10px] font-bold text-slate-300 flex items-center justify-center gap-1 transition-colors"
                    title="Copy Image URL"
                  >
                    {copiedId === img.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  {!selectMode && (
                    <>
                      <button 
                        onClick={() => {
                          setEditingImage(img);
                          setEditName(img.name);
                          setEditDesc(img.description || '');
                        }}
                        className="p-1.5 bg-slate-900 hover:bg-slate-850 hover:text-emerald-400 text-slate-400 border border-slate-800 rounded-lg transition-colors"
                        title="Edit Details"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>

                      <button 
                        onClick={() => handleDelete(img.id)}
                        className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/25 rounded-lg transition-all"
                        title="Delete Image"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT MODAL */}
      {editingImage && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex justify-center items-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-md p-6 relative">
            <button 
              onClick={() => setEditingImage(null)}
              className="absolute top-4 right-4 p-1.5 hover:bg-slate-900 rounded-full text-slate-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-extrabold text-sm text-white mb-6 uppercase tracking-wider">
              Edit Image Details
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Image Title</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-emerald-500 text-xs font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Alt Description</label>
                <textarea 
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:border-emerald-500 text-xs h-24 resize-none leading-relaxed font-light"
                  placeholder="Describe this image for screen readers..."
                />
              </div>

              <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-slate-900">
                <button 
                  onClick={() => setEditingImage(null)}
                  className="px-4 py-2 border border-slate-800 text-slate-400 hover:text-white text-xs font-bold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveEdit}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold rounded-xl transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageLibrary;
