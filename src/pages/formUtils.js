// formUtils.js
export const validateForm = (formData) => {
    const newErrors = {};
    if (!formData.thaiTitle) newErrors.thaiTitle = 'กรุณาเลือกคำนำหน้า';
    if (!formData.englishTitle) newErrors.englishTitle = 'Please select title';
    if (!formData.firstName) newErrors.firstName = 'กรุณากรอกชื่อ';
    if (!formData.firstNameEn) newErrors.firstNameEn = 'Please enter first name';
    if (!formData.department) newErrors.department = 'กรุณาเลือกหน่วยงาน';
    if (!formData.division) newErrors.division = 'กรุณาเลือกกลุ่มงาน/ฝ่าย';
    if (!formData.mobilePhone) newErrors.mobilePhone = 'กรุณากรอกเบอร์โทรศัพท์มือถือ';
    if (!formData.lastName) newErrors.lastName = 'กรุณากรอกนามสกุล';
    if (!formData.lastNameEn) newErrors.lastNameEn = 'Please enter last name';
    
    return newErrors;
  };
  
  export const validateEnglishText = (value) => {
    return /^[A-Z\s]*$/.test(value);
  };