import React from 'react';
export const Button = ({ children, variant = 'primary', onClick, disabled, size = 'md' }) => {
  const getVariantStyles = () => {
    if (disabled) return 'bg-gray-300 text-gray-500 cursor-not-allowed';
    
    switch (variant) {
      case 'outline':
        return 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50';
      case 'secondary':
        return 'bg-blue-600 text-white hover:bg-blue-700';
      case 'warning':
        return 'bg-orange-500 text-white hover:bg-orange-600';
      case 'destructive':
        return 'bg-red-600 text-white hover:bg-red-700';
      default:
        return 'bg-blue-600 text-white hover:bg-blue-700';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1 text-sm';
      default:
        return 'px-4 py-2';
    }
  };

  return (
    <button
      className={`rounded font-medium transition-colors ${getVariantStyles()} ${getSizeStyles()}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// export default Button;