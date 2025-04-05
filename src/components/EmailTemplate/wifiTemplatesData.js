// wifiTemplatesData.js
// ข้อมูลเทมเพลตอีเมลสำหรับหมวดหมู่ "ขอใช้งาน Wifi"

export const wifiTemplates = [
    // 1. ผู้ร้องขอใช้งาน
    {
      id: 201,
      name: 'แจ้งสถานะคำขอใช้งาน WiFi',
      subject: 'แจ้งการรับคำขอใช้งาน WiFi - {{requestId}}',
      content: `เรียน {{requesterName}},
  
  คำขอใช้งาน WiFi ของท่าน (เลขที่คำขอ: {{requestId}}) ได้รับการบันทึกเข้าระบบเรียบร้อยแล้ว
  
  รายละเอียดคำขอ:
  - ชื่อ-นามสกุล: {{requesterName}}
  - รหัสพนักงาน: {{employeeId}}
  - แผนก/ฝ่าย: {{department}}
  - อุปกรณ์ที่ต้องการใช้งาน: {{deviceType}}
  - Mac Address: {{macAddress}}
  - ระยะเวลาที่ขอใช้งาน: {{startDate}} ถึง {{endDate}}
  - เหตุผลการขอใช้งาน: {{reason}}
  
  คำขอของท่านอยู่ระหว่างการพิจารณาอนุมัติจากผู้บังคับบัญชา ท่านสามารถติดตามสถานะคำขอได้ที่ {{statusLink}} หรือรอรับการแจ้งเตือนผ่านทางอีเมล
  
  หากมีข้อสงสัย สามารถติดต่อเจ้าหน้าที่ IT Support ได้ที่เบอร์ {{supportTel}}
  
  ขอแสดงความนับถือ,
  ฝ่าย IT Support`,
      variables: [
        'requestId', 'requesterName', 'employeeId', 'department', 'deviceType', 
        'macAddress', 'startDate', 'endDate', 'reason', 'statusLink', 'supportTel'
      ],
      isHtml: false,
      categoryId: 2,
      step: 1 // ขั้นตอน 1: แจ้งผู้ร้องขอ
    },
    
    // 2. ผู้อำนวยการกองอนุมัติ
    {
      id: 202,
      name: 'แจ้งการขออนุมัติใช้งาน WiFi ถึงผู้อำนวยการกอง',
      subject: 'ขออนุมัติการใช้งาน WiFi - {{requestId}}',
      content: `เรียน {{directorName}},
  
  มีคำขอใช้งาน WiFi จากบุคลากรในสังกัดของท่าน โดยมีรายละเอียดดังนี้:
  
  - เลขที่คำขอ: {{requestId}}
  - ชื่อผู้ขอใช้งาน: {{requesterName}}
  - รหัสพนักงาน: {{employeeId}}
  - แผนก/ฝ่าย: {{department}}
  - ตำแหน่ง: {{position}}
  - อุปกรณ์ที่ต้องการใช้งาน: {{deviceType}}
  - Mac Address: {{macAddress}}
  - ระยะเวลาที่ขอใช้งาน: {{startDate}} ถึง {{endDate}}
  - เหตุผลการขอใช้งาน: {{reason}}
  
  กรุณาดำเนินการอนุมัติคำขอผ่านทางระบบ โดยคลิกที่ลิงก์ด้านล่าง:
  {{approvalLink}}
  
  หากไม่ดำเนินการภายใน {{expiryDays}} วัน ระบบจะยกเลิกคำขอนี้โดยอัตโนมัติ
  
  ขอแสดงความนับถือ,
  ฝ่าย IT Support`,
      variables: [
        'requestId', 'directorName', 'requesterName', 'employeeId', 'department', 
        'position', 'deviceType', 'macAddress', 'startDate', 'endDate', 'reason', 
        'approvalLink', 'expiryDays'
      ],
      isHtml: false,
      categoryId: 2,
      step: 2 // ขั้นตอน 2: แจ้งผู้อนุมัติขั้นต้น
    },
    
    // 3. ผู้อำนวยการศูนย์อนุมัติ
    {
      id: 203,
      name: 'แจ้งการขออนุมัติใช้งาน WiFi ถึงผู้อำนวยการศูนย์',
      subject: 'ขออนุมัติการใช้งาน WiFi (ขั้นสุดท้าย) - {{requestId}}',
      content: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="color: #1a56db;">คำขออนุมัติการใช้งาน WiFi</h2>
    </div>
  
    <p>เรียน {{centerDirectorName}},</p>
  
    <p>มีคำขอใช้งาน WiFi ที่ผ่านการอนุมัติขั้นต้นจากผู้อำนวยการกองแล้ว และกำลังรอการอนุมัติขั้นสุดท้ายจากท่าน</p>
  
    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
      <h3 style="color: #1f2937; margin-top: 0;">รายละเอียดคำขอ</h3>
      <p><strong>เลขที่คำขอ:</strong> {{requestId}}</p>
      <p><strong>ผู้ขอใช้งาน:</strong> {{requesterName}}</p>
      <p><strong>แผนก/ฝ่าย:</strong> {{department}}</p>
      <p><strong>อุปกรณ์:</strong> {{deviceType}}</p>
      <p><strong>Mac Address:</strong> {{macAddress}}</p>
      <p><strong>ระยะเวลาการใช้งาน:</strong> {{startDate}} ถึง {{endDate}}</p>
      <p><strong>เหตุผล:</strong> {{reason}}</p>
      <p><strong>ผ่านการอนุมัติจาก:</strong> {{directorName}} (ผู้อำนวยการกอง)</p>
      <p><strong>วันที่อนุมัติขั้นต้น:</strong> {{firstApprovalDate}}</p>
    </div>
  
    <div style="text-align: center; margin: 20px 0;">
      <a href="{{approvalLink}}" style="display: inline-block; background-color: #1a56db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">อนุมัติคำขอ</a>
      <a href="{{rejectLink}}" style="display: inline-block; background-color: #dc2626; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-left: 10px;">ไม่อนุมัติ</a>
    </div>
  
    <p>หมายเหตุ: การอนุมัติจากท่านจะเป็นการอนุมัติขั้นสุดท้าย ก่อนที่เจ้าหน้าที่จะดำเนินการตั้งค่า WiFi ให้ผู้ใช้งาน</p>
  
    <div style="border-top: 1px solid #e0e0e0; padding-top: 15px; margin-top: 20px; color: #6b7280; text-align: center;">
      <p>ฝ่าย IT Support | โทร: {{supportTel}} | อีเมล: {{supportEmail}}</p>
    </div>
  </div>`,
      variables: [
        'requestId', 'centerDirectorName', 'requesterName', 'department', 'deviceType', 
        'macAddress', 'startDate', 'endDate', 'reason', 'directorName', 
        'firstApprovalDate', 'approvalLink', 'rejectLink', 'supportTel', 'supportEmail'
      ],
      isHtml: true,
      categoryId: 2,
      step: 3 // ขั้นตอน 3: แจ้งผู้อนุมัติขั้นสุดท้าย
    },
    
    // 4. ผู้ดำเนินการ
    {
      id: 204,
      name: 'แจ้งให้เจ้าหน้าที่ดำเนินการตั้งค่า WiFi',
      subject: 'แจ้งให้ดำเนินการตั้งค่า WiFi - {{requestId}}',
      content: `เรียน {{adminName}},
  
  มีคำขอใช้งาน WiFi ที่ผ่านการอนุมัติครบทุกขั้นตอนแล้ว และรอการดำเนินการตั้งค่าจากท่าน โดยมีรายละเอียดดังนี้:
  
  - เลขที่คำขอ: {{requestId}}
  - ชื่อผู้ขอใช้งาน: {{requesterName}}
  - รหัสพนักงาน: {{employeeId}}
  - แผนก/ฝ่าย: {{department}}
  - อาคาร/ชั้น: {{building}}
  - เบอร์โทรศัพท์: {{phone}}
  - อีเมล: {{email}}
  - อุปกรณ์ที่ต้องการใช้งาน: {{deviceType}}
  - Mac Address: {{macAddress}}
  - IP Address ที่กำหนด (ถ้ามี): {{ipAddress}}
  - กลุ่มผู้ใช้งาน: {{userGroup}}
  - ระยะเวลาที่ขอใช้งาน: {{startDate}} ถึง {{endDate}}
  - ประเภทการเข้าถึง: {{accessType}}
  
  กรุณาดำเนินการตั้งค่า WiFi ตามรายละเอียดข้างต้น และแจ้งรหัสผ่านและวิธีการเชื่อมต่อกลับไปยังผู้ขอใช้งานเมื่อดำเนินการเรียบร้อยแล้ว
  
  เมื่อดำเนินการเสร็จสิ้น กรุณาอัปเดตสถานะคำขอผ่านทางระบบ:
  {{adminActionLink}}
  
  ขอแสดงความนับถือ,
  ระบบแจ้งเตือนอัตโนมัติ`,
      variables: [
        'requestId', 'adminName', 'requesterName', 'employeeId', 'department', 
        'building', 'phone', 'email', 'deviceType', 'macAddress', 'ipAddress', 
        'userGroup', 'startDate', 'endDate', 'accessType', 'adminActionLink'
      ],
      isHtml: false,
      categoryId: 2,
      step: 4 // ขั้นตอน 4: แจ้งผู้ดำเนินการ
    },
    
    // 5. แจ้งผลการดำเนินการให้ผู้ร้องขอทราบ
    {
      id: 205,
      name: 'แจ้งผลการตั้งค่า WiFi แก่ผู้ร้องขอ',
      subject: 'แจ้งผลการตั้งค่า WiFi และวิธีการเชื่อมต่อ - {{requestId}}',
      content: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="/api/placeholder/200/80" alt="Logo" width="200" height="80" />
      <h2 style="color: #1a56db; margin-top: 15px;">การตั้งค่า WiFi เสร็จสมบูรณ์</h2>
    </div>
  
    <p style="margin-bottom: 15px;">เรียน {{requesterName}},</p>
  
    <p style="margin-bottom: 15px;">คำขอใช้งาน WiFi ของท่าน (เลขที่คำขอ: <strong>{{requestId}}</strong>) ได้รับการอนุมัติและดำเนินการตั้งค่าเรียบร้อยแล้ว ท่านสามารถใช้งาน WiFi ได้ตั้งแต่วันที่ {{startDate}} ถึง {{endDate}}</p>
  
    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
      <h3 style="color: #1f2937; margin-top: 0;">ข้อมูลการเชื่อมต่อ WiFi</h3>
      <p style="margin-bottom: 8px;"><strong>ชื่อเครือข่าย (SSID):</strong> {{networkName}}</p>
      <p style="margin-bottom: 8px;"><strong>รหัสผ่าน:</strong> {{wifiPassword}}</p>
      <p style="margin-bottom: 8px;"><strong>วิธีการเชื่อมต่อ:</strong> {{authMethod}}</p>
      <p style="margin-bottom: 8px;"><strong>อุปกรณ์ที่ลงทะเบียน:</strong> {{deviceType}} ({{macAddress}})</p>
      <p style="margin-bottom: 0;"><strong>ประเภทการเข้าถึง:</strong> {{accessType}}</p>
    </div>
  
    <div style="border-left: 4px solid #fbbf24; padding: 10px 15px; background-color: #fffbeb; margin-bottom: 15px;">
      <p style="margin: 0; color: #92400e;"><strong>หมายเหตุสำคัญ:</strong> ห้ามเผยแพร่รหัสผ่าน WiFi ให้กับบุคคลอื่น เพื่อรักษาความปลอดภัยของระบบเครือข่าย</p>
    </div>
  
    <h3 style="color: #1f2937;">วิธีการเชื่อมต่อ</h3>
    <ol style="margin-bottom: 20px;">
      <li style="margin-bottom: 8px;">เปิดการตั้งค่า WiFi บนอุปกรณ์ของท่าน</li>
      <li style="margin-bottom: 8px;">เลือกชื่อเครือข่าย {{networkName}}</li>
      <li style="margin-bottom: 8px;">ป้อนรหัสผ่านตามที่ระบุไว้ข้างต้น</li>
      <li style="margin-bottom: 8px;">หากมีหน้าต่าง Login เพิ่มเติม ให้ใช้ Username: {{username}} และ Password: {{userPassword}}</li>
    </ol>
  
    <p style="margin-bottom: 15px;">หากท่านมีปัญหาในการเชื่อมต่อหรือต้องการความช่วยเหลือ กรุณาติดต่อเจ้าหน้าที่ IT Support ที่เบอร์ {{supportTel}} หรืออีเมล {{supportEmail}}</p>
  
    <div style="border-top: 1px solid #e0e0e0; padding-top: 15px; margin-top: 20px; font-size: 12px; color: #6b7280; text-align: center;">
      <p style="margin-bottom: 5px;">ฝ่าย IT Support</p>
      <p style="margin-bottom: 5px;">อีเมลฉบับนี้เป็นการแจ้งเตือนอัตโนมัติ กรุณาอย่าตอบกลับ</p>
      <p style="margin-bottom: 0;">© {{currentYear}} ลิขสิทธิ์โดยหน่วยงานของท่าน</p>
    </div>
  </div>`,
      variables: [
        'requestId', 'requesterName', 'startDate', 'endDate', 'networkName', 
        'wifiPassword', 'authMethod', 'deviceType', 'macAddress', 'accessType', 
        'username', 'userPassword', 'supportTel', 'supportEmail', 'currentYear'
      ],
      isHtml: true,
      categoryId: 2,
      step: 5 // ขั้นตอน 5: แจ้งผลการดำเนินการ
    },
    
    // 6. แจ้งเตือนการหมดอายุ WiFi
    {
      id: 206,
      name: 'แจ้งเตือนการหมดอายุ WiFi',
      subject: 'แจ้งเตือน: การใช้งาน WiFi กำลังจะหมดอายุ - {{requestId}}',
      content: `เรียน {{requesterName}},
  
  ระบบขอแจ้งให้ทราบว่า การใช้งาน WiFi ของท่านกำลังจะหมดอายุในอีก {{daysRemaining}} วัน
  
  รายละเอียด:
  - เลขที่คำขอเดิม: {{requestId}}
  - ชื่อเครือข่าย: {{networkName}}
  - อุปกรณ์: {{deviceType}} ({{macAddress}})
  - วันที่เริ่มใช้งาน: {{startDate}}
  - วันที่หมดอายุ: {{endDate}}
  
  หากท่านต้องการใช้งาน WiFi ต่อ กรุณาดำเนินการขอต่ออายุผ่านระบบภายในวันที่ {{renewalDeadline}} โดยคลิกที่ลิงก์ด้านล่าง:
  {{renewalLink}}
  
  กรณีไม่มีการต่ออายุ ระบบจะตัดการเชื่อมต่อ WiFi โดยอัตโนมัติในวันที่ {{endDate}}
  
  หากมีข้อสงสัยประการใด กรุณาติดต่อเจ้าหน้าที่ IT Support ที่เบอร์ {{supportTel}}
  
  ขอแสดงความนับถือ,
  ฝ่าย IT Support`,
      variables: [
        'requestId', 'requesterName', 'daysRemaining', 'networkName', 
        'deviceType', 'macAddress', 'startDate', 'endDate', 
        'renewalDeadline', 'renewalLink', 'supportTel'
      ],
      isHtml: false,
      categoryId: 2,
      step: 6 // ขั้นตอน 6: แจ้งเตือนการหมดอายุ
    }
  ];
  
  // ข้อมูลตัวอย่างสำหรับการแทนที่ตัวแปรใน Preview
  export const wifiSampleData = {
    requestId: 'WIFI-20250405-0045',
    requesterName: 'นางสาวนภา มั่นคง',
    employeeId: 'EMP2025045',
    department: 'ฝ่ายการตลาด',
    position: 'เจ้าหน้าที่วิเคราะห์การตลาด',
    deviceType: 'Notebook',
    macAddress: '00:1A:2B:3C:4D:5E',
    startDate: '10 เมษายน 2568',
    endDate: '9 เมษายน 2569',
    reason: 'ต้องการใช้งานเพื่อติดต่อประสานงานกับลูกค้าและทำงานนอกสถานที่',
    statusLink: 'https://example.com/wifi-status/WIFI-20250405-0045',
    supportTel: '02-123-4567',
    directorName: 'นายวิชัย ผู้บริหาร',
    approvalLink: 'https://example.com/approve/WIFI-20250405-0045/token123',
    expiryDays: '7',
    centerDirectorName: 'นายกิตติพงศ์ ผู้บริหารใหญ่',
    firstApprovalDate: '7 เมษายน 2568',
    rejectLink: 'https://example.com/reject/WIFI-20250405-0045/token123',
    supportEmail: 'it-support@example.com',
    adminName: 'นายเทคนิค ชำนาญการ',
    building: 'อาคาร A ชั้น 5',
    phone: '081-234-5678',
    email: 'napha.m@example.com',
    ipAddress: '192.168.1.150',
    userGroup: 'Marketing',
    accessType: 'Standard Access (Internet Only)',
    adminActionLink: 'https://example.com/admin/WIFI-20250405-0045/complete',
    networkName: 'CORP-WIFI',
    wifiPassword: 'WF@corp2025',
    authMethod: 'WPA2-Enterprise',
    username: 'napha.m',
    userPassword: 'Init@2025',
    currentYear: '2568',
    daysRemaining: '15',
    renewalDeadline: '25 มีนาคม 2569',
    renewalLink: 'https://example.com/renew/WIFI-20250405-0045/token456'
  };