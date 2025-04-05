// components/EmailTemplateManager.jsx (Updated with Process Steps)
import { Eye, FileText, InfoIcon, Pencil, Plus, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
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
  // ข้อมูลขั้นตอนการทำงานแบบใหม่
  const processSteps = [
    { id: 1, name: 'การลงทะเบียน/ขอใช้งาน', color: 'blue' },
    { id: 2, name: 'การอนุมัติคำขอ', color: 'indigo' },
    { id: 3, name: 'การดำเนินการ', color: 'green' },
    { id: 4, name: 'การแจ้งผลการดำเนินการ', color: 'emerald' },
    { id: 5, name: 'การแจ้งเตือนการหมดอายุ', color: 'amber' },
    { id: 6, name: 'การแจ้งผลการไม่อนุมัติ', color: 'red' },
    { id: 7, name: 'อื่นๆ', color: 'gray' }
  ];

  // ข้อมูลผู้รับ email
  const recipientTypes = [
    { id: 1, name: 'ผู้ร้องขอ', color: 'blue' },
    { id: 2, name: 'ผู้อนุมัติขั้นต้น', color: 'purple' },
    { id: 3, name: 'ผู้อนุมัติขั้นสุดท้าย', color: 'indigo' },
    { id: 4, name: 'ผู้ดำเนินการ', color: 'green' },
    { id: 5, name: 'อื่นๆ', color: 'gray' }
  ];

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
    categoryId: null,
    processStep: null, // ขั้นตอนการทำงาน
    recipientType: null  // ผู้รับ email
  });
  // ปรับปรุงการกำหนด process step และ recipient type สำหรับ templates
  const updateTemplatesWithProcessStepsAndRecipients = () => {
    // ฟังก์ชันช่วยกำหนดค่าขั้นตอนและผู้รับ
    const assignStepsAndRecipients = (templates) => {
      return templates.map(template => {
        let processStep = 7; // ค่าเริ่มต้นเป็น "อื่นๆ"
        let recipientType = 5; // ค่าเริ่มต้นเป็น "อื่นๆ"
        
        // กำหนดตามระบบ WiFi
        if (template.categoryId === 2) {
          if (template.id === 201) {
            processStep = 1; // การลงทะเบียน/ขอใช้งาน
            recipientType = 1; // ผู้ร้องขอ
          } else if (template.id === 202) {
            processStep = 1; // การลงทะเบียน/ขอใช้งาน (อยู่ในกระบวนการลงทะเบียนเดียวกัน)
            recipientType = 2; // ผู้อนุมัติขั้นต้น
          } else if (template.id === 203) {
            processStep = 2; // การอนุมัติคำขอ
            recipientType = 3; // ผู้อนุมัติขั้นสุดท้าย
          } else if (template.id === 204) {
            processStep = 3; // การดำเนินการ
            recipientType = 4; // ผู้ดำเนินการ
          } else if (template.id === 205) {
            processStep = 4; // การแจ้งผลการดำเนินการ
            recipientType = 1; // ผู้ร้องขอ
          } else if (template.id === 206) {
            processStep = 5; // การแจ้งเตือนการหมดอายุ
            recipientType = 1; // ผู้ร้องขอ
          }
        }
        
        // กำหนดตามระบบลงทะเบียน
        else if (template.categoryId === 1) {
          if (template.id === 101) {
            processStep = 1; // การลงทะเบียน/ขอใช้งาน
            recipientType = 1; // ผู้ร้องขอ
          } else if (template.id === 102) {
            processStep = 1; // การลงทะเบียน/ขอใช้งาน (อยู่ในกระบวนการลงทะเบียนเดียวกัน)
            recipientType = 2; // ผู้อนุมัติขั้นต้น
          } else if (template.id === 103) {
            processStep = 2; // การอนุมัติคำขอ
            recipientType = 3; // ผู้อนุมัติขั้นสุดท้าย
          } else if (template.id === 104) {
            processStep = 3; // การดำเนินการ
            recipientType = 4; // ผู้ดำเนินการ
          } else if (template.id === 105) {
            processStep = 4; // การแจ้งผลการดำเนินการ
            recipientType = 1; // ผู้ร้องขอ
          } else if ([106, 107, 108].includes(template.id)) {
            processStep = 6; // การแจ้งผลการไม่อนุมัติ
            recipientType = 1; // ผู้ร้องขอ
          }
        }
        
        // กำหนดตามระบบ e-office
        else if (template.categoryId === 3) {
          if (template.id === 301) {
            processStep = 1; // การลงทะเบียน/ขอใช้งาน
            recipientType = 1; // ผู้ร้องขอ
          } else if (template.id === 302) {
            processStep = 1; // การลงทะเบียน/ขอใช้งาน (อยู่ในกระบวนการลงทะเบียนเดียวกัน)
            recipientType = 2; // ผู้อนุมัติขั้นต้น
          } else if (template.id === 303) {
            processStep = 2; // การอนุมัติคำขอ
            recipientType = 3; // ผู้อนุมัติขั้นสุดท้าย
          } else if (template.id === 304) {
            processStep = 3; // การดำเนินการ
            recipientType = 4; // ผู้ดำเนินการ
          } else if (template.id === 305) {
            processStep = 4; // การแจ้งผลการดำเนินการ
            recipientType = 1; // ผู้ร้องขอ
          } else if (template.id === 306) {
            processStep = 5; // การแจ้งเตือนการหมดอายุ
            recipientType = 1; // ผู้ร้องขอ
          } else if ([307, 308, 309].includes(template.id)) {
            processStep = 6; // การแจ้งผลการไม่อนุมัติ
            recipientType = 1; // ผู้ร้องขอ
          } else if (template.id === 310) {
            processStep = 1; // การลงทะเบียน/ขอใช้งาน (แจ้งให้แก้ไขข้อมูล)
            recipientType = 1; // ผู้ร้องขอ
          }
        }
        
        // เพิ่มฟิลด์ใหม่เข้าไปใน template
        return { 
          ...template, 
          processStep, 
          recipientType
        };
      });
    };

    // ใช้ฟังก์ชันกับ template แต่ละชุด
    const wifiTemplatesUpdated = assignStepsAndRecipients(wifiTemplates);
    const registrationTemplatesUpdated = assignStepsAndRecipients(registrationTemplates);
    const eofficeTemplatesUpdated = assignStepsAndRecipients(eofficeTemplates);
    
    return [...wifiTemplatesUpdated, ...registrationTemplatesUpdated, ...eofficeTemplatesUpdated];
  };

  const [templates, setTemplates] = useState([]);

  // ใช้ useEffect เพื่อโหลดข้อมูล templates เมื่อคอมโพเนนต์เริ่มทำงาน
  useEffect(() => {
    const initialTemplates = updateTemplatesWithProcessStepsAndRecipients();
    setTemplates(initialTemplates);
  }, []);
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
  
  // Get process step info by id
  const getProcessStep = (stepId) => {
    return processSteps.find(s => s.id === stepId) || processSteps[6]; // Default to "อื่นๆ"
  };
  
  // Get recipient type info by id
  const getRecipientType = (typeId) => {
    return recipientTypes.find(t => t.id === typeId) || recipientTypes[4]; // Default to "อื่นๆ"
  };

  // Event Handlers
  const handleSave = () => {
    if (editing) {
      // ตรวจสอบว่า editing มี variables หรือไม่ เพื่อแน่ใจว่าจะไม่หาย
      setTemplates(prev => prev.map(t => 
        t.id === editing.id 
          ? { 
              ...editing,
              isHtml: isHtmlMode
            } 
          : t
      ));
      setEditing(null);
    } else if (showCreate) {
      // ตรวจสอบว่า newTemplate มี variables หรือไม่
      const newTemplateToSave = {
        ...newTemplate,
        id: Date.now(),
        isHtml: isHtmlMode
      };
      setTemplates(prev => [...prev, newTemplateToSave]);
      setNewTemplate({ 
        name: '', 
        subject: '', 
        content: '', 
        variables: [], 
        isHtml: false,
        categoryId: null,
        processStep: null,
        recipientType: null
      });
      setShowCreate(false);
    }
  };
// B. เพิ่มฟังก์ชัน getVariableNamesFromTemplate สำหรับดึงชื่อตัวแปรให้ถูกต้อง
const getVariableNamesFromTemplate = (template) => {
  if (!template.variables || !Array.isArray(template.variables)) {
    return [];
  }
  
  return template.variables.map(v => {
    if (typeof v === 'object' && v.variable_name) {
      return v.variable_name;
    } else if (typeof v === 'string') {
      return v;
    }
    return null;
  }).filter(Boolean); // กรองค่า null ออก
};
  const handleDelete = (id) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
  };

  const handlePreview = (template) => {
    setPreview(template);
    setIsHtmlMode(template.isHtml);
  
    // ดึงชื่อตัวแปรทั้งหมด
    const variableNames = getVariableNamesFromTemplate(template);
  
    if (template.categoryId === 1) { // หมวดหมู่ลงทะเบียน
      const defaultData = {};
      variableNames.forEach(varName => {
        defaultData[varName] = `{{${varName}}}`;
      });
      setPreviewData(JSON.stringify(defaultData, null, 2));
    } else if (template.categoryId === 2) { // หมวดหมู่ WiFi
      const relevantData = {};
      variableNames.forEach(varName => {
        if (wifiSampleData[varName] !== undefined) {
          relevantData[varName] = wifiSampleData[varName];
        } else {
          relevantData[varName] = `{{${varName}}}`;
        }
      });
      setPreviewData(JSON.stringify(relevantData, null, 2));
    } else {
      // กรณีเป็นหมวดหมู่อื่นๆ
      const defaultData = {};
      variableNames.forEach(varName => {
        defaultData[varName] = `{{${varName}}}`;
      });
      setPreviewData(JSON.stringify(defaultData, null, 2));
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

  // ฟังก์ชั่นสำหรับแสดงสีของแต่ละขั้นตอน
  const getStepColorClass = (stepId) => {
    const step = getProcessStep(stepId);
    const colorMap = {
      'blue': 'bg-blue-100 text-blue-800',
      'indigo': 'bg-indigo-100 text-indigo-800',
      'purple': 'bg-purple-100 text-purple-800',
      'green': 'bg-green-100 text-green-800',
      'emerald': 'bg-emerald-100 text-emerald-800',
      'amber': 'bg-amber-100 text-amber-800',
      'red': 'bg-red-100 text-red-800',
      'gray': 'bg-gray-100 text-gray-800'
    };
    return colorMap[step.color] || 'bg-gray-100 text-gray-800';
  };
  
  // ฟังก์ชั่นสำหรับแสดงสีของแต่ละประเภทผู้รับ
  const getRecipientColorClass = (typeId) => {
    const type = getRecipientType(typeId);
    const colorMap = {
      'blue': 'bg-blue-100 text-blue-800',
      'purple': 'bg-purple-100 text-purple-800',
      'indigo': 'bg-indigo-100 text-indigo-800',
      'green': 'bg-green-100 text-green-800',
      'gray': 'bg-gray-100 text-gray-800'
    };
    return colorMap[type.color] || 'bg-gray-100 text-gray-800';
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
                  categoryId: selectedCategory,
                  processStep: null,
                  recipientType: null
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
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        {/* หมวดหมู่ */}
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
                        
                        {/* ขั้นตอนการทำงาน */}
                        {template.processStep && (
                          <div className="relative group inline-block">
                            <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${getStepColorClass(template.processStep)}`}>
                              <span className="font-medium">ขั้นตอน {template.processStep}</span>: {getProcessStep(template.processStep).name}
                            </span>
                          </div>
                        )}
                        
                        {/* ผู้รับ email */}
                        {template.recipientType && (
                          <div className="relative group inline-block">
                            <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${getRecipientColorClass(template.recipientType)}`}>
                              <span className="font-medium">ส่งถึง</span>: {getRecipientType(template.recipientType).name}
                            </span>
                          </div>
                        )}
                        
                        {/* รูปแบบ HTML */}
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