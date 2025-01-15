// src/components/DivisionManagement.jsx
import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react';
import DivisionModal from '../components/Division/DivisionModal';
import DivisionTable from '../components/division/DivisionTable';
// Mock initial data
const initialDivisions = [
  {
    id: '1',
    division_code: 'DIV001',
    division_name_th: 'แผนกบัญชี',
    division_name_en: 'Accounting',
    division_type: 'Department',
    phone: '02-123-4567',
    email: 'account@company.com',
    address: 'กรุงเทพฯ',
    division_name_th_short: 'บช',
    parent_id: null
  }
];

const DivisionManagement = () => {
  const [divisions, setDivisions] = useState(initialDivisions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDivision, setCurrentDivision] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    division_code: '',
    division_name_th: '',
    division_name_en: '',
    division_type: '',
    phone: '',
    email: '',
    address: '',
    division_name_th_short: '',
    parent_id: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (currentDivision) {
        setDivisions(prev => 
          prev.map(div => 
            div.id === currentDivision.id 
              ? { ...div, ...formData, updated_date: new Date().toISOString() }
              : div
          )
        );
        alert('บันทึกการแก้ไขสำเร็จ');
      } else {
        const newDivision = {
          ...formData,
          id: String(Date.now()),
          created_date: new Date().toISOString(),
          updated_date: new Date().toISOString(),
          parent_id: formData.parent_id || null
        };
        setDivisions(prev => [...prev, newDivision]);
        alert('เพิ่มข้อมูลสำเร็จ');
      }

      handleCloseModal();
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาด');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (division) => {
    setCurrentDivision(division);
    setFormData(division);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('ยืนยันการลบข้อมูล?')) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDivisions(prev => prev.filter(div => div.id !== id));
      alert('ลบข้อมูลสำเร็จ');
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาดในการลบข้อมูล');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentDivision(null);
    setError(null);
    setFormData({
      division_code: '',
      division_name_th: '',
      division_name_en: '',
      division_type: '',
      phone: '',
      email: '',
      address: '',
      division_name_th_short: '',
      parent_id: ''
    });
  };

  return (
    <div className="p-6">
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ระบบจัดการ สำนัก/กอง/ศูนย์/สถาบัน/กลุ่ม</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 disabled:opacity-50"
        >
          <PlusCircle className="w-4 h-4" />
          เพิ่ม สำนัก/กอง/ศูนย์/สถาบัน/กลุ่ม
        </button>
      </div>

      <DivisionTable
        divisions={divisions}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <DivisionModal
        isOpen={isModalOpen}
        currentDivision={currentDivision}
        isLoading={isLoading}
        error={error}
        formData={formData}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default DivisionManagement;