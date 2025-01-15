// src/components/DepartmentManagement.jsx
import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react';
import DepartmentModal from '../components/Department/DepartmentModal';
import DepartmentTable from '../components/Department/DepartmentTable';

const initialDepartments = [
  {
    id: '1',
    dept_code: 'DEPT001',
    dept_name_th: 'แผนกบัญชี',
    dept_name_en: 'Accounting Department',
    department_type: 'CENTRAL',
    phone: '02-123-4567',
    email: 'accounting@company.com',
    address: 'กรุงเทพฯ',
    division_name_th_short: 'บช',
    parent_id: null
  },
  {
    id: '2',
    dept_code: 'DEPT002',
    dept_name_th: 'แผนกเทคโนโลยี',
    dept_name_en: 'IT Department',
    department_type: 'CENTRAL',
    phone: '02-987-6543',
    email: 'it@company.com',
    address: 'กรุงเทพฯ',
    division_name_th_short: 'IT',
    parent_id: null
  }
];

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState(initialDepartments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddDepartment = () => {
    setCurrentDepartment(null);
    setIsModalOpen(true);
  };

  const handleEditDepartment = (department) => {
    setCurrentDepartment(department);
    setIsModalOpen(true);
  };

  const handleDeleteDepartment = async (id) => {
    if (window.confirm('คุณแน่ใจว่าต้องการลบหน่วยงานนี้?')) {
      try {
        setIsLoading(true);
        setDepartments(departments.filter(dep => dep.id !== id));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="p-6">
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ระบบจัดการ หน่วยงาน</h1>
        <button 
          onClick={handleAddDepartment}
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 disabled:opacity-50"
        >
          <PlusCircle className="w-4 h-4" />
          เพิ่มหน่วยงาน
        </button>
      </div>

      <DepartmentTable
        departments={departments}
        isLoading={isLoading}
        onEdit={handleEditDepartment}
        onDelete={handleDeleteDepartment}
      />

      <DepartmentModal
        isOpen={isModalOpen}
        currentDepartment={currentDepartment}
        isLoading={isLoading}
        error={error}
        onClose={() => setIsModalOpen(false)}
        onSave={(newDepartment) => {
          if (currentDepartment) {
            setDepartments(departments.map(dep => dep.id === currentDepartment.id ? newDepartment : dep));
          } else {
            setDepartments([...departments, { ...newDepartment, id: String(Date.now()) }]);
          }
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default DepartmentManagement;