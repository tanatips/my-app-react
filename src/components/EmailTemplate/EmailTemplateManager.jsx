// components/EmailTemplateManager.jsx (Updated)
import { Eye, FileText, InfoIcon, Pencil, Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import CategoryManagement from './CategoryManagement';
import CategorySelector from './CategorySelector';
import EditModal from './EditModal';
import PreviewModal from './PreviewModal';
// ด้านบนของไฟล์ EmailTemplateManager.jsx
import { eofficeTemplates } from './eofficeTemplatesData';
import { registrationTemplates } from './registrationTemplatesData';
import { wifiTemplates } from './wifiTemplatesData';

const EmailTemplateManager = () => {
  // State Management
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(null);
  const [previewData, setPreviewData] = useState('{}');
  const [parseError, setParseError] = useState('');
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategoryManagement, setShowCategoryManagement] = useState(false);

  const [categories, setCategories] = useState([
    { 
      id: 1, 
      name: 'ลงทะเบียนเข้าใช้งาน (สำหรับ ราชการ)', 
      description: 'สำหรับ template ที่เกี่ยวข้องกับการลงทะเบียนเข้าใช้งานระบบสำหรับหน่วยงานราชการ' 
    },
    { 
      id: 2, 
      name: 'ขอใช้งาน Wifi', 
      description: 'สำหรับ template ที่เกี่ยวข้องกับการขอใช้งาน WiFi ทั้งการสมัครใช้งานใหม่และการต่ออายุการใช้งาน' 
    },
    { 
      id: 3, 
      name: 'ขอใช้งานระบบ e-office', 
      description: 'สำหรับ template ที่เกี่ยวข้องกับการขอใช้งานระบบ e-office ทั้งการสมัครใช้งานใหม่และการแจ้งสถานะคำขอ' 
    }
  ]);

  const [newTemplate, setNewTemplate] = useState({
    name: '',
    subject: '',
    content: '',
    variables: [],
    isHtml: false,
    categoryId: null
  });

  const [templates, setTemplates] = useState([
//     {
//       id: 1,
//       name: 'แจ้งการขอใช้งาน WiFi',
//       subject: 'แจ้งการขอใช้งาน WiFi - {{requestId}}',
//       content: `เรียน {{supervisorName}},

// มีการขอใช้งาน WiFi จากพนักงานในสังกัดของท่าน โดยมีรายละเอียดดังนี้:

// ผู้ขอใช้งาน: {{requesterName}}
// แผนก: {{department}}
// วันที่ขอ: {{requestDate}}
// เหตุผล: {{reason}}

// กรุณาดำเนินการอนุมัติผ่านระบบ หรือคลิกที่ลิงก์ด้านล่าง:
// {{approvalLink}}

// ขอแสดงความนับถือ,
// ทีม IT Support`,
//       variables: ['requestId', 'supervisorName', 'requesterName', 'department', 'requestDate', 'reason', 'approvalLink'],
//       isHtml: false,
//       categoryId: 2
//     },
    ...registrationTemplates,
    ...wifiTemplates,
    ...eofficeTemplates
  ]);

  // Utility Functions
  const extractVariables = (content) => {
    const variableMatches = content.match(/{{(\w+)}}/g) || [];
    return [...new Set(variableMatches.map(match => match.replace(/[{}]/g, '')))];
  };

  const replaceVariables = (template, data) => {
    let result = template;
    try {
      const parsedData = JSON.parse(data);
      extractVariables(template).forEach(variable => {
        const regex = new RegExp(`{{${variable}}}`, 'g');
        result = result.replace(regex, parsedData[variable] || '');
      });
    } catch (error) {
      console.error('Error replacing variables:', error);
    }
    return result;
  };

  // Filtered templates based on selected category
  const filteredTemplates = selectedCategory 
    ? templates.filter(template => template.categoryId === selectedCategory)
    : templates;

  // Get category by id
  const getCategory = (categoryId) => {
    return categories.find(c => c.id === categoryId) || null;
  };

  // Event Handlers
  const handleSave = () => {
    if (editing) {
      setTemplates(prev => prev.map(t => 
        t.id === editing.id 
          ? { 
              ...editing, 
              variables: extractVariables(editing.content),
              isHtml: isHtmlMode
            } 
          : t
      ));
      setEditing(null);
    } else if (showCreate) {
      const newTemplateToSave = {
        ...newTemplate,
        id: Date.now(),
        variables: extractVariables(newTemplate.content),
        isHtml: isHtmlMode
      };
      setTemplates(prev => [...prev, newTemplateToSave]);
      setNewTemplate({ 
        name: '', 
        subject: '', 
        content: '', 
        variables: [], 
        isHtml: false,
        categoryId: null
      });
      setShowCreate(false);
    }
  };

  const handleDelete = (id) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
  };

  const handlePreview = (template) => {
    setPreview(template);
    setIsHtmlMode(template.isHtml);
    if (template.categoryId === 1) { // หมวดหมู่ลงทะเบียน
        const defaultData = template.variables.reduce((acc, variable) => {
        acc[variable] = `{{${variable}}}`;
        return acc;
      }, {});
      setPreviewData(JSON.stringify(defaultData, null, 2));
    } else if (template.categoryId === 2) { // หมวดหมู่ WiFi
        // ใช้ wifiSampleData
        const relevantData = {};
        template.variables.forEach(variable => {
          if (wifiSampleData[variable] !== undefined) {
            relevantData[variable] = wifiSampleData[variable];
          } else {
            relevantData[variable] = `{{${variable}}}`;
          }
        });
        setPreviewData(JSON.stringify(relevantData, null, 2));
        }
        setParseError('');
      };

  const handleUpdatePreviewData = () => {
    try {
      JSON.parse(previewData);
      setParseError('');
    } catch (error) {
      setParseError('รูปแบบ JSON ไม่ถูกต้อง');
    }
  };

  const handleCloseModals = () => {
    setEditing(null);
    setShowCreate(false);
    setPreview(null);
    setIsHtmlMode(false);
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">บริหารจัดการรูปแบบข้อความแจ้งเตือนของ E-Mail</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCategoryManagement(!showCategoryManagement)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center gap-2"
            >
              <FileText size={18} /> {showCategoryManagement ? 'ซ่อน' : 'จัดการ'}หมวดหมู่
            </button>
            <button
              onClick={() => {
                setShowCreate(true);
                setNewTemplate({ 
                  name: '', 
                  subject: '', 
                  content: '', 
                  variables: [], 
                  isHtml: false,
                  categoryId: selectedCategory
                });
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus size={18} /> สร้าง Template ใหม่
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {showCategoryManagement && (
            <CategoryManagement 
              categories={categories} 
              setCategories={setCategories} 
            />
          )}

          <CategorySelector 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="space-y-4">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                ไม่พบ Template {selectedCategory ? 'ในหมวดหมู่นี้' : ''}
              </div>
            ) : (
              filteredTemplates.map(template => (
                <div key={template.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {template.categoryId && (
                          <div className="relative group inline-block">
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded flex items-center gap-1 cursor-help">
                              {getCategory(template.categoryId)?.name || '-'}
                              {getCategory(template.categoryId)?.description && (
                                <InfoIcon size={14} className="text-gray-500" />
                              )}
                            </span>
                            {getCategory(template.categoryId)?.description && (
                              <div className="absolute z-10 bottom-full left-0 mb-1 w-64 p-2 bg-white border rounded shadow-lg text-xs text-gray-700 hidden group-hover:block">
                                {getCategory(template.categoryId).description}
                              </div>
                            )}
                          </div>
                        )}
                        {template.isHtml && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            HTML
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditing(template);
                          setIsHtmlMode(template.isHtml);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        title="แก้ไข"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handlePreview(template)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        title="ดูตัวอย่าง"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(template.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                        title="ลบ"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">{template.subject}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditModal
        isOpen={showCreate || editing !== null}
        onClose={handleCloseModals}
        editing={editing}
        newTemplate={newTemplate}
        isHtmlMode={isHtmlMode}
        setIsHtmlMode={setIsHtmlMode}
        onSave={handleSave}
        setEditing={setEditing}
        setNewTemplate={setNewTemplate}
        extractVariables={extractVariables}
        categories={categories}
      />

      <PreviewModal
        preview={preview}
        onClose={() => setPreview(null)}
        previewData={previewData}
        setPreviewData={setPreviewData}
        parseError={parseError}
        handleUpdatePreviewData={handleUpdatePreviewData}
        replaceVariables={replaceVariables}
      />
    </div>
  );
};

export default EmailTemplateManager;