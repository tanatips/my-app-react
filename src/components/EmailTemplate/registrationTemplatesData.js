// registrationTemplatesData.js
// ข้อมูลเทมเพลตอีเมลสำหรับหมวดหมู่ "ลงทะเบียนเข้าใช้งาน (สำหรับ ราชการ)"

export const registrationTemplates = [
  // 1. ผู้ร้องขอใช้งาน
  {
    id: 101,
    name: 'แจ้งสถานะคำขอลงทะเบียนใช้งานระบบ',
    subject: 'แจ้งการรับคำขอลงทะเบียนใช้งานระบบ - {{requestId}}',
    content: `เรียน {{requesterName}},

คำขอลงทะเบียนเข้าใช้งานระบบของท่าน (เลขที่คำขอ: {{requestId}}) ได้รับการบันทึกเข้าระบบเรียบร้อยแล้ว

รายละเอียดคำขอ:
- ชื่อ-นามสกุล: {{requesterName}}
- หน่วยงาน: {{department}}
- ตำแหน่ง: {{position}}
- ระบบที่ขอใช้งาน: {{systemName}}
- วันที่ยื่นคำขอ: {{requestDate}}
- เหตุผลการขอใช้งาน: {{reason}}

คำขอของท่านอยู่ระหว่างการพิจารณาอนุมัติจากผู้อำนวยการกอง ท่านสามารถติดตามสถานะคำขอได้ผ่านทางเว็บไซต์ หรือตรวจสอบอีเมลแจ้งเตือนสถานะคำขอจากระบบ

ขอแสดงความนับถือ,
ฝ่ายบริการเทคโนโลยีสารสนเทศ`,
    variables: ['requestId', 'requesterName', 'department', 'position', 'systemName', 'requestDate', 'reason'],
    isHtml: false,
    categoryId: 1,
    step: 1 // ขั้นตอน 1: แจ้งผู้ร้องขอ
  },
  
  // 2. ผู้อำนวยการกองอนุมัติ
  {
    id: 102,
    name: 'แจ้งการขออนุมัติลงทะเบียนใช้งานระบบถึงผู้อำนวยการกอง',
    subject: 'ขออนุมัติการลงทะเบียนใช้งานระบบ - {{requestId}}',
    content: `เรียน {{directorName}},

มีคำขอลงทะเบียนเข้าใช้งานระบบจากบุคลากรในสังกัดของท่าน โดยมีรายละเอียดดังนี้:

- เลขที่คำขอ: {{requestId}}
- ชื่อผู้ขอใช้งาน: {{requesterName}}
- หน่วยงาน: {{department}}
- ตำแหน่ง: {{position}}
- ระบบที่ขอใช้งาน: {{systemName}}
- วันที่ยื่นคำขอ: {{requestDate}}
- เหตุผลการขอใช้งาน: {{reason}}

กรุณาดำเนินการอนุมัติคำขอผ่านทางระบบ โดยคลิกที่ลิงก์ด้านล่าง:
{{approvalLink}}

หากต้องการข้อมูลเพิ่มเติม กรุณาติดต่อฝ่ายบริการเทคโนโลยีสารสนเทศ ที่หมายเลขโทรศัพท์ {{supportTel}}

ขอแสดงความนับถือ,
ฝ่ายบริการเทคโนโลยีสารสนเทศ`,
    variables: ['requestId', 'directorName', 'requesterName', 'department', 'position', 'systemName', 'requestDate', 'reason', 'approvalLink', 'supportTel'],
    isHtml: false,
    categoryId: 1,
    step: 2 // ขั้นตอน 2: แจ้งผู้อนุมัติขั้นต้น
  },
  
  // 3. ผู้อำนวยการศูนย์อนุมัติ
  {
    id: 103,
    name: 'แจ้งการขออนุมัติลงทะเบียนใช้งานระบบถึงผู้อำนวยการศูนย์',
    subject: 'ขออนุมัติการลงทะเบียนใช้งานระบบ (ขั้นสุดท้าย) - {{requestId}}',
    content: `เรียน {{centerDirectorName}},

มีคำขอลงทะเบียนเข้าใช้งานระบบที่ผ่านการอนุมัติขั้นต้นจากผู้อำนวยการกองแล้ว และรอการอนุมัติขั้นสุดท้ายจากท่าน โดยมีรายละเอียดดังนี้:

- เลขที่คำขอ: {{requestId}}
- ชื่อผู้ขอใช้งาน: {{requesterName}}
- หน่วยงาน: {{department}}
- ตำแหน่ง: {{position}}
- ระบบที่ขอใช้งาน: {{systemName}}
- วันที่ยื่นคำขอ: {{requestDate}}
- เหตุผลการขอใช้งาน: {{reason}}
- ผ่านการอนุมัติจาก: {{directorName}} (ผู้อำนวยการกอง {{departmentFull}})
- วันที่อนุมัติขั้นต้น: {{firstApprovalDate}}

กรุณาดำเนินการอนุมัติคำขอผ่านทางระบบ โดยคลิกที่ลิงก์ด้านล่าง:
{{approvalLink}}

หมายเหตุ: การอนุมัติจากท่านจะเป็นการอนุมัติขั้นสุดท้าย ก่อนที่ระบบจะดำเนินการส่งข้อมูลให้เจ้าหน้าที่เพื่อสร้างบัญชีผู้ใช้งานต่อไป

ขอแสดงความนับถือ,
ฝ่ายบริการเทคโนโลยีสารสนเทศ`,
    variables: ['requestId', 'centerDirectorName', 'requesterName', 'department', 'departmentFull', 'position', 'systemName', 'requestDate', 'reason', 'directorName', 'firstApprovalDate', 'approvalLink'],
    isHtml: false,
    categoryId: 1,
    step: 3 // ขั้นตอน 3: แจ้งผู้อนุมัติขั้นสุดท้าย
  },
  
  // 4. ผู้ดำเนินการ
  {
    id: 104,
    name: 'แจ้งให้เจ้าหน้าที่ดำเนินการสร้างบัญชีผู้ใช้',
    subject: 'แจ้งให้ดำเนินการสร้างบัญชีผู้ใช้งานระบบ - {{requestId}}',
    content: `เรียน {{adminName}},

มีคำขอลงทะเบียนเข้าใช้งานระบบที่ผ่านการอนุมัติครบทุกขั้นตอนแล้ว และรอการดำเนินการสร้างบัญชีผู้ใช้งาน โดยมีรายละเอียดดังนี้:

- เลขที่คำขอ: {{requestId}}
- ชื่อผู้ขอใช้งาน: {{requesterName}}
- เลขประจำตัวประชาชน: {{nationalId}}
- อีเมล: {{email}}
- เบอร์โทรศัพท์: {{phone}}
- หน่วยงาน: {{department}}
- ตำแหน่ง: {{position}}
- ระบบที่ขอใช้งาน: {{systemName}}
- สิทธิ์การใช้งานที่ต้องการ: {{permissionLevel}}
- วันที่ยื่นคำขอ: {{requestDate}}
- วันที่อนุมัติขั้นสุดท้าย: {{finalApprovalDate}}

กรุณาดำเนินการสร้างบัญชีผู้ใช้งานตามรายละเอียดข้างต้น และแจ้งข้อมูลบัญชีผู้ใช้กลับไปยังผู้ขอใช้งานเมื่อดำเนินการเรียบร้อยแล้ว

เมื่อดำเนินการเสร็จสิ้น กรุณาอัปเดตสถานะคำขอผ่านทางระบบ:
{{adminActionLink}}

ขอแสดงความนับถือ,
ระบบแจ้งเตือนอัตโนมัติ`,
    variables: ['requestId', 'adminName', 'requesterName', 'nationalId', 'email', 'phone', 'department', 'position', 'systemName', 'permissionLevel', 'requestDate', 'finalApprovalDate', 'adminActionLink'],
    isHtml: false,
    categoryId: 1,
    step: 4 // ขั้นตอน 4: แจ้งผู้ดำเนินการ
  },
  
  // 5. แจ้งผลการดำเนินการให้ผู้ร้องขอทราบ
  {
    id: 105,
    name: 'แจ้งผลการสร้างบัญชีผู้ใช้งานแก่ผู้ร้องขอ',
    subject: 'แจ้งผลการลงทะเบียนเข้าใช้งานระบบ - {{requestId}}',
    content: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="/api/placeholder/200/80" alt="Logo" width="200" height="80" />
    <h2 style="color: #1a56db; margin-top: 15px;">สร้างบัญชีผู้ใช้งานระบบเรียบร้อยแล้ว</h2>
  </div>

  <p style="margin-bottom: 15px;">เรียน {{requesterName}},</p>

  <p style="margin-bottom: 15px;">คำขอลงทะเบียนเข้าใช้งานระบบของท่าน (เลขที่คำขอ: <strong>{{requestId}}</strong>) ได้รับการอนุมัติและดำเนินการสร้างบัญชีผู้ใช้งานเรียบร้อยแล้ว</p>

  <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
    <h3 style="color: #1f2937; margin-top: 0;">ข้อมูลบัญชีผู้ใช้งานของท่าน</h3>
    <p style="margin-bottom: 8px;"><strong>ชื่อผู้ใช้งาน:</strong> {{username}}</p>
    <p style="margin-bottom: 8px;"><strong>รหัสผ่านชั่วคราว:</strong> {{temporaryPassword}}</p>
    <p style="margin-bottom: 8px;"><strong>ระบบที่ได้รับสิทธิ์:</strong> {{systemName}}</p>
    <p style="margin-bottom: 8px;"><strong>ระดับสิทธิ์การใช้งาน:</strong> {{permissionLevel}}</p>
    <p style="margin-bottom: 0;"><strong>วันที่เริ่มใช้งานได้:</strong> {{startDate}}</p>
  </div>

  <div style="border-left: 4px solid #fbbf24; padding: 10px 15px; background-color: #fffbeb; margin-bottom: 15px;">
    <p style="margin: 0; color: #92400e;"><strong>หมายเหตุสำคัญ:</strong> กรุณาเปลี่ยนรหัสผ่านของท่านในการเข้าสู่ระบบครั้งแรก เพื่อความปลอดภัยของบัญชีผู้ใช้งาน</p>
  </div>

  <p style="margin-bottom: 15px;">ท่านสามารถเข้าสู่ระบบได้ที่ลิงก์ด้านล่าง:</p>
  <div style="text-align: center; margin-bottom: 20px;">
    <a href="{{systemLoginUrl}}" style="display: inline-block; background-color: #1a56db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">เข้าสู่ระบบ</a>
  </div>

  <p style="margin-bottom: 15px;">หากท่านมีข้อสงสัยหรือต้องการความช่วยเหลือเพิ่มเติม กรุณาติดต่อฝ่ายบริการเทคโนโลยีสารสนเทศ ที่หมายเลขโทรศัพท์ {{supportTel}} หรืออีเมล {{supportEmail}}</p>

  <div style="border-top: 1px solid #e0e0e0; padding-top: 15px; margin-top: 20px; font-size: 12px; color: #6b7280; text-align: center;">
    <p style="margin-bottom: 5px;">ฝ่ายบริการเทคโนโลยีสารสนเทศ</p>
    <p style="margin-bottom: 5px;">อีเมลฉบับนี้เป็นการแจ้งเตือนอัตโนมัติ กรุณาอย่าตอบกลับ</p>
    <p style="margin-bottom: 0;">© {{currentYear}} ลิขสิทธิ์โดยหน่วยงานของท่าน</p>
  </div>
</div>`,
    variables: ['requestId', 'requesterName', 'username', 'temporaryPassword', 'systemName', 'permissionLevel', 'startDate', 'systemLoginUrl', 'supportTel', 'supportEmail', 'currentYear'],
    isHtml: true,
    categoryId: 1,
    step: 5 // ขั้นตอน 5: แจ้งผลการดำเนินการ
  },
  {
    id: 106,
    name: 'แจ้งผลการไม่อนุมัติจากผู้อำนวยการกอง',
    subject: 'แจ้งผลการไม่อนุมัติคำขอลงทะเบียนใช้งานระบบ - {{requestId}}',
    content: `เรียน {{requesterName}},
  
  คำขอลงทะเบียนเข้าใช้งานระบบของท่าน (เลขที่คำขอ: {{requestId}}) ไม่ได้รับการอนุมัติจากผู้อำนวยการกอง
  
  รายละเอียดคำขอ:
  - ชื่อ-นามสกุล: {{requesterName}}
  - หน่วยงาน: {{department}}
  - ตำแหน่ง: {{position}}
  - ระบบที่ขอใช้งาน: {{systemName}}
  - วันที่ยื่นคำขอ: {{requestDate}}
  - เหตุผลการขอใช้งาน: {{reason}}
  
  เหตุผลการไม่อนุมัติ:
  {{rejectReason}}
  
  หากท่านมีข้อสงสัยหรือต้องการข้อมูลเพิ่มเติม กรุณาติดต่อฝ่ายบริการเทคโนโลยีสารสนเทศ ที่หมายเลขโทรศัพท์ {{supportTel}} หรืออีเมล {{supportEmail}}
  
  หากท่านประสงค์จะยื่นคำขอใหม่ โปรดดำเนินการผ่านระบบ และระบุข้อมูลเพิ่มเติมตามคำแนะนำของผู้อำนวยการกองเพื่อประกอบการพิจารณา
  
  ขอแสดงความนับถือ,
  ฝ่ายบริการเทคโนโลยีสารสนเทศ`,
    variables: ['requestId', 'requesterName', 'department', 'position', 'systemName', 'requestDate', 'reason', 'rejectReason', 'supportTel', 'supportEmail'],
    isHtml: false,
    categoryId: 1,
    step: 7 // ขั้นตอน 7: แจ้งผลการไม่อนุมัติ
  },
  {
    id: 107,
    name: 'แจ้งผลการไม่อนุมัติจากผู้อำนวยการศูนย์',
    subject: 'แจ้งผลการไม่อนุมัติคำขอลงทะเบียนใช้งานระบบ - {{requestId}}',
    content: `เรียน {{requesterName}},
  
  คำขอลงทะเบียนเข้าใช้งานระบบของท่าน (เลขที่คำขอ: {{requestId}}) ไม่ได้รับการอนุมัติในขั้นตอนสุดท้ายจากผู้อำนวยการศูนย์
  
  รายละเอียดคำขอ:
  - ชื่อ-นามสกุล: {{requesterName}}
  - หน่วยงาน: {{department}}
  - ตำแหน่ง: {{position}}
  - ระบบที่ขอใช้งาน: {{systemName}}
  - วันที่ยื่นคำขอ: {{requestDate}}
  - เหตุผลการขอใช้งาน: {{reason}}
  - ผ่านการอนุมัติขั้นต้นจาก: {{directorName}} (ผู้อำนวยการกอง)
  
  เหตุผลการไม่อนุมัติขั้นสุดท้าย:
  {{rejectReason}}
  
  ข้อเสนอแนะเพิ่มเติม:
  {{additionalSuggestion}}
  
  หากท่านมีข้อสงสัยหรือต้องการข้อมูลเพิ่มเติม กรุณาติดต่อฝ่ายบริการเทคโนโลยีสารสนเทศ ที่หมายเลขโทรศัพท์ {{supportTel}} หรืออีเมล {{supportEmail}}
  
  หากท่านประสงค์จะยื่นคำขอใหม่ โปรดดำเนินการผ่านระบบ และปรับปรุงรายละเอียดตามข้อเสนอแนะที่ได้รับ
  
  ขอแสดงความนับถือ,
  ฝ่ายบริการเทคโนโลยีสารสนเทศ`,
    variables: ['requestId', 'requesterName', 'department', 'position', 'systemName', 'requestDate', 'reason', 'directorName', 'rejectReason', 'additionalSuggestion', 'supportTel', 'supportEmail'],
    isHtml: false,
    categoryId: 1,
    step: 7 // ขั้นตอน 7: แจ้งผลการไม่อนุมัติ
  },
  {
    id: 108,
    name: 'แจ้งผลการไม่อนุมัติคำขอลงทะเบียน (HTML)',
    subject: 'แจ้งผลการไม่อนุมัติคำขอลงทะเบียนใช้งานระบบ - {{requestId}}',
    content: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="/api/placeholder/200/80" alt="Logo" width="200" height="80" />
      <h2 style="color: #dc2626; margin-top: 15px;">คำขอลงทะเบียนไม่ได้รับการอนุมัติ</h2>
    </div>
  
    <p style="margin-bottom: 15px;">เรียน {{requesterName}},</p>
  
    <p style="margin-bottom: 15px;">เราขอแจ้งให้ทราบว่า คำขอลงทะเบียนเข้าใช้งานระบบของท่าน (เลขที่คำขอ: <strong>{{requestId}}</strong>) ไม่ได้รับการอนุมัติ โดยมีรายละเอียดดังนี้</p>
  
    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
      <h3 style="color: #1f2937; margin-top: 0;">รายละเอียดคำขอ</h3>
      <p style="margin-bottom: 8px;"><strong>ชื่อ-นามสกุล:</strong> {{requesterName}}</p>
      <p style="margin-bottom: 8px;"><strong>หน่วยงาน:</strong> {{department}}</p>
      <p style="margin-bottom: 8px;"><strong>ตำแหน่ง:</strong> {{position}}</p>
      <p style="margin-bottom: 8px;"><strong>ระบบที่ขอใช้งาน:</strong> {{systemName}}</p>
      <p style="margin-bottom: 8px;"><strong>วันที่ยื่นคำขอ:</strong> {{requestDate}}</p>
      <p style="margin-bottom: 0;"><strong>ผู้พิจารณาไม่อนุมัติ:</strong> {{rejectByPerson}}</p>
    </div>
  
    <div style="border-left: 4px solid #dc2626; padding: 10px 15px; background-color: #fef2f2; margin-bottom: 15px;">
      <h3 style="color: #991b1b; margin-top: 0;">เหตุผลการไม่อนุมัติ</h3>
      <p style="margin: 0; color: #991b1b;">{{rejectReason}}</p>
    </div>
  
    <div style="border-left: 4px solid #fbbf24; padding: 10px 15px; background-color: #fffbeb; margin-bottom: 15px;">
      <h3 style="color: #92400e; margin-top: 0;">ข้อเสนอแนะ</h3>
      <p style="margin: 0; color: #92400e;">{{additionalSuggestion}}</p>
    </div>
  
    <p style="margin-bottom: 15px;">หากท่านประสงค์จะยื่นคำขอใหม่ กรุณาดำเนินการผ่านระบบและปรับปรุงรายละเอียดตามข้อเสนอแนะที่ได้รับ โดยสามารถคลิกที่ปุ่มด้านล่างเพื่อเริ่มดำเนินการ:</p>
    <div style="text-align: center; margin-bottom: 20px;">
      <a href="{{newRequestLink}}" style="display: inline-block; background-color: #1a56db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">ยื่นคำขอใหม่</a>
    </div>
  
    <p style="margin-bottom: 15px;">หากท่านมีข้อสงสัยหรือต้องการความช่วยเหลือเพิ่มเติม กรุณาติดต่อฝ่ายบริการเทคโนโลยีสารสนเทศ ที่หมายเลขโทรศัพท์ {{supportTel}} หรืออีเมล {{supportEmail}}</p>
  
    <div style="border-top: 1px solid #e0e0e0; padding-top: 15px; margin-top: 20px; font-size: 12px; color: #6b7280; text-align: center;">
      <p style="margin-bottom: 5px;">ฝ่ายบริการเทคโนโลยีสารสนเทศ</p>
      <p style="margin-bottom: 5px;">อีเมลฉบับนี้เป็นการแจ้งเตือนอัตโนมัติ กรุณาอย่าตอบกลับ</p>
      <p style="margin-bottom: 0;">© {{currentYear}} ลิขสิทธิ์โดยหน่วยงานของท่าน</p>
    </div>
  </div>`,
    variables: ['requestId', 'requesterName', 'department', 'position', 'systemName', 'requestDate', 'rejectByPerson', 'rejectReason', 'additionalSuggestion', 'newRequestLink', 'supportTel', 'supportEmail', 'currentYear'],
    isHtml: true,
    categoryId: 1,
    step: 7 // ขั้นตอน 7: แจ้งผลการไม่อนุมัติ
  }
];

// ข้อมูลตัวอย่างสำหรับการแทนที่ตัวแปรใน Preview
export const sampleData = {
  requestId: 'REG-20250405-0123',
  requesterName: 'นายสมชาย ใจดี',
  department: 'กองนโยบายและแผน',
  departmentFull: 'กองนโยบายและแผน สำนักงานปลัดกระทรวง',
  position: 'นักวิเคราะห์นโยบายและแผนชำนาญการ',
  systemName: 'ระบบสารบรรณอิเล็กทรอนิกส์',
  requestDate: '5 เมษายน 2568',
  reason: 'ต้องการใช้งานระบบเพื่อติดตามหนังสือราชการและสนับสนุนการทำงานตามภารกิจ',
  directorName: 'นางสาวรุ่งนภา วิจิตรวงศ์',
  centerDirectorName: 'นายพิชัย สมบูรณ์ดี',
  firstApprovalDate: '6 เมษายน 2568',
  finalApprovalDate: '7 เมษายน 2568',
  approvalLink: 'https://example.gov.th/approval?req=REG-20250405-0123&token=abc123',
  supportTel: '02-123-4567',
  adminName: 'นางสาวศิริพร ช่วยเหลือ',
  nationalId: 'X-XXXX-XXXXX-XX-X',
  email: 'somchai.j@example.gov.th',
  phone: '081-234-5678',
  permissionLevel: 'ผู้ใช้งานทั่วไป (User)',
  adminActionLink: 'https://example.gov.th/admin/action?req=REG-20250405-0123&token=xyz789',
  username: 'somchai.j',
  temporaryPassword: 'Temp@20250407',
  startDate: '8 เมษายน 2568',
  systemLoginUrl: 'https://edoc.example.gov.th/login',
  supportEmail: 'itsupport@example.gov.th',
  currentYear: '2568',
  rejectReason: 'ข้อมูลที่ให้ไม่ครบถ้วน เนื่องจากไม่ได้แนบเอกสารยืนยันตัวตนประกอบการพิจารณา',
  additionalSuggestion: 'กรุณาแนบสำเนาบัตรประจำตัวข้าราชการในการยื่นคำขอครั้งใหม่',
  rejectByPerson: 'นางสาวรุ่งนภา วิจิตรวงศ์ (ผู้อำนวยการกองนโยบายและแผน)',
  newRequestLink: 'https://example.gov.th/register/new?ref=REG-20250405-0123'
}