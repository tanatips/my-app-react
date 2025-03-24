import { useState } from 'react';
import ActingDutyModal from './ActingDutyModal';

export default function ActingDutyPage() {
  // สร้าง State สำหรับเปิด/ปิด Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">ระบบจัดการการรักษาราชการแทน</h1>
      
      {/* ปุ่มเปิด Modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        เพิ่มรายการรักษาราชการแทน
      </button>
      
      {/* แสดง Modal เมื่อ isModalOpen เป็น true */}
      {isModalOpen && (
        <ActingDutyModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}