import React from 'react';

export const Dialog = ({ open, children, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-lg w-full max-w-md" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children }) => (
  <div className="p-6">
    {children}
  </div>
);

export const DialogHeader = ({ children }) => (
  <div className="mb-4">
    {children}
  </div>
);

export const DialogTitle = ({ children }) => (
  <h3 className="text-lg font-semibold">
    {children}
  </h3>
);