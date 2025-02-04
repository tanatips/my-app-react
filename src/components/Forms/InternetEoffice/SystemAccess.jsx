import React from 'react';

const SystemAccess = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6 bg-gray-50 p-4 rounded">
      <h3 className="font-semibold text-lg">ระดับการใช้งานระบบงาน</h3>

      {/* Saraban System */}
      <div>
        <p className="mb-2">ระบบสารบรรณ</p>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="sarabanLevel"
              value="general"
              checked={formData.sarabanLevel === 'general'}
              onChange={handleChange}
              className="mr-2"
            />
            ผู้ใช้ทั่วไป
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="sarabanLevel"
              value="department"
              checked={formData.sarabanLevel === 'department'}
              onChange={handleChange}
              className="mr-2"
            />
            สารบรรณระดับกอง/เขต/จังหวัด
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="sarabanLevel"
              value="division"
              checked={formData.sarabanLevel === 'division'}
              onChange={handleChange}
              className="mr-2"
            />
            สารบรรณระดับกลุ่มงาน/ฝ่าย
          </label>
        </div>
      </div>

      {/* Leave System */}
      <div>
        <p className="mb-2">ระบบการลา</p>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="leaveLevel"
              value="general"
              checked={formData.leaveLevel === 'general'}
              onChange={handleChange}
              className="mr-2"
            />
            ผู้ใช้ทั่วไป
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="leaveLevel"
              value="approver1"
              checked={formData.leaveLevel === 'approver1'}
              onChange={handleChange}
              className="mr-2"
            />
            ผู้พิจารณาในลำดับ
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="leaveLevel"
              value="approver2"
              checked={formData.leaveLevel === 'approver2'}
              onChange={handleChange}
              className="mr-2"
            />
            ผู้อนุมัติในลำดับ
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="leaveLevel"
              value="substitute"
              checked={formData.leaveLevel === 'substitute'}
              onChange={handleChange}
              className="mr-2"
            />
            ปฏิบัติราชการแทน
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="leaveLevel"
              value="admin"
              checked={formData.leaveLevel === 'admin'}
              onChange={handleChange}
              className="mr-2"
            />
            Admin ระดับกอง
          </label>
        </div>
      </div>

      {/* Car Reservation System */}
      <div>
        <p className="mb-2">ระบบจองรถ</p>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="carLevel"
              value="general"
              checked={formData.carLevel === 'general'}
              onChange={handleChange}
              className="mr-2"
            />
            ผู้ใช้ทั่วไป
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="carLevel"
              value="approver"
              checked={formData.carLevel === 'approver'}
              onChange={handleChange}
              className="mr-2"
            />
            ผู้รับรองในจองรถ
          </label>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block mb-1">หมายเหตุ</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full border rounded p-2"
          rows="2"
        />
      </div>
    </div>
  );
};

export { SystemAccess };
