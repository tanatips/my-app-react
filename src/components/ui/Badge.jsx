// import React from 'react';

export const Badge = ({ children, variant }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'destructive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getVariantStyles()}`}>
      {children}
    </span>
  );
};