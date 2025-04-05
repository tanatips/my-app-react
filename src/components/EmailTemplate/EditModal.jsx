// components/EditModal.jsx (Updated)
import { X } from 'lucide-react';
import React from 'react';
import RichTextEditor from './RichTextEditor';
import ToggleSwitch from './ToggleSwitch';

const EditModal = ({
  isOpen,
  onClose,
  editing,
  newTemplate,
  isHtmlMode,
  setIsHtmlMode,
  onSave,
  setEditing,
  setNewTemplate,
  extractVariables,
  categories,
  defaultVariables = ['requestId', 'supervisorName', 'requesterName', 'department', 'requestDate', 'reason', 'approvalLink']
}) => {
  if (!isOpen) return null;

  const template = editing || newTemplate;

  const handleChange = (field, value) => {
    if (editing) {
      setEditing({ ...editing, [field]: value });
    } else {
      setNewTemplate({ ...newTemplate, [field]: value });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {editing ? 'แก้ไข Template' : 'สร้าง Template ใหม่'}
          </h3>
          <button onClick={onClose} className="text-gray-500">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto flex-1 pr-1">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อ Template
            </label>
            <input
              value={template.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="เช่น แจ้งเตือนการหมดอายุ WiFi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              หมวดหมู่
            </label>
            <select
              value={template.categoryId || ''}
              onChange={(e) => handleChange('categoryId', e.target.value ? Number(e.target.value) : null)}
              className="w-full p-2 border rounded"
            >
              <option value="">-- เลือกหมวดหมู่ --</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}{category.description ? ` - ${category.description.substring(0, 40)}${category.description.length > 40 ? '...' : ''}` : ''}
                </option>
              ))}
            </select>
            {template.categoryId && categories.find(c => c.id === Number(template.categoryId))?.description && (
              <p className="mt-1 text-xs text-gray-500">
                {categories.find(c => c.id === Number(template.categoryId)).description}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              หัวข้ออีเมล
            </label>
            <input
              value={template.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="เช่น แจ้งเตือน: WiFi กำลังจะหมดอายุ - {{requestId}}"
            />
          </div>

          <div className="flex justify-end">
            <ToggleSwitch
              checked={isHtmlMode}
              onChange={(e) => setIsHtmlMode(e.target.checked)}
              label="ใช้งาน HTML"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              เนื้อหา
            </label>
            <RichTextEditor
             content={template.content}
             onChange={(content) => handleChange('content', content)}
             isHtmlMode={isHtmlMode}
             variables={defaultVariables}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ตัวแปรที่ใช้
            </label>
            <div className="p-2 border rounded bg-gray-50">
              {extractVariables(template.content).map(variable => (
                <span 
                  key={variable} 
                  className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2"
                >
                  {`{{${variable}}}`}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              onClick={onSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
            >
              {editing ? 'บันทึก' : 'สร้าง Template'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;