import { History, X } from 'lucide-react';
import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import TransferHistory from './TransferHistory';

const TransferForm = ({ onClose = () => {} }) => {
  const [formData, setFormData] = useState({
    sourceDepartment: 'สำนักงานเลขานุการกรม',
    sourceUnit: 'ฝ่ายบริหารทั่วไป',
    sourcePosition: 'หัวหน้าฝ่ายบริหารทั่วไป',
    sourcePositionLevel: 'ชำนาญการพิเศษ',
    targetDepartment: '',
    targetUnit: '',
    targetPosition: '',
    targetPositionLevel: '',
    transferDate: '',
    referenceNumber: '',
    orderEffectiveDate: ''
  });
  
  // เพิ่ม state สำหรับการแสดงประวัติการโอนย้าย
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleClose = () => {
    const hasChanges = Object.values(formData).some(value => 
      value !== '' && 
      value !== formData.sourceDepartment && 
      value !== formData.sourceUnit && 
      value !== formData.sourcePosition
    );
    if (hasChanges) {
      if (window.confirm('คุณต้องการปิดแบบฟอร์มหรือไม่? ข้อมูลที่กรอกจะไม่ถูกบันทึก')) {
        if (typeof onClose === 'function') {
          onClose();
        }
      }
    } else {
      if (typeof onClose === 'function') {
        onClose();
      }
    }
  };

  const FormField = ({ label, description, children, required }) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
      {children}
    </div>
  );

  // ถ้าแสดงประวัติการโอนย้าย ให้แสดง TransferHistory component
  if (showHistory) {
    return <TransferHistory onClose={() => setShowHistory(false)} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-5xl p-6 relative">
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

        {/* User Info with History Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
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
          
          {/* เพิ่มปุ่มดูประวัติการโอนย้าย */}
          <button 
            className="flex items-center space-x-1 px-4 py-2 border rounded-md hover:bg-gray-50 text-blue-600"
            onClick={() => setShowHistory(true)}
          >
            <History size={18} />
            <span>ดูประวัติการโอนย้าย</span>
          </button>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-2 gap-6">
          {/* Source Info */}
                <Card className="p-4">
                <CardContent>
                  <h3 className="font-semibold mb-3">จาก</h3>
                  <div className="space-y-3">
                  <p>สถานที่ทำงาน: คลังเขต 1 กรุงเทพมหานคร</p>
                  <p>สำนัก/กอง: {formData.sourceDepartment}</p>
                  <p>หน่วยงาน: {formData.sourceUnit}</p>
                  <p>ตำแหน่ง: {formData.sourcePosition}</p>
                  <p>ระดับตำแหน่ง: {formData.sourcePositionLevel}</p>
                  </div>
                </CardContent>
                </Card>

                {/* Target Info */}
                      <Card className="p-4">
                      <CardContent>
                        <h3 className="font-semibold mb-3">โอนย้ายไปยัง</h3>
                        <div className="space-y-4">
                        <FormField 
                          label="สถานที่ทำงาน"
                          required
                        >
                          <div className="flex space-x-4">
                          <label className="flex items-center space-x-2">
                            <input
                            type="radio"
                            name="workLocation"
                            value="ส่วนกลาง"
                            checked={formData.workLocation === 'ส่วนกลาง'}
                            onChange={(e) => setFormData({...formData, workLocation: e.target.value})}
                            />
                            <span>ส่วนกลาง</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                            type="radio"
                            name="workLocation"
                            value="คลังเขต"
                            checked={formData.workLocation === 'คลังเขต'}
                            onChange={(e) => setFormData({...formData, workLocation: e.target.value})}
                            />
                            <span>คลังเขต</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                            type="radio"
                            name="workLocation"
                            value="คลังจังหวัด"
                            checked={formData.workLocation === 'คลังจังหวัด'}
                            onChange={(e) => setFormData({...formData, workLocation: e.target.value})}
                            />
                            <span>คลังจังหวัด</span>
                          </label>
                          </div>
                        </FormField>

                        <FormField 
                          label="สำนัก/กอง" 
                          required
                        >
                          <select 
                          className="w-full p-2 border rounded"
                          value={formData.targetDepartment}
                          onChange={(e) => setFormData({...formData, targetDepartment: e.target.value})}
                          >
                          <option value="">เลือกสำนัก/กอง</option>
                          <option value="1">สำนัก 1</option>
                          <option value="2">สำนัก 2</option>
                          </select>
                        </FormField>
                        
                        <FormField 
                          label="หน่วยงาน"
                          required
                        >
                          <select 
                          className="w-full p-2 border rounded"
                          value={formData.targetUnit}
                          onChange={(e) => setFormData({...formData, targetUnit: e.target.value})}
                          >
                          <option value="">เลือกหน่วยงาน</option>
                          <option value="1">หน่วยงาน 1</option>
                          <option value="2">หน่วยงาน 2</option>
                          </select>
                        </FormField>

                        <FormField 
                          label="ตำแหน่ง"
                          required
                        >
                          <select 
                          className="w-full p-2 border rounded"
                          value={formData.targetPosition}
                          onChange={(e) => setFormData({...formData, targetPosition: e.target.value})}
                          >
                          <option value="">เลือกตำแหน่ง</option>
                          <option value="1">ตำแหน่ง 1</option>
                          <option value="2">ตำแหน่ง 2</option>
                          </select>
                        </FormField>

                        <FormField 
                          label="ระดับตำแหน่ง"
                          required
                        >
                          <select 
                          className="w-full p-2 border rounded"
                          value={formData.targetPositionLevel}
                          onChange={(e) => setFormData({...formData, targetPositionLevel: e.target.value})}
                          >
                          <option value="">เลือกระดับตำแหน่ง</option>
                          <option value="ปฏิบัติการ">ปฏิบัติการ</option>
                          <option value="ชำนาญการ">ชำนาญการ</option>
                          <option value="ชำนาญการพิเศษ">ชำนาญการพิเศษ</option>
                          <option value="เชี่ยวชาญ">เชี่ยวชาญ</option>
                          <option value="ทรงคุณวุฒิ">ทรงคุณวุฒิ</option>
                          </select>
                        </FormField>

                        <FormField 
                          label="วันที่โอนย้าย"
                          required
                        >
                          <input 
                          type="date"
                          className="w-full p-2 border rounded"
                          value={formData.transferDate}
                          onChange={(e) => setFormData({...formData, transferDate: e.target.value})}
                          />
                        </FormField>

                        <FormField 
                          label="หมายเลขคำสั่ง"
                          required
                        >
                          <input 
                          type="text"
                          className="w-full p-2 border rounded"
                          value={formData.referenceNumber}
                          onChange={(e) => setFormData({...formData, referenceNumber: e.target.value})}
                          placeholder="เลขที่คำสั่ง"
                          />
                        </FormField>

                        <FormField 
                          label="วันที่มีผลคำสั่ง"
                          required
                        >
                          <input 
                          type="date"
                          className="w-full p-2 border rounded"
                          value={formData.orderEffectiveDate}
                          onChange={(e) => setFormData({...formData, orderEffectiveDate: e.target.value})}
                          />
                        </FormField>
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