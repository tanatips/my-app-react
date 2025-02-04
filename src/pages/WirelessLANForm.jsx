import React, { useState } from 'react';

const WirelessLANForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    gender: '',
    firstName: '',
    lastName: '',
    firstNameEn: '',
    lastNameEn: '',
    mobilePhone: '',
    department: '',
    division: '',
    internalPhone: '',
    requestType: '',
    deviceType: '',
    deviceCode: '',
    macAddress: ''
  });

  // ตัวเลือกคำนำหน้าชื่อ
  // ตัวเลือกหน่วยงาน
  const departmentOptions = [
    { value: '', label: 'เลือกหน่วยงาน' },
    { value: 'กองการเงินการคลังภาครัฐ', label: 'กองการเงินการคลังภาครัฐ' },
    { value: 'กองกฎหมาย', label: 'กองกฎหมาย' },
    { value: 'กองการพัสดุภาครัฐ', label: 'กองการพัสดุภาครัฐ' },
    { value: 'ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร', label: 'ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร' },
    { value: 'สำนักงานคลังจังหวัด', label: 'สำนักงานคลังจังหวัด' },
  ];

  // ตัวเลือกกลุ่มงาน/ฝ่าย
  const divisionOptions = [
    { value: '', label: 'เลือกกลุ่มงาน/ฝ่าย' },
    { value: 'กลุ่มพัฒนาระบบงาน', label: 'กลุ่มพัฒนาระบบงาน' },
    { value: 'กลุ่มบริหารจัดการระบบเครือข่าย', label: 'กลุ่มบริหารจัดการระบบเครือข่าย' },
    { value: 'กลุ่มบริหารจัดการฐานข้อมูล', label: 'กลุ่มบริหารจัดการฐานข้อมูล' },
    { value: 'ฝ่ายบริหารทั่วไป', label: 'ฝ่ายบริหารทั่วไป' },
  ];

  // ตัวเลือกคำนำหน้าชื่อ
  const titleOptions = [
    { value: '', label: 'เลือกคำนำหน้า' },
    { value: 'นาย', label: 'นาย' },
    { value: 'นาง', label: 'นาง' },
    { value: 'นางสาว', label: 'นางสาว' },
    { value: 'ดร.', label: 'ดร.' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-xl font-bold mb-6">แบบฟอร์มขอใช้บริการ Wireless LAN ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร กรมบัญชีกลาง</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">สำหรับผู้ขอใช้บริการ (โปรดกรอกข้อมูลให้ครบถ้วน ตัวบรรจง และภาษาอังกฤษตัวพิมพ์ใหญ่)</h2>
            
            {/* ส่วนของเพศ */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">เพศ</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  ชาย
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  หญิง
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">คำนำหน้า</label>
                  <select
                    name="title"
                    className="border rounded p-2 w-32"
                    value={formData.title}
                    onChange={handleInputChange}
                  >
                    {titleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="ชื่อ"
                    className="border rounded p-2 w-full"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">นามสกุล</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="นามสกุล"
                    className="border rounded p-2 w-full"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรภายใน</label>
                <input
                  type="text"
                  name="internalPhone"
                  placeholder="เบอร์โทรภายใน"
                  className="border rounded p-2 w-full"
                  value={formData.internalPhone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* ส่วนที่เหลือของฟอร์มยังคงเหมือนเดิม */}
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name (ภาษาอังกฤษ)</label>
                <input
                  type="text"
                  name="firstNameEn"
                  placeholder="First Name"
                  className="border rounded p-2 w-full"
                  value={formData.firstNameEn}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name (ภาษาอังกฤษ)</label>
                <input
                  type="text"
                  name="lastNameEn"
                  placeholder="Last Name"
                  className="border rounded p-2 w-full"
                  value={formData.lastNameEn}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์มือถือ</label>
                <input
                  type="text"
                  name="mobilePhone"
                  placeholder="เบอร์โทรศัพท์มือถือ"
                  className="border rounded p-2 w-full"
                  value={formData.mobilePhone}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">หน่วยงาน</label>
                <select
                  name="department"
                  className="border rounded p-2 w-full"
                  value={formData.department}
                  onChange={handleInputChange}
                >
                  {departmentOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">กลุ่มงาน/ฝ่าย</label>
                <select
                  name="division"
                  className="border rounded p-2 w-full"
                  value={formData.division}
                  onChange={handleInputChange}
                >
                  {divisionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-4">
                <p className="font-semibold mb-2">ประเภทการขอใช้งาน</p>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="requestType"
                      value="new"
                      checked={formData.requestType === 'new'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    เพิ่มอุปกรณ์ใหม่
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="requestType"
                      value="replace"
                      checked={formData.requestType === 'replace'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    ทดแทนเครื่องเดิม
                  </label>
                </div>
              </div>

              <div className="border rounded p-4">
                <p className="font-semibold mb-4">อุปกรณ์</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="deviceType"
                        value="notebook"
                        checked={formData.deviceType === 'notebook'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Notebook
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">ยี่ห้อ/รุ่น</label>
                        <input
                          type="text"
                          name="deviceCode"
                          placeholder="ยี่ห้อ/รุ่น"
                          className="border rounded p-2 w-full"
                          value={formData.deviceCode}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">MAC Address</label>
                        <input
                          type="text"
                          name="macAddress"
                          placeholder="MAC Address"
                          className="border rounded p-2 w-full"
                          value={formData.macAddress}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="deviceType"
                        value="smartphone"
                        checked={formData.deviceType === 'smartphone'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Smart Phone/Tablet
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">ยี่ห้อ/รุ่น</label>
                        <input
                          type="text"
                          name="deviceCode"
                          placeholder="ยี่ห้อ/รุ่น"
                          className="border rounded p-2 w-full"
                          value={formData.deviceCode}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">MAC Address</label>
                        <input
                          type="text"
                          name="macAddress"
                          placeholder="MAC Address"
                          className="border rounded p-2 w-full"
                          value={formData.macAddress}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              บันทึกข้อมูล
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WirelessLANForm;