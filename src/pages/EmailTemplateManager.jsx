import { Eye, Pencil, Plus, X } from 'lucide-react';
import React from 'react';

const EmailTemplateManager = () => {
  // State for managing templates
  const [showCreate, setShowCreate] = React.useState(false);
  const [editing, setEditing] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [previewData, setPreviewData] = React.useState('{}');
  const [parseError, setParseError] = React.useState('');

  // State for new template creation
  const [newTemplate, setNewTemplate] = React.useState({
    name: '',
    subject: '',
    content: '',
    variables: []
  });

  // Templates data
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
      variables: ['requestId', 'supervisorName', 'requesterName', 'department', 'requestDate', 'reason', 'approvalLink']
    }
  ]);

  // Extract variables from content
  const extractVariables = (content) => {
    const variableMatches = content.match(/{{(\w+)}}/g) || [];
    return variableMatches.map(match => match.replace(/[{}]/g, ''));
  };

  // Replace variables in template
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

  const handleSave = () => {
    if (editing) {
      // Update existing template
      setTemplates(prev => prev.map(t => 
        t.id === editing.id 
          ? { 
              ...editing, 
              variables: extractVariables(editing.content) 
            } 
          : t
      ));
      setEditing(null);
    } else if (showCreate) {
      // Create new template
      const newTemplateToSave = {
        ...newTemplate,
        id: Date.now(),
        variables: extractVariables(newTemplate.content)
      };
      setTemplates(prev => [...prev, newTemplateToSave]);
      setNewTemplate({ name: '', subject: '', content: '', variables: [] });
      setShowCreate(false);
    }
  };

  const handleDelete = (id) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
  };

  const handlePreview = (template) => {
    setPreview(template);
    // Set default preview data based on template variables
    const defaultData = template.variables.reduce((acc, variable) => {
      acc[variable] = `{{${variable}}}`;
      return acc;
    }, {});
    setPreviewData(JSON.stringify(defaultData, null, 2));
    setParseError('');
  };

  const handleUpdatePreviewData = () => {
    try {
      // Validate JSON
      JSON.parse(previewData);
      setParseError('');
    } catch (error) {
      setParseError('รูปแบบ JSON ไม่ถูกต้อง');
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">จัดการ Email Template</h2>
          <button
            onClick={() => {
              setShowCreate(true);
              setNewTemplate({ name: '', subject: '', content: '', variables: [] });
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
                  <h3 className="font-semibold">{template.name}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditing(template)}
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

      {/* Template Edit Modal */}
      {(showCreate || editing) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editing ? 'แก้ไข Template' : 'สร้าง Template ใหม่'}
              </h3>
              <button
                onClick={() => {
                  setEditing(null);
                  setShowCreate(false);
                }}
                className="text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อ Template
                </label>
                <input
                  value={editing ? editing.name : newTemplate.name}
                  onChange={(e) => {
                    if (editing) {
                      setEditing({ ...editing, name: e.target.value });
                    } else {
                      setNewTemplate({ ...newTemplate, name: e.target.value });
                    }
                  }}
                  className="w-full p-2 border rounded"
                  placeholder="เช่น แจ้งเตือนการหมดอายุ WiFi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  หัวข้ออีเมล
                </label>
                <input
                  value={editing ? editing.subject : newTemplate.subject}
                  onChange={(e) => {
                    if (editing) {
                      setEditing({ ...editing, subject: e.target.value });
                    } else {
                      setNewTemplate({ ...newTemplate, subject: e.target.value });
                    }
                  }}
                  className="w-full p-2 border rounded"
                  placeholder="เช่น แจ้งเตือน: WiFi กำลังจะหมดอายุ - {{requestId}}"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เนื้อหา
                </label>
                <textarea
                  value={editing ? editing.content : newTemplate.content}
                  onChange={(e) => {
                    if (editing) {
                      setEditing({ ...editing, content: e.target.value });
                    } else {
                      setNewTemplate({ ...newTemplate, content: e.target.value });
                    }
                  }}
                  className="w-full h-48 p-2 border rounded font-mono text-sm"
                  placeholder="เนื้อหาอีเมล..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ตัวแปรที่ใช้
                </label>
                <div className="p-2 border rounded bg-gray-50">
                  {(editing ? editing.variables : extractVariables(newTemplate.content)).map(variable => (
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
                  onClick={() => {
                    setEditing(null);
                    setShowCreate(false);
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  ยกเลิก
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
                >
                  {editing ? 'บันทึก' : 'สร้าง Template'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">ตัวอย่าง: {preview.name}</h3>
              <button onClick={() => setPreview(null)} className="text-gray-500">
                <X size={20} />
              </button>
            </div>

            <div className="flex gap-4">
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
                  <div className="p-3 bg-gray-50 rounded border whitespace-pre-wrap">
                    {replaceVariables(preview.content, previewData)}
                  </div>
                </div>
              </div>

              <div className="w-64">
                <h4 className="font-medium mb-2">ตัวแปรที่ใช้</h4>
                <div className="bg-gray-50 p-3 rounded border">
                  {preview.variables.map(variable => (
                    <div key={variable} className="mb-2">
                      <div className="font-medium text-blue-600">{`{{${variable}}}`}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTemplateManager;