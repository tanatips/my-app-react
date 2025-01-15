// src/components/DivisionModal.jsx
import React from 'react';

const DivisionModal = ({
  isOpen,
  currentDivision,
  isLoading,
  error,
  formData,
  onClose,
  onSubmit,
  onChange,
  existingDivisions = [] // New prop for existing divisions
}) => {
  if (!isOpen) return null;

  // ข้อมูลตัวเลือกประเภทหน่วยงาน
  const divisionTypes = [
    { value: 'CENTRAL', text: 'ศูนย์' },
    { value: 'INTERNAL', text: 'หน่วยงานภายนอก' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {currentDivision ? 'แก้ไขข้อมูล สำนัก/กอง/ศูนย์/สถาบัน/กลุ่ม' : 'เพิ่ม สำนัก/กอง/ศูนย์/สถาบัน/กลุ่ม ใหม่'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* รหัส */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                รหัส
              </label>
              <input
                type="text"
                name="division_code"
                value={formData.division_code}
                onChange={onChange}
                required
                maxLength={10}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            {/* ประเภทหน่วยงาน (Dropdown) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ประเภท สำนัก/กอง/ศูนย์/สถาบัน/กลุ่ม
              </label>
              <select
                name="division_type"
                value={formData.division_type}
                onChange={onChange}
                required
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              >
                <option value="">-- เลือกประเภทหน่วยงาน --</option>
                {divisionTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.text}
                  </option>
                ))}
              </select>
            </div>

            {/* ส่วนที่เหลือคงเดิม */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อแผนก (ไทย)
              </label>
              <input
                type="text"
                name="division_name_th"
                value={formData.division_name_th}
                onChange={onChange}
                required
                maxLength={255}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อแผนก (อังกฤษ)
              </label>
              <input
                type="text"
                name="division_name_en"
                value={formData.division_name_en}
                onChange={onChange}
                required
                maxLength={255}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อย่อแผนก (ไทย)
              </label>
              <input
                type="text"
                name="division_name_th_short"
                value={formData.division_name_th_short}
                onChange={onChange}
                maxLength={10}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            {/* แก้ไขเป็น Dropdown สำหรับรหัสแผนกแม่ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                รหัสแผนกแม่
              </label>
              <select
                name="parent_id"
                value={formData.parent_id || ''}
                onChange={onChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              >
                <option value="">-- ไม่มีแผนกแม่ --</option>
                {existingDivisions
                  .filter(div => 
                    // ไม่แสดงหน่วยงานปัจจุบันในรายการ
                    !currentDivision || div.id !== currentDivision.id
                  )
                  .map(division => (
                    <option key={division.id} value={division.id}>
                      {division.division_code} - {division.division_name_th}
                    </option>
                  ))
                }
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                เบอร์โทรศัพท์
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={onChange}
                maxLength={15}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                อีเมล
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                maxLength={50}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ที่อยู่
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={onChange}
                maxLength={500}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? 'กำลังบันทึก...' : (currentDivision ? 'บันทึก' : 'เพิ่ม')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DivisionModal;