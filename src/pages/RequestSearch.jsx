import { Calendar, Search } from 'lucide-react';
import React, { useState } from 'react';

const RequestSearch = () => {
  // State for search parameters
  const [searchParams, setSearchParams] = useState({
    requestType: '',
    requestId: '',
    startDate: '',
    endDate: '',
    status: '',
    idCard: '',
    fullName: ''
  });

  // State for search results
  const [searchResults, setSearchResults] = useState([]);

  // Function to format date to Thai format (DD/MM/YYYY+543)
  const formatThaiDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const thaiYear = date.getFullYear() + 543;
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${thaiYear}`;
  };

  // Handle all input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle search button click
  const handleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }
    
    // Mock API call - in real application, this would be an API request
    console.log('Searching with params:', searchParams);
    
    // Mock search results
    setSearchResults([
      {
        id: 'REQ001',
        type: 'ลงทะเบียนขอใช้สิทธิเข้าใช้งานระบบ',
        requestDate: '2024-02-01',
        status: 'รออนุมัติ',
        requester: 'สมชาย ใจดี',
        idCard: '1234567890123'
      },
      {
        id: 'REQ002',
        type: 'ลงทะเบียนขอใช้งาน internet และ e-office',
        requestDate: '2024-02-01',
        status: 'อนุมัติแล้ว',
        requester: 'สมหญิง รักดี',
        idCard: '9876543210123'
      },
    ]);
  };

  // Handle reset button click
  const handleReset = () => {
    setSearchParams({
      requestType: '',
      requestId: '',
      startDate: '',
      endDate: '',
      status: '',
      idCard: '',
      fullName: ''
    });
    setSearchResults([]);
  };

  return (
    <div className="max-w-7xl mx-auto bg-white mt-8">
      <div className="bg-[#002B5B] text-white py-5 px-6 rounded-t-lg">
        <h1 className="text-xl font-semibold">ค้นหาคำขอ</h1>
      </div>
      
      {/* Search Form */}
      <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* ประเภทคำขอ */}
          <div>
            <label className="block mb-1 text-sm font-medium">ประเภทคำขอ</label>
            <select
              name="requestType"
              value={searchParams.requestType}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            >
              <option value="">ทั้งหมด</option>
              <option value="system">ลงทะเบียนขอใช้สิทธิเข้าใช้งานระบบ</option>
              <option value="internet">ลงทะเบียนขอใช้งาน internet และ e-office</option>
            </select>
          </div>

          {/* เลขที่คำขอ */}
          <div>
            <label className="block mb-1 text-sm font-medium">เลขที่คำขอ</label>
            <input
              type="text"
              name="requestId"
              value={searchParams.requestId}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              placeholder="ระบุเลขที่คำขอ"
            />
          </div>

          {/* สถานะ */}
          <div>
            <label className="block mb-1 text-sm font-medium">สถานะ</label>
            <select
              name="status"
              value={searchParams.status}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            >
              <option value="">ทั้งหมด</option>
              <option value="pending">รออนุมัติ</option>
              <option value="approved">อนุมัติแล้ว</option>
              <option value="rejected">ไม่อนุมัติ</option>
            </select>
          </div>

          {/* วันที่ยื่นคำขอ */}
          <div>
            <label className="block mb-1 text-sm font-medium">วันที่ยื่นคำขอ (จาก)</label>
            <div className="relative">
              <input
                type="date"
                name="startDate"
                value={searchParams.startDate}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                placeholder="วว/ดด/ปปปป"
              />
              <Calendar className="absolute right-2 top-2.5 h-5 w-5 text-gray-400" />
              <div className="text-sm text-gray-500 mt-1">
                {searchParams.startDate ? formatThaiDate(searchParams.startDate) : 'วว/ดด/ปปปป'}
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">ถึงวันที่</label>
            <div className="relative">
              <input
                type="date"
                name="endDate"
                value={searchParams.endDate}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                placeholder="วว/ดด/ปปปป"
              />
              <Calendar className="absolute right-2 top-2.5 h-5 w-5 text-gray-400" />
              <div className="text-sm text-gray-500 mt-1">
                {searchParams.endDate ? formatThaiDate(searchParams.endDate) : 'วว/ดด/ปปปป'}
              </div>
            </div>
          </div>

          {/* เลขประจำตัวประชาชน */}
          <div>
            <label className="block mb-1 text-sm font-medium">เลขประจำตัวประชาชน</label>
            <input
              type="text"
              name="idCard"
              value={searchParams.idCard}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              placeholder="ระบุเลขประจำตัวประชาชน"
              maxLength="13"
            />
          </div>

          {/* ชื่อ-นามสกุล */}
          <div>
            <label className="block mb-1 text-sm font-medium">ชื่อ-นามสกุล</label>
            <input
              type="text"
              name="fullName"
              value={searchParams.fullName}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              placeholder="ระบุชื่อ-นามสกุล"
            />
          </div>
        </div>

        {/* Search Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-gray-600 bg-white border rounded hover:bg-gray-50"
          >
            ล้างข้อมูล
          </button>
          <button
            type="button"
            onClick={handleSearch}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 flex items-center"
          >
            <Search className="w-4 h-4 mr-2" />
            ค้นหา
          </button>
        </div>
      </div>

      {/* Results Table */}
      {searchResults.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="border p-3 text-left">เลขที่คำขอ</th>
                <th className="border p-3 text-left">ประเภทคำขอ</th>
                <th className="border p-3 text-left">วันที่ยื่นคำขอ</th>
                <th className="border p-3 text-left">ชื่อ-นามสกุล</th>
                <th className="border p-3 text-left">เลขประจำตัวประชาชน</th>
                <th className="border p-3 text-left">สถานะ</th>
                <th className="border p-3 text-center">ดำเนินการ</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="border p-3">{result.id}</td>
                  <td className="border p-3">{result.type}</td>
                  <td className="border p-3">{formatThaiDate(result.requestDate)}</td>
                  <td className="border p-3">{result.requester}</td>
                  <td className="border p-3">{result.idCard}</td>
                  <td className="border p-3">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      result.status === 'รออนุมัติ' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : result.status === 'อนุมัติแล้ว'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {result.status}
                    </span>
                  </td>
                  <td className="border p-3 text-center">
                    <button 
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => console.log('View details:', result.id)}
                    >
                      ดูรายละเอียด
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RequestSearch;