// components/CategoryManagement.jsx
import { Pencil, Plus, X } from 'lucide-react';
import React, { useState } from 'react';

const CategoryManagement = ({ categories, setCategories }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!categoryName.trim()) return;

    if (editingId) {
      setCategories(
        categories.map(cat => 
          cat.id === editingId ? { ...cat, name: categoryName, description } : cat
        )
      );
      setEditingId(null);
    } else {
      const newCategory = {
        id: Date.now(),
        name: categoryName,
        description
      };
      setCategories([...categories, newCategory]);
    }

    setCategoryName('');
    setDescription('');
    setShowForm(false);
  };

  const handleEdit = (category) => {
    setCategoryName(category.name);
    setDescription(category.description || '');
    setEditingId(category.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="border rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">หมวดหมู่ Template</h3>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center gap-1 text-sm"
          >
            <Plus size={16} /> เพิ่มหมวดหมู่
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อหมวดหมู่
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="เช่น ขอใช้งาน Wifi"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              คำอธิบาย
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="รายละเอียดเกี่ยวกับหมวดหมู่นี้"
              rows="3"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setCategoryName('');
                setDescription('');
              }}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editingId ? 'บันทึก' : 'เพิ่ม'}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {categories.map(category => (
          <div key={category.id} className="p-3 bg-gray-50 rounded border">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{category.name}</h4>
                {category.description && (
                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  title="แก้ไข"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                  title="ลบ"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManagement;