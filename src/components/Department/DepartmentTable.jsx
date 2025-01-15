// src/components/DepartmentTable.jsx
import { Pencil, Trash2 } from 'lucide-react';
import React from 'react';

const DepartmentTable = ({ departments, isLoading, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">ลำดับ</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">รหัส</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">ชื่อ (ไทย)</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">ชื่อ (อังกฤษ)</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">ประเภท</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">เบอร์โทร</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">อีเมล</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">การดำเนินการ</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {departments.map((department) => (
            <tr key={department.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{department.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{department.dept_code}</td>
              <td className="px-6 py-4 whitespace-nowrap">{department.dept_name_th}</td>
              <td className="px-6 py-4 whitespace-nowrap">{department.dept_name_en}</td>
              <td className="px-6 py-4 whitespace-nowrap">{department.department_type}</td>
              <td className="px-6 py-4 whitespace-nowrap">{department.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">{department.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(department)}
                    disabled={isLoading}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md flex items-center gap-1 hover:bg-blue-200 disabled:opacity-50"
                  >
                    <Pencil className="w-4 h-4" />
                    แก้ไข
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(department.id)}
                    disabled={isLoading}
                    className="bg-red-100 text-red-600 px-3 py-1 rounded-md flex items-center gap-1 hover:bg-red-200 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    ลบ
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;