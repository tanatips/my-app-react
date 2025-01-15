import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const ServiceTransferForm = () => {
  // State สำหรับเก็บข้อมูลฟอร์ม
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    currentDepartment: '',
    targetDepartment: '',
    startDate: '',
    endDate: '',
    reason: '',
    status: 'รอดำเนินการ'
  });

  // State สำหรับเก็บสถานะการโหลดข้อมูล
  const [isLoading, setIsLoading] = useState(true);
  // State สำหรับเก็บข้อผิดพลาด
  const [error, setError] = useState(null);
  // State สำหรับเก็บสิทธิ์การเข้าถึง
  const [hasPermission, setHasPermission] = useState(false);
  // State สำหรับตรวจสอบว่ามีการช่วยราชการที่ยังไม่สิ้นสุดอยู่หรือไม่
  const [hasActiveTransfer, setHasActiveTransfer] = useState(false);

  const statuses = [
    "รอดำเนินการ",
    "อยู่ระหว่างการพิจารณา",
    "อนุมัติ",
    "ไม่อนุมัติ",
    "ยกเลิก",
    "สิ้นสุดการช่วยราชการ"
  ];

  const departments = [
    "สำนักงานใหญ่",
    "ฝ่ายการเงิน",
    "ฝ่ายบุคคล",
    "ฝ่ายไอที",
    "ฝ่ายขาย"
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
    if (!formData.employeeId || !formData.employeeName || 
        !formData.currentDepartment || !formData.targetDepartment ||
        !formData.startDate || !formData.endDate || !formData.reason) {
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
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            แบบฟอร์มการช่วยราชการ
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ข้อมูลพนักงาน */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="employeeId">รหัสพนักงาน</Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
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

              {/* แสดงสถานะการช่วยราชการ */}
              <div>
                <Label htmlFor="status">สถานะ</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({...formData, status: value})}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="เลือกสถานะ" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* ปุ่มดำเนินการ */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                ยกเลิก
              </Button>
              <Button type="submit">
                บันทึก
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceTransferForm;