import { useState } from 'react';

const FormRow = ({ label, required, children }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
    <label className="sm:w-48 text-right flex-shrink-0 text-sm text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}:
    </label>
    <div className="flex-1 min-w-0 w-full sm:w-auto">
      {children}
    </div>
  </div>
);

export default function PersonalInfoForm() {
  const [formData, setFormData] = useState({
    prefix: '',
    name: '',
    lastName: '',
    idNumber: '',
    firstNameEn: '',
    lastNameEn: '',
    phoneOffice: '',
    phoneExt: '',
    mobile: '',
    birthDate: '',
    houseNo: '',
    moo: '',
    soi: '',
    province: '',
    district: '',
    subDistrict: '',
    postCode: '',
    ipAddress: '',
    maritalStatus: 'single',
    religion: 'buddhist',
    maritalDetail: '',
    religionDetail: ''
  });

  const handleChange = (name) => (e) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleRadioChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg">
        <div className="bg-blue-900 text-white p-4 rounded-t-lg">
          <h2 className="text-lg font-semibold">ข้อมูลทั่วไป</h2>
        </div>

        <div className="p-6">
          <FormRow label="คำนำหน้า" required>
            <select 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={formData.prefix}
              onChange={handleChange('prefix')}
            >
              <option value="">-- เลือก --</option>
              <option value="mr">นาย</option>
              <option value="mrs">นาง</option>
              <option value="miss">นางสาว</option>
            </select>
          </FormRow>

          <FormRow label="ชื่อ" required>
            <input
              type="text"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange('name')}
            />
          </FormRow>

          <FormRow label="นามสกุล" required>
            <input
              type="text"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={formData.lastName}
              onChange={handleChange('lastName')}
            />
          </FormRow>

          <FormRow label="หมายเลขบัตรประชาชน" required>
            <input
              type="text"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={formData.idNumber}
              onChange={handleChange('idNumber')}
              maxLength="13"
            />
          </FormRow>

          <FormRow label="First Name (ภาษาอังกฤษ)" required>
            <input
              type="text"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={formData.firstNameEn}
              onChange={handleChange('firstNameEn')}
            />
          </FormRow>

          <FormRow label="Last Name (ภาษาอังกฤษ)" required>
            <input
              type="text"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={formData.lastNameEn}
              onChange={handleChange('lastNameEn')}
            />
          </FormRow>

          <FormRow label="เบอร์โทรศัพท์ภายใน(กรม)" required>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                value={formData.phoneOffice}
                onChange={handleChange('phoneOffice')}
              />
              <span>ต่อ</span>
              <input
                type="text"
                className="w-24 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                value={formData.phoneExt}
                onChange={handleChange('phoneExt')}
              />
            </div>
          </FormRow>

          <FormRow label="เบอร์โทรศัพท์มือถือ" required>
            <input
              type="text"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={formData.mobile}
              onChange={handleChange('mobile')}
            />
          </FormRow>

          <FormRow label="เกิดวันที่ (วัน/เดือน/ปี)" required>
            <input
              type="date"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={formData.birthDate}
              onChange={handleChange('birthDate')}
            />
          </FormRow>

          {/* ที่อยู่ */}
          <FormRow label="บ้านเลขที่" required>
            <input
              type="text"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={formData.houseNo}
              onChange={handleChange('houseNo')}
            />
          </FormRow>

          <FormRow label="หมู่" required>
            <input
              type="text"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={formData.moo}
              onChange={handleChange('moo')}
            />
          </FormRow>

          <FormRow label="ซอย">
            <input
              type="text"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={formData.soi}
              onChange={handleChange('soi')}
            />
          </FormRow>

          <FormRow label="จังหวัด" required>
            <select 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={formData.province}
              onChange={handleChange('province')}
            >
              <option value="">-- เลือก --</option>
              {/* เพิ่มรายการจังหวัด */}
            </select>
          </FormRow>

          <FormRow label="อำเภอ" required>
            <select 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={formData.district}
              onChange={handleChange('district')}
            >
              <option value="">-- เลือก --</option>
              {/* เพิ่มรายการอำเภอ */}
            </select>
          </FormRow>

          <FormRow label="ตำบล" required>
            <select 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={formData.subDistrict}
              onChange={handleChange('subDistrict')}
            >
              <option value="">-- เลือก --</option>
              {/* เพิ่มรายการตำบล */}
            </select>
          </FormRow>

          <FormRow label="รหัสไปรษณีย์" required>
            <input
              type="text"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={formData.postCode}
              onChange={handleChange('postCode')}
            />
          </FormRow>

          <FormRow label="IP Address">
            <input
              type="text"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              value={formData.ipAddress}
              onChange={handleChange('ipAddress')}
            />
          </FormRow>

          <FormRow label="สถานะภาพ" required>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={formData.maritalStatus === 'single'}
                  onChange={() => handleRadioChange('maritalStatus', 'single')}
                  className="text-blue-600"
                />
                <span>โสด</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={formData.maritalStatus === 'married'}
                  onChange={() => handleRadioChange('maritalStatus', 'married')}
                  className="text-blue-600"
                />
                <span>สมรส</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={formData.maritalStatus === 'divorced'}
                  onChange={() => handleRadioChange('maritalStatus', 'divorced')}
                  className="text-blue-600"
                />
                <span>หย่าร้าง</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={formData.maritalStatus === 'other'}
                  onChange={() => handleRadioChange('maritalStatus', 'other')}
                  className="text-blue-600"
                />
                <span>อื่นๆ</span>
              </label>
              {formData.maritalStatus === 'other' && (
                <input
                  type="text"
                  placeholder="โปรดระบุ"
                  className="p-2 border rounded"
                  value={formData.maritalDetail}
                  onChange={handleChange('maritalDetail')}
                />
              )}
            </div>
          </FormRow>

          <FormRow label="ศาสนา" required>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={formData.religion === 'buddhist'}
                  onChange={() => handleRadioChange('religion', 'buddhist')}
                  className="text-blue-600"
                />
                <span>พุทธ</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={formData.religion === 'christian'}
                  onChange={() => handleRadioChange('religion', 'christian')}
                  className="text-blue-600"
                />
                <span>คริสต์</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={formData.religion === 'islam'}
                  onChange={() => handleRadioChange('religion', 'islam')}
                  className="text-blue-600"
                />
                <span>อิสลาม</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={formData.religion === 'other'}
                  onChange={() => handleRadioChange('religion', 'other')}
                  className="text-blue-600"
                />
                <span>อื่นๆ</span>
              </label>
              {formData.religion === 'other' && (
                <input
                  type="text"
                  placeholder="โปรดระบุ"
                  className="p-2 border rounded"
                  value={formData.religionDetail}
                  onChange={handleChange('religionDetail')}
                />
              )}
            </div>
          </FormRow>
        </div>
      </div>
    </div>
  );
}