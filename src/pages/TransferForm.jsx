import { X } from 'lucide-react';
import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';

// กำหนดค่า default เป็น empty function
const TransferForm = ({ onClose = () => {} }) => {
  const [formData, setFormData] = useState({
    sourceDepartment: 'สำนักงานเลขานุการกรม',
    sourceUnit: 'ฝ่ายบริหารทั่วไป',
    sourcePosition: 'หัวหน้าฝ่ายบริหารทั่วไป',
    targetDepartment: '',
    targetUnit: '',
    targetPosition: '',
    transferDate: '',
    status: '',
    referenceNumber: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleClose = () => {
    // ตรวจสอบว่ามีการกรอกข้อมูลหรือไม่
    const hasChanges = Object.values(formData).some(value => 
      value !== '' && 
      value !== formData.sourceDepartment && 
      value !== formData.sourceUnit && 
      value !== formData.sourcePosition
    );
    console.log("hasChanges:"+hasChanges);
    if (hasChanges) {
      // ถ้ามีการกรอกข้อมูล แสดง confirm
      if (window.confirm('คุณต้องการปิดแบบฟอร์มหรือไม่? ข้อมูลที่กรอกจะไม่ถูกบันทึก')) {
        // ตรวจสอบว่า onClose เป็น function หรือไม่
        console.log(typeof onClose);
        if (typeof onClose === 'function') {
          onClose();
        }
      }
    } else {
      // ถ้าไม่มีการกรอกข้อมูล ปิดได้เลย
      if (typeof onClose === 'function') {
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-100 p-2 rounded">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M3 12h18M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold">โอนย้าย</h2>
          </div>
          <button 
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={handleClose}
            aria-label="ปิด"
          >
            <X size={24} />
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-3">
            <svg className="w-6 h-6 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-600">ชื่อ</p>
            <p className="font-semibold">นายสมคิด ป้องสมชัด</p>
          </div>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-2 gap-6">
          {/* Source Info */}
          <Card className="p-4">
            <CardContent>
              <h3 className="font-semibold mb-3">จาก</h3>
              <div className="space-y-3">
                <p>สำนัก/กอง: {formData.sourceDepartment}</p>
                <p>หน่วยงาน: {formData.sourceUnit}</p>
                <p>ตำแหน่ง: {formData.sourcePosition}</p>
              </div>
            </CardContent>
          </Card>

          {/* Target Info */}
          <Card className="p-4">
            <CardContent>
              <h3 className="font-semibold mb-3">โอนย้ายไปยัง</h3>
              <div className="space-y-3">
                <select 
                  className="w-full p-2 border rounded"
                  value={formData.targetDepartment}
                  onChange={(e) => setFormData({...formData, targetDepartment: e.target.value})}
                >
                  <option value="">เลือกสำนัก/กอง</option>
                  <option value="1">สำนัก 1</option>
                  <option value="2">สำนัก 2</option>
                </select>
                
                <select 
                  className="w-full p-2 border rounded"
                  value={formData.targetUnit}
                  onChange={(e) => setFormData({...formData, targetUnit: e.target.value})}
                >
                  <option value="">เลือกหน่วยงาน</option>
                  <option value="1">หน่วยงาน 1</option>
                  <option value="2">หน่วยงาน 2</option>
                </select>

                <select 
                  className="w-full p-2 border rounded"
                  value={formData.targetPosition}
                  onChange={(e) => setFormData({...formData, targetPosition: e.target.value})}
                >
                  <option value="">เลือกตำแหน่ง</option>
                  <option value="1">ตำแหน่ง 1</option>
                  <option value="2">ตำแหน่ง 2</option>
                </select>

                <input 
                  type="date"
                  className="w-full p-2 border rounded"
                  value={formData.transferDate}
                  onChange={(e) => setFormData({...formData, transferDate: e.target.value})}
                />

                <select 
                  className="w-full p-2 border rounded"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="">เลือกสถานะ</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <input 
                  type="text"
                  placeholder="หมายเลขคำสั่ง"
                  className="w-full p-2 border rounded"
                  value={formData.referenceNumber}
                  onChange={(e) => setFormData({...formData, referenceNumber: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end space-x-3 mt-6">
          <button 
            className="px-6 py-2 border rounded hover:bg-gray-100"
            onClick={handleClose}
          >
            ยกเลิก
          </button>
          <button 
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferForm;