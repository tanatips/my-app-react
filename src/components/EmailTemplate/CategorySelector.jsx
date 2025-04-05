// components/CategorySelector.jsx
import { InfoIcon } from 'lucide-react';
import React from 'react';

const CategorySelector = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-3 py-1 rounded-full text-sm ${
          selectedCategory === null
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        ทั้งหมด
      </button>
      
      {categories.map((category) => (
        <div key={category.id} className="relative group">
          <button
            onClick={() => onSelectCategory(category.id)}
            className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
            {category.description && (
              <InfoIcon size={14} className={selectedCategory === category.id ? 'text-white' : 'text-gray-500'} />
            )}
          </button>
          
          {category.description && (
            <div className="absolute z-10 top-full left-0 mt-1 w-64 p-2 bg-white border rounded shadow-lg text-sm text-gray-700 hidden group-hover:block">
              {category.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategorySelector;