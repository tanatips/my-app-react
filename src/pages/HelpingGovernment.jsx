import { History, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ServiceTransferTable from '../components/HelpingGovernment/HelpingGovernmentTable';
import { Alert, AlertDescription } from '../components/ui/alert';

const HelpingGovernment = () => {
  // State สำหรับเก็บข้อมูลฟอร์ม
  const [formData, setFormData] = useState({
    division: '',
    otherDivision: '',
    department: '',
    otherDepartment: '',
    position: '',
    otherPosition: '',
    positionLevel: '',
    otherPositionLevel: '',
    startDate: '',
    endDate: '',
    reason: '',
    status: 'รอดำเนินการ',  
    orderNumber: '',
    orderEffectiveDate: ''
  });

  // State สำหรับเก็บสถานะการโหลดข้อมูล
  const [isLoading, setIsLoading] = useState(true);
  // State สำหรับเก็บข้อผิดพลาด
  const [error, setError] = useState(null);
  // State สำหรับเก็บสิทธิ์การเข้าถึง
  const [hasPermission, setHasPermission] = useState(false);
  // State สำหรับตรวจสอบว่ามีการช่วยราชการที่ยังไม่สิ้นสุดอยู่หรือไม่
  const [hasActiveTransfer, setHasActiveTransfer] = useState(false);
  // State สำหรับควบคุมการแสดงประวัติ
  const [showHistory, setShowHistory] = useState(false);

  // ข้อมูลสำหรับ dropdowns
  const departments = [
    "สำนักงานใหญ่",
    "ฝ่ายการเงิน",
    "ฝ่ายบุคคล",
    "ฝ่ายไอที",
    "ฝ่ายขาย",
    "อื่นๆ"
  ];
  
  const divisions = [
    "สำนักงานอธิบดี",
    "สำนักส่งเสริมวิชาการ",
    "สำนักงานเลขานุการกรม",
    "สำนักพัฒนาระบบ",
    "สำนักบริหารทรัพยากรบุคคล",
    "อื่นๆ"
  ];
  
  const positions = [
    "นักวิชาการ",
    "นักวิเคราะห์นโยบายและแผน",
    "นักทรัพยากรบุคคล",
    "นักจัดการงานทั่วไป",
    "เจ้าพนักงานธุรการ",
    "อื่นๆ"
  ];
  
  const positionLevels = [
    "ปฏิบัติการ",
    "ชำนาญการ",
    "ชำนาญการพิเศษ",
    "เชี่ยวชาญ",
    "ทรงคุณวุฒิ",
    "อื่นๆ"
  ];

  // ฟังก์ชันจำลองการตรวจสอบสิทธิ์
  const checkPermission = async () => {
    try {
      // TODO: เชื่อมต่อ API เพื่อตรวจสอบสิทธิ์
      const hasAccess = true; // จำลองผลการตรวจสอบ
      setHasPermission(hasAccess);
    } catch (err) {
      setError('ไม่สามารถตรวจสอบสิทธิ์การเข้าถึงได้');
    }
  };

  // ฟังก์ชันจำลองการตรวจสอบการช่วยราชการที่ยังไม่สิ้นสุด
  const checkActiveTransfer = async () => {
    try {
      // TODO: เชื่อมต่อ API เพื่อตรวจสอบการช่วยราชการที่ยังไม่สิ้นสุด
      const hasActive = false; // จำลองผลการตรวจสอบ
      setHasActiveTransfer(hasActive);
    } catch (err) {
      setError('ไม่สามารถตรวจสอบสถานะการช่วยราชการได้');
    }
  };

  // ฟังก์ชันตรวจสอบความถูกต้องของวันที่
  const validateDates = () => {
    if (!formData.startDate || !formData.endDate) return true;
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const today = new Date();
    
    // ตรวจสอบว่าวันที่เริ่มต้นต้องไม่เป็นวันที่ผ่านมาแล้ว
    if (start < today) {
      setError('วันที่เริ่มต้นต้องไม่เป็นวันที่ผ่านมาแล้ว');
      return false;
    }
    
    // ตรวจสอบว่าวันที่สิ้นสุดต้องมาหลังวันที่เริ่มต้น
    if (end <= start) {
      setError('วันที่สิ้นสุดต้องมาหลังวันที่เริ่มต้น');
      return false;
    }
    
    return true;
  };
  
  const handleClose = () => {
    // ปิดฟอร์มทันทีโดยไม่แสดง confirm dialog
    console.log('ปิดฟอร์ม');
    // TODO: นำทางกลับไปยังหน้าหลัก หรือดำเนินการอื่น
  };

  // เพิ่ม FormField component เหมือนใน TransferForm
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

  useEffect(() => {
    const initializeForm = async () => {
      try {
        setIsLoading(true);
        // ตรวจสอบเงื่อนไขต่างๆ ก่อนแสดงฟอร์ม
        await Promise.all([
          checkPermission(),
          checkActiveTransfer()
        ]);
      } catch (err) {
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      } finally {
        setIsLoading(false);
      }
    };

    initializeForm();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // ตรวจสอบการกรอกข้อมูลที่จำเป็น
    if (!formData.division || (formData.division === 'อื่นๆ' && !formData.otherDivision) ||
        !formData.department || (formData.department === 'อื่นๆ' && !formData.otherDepartment) ||
        !formData.position || (formData.position === 'อื่นๆ' && !formData.otherPosition) ||
        !formData.positionLevel || (formData.positionLevel === 'อื่นๆ' && !formData.otherPositionLevel) ||
        !formData.startDate || !formData.endDate || 
        !formData.reason || !formData.orderNumber || !formData.orderEffectiveDate) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    // ตรวจสอบความถูกต้องของวันที่
    if (!validateDates()) {
      return;
    }

    console.log('ข้อมูลที่ส่ง:', formData);
    // TODO: เพิ่มการเรียก API สำหรับบันทึกข้อมูล
  };

  // สำหรับการแสดงประวัติการช่วยราชการ
  const handleShowHistory = () => {
    setShowHistory(true);
    // TODO: เรียก API เพื่อดึงข้อมูลประวัติการช่วยราชการ
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">กำลังโหลดข้อมูล...</div>
      </div>
    );
  }

  if (!hasPermission) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-4">
        <AlertDescription>
          คุณไม่มีสิทธิ์เข้าถึงหน้านี้
        </AlertDescription>
      </Alert>
    );
  }

  if (hasActiveTransfer) {
    return (
      <Alert variant="warning" className="max-w-2xl mx-auto mt-4">
        <AlertDescription>
          คุณมีการช่วยราชการที่ยังไม่สิ้นสุด ไม่สามารถสร้างรายการใหม่ได้
        </AlertDescription>
      </Alert>
    );
  }

  // ถ้า showHistory เป็น true แสดง modal ประวัติการช่วยราชการ
  if (showHistory) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-6xl w-full p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">ประวัติการช่วยราชการ</h2>
            <button 
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setShowHistory(false)}
              aria-label="ปิด"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="my-4">
            <ServiceTransferTable />
          </div>
          
          <div className="flex justify-end mt-4">
            <button 
              className="px-6 py-2 border rounded hover:bg-gray-100"
              onClick={() => setShowHistory(false)}
            >
              ปิด
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg max-w-6xl mx-auto p-6 shadow-md">
        {/* Header แบบเดียวกับ TransferForm */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-100 p-2 rounded">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M3 12h18M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold">แบบฟอร์มการช่วยราชการ</h2>
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
              <User className="w-6 h-6 text-green-700" />
            </div>
            <div>
              <p className="text-gray-600">ชื่อ: <span className="font-semibold">นายสมชาย ใจดี</span></p>
            </div>
          </div>
          
          {/* ปุ่มดูประวัติการช่วยราชการ */}
          <button 
            className="flex items-center space-x-1 px-4 py-2 border rounded-md hover:bg-gray-50 text-blue-600"
            onClick={handleShowHistory}
          >
            <History size={18} />
            <span>ดูประวัติการช่วยราชการ</span>
          </button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* หน่วยงานที่ไปช่วยราชการ */}
          <div>
            <h3 className="text-lg font-medium mb-4">หน่วยงานที่ไปช่วยราชการ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* 1. สำนัก/กอง */}
                <FormField label="สำนัก/กอง" required>
                  <select
                    className="w-full p-2 border rounded"
                    value={formData.division}
                    onChange={(e) => setFormData({...formData, division: e.target.value})}
                  >
                    <option value="">เลือกสำนัก/กอง</option>
                    {divisions.map((div) => (
                      <option key={div} value={div}>
                        {div}
                      </option>
                    ))}
                  </select>
                </FormField>

                {formData.division === 'อื่นๆ' && (
                  <input
                    className="w-full p-2 border rounded mt-2"
                    placeholder="ระบุสำนัก/กอง"
                    value={formData.otherDivision}
                    onChange={(e) => setFormData({...formData, otherDivision: e.target.value})}
                  />
                )}

                {/* 3. ตำแหน่ง */}
                <FormField label="ตำแหน่ง" required>
                  <select
                    className="w-full p-2 border rounded"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                  >
                    <option value="">เลือกตำแหน่ง</option>
                    {positions.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </FormField>

                {formData.position === 'อื่นๆ' && (
                  <input
                    className="w-full p-2 border rounded mt-2"
                    placeholder="ระบุตำแหน่ง"
                    value={formData.otherPosition}
                    onChange={(e) => setFormData({...formData, otherPosition: e.target.value})}
                  />
                )}

                {/* 5. วันที่เริ่มต้น */}
                <FormField label="วันที่เริ่มต้น" required>
                  <input
                    type="date"
                    className="w-full p-2 border rounded"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </FormField>
                
                {/* 7. วันที่มีผลคำสั่ง */}
                <FormField label="วันที่มีผลคำสั่ง" required>
                  <input
                    type="date"
                    className="w-full p-2 border rounded"
                    value={formData.orderEffectiveDate}
                    onChange={(e) => setFormData({...formData, orderEffectiveDate: e.target.value})}
                  />
                </FormField>
              </div>

              <div className="space-y-4">
                {/* 2. กรม/กระทรวง */}
                <FormField label="กรม/กระทรวง" required>
                  <select
                    className="w-full p-2 border rounded"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                  >
                    <option value="">เลือกกรม/กระทรวง</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </FormField>

                {formData.department === 'อื่นๆ' && (
                  <input
                    className="w-full p-2 border rounded mt-2"
                    placeholder="ระบุกรม/กระทรวง"
                    value={formData.otherDepartment}
                    onChange={(e) => setFormData({...formData, otherDepartment: e.target.value})}
                  />
                )}

                {/* 4. ระดับตำแหน่ง */}
                <FormField label="ระดับตำแหน่ง" required>
                  <select
                    className="w-full p-2 border rounded"
                    value={formData.positionLevel}
                    onChange={(e) => setFormData({...formData, positionLevel: e.target.value})}
                  >
                    <option value="">เลือกระดับตำแหน่ง</option>
                    {positionLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </FormField>

                {formData.positionLevel === 'อื่นๆ' && (
                  <input
                    className="w-full p-2 border rounded mt-2"
                    placeholder="ระบุระดับตำแหน่ง"
                    value={formData.otherPositionLevel}
                    onChange={(e) => setFormData({...formData, otherPositionLevel: e.target.value})}
                  />
                )}
                
                {/* 6. วันที่สิ้นสุด */}
                <FormField label="วันที่สิ้นสุด" required>
                  <input
                    type="date"
                    className="w-full p-2 border rounded"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </FormField>
                
                {/* 8. เลขที่คำสั่ง */}
                <FormField label="เลขที่คำสั่ง" required>
                  <input
                    className="w-full p-2 border rounded"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({...formData, orderNumber: e.target.value})}
                    placeholder="กรุณากรอกเลขที่คำสั่ง"
                  />
                </FormField>
              </div>
            </div>
            
            {/* 9. เหตุผลในการช่วยราชการ */}
            <div className="mt-4">
              <FormField label="เหตุผลในการช่วยราชการ" required>
                <textarea
                  className="w-full p-2 border rounded"
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  placeholder="กรุณากรอกเหตุผล"
                  rows={4}
                />
              </FormField>
            </div>
          </div>
          
          {/* ปุ่มดำเนินการ */}
          <div className="flex justify-end space-x-3 mt-6">
            <button 
              type="button" 
              className="px-6 py-2 border rounded hover:bg-gray-100"
              onClick={handleClose}
            >
              ยกเลิก
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HelpingGovernment;