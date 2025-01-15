import React from 'react';

export const Input = React.forwardRef(({
  className = "",
  type = "text",
  error,
  disabled,
  required,
  ...props
}, ref) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        className={`
          w-full 
          px-3 
          py-2 
          bg-white 
          border 
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}
          ${className}
        `}
        disabled={disabled}
        required={required}
        ref={ref}
        {...props}
      />
      {error && (
        <span className="absolute -bottom-5 left-0 text-sm text-red-500">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

