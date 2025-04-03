import { Calendar, ChevronDown, ChevronUp, Database, Download, Eye, FileText, Filter, Search, UserCheck, X } from 'lucide-react';
import React, { useState } from 'react';
import HistoryDetailModal from './HistoryDetailModal';

const HistoryDashboard = () => {
  // สร้างข้อมูลตัวอย่าง
  const sampleData = [
    {
      id: 1,
      timestamp: '01/04/2025 09:30:45',
      action: 'INSERT',
      tableName: 'cgd_users_master',
      idCard: '1234567890123',
      name: 'นายทดสอบ ระบบ',
      actorName: 'admin',
      division: 'สำนักงานเลขานุการกรม',
      department: 'กลุ่มงานบริหารทั่วไป',
      position: 'นักวิชาการคอมพิวเตอร์',
      positionLevel: 'ชำนาญการพิเศษ'
    },
    {
      id: 4,
      timestamp: '31/03/2025 14:22:30',
      action: 'UPDATE',
      tableName: 'cgd_users_master',
      idCard: '1111122222333',
      name: 'นางสาวปรับปรุง ข้อมูล',
      actorName: 'supervisor',
      division: 'กองบริหารการคลัง',
      department: 'กลุ่มงานการเงิน',
      position: 'นักวิชาการเงินและบัญชี',
      positionLevel: 'ชำนาญการ'
    },
    {
      id: 6,
      timestamp: '02/04/2025 13:15:40',
      action: 'UPDATE',
      tableName: 'cgd_menus_master_hist',
      idCard: '-', 
      name: 'รายงานประจำเดือน',
      actorName: 'admin',
      menuCode: 'RPT001'
    },
    {
      id: 7,
      timestamp: '28/03/2025 09:20:15',
      action: 'UPDATE',
      tableName: 'cgd_menus_master_hist',
      idCard: '-',
      name: 'รายงานทั่วไป',
      actorName: 'system_admin',
      menuCode: 'RPT001'
    },
    {
      id: 8,
      timestamp: '15/03/2025 11:30:25',
      action: 'INSERT',
      tableName: 'cgd_menus_master_hist',
      idCard: '-',
      name: 'รายงานทั่วไป',
      actorName: 'developer',
      menuCode: 'RPT001'
    },
    {
      id: 9,
      timestamp: '05/04/2025 10:15:22',
      action: 'UPDATE',
      tableName: 'cgd_users_master',
      idCard: '9876543210987',
      name: 'นางสาวทดสอบ ข้อมูล',
      actorName: 'hr_staff',
      division: 'ศูนย์เทคโนโลยีสารสนเทศ',
      department: 'กลุ่มงานพัฒนาระบบงาน',
      position: 'นักวิชาการคอมพิวเตอร์',
      positionLevel: 'ปฏิบัติการ'
    }
  ];

  const [searchParams, setSearchParams] = useState({
    dateFrom: '',
    dateTo: '',
    actionType: '',
    idCard: '',
    actor: '',
    tableName: ''
  });

  const [filteredData, setFilteredData] = useState(sampleData);
  const [advancedFilterOpen, setAdvancedFilterOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // ฟังก์ชันรีเซ็ตการค้นหา
  const resetSearch = () => {
    setSearchParams({
      dateFrom: '',
      dateTo: '',
      actionType: '',
      idCard: '',
      actor: '',
      tableName: ''
    });
    setFilteredData(sampleData);
  };

  // ฟังก์ชันการค้นหา (จำลองการกรองข้อมูล)
  const handleSearch = () => {
    let results = [...sampleData];
    
    if (searchParams.tableName) {
      results = results.filter(item => item.tableName === searchParams.tableName);
    }
    
    if (searchParams.actionType) {
      results = results.filter(item => item.action === searchParams.actionType);
    }
    
    if (searchParams.idCard && searchParams.tableName === 'cgd_users_master') {
      results = results.filter(item => item.idCard.includes(searchParams.idCard));
    }
    
    if (searchParams.actor) {
      results = results.filter(item => item.actorName.includes(searchParams.actor));
    }
    
    setFilteredData(results);
  };

  // ฟังก์ชันดูรายละเอียด
  const viewDetails = (record) => {
    setSelectedRecord(record);
  };

  // ฟังก์ชันปิดหน้าต่างรายละเอียด
  const closeDetails = () => {
    setSelectedRecord(null);
  };

  // แสดงชื่อตารางให้เป็นภาษาไทยที่อ่านง่าย
  const getTableNameThai = (tableName) => {
    switch(tableName) {
      case 'cgd_users_master':
        return 'ข้อมูลผู้ใช้งาน';
      case 'cgd_menus_master_hist':
        return 'ข้อมูลเมนูระบบ';
      default:
        return tableName;
    }
  };

  // ตรวจสอบว่าเป็นตารางข้อมูลเมนูหรือไม่
  const isMenuTable = (tableName) => {
    return tableName === 'cgd_menus_master_hist';
  };

  // ตรวจสอบว่าเป็นตารางข้อมูลผู้ใช้หรือไม่
  const isUserTable = (tableName) => {
    return tableName === 'cgd_users_master';
  };

  // ตรวจสอบว่าในผลลัพธ์มีข้อมูลเมนูหรือไม่
  const hasMenuData = filteredData.some(item => isMenuTable(item.tableName));

  // ตรวจสอบว่าในผลลัพธ์มีข้อมูลทั่วไป (ไม่ใช่เมนู) หรือไม่
  const hasNonMenuData = filteredData.some(item => !isMenuTable(item.tableName));

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      {/* <header className="bg-blue-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <h1 className="text-2xl font-bold">ระบบจัดการประวัติการเปลี่ยนแปลงข้อมูล</h1>
        </div>
      </header> */}
      
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">ค้นหาประวัติการเปลี่ยนแปลง</h2>
            <button 
              className="flex items-center text-blue-600 hover:text-blue-800" 
              onClick={() => setAdvancedFilterOpen(!advancedFilterOpen)}
            >
              <Filter size={16} className="mr-1" />
              {advancedFilterOpen ? 'ซ่อนตัวกรองขั้นสูง' : 'แสดงตัวกรองขั้นสูง'}
              {advancedFilterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center border rounded p-2">
              <Calendar size={18} className="text-gray-400 mr-2" />
              <input 
                type="date" 
                placeholder="วันที่เริ่มต้น" 
                className="w-full focus:outline-none"
                value={searchParams.dateFrom}
                onChange={(e) => setSearchParams({...searchParams, dateFrom: e.target.value})}
              />
            </div>
            <div className="flex items-center border rounded p-2">
              <Calendar size={18} className="text-gray-400 mr-2" />
              <input 
                type="date" 
                placeholder="วันที่สิ้นสุด" 
                className="w-full focus:outline-none"
                value={searchParams.dateTo}
                onChange={(e) => setSearchParams({...searchParams, dateTo: e.target.value})}
              />
            </div>
            
            {/* แสดงช่องค้นหาเลขบัตรเฉพาะเมื่อเลือก "ข้อมูลผู้ใช้งาน" */}
            {searchParams.tableName === 'cgd_users_master' && (
              <div className="flex items-center border rounded p-2">
                <Search size={18} className="text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="เลขประจำตัวประชาชน" 
                  className="w-full focus:outline-none"
                  value={searchParams.idCard}
                  onChange={(e) => setSearchParams({...searchParams, idCard: e.target.value})}
                />
              </div>
            )}
            
            {/* แสดงช่องว่างเมื่อไม่ได้เลือก "ข้อมูลผู้ใช้งาน" */}
            {searchParams.tableName !== 'cgd_users_master' && (
              <div className="flex items-center border rounded p-2 opacity-0">
                {/* ช่องว่างสำหรับรักษา grid layout */}
              </div>
            )}
          </div>
          
          {advancedFilterOpen && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center border rounded p-2">
                <FileText size={18} className="text-gray-400 mr-2" />
                <select 
                  className="w-full focus:outline-none bg-white"
                  value={searchParams.actionType}
                  onChange={(e) => setSearchParams({...searchParams, actionType: e.target.value})}
                >
                  <option value="">-- ประเภทการกระทำทั้งหมด --</option>
                  <option value="INSERT">เพิ่มข้อมูล (INSERT)</option>
                  <option value="UPDATE">แก้ไขข้อมูล (UPDATE)</option>
                  <option value="DELETE">ลบข้อมูล (DELETE)</option>
                </select>
              </div>
              <div className="flex items-center border rounded p-2">
                <UserCheck size={18} className="text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="ผู้ดำเนินการ" 
                  className="w-full focus:outline-none"
                  value={searchParams.actor}
                  onChange={(e) => setSearchParams({...searchParams, actor: e.target.value})}
                />
              </div>
              <div className="flex items-center border rounded p-2">
                <Database size={18} className="text-gray-400 mr-2" />
                <select 
                  className="w-full focus:outline-none bg-white"
                  value={searchParams.tableName}
                  onChange={(e) => setSearchParams({...searchParams, tableName: e.target.value, idCard: ''})} // ล้างข้อมูลเลขบัตรเมื่อเปลี่ยนตาราง
                >
                  <option value="">-- ตารางทั้งหมด --</option>
                  <option value="cgd_users_master">ข้อมูลผู้ใช้งาน</option>
                  <option value="cgd_menus_master_hist">ข้อมูลเมนูระบบ</option>
                </select>
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            <button 
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 flex items-center"
              onClick={resetSearch}
            >
              <X size={16} className="mr-1" />
              ล้างการค้นหา
            </button>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
              onClick={handleSearch}
            >
              <Search size={16} className="mr-1" />
              ค้นหา
            </button>
          </div>
        </div>
        
        {/* Results */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              ผลการค้นหา ({filteredData.length} รายการ)
              {searchParams.tableName ? ` - ${getTableNameThai(searchParams.tableName)}` : ' - ทุกตาราง'}
            </h2>
            <button className="text-blue-600 hover:text-blue-800 flex items-center">
              <Download size={16} className="mr-1" />
              ส่งออกรายงาน
            </button>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            {/* กรณีที่เลือกเฉพาะตารางข้อมูลเมนู หรือผลลัพธ์ทั้งหมดมีแต่ข้อมูลเมนู */}
            {(searchParams.tableName === 'cgd_menus_master_hist' || 
             (searchParams.tableName === '' && hasMenuData && !hasNonMenuData)) && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่และเวลา</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">การกระทำ</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ตาราง</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">รหัสเมนู</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อเมนู</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ผู้ดำเนินการ</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${item.action === 'INSERT' ? 'bg-green-100 text-green-800' : 
                            item.action === 'UPDATE' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {item.action === 'INSERT' ? 'เพิ่ม' : 
                           item.action === 'UPDATE' ? 'แก้ไข' : 'ลบ'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getTableNameThai(item.tableName)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.menuCode || "RPT001"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.actorName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                          onClick={() => viewDetails(item)}
                        >
                          <Eye size={16} className="mr-1" />
                          ดูรายละเอียด
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* กรณีที่เลือกตารางข้อมูลผู้ใช้งาน หรือผลลัพธ์ทั้งหมดเป็นข้อมูลผู้ใช้งาน */}
            {(searchParams.tableName === 'cgd_users_master' || 
             (searchParams.tableName === '' && hasNonMenuData && !hasMenuData)) && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่และเวลา</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">การกระทำ</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ตาราง</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">เลขประจำตัว</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อ-นามสกุล</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ตำแหน่ง</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สังกัด</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ผู้ดำเนินการ</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.filter(item => !isMenuTable(item.tableName)).map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${item.action === 'INSERT' ? 'bg-green-100 text-green-800' : 
                            item.action === 'UPDATE' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {item.action === 'INSERT' ? 'เพิ่ม' : 
                           item.action === 'UPDATE' ? 'แก้ไข' : 'ลบ'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getTableNameThai(item.tableName)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.idCard}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.position} {item.positionLevel}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.division}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.actorName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                          onClick={() => viewDetails(item)}
                        >
                          <Eye size={16} className="mr-1" />
                          ดูรายละเอียด
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            
            {/* กรณีที่มีทั้งข้อมูลเมนูและข้อมูลผู้ใช้งานปนกัน (เช่น ค้นหาทุกตาราง) */}
            {searchParams.tableName === '' && hasMenuData && hasNonMenuData && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่และเวลา</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">การกระทำ</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ตาราง</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">รหัสเมนู/เลขประจำตัว</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อ</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ตำแหน่ง/สังกัด</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ผู้ดำเนินการ</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${item.action === 'INSERT' ? 'bg-green-100 text-green-800' : 
                            item.action === 'UPDATE' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {item.action === 'INSERT' ? 'เพิ่ม' : 
                           item.action === 'UPDATE' ? 'แก้ไข' : 'ลบ'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getTableNameThai(item.tableName)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {isMenuTable(item.tableName) ? (item.menuCode || "RPT001") : item.idCard}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {isUserTable(item.tableName) ? 
                          `${item.position || ''} ${item.positionLevel || ''} / ${item.division || ''}` : 
                          "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.actorName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                          onClick={() => viewDetails(item)}
                        >
                          <Eye size={16} className="mr-1" />
                          ดูรายละเอียด
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-700">
                แสดง <span className="font-medium">1</span> ถึง{' '}
                <span className="font-medium">{filteredData.length}</span>{' '}
                จากทั้งหมด <span className="font-medium">{filteredData.length}</span> รายการ
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500">
                  ก่อนหน้า
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500">
                  ถัดไป
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>
      
      {/* Modal แสดงรายละเอียด */}
      {selectedRecord && (
        <HistoryDetailModal 
          record={selectedRecord} 
          onClose={closeDetails} 
          getTableNameThai={getTableNameThai}
        />
      )}
    </div>
  );
};

export default HistoryDashboard;