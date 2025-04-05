// components/EditModal.jsx (Updated)
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
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
  // ย้าย state declarations ขึ้นมาก่อน conditional return
  const [templateVariables, setTemplateVariables] = useState([]);
  
  // กำหนดค่า template หลังจากประกาศ state
  const template = editing || newTemplate;

  // ทุกครั้งที่มีการเปลี่ยนแปลงเนื้อหา หรือตอนเปิด modal จะทำการดึงตัวแปรออกมา
  useEffect(() => {
    if (isOpen && template && template.content) {
      // ดึงตัวแปรจากเนื้อหา
      const extractedVars = extractVariables(template.content);
      
      // ถ้ามี template.variables ที่มีอยู่แล้ว (กรณีแก้ไข)
      if (template.variables && template.variables.length > 0) {
        // สร้าง object ใหม่จาก template.variables
        const existingVarsMap = {};
        template.variables.forEach(v => {
          // หากตัวแปรเป็น object ที่มี variable_name
          if (typeof v === 'object' && v.variable_name) {
            existingVarsMap[v.variable_name] = v;
          } else if (typeof v === 'string') {
            // กรณีเป็นแค่ string (เวอร์ชันเก่า)
            existingVarsMap[v] = { variable_name: v, description: '', example_value: '' };
          }
        });
        
        // สร้างรายการตัวแปรใหม่โดยรวมข้อมูลจากตัวแปรเดิม
        const newVars = extractedVars.map(varName => {
          if (existingVarsMap[varName]) {
            // ถ้าตัวแปรนี้มีอยู่แล้ว ใช้ข้อมูลเดิม
            return existingVarsMap[varName];
          } else {
            // ถ้าเป็นตัวแปรใหม่ สร้างเป็นตัวแปรว่าง
            return {
              variable_name: varName,
              description: '',
              example_value: ''
            };
          }
        });
        
        setTemplateVariables(newVars);
      } else {
        // กรณีไม่มีตัวแปรเดิม (สร้างใหม่)
        const newVars = extractedVars.map(varName => ({
          variable_name: varName,
          description: '',
          example_value: ''
        }));
        
        setTemplateVariables(newVars);
      }
    }
  }, [template, isOpen, extractVariables]);

  const handleChange = (field, value) => {
    if (editing) {
      setEditing({ ...editing, [field]: value });
    } else {
      setNewTemplate({ ...newTemplate, [field]: value });
    }
  };

  // ฟังก์ชั่นสำหรับอัปเดตข้อมูลตัวแปร
  const handleVariableChange = (index, field, value) => {
    const updatedVariables = [...templateVariables];
    updatedVariables[index][field] = value;
    setTemplateVariables(updatedVariables);
  };

  // ฟังก์ชั่นเมื่อกดปุ่มบันทึก จะส่งข้อมูลตัวแปรไปด้วย
  const handleSaveWithVariables = () => {
    // อัปเดตเทมเพลตด้วยตัวแปรล่าสุด โดยแน่ใจว่าตัวแปรทุกตัวเป็น object ที่มีครบทุก field
    const normalizedVariables = templateVariables.map(v => {
      if (typeof v === 'object' && v.variable_name) {
        return {
          variable_name: v.variable_name,
          description: v.description || '',
          example_value: v.example_value || ''
        };
      } else if (typeof v === 'string') {
        return {
          variable_name: v,
          description: '',
          example_value: ''
        }; 
      }
      return v;
    });
    
    if (editing) {
      const updatedTemplate = { ...editing, variables: normalizedVariables };
      setEditing(updatedTemplate);
      onSave();
    } else {
      const updatedTemplate = { ...newTemplate, variables: normalizedVariables };
      setNewTemplate(updatedTemplate);
      onSave();
    }
  };
  
  // ขั้นตอนการทำงานแบบใหม่ - เน้นตามขั้นตอนจริงของกระบวนการ
  const processSteps = [
    { id: 1, name: 'การลงทะเบียน/ขอใช้งาน' },
    { id: 2, name: 'การอนุมัติคำขอ' },
    { id: 3, name: 'การดำเนินการ' },
    { id: 4, name: 'การแจ้งผลการดำเนินการ' },
    { id: 5, name: 'การแจ้งเตือนการหมดอายุ' },
    { id: 6, name: 'การแจ้งผลการไม่อนุมัติ' },
    { id: 7, name: 'อื่นๆ' }
  ];

  // ผู้รับ email
  const recipientTypes = [
    { id: 1, name: 'ผู้ร้องขอ' },
    { id: 2, name: 'ผู้อนุมัติขั้นต้น' },
    { id: 3, name: 'ผู้อนุมัติขั้นสุดท้าย' },
    { id: 4, name: 'ผู้ดำเนินการ' },
    { id: 5, name: 'อื่นๆ' }
  ];

  // ย้าย conditional return มาไว้ท้ายสุดก่อน render
  if (!isOpen) return null;

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
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* เพิ่มส่วนของขั้นตอนการทำงาน (ปรับปรุงใหม่) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ขั้นตอนการทำงาน
            </label>
            <select
              value={template.processStep || ''}
              onChange={(e) => handleChange('processStep', e.target.value ? Number(e.target.value) : null)}
              className="w-full p-2 border rounded"
            >
              <option value="">-- เลือกขั้นตอนการทำงาน --</option>
              {processSteps.map(step => (
                <option key={step.id} value={step.id}>
                  {step.id}. {step.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">
              ระบุว่า template นี้จะถูกใช้ในขั้นตอนใดของกระบวนการทำงาน
            </p>
          </div>

          {/* เพิ่มส่วนของผู้รับ email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ผู้รับ Email
            </label>
            <select
              value={template.recipientType || ''}
              onChange={(e) => handleChange('recipientType', e.target.value ? Number(e.target.value) : null)}
              className="w-full p-2 border rounded"
            >
              <option value="">-- เลือกผู้รับ Email --</option>
              {recipientTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.id}. {type.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">
              ระบุว่า template นี้จะส่งให้ผู้รับประเภทใด
            </p>
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

          {/* เพิ่มส่วนตัวแปรและข้อมูลตัวแปร */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between items-center">
              <span>ตัวแปรที่ใช้</span>
              <span className="text-xs text-blue-600">พบ {templateVariables.length} ตัวแปร</span>
            </label>
            
            {templateVariables.length > 0 ? (
              <div className="border rounded overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ตัวแปร</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">คำอธิบาย</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ตัวอย่างค่า</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {templateVariables.map((variable, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-blue-600">
                          {`{{${variable.variable_name}}}`}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap">
                          <input
                            type="text"
                            value={variable.description || ''}
                            onChange={(e) => handleVariableChange(index, 'description', e.target.value)}
                            className="w-full p-1 border rounded text-sm"
                            placeholder="คำอธิบาย"
                          />
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap">
                          <input
                            type="text"
                            value={variable.example_value || ''}
                            onChange={(e) => handleVariableChange(index, 'example_value', e.target.value)}
                            className="w-full p-1 border rounded text-sm"
                            placeholder="ตัวอย่างค่า"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500 bg-gray-50 rounded border">
                ไม่พบตัวแปรในเทมเพลตนี้
              </div>
            )}
            
            <p className="mt-2 text-xs text-gray-500">
              ตัวแปรจะถูกค้นหาโดยอัตโนมัติจากเนื้อหาเทมเพลต กรุณากรอกคำอธิบายและตัวอย่างค่าเพื่อให้ผู้ใช้เข้าใจการใช้งานได้ง่ายขึ้น
            </p>
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
              onClick={handleSaveWithVariables}
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