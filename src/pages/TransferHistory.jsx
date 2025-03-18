import { ChevronLeft, Clock, Download, Filter, Search, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import AuditLog from './AuditLog';

const TransferHistory = ({ onClose, personId = '12345', personName = 'นายสมคิด ป้องสมชัด' }) => {
  const [transferHistory, setTransferHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [editingTransfer, setEditingTransfer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAuditLog, setShowAuditLog] = useState(false);
  const [selectedTransferId] = useState(null);
  
  // ข้อมูลจำลองสำหรับประวัติการโอนย้าย
  const mockTransferHistory = [
    {
      id: 1,
      transferDate: '2024-09-01',
      referenceNumber: 'คำสั่ง 123/2567',
      orderEffectiveDate: '2024-09-15',
      sourceDepartment: 'สำนักงานเลขานุการกรม',
      sourceUnit: 'ฝ่ายบริหารทั่วไป',
      sourcePosition: 'หัวหน้าฝ่ายบริหารทั่วไป',
      sourcePositionLevel: 'ชำนาญการพิเศษ',
      targetDepartment: 'สำนักนโยบายและแผน',
      targetUnit: 'ฝ่ายแผนงานและงบประมาณ',
      targetPosition: 'ผู้อำนวยการฝ่าย',
      targetPositionLevel: 'ชำนาญการพิเศษ',
    },
    {
      id: 2,
      transferDate: '2022-04-01',
      referenceNumber: 'คำสั่ง 78/2565',
      orderEffectiveDate: '2022-04-15',
      sourceDepartment: 'กองการเจ้าหน้าที่',
      sourceUnit: 'ฝ่ายสรรหาและบรรจุแต่งตั้ง',
      sourcePosition: 'นักทรัพยากรบุคคล',
      sourcePositionLevel: 'ชำนาญการ',
      targetDepartment: 'สำนักงานเลขานุการกรม',
      targetUnit: 'ฝ่ายบริหารทั่วไป',
      targetPosition: 'หัวหน้าฝ่ายบริหารทั่วไป',
      targetPositionLevel: 'ชำนาญการพิเศษ',
    },
    {
      id: 3,
      transferDate: '2020-10-01',
      referenceNumber: 'คำสั่ง 45/2563',
      orderEffectiveDate: '2020-10-15',
      sourceDepartment: 'กองการเจ้าหน้าที่',
      sourceUnit: 'ฝ่ายอัตรากำลัง',
      sourcePosition: 'นักทรัพยากรบุคคล',
      sourcePositionLevel: 'ปฏิบัติการ',
      targetDepartment: 'กองการเจ้าหน้าที่',
      targetUnit: 'ฝ่ายสรรหาและบรรจุแต่งตั้ง',
      targetPosition: 'นักทรัพยากรบุคคล',
      targetPositionLevel: 'ชำนาญการ',
    },
  ];
  
  // ข้อมูลจำลองสำหรับ dropdownlist
  const departmentOptions = [
    'สำนักงานเลขานุการกรม',
    'สำนักนโยบายและแผน',
    'กองการเจ้าหน้าที่',
    'สำนักบริหารกลาง',
    'สำนักกฎหมาย',
    'สำนักพัฒนาระบบ'
  ];
  
  const unitOptions = {
    'สำนักงานเลขานุการกรม': ['ฝ่ายบริหารทั่วไป', 'ฝ่ายประชาสัมพันธ์', 'ฝ่ายสารบรรณ'],
    'สำนักนโยบายและแผน': ['ฝ่ายแผนงานและงบประมาณ', 'ฝ่ายติดตามและประเมินผล', 'ฝ่ายวิเคราะห์นโยบาย'],
    'กองการเจ้าหน้าที่': ['ฝ่ายสรรหาและบรรจุแต่งตั้ง', 'ฝ่ายอัตรากำลัง', 'ฝ่ายทะเบียนประวัติ', 'ฝ่ายพัฒนาบุคลากร'],
    'สำนักบริหารกลาง': ['ฝ่ายการคลัง', 'ฝ่ายพัสดุ', 'ฝ่ายอาคารสถานที่'],
    'สำนักกฎหมาย': ['ฝ่ายนิติการ', 'ฝ่ายคดี', 'ฝ่ายให้คำปรึกษา'],
    'สำนักพัฒนาระบบ': ['ฝ่ายพัฒนาระบบงาน', 'ฝ่ายเทคโนโลยีสารสนเทศ', 'ฝ่ายบริหารจัดการข้อมูล']
  };
  
  const positionOptions = {
    'ฝ่ายบริหารทั่วไป': ['หัวหน้าฝ่ายบริหารทั่วไป', 'เจ้าพนักงานธุรการ', 'เจ้าหน้าที่บริหารงานทั่วไป'],
    'ฝ่ายประชาสัมพันธ์': ['หัวหน้าฝ่ายประชาสัมพันธ์', 'นักประชาสัมพันธ์', 'เจ้าหน้าที่สื่อสารองค์กร'],
    'ฝ่ายสารบรรณ': ['หัวหน้าฝ่ายสารบรรณ', 'เจ้าพนักงานธุรการ'],
    'ฝ่ายแผนงานและงบประมาณ': ['ผู้อำนวยการฝ่าย', 'นักวิเคราะห์นโยบายและแผน', 'นักวิชาการงบประมาณ'],
    'ฝ่ายติดตามและประเมินผล': ['หัวหน้าฝ่าย', 'นักวิเคราะห์นโยบายและแผน'],
    'ฝ่ายวิเคราะห์นโยบาย': ['หัวหน้าฝ่าย', 'นักวิเคราะห์นโยบายและแผน'],
    'ฝ่ายสรรหาและบรรจุแต่งตั้ง': ['หัวหน้าฝ่าย', 'นักทรัพยากรบุคคล'],
    'ฝ่ายอัตรากำลัง': ['หัวหน้าฝ่าย', 'นักทรัพยากรบุคคล'],
    'ฝ่ายทะเบียนประวัติ': ['หัวหน้าฝ่าย', 'นักทรัพยากรบุคคล', 'เจ้าพนักงานธุรการ'],
    'ฝ่ายพัฒนาบุคลากร': ['หัวหน้าฝ่าย', 'นักทรัพยากรบุคคล', 'นักพัฒนาทรัพยากรบุคคล'],
    'ฝ่ายการคลัง': ['หัวหน้าฝ่าย', 'นักวิชาการเงินและบัญชี', 'เจ้าพนักงานการเงินและบัญชี'],
    'ฝ่ายพัสดุ': ['หัวหน้าฝ่าย', 'นักวิชาการพัสดุ', 'เจ้าพนักงานพัสดุ'],
    'ฝ่ายอาคารสถานที่': ['หัวหน้าฝ่าย', 'นายช่างโยธา', 'เจ้าพนักงานธุรการ'],
    'ฝ่ายนิติการ': ['หัวหน้าฝ่าย', 'นิติกร'],
    'ฝ่ายคดี': ['หัวหน้าฝ่าย', 'นิติกร'],
    'ฝ่ายให้คำปรึกษา': ['หัวหน้าฝ่าย', 'นิติกร'],
    'ฝ่ายพัฒนาระบบงาน': ['หัวหน้าฝ่าย', 'นักวิชาการคอมพิวเตอร์', 'นักวิเคราะห์ระบบ'],
    'ฝ่ายเทคโนโลยีสารสนเทศ': ['หัวหน้าฝ่าย', 'นักวิชาการคอมพิวเตอร์', 'วิศวกรคอมพิวเตอร์'],
    'ฝ่ายบริหารจัดการข้อมูล': ['หัวหน้าฝ่าย', 'นักวิชาการคอมพิวเตอร์', 'นักวิเคราะห์ข้อมูล']
  };
  
  const positionLevelOptions = ['ปฏิบัติการ', 'ชำนาญการ', 'ชำนาญการพิเศษ', 'เชี่ยวชาญ', 'ทรงคุณวุฒิ'];
  const [formData, setFormData] = useState({
    sourceUnit: '',
    targetUnit: '',
    sourcePosition: '',
    targetPosition: '',
    sourcePositionLevel: '',
    targetPositionLevel: '',
  });

  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    setFormData({
      ...formData,
      sourceUnit: '',
      targetUnit: '',
      sourcePosition: '',
      targetPosition: '',
      sourcePositionLevel: '',
      targetPositionLevel: '',
    });
    setEditingTransfer({
      ...editingTransfer,
      targetDepartment: department,
      targetUnit: '',
      targetPosition: '',
    });
  };
const handleUnitChange = (e) => {
    const unit = e.target.value;
    setFormData({
        ...formData,
        targetUnit: unit,
        targetPosition: '',
    });
    setEditingTransfer({
        ...editingTransfer,
        targetUnit: unit,
        targetPosition: '',
    });
};

const handleViewAuditLog = (transferId) => {
    setSelectedTransferId(transferId);
    setShowAuditLog(true);
};

  // จำลองการดึงข้อมูล
  useEffect(() => {
    // ในสถานการณ์จริงควรเรียกใช้ API
    const fetchTransferHistory = async () => {
      try {
        // จำลองการเรียก API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTransferHistory(mockTransferHistory);
      } catch (error) {
        console.error('Error fetching transfer history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransferHistory();
  }, []);

  // ฟังก์ชันสำหรับกรองข้อมูล
  const getFilteredHistory = () => {
    return transferHistory.filter(item => {
      const matchesSearch = 
        item.sourceDepartment.includes(searchTerm) ||
        item.targetDepartment.includes(searchTerm) ||
        item.sourcePosition.includes(searchTerm) ||
        item.targetPosition.includes(searchTerm) ||
        item.referenceNumber.includes(searchTerm);
      
      const matchesYear = filterYear ? item.transferDate.startsWith(filterYear) : true;
      
      return matchesSearch && matchesYear;
    });
  };

  // สร้าง options สำหรับ dropdown ปีที่โอนย้าย
  const getYearOptions = () => {
    const years = [...new Set(transferHistory.map(item => item.transferDate.substring(0, 4)))];
    return years.sort().reverse();
  };

  // จำลองการพิมพ์รายงาน
  const handlePrintReport = () => {
    window.alert('กำลังดาวน์โหลดรายงานประวัติการโอนย้าย...');
  };
// Mock audit logs - remove this in production

  // เปิดโหมดแก้ไข
  
  const handleSaveEdit = () => {
    // ในการใช้งานจริงควรมีการส่งคำขอไปยัง API
    const updatedHistory = transferHistory.map(item => 
      item.id === editingTransfer.id ? editingTransfer : item
    );
    setTransferHistory(updatedHistory);
    setShowEditModal(false);
    
    // แสดงข้อความยืนยัน
    window.alert('บันทึกการแก้ไขเรียบร้อยแล้ว');
  };
  
  // ยกเลิกการแก้ไข
  const handleCancelEdit = () => {
    setEditingTransfer(null);
    setShowEditModal(false);
  };

  // แปลงวันที่เป็นรูปแบบไทย
  const formatThaiDate = (dateString) => {
    const date = new Date(dateString);
    const thaiMonths = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    
    return `${date.getDate()} ${thaiMonths[date.getMonth()]} ${date.getFullYear() + 543}`;
  };

  const filteredHistory = getFilteredHistory();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white rounded-lg w-full max-w-6xl p-6 relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={onClose}
              aria-label="ย้อนกลับ"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 p-2 rounded">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12h18M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h2 className="text-xl font-semibold">ประวัติการโอนย้าย</h2>
            </div>
          </div>
          <button 
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={onClose}
            aria-label="ปิด"
          >
            <X size={24} />
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-3">
            <svg className="w-6 h-6 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-600">ชื่อ</p>
            <p className="font-semibold">{personName}</p>
            <p className="text-sm text-gray-500">รหัสพนักงาน: {personId}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-wrap justify-between mb-4 gap-2">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                className="pl-10 pr-4 py-2 border rounded w-64"
                placeholder="ค้นหา..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            
            <div className="relative">
              <select
                className="pl-10 pr-4 py-2 border rounded w-48 appearance-none"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
              >
                <option value="">ปีที่โอนย้ายทั้งหมด</option>
                {getYearOptions().map(year => (
                  <option key={year} value={year}>{parseInt(year) + 543}</option>
                ))}
              </select>
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          
          <button
            className="flex items-center space-x-1 px-4 py-2 border rounded hover:bg-gray-50"
            onClick={handlePrintReport}
          >
            <Download size={18} />
            <span>ดาวน์โหลดรายงาน</span>
          </button>
        </div>

        {/* History Table */}
        <div className="flex-grow overflow-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="text-center p-8 bg-gray-50 rounded">
              <p className="text-gray-500">ไม่พบประวัติการโอนย้ายตามเงื่อนไขที่ระบุ</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map((transfer) => (
                <Card key={transfer.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="border-b bg-gray-50 px-4 py-3 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{transfer.referenceNumber}</h3>
                        <p className="text-sm text-gray-500">
                          วันที่มีผล: {formatThaiDate(transfer.orderEffectiveDate)}
                        </p>
                      </div>
                      <div className="text-right flex items-center space-x-2">
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                          {transfer.transferDate.substring(0, 4) > 2020 ? 'โอนย้าย' : 'เลื่อนตำแหน่ง'}
                        </span>
                        {/* <button 
                          onClick={() => handleEdit(transfer)}
                          className="p-1 hover:bg-gray-200 rounded-full"
                          title="แก้ไข"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button> */}
                        <button 
                          onClick={() => handleViewAuditLog(transfer.id)}
                          className="p-1 hover:bg-gray-200 rounded-full"
                          title="ดูประวัติการแก้ไข"
                        >
                          <Clock size={18} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-6">
                      <div>
                        <h4 className="text-sm text-gray-500 font-medium mb-2">จาก</h4>
                        <div className="space-y-2">
                          <p><span className="text-gray-600">สำนัก/กอง:</span> {transfer.sourceDepartment}</p>
                          <p><span className="text-gray-600">หน่วยงาน:</span> {transfer.sourceUnit}</p>
                          <p><span className="text-gray-600">ตำแหน่ง:</span> {transfer.sourcePosition}</p>
                          <p><span className="text-gray-600">ระดับตำแหน่ง:</span> {transfer.sourcePositionLevel}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm text-gray-500 font-medium mb-2">ไปยัง</h4>
                        <div className="space-y-2">
                          <p><span className="text-gray-600">สำนัก/กอง:</span> {transfer.targetDepartment}</p>
                          <p><span className="text-gray-600">หน่วยงาน:</span> {transfer.targetUnit}</p>
                          <p><span className="text-gray-600">ตำแหน่ง:</span> {transfer.targetPosition}</p>
                          <p><span className="text-gray-600">ระดับตำแหน่ง:</span> {transfer.targetPositionLevel}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-4">
          <button 
            className="px-6 py-2 border rounded hover:bg-gray-100"
            onClick={onClose}
          >
            ปิด
          </button>
        </div>
      </div>
      
      {/* Modal แก้ไขประวัติ */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">แก้ไขประวัติการโอนย้าย</h3>
              <button 
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                onClick={handleCancelEdit}
                aria-label="ปิด"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium">หมายเลขคำสั่ง</label>
                <input 
                  type="text" 
                  className="p-2 border rounded" 
                  value={editingTransfer?.referenceNumber || ''}
                  onChange={(e) => setEditingTransfer({...editingTransfer, referenceNumber: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium">วันที่โอนย้าย</label>
                  <input 
                    type="date" 
                    className="p-2 border rounded" 
                    value={editingTransfer?.transferDate || ''}
                    onChange={(e) => setEditingTransfer({...editingTransfer, transferDate: e.target.value})}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium">วันที่มีผลคำสั่ง</label>
                  <input 
                    type="date" 
                    className="p-2 border rounded" 
                    value={editingTransfer?.orderEffectiveDate || ''}
                    onChange={(e) => setEditingTransfer({...editingTransfer, orderEffectiveDate: e.target.value})}
                  />
                </div>
              </div>
              
              <h4 className="font-medium text-gray-700 mt-2">ข้อมูลต้นทาง (ไม่สามารถแก้ไขได้)</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium">สำนัก/กอง (ต้นทาง)</label>
                  <input 
                    type="text" 
                    className="p-2 border rounded bg-gray-100" 
                    value={editingTransfer?.sourceDepartment || ''}
                    disabled
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium">หน่วยงาน (ต้นทาง)</label>
                  <input 
                    type="text" 
                    className="p-2 border rounded bg-gray-100" 
                    value={editingTransfer?.sourceUnit || ''}
                    disabled
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium">ตำแหน่ง (ต้นทาง)</label>
                  <input 
                    type="text" 
                    className="p-2 border rounded bg-gray-100" 
                    value={editingTransfer?.sourcePosition || ''}
                    disabled
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium">ระดับตำแหน่ง (ต้นทาง)</label>
                  <input 
                    type="text"
                    className="p-2 border rounded bg-gray-100" 
                    value={editingTransfer?.sourcePositionLevel || ''}
                    disabled
                  />
                </div>
              </div>
              
              <h4 className="font-medium text-gray-700 mt-2">ข้อมูลปลายทาง</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium">สำนัก/กอง (ปลายทาง)</label>
                  <select 
                    className="p-2 border rounded" 
                    value={editingTransfer?.targetDepartment || ''}
                    onChange={handleDepartmentChange}
                  >
                    <option value="">เลือกสำนัก/กอง</option>
                    {departmentOptions.map((dept, index) => (
                      <option key={index} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium">หน่วยงาน (ปลายทาง)</label>
                  <select 
                    className="p-2 border rounded" 
                    value={editingTransfer?.targetUnit || ''}
                    onChange={handleUnitChange}
                    disabled={!editingTransfer?.targetDepartment}
                  >
                    <option value="">เลือกหน่วยงาน</option>
                    {editingTransfer?.targetDepartment && 
                      unitOptions[editingTransfer.targetDepartment]?.map((unit, index) => (
                        <option key={index} value={unit}>{unit}</option>
                      ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium">ตำแหน่ง (ปลายทาง)</label>
                  <select 
                    className="p-2 border rounded" 
                    value={editingTransfer?.targetPosition || ''}
                    onChange={(e) => setEditingTransfer({...editingTransfer, targetPosition: e.target.value})}
                    disabled={!editingTransfer?.targetUnit}
                  >
                    <option value="">เลือกตำแหน่ง</option>
                    {editingTransfer?.targetUnit && 
                      positionOptions[editingTransfer.targetUnit]?.map((position, index) => (
                        <option key={index} value={position}>{position}</option>
                      ))}
                  </select>
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium">ระดับตำแหน่ง (ปลายทาง)</label>
                  <select 
                    className="p-2 border rounded" 
                    value={editingTransfer?.targetPositionLevel || ''}
                    onChange={(e) => setEditingTransfer({...editingTransfer, targetPositionLevel: e.target.value})}
                  >
                    <option value="">เลือกระดับตำแหน่ง</option>
                    {positionLevelOptions.map((level, index) => (
                      <option key={index} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button 
                className="px-4 py-2 border rounded hover:bg-gray-100" 
                onClick={handleCancelEdit}
              >
                ยกเลิก
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" 
                onClick={handleSaveEdit}
              >
                บันทึกการแก้ไข
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* แสดงประวัติการแก้ไข */}
      {showAuditLog && (
        <AuditLog 
          onClose={() => setShowAuditLog(false)} 
          recordId={selectedTransferId}
          recordType="transfer"
        />
      )}
    </div>
  );
};

export default TransferHistory;