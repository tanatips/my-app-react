import React, { useState } from 'react';

const UserSearchApp = () => {
  const [searchText, setSearchText] = useState('ทดสอบ');
  const [expandedUser, setExpandedUser] = useState('3');
  
  // Mock data - ข้อมูลจำลอง
  const users = [
    {
      id: '1',
      userid: 'test001',
      masked_idcard: '1234XXXXX5678',
      idcard: '1234567890123',
      first_name_th: 'ทดสอบ',
      last_name_th: 'ระบบค้นหา',
      first_name_en: 'Test',
      last_name_en: 'Rabobkanha',
      birthday: '1990-01-01',
      email: 'test001@example.com',
      phone: '02-123-4567',
      mobile: '081-234-5678',
      village_no: '123',
      moo: 1,
      soi: 'ทดสอบ 1'
    },
    {
      id: '2',
      userid: 'test002',
      masked_idcard: '2345XXXXX6789',
      idcard: '2345678901234',
      first_name_th: 'ทดสอบ',
      last_name_th: 'หนึ่ง',
      first_name_en: 'Test',
      last_name_en: 'One',
      birthday: '1992-02-02',
      email: 'test002@example.com',
      phone: '02-234-5678',
      mobile: '082-345-6789',
      village_no: '456',
      moo: 2,
      soi: 'ทดสอบ 2'
    },
    {
      id: '3',
      userid: 'test003',
      masked_idcard: '3456XXXXX7890',
      idcard: '3456789012345',
      first_name_th: 'ทดสอบ',
      last_name_th: 'สอง',
      first_name_en: 'Test',
      last_name_en: 'Two',
      birthday: '1994-03-03',
      email: 'test003@example.com',
      phone: '02-345-6789',
      mobile: '083-456-7890',
      village_no: '789',
      moo: 3,
      soi: 'ทดสอบ 3'
    }
  ];
  
  const handleSearch = (e) => {
    e.preventDefault();
    // ในสถานการณ์จริงจะต้องเรียก API เพื่อค้นหาข้อมูล
    console.log('Searching for:', searchText);
  };
  
  const toggleDetails = (userId) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
    } else {
      setExpandedUser(userId);
    }
  };
  
  const formatThaiDate = (dateString) => {
    const date = new Date(dateString);
    // Thai date format: DD/MM/YYYY
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear() + 543}`;
  };
  
  return (
    <div className="bg-gray-50 font-sans">
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#0F1E56] text-white p-4">
            <h1 className="text-2xl font-bold">ค้นหาข้อมูลผู้ใช้งาน</h1>
            {/* <p className="text-sm opacity-80">ค้นหาข้อมูลผู้ใช้งานในระบบ</p> */}
          </div>
          
          {/* Search Form */}
          <div className="p-4 border-b">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="flex flex-1 border rounded overflow-hidden">
                <input 
                  type="text" 
                  placeholder="ค้นหาด้วย ชื่อ-นามสกุล, รหัสบัตรประชาชน, รหัสผู้ใช้, อีเมล" 
                  className="flex-1 p-2 border-none focus:outline-none"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  ค้นหา
                </button>
              </div>
            </form>
          </div>
          
          {/* Filter Tags */}
          {searchText && (
            <div className="px-4 py-2 bg-gray-50 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                คำค้นหา: {searchText}
                <button 
                  className="ml-1 text-blue-500 hover:text-blue-700"
                  onClick={() => setSearchText('')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            </div>
          )}
          
          {/* Results */}
          <div className="p-4">
            <p className="text-sm text-gray-500 mb-4">พบข้อมูลทั้งหมด {users.length} รายการ</p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
                      ชื่อ-นามสกุล
                    </th>
                    <th scope="col" className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
                      รหัสบัตรประชาชน
                    </th>
                    <th scope="col" className="px-6 py-3 text-left   font-medium text-gray-500 uppercase tracking-wider">
                      รหัสผู้ใช้
                    </th>
                    <th scope="col" className="px-6 py-3 text-left   font-medium text-gray-500 uppercase tracking-wider">
                      อีเมล
                    </th>
                    <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                      รายละเอียด
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <React.Fragment key={user.id}>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.first_name_th} {user.last_name_th}</div>
                          <div className="text-xs text-gray-500">{user.first_name_en} {user.last_name_en}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.masked_idcard}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.userid}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button 
                            onClick={() => toggleDetails(user.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            {expandedUser === user.id ? 'ซ่อนรายละเอียด' : 'ดูรายละเอียด'}
                          </button>
                        </td>
                      </tr>
                      
                      {/* Expanded detail row */}
                      {expandedUser === user.id && (
                        <tr className="bg-gray-50">
                          <td colSpan={5} className="px-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              <div>
                                <h3 className="font-medium text-gray-700">ข้อมูลส่วนตัว</h3>
                                <p className="text-sm mt-1">วันเกิด: {formatThaiDate(user.birthday)}</p>
                                <p className="text-sm mt-1">โทรศัพท์: {user.phone}</p>
                                <p className="text-sm mt-1">มือถือ: {user.mobile}</p>
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-700">ที่อยู่</h3>
                                <p className="text-sm mt-1">บ้านเลขที่: {user.village_no}</p>
                                <p className="text-sm mt-1">หมู่: {user.moo}</p>
                                <p className="text-sm mt-1">ซอย: {user.soi}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    แสดง <span className="font-medium">1</span> ถึง <span className="font-medium">{users.length}</span> จากทั้งหมด <span className="font-medium">{users.length}</span> รายการ
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" aria-current="page" className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                      1
                    </a>
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSearchApp;