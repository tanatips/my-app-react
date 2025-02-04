import React, { useState } from 'react';
import { PersonalInfo } from './PersonalInfo';
import { SystemAccess } from './SystemAccess';
import { WorkInfo } from './WorkInfo';

const EOfficeRegistrationForm = () => {
  const [formData, setFormData] = useState({
    // ข้อมูลส่วนตัว
    prefix: '',
    firstName: '',
    lastName: '',
    firstNameEn: '',
    lastNameEn: '',
    idCard: '',
    phoneInternal: '',
    phoneExt: '',
    mobile: '',
    birthDate: '',
    addressDetail: '',

    district: '',
    subDistrict: '',
    postalCode: '',
    ipAddress: '',
    maritalStatus: '',
    maritalStatusOther: '',
    religion: '',
    religionOther: '',
    ordainedOrHajj: '',
    registrationType: '',
    
    // ข้อมูลการทำงาน
    employeeType: '',
    employeeTypeOther: '',
    startDate: '',
    endDate: '',
    workLocation: '',
    region: '',
    province: '',
    division: '',
    department: '',
    position: '',

    // ระดับการใช้งานระบบ
    sarabanLevel: '',
    leaveLevel: '',
    carLevel: '',
    notes: ''
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

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      <div className="min-w-full bg-white">
        <div>
          <div className="bg-[#003366] text-white p-4 rounded-t-lg shadow-md mb-6">
            <h1 className="text-xl font-semibold text-center">
              แบบบันทึกการลงทะเบียนสิทธิผู้ใช้งานอินเทอร์เน็ตและระบบสำนักงานอัตโนมัติ (e-office)
            </h1>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          {/* <h2 className="text-lg font-semibold mb-6">
            ข้อมูลผู้ขอลงทะเบียน (โปรดกรอกข้อมูลให้ครบถ้วนสมบูรณ์ ตัวบรรจง และภาษาอังกฤษตัวพิมพ์ใหญ่)
          </h2> */}

          <PersonalInfo formData={formData} handleChange={handleChange} />
          <WorkInfo formData={formData} handleChange={handleChange} />
          <SystemAccess formData={formData} handleChange={handleChange} />
        </div>

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

export { EOfficeRegistrationForm };
