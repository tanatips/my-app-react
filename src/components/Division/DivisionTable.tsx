// src/components/DivisionTable.jsx
import { Pencil, Trash2 } from 'lucide-react';
import React from 'react';

const DivisionTable = ({ divisions, isLoading, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
        <tr>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">รหัส</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">ชื่อสำนัก/กอง/ศูนย์/สถาบัน/กลุ่ม (ไทย)</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">ชื่อสำนัก/กอง/ศูนย์/สถาบัน/กลุ่ม (อังกฤษ)</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">ประเภท</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">เบอร์โทร</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">อีเมล</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">จัดการ</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {divisions.map((division) => (
            <tr key={division.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{division.division_code}</td>
              <td className="px-6 py-4 whitespace-nowrap">{division.division_name_th}</td>
              <td className="px-6 py-4 whitespace-nowrap">{division.division_name_en}</td>
              <td className="px-6 py-4 whitespace-nowrap">{division.division_type}</td>
              <td className="px-6 py-4 whitespace-nowrap">{division.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">{division.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(division)}
                    disabled={isLoading}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md flex items-center gap-1 hover:bg-blue-200 disabled:opacity-50"
                  >
                    <Pencil className="w-4 h-4" />
                    แก้ไข
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(division.id)}
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

export default DivisionTable;