import { Search } from 'lucide-react';
import React, { useState } from 'react';

const ApprovalSearch = () => {
  const [searchParams, setSearchParams] = useState({
    approvalName: '',
    status: '',
    dateFrom: '',
    dateTo: '',
  });

  const [mockData] = useState([
    {
      id: 1,
      approvalName: 'ขอใช้งานระบบ',
      status: 'รออนุมัติ',
      createdBy: 'สมชาย ใจดี',
      createdDate: '2025-02-19',
      position: 'ผู้จัดการฝ่าย',
      stepNumber: 2
    },
    {
      id: 2, 
      approvalName: 'ขอใช้งานระบบ',
      status: 'รออนุมัติ',
      createdBy: 'สมหญิง รักงาน',
      createdDate: '2025-02-20',
      position: 'พนักงานบัญชี',
      stepNumber: 1
    }
  ]);

  const formatThaiDate = (dateString) => {
    const date = new Date(dateString);
    const thaiYear = date.getFullYear() + 543;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${thaiYear}`;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching with params:', searchParams);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-6 bg-[#0F1E56] text-white p-6 rounded-t-lg">ค้นหารายการที่ต้องดำเนินการ</h2>
        
        <div className="p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">ชื่อรายการ</label>
                <input
                  type="text"
                  name="approvalName"
                  value={searchParams.approvalName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="ระบุชื่อรายการ"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">สถานะ</label>
                <select
                  name="status"
                  value={searchParams.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">ทั้งหมด</option>
                  <option value="pending">รออนุมัติ</option>
                  <option value="inProgress">กำลังดำเนินการ</option>
                  <option value="completed">เสร็จสิ้น</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">วันที่เริ่มต้น</label>
                <input
                  type="date"
                  name="dateFrom"
                  value={searchParams.dateFrom}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">วันที่สิ้นสุด</label>
                <input
                  type="date"
                  name="dateTo"
                  value={searchParams.dateTo}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setSearchParams({
                  approvalName: '',
                  status: '',
                  dateFrom: '',
                  dateTo: '',
                })}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                ล้างข้อมูล
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#0F1E56] text-white rounded hover:bg-[#0A1540] flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                ค้นหา
              </button>
            </div>
          </form>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ลำดับ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อรายการ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ผู้สร้าง</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่สร้าง</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ตำแหน่ง</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">รายละเอียด</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockData.map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.approvalName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-sm ${
                        item.status === 'รออนุมัติ' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.createdBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatThaiDate(item.createdDate)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                        รายละเอียด
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalSearch;