import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const EmployeeForm = () => {
  // คำนำหน้าภาษาไทย
  const titleThOptions = [
    { value: "นาย", label: "นาย" },
    { value: "นาง", label: "นาง" },
    { value: "นางสาว", label: "นางสาว" },
    { value: "ดร.", label: "ดร." },
    { value: "ผศ.", label: "ผศ." },
    { value: "ผศ.ดร.", label: "ผศ.ดร." },
    { value: "รศ.", label: "รศ." },
    { value: "รศ.ดร.", label: "รศ.ดร." },
    { value: "ศ.", label: "ศ." },
    { value: "ศ.ดร.", label: "ศ.ดร." }
  ];

  // คำนำหน้าภาษาอังกฤษ
  const titleEnOptions = [
    { value: "Mr.", label: "Mr." },
    { value: "Mrs.", label: "Mrs." },
    { value: "Miss", label: "Miss" },
    { value: "Dr.", label: "Dr." },
    { value: "Asst.Prof.", label: "Asst.Prof." },
    { value: "Asst.Prof.Dr.", label: "Asst.Prof.Dr." },
    { value: "Assoc.Prof.", label: "Assoc.Prof." },
    { value: "Assoc.Prof.Dr.", label: "Assoc.Prof.Dr." },
    { value: "Prof.", label: "Prof." },
    { value: "Prof.Dr.", label: "Prof.Dr." }
  ];

  // หน่วยงาน
  const departmentOptions = [
    { value: "hr", label: "ฝ่ายทรัพยากรบุคคล" },
    { value: "finance", label: "ฝ่ายการเงิน" },
    { value: "it", label: "ฝ่ายเทคโนโลยีสารสนเทศ" },
    { value: "accounting", label: "ฝ่ายบัญชี" }
  ];

  // แผนก
  const divisionOptions = [
    { value: "recruitment", label: "แผนกสรรหาบุคลากร" },
    { value: "training", label: "แผนกฝึกอบรม" },
    { value: "development", label: "แผนกพัฒนาระบบ" },
    { value: "support", label: "แผนกสนับสนุน" }
  ];

  // ตำแหน่ง
  const positionOptions = [
    { value: "staff", label: "เจ้าหน้าที่" },
    { value: "senior", label: "เจ้าหน้าที่อาวุโส" },
    { value: "specialist", label: "ผู้เชี่ยวชาญ" },
    { value: "manager", label: "ผู้จัดการ" },
    { value: "director", label: "ผู้อำนวยการ" }
  ];

  // ระดับการศึกษา
  const educationLevelOptions = [
    { value: "primary", label: "ประถมศึกษา" },
    { value: "secondary", label: "มัธยมศึกษา" },
    { value: "vocational", label: "ประกาศนียบัตรวิชาชีพ (ปวช.)" },
    { value: "high-vocational", label: "ประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)" },
    { value: "bachelor", label: "ปริญญาตรี" },
    { value: "master", label: "ปริญญาโท" },
    { value: "doctorate", label: "ปริญญาเอก" }
  ];

  // วุฒิการศึกษา
  const degreeOptions = {
    bachelor: [
      { value: "ba", label: "ศิลปศาสตรบัณฑิต (ศศ.บ.)" },
      { value: "bba", label: "บริหารธุรกิจบัณฑิต (บธ.บ.)" },
      { value: "bsc", label: "วิทยาศาสตรบัณฑิต (วท.บ.)" },
      { value: "beng", label: "วิศวกรรมศาสตรบัณฑิต (วศ.บ.)" }
    ],
    master: [
      { value: "ma", label: "ศิลปศาสตรมหาบัณฑิต (ศศ.ม.)" },
      { value: "mba", label: "บริหารธุรกิจมหาบัณฑิต (บธ.ม.)" },
      { value: "msc", label: "วิทยาศาสตรมหาบัณฑิต (วท.ม.)" },
      { value: "meng", label: "วิศวกรรมศาสตรมหาบัณฑิต (วศ.ม.)" }
    ]
  };

  

  // สาขาวิชา
  const majorOptions = [
    { value: "computer-science", label: "วิทยาการคอมพิวเตอร์" },
    { value: "information-technology", label: "เทคโนโลยีสารสนเทศ" },
    { value: "business-computer", label: "คอมพิวเตอร์ธุรกิจ" },
    { value: "management", label: "การจัดการ" },
    { value: "accounting", label: "การบัญชี" },
    { value: "marketing", label: "การตลาด" },
    { value: "finance", label: "การเงิน" }
  ];

  // สถาบันการศึกษา
  const institutionOptions = [
    { value: "cu", label: "จุฬาลงกรณ์มหาวิทยาลัย" },
    { value: "tu", label: "มหาวิทยาลัยธรรมศาสตร์" },
    { value: "ku", label: "มหาวิทยาลัยเกษตรศาสตร์" },
    { value: "kku", label: "มหาวิทยาลัยขอนแก่น" },
    { value: "cmu", label: "มหาวิทยาลัยเชียงใหม่" },
    { value: "psu", label: "มหาวิทยาลัยสงขลานครินทร์" }
  ];
  const [formData, setFormData] = useState({
    idcard: '',
    title_th: '',
    firstname_th: '',
    lastname_th: '',
    title_en: '',
    firstname_en: '',
    lastname_en: '',
    gender: '',
    position: '',
    position_name: '',
    current_salary: '',
    birth_date: '',
    civil_service_entry_date: '',
    current_level_appointment_date: '',
    education_level_1: '',
    degree_1: '',
    major_1: '',
    institution_1: '',
    education_level_2: '',
    degree_2: '',
    major_2: '',
    institution_2: '',
    education_level_3: '',
    degree_3: '',
    major_3: '',
    institution_3: '',
    education_level_4: '',
    degree_4: '',
    major_4: '',
    institution_4: '',
    position_date: '',
    position_detail: '',
    position_number: '',
    position_level: '',
    position_salary: '',
    reference_document: '',
    employee_status: 1,
    division: '',
    department: '',
    address: '',
    subdistrict: '',
    district: '',
    province: '',
    zipcode: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // เพิ่ม state สำหรับแสดง/ซ่อนรหัสผ่าน
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

// เพิ่ม state สำหรับแสดงข้อความ error
const [passwordError, setPasswordError] = useState('');
  // เพิ่ม options สำหรับจังหวัด
    const provinceOptions = [
    { value: "bangkok", label: "กรุงเทพมหานคร" },
    { value: "nonthaburi", label: "นนทบุรี" },
    { value: "pathumthani", label: "ปทุมธานี" },
    { value: "samutprakan", label: "สมุทรปราการ" },
    { value: "ayutthaya", label: "พระนครศรีอยุธยา" },
    // ... เพิ่มจังหวัดอื่นๆ
  ];
  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร';
    }
    if (!/[A-Z]/.test(password)) {
      return 'รหัสผ่านต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว';
    }
    if (!/[a-z]/.test(password)) {
      return 'รหัสผ่านต้องมีตัวพิมพ์เล็กอย่างน้อย 1 ตัว';
    }
    if (!/[0-9]/.test(password)) {
      return 'รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว';
    }
    return '';
  };
  
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData(prev => ({...prev, password: newPassword}));
    setPasswordError(validatePassword(newPassword));
  };
  
  const handleConfirmPasswordChange = (e) => {
    const confirmPass = e.target.value;
    setFormData(prev => ({...prev, confirmPassword: confirmPass}));
    if (confirmPass !== formData.password) {
      setPasswordError('รหัสผ่านไม่ตรงกัน');
    } else {
      setPasswordError('');
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  const renderEducationSection = (level) => (
    <div className="space-y-4 border p-4 rounded-lg">
      <h3 className="text-lg font-semibold">การศึกษาระดับที่ {level}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`education_level_${level}`}>ระดับการศึกษา</Label>
          <Select 
            onValueChange={(value) => 
              setFormData(prev => ({...prev, [`education_level_${level}`]: value}))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="เลือกระดับการศึกษา" />
            </SelectTrigger>
            <SelectContent>
              {educationLevelOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor={`degree_${level}`}>วุฒิการศึกษา</Label>
          <Select 
            onValueChange={(value) => 
              setFormData(prev => ({...prev, [`degree_${level}`]: value}))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="เลือกวุฒิการศึกษา" />
            </SelectTrigger>
            <SelectContent>
              {degreeOptions.bachelor.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor={`major_${level}`}>สาขาวิชา</Label>
          <Select 
            onValueChange={(value) => 
              setFormData(prev => ({...prev, [`major_${level}`]: value}))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="เลือกสาขาวิชา" />
            </SelectTrigger>
            <SelectContent>
              {majorOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor={`institution_${level}`}>สถาบันการศึกษา</Label>
          <Select 
            onValueChange={(value) => 
              setFormData(prev => ({...prev, [`institution_${level}`]: value}))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="เลือกสถาบันการศึกษา" />
            </SelectTrigger>
            <SelectContent>
              {institutionOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          {/* <CardTitle>แบบฟอร์มบันทึกข้อมูลพนักงาน</CardTitle> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ข้อมูลส่วนตัว */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">ข้อมูลส่วนตัว</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="idcard">เลขบัตรประชาชน</Label>
                  <Input
                    id="idcard"
                    name="idcard"
                    value={formData.idcard}
                    onChange={handleInputChange}
                    maxLength={13}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">เพศ</Label>
                  <Select 
                    onValueChange={(value) => 
                      setFormData(prev => ({...prev, gender: value}))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกเพศ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">ชาย</SelectItem>
                      <SelectItem value="female">หญิง</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* ชื่อภาษาไทย */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title_th">คำนำหน้า (ไทย)</Label>
                  <Select
                    onValueChange={(value) => 
                      setFormData(prev => ({...prev, title_th: value}))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกคำนำหน้า" />
                    </SelectTrigger>
                    <SelectContent>
                      {titleThOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstname_th">ชื่อ (ไทย)</Label>
                  <Input
                    id="firstname_th"
                    name="firstname_th"
                    value={formData.firstname_th}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname_th">นามสกุล (ไทย)</Label>
                  <Input
                    id="lastname_th"
                    name="lastname_th"
                    value={formData.lastname_th}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* ชื่อภาษาอังกฤษ */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title_en">Title (English)</Label>
                  <Select
                    onValueChange={(value) => 
                      setFormData(prev => ({...prev, title_en: value}))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>
                    <SelectContent>
                      {titleEnOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstname_en">First Name (English)</Label>
                  <Input
                    id="firstname_en"
                    name="firstname_en"
                    value={formData.firstname_en}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname_en">Last Name (English)</Label>
                  <Input
                    id="lastname_en"
                    name="lastname_en"
                    value={formData.lastname_en}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
{/* ข้อมูลที่อยู่และการติดต่อ */}
<div className="space-y-4">
  <h3 className="text-lg font-semibold">ข้อมูลที่อยู่และการติดต่อ</h3>
  
  {/* ที่อยู่ */}
  <div className="space-y-2">
    <Label htmlFor="address">ที่อยู่</Label>
    <Input
      id="address"
      name="address"
      value={formData.address}
      onChange={handleInputChange}
      placeholder="เลขที่ หมู่ ถนน ซอย"
    />
  </div>

            {/* ตำบล อำเภอ จังหวัด รหัสไปรษณีย์ */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                <Label htmlFor="subdistrict">ตำบล/แขวง</Label>
                <Input
                    id="subdistrict"
                    name="subdistrict"
                    value={formData.subdistrict}
                    onChange={handleInputChange}
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="district">อำเภอ/เขต</Label>
                <Input
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="province">จังหวัด</Label>
                <Select
                    onValueChange={(value) => 
                    setFormData(prev => ({...prev, province: value}))
                    }
                >
                    <SelectTrigger>
                    <SelectValue placeholder="เลือกจังหวัด" />
                    </SelectTrigger>
                    <SelectContent>
                    {provinceOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                        {option.label}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                </div>
                <div className="space-y-2">
                <Label htmlFor="zipcode">รหัสไปรษณีย์</Label>
                <Input
                    id="zipcode"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleInputChange}
                    maxLength={5}
                />
                </div>
            </div>

            {/* อีเมล */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="email">อีเมล</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                />
                </div>
            </div>
            </div>
            {/* ตั้งรหัสผ่าน */}
<div className="space-y-4">
  <h3 className="text-lg font-semibold">ตั้งรหัสผ่าน</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-2">
      <Label htmlFor="password">รหัสผ่าน</Label>
      <div className="relative">
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handlePasswordChange}
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeWidth="2" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeWidth="2" d="M2 2l20 20M6.5 6.5C4 8.5 2 12 2 12s4 8 11 8c1.9 0 3.6-.5 5.1-1.1M19.5 15C21 13.5 22 12 22 12s-4-8-11-8c-1.9 0-3.6.5-5.1 1.1"/>
              <path fill="none" stroke="currentColor" strokeWidth="2" d="M9 9a3 3 0 0 1 3-3M12 15a3 3 0 0 0 3-3"/>
            </svg>
          )}
        </button>
      </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</Label>
      <div className="relative">
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          {showConfirmPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeWidth="2" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeWidth="2" d="M2 2l20 20M6.5 6.5C4 8.5 2 12 2 12s4 8 11 8c1.9 0 3.6-.5 5.1-1.1M19.5 15C21 13.5 22 12 22 12s-4-8-11-8c-1.9 0-3.6.5-5.1 1.1"/>
              <path fill="none" stroke="currentColor" strokeWidth="2" d="M9 9a3 3 0 0 1 3-3M12 15a3 3 0 0 0 3-3"/>
            </svg>
          )}
        </button>
      </div>
    </div>
    {passwordError && (
      <div className="col-span-2">
        <p className="text-sm text-red-500">{passwordError}</p>
      </div>
    )}
    <div className="col-span-2">
      <p className="text-sm text-gray-500">
        รหัสผ่านต้องประกอบด้วย:
        <ul className="list-disc list-inside">
          <li>ความยาวอย่างน้อย 8 ตัวอักษร</li>
          <li>ตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว</li>
          <li>ตัวพิมพ์เล็กอย่างน้อย 1 ตัว</li>
          <li>ตัวเลขอย่างน้อย 1 ตัว</li>
        </ul>
      </p>
    </div>
  </div>
</div>
            {/* ข้อมูลการทำงาน */}
            {/* <div className="space-y-4">
              <h3 className="text-lg font-semibold">ข้อมูลการทำงาน</h3>
               */}
              {/* หน่วยงานและแผนก */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">หน่วยงาน</Label>
                  <Select 
                    onValueChange={(value) => 
                      setFormData(prev => ({...prev, department: value}))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกหน่วยงาน" />
                    </SelectTrigger>
                    <SelectContent>
                      {departmentOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="division">แผนก</Label>
                  <Select 
                    onValueChange={(value) => 
                      setFormData(prev => ({...prev, division: value}))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกแผนก" />
                    </SelectTrigger>
                    <SelectContent>
                      {divisionOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div> */}

              {/* ข้อมูลตำแหน่ง */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">ตำแหน่ง</Label>
                  <Select 
                    onValueChange={(value) => 
                      setFormData(prev => ({...prev, position: value}))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกตำแหน่ง" />
                    </SelectTrigger>
                    <SelectContent>
                      {positionOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position_name">ชื่อตำแหน่ง</Label>
                  <Input
                    id="position_name"
                    name="position_name"
                    value={formData.position_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position_level">ระดับตำแหน่ง</Label>
                  <Input
                    id="position_level"
                    name="position_level"
                    value={formData.position_level}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position_number">เลขที่ตำแหน่ง</Label>
                  <Input
                    id="position_number"
                    name="position_number"
                    value={formData.position_number}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current_salary">เงินเดือนปัจจุบัน</Label>
                  <Input
                    id="current_salary"
                    name="current_salary"
                    type="number"
                    value={formData.current_salary}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position_salary">เงินประจำตำแหน่ง</Label>
                  <Input
                    id="position_salary"
                    name="position_salary"
                    type="number"
                    value={formData.position_salary}
                    onChange={handleInputChange}
                  />
                </div>
              </div> */}

              {/* ข้อมูลวันที่ */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birth_date">วันเกิด</Label>
                  <Input
                    id="birth_date"
                    name="birth_date"
                    type="date"
                    value={formData.birth_date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="civil_service_entry_date">วันที่เข้ารับราชการ</Label>
                  <Input
                    id="civil_service_entry_date"
                    name="civil_service_entry_date"
                    type="date"
                    value={formData.civil_service_entry_date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current_level_appointment_date">วันที่แต่งตั้งระดับปัจจุบัน</Label>
                  <Input
                    id="current_level_appointment_date"
                    name="current_level_appointment_date"
                    type="date"
                    value={formData.current_level_appointment_date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position_date">วันที่ดำรงตำแหน่ง</Label>
                  <Input
                    id="position_date"
                    name="position_date"
                    type="date"
                    value={formData.position_date}
                    onChange={handleInputChange}
                  />
                </div>
              </div> */}
            {/* </div> */}

            {/* ประวัติการศึกษา */}
            {/* <div className="space-y-4">
              <h3 className="text-lg font-semibold">ประวัติการศึกษา</h3>
              {[1, 2, 3, 4].map(level => renderEducationSection(level))}
            </div> */}

            {/* เอกสารอ้างอิงและรายละเอียดเพิ่มเติม */}
            {/* <div className="space-y-4">
              <h3 className="text-lg font-semibold">ข้อมูลเพิ่มเติม</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position_detail">รายละเอียดตำแหน่ง</Label>
                  <Input
                    id="position_detail"
                    name="position_detail"
                    value={formData.position_detail}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reference_document">เอกสารอ้างอิง</Label>
                  <Input
                    id="reference_document"
                    name="reference_document"
                    value={formData.reference_document}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div> */}

            <div className="flex justify-center space-x-4">
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

export default EmployeeForm;