import React from 'react';
import { X } from 'lucide-react';
import ImageLibrary from './ImageLibrary.tsx';

interface ImagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  apiBase?: string;
}

const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  apiBase = ''
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col relative shadow-2xl overflow-hidden">
        {/* Header toolbar */}
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center shrink-0">
          <h3 className="font-extrabold text-sm text-white uppercase tracking-wider">
            Select Image From Library
          </h3>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-850 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content pane */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-900/60">
          <ImageLibrary 
            apiBase={apiBase} 
            selectMode={true} 
            onSelect={(url) => {
              onSelect(url);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImagePickerModal;
