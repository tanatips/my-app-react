import { ArrowLeft, Calendar, ChevronDown, ChevronUp, Clock, User } from 'lucide-react';
import React, { useState } from 'react';

const HistoryTimelineView = () => {
  const [expandedHistory, setExpandedHistory] = useState(false);
  const [expandedItems, setExpandedItems] = useState([0]);
  const [showAllHistory, setShowAllHistory] = useState(false);
  
  // ตัวอย่างข้อมูลประวัติการแก้ไข
  const historyData = [
    {
      id: 1,
      date: '01/04/2025',
      time: '14:22:30',
      actor: 'supervisor',
      action: 'UPDATE',
      changes: [
        { field: 'อีเมล', oldValue: 'old@example.com', newValue: 'new@example.com' },
        { field: 'เบอร์โทรศัพท์', oldValue: '089-876-5432', newValue: '089-123-4567' }
      ]
    },
    {
      id: 2,
      date: '25/03/2025',
      time: '10:15:22',
      actor: 'admin',
      action: 'UPDATE',
      changes: [
        { field: 'สถานะ', oldValue: 'ปิดใช้งาน', newValue: 'เปิดใช้งาน' }
      ]
    },
    {
      id: 3,
      date: '20/03/2025',
      time: '09:30:45',
      actor: 'system',
      action: 'UPDATE',
      changes: [
        { field: 'ที่อยู่', oldValue: '123 ถ.เก่า', newValue: '456 ถ.ใหม่' },
        { field: 'ตำแหน่ง', oldValue: 'พนักงาน', newValue: 'หัวหน้าแผนก' }
      ]
    },
    {
      id: 4,
      date: '15/03/2025',
      time: '16:45:12',
      actor: 'hr_staff',
      action: 'UPDATE',
      changes: [
        { field: 'เงินเดือน', oldValue: '30,000 บาท', newValue: '32,000 บาท' }
      ]
    },
    {
      id: 5,
      date: '01/03/2025',
      time: '08:15:00',
      actor: 'manager',
      action: 'INSERT',
      changes: [
        { field: 'ชื่อ-นามสกุล', oldValue: '', newValue: 'นายทดสอบ ระบบ' },
        { field: 'เลขประจำตัวประชาชน', oldValue: '', newValue: '1234567890123' },
        { field: 'อีเมล', oldValue: '', newValue: 'test@example.com' },
        { field: 'เบอร์โทรศัพท์', oldValue: '', newValue: '089-888-8888' }
      ]
    }
  ];
  
  // จำนวนรายการที่แสดงเมื่อไม่กดดูทั้งหมด
  const initialVisibleCount = 3;
  
  // ฟังก์ชันสำหรับ toggle การขยาย/ยุบรายการ
  const toggleItem = (index) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter(item => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };
  
  // ฟังก์ชันสำหรับ toggle การแสดงประวัติทั้งหมด
  const toggleHistory = () => {
    setExpandedHistory(!expandedHistory);
  };
  
  // ฟังก์ชันสำหรับ toggle การแสดงประวัติทั้งหมด
  const toggleShowAllHistory = () => {
    setShowAllHistory(!showAllHistory);
  };
  
  // รายการประวัติที่แสดง
  const visibleHistory = showAllHistory ? historyData : historyData.slice(0, initialVisibleCount);
  
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-8 px-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-4xl">
        {/* ส่วนหัว */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-blue-700 text-white rounded-t-lg">
          <div className="flex items-center">
            <ArrowLeft className="mr-2 cursor-pointer" size={20} />
            <h3 className="text-lg font-semibold">รายละเอียดประวัติการแก้ไขข้อมูล</h3>
          </div>
          <div className="text-sm">
            รหัสอ้างอิง: #USER12345
          </div>
        </div>
        
        {/* ข้อมูลหลัก */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold">นายทดสอบ ระบบ</h2>
              <p className="text-gray-600">เลขประจำตัวประชาชน: 1234567890123</p>
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              มีการแก้ไขทั้งหมด {historyData.length} ครั้ง
            </div>
          </div>
          
          {/* ข้อมูลปัจจุบัน */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-semibold">ข้อมูลปัจจุบัน</h3>
              <span className="text-xs text-gray-500">อัพเดทล่าสุด: {historyData[0].date} {historyData[0].time}</span>
            </div>
            <div className="bg-gray-50 border rounded-md p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">ชื่อ-นามสกุล</p>
                  <p className="font-medium">นายทดสอบ ระบบ</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">เลขประจำตัวประชาชน</p>
                  <p className="font-medium">1234567890123</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">อีเมล</p>
                  <p className="font-medium">new@example.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">เบอร์โทรศัพท์</p>
                  <p className="font-medium">089-123-4567</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ที่อยู่</p>
                  <p className="font-medium">456 ถ.ใหม่</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ตำแหน่ง</p>
                  <p className="font-medium">หัวหน้าแผนก</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">เงินเดือน</p>
                  <p className="font-medium">32,000 บาท</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">สถานะ</p>
                  <p className="font-medium">เปิดใช้งาน</p>
                </div>
              </div>
            </div>
          </div>
          
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
              {visibleHistory.map((item, index) => (
                <div key={item.id} className="relative pb-6">
                  {/* เส้น Timeline */}
                  {(index < visibleHistory.length - 1 || !showAllHistory && historyData.length > initialVisibleCount) && (
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
                          ครั้งที่ {historyData.length - index} 
                          {index === 0 ? ' (ล่าสุด)' : ''}
                          {item.action === 'INSERT' ? ' - เพิ่มข้อมูล' : 
                           item.action === 'UPDATE' ? ' - แก้ไขข้อมูล' : ' - ลบข้อมูล'}
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
                        <span className="mr-3">{item.date}</span>
                        <Clock size={14} className="mr-1" />
                        <span className="mr-3">{item.time}</span>
                        <User size={14} className="mr-1" />
                        <span>{item.actor}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* รายละเอียดการเปลี่ยนแปลง */}
                  {expandedItems.includes(index) && (
                    <div className="ml-8 mb-3 border-l-2 border-gray-200 pl-4">
                      <div className={`bg-${
                        item.action === 'INSERT' ? 'green' : 
                        item.action === 'UPDATE' ? 'yellow' : 'red'
                      }-50 border border-${
                        item.action === 'INSERT' ? 'green' : 
                        item.action === 'UPDATE' ? 'yellow' : 'red'
                      }-200 rounded-md p-3`}>
                        {item.changes.length > 0 ? (
                          <table className="min-w-full">
                            <thead>
                              <tr>
                                <th className="text-left text-sm font-medium text-gray-500 pb-2">ฟิลด์</th>
                                <th className="text-left text-sm font-medium text-gray-500 pb-2">ค่าเดิม</th>
                                <th className="text-left text-sm font-medium text-gray-500 pb-2">ค่าใหม่</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.changes.map((change, changeIndex) => (
                                <tr key={changeIndex} className={`border-t border-${
                                  item.action === 'INSERT' ? 'green' : 
                                  item.action === 'UPDATE' ? 'yellow' : 'red'
                                }-200`}>
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
                  )}
                </div>
              ))}
              
              {/* ปุ่มแสดงข้อมูลเพิ่มเติม */}
              {!showAllHistory && historyData.length > initialVisibleCount && (
                <div 
                  className="flex items-center justify-center text-blue-600 cursor-pointer py-2"
                  onClick={toggleShowAllHistory}
                >
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                    <ChevronDown size={14} />
                  </div>
                  <span>แสดงประวัติการแก้ไขเพิ่มเติม ({historyData.length - initialVisibleCount} รายการ)</span>
                </div>
              )}
              
              {/* ปุ่มย่อข้อมูล เมื่อแสดงทั้งหมดแล้ว */}
              {showAllHistory && historyData.length > initialVisibleCount && (
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
        </div>
      </div>
    </div>
  );
};

export default HistoryTimelineView;