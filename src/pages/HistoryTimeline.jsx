import { Calendar, ChevronDown, ChevronUp, Clock, User } from 'lucide-react';
import React, { useState } from 'react';

const HistoryTimeline = ({ records, tableName }) => {
  const [expandedHistory, setExpandedHistory] = useState(true);
  const [expandedItems, setExpandedItems] = useState([0]);
  const [showAllHistory, setShowAllHistory] = useState(false);
  
  // จำนวนรายการที่แสดงเมื่อไม่กดดูทั้งหมด
  const initialVisibleCount = 3;
  
  // ตรวจสอบว่าเป็นตารางเมนูหรือไม่
  const isMenuTable = tableName === 'cgd_menus_master_hist';
  
  // ถ้าไม่มีรายการประวัติ
  if (records.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        ไม่พบประวัติการแก้ไข
      </div>
    );
  }
  
  // ฟังก์ชันสำหรับ toggle การขยาย/ยุบรายการ
  const toggleItem = (index) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter(item => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };
  
  // ฟังก์ชันสำหรับ toggle การแสดง/ซ่อนประวัติทั้งหมด
  const toggleHistory = () => {
    setExpandedHistory(!expandedHistory);
  };
  
  // ฟังก์ชันสำหรับ toggle การแสดงประวัติทั้งหมด/บางส่วน
  const toggleShowAllHistory = () => {
    setShowAllHistory(!showAllHistory);
  };
  
  // รายการประวัติที่แสดง
  const visibleRecords = showAllHistory ? records : records.slice(0, initialVisibleCount);
  
  // แสดงรายละเอียดการเปลี่ยนแปลงตามตาราง
  const renderItemDetails = (item) => {
    const getBgColorClass = (action) => {
      switch(action) {
        case 'INSERT': return 'green';
        case 'UPDATE': return 'yellow';
        case 'DELETE': return 'red';
        default: return 'gray';
      }
    };
    
    const bgColor = getBgColorClass(item.action);
    
    // ฟังก์ชันกรองฟิลด์ตามประเภทตาราง
    const filterRelevantChanges = (changes) => {
      if (!changes) return [];
      
      // กรณีตารางเมนู ไม่ต้องแสดงข้อมูลเกี่ยวกับ idCard และข้อมูลผู้ใช้ส่วนบุคคล
      if (isMenuTable) {
        return changes.filter(change => 
          !['เลขประจำตัวประชาชน', 'รหัสบัตรประชาชน', 'วันเกิด'].includes(change.field)
        );
      }
      
      return changes;
    };
    
    // กรองเฉพาะฟิลด์ที่เกี่ยวข้อง
    const relevantChanges = filterRelevantChanges(item.changes);
    
    return (
      <div className="ml-8 mb-3 border-l-2 border-gray-200 pl-4">
        <div className={`bg-${bgColor}-50 border border-${bgColor}-200 rounded-md p-3`}>
          {relevantChanges && relevantChanges.length > 0 ? (
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left text-sm font-medium text-gray-500 pb-2">ฟิลด์</th>
                  <th className="text-left text-sm font-medium text-gray-500 pb-2">ค่าเดิม</th>
                  <th className="text-left text-sm font-medium text-gray-500 pb-2">ค่าใหม่</th>
                </tr>
              </thead>
              <tbody>
                {relevantChanges.map((change, changeIndex) => (
                  <tr key={changeIndex} className="border-t border-gray-200">
                    <td className="py-2 pr-4 font-medium">{change.field}</td>
                    <td className="py-2 pr-4 text-red-600">
                      {change.oldValue || '-'}
                    </td>
                    <td className="py-2 text-green-600">
                      {change.newValue || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-gray-500">ไม่มีรายละเอียดการเปลี่ยนแปลง</p>
          )}
        </div>
      </div>
    );
  };
  
  // รูปแบบการแสดงประเภทการกระทำ
  const getActionText = (action) => {
    switch(action) {
      case 'INSERT': return 'เพิ่มข้อมูล';
      case 'UPDATE': return 'แก้ไขข้อมูล';
      case 'DELETE': return 'ลบข้อมูล';
      default: return action;
    }
  };
  
  return (
    <>
      {/* ส่วนหัวประวัติ */}
      <div 
        className="flex justify-between items-center mb-4 cursor-pointer border-b pb-2"
        onClick={toggleHistory}
      >
        <h3 className="text-md font-semibold">ประวัติการแก้ไข</h3>
        <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
          {expandedHistory ? (
            <>
              <ChevronUp size={16} className="mr-1" />
              ซ่อนประวัติ
            </>
          ) : (
            <>
              <ChevronDown size={16} className="mr-1" />
              แสดงประวัติ
            </>
          )}
        </button>
      </div>
      
      {/* Timeline */}
      {expandedHistory && (
        <div className="ml-2">
          {visibleRecords.map((item, index) => (
            <div key={item.id || index} className="relative pb-6">
              {/* เส้น Timeline */}
              {(index < visibleRecords.length - 1 || !showAllHistory && records.length > initialVisibleCount) && (
                <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-gray-200"></div>
              )}
              
              {/* หัวข้อ Timeline */}
              <div 
                className="flex cursor-pointer mb-2"
                onClick={() => toggleItem(index)}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 ${
                  item.action === 'INSERT' ? 'bg-green-500' : 
                  item.action === 'UPDATE' ? 'bg-blue-500' : 'bg-red-500'
                } text-white z-10`}>
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">
                      ครั้งที่ {records.length - index} 
                      {index === 0 ? ' (ล่าสุด)' : ''}
                      {' - ' + getActionText(item.action)}
                      
                      {/* แสดงข้อมูลเฉพาะของเมนูหรือของผู้ใช้ */}
                      {isMenuTable && item.changes && item.changes.some(c => c.field === 'ชื่อเมนู') ? 
                        ` - ${item.changes.find(c => c.field === 'ชื่อเมนู').newValue}` : ''}
                      
                      {!isMenuTable && item.changes && item.changes.some(c => c.field === 'ชื่อ-นามสกุล') ? 
                        ` - ${item.changes.find(c => c.field === 'ชื่อ-นามสกุล').newValue}` : ''}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {expandedItems.includes(index) ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 flex items-center mt-1">
                    <Calendar size={14} className="mr-1" />
                    <span className="mr-3">{item.date || (item.timestamp && item.timestamp.split(' ')[0])}</span>
                    <Clock size={14} className="mr-1" />
                    <span className="mr-3">{item.time || (item.timestamp && item.timestamp.split(' ')[1])}</span>
                    <User size={14} className="mr-1" />
                    <span>{item.actor || item.actorName}</span>
                  </div>
                </div>
              </div>
              
              {/* รายละเอียดการเปลี่ยนแปลง */}
              {expandedItems.includes(index) && renderItemDetails(item)}
            </div>
          ))}
          
          {/* ปุ่มแสดงข้อมูลเพิ่มเติม */}
          {!showAllHistory && records.length > initialVisibleCount && (
            <div 
              className="flex items-center justify-center text-blue-600 cursor-pointer py-2"
              onClick={toggleShowAllHistory}
            >
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                <ChevronDown size={14} />
              </div>
              <span>แสดงประวัติการแก้ไขเพิ่มเติม ({records.length - initialVisibleCount} รายการ)</span>
            </div>
          )}
          
          {/* ปุ่มย่อข้อมูล เมื่อแสดงทั้งหมดแล้ว */}
          {showAllHistory && records.length > initialVisibleCount && (
            <div 
              className="flex items-center justify-center text-blue-600 cursor-pointer py-2"
              onClick={toggleShowAllHistory}
            >
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                <ChevronUp size={14} />
              </div>
              <span>แสดงน้อยลง</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HistoryTimeline;