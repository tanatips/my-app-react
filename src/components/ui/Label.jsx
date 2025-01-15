import React from 'react';

export const Label = React.forwardRef(({
  className = "",
  children,
  required,
  htmlFor,
  ...props
}, ref) => {
  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={`
        text-sm
        font-medium
        text-gray-700
        ${className}
      `}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
});

Label.displayName = 'Label';