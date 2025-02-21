import React, { useState } from 'react';
import WirelessLANFormUI from './WirelessLANFormUI';

// ตัวเลือกคำนำหน้าชื่อ
const titleOptions = [
  { value: '', label: 'เลือกคำนำหน้า' },
  { value: 'นาย', label: 'นาย' },
  { value: 'นาง', label: 'นาง' },
  { value: 'นางสาว', label: 'นางสาว' },
  { value: 'ดร.', label: 'ดร.' },
];

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

const WirelessLANForm = () => {
  // Initial form state
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

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation helpers
  const isThaiLanguage = (text) => {
    const thaiPattern = /^[\u0E00-\u0E7F\s]+$/;
    return thaiPattern.test(text);
  };

  const isEnglishUpperCase = (text) => {
    return /^[A-Z\s]+$/.test(text);
  };

  const isMacAddress = (text) => {
    const macPattern = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    return macPattern.test(text);
  };

  // Validate individual field
  const validateField = (name, value) => {
    switch (name) {
      case 'gender':
        return value ? '' : 'กรุณาเลือกเพศ';
      
      case 'title':
        return value ? '' : 'กรุณาเลือกคำนำหน้า';
      
      case 'firstName':
        if (!value) return 'กรุณากรอกชื่อ';
        if (!isThaiLanguage(value)) return 'กรุณากรอกชื่อเป็นภาษาไทยเท่านั้น';
        if (value.length < 2 || value.length > 50) return 'ชื่อต้องมีความยาว 2-50 ตัวอักษร';
        return '';
      
      case 'lastName':
        if (!value) return 'กรุณากรอกนามสกุล';
        if (!isThaiLanguage(value)) return 'กรุณากรอกนามสกุลเป็นภาษาไทยเท่านั้น';
        if (value.length < 2 || value.length > 50) return 'นามสกุลต้องมีความยาว 2-50 ตัวอักษร';
        return '';
      
      case 'firstNameEn':
        if (!value) return 'กรุณากรอกชื่อภาษาอังกฤษ';
        if (!isEnglishUpperCase(value)) return 'กรุณากรอกชื่อเป็นภาษาอังกฤษตัวพิมพ์ใหญ่เท่านั้น';
        if (value.length < 2 || value.length > 50) return 'ชื่อต้องมีความยาว 2-50 ตัวอักษร';
        return '';
      
      case 'lastNameEn':
        if (!value) return 'กรุณากรอกนามสกุลภาษาอังกฤษ';
        if (!isEnglishUpperCase(value)) return 'กรุณากรอกนามสกุลเป็นภาษาอังกฤษตัวพิมพ์ใหญ่เท่านั้น';
        if (value.length < 2 || value.length > 50) return 'นามสกุลต้องมีความยาว 2-50 ตัวอักษร';
        return '';
      
      case 'internalPhone':
        if (!value) return 'กรุณากรอกเบอร์โทรภายใน';
        if (!/^\d+$/.test(value)) return 'กรุณากรอกเฉพาะตัวเลข';
        if (value.length < 3 || value.length > 5) return 'เบอร์โทรภายในต้องมีความยาว 3-5 หลัก';
        return '';
      
      case 'mobilePhone':
        if (!value) return 'กรุณากรอกเบอร์โทรศัพท์มือถือ';
        if (!/^0\d{9}$/.test(value)) return 'เบอร์โทรศัพท์มือถือไม่ถูกต้อง ต้องขึ้นต้นด้วย 0 และมี 10 หลัก';
        return '';
      
      case 'department':
        return value ? '' : 'กรุณาเลือกหน่วยงาน';
      
      case 'division':
        return value ? '' : 'กรุณาเลือกกลุ่มงาน/ฝ่าย';
      
      case 'requestType':
        return value ? '' : 'กรุณาเลือกประเภทการขอใช้งาน';
      
      case 'deviceType':
        return value ? '' : 'กรุณาเลือกอุปกรณ์';
      
      case 'deviceCode':
        if (formData.deviceType === 'notebook') {
          if (!value) return 'กรุณากรอกยี่ห้อ/รุ่น';
          if (value.length < 2 || value.length > 100) return 'ยี่ห้อ/รุ่นต้องมีความยาว 2-100 ตัวอักษร';
        }
        return '';
      
      case 'macAddress':
        if (formData.deviceType === 'notebook') {
          if (!value) return 'กรุณากรอก MAC Address';
          if (!isMacAddress(value)) return 'รูปแบบ MAC Address ไม่ถูกต้อง (XX:XX:XX:XX:XX:XX หรือ XX-XX-XX-XX-XX-XX)';
        }
        return '';
      
      default:
        return '';
    }
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? (checked ? 'notebook' : '') : value;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));

    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, newValue);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Handle input blur
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const touchedFields = {};
    Object.keys(formData).forEach(key => {
      touchedFields[key] = true;
    });
    setTouched(touchedFields);

    if (validateForm()) {
      try {
        // TODO: Add your API call here
        console.log('Form submitted:', formData);
        // Reset form after successful submission
        handleCancel();
      } catch (error) {
        console.error('Submission error:', error);
      }
    }
    
    setIsSubmitting(false);
  };

  // Handle form reset
  const handleCancel = () => {
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
    setErrors({});
    setTouched({});
  };

  return (
    <WirelessLANFormUI
      formData={formData}
      errors={errors}
      touched={touched}
      isSubmitting={isSubmitting}
      titleOptions={titleOptions}
      departmentOptions={departmentOptions}
      divisionOptions={divisionOptions}
      handleInputChange={handleInputChange}
      handleBlur={handleBlur}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
    />
  );
};

export default WirelessLANForm;