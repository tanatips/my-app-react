import React from 'react';

const PasswordChangeRequestForm = () => {
  return (
    <div className="max-w-3xl mx-auto my-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Blue Header */}
        <div className="bg-[#0a2167] text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-semibold">ขอเปลี่ยนรหัสผ่าน</h2>
        </div>

        <form className="p-6" onSubmit={(e) => e.preventDefault()}>
          {/* Form Header Section */}
          <div className="mb-6">
            <h1 className="text-lg font-semibold mb-2">
              ข้อมูลผู้ขอเปลี่ยนรหัสผ่าน (โปรดกรอกข้อมูลให้ครบถ้วนสมบูรณ์)
            </h1>
            {/* <p className="text-sm text-red-500">* จำเป็นต้องกรอก</p> */}
          </div>

          {/* Gender Selection */}
          <div className="mb-6">
            <label className="block mb-2">
              เพศ
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex gap-6">
              <div className="space-x-2">
                <input type="radio" name="gender" id="male" required />
                <label htmlFor="male">ชาย</label>
              </div>
              <div className="space-x-2">
                <input type="radio" name="gender" id="female" />
                <label htmlFor="female">หญิง</label>
              </div>
            </div>
          </div>

          {/* Name Fields */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="block mb-1">
                คำนำหน้านาม (ภาษาไทย)
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select className="w-full border rounded p-2" required>
                <option value="">-- เลือกคำนำหน้า --</option>
                <option value="นาย">นาย</option>
                <option value="นาง">นาง</option>
                <option value="นางสาว">นางสาว</option>
                <option value="ดร.">ดร.</option>
                <option value="ศ.">ศ.</option>
                <option value="รศ.">รศ.</option>
                <option value="ผศ.">ผศ.</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-1">
                ชื่อ
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input type="text" className="w-full border rounded p-2" required />
            </div>
            <div className="flex-1">
              <label className="block mb-1">
                นามสกุล
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input type="text" className="w-full border rounded p-2" required />
            </div>
          </div>

          {/* Username Field */}
          <div className="mb-6">
            <label className="block mb-1">
              ชื่อผู้ใช้ (User name) (ตัวอย่าง sombat.anc)
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input type="text" className="w-full border rounded p-2" required />
          </div>

          {/* Phone Numbers */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block mb-1">
                เบอร์โทรศัพท์ภายในกรม
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input type="tel" className="w-full border rounded p-2" required />
            </div>
            <div>
              <label className="block mb-1">
                เบอร์โทรศัพท์มือถือ
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input type="tel" className="w-full border rounded p-2" required />
            </div>
          </div>

          {/* User Type */}
          <div className="mb-6">
            <label className="block mb-2">
              ประเภท
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-x-2">
                <input type="radio" name="userType" id="civil-servant" required />
                <label htmlFor="civil-servant">ข้าราชการ</label>
              </div>
              <div className="space-x-2">
                <input type="radio" name="userType" id="government-employee" />
                <label htmlFor="government-employee">พนักงานราชการ</label>
              </div>
              <div className="space-x-2">
                <input type="radio" name="userType" id="permanent-employee" />
                <label htmlFor="permanent-employee">ลูกจ้างประจำ</label>
              </div>
              <div className="space-x-2">
                <input type="radio" name="userType" id="temporary-employee" />
                <label htmlFor="temporary-employee">ลูกจ้างชั่วคราว</label>
              </div>
              <div className="space-x-2">
                <input type="radio" name="userType" id="external" />
                <label htmlFor="external">บุคคลภายนอก</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" name="userType" id="other" />
                <label htmlFor="other">อื่น ๆ</label>
                <input 
                  type="text" 
                  className="border rounded p-1 flex-1" 
                  placeholder="ระบุประเภท"
                />
              </div>
            </div>
          </div>

          {/* Organization/Company */}
          <div className="mb-6">
            <label className="block mb-1">
              ชื่อหน่วยงาน/บริษัท
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input type="text" className="w-full border rounded p-2" required />
          </div>

          <div className="flex justify-center space-x-4">
            <button
              type="button"
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
  );
};

export default PasswordChangeRequestForm;