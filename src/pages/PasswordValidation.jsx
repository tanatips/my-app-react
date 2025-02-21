import { Check } from 'lucide-react';
import React from 'react';

const PasswordValidation = ({ password }) => {
  // Validation rules
  const rules = [
    {
      id: 'length',
      label: 'ความยาวอย่างน้อย 8 ตัวอักษร',
      test: (pass) => pass.length >= 8
    },
    {
      id: 'uppercase',
      label: 'ตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว',
      test: (pass) => /[A-Z]/.test(pass)
    },
    {
      id: 'lowercase',
      label: 'ตัวพิมพ์เล็กอย่างน้อย 1 ตัว',
      test: (pass) => /[a-z]/.test(pass)
    },
    {
      id: 'number',
      label: 'ตัวเลขอย่างน้อย 1 ตัว',
      test: (pass) => /[0-9]/.test(pass)
    }
  ];

  return (
    <div className="mt-2 space-y-2">
      <p className="text-sm text-gray-500 mb-2">รหัสผ่านต้องประกอบด้วย:</p>
      <ul className="space-y-2">
        {rules.map((rule) => {
          const isValid = rule.test(password);
          return (
            <li 
              key={rule.id} 
              className={`flex items-center space-x-2 text-sm ${
                isValid ? 'text-green-600' : 'text-gray-500'
              }`}
            >
              <div className={`w-5 h-5 flex items-center justify-center rounded-full ${
                isValid ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {isValid && <Check className="w-3 h-3 text-green-600" />}
              </div>
              <span>{rule.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PasswordValidation;