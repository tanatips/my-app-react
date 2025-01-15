// components/EmailTemplateManager.jsx
import { Eye, Pencil, Plus, X } from 'lucide-react';
import React from 'react';
import EditModal from './EditModal';
import PreviewModal from './PreviewModal';

const EmailTemplateManager = () => {
  // State Management
  const [showCreate, setShowCreate] = React.useState(false);
  const [editing, setEditing] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [previewData, setPreviewData] = React.useState('{}');
  const [parseError, setParseError] = React.useState('');
  const [isHtmlMode, setIsHtmlMode] = React.useState(false);

  const [newTemplate, setNewTemplate] = React.useState({
    name: '',
    subject: '',
    content: '',
    variables: [],
    isHtml: false
  });

  const [templates, setTemplates] = React.useState([
    {
      id: 1,
      name: 'แจ้งการขอใช้งาน WiFi',
      subject: 'แจ้งการขอใช้งาน WiFi - {{requestId}}',
      content: `เรียน {{supervisorName}},

มีการขอใช้งาน WiFi จากพนักงานในสังกัดของท่าน โดยมีรายละเอียดดังนี้:

ผู้ขอใช้งาน: {{requesterName}}
แผนก: {{department}}
วันที่ขอ: {{requestDate}}
เหตุผล: {{reason}}

กรุณาดำเนินการอนุมัติผ่านระบบ หรือคลิกที่ลิงก์ด้านล่าง:
{{approvalLink}}

ขอแสดงความนับถือ,
ทีม IT Support`,
      variables: ['requestId', 'supervisorName', 'requesterName', 'department', 'requestDate', 'reason', 'approvalLink'],
      isHtml: false
    }
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
      setNewTemplate({ name: '', subject: '', content: '', variables: [], isHtml: false });
      setShowCreate(false);
    }
  };

  const handleDelete = (id) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
  };

  const handlePreview = (template) => {
    setPreview(template);
    setIsHtmlMode(template.isHtml);
    const defaultData = template.variables.reduce((acc, variable) => {
      acc[variable] = `{{${variable}}}`;
      return acc;
    }, {});
    setPreviewData(JSON.stringify(defaultData, null, 2));
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
          <h2 className="text-xl font-bold">จัดการ Email Template</h2>
          <button
            onClick={() => {
              setShowCreate(true);
              setNewTemplate({ name: '', subject: '', content: '', variables: [], isHtml: false });
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={18} /> สร้าง Template ใหม่
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {templates.map(template => (
              <div key={template.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-semibold">{template.name}</h3>
                    {template.isHtml && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded ml-2">
                        HTML
                      </span>
                    )}
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
            ))}
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