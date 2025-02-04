import React, { useState } from 'react';

// Add CSS for font-family
const styles = {
  fontFamily: 'CS ChatThai',
};

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    gender: '',
    title: '',
    thaiFirstName: '',
    thaiLastName: '',
    firstName: '',
    lastName: '',
    phone: '',
    mobile: '',
    macAddress: '',
    ipAddress: '',
    project_name: '',
    department_name: '',
    email: '',
    startDate: '',
    endDate: '',
    workLocation: '',
    treasuryRegions: '',
    provincialTreasury: '',
    division: '',
    department: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  // Helper component for required field label
  const RequiredLabel = ({ children }) => (
    <label className="block mb-1">
      {children}
      <span className="text-red-500 ml-1">*</span>
    </label>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">ข้อมูลผู้ขอลงทะเบียน</h2>
          
          {/* Registration Type */}
          <div className="mb-4">
            <p className="mb-2">
              ประเภท การขอใช้งาน
              <span className="text-red-500 ml-1">*</span>
            </p>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="registrationType"
                  value="newUser"
                  className="mr-2"
                  required
                />
                ผู้ใช้งานใหม่
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="registrationType"
                  value="renewLicense"
                  className="mr-2"
                />
                ต่ออายุสิทธิ์
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="registrationType"
                  value="updateInfo"
                  className="mr-2"
                />
                เปลี่ยนแปลงข้อมูลผู้ขอลงทะเบียน
              </label>
            </div>
          </div>
          
            {/* Gender Selection */}
            <div className="mb-4">
              <p className="mb-2">
                เพศ
                <span className="text-red-500 ml-1">*</span>
              </p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="M"
                    onChange={handleChange}
                    className="mr-2"
                    required
                  />
                  ชาย
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="F"
                    onChange={handleChange}
                    className="mr-2"
                  />
                  หญิง
                </label>
              </div>
            </div>
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <RequiredLabel>คำนำหน้านาม</RequiredLabel>
              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              >
                <option value="">เลือกคำนำหน้านาม</option>
                <option value="นาย">นาย</option>
                <option value="นาง">นาง</option>
                <option value="นางสาว">นางสาว</option>
                <option value="ดร.">ดร.</option>
              </select>
            </div>
            <div>
              <RequiredLabel>ชื่อ</RequiredLabel>
              <input
                type="text"
                name="thaiFirstName"
                value={formData.thaiFirstName}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <RequiredLabel>นามสกุล</RequiredLabel>
              <input
                type="text"
                name="thaiLastName"
                value={formData.thaiLastName}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
          </div>

          {/* ID Card and Name Fields */}
          <div className="space-y-4 mt-4">
            <div>
              <RequiredLabel>เลขประจำตัวบัตรประชาชน</RequiredLabel>
              <input
                type="text"
                name="idCard"
                className="w-full border rounded p-2"
                required
                maxLength="13"
              />
            </div>
            <div>
              <RequiredLabel>First Name (ภาษาอังกฤษ)</RequiredLabel>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <RequiredLabel>Last Name (ภาษาอังกฤษ)</RequiredLabel>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 mt-4">
            <div>
              <label className="block mb-1">เบอร์โทรศัพท์</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1">เบอร์โทรศัพท์มือถือ</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          {/* Technical Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block mb-1">MAC Address (Notebook)</label>
              <input
                type="text"
                name="macAddress"
                value={formData.macAddress}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1">IP Address</label>
              <input
                type="text"
                name="ipAddress"
                value={formData.ipAddress}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          {/* Project and Department */}
          <div className="space-y-4 mt-4">
            <div>
              <label className="block mb-1">โครงการ/ระบบงาน</label>
              <input
                type="text"
                name="project"
                value={formData.project_name}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1">หน่วยงาน</label>
              <input
                type="text"
                name="department"
                value={formData.department_name}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <RequiredLabel>E-mail</RequiredLabel>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
          </div>

          {/* Dates and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <RequiredLabel>วันที่เริ่มปฏิบัติงาน</RequiredLabel>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1">วันที่สิ้นสุด</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
          </div>

       
        {/* Work Location */}
        <div className="mt-4">
            <p className="mb-2">
              สถานที่ปฏิบัติงาน
              <span className="text-red-500 ml-1">*</span>
            </p>
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="workLocation"
                  value="central"
                  className="mr-2"
                  required
                />
                ส่วนกลาง
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="workLocation"
                  value="treasuryRegions"
                  className="mr-2"
                />
                คลังเขต
              </label>
              <div className="flex items-center gap-4">
                <select
                  name="treasuryRegions"
                  value={formData.treasuryRegions}
                  onChange={handleChange}
                  className="border rounded p-1 w-32 mr-4"
                >
                  <option value="">เลือกคลังเขต</option>
                  <option value="1">คลังเขต 1</option>
                  <option value="2">คลังเขต 2</option>
                  <option value="3">คลังเขต 3</option>
                  <option value="4">คลังเขต 4</option>
                  <option value="5">คลังเขต 5</option>
                </select>
                <span className="mr-2">คลังจังหวัด</span>
                <select
                  name="provincialTreasury"
                  value={formData.provincialTreasury}
                  onChange={handleChange}
                  className="border rounded p-1 w-32"
                >
                  <option value="">เลือกจังหวัด</option>
                  <option value="กรุงเทพฯ">กรุงเทพฯ</option>
                  <option value="เชียงใหม่">เชียงใหม่</option>
                  <option value="นครราชสีมา">นครราชสีมา</option>
                  <option value="ขอนแก่น">ขอนแก่น</option>
                  <option value="ชลบุรี">ชลบุรี</option>
                  <option value="สงขลา">สงขลา</option>
                </select>
              </div>
            </div>
          </div>

          {/* Division and department */}
          <div className="space-y-4 mt-4">
            <div>
              <label className="block mb-1">กอง/ศูนย์/สถาบัน/สำนักงานเลขานุการกรม</label>
              <select
                name="division"
                value={formData.division}
                onChange={handleChange}
                className="w-full border rounded p-2"
              >
                <option value="">เลือกกอง/ศูนย์/สถาบัน</option>
                <option value="กองบริหารการคลัง">กองบริหารการคลัง</option>
                <option value="ศูนย์เทคโนโลยีสารสนเทศ">ศูนย์เทคโนโลยีสารสนเทศ</option>
                <option value="สถาบันพัฒนาบุคลากร">สถาบันพัฒนาบุคลากร</option>
                <option value="สำนักงานเลขานุการกรม">สำนักงานเลขานุการกรม</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">กลุ่ม/ฝ่าย/กลุ่มงาน</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border rounded p-2"
              >
                <option value="">เลือกกลุ่ม/ฝ่าย</option>
                <option value="กลุ่มการเงิน">กลุ่มการเงิน</option>
                <option value="กลุ่มบัญชี">กลุ่มบัญชี</option>
                <option value="ฝ่ายบริหารทั่วไป">ฝ่ายบริหารทั่วไป</option>
                <option value="กลุ่มงานพัฒนาระบบ">กลุ่มงานพัฒนาระบบ</option>
              </select>
            </div>
          </div>
        </div>
     

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            บันทึก
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegistrationForm;