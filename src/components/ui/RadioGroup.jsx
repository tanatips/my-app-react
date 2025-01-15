import React from 'react';

const RadioGroupContext = React.createContext(null);

const RadioGroup = React.forwardRef(({
  className = "",
  value,
  onChange,
  disabled,
  required,
  name,
  children,
  ...props
}, ref) => {
  return (
    <RadioGroupContext.Provider value={{ name, value, onChange, disabled }}>
      <div
        ref={ref}
        role="radiogroup"
        className={`flex gap-4 ${className}`}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
});

const RadioGroupItem = React.forwardRef(({
  className = "",
  value,
  label,
  disabled,
  ...props
}, ref) => {
  const group = React.useContext(RadioGroupContext);
  
  if (!group) {
    throw new Error('RadioGroupItem must be used within a RadioGroup');
  }

  const isChecked = group.value === value;
  const isDisabled = disabled || group.disabled;

  return (
    <label className={`
      flex items-center gap-2 cursor-pointer
      ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
      ${className}
    `}>
      <input
        type="radio"
        ref={ref}
        name={group.name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        onChange={(e) => group.onChange?.(e.target.value)}
        className="
          w-4 
          h-4 
          border-2 
          border-gray-300 
          rounded-full 
          text-blue-600 
          focus:ring-2 
          focus:ring-blue-500 
          focus:ring-offset-2
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
        {...props}
      />
      {label && (
        <span className={`
          text-sm 
          font-medium 
          ${isDisabled ? 'text-gray-400' : 'text-gray-700'}
        `}>
          {label}
        </span>
      )}
    </label>
  );
});

RadioGroup.displayName = 'RadioGroup';
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
