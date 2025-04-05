// eofficeTemplatesData.js
// ข้อมูลเทมเพลตอีเมลสำหรับหมวดหมู่ "ขอใช้งานระบบ e-office"

export const eofficeTemplates = [
    // 1. ผู้ร้องขอใช้งาน
    {
      id: 301,
      name: 'แจ้งสถานะคำขอใช้งานระบบ e-office',
      subject: 'แจ้งการรับคำขอใช้งานระบบ e-office - {{requestId}}',
      content: `เรียน {{requesterName}},
  
  คำขอใช้งานระบบ e-office ของท่าน (เลขที่คำขอ: {{requestId}}) ได้รับการบันทึกเข้าระบบเรียบร้อยแล้ว
  
  รายละเอียดคำขอ:
  - ชื่อ-นามสกุล: {{requesterName}}
  - เลขประจำตัวประชาชน: {{nationalId}}
  - ตำแหน่ง: {{position}}
  - หน่วยงาน: {{department}}
  - โทรศัพท์: {{phone}}
  - อีเมล: {{email}}
  - ประเภทการขอใช้งาน: {{requestType}}
  - สิทธิ์การเข้าถึงที่ขอ: {{accessPermissions}}
  - เหตุผลการขอใช้งาน: {{reason}}
  
  คำขอของท่านอยู่ระหว่างการพิจารณาอนุมัติตามขั้นตอน ท่านสามารถติดตามสถานะคำขอได้ที่ {{statusLink}} หรือรอรับการแจ้งเตือนผ่านทางอีเมล
  
  ขั้นตอนการอนุมัติคำขอ:
  1. ผู้อำนวยการกองพิจารณาอนุมัติ
  2. ผู้อำนวยการศูนย์เทคโนโลยีสารสนเทศพิจารณาอนุมัติ
  3. เจ้าหน้าที่ดำเนินการสร้างบัญชีผู้ใช้งาน
  
  หากมีข้อสงสัย สามารถติดต่อเจ้าหน้าที่ระบบ e-office ได้ที่เบอร์ {{supportTel}} หรืออีเมล {{supportEmail}}
  
  ขอแสดงความนับถือ,
  ทีมงานระบบ e-office`,
      variables: [
        'requestId', 'requesterName', 'nationalId', 'position', 'department', 
        'phone', 'email', 'requestType', 'accessPermissions', 'reason', 
        'statusLink', 'supportTel', 'supportEmail'
      ],
      isHtml: false,
      categoryId: 3
    },
    
    // 2. ผู้อำนวยการกองอนุมัติ
    {
      id: 302,
      name: 'แจ้งการขออนุมัติใช้งานระบบ e-office ถึงผู้อำนวยการกอง',
      subject: 'ขออนุมัติการใช้งานระบบ e-office - {{requestId}}',
      content: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="color: #1a56db;">คำขออนุมัติการใช้งานระบบ e-office</h2>
    </div>
  
    <p>เรียน {{directorName}},</p>
  
    <p>มีคำขอใช้งานระบบ e-office จากบุคลากรในสังกัดของท่าน ซึ่งจำเป็นต้องได้รับการอนุมัติจากท่านก่อนดำเนินการในขั้นตอนต่อไป</p>
  
    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
      <h3 style="color: #1f2937; margin-top: 0;">รายละเอียดคำขอ</h3>
      <p><strong>เลขที่คำขอ:</strong> {{requestId}}</p>
      <p><strong>ผู้ขอใช้งาน:</strong> {{requesterName}}</p>
      <p><strong>ตำแหน่ง:</strong> {{position}}</p>
      <p><strong>หน่วยงาน:</strong> {{department}}</p>
      <p><strong>ประเภทการขอใช้งาน:</strong> {{requestType}}</p>
      <p><strong>สิทธิ์การเข้าถึงที่ขอ:</strong> {{accessPermissions}}</p>
      <p><strong>เหตุผลการขอใช้งาน:</strong> {{reason}}</p>
      <p><strong>วันที่ยื่นคำขอ:</strong> {{requestDate}}</p>
    </div>
  
    <div style="text-align: center; margin: 20px 0;">
      <a href="{{approvalLink}}" style="display: inline-block; background-color: #1a56db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">อนุมัติคำขอ</a>
      <a href="{{rejectLink}}" style="display: inline-block; background-color: #dc2626; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-left: 10px;">ไม่อนุมัติ</a>
    </div>
  
    <div style="border-left: 4px solid #fbbf24; padding: 10px 15px; background-color: #fffbeb; margin-bottom: 15px;">
      <p style="margin: 0; color: #92400e;"><strong>หมายเหตุสำคัญ:</strong> โปรดพิจารณาอนุมัติภายใน {{expiryDays}} วัน มิฉะนั้นระบบจะถือว่าคำขอนี้ถูกปฏิเสธโดยอัตโนมัติ</p>
    </div>
  
    <div style="border-top: 1px solid #e0e0e0; padding-top: 15px; margin-top: 20px; color: #6b7280; text-align: center;">
      <p>ระบบ e-office | โทร: {{supportTel}} | อีเมล: {{supportEmail}}</p>
    </div>
  </div>`,
      variables: [
        'requestId', 'directorName', 'requesterName', 'position', 'department', 
        'requestType', 'accessPermissions', 'reason', 'requestDate', 
        'approvalLink', 'rejectLink', 'expiryDays', 'supportTel', 'supportEmail'
      ],
      isHtml: true,
      categoryId: 3
    },
    
    // 3. ผู้อำนวยการศูนย์อนุมัติ
    {
      id: 303,
      name: 'แจ้งการขออนุมัติใช้งานระบบ e-office ถึงผู้อำนวยการศูนย์',
      subject: 'ขออนุมัติการใช้งานระบบ e-office (ขั้นสุดท้าย) - {{requestId}}',
      content: `เรียน {{centerDirectorName}},
  
  มีคำขอใช้งานระบบ e-office ที่ผ่านการอนุมัติขั้นต้นจากผู้อำนวยการกองแล้ว และรอการอนุมัติขั้นสุดท้ายจากท่าน โดยมีรายละเอียดดังนี้:
  
  - เลขที่คำขอ: {{requestId}}
  - ผู้ขอใช้งาน: {{requesterName}}
  - ตำแหน่ง: {{position}}
  - หน่วยงาน: {{department}}
  - ประเภทการขอใช้งาน: {{requestType}}
  - สิทธิ์การเข้าถึงที่ขอ: {{accessPermissions}}
  - เหตุผลการขอใช้งาน: {{reason}}
  - ผ่านการอนุมัติจาก: {{directorName}} (ผู้อำนวยการกอง)
  - วันที่อนุมัติขั้นต้น: {{firstApprovalDate}}
  - ความเห็นของผู้อำนวยการกอง: {{directorComment}}
  
  ในฐานะผู้อำนวยการศูนย์เทคโนโลยีสารสนเทศ กรุณาพิจารณาอนุมัติการใช้งานระบบ e-office ตามรายละเอียดข้างต้น โดยคลิกที่ลิงก์ด้านล่าง:
  
  เพื่ออนุมัติ: {{approvalLink}}
  เพื่อปฏิเสธ: {{rejectLink}}
  
  หมายเหตุ: การอนุมัติจากท่านจะเป็นการอนุมัติขั้นสุดท้าย ก่อนที่เจ้าหน้าที่จะดำเนินการสร้างบัญชีผู้ใช้งานระบบ e-office ต่อไป
  
  ขอแสดงความนับถือ,
  ทีมงานระบบ e-office`,
      variables: [
        'requestId', 'centerDirectorName', 'requesterName', 'position', 'department', 
        'requestType', 'accessPermissions', 'reason', 'directorName', 
        'firstApprovalDate', 'directorComment', 'approvalLink', 'rejectLink'
      ],
      isHtml: false,
      categoryId: 3
    },
    
    // 4. ผู้ดำเนินการ
    {
      id: 304,
      name: 'แจ้งให้เจ้าหน้าที่ดำเนินการสร้างบัญชีผู้ใช้ระบบ e-office',
      subject: 'แจ้งให้ดำเนินการสร้างบัญชีผู้ใช้ระบบ e-office - {{requestId}}',
      content: `เรียน {{adminName}},
  
  มีคำขอใช้งานระบบ e-office ที่ผ่านการอนุมัติครบทุกขั้นตอนแล้ว และรอการดำเนินการสร้างบัญชีผู้ใช้จากท่าน โดยมีรายละเอียดดังนี้:
  
  - เลขที่คำขอ: {{requestId}}
  - ผู้ขอใช้งาน: {{requesterName}}
  - เลขประจำตัวประชาชน: {{nationalId}}
  - ตำแหน่ง: {{position}}
  - หน่วยงาน: {{department}}
  - อีเมล: {{email}}
  - โทรศัพท์: {{phone}}
  - ประเภทการขอใช้งาน: {{requestType}}
  - สิทธิ์การเข้าถึงที่ขอ: {{accessPermissions}}
  - กลุ่มผู้ใช้งาน (User Group): {{userGroup}}
  - แผนกงาน (Department Code): {{departmentCode}}
  - สายการบังคับบัญชา (Report To): {{reportTo}}
  - วันที่ยื่นคำขอ: {{requestDate}}
  - วันที่อนุมัติขั้นสุดท้าย: {{finalApprovalDate}}
  
  กรุณาดำเนินการสร้างบัญชีผู้ใช้งานระบบ e-office ตามรายละเอียดข้างต้น และกำหนดสิทธิ์การเข้าถึงตามที่ได้รับอนุมัติ
  
  เมื่อดำเนินการเสร็จสิ้น กรุณาอัปเดตสถานะคำขอและบันทึกข้อมูลบัญชีผู้ใช้ผ่านทางระบบ:
  {{adminActionLink}}
  
  ขอแสดงความนับถือ,
  ระบบแจ้งเตือนอัตโนมัติ`,
      variables: [
        'requestId', 'adminName', 'requesterName', 'nationalId', 'position', 
        'department', 'email', 'phone', 'requestType', 'accessPermissions', 
        'userGroup', 'departmentCode', 'reportTo', 'requestDate', 
        'finalApprovalDate', 'adminActionLink'
      ],
      isHtml: false,
      categoryId: 3
    },
    
    // 5. แจ้งผลการดำเนินการให้ผู้ร้องขอทราบ
    {
      id: 305,
      name: 'แจ้งผลการสร้างบัญชีผู้ใช้ระบบ e-office แก่ผู้ร้องขอ',
      subject: 'แจ้งผลการสร้างบัญชีผู้ใช้ระบบ e-office - {{requestId}}',
      content: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="/api/placeholder/200/80" alt="Logo" width="200" height="80" />
      <h2 style="color: #1a56db; margin-top: 15px;">การสร้างบัญชีผู้ใช้ระบบ e-office เสร็จสมบูรณ์</h2>
    </div>
  
    <p style="margin-bottom: 15px;">เรียน {{requesterName}},</p>
  
    <p style="margin-bottom: 15px;">คำขอใช้งานระบบ e-office ของท่าน (เลขที่คำขอ: <strong>{{requestId}}</strong>) ได้รับการอนุมัติและดำเนินการสร้างบัญชีผู้ใช้งานเรียบร้อยแล้ว</p>
  
    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
      <h3 style="color: #1f2937; margin-top: 0;">ข้อมูลบัญชีผู้ใช้งานของท่าน</h3>
      <p style="margin-bottom: 8px;"><strong>ชื่อผู้ใช้งาน (Username):</strong> {{username}}</p>
      <p style="margin-bottom: 8px;"><strong>รหัสผ่านชั่วคราว:</strong> {{temporaryPassword}}</p>
      <p style="margin-bottom: 8px;"><strong>URL สำหรับเข้าสู่ระบบ:</strong> <a href="{{systemUrl}}" style="color: #1a56db;">{{systemUrl}}</a></p>
      <p style="margin-bottom: 8px;"><strong>สิทธิ์การเข้าถึงที่ได้รับ:</strong> {{accessPermissions}}</p>
      <p style="margin-bottom: 0;"><strong>กลุ่มผู้ใช้งาน:</strong> {{userGroup}}</p>
    </div>
  
    <div style="border-left: 4px solid #fbbf24; padding: 10px 15px; background-color: #fffbeb; margin-bottom: 15px;">
      <p style="margin: 0; color: #92400e;"><strong>หมายเหตุสำคัญ:</strong> กรุณาเปลี่ยนรหัสผ่านของท่านในการเข้าสู่ระบบครั้งแรก โดยรหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 8 ตัวอักษร ประกอบด้วยตัวอักษรพิมพ์ใหญ่ พิมพ์เล็ก ตัวเลข และอักขระพิเศษ</p>
    </div>
  
    <h3 style="color: #1f2937;">คู่มือการใช้งานเบื้องต้น</h3>
    <ol style="margin-bottom: 20px;">
      <li style="margin-bottom: 8px;">เข้าสู่ระบบด้วยชื่อผู้ใช้และรหัสผ่านที่ได้รับ</li>
      <li style="margin-bottom: 8px;">เปลี่ยนรหัสผ่านชั่วคราวของท่าน</li>
      <li style="margin-bottom: 8px;">กรอกข้อมูลส่วนตัวให้ครบถ้วน</li>
      <li style="margin-bottom: 8px;">เริ่มต้นใช้งานระบบตามสิทธิ์ที่ได้รับ</li>
    </ol>
  
    <p style="margin-bottom: 15px;">สามารถดาวน์โหลดคู่มือการใช้งานฉบับเต็มได้ที่: <a href="{{userManualLink}}" style="color: #1a56db;">คู่มือการใช้งานระบบ e-office</a></p>
  
    <p style="margin-bottom: 15px;">หากท่านมีข้อสงสัยหรือต้องการความช่วยเหลือ กรุณาติดต่อเจ้าหน้าที่ IT Support ที่เบอร์ {{supportTel}} หรืออีเมล {{supportEmail}}</p>
  
    <div style="border-top: 1px solid #e0e0e0; padding-top: 15px; margin-top: 20px; font-size: 12px; color: #6b7280; text-align: center;">
      <p style="margin-bottom: 5px;">ทีมงานระบบ e-office</p>
      <p style="margin-bottom: 5px;">อีเมลฉบับนี้เป็นการแจ้งเตือนอัตโนมัติ กรุณาอย่าตอบกลับ</p>
      <p style="margin-bottom: 0;">© {{currentYear}} ลิขสิทธิ์โดยหน่วยงานของท่าน</p>
    </div>
  </div>`,
      variables: [
        'requestId', 'requesterName', 'username', 'temporaryPassword', 'systemUrl', 
        'accessPermissions', 'userGroup', 'userManualLink', 'supportTel', 
        'supportEmail', 'currentYear'
      ],
      isHtml: true,
      categoryId: 3
    },
    
    // 6. แจ้งเตือนให้ผู้ใช้เปลี่ยนรหัสผ่าน
    {
      id: 306,
      name: 'แจ้งเตือนให้เปลี่ยนรหัสผ่านระบบ e-office',
      subject: 'แจ้งเตือน: กรุณาเปลี่ยนรหัสผ่านระบบ e-office',
      content: `เรียน {{username}},
  
  ระบบขอแจ้งเตือนให้ท่านเปลี่ยนรหัสผ่านระบบ e-office เนื่องจากรหัสผ่านของท่านจะหมดอายุในอีก {{daysRemaining}} วัน
  
  รายละเอียด:
  - ชื่อผู้ใช้: {{username}}
  - วันที่รหัสผ่านหมดอายุ: {{passwordExpiryDate}}
  
  กรุณาเปลี่ยนรหัสผ่านโดยเร็วที่สุด โดยทำตามขั้นตอนต่อไปนี้:
  1. เข้าสู่ระบบ e-office ที่ {{systemUrl}}
  2. ไปที่เมนู "ข้อมูลส่วนตัว" หรือ "การตั้งค่า"
  3. เลือกเมนู "เปลี่ยนรหัสผ่าน"
  4. กรอกรหัสผ่านปัจจุบันและรหัสผ่านใหม่ตามที่ระบบกำหนด
  
  ข้อกำหนดรหัสผ่าน:
  - ความยาวอย่างน้อย 8 ตัวอักษร
  - ประกอบด้วยตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว
  - ประกอบด้วยตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว
  - ประกอบด้วยตัวเลขอย่างน้อย 1 ตัว
  - ประกอบด้วยอักขระพิเศษอย่างน้อย 1 ตัว (เช่น !@#$%^&*)
  - ต้องไม่ซ้ำกับรหัสผ่าน 5 ครั้งล่าสุด
  
  หากไม่เปลี่ยนรหัสผ่านภายในระยะเวลาที่กำหนด บัญชีของท่านจะถูกระงับการใช้งานชั่วคราว
  
  หากมีข้อสงสัยหรือต้องการความช่วยเหลือ กรุณาติดต่อ Help Desk ที่เบอร์ {{helpDeskTel}} หรืออีเมล {{helpDeskEmail}}
  
  ขอแสดงความนับถือ,
  ทีมงานระบบ e-office`,
      variables: [
        'username', 'daysRemaining', 'passwordExpiryDate', 'systemUrl',
        'helpDeskTel', 'helpDeskEmail'
      ],
      isHtml: false,
      categoryId: 3
    }
    ,
    {
        id: 307,
        name: 'แจ้งผลการไม่อนุมัติคำขอใช้งานระบบ e-office จากผู้อำนวยการกอง',
        subject: 'ไม่อนุมัติคำขอใช้งานระบบ e-office - {{requestId}}',
        content: `เรียน {{requesterName}},
      
      คำขอใช้งานระบบ e-office ของท่าน (เลขที่คำขอ: {{requestId}}) ไม่ได้รับการอนุมัติจากผู้อำนวยการกอง
      
      รายละเอียดคำขอ:
      - ชื่อ-นามสกุล: {{requesterName}}
      - ตำแหน่ง: {{position}}
      - หน่วยงาน: {{department}}
      - ประเภทการขอใช้งาน: {{requestType}}
      - สิทธิ์การเข้าถึงที่ขอ: {{accessPermissions}}
      - วันที่ยื่นคำขอ: {{requestDate}}
      - เหตุผลการขอใช้งาน: {{reason}}
      
      เหตุผลการไม่อนุมัติ:
      {{rejectReason}}
      
      หากท่านมีข้อสงสัยหรือต้องการข้อมูลเพิ่มเติม กรุณาติดต่อเจ้าหน้าที่ระบบ e-office ที่เบอร์ {{supportTel}} หรืออีเมล {{supportEmail}}
      
      หากท่านประสงค์จะยื่นคำขอใหม่ โปรดดำเนินการผ่านระบบ โดยแก้ไขข้อมูลตามคำแนะนำของผู้อำนวยการกอง
      
      ขอแสดงความนับถือ,
      ทีมงานระบบ e-office`,
        variables: ['requestId', 'requesterName', 'position', 'department', 'requestType', 'accessPermissions', 'requestDate', 'reason', 'rejectReason', 'supportTel', 'supportEmail'],
        isHtml: false,
        categoryId: 3
      },
      {
        id: 308,
        name: 'แจ้งผลการไม่อนุมัติคำขอใช้งานระบบ e-office จากผู้อำนวยการศูนย์',
        subject: 'ไม่อนุมัติคำขอใช้งานระบบ e-office (ขั้นสุดท้าย) - {{requestId}}',
        content: `เรียน {{requesterName}},
      
      คำขอใช้งานระบบ e-office ของท่าน (เลขที่คำขอ: {{requestId}}) ไม่ได้รับการอนุมัติในขั้นตอนสุดท้ายจากผู้อำนวยการศูนย์เทคโนโลยีสารสนเทศ
      
      รายละเอียดคำขอ:
      - ชื่อ-นามสกุล: {{requesterName}}
      - ตำแหน่ง: {{position}}
      - หน่วยงาน: {{department}}
      - ประเภทการขอใช้งาน: {{requestType}}
      - สิทธิ์การเข้าถึงที่ขอ: {{accessPermissions}}
      - ผ่านการอนุมัติจาก: {{directorName}} (ผู้อำนวยการกอง)
      - วันที่อนุมัติขั้นต้น: {{firstApprovalDate}}
      
      เหตุผลการไม่อนุมัติในขั้นสุดท้าย:
      {{rejectReason}}
      
      ข้อเสนอแนะเพิ่มเติม:
      {{additionalSuggestion}}
      
      หากท่านมีข้อสงสัยหรือต้องการข้อมูลเพิ่มเติม กรุณาติดต่อเจ้าหน้าที่ระบบ e-office ที่เบอร์ {{supportTel}} หรืออีเมล {{supportEmail}}
      
      หากท่านประสงค์จะยื่นคำขอใหม่ โปรดดำเนินการผ่านระบบ และแก้ไขตามข้อเสนอแนะที่ได้รับ
      
      ขอแสดงความนับถือ,
      ทีมงานระบบ e-office`,
        variables: ['requestId', 'requesterName', 'position', 'department', 'requestType', 'accessPermissions', 'directorName', 'firstApprovalDate', 'rejectReason', 'additionalSuggestion', 'supportTel', 'supportEmail'],
        isHtml: false,
        categoryId: 3
      },
      {
        id: 309,
        name: 'แจ้งผลการไม่อนุมัติคำขอใช้งานระบบ e-office (HTML)',
        subject: 'ไม่อนุมัติคำขอใช้งานระบบ e-office - {{requestId}}',
        content: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="/api/placeholder/200/80" alt="Logo" width="200" height="80" />
          <h2 style="color: #dc2626; margin-top: 15px;">คำขอใช้งานระบบ e-office ไม่ได้รับการอนุมัติ</h2>
        </div>
      
        <p style="margin-bottom: 15px;">เรียน {{requesterName}},</p>
      
        <p style="margin-bottom: 15px;">เราขอแจ้งให้ทราบว่า คำขอใช้งานระบบ e-office ของท่าน (เลขที่คำขอ: <strong>{{requestId}}</strong>) ไม่ได้รับการอนุมัติ โดยมีรายละเอียดดังนี้</p>
      
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
          <h3 style="color: #1f2937; margin-top: 0;">รายละเอียดคำขอ</h3>
          <p style="margin-bottom: 8px;"><strong>ชื่อ-นามสกุล:</strong> {{requesterName}}</p>
          <p style="margin-bottom: 8px;"><strong>ตำแหน่ง:</strong> {{position}}</p>
          <p style="margin-bottom: 8px;"><strong>หน่วยงาน:</strong> {{department}}</p>
          <p style="margin-bottom: 8px;"><strong>ประเภทการขอใช้งาน:</strong> {{requestType}}</p>
          <p style="margin-bottom: 8px;"><strong>สิทธิ์การเข้าถึงที่ขอ:</strong> {{accessPermissions}}</p>
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
      
        <p style="margin-bottom: 15px;">หากท่านประสงค์จะยื่นคำขอใหม่ กรุณาแก้ไขข้อมูลตามข้อเสนอแนะที่ได้รับ โดยสามารถคลิกที่ปุ่มด้านล่างเพื่อเริ่มดำเนินการ:</p>
        <div style="text-align: center; margin-bottom: 20px;">
          <a href="{{newRequestLink}}" style="display: inline-block; background-color: #1a56db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">ยื่นคำขอใหม่</a>
        </div>
      
        <p style="margin-bottom: 15px;">หากท่านมีข้อสงสัยหรือต้องการความช่วยเหลือเพิ่มเติม กรุณาติดต่อเจ้าหน้าที่ระบบ e-office ที่เบอร์ {{supportTel}} หรืออีเมล {{supportEmail}}</p>
      
        <div style="border-top: 1px solid #e0e0e0; padding-top: 15px; margin-top: 20px; font-size: 12px; color: #6b7280; text-align: center;">
          <p style="margin-bottom: 5px;">ทีมงานระบบ e-office</p>
          <p style="margin-bottom: 5px;">อีเมลฉบับนี้เป็นการแจ้งเตือนอัตโนมัติ กรุณาอย่าตอบกลับ</p>
          <p style="margin-bottom: 0;">© {{currentYear}} ลิขสิทธิ์โดยหน่วยงานของท่าน</p>
        </div>
      </div>`,
        variables: ['requestId', 'requesterName', 'position', 'department', 'requestType', 'accessPermissions', 'requestDate', 'rejectByPerson', 'rejectReason', 'additionalSuggestion', 'newRequestLink', 'supportTel', 'supportEmail', 'currentYear'],
        isHtml: true,
        categoryId: 3
      },
      {
        id: 310,
        name: 'แจ้งให้แก้ไขข้อมูลคำขอใช้งานระบบ e-office',
        subject: 'กรุณาแก้ไขข้อมูลคำขอใช้งานระบบ e-office - {{requestId}}',
        content: `เรียน {{requesterName}},
      
      คำขอใช้งานระบบ e-office ของท่าน (เลขที่คำขอ: {{requestId}}) ได้รับการพิจารณาจากผู้บังคับบัญชาแล้ว แต่ยังมีข้อมูลบางส่วนที่ต้องการให้ท่านแก้ไขหรือให้ข้อมูลเพิ่มเติม ก่อนที่จะดำเนินการในขั้นตอนถัดไป
      
      รายละเอียดคำขอ:
      - ชื่อ-นามสกุล: {{requesterName}}
      - ตำแหน่ง: {{position}}
      - หน่วยงาน: {{department}}
      - ประเภทการขอใช้งาน: {{requestType}}
      - สิทธิ์การเข้าถึงที่ขอ: {{accessPermissions}}
      - วันที่ยื่นคำขอ: {{requestDate}}
      
      ข้อมูลที่ต้องการให้แก้ไขหรือเพิ่มเติม:
      {{editRequirement}}
      
      คำแนะนำในการปรับปรุงคำขอ:
      {{editSuggestion}}
      
      กรุณาแก้ไขข้อมูลตามที่ระบุไว้ข้างต้น ผ่านระบบโดยคลิกที่ลิงก์ด้านล่าง:
      {{editLink}}
      
      หากท่านมีข้อสงสัยหรือต้องการข้อมูลเพิ่มเติม กรุณาติดต่อเจ้าหน้าที่ระบบ e-office ที่เบอร์ {{supportTel}} หรืออีเมล {{supportEmail}}
      
      ขอแสดงความนับถือ,
      ทีมงานระบบ e-office`,
        variables: ['requestId', 'requesterName', 'position', 'department', 'requestType', 'accessPermissions', 'requestDate', 'editRequirement', 'editSuggestion', 'editLink', 'supportTel', 'supportEmail'],
        isHtml: false,
        categoryId: 3
      }
  ];
  
  // ข้อมูลตัวอย่างสำหรับการแทนที่ตัวแปรใน Preview
  export const eofficeSampleData = {
    requestId: 'EOFF-20250405-0078',
    requesterName: 'นายสุรชัย ทองดี',
    nationalId: 'X-XXXX-XXXXX-XX-X',
    position: 'นักวิชาการ',
    department: 'กองพัฒนาระบบดิจิทัล',
    phone: '081-987-6543',
    email: 'surachai.t@example.gov.th',
    requestType: 'สร้างบัญชีผู้ใช้ใหม่',
    accessPermissions: 'ผู้ใช้งานทั่วไป (สามารถเข้าถึงงานสารบรรณและการประชุม)',
    reason: 'ต้องการใช้งานระบบเพื่อดำเนินงานด้านสารบรรณอิเล็กทรอนิกส์และการจัดการประชุมออนไลน์',
    statusLink: 'https://eoffice.example.gov.th/status/EOFF-20250405-0078',
    supportTel: '02-345-6789',
    supportEmail: 'eoffice-support@example.gov.th',
    directorName: 'นางสมศรี บริหารดี',
    requestDate: '5 เมษายน 2568',
    approvalLink: 'https://eoffice.example.gov.th/approve/EOFF-20250405-0078/abcdef123456',
    rejectLink: 'https://eoffice.example.gov.th/reject/EOFF-20250405-0078/abcdef123456',
    expiryDays: '5',
    centerDirectorName: 'นายวิสิทธิ์ เทคโนโลยี',
    firstApprovalDate: '7 เมษายน 2568',
    directorComment: 'อนุมัติตามคำขอ เนื่องจากเป็นบุคลากรใหม่ที่ต้องใช้งานระบบในการปฏิบัติงาน',
    adminName: 'นางสาวศิริพร ผู้ดูแลระบบ',
    userGroup: 'Document_Users',
    departmentCode: 'DEV-123',
    reportTo: 'นางสมศรี บริหารดี',
    finalApprovalDate: '8 เมษายน 2568',
    adminActionLink: 'https://eoffice.example.gov.th/admin/complete/EOFF-20250405-0078',
    username: 'surachai.t',
    temporaryPassword: 'Temp@78925',
    systemUrl: 'https://eoffice.example.gov.th',
    userManualLink: 'https://eoffice.example.gov.th/manual/user_manual.pdf',
    currentYear: '2568',
    daysRemaining: '7',
    passwordExpiryDate: '15 พฤษภาคม 2568',
    helpDeskTel: '02-345-6789 ต่อ 1234',
    helpDeskEmail: 'helpdesk@example.gov.th'
  };