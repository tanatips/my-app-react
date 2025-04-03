import { User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const HelpingGovernmentModal = () => {
  // State สำหรับเก็บข้อมูลฟอร์ม
  const [formData, setFormData] = useState({
    positionId: '',
    employeeName: '',
    currentDepartment: '',
    otherCurrentDepartment: '',
    targetDepartment: '',
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
  // State สำหรับควบคุม modal
  const [open, setOpen] = useState(false);

  const departments = [
    "สำนักงานใหญ่",
    "ฝ่ายการเงิน",
    "ฝ่ายบุคคล",
    "ฝ่ายไอที",
    "ฝ่ายขาย",
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
    if (!formData.positionId || !formData.employeeName || 
      !formData.currentDepartment || !formData.targetDepartment ||
      !formData.startDate || !formData.endDate || !formData.reason ||
      !formData.orderNumber || !formData.orderEffectiveDate) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    // ตรวจสอบความถูกต้องของวันที่
    if (!validateDates()) {
      return;
    }

    // ตรวจสอบว่าหน่วยงานต้นสังกัดต้องไม่เหมือนกับหน่วยงานที่ไปช่วยราชการ
    if (formData.currentDepartment === formData.targetDepartment) {
      setError('หน่วยงานต้นสังกัดและหน่วยงานที่ไปช่วยราชการต้องไม่เป็นหน่วยงานเดียวกัน');
      return;
    }

    console.log('ข้อมูลที่ส่ง:', formData);
    // TODO: เพิ่มการเรียก API สำหรับบันทึกข้อมูล
    setOpen(false); // ปิด Modal เมื่อบันทึกสำเร็จ
  };

  const handleCancel = () => {
    setOpen(false);
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

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => setOpen(true)} className="mb-4">เปิดแบบฟอร์มการช่วยราชการ</Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-center">
              <div className="flex justify-center w-full">
                <div className="flex items-center gap-2">
                  <User className="h-6 w-6" />
                  <span>แบบฟอร์มการช่วยราชการ</span>
                  {formData.employeeName && (
                    <span className="ml-2 text-lg font-normal text-gray-600">
                      - {formData.employeeName}
                    </span>
                  )}
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="overflow-y-auto max-h-[70vh] px-1 py-2">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ข้อมูลพนักงาน */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="positionId">รหัสตำแหน่ง</Label>
                  <Input
                    id="positionId"
                    value={formData.positionId}
                    onChange={(e) => setFormData({...formData, positionId: e.target.value})}
                    placeholder="กรุณากรอกรหัสพนักงาน"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="employeeName">ชื่อ-นามสกุล</Label>
                  <Input
                    id="employeeName"
                    value={formData.employeeName}
                    onChange={(e) => setFormData({...formData, employeeName: e.target.value})}
                    placeholder="กรุณากรอกชื่อ-นามสกุล"
                    className="mt-1"
                  />
                </div>

                {/* หน่วยงานต้นสังกัด */}
                <div>
                  <Label htmlFor="currentDepartment">หน่วยงานต้นสังกัด</Label>
                  <Select
                    value={formData.currentDepartment}
                    onValueChange={(value) => setFormData({...formData, currentDepartment: value})}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="เลือกหน่วยงานต้นสังกัด" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.currentDepartment === 'อื่นๆ' && (
                  <div className="mt-2">
                    <Input
                      placeholder="ระบุหน่วยงานต้นสังกัด"
                      value={formData.otherCurrentDepartment}
                      onChange={(e) => setFormData({...formData, otherCurrentDepartment: e.target.value})}
                    />
                  </div>
                )}

                {/* หน่วยงานที่ไปช่วยราชการ */}
                <div>
                  <Label htmlFor="targetDepartment">หน่วยงานที่ไปช่วยราชการ</Label>
                  <Select
                    value={formData.targetDepartment}
                    onValueChange={(value) => setFormData({...formData, targetDepartment: value})}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="เลือกหน่วยงานที่ไปช่วยราชการ" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* วันที่เริ่มต้น-สิ้นสุด */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">วันที่เริ่มต้น</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">วันที่สิ้นสุด</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* เลขที่คำสั่งและวันที่มีผลคำสั่ง */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="orderNumber">เลขที่คำสั่ง</Label>
                    <Input
                      id="orderNumber"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData({...formData, orderNumber: e.target.value})}
                      placeholder="กรุณากรอกเลขที่คำสั่ง"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="orderEffectiveDate">วันที่มีผลคำสั่ง</Label>
                    <Input
                      id="orderEffectiveDate"
                      type="date"
                      value={formData.orderEffectiveDate}
                      onChange={(e) => setFormData({...formData, orderEffectiveDate: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* เหตุผลในการช่วยราชการ */}
                <div>
                  <Label htmlFor="reason">เหตุผลในการช่วยราชการ</Label>
                  <textarea
                    id="reason"
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                    placeholder="กรุณากรอกเหตุผล"
                    className="w-full mt-1 p-2 border rounded-md"
                    rows={4}
                  />
                </div>
              </div>
            </form>
          </div>
          
          <DialogFooter className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              ยกเลิก
            </Button>
            <Button type="button" onClick={handleSubmit}>
              บันทึก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HelpingGovernmentModal;