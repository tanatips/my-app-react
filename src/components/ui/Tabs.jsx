import React from 'react';

const TabsContext = React.createContext(null);

const Tabs = React.forwardRef(({
    defaultValue,
    value,
    onValueChange,
    className = "",
    children,
    ...props
}, ref) => {
  const [selectedTab, setSelectedTab] = React.useState(defaultValue);
  const currentValue = value !== undefined ? value : selectedTab;

  const handleValueChange = (newValue) => {
    setSelectedTab(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };
  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      <div
        ref={ref}
        className={`w-full ${className}`}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});

const TabsList = React.forwardRef(({
  className = "",
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      role="tablist"
      className={`
        inline-flex 
        items-center 
        justify-center 
        rounded-lg 
        bg-gray-100 
        p-1
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
});

const TabsTrigger = React.forwardRef(({
  value,
  className = "",
  children,
  disabled,
  ...props
}, ref) => {
  const context = React.useContext(TabsContext);
  
  if (!context) {
    throw new Error('TabsTrigger must be used within Tabs');
  }

  const isSelected = context.value === value;

  return (
    <button
      ref={ref}
      role="tab"
      aria-selected={isSelected}
      disabled={disabled}
      onClick={() => context.onValueChange?.(value)}
      className={`
        inline-flex 
        items-center 
        justify-center 
        whitespace-nowrap 
        rounded-md 
        px-3 
        py-1.5 
        text-sm 
        font-medium 
        ring-offset-white 
        transition-all 
        focus-visible:outline-none 
        focus-visible:ring-2 
        focus-visible:ring-blue-500 
        focus-visible:ring-offset-2 
        disabled:pointer-events-none 
        disabled:opacity-50
        ${isSelected 
          ? 'bg-white text-blue-700 shadow-sm' 
          : 'text-gray-500 hover:text-gray-700'
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
});

const TabsContent = React.forwardRef(({
  value,
  className = "",
  children,
  ...props
}, ref) => {
  const context = React.useContext(TabsContext);
  
  if (!context) {
    throw new Error('TabsContent must be used within Tabs');
  }

  const isSelected = context.value === value;

  if (!isSelected) return null;

  return (
    <div
      ref={ref}
      role="tabpanel"
      className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Tabs.displayName = 'Tabs';
TabsList.displayName = 'TabsList';
TabsTrigger.displayName = 'TabsTrigger';
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsContent, TabsList, TabsTrigger };
