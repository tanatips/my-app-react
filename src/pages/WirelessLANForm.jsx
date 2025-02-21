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

  // Required field indicator component
  const RequiredField = () => (
    <span className="text-red-500 ml-1">*</span>
  );

  // ตัวเลือกคำนำหน้าชื่อ
  const titleOptions = [
    { value: '', label: 'เลือกคำนำหน้า' },
    { value: 'นาย', label: 'นาย' },
    { value: 'นาง', label: 'นาง' },
    { value: 'นางสาว', label: 'นางสาว' },
    { value: 'ดร.', label: 'ดร.' },
  ];

  // สำนัก/กอง/ศูนย์/สถาบัน/กลุ่ม
  const divisionOptions = [
  { value: '', label: 'สำนัก/กอง/ศูนย์/สถาบัน/กลุ่ม' },
  { value: 'กองการเงินการคลังภาครัฐ', label: 'กองการเงินการคลังภาครัฐ' },
  { value: 'กองกฎหมาย', label: 'กองกฎหมาย' },
  { value: 'กองคลัง', label: 'กองคลัง' },
  { value: 'กองตรวจสอบภาครัฐ', label: 'กองตรวจสอบภาครัฐ' },
  { value: 'กองบริหารการเบิกจ่ายเงินเดือน', label: 'กองบริหารการเบิกจ่ายเงินเดือน ค่าจ้าง บำเหน็จบำนาญ' },
  { value: 'กองบริหารการพัสดุภาครัฐ', label: 'กองบริหารการพัสดุภาครัฐ' },
  { value: 'กองบริหารการรับ-จ่ายเงินภาครัฐ', label: 'กองบริหารการรับ-จ่ายเงินภาครัฐ' },
  { value: 'กองบริหารทรัพยากรบุคคล', label: 'กองบริหารทรัพยากรบุคคล' },
  { value: 'กองแผนงาน', label: 'กองแผนงาน' },
  { value: 'กองระบบการคลังภาครัฐ', label: 'กองระบบการคลังภาครัฐ' },
  { value: 'ศูนย์เทคโนโลยีสารสนเทศ', label: 'ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร' },
  { value: 'สถาบันพัฒนาบุคลากร', label: 'สถาบันพัฒนาบุคลากรด้านการคลังและบัญชีภาครัฐ' },
  { value: 'สำนักงานเลขานุการกรม', label: 'สำนักงานเลขานุการกรม' },
  { value: 'สำนักกำกับและพัฒนาการตรวจสอบ', label: 'สำนักกำกับและพัฒนาการตรวจสอบภาครัฐ' },
  { value: 'สำนักงานกองทุนบำเหน็จบำนาญ', label: 'สำนักงานกองทุนบำเหน็จบำนาญข้าราชการ' },
  { value: 'สำนักมาตรฐานด้านการบัญชีภาครัฐ', label: 'สำนักมาตรฐานด้านการบัญชีภาครัฐ' },
  { value: 'กลุ่มตรวจสอบภายใน', label: 'กลุ่มตรวจสอบภายใน' },
  { value: 'กลุ่มพัฒนาระบบบริหาร', label: 'กลุ่มพัฒนาระบบบริหาร' },
  ];

  // ตัวเลือก กลุ่มงาน/ฝ่าย
  const departmentOptions = [
    { value: '', label: 'กลุ่มงาน/ฝ่าย' },
    { value: 'กลุ่มพัฒนาระบบงาน', label: 'กลุ่มพัฒนาระบบงาน' },
    { value: 'กลุ่มบริหารจัดการระบบเครือข่าย', label: 'กลุ่มบริหารจัดการระบบเครือข่าย' },
    { value: 'กลุ่มบริหารจัดการฐานข้อมูล', label: 'กลุ่มบริหารจัดการฐานข้อมูล' },
    { value: 'ฝ่ายบริหารทั่วไป', label: 'ฝ่ายบริหารทั่วไป' },
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
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
  const handleCancel = () => {
    // Reset form data
    setFormData({
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
  };
  return (
    <div>
      <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white shadow-md rounded  mb-4">
        <h1 className="text-xl font-bold bg-blue-900 text-white p-4 rounded-t-lg">แบบฟอร์มขอใช้บริการ Wireless LAN ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร กรมบัญชีกลาง</h1>
         <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">สำหรับผู้ขอใช้บริการ (โปรดกรอกข้อมูลให้ครบถ้วน และภาษาอังกฤษตัวพิมพ์ใหญ่)</h2>
              
              {/* ส่วนของเพศ */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">เพศ<RequiredField /></label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">คำนำหน้า<RequiredField /></label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ<RequiredField /></label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">นามสกุล<RequiredField /></label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรภายใน<RequiredField /></label>
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

              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name (ภาษาอังกฤษ)<RequiredField /></label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name (ภาษาอังกฤษ)<RequiredField /></label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์มือถือ<RequiredField /></label>
                  <input
                    type="text"
                    name="mobilePhone"
                    placeholder="เบอร์โทรศัพท์มือถือ"
                    className="border rounded p-2 w-full"
                    value={formData.mobilePhone}
                    onChange={handleInputChange}
                  />
                </div>
          {/* <div className="mt-4">
            <p className="mb-2">
            หน่วยงานส่วนกลาง/ภูมิภาค
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
          </div> */}
<div className="mt-4">
  <p className="mb-2">
    หน่วยงานส่วนกลาง/ภูมิภาค
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
    <label className="flex items-center">
      <input
        type="radio"
        name="workLocation"
        value="provincialTreasury"
        className="mr-2"
      />
      คลังจังหวัด
    </label>
  </div>
</div>

                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">สำนัก/กอง/ศูนย์/สถาบัน/กลุ่ม<RequiredField /></label>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">กลุ่มงาน/ฝ่าย<RequiredField /></label>
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
              </div>

              <div className="mt-6">
                <div className="mb-4">
                  <p className="font-semibold mb-2">ประเภทการขอใช้งาน<RequiredField /></p>
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
                  <p className="font-semibold mb-4">อุปกรณ์<RequiredField /></p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
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
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">ยี่ห้อ/รุ่น<RequiredField /></label>
                          <input
                            type="text"
                            name="deviceCode"
                            placeholder="ยี่ห้อ/รุ่น"
                            className="border rounded p-2 w-full"
                            value={formData.deviceCode}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">MAC Address<RequiredField /></label>
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
                  </div>
  </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="bg-[#0D2B52] text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                บันทึก
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WirelessLANForm;