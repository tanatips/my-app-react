import { React, useState } from 'react';

const PersonalInfo = ({ formData, handleChange }) => {
  // Mock data for dropdowns
  const [prefixes] = useState([
    { id: '1', name: 'นาย' },
    { id: '2', name: 'นาง' },
    { id: '3', name: 'นางสาว' },
    { id: '4', name: 'ดร.' },
    { id: '5', name: 'ศ.ดร.' },
    { id: '6', name: 'รศ.ดร.' },
    { id: '7', name: 'ผศ.ดร.' },
    { id: '8', name: 'ศ.' },
    { id: '9', name: 'รศ.' },
    { id: '10', name: 'ผศ.' }
  ]);
  const [provinces, setProvinces] = useState([
    { id: '1', name: 'กรุงเทพมหานคร' },
    { id: '2', name: 'นนทบุรี' },
    { id: '3', name: 'ปทุมธานี' }
  ]);

  const [districts, setDistricts] = useState({
    '1': [
      { id: '1', name: 'พญาไท' },
      { id: '2', name: 'ดินแดง' },
      { id: '3', name: 'ราชเทวี' }
    ],
    '2': [
      { id: '4', name: 'เมืองนนทบุรี' },
      { id: '5', name: 'บางใหญ่' },
      { id: '6', name: 'ปากเกร็ด' }
    ],
    '3': [
      { id: '7', name: 'เมืองปทุมธานี' },
      { id: '8', name: 'คลองหลวง' },
      { id: '9', name: 'ธัญบุรี' }
    ]
  });

  const [subDistricts, setSubDistricts] = useState({
    '1': [
      { id: '1', name: 'สามเสนใน' },
      { id: '2', name: 'พญาไท' }
    ],
    '2': [
      { id: '3', name: 'ดินแดง' },
      { id: '4', name: 'รัชดาภิเษก' }
    ],
    '4': [
      { id: '5', name: 'บางกระสอ' },
      { id: '6', name: 'ท่าทราย' }
    ],
    '7': [
      { id: '7', name: 'บางปรอก' },
      { id: '8', name: 'บ้านใหม่' }
    ]
  });

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSubDistrict, setSelectedSubDistrict] = useState('');

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    setSelectedDistrict('');
    setSelectedSubDistrict('');
    handleChange({
      target: {
        name: 'province',
        value: provinceId ? provinces.find(p => p.id === provinceId).name : ''
      }
    });
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    setSelectedSubDistrict('');
    handleChange({
      target: {
        name: 'district',
        value: districtId ? districts[selectedProvince].find(d => d.id === districtId).name : ''
      }
    });
  };

  const handleSubDistrictChange = (e) => {
    const subDistrictId = e.target.value;
    setSelectedSubDistrict(subDistrictId);
    handleChange({
      target: {
        name: 'subDistrict',
        value: subDistrictId ? subDistricts[selectedDistrict].find(sd => sd.id === subDistrictId).name : ''
      }
    });
  };
  return (
    <div>
      {/* Registration Type */}
      <div className="mb-6">
        <p className="mb-2">ประเภท การขอใช้งาน</p>
        <div className="flex gap-6">
          <label className="flex items-center">
            <input
              type="radio"
              name="registrationType"
              value="new"
              checked={formData.registrationType === 'new'}
              onChange={handleChange}
              className="mr-2"
            />
            เพิ่มข้อมูลผู้ใช้งานใหม่
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="registrationType"
              value="transfer"
              checked={formData.registrationType === 'transfer'}
              onChange={handleChange}
              className="mr-2"
            />
            โอนย้ายจากภายนอกกรมฯ
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="registrationType"
              value="edit"
              checked={formData.registrationType === 'edit'}
              onChange={handleChange}
              className="mr-2"
            />
            แก้ไขข้อมูลผู้ใช้งานเดิม
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
      {/* Personal Information Fields */}
      <div className="space-y-4">
        <div>
            <label className="block mb-1">เลขประจำตัวประชาชน</label>
            <input
              type="text"
              name="idCard"
              value={formData.idCard}
              onChange={handleChange}
              className="w-full border rounded p-2"
              maxLength="13"
            />
          </div>
        <div className="grid grid-cols-3 gap-4">
        <div>
            <label className="block mb-1">คำนำหน้านาม</label>
            <select
              name="prefix"
              value={formData.prefix}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="">เลือกคำนำหน้านาม</option>
              {prefixes.map(prefix => (
                <option key={prefix.id} value={prefix.name}>
                  {prefix.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">ชื่อ</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1">นามสกุล</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        {/* ID Card and English Name */}
        <div className="space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">First Name (ภาษาอังกฤษ)</label>
              <input
                type="text"
                name="firstNameEn"
                value={formData.firstNameEn}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1">Last Name (ภาษาอังกฤษ)</label>
              <input
                type="text"
                name="lastNameEn"
                value={formData.lastNameEn}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">เบอร์โทรศัพท์ภายใน(กรม)</label>
            <div className="flex gap-2">
              <input
                type="tel"
                name="phoneInternal"
                value={formData.phoneInternal}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
              <span className="flex items-center">ต่อ</span>
              <input
                type="text"
                name="phoneExt"
                value={formData.phoneExt}
                onChange={handleChange}
                className="w-24 border rounded p-2"
              />
            </div>
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

       
          {/* Address Section */}
          <div className="space-y-4">
        <div>
          <label className="block mb-1">ที่อยู่</label>
          <textarea
            name="addressDetail"
            value={formData.addressDetail}
            onChange={handleChange}
            placeholder="บ้านเลขที่ ถนน ..."
            rows="2"
            className="w-full border rounded p-2 mb-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">จังหวัด</label>
            <select
              value={selectedProvince}
              onChange={handleProvinceChange}
              className="w-full border rounded p-2"
            >
              <option value="">เลือกจังหวัด</option>
              {provinces.map(province => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">อำเภอ/เขต</label>
            <select
              value={selectedDistrict}
              onChange={handleDistrictChange}
              disabled={!selectedProvince}
              className="w-full border rounded p-2"
            >
              <option value="">เลือกอำเภอ/เขต</option>
              {selectedProvince && districts[selectedProvince]?.map(district => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block mb-1">ตำบล/แขวง</label>
              <select
                value={selectedSubDistrict}
                onChange={handleSubDistrictChange}
                disabled={!selectedDistrict}
                className="w-full border rounded p-2"
              >
                <option value="">เลือกตำบล/แขวง</option>
                {selectedDistrict && subDistricts[selectedDistrict]?.map(subDistrict => (
                  <option key={subDistrict.id} value={subDistrict.id}>
                    {subDistrict.name}
                  </option>
                ))}
              </select>
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
          <div>
            <label className="block mb-1">รหัสไปรษณีย์</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export { PersonalInfo };
