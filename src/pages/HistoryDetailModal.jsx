import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { fetchHistoryRecords } from './historyService';
import HistoryTimeline from './HistoryTimeline';

const HistoryDetailModal = ({ record, onClose, getTableNameThai }) => {
  const [historyRecords, setHistoryRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ดึงข้อมูลประวัติเมื่อ component ถูกโหลด
  useEffect(() => {
    const loadHistoryData = async () => {
      try {
        setLoading(true);
        // ในสถานการณ์จริง จะเรียกใช้ API ในการดึงข้อมูล
        const data = await fetchHistoryRecords(record.id, record.tableName);
        setHistoryRecords(data);
      } catch (error) {
        console.error('Error loading history data:', error);
        // ในกรณีที่มีข้อผิดพลาด อาจแสดงข้อความแจ้งเตือน
      } finally {
        setLoading(false);
      }
    };
    
    loadHistoryData();
  }, [record.id, record.tableName]);
  
  // เช็คว่าเป็นตารางเมนูหรือไม่
  const isMenuTable = (tableName) => {
    return tableName === 'cgd_menus_master_hist';
  };

  // แสดงข้อมูลปัจจุบันตามประเภทตาราง
  const renderCurrentData = () => {
    const tableName = record.tableName;
    
    // กรณีเป็นตารางเมนู
    if (isMenuTable(tableName)) {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">รหัสเมนู</p>
            <p className="font-medium">{record.menuCode || "RPT001"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">ชื่อเมนู</p>
            <p className="font-medium">{record.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">URL</p>
            <p className="font-medium">/reports/general</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">สถานะ</p>
            <p className="font-medium">เปิดใช้งาน</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">ไอคอน</p>
            <p className="font-medium">icon-report</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">ประเภทเมนู</p>
            <p className="font-medium">รายงาน</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">ลำดับการแสดงผล</p>
            <p className="font-medium">5</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">เมนูหลัก</p>
            <p className="font-medium">รายงาน</p>
          </div>
        </div>
      );
    }
    
    // กรณีเป็นตารางผู้ใช้งาน
    if (tableName === 'cgd_users_master') {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">ชื่อ-นามสกุล</p>
            <p className="font-medium">{record.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">เลขประจำตัวประชาชน</p>
            <p className="font-medium">{record.idCard}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">ตำแหน่ง</p>
            <p className="font-medium">{record.position} {record.positionLevel}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">สำนัก/กอง</p>
            <p className="font-medium">{record.division}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">กลุ่ม/ฝ่าย</p>
            <p className="font-medium">{record.department}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">อีเมล</p>
            <p className="font-medium">user@example.com</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">เบอร์โทรศัพท์</p>
            <p className="font-medium">089-123-4567</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">สถานะ</p>
            <p className="font-medium">เปิดใช้งาน</p>
          </div>
        </div>
      );
    }
    
    // กรณีเป็นตารางอื่นๆ หรือไม่พบ (ตัดตาราง cgd_stg_employee_upload ออกแล้ว)
    return (
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">ชื่อ-นามสกุล</p>
          <p className="font-medium">{record.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">เลขประจำตัวประชาชน</p>
          <p className="font-medium">{record.idCard}</p>
        </div>
      </div>
    );
  };
  
  // แสดงหัวข้อของรายละเอียด
  const renderModalHeader = () => {
    const tableName = record.tableName;
    
    if (isMenuTable(tableName)) {
      return (
        <div>
          <h2 className="text-xl font-bold">{record.name}</h2>
          <p className="text-gray-600">รหัสเมนู: {record.menuCode || "RPT001"}</p>
        </div>
      );
    } else if (tableName === 'cgd_users_master') {
      return (
        <div>
          <h2 className="text-xl font-bold">{record.name}</h2>
          <p className="text-gray-600">เลขประจำตัวประชาชน: {record.idCard}</p>
          <p className="text-gray-600">{record.position} {record.positionLevel} - {record.division}</p>
        </div>
      );
    } else {
      return (
        <div>
          <h2 className="text-xl font-bold">{record.name}</h2>
          <p className="text-gray-600">เลขประจำตัวประชาชน: {record.idCard}</p>
        </div>
      );
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-auto">
        {/* ส่วนหัว Modal */}
        <div className="px-6 py-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 className="text-lg font-semibold">
            รายละเอียดประวัติการเปลี่ยนแปลง - {getTableNameThai(record.tableName)}
          </h3>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        
        {/* ข้อมูลหลัก */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            {renderModalHeader()}
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              มีการแก้ไขทั้งหมด {loading ? '...' : historyRecords.length} ครั้ง
            </div>
          </div>
          
          {/* ข้อมูลปัจจุบัน */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-semibold">ข้อมูลปัจจุบัน</h3>
              <span className="text-xs text-gray-500">
                อัพเดทล่าสุด: {historyRecords.length > 0 ? historyRecords[0].timestamp : record.timestamp}
              </span>
            </div>
            <div className="bg-gray-50 border rounded-md p-4">
              {loading ? (
                <div className="text-center py-4">กำลังโหลดข้อมูล...</div>
              ) : (
                renderCurrentData()
              )}
            </div>
          </div>
          
          {/* Timeline ประวัติการแก้ไข */}
          {loading ? (
            <div className="text-center py-4">กำลังโหลดประวัติการแก้ไข...</div>
          ) : (
            <HistoryTimeline records={historyRecords} tableName={record.tableName} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryDetailModal;