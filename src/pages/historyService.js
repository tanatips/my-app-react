// ไฟล์นี้จะเป็นส่วนสำหรับการเรียกใช้ API ในการดึงข้อมูลประวัติการเปลี่ยนแปลง
// ในตัวอย่างนี้เป็นเพียงการจำลองข้อมูลเท่านั้น ในระบบจริงคุณจะใช้ API จริง

/**
 * ดึงข้อมูลประวัติการเปลี่ยนแปลงของรายการ
 * @param {string} _recordId - ID ของรายการที่ต้องการดึงประวัติ
 * @param {string} tableName - ชื่อตารางของรายการ
 * @returns {Promise<Array>} - ข้อมูลประวัติการเปลี่ยนแปลง
 */
export const fetchHistoryRecords = async (_recordId, tableName) => {
    // จำลองการดึงข้อมูลจาก API
    await new Promise(resolve => setTimeout(resolve, 800)); // จำลองการดีเลย์ของเน็ตเวิร์ค
    
    // ข้อมูลตัวอย่างสำหรับการทดสอบ
    const mockHistoryData = {
      'cgd_users_master': [
        {
          id: 1,
          timestamp: '01/04/2025 14:22:30',
          action: 'UPDATE',
          actor: 'supervisor',
          changes: [
            { field: 'อีเมล', oldValue: 'old@example.com', newValue: 'new@example.com' },
            { field: 'เบอร์โทรศัพท์', oldValue: '089-876-5432', newValue: '089-123-4567' }
          ]
        },
        {
          id: 2,
          timestamp: '25/03/2025 10:15:22',
          action: 'UPDATE',
          actor: 'admin',
          changes: [
            { field: 'สถานะ', oldValue: 'ปิดใช้งาน', newValue: 'เปิดใช้งาน' }
          ]
        },
        {
          id: 3,
          timestamp: '20/03/2025 09:30:45',
          action: 'UPDATE',
          actor: 'system',
          changes: [
            { field: 'รหัสบัตรประชาชน', oldValue: '1111111111111', newValue: '1234567890123' }
          ]
        },
        {
          id: 4,
          timestamp: '15/03/2025 16:45:12',
          action: 'UPDATE',
          actor: 'hr_manager',
          changes: [
            { field: 'ตำแหน่ง', oldValue: 'นักวิชาการคอมพิวเตอร์ ปฏิบัติการ', newValue: 'นักวิชาการคอมพิวเตอร์ ชำนาญการพิเศษ' },
            { field: 'สำนัก/กอง', oldValue: 'ศูนย์เทคโนโลยีสารสนเทศ', newValue: 'สำนักงานเลขานุการกรม' }
          ]
        },
        {
          id: 5,
          timestamp: '10/03/2025 11:20:35',
          action: 'UPDATE',
          actor: 'personnel_admin',
          changes: [
            { field: 'กลุ่ม/ฝ่าย', oldValue: 'กลุ่มงานพัฒนาระบบ', newValue: 'กลุ่มงานบริหารทั่วไป' }
          ]
        },
        {
          id: 6,
          timestamp: '05/03/2025 08:30:50',
          action: 'UPDATE',
          actor: 'manager',
          changes: [
            { field: 'ชื่อ-นามสกุล', oldValue: 'นายทดสอบ เก่า', newValue: 'นายทดสอบ ระบบ' }
          ]
        },
        {
          id: 7,
          timestamp: '01/03/2025 08:15:00',
          action: 'INSERT',
          actor: 'admin',
          changes: [
            { field: 'ชื่อ-นามสกุล', oldValue: '', newValue: 'นายทดสอบ เก่า' },
            { field: 'รหัสบัตรประชาชน', oldValue: '', newValue: '1111111111111' },
            { field: 'อีเมล', oldValue: '', newValue: 'test@example.com' },
            { field: 'เบอร์โทรศัพท์', oldValue: '', newValue: '089-888-8888' },
            { field: 'ตำแหน่ง', oldValue: '', newValue: 'นักวิชาการคอมพิวเตอร์ ปฏิบัติการ' },
            { field: 'สำนัก/กอง', oldValue: '', newValue: 'ศูนย์เทคโนโลยีสารสนเทศ' },
            { field: 'กลุ่ม/ฝ่าย', oldValue: '', newValue: 'กลุ่มงานพัฒนาระบบ' }
          ]
        }
      ],
      'cgd_stg_employee_upload': [
        {
          id: 1,
          timestamp: '01/04/2025 11:05:10',
          action: 'DELETE',
          actor: 'manager',
          changes: [
            { field: 'ชื่อไฟล์', oldValue: 'employee_data_2025.xlsx', newValue: '' },
            { field: 'สถานะ', oldValue: 'COMPLETED', newValue: '' }
          ]
        },
        {
          id: 2,
          timestamp: '31/03/2025 08:30:20',
          action: 'UPDATE',
          actor: 'system',
          changes: [
            { field: 'สถานะ', oldValue: 'PENDING', newValue: 'COMPLETED' },
            { field: 'ผลการตรวจสอบ', oldValue: 'กำลังตรวจสอบ', newValue: 'ผ่านการตรวจสอบ' }
          ]
        },
        {
          id: 3,
          timestamp: '30/03/2025 17:40:10',
          action: 'INSERT',
          actor: 'hr_staff',
          changes: [
            { field: 'ชื่อไฟล์', oldValue: '', newValue: 'employee_data_2025.xlsx' },
            { field: 'รหัสชุดข้อมูล', oldValue: '', newValue: 'BATCH-2025-001' },
            { field: 'สถานะ', oldValue: '', newValue: 'PENDING' }
          ]
        }
      ],
      'cgd_menus_master_hist': [
        {
          id: 1,
          timestamp: '02/04/2025 13:15:40',
          action: 'UPDATE',
          actor: 'admin',
          changes: [
            { field: 'สถานะเมนู', oldValue: 'ปิดใช้งาน', newValue: 'เปิดใช้งาน' },
            { field: 'ลำดับการแสดงผล', oldValue: '10', newValue: '5' }
          ]
        },
        {
          id: 2,
          timestamp: '28/03/2025 09:20:15',
          action: 'UPDATE',
          actor: 'system_admin',
          changes: [
            { field: 'ชื่อเมนู', oldValue: 'รายงานทั่วไป', newValue: 'รายงานประจำเดือน' },
            { field: 'ไอคอน', oldValue: 'icon-report', newValue: 'icon-monthly-report' }
          ]
        },
        {
          id: 3,
          timestamp: '15/03/2025 11:30:25',
          action: 'INSERT',
          actor: 'developer',
          changes: [
            { field: 'รหัสเมนู', oldValue: '', newValue: 'RPT001' },
            { field: 'ชื่อเมนู', oldValue: '', newValue: 'รายงานทั่วไป' },
            { field: 'URL', oldValue: '', newValue: '/reports/general' },
            { field: 'ไอคอน', oldValue: '', newValue: 'icon-report' },
            { field: 'เมนูหลัก', oldValue: '', newValue: 'รายงาน' },
            { field: 'สถานะเมนู', oldValue: '', newValue: 'ปิดใช้งาน' }
          ]
        }
      ]
    };
    
    // ส่งคืนข้อมูลตามตารางที่ร้องขอ
    return mockHistoryData[tableName] || [];
  };
  
  /**
   * บันทึกการเปลี่ยนแปลงข้อมูล
   * @param {object} record - ข้อมูลที่มีการเปลี่ยนแปลง
   * @param {string} action - ประเภทการกระทำ (INSERT, UPDATE, DELETE)
   * @param {Array} changes - รายการเปลี่ยนแปลง
   * @returns {Promise<boolean>} - ผลลัพธ์การบันทึก
   */
  export const saveHistoryRecord = async (record, action, changes) => {
    // จำลองการบันทึกข้อมูลลง API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // ในระบบจริง คุณจะส่งข้อมูลไปยัง API เพื่อบันทึกลงฐานข้อมูล
    console.log('บันทึกประวัติการเปลี่ยนแปลง:', { record, action, changes });
    
    return true;
  };
  
  /**
   * ดาวน์โหลดรายงานประวัติการเปลี่ยนแปลง
   * @param {object} _filters - เงื่อนไขการกรองข้อมูล
   * @param {string} _format - รูปแบบไฟล์ที่ต้องการดาวน์โหลด (PDF, Excel)
   * @returns {Promise<string>} - URL สำหรับดาวน์โหลดรายงาน
   */
  export const downloadHistoryReport = async (_filters, _format = 'Excel') => {
    // จำลองการสร้างรายงาน
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // ในระบบจริง จะส่งคืน URL สำหรับดาวน์โหลดไฟล์
    return 'https://example.com/download/history-report.xlsx';
  };