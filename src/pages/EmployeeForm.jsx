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
import { default as React, useEffect, useRef, useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";


const EmployeeForm = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  const inputRefs = useRef({});
  // คำนำหน้าภาษาไทย
  const [openSections, setOpenSections] = useState({
    personal: true,
    contact: false,
    password: false,
    work: false,
    education: false,
    additional: false,
    computer: false
  });
  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
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
    hasComputer: '',
    computerAssetNumber: '',
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
    setFocusedInput(name);
  };

  // เพิ่ม useEffect เพื่อ restore focus
  useEffect(() => {
    if (focusedInput && inputRefs.current[focusedInput]) {
      inputRefs.current[focusedInput].focus();
      // เก็บตำแหน่ง cursor
      const length = inputRefs.current[focusedInput].value.length;
      inputRefs.current[focusedInput].setSelectionRange(length, length);
    }
  }, [focusedInput, formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };
// Custom Collapsible Section Component
const CollapsibleSection = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="w-full mb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <svg
          className={`w-6 h-6 transition-transform duration-1000 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`transition-all duration-1000 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 border border-t-0 rounded-b-lg">
          {children}
        </div>
      </div>
    </div>
  );
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
            {/* <div className="space-y-4"> */}
            <CollapsibleSection
              title="ข้อมูลส่วนตัว"
              isOpen={openSections.personal}
              onToggle={() => toggleSection('personal')}
            >
              {/* Your existing personal information form fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="idcard">เลขบัตรประชาชน</Label>
                    <Input
                      id="idcard"
                      name="idcard"
                      value={formData.idcard}
                      onChange={handleInputChange}
                      maxLength={13}
                      ref={el => inputRefs.current['idcard'] = el}
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
                      ref={el => inputRefs.current['firstname_th'] = el}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname_th">นามสกุล (ไทย)</Label>
                    <Input
                      id="lastname_th"
                      name="lastname_th"
                      value={formData.lastname_th}
                      onChange={handleInputChange}
                      ref={el => inputRefs.current['lastname_th'] = el}
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
                      ref={el => inputRefs.current['firstname_en'] = el}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname_en">Last Name (English)</Label>
                    <Input
                      id="lastname_en"
                      name="lastname_en"
                      value={formData.lastname_en}
                      onChange={handleInputChange}
                      ref={el => inputRefs.current['lastname_en'] = el}
                    />
                  </div>
                </div>
               
            </CollapsibleSection>
             
            {/* </div> */}

            
            {/* ข้อมูลที่อยู่และการติดต่อ */}
            <CollapsibleSection
                title="ข้อมูลที่อยู่และการติดต่อ"
                isOpen={openSections.contact}
                onToggle={() => toggleSection('contact')}
              >
                
                
                  {/* ที่อยู่ */}
                  <div className="space-y-2">
                    <Label htmlFor="address">ที่อยู่</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="เลขที่ หมู่ ถนน ซอย"
                      ref={el => inputRefs.current['address'] = el}
                    />
                  </div>

        {/* ตำบล อำเภอ จังหวัด รหัสไปรษณีย์ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <Label htmlFor="district">อำเภอ/เขต</Label>
            <Select
              onValueChange={(value) => 
                setFormData(prev => ({...prev, district: value}))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกอำเภอ/เขต" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="district1">อำเภอ 1</SelectItem>
                <SelectItem value="district2">อำเภอ 2</SelectItem>
                <SelectItem value="district3">อำเภอ 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subdistrict">ตำบล/แขวง</Label>
            <Select
              onValueChange={(value) => 
                setFormData(prev => ({...prev, subdistrict: value}))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกตำบล/แขวง" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="subdistrict1">ตำบล 1</SelectItem>
                <SelectItem value="subdistrict2">ตำบล 2</SelectItem>
                <SelectItem value="subdistrict3">ตำบล 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipcode">รหัสไปรษณีย์</Label>
            <Select
              onValueChange={(value) => 
                setFormData(prev => ({...prev, zipcode: value}))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกรหัสไปรษณีย์" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10100">10100</SelectItem>
                <SelectItem value="10200">10200</SelectItem>
                <SelectItem value="10300">10300</SelectItem>
              </SelectContent>
            </Select>
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
            
            </CollapsibleSection>
            <CollapsibleSection
              title="เครื่องคอมพิวเตอร์"
              isOpen={openSections.computer}
              onToggle={() => toggleSection('computer')}>
              <div className="space-y-4">
                  {/* <Label>เครื่องคอมพิวเตอร์</Label> */}
                  <div className="flex gap-6">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="hasComputer-yes"
                        name="hasComputer"
                        value="yes"
                        checked={formData.hasComputer === 'yes'}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          hasComputer: e.target.value
                        }))}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="hasComputer-yes">มีเครื่องคอมพิวเตอร์</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="hasComputer-no"
                        name="hasComputer"
                        value="no"
                        checked={formData.hasComputer === 'no'}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          hasComputer: e.target.value,
                          computerAssetNumber: ''
                        }))}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="hasComputer-no">ไม่มีเครื่องคอมพิวเตอร์</Label>
                    </div>
                  </div>

                  {formData.hasComputer === 'yes' && (
                    <div className="space-y-2">
                      <Label htmlFor="computerAssetNumber">หมายเลขครุภัณฑ์</Label>
                      <Input
                        id="computerAssetNumber"
                        name="computerAssetNumber"
                        value={formData.computerAssetNumber}
                        onChange={handleInputChange}
                        placeholder="กรุณากรอกหมายเลขครุภัณฑ์"
                      />
                    </div>
                  )}
                </div>
            </CollapsibleSection>
 {/* ตั้งรหัสผ่าน */}
 <CollapsibleSection
              title="ตั้งรหัสผ่าน"
              isOpen={openSections.password}
              onToggle={() => toggleSection('password')}
            >
             
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
                      ref={el => inputRefs.current['password'] = el}
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
                      ref={el => inputRefs.current['confirmPassword'] = el}
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
             
            </CollapsibleSection>

            {/* ข้อมูลการทำงาน */}
            
          
            {/* <CollapsibleSection
              title="ข้อมูลการทำงาน"
              isOpen={openSections.work}
              onToggle={() => toggleSection('work')}
            >
           
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

             
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      ref={el => inputRefs.current['position_name'] = el}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position_level">ระดับตำแหน่ง</Label>
                    <Input
                      id="position_level"
                      name="position_level"
                      value={formData.position_level}
                      onChange={handleInputChange}
                      ref={el => inputRefs.current['position_level'] = el}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position_number">เลขที่ตำแหน่ง</Label>
                    <Input
                      id="position_number"
                      name="position_number"
                      value={formData.position_number}
                      onChange={handleInputChange}
                      ref={el => inputRefs.current['position_number'] = el}
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
                      ref={el => inputRefs.current['current_salary'] = el}
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
                      ref={el => inputRefs.current['position_salary'] = el}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birth_date">วันเกิด</Label>
                    <Input
                      id="birth_date"
                      name="birth_date"
                      type="date"
                      value={formData.birth_date}
                      onChange={handleInputChange}
                      ref={el => inputRefs.current['birth_date'] = el}
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
                      ref={el => inputRefs.current['civil_service_entry_date'] = el}
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
                      ref={el => inputRefs.current['current_level_appointment_date'] = el}
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
                      ref={el => inputRefs.current['position_date'] = el}
                    />
                  </div>
                </div>
            </CollapsibleSection>
       */}
            {/* ประวัติการศึกษา */}
            {/* <CollapsibleSection
              title="ประวัติการศึกษา"
              isOpen={openSections.education}
              onToggle={() => toggleSection('education')}
            >
               {[1, 2, 3, 4].map(level => renderEducationSection(level))}
            </CollapsibleSection> */}

             {/* เอกสารอ้างอิงและรายละเอียดเพิ่มเติม  */}
             {/* <CollapsibleSection
              title="ข้อมูลเพิ่มเติม"
              isOpen={openSections.additional}
              onToggle={() => toggleSection('additional')}
            >
               <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position_detail">รายละเอียดตำแหน่ง</Label>
                  <Input
                    id="position_detail"
                    name="position_detail"
                    value={formData.position_detail}
                    onChange={handleInputChange}
                    ref={el => inputRefs.current['position_detail'] = el}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reference_document">เอกสารอ้างอิง</Label>
                  <Input
                    id="reference_document"
                    name="reference_document"
                    value={formData.reference_document}
                    onChange={handleInputChange}
                    ref={el => inputRefs.current['reference_document'] = el}
                  />
                </div>
              </div>
             </CollapsibleSection> */}
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