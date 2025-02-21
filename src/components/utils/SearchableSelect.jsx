import { Combobox } from '@headlessui/react';
import { useState } from 'react';
const SearchableSelect = ({ options, value, onChange, placeholder }) => {
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return option.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={value} onChange={onChange}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none"
            displayValue={(value) => options.find(option => option.name === value)?.name || ''}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <svg 
              className="h-5 w-5 text-gray-400" 
              viewBox="0 0 20 20" 
              fill="none" 
              stroke="currentColor"
            >
              <path
                d="M7 10l5 5 5-5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Combobox.Button>
        </div>
        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
          {filteredOptions.length === 0 && query !== '' ? (
            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
              ไม่พบข้อมูล
            </div>
          ) : (
            filteredOptions.map((option) => (
              <Combobox.Option
                key={option.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-blue-600 text-white' : 'text-gray-900'
                  }`
                }
                value={option.name}
              >
                {({ selected, active }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {option.name}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? 'text-white' : 'text-blue-600'
                        }`}
                      >
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                      </span>
                    ) : null}
                  </>
                )}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
};
export { SearchableSelect };
