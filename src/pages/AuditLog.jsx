import { Calendar, User, X } from 'lucide-react';
import { useState } from 'react';

// คอมโพเนนต์สำหรับบันทึกการแก้ไขข้อมูล (Audit Log)
const AuditLog = ({ onClose }) => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterDate, setFilterDate] = useState('');
  const [filterUser, setFilterUser] = useState('');

  // ข้อมูลจำลองสำหรับประวัติการแก้ไข
  const mockAuditLogs = [
    {
      id: 1,
      timestamp: '2025-03-08T14:32:45',
      user: 'admin123',
      userName: 'ผู้ดูแลระบบ',
      action: 'แก้ไข',
      recordType: 'transfer',
      recordId: '1',
      details: [
        { field: 'referenceNumber', oldValue: 'คำสั่ง 123/2567', newValue: 'คำสั่ง 123/2567 (แก้ไข)' },
        { field: 'transferDate', oldValue: '2024-09-01', newValue: '2024-09-15' }
      ]
    },
    {
      id: 2,
      timestamp: '2025-03-07T10:15:22',
      user: 'hr_manager',
      userName: 'หัวหน้าฝ่ายบุคคล',
      action: 'แก้ไข',
      recordType: 'transfer',
      recordId: '1',
      details: [
        { field: 'targetDepartment', oldValue: 'สำนักงานเลขานุการกรม', newValue: 'สำนักนโยบายและแผน' },
        { field: 'targetUnit', oldValue: 'ฝ่ายประชาสัมพันธ์', newValue: 'ฝ่ายแผนงานและงบประมาณ' }
      ]
    },
    {
      id: 3,
      timestamp: '2025-03-05T09:45:12',
      user: 'hr_staff',
      userName: 'เจ้าหน้าที่ทรัพยากรบุคคล',
      action: 'สร้าง',
      recordType: 'transfer',
      recordId: '1',
      details: [
        { field: 'recordCreated', oldValue: '', newValue: 'สร้างรายการโอนย้าย' }
      ]
    }
  ];

  // จำลองการดึงข้อมูล
  useEffect(() => {
    // ในสถานการณ์จริงควรเรียกใช้ API
    const fetchAuditLogs = async () => {
      try {
        // จำลองการเรียก API
        await new Promise(resolve => setTimeout(resolve, 800));
        setLogs(mockAuditLogs);
      } catch (error) {
        console.error('Error fetching audit logs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuditLogs();
  }, []);

  // ฟังก์ชันสำหรับกรองข้อมูล
  const getFilteredLogs = () => {
    return logs.filter(log => {
      const matchesDate = filterDate 
        ? new Date(log.timestamp).toISOString().split('T')[0] === filterDate 
        : true;
      
      const matchesUser = filterUser
        ? log.userName.includes(filterUser) || log.user.includes(filterUser)
        : true;
      
      return matchesDate && matchesUser;
    });
  };

  // แปลงวันที่เป็นรูปแบบไทย
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    const date = new Date(dateString);
    // แปลงเป็นปี พ.ศ.
    const thaiYear = date.getFullYear() + 543;
    const formattedDate = date.toLocaleDateString('th-TH', options);
    return formattedDate.replace(date.getFullYear(), thaiYear);
  };

  // แปลงชื่อฟิลด์เป็นภาษาไทย
  const getThaiFieldName = (fieldName) => {
    const fieldMapping = {
      'referenceNumber': 'หมายเลขคำสั่ง',
      'transferDate': 'วันที่โอนย้าย',
      'orderEffectiveDate': 'วันที่มีผลคำสั่ง',
      'sourceDepartment': 'สำนัก/กอง (ต้นทาง)',
      'sourceUnit': 'หน่วยงาน (ต้นทาง)',
      'sourcePosition': 'ตำแหน่ง (ต้นทาง)',
      'sourcePositionLevel': 'ระดับตำแหน่ง (ต้นทาง)',
      'targetDepartment': 'สำนัก/กอง (ปลายทาง)',
      'targetUnit': 'หน่วยงาน (ปลายทาง)',
      'targetPosition': 'ตำแหน่ง (ปลายทาง)',
      'targetPositionLevel': 'ระดับตำแหน่ง (ปลายทาง)',
      'recordCreated': 'สร้างรายการ'
    };
    
    return fieldMapping[fieldName] || fieldName;
  };

  // แปลงค่าวันที่เพื่อแสดงผล
  const formatFieldValue = (fieldName, value) => {
    if (fieldName === 'transferDate' || fieldName === 'orderEffectiveDate') {
      if (!value) return '';
      const date = new Date(value);
      return date.toLocaleDateString('th-TH');
    }
    return value;
  };

  const filteredLogs = getFilteredLogs();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="bg-gray-100 p-2 rounded-full">
              <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">ประวัติการแก้ไขข้อมูล</h2>
          </div>
          <button 
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
            onClick={onClose}
            aria-label="ปิด"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              className="pl-10 pr-4 py-2 border rounded w-full"
              placeholder="ค้นหาผู้แก้ไข..."
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="date"
              className="pl-10 pr-4 py-2 border rounded w-full"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            {filterDate && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setFilterDate('')}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Logs List */}
        <div className="flex-grow overflow-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center p-8 bg-gray-50 rounded">
              <p className="text-gray-500">ไม่พบประวัติการแก้ไขตามเงื่อนไขที่ระบุ</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLogs.map((log) => (
                <div key={log.id} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full
                        ${log.action === 'สร้าง' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {log.action === 'สร้าง' ? '+' : '✎'}
                      </span>
                      <div>
                        <p className="font-medium">{log.userName}</p>
                        <p className="text-sm text-gray-500">{log.user}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-700">{formatDate(log.timestamp)}</p>
                      <p className="text-sm">
                        <span className={`
                          inline-block px-2 py-1 rounded-full text-xs
                          ${log.action === 'สร้าง' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}
                        `}>
                          {log.action}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="p-3">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-medium text-gray-600 w-1/3">ฟิลด์</th>
                          <th className="text-left py-2 font-medium text-gray-600 w-1/3">ค่าเดิม</th>
                          <th className="text-left py-2 font-medium text-gray-600 w-1/3">ค่าใหม่</th>
                        </tr>
                      </thead>
                      <tbody>
                        {log.details.map((detail, index) => (
                          <tr key={index} className="border-b last:border-b-0">
                            <td className="py-2">{getThaiFieldName(detail.field)}</td>
                            <td className="py-2 text-gray-500">{formatFieldValue(detail.field, detail.oldValue) || '-'}</td>
                            <td className="py-2">{formatFieldValue(detail.field, detail.newValue)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
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
    </div>
  );
};

export default AuditLog;