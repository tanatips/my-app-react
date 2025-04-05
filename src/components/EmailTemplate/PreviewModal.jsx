// components/PreviewModal.jsx
import { X } from 'lucide-react';
import React from 'react';

const PreviewModal = ({
  preview,
  onClose,
  previewData,
  setPreviewData,
  parseError,
  handleUpdatePreviewData,
  replaceVariables
}) => {
  if (!preview) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <h3 className="text-lg font-semibold">ตัวอย่าง: {preview.name}</h3>
          <button onClick={onClose} className="text-gray-500">
            <X size={20} />
          </button>
        </div>

        <div className="flex gap-4 overflow-y-auto flex-1">
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ข้อมูล JSON
              </label>
              <textarea
                value={previewData}
                onChange={(e) => setPreviewData(e.target.value)}
                className="w-full h-48 p-2 border rounded font-mono text-sm"
                placeholder="ใส่ข้อมูล JSON สำหรับ Template"
              />
              {parseError && (
                <div className="text-red-500 text-sm mt-1">{parseError}</div>
              )}
              <button
                onClick={handleUpdatePreviewData}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                อัปเดตข้อมูล
              </button>
            </div>

            <div>
              <h4 className="font-medium mb-2">ตัวอย่างหัวข้ออีเมล</h4>
              <div className="p-3 bg-gray-50 rounded border">
                {replaceVariables(preview.subject, previewData)}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">ตัวอย่างเนื้อหาอีเมล</h4>
              {preview.isHtml ? (
                <>
                  <div 
                    className="p-3 bg-gray-50 rounded border max-h-[50vh] overflow-y-auto"
                    dangerouslySetInnerHTML={{ 
                      __html: replaceVariables(preview.content, previewData) 
                    }} 
                  />
                  <div className="mt-2 p-3 bg-gray-100 rounded border font-mono text-sm whitespace-pre-wrap max-h-[30vh] overflow-y-auto">
                    {replaceVariables(preview.content, previewData)}
                  </div>
                </>
              ) : (
                <div className="p-3 bg-gray-50 rounded border whitespace-pre-wrap max-h-[50vh] overflow-y-auto">
                  {replaceVariables(preview.content, previewData)}
                </div>
              )}
            </div>
          </div>

          <div className="w-64 flex-shrink-0">
            <h4 className="font-medium mb-2">ตัวแปรที่ใช้</h4>
            <div className="bg-gray-50 p-3 rounded border max-h-[60vh] overflow-y-auto">
            {preview.variables.map(variable => {
              const varName = typeof variable === 'object' ? variable.variable_name : variable;
              return (
                <div key={varName} className="mb-2">
                  <div className="font-medium text-blue-600">{`{{${varName}}}`}</div>
                  {typeof variable === 'object' && variable.description && (
                    <div className="text-sm text-gray-600">คำอธิบาย: {variable.description}</div>
                  )}
                  {typeof variable === 'object' && variable.example_value && (
                    <div className="text-sm text-gray-500">ตัวอย่าง: {variable.example_value}</div>
                  )}
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;