import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-gray-50 rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="relative flex items-center mb-4 h-8">
          <h2 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold text-stone-800 text-center w-full pointer-events-none">{title}</h2>
          <button
            onClick={onClose}
            className="ml-auto text-stone-500 hover:text-stone-700 z-10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}