import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Filter, Save, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const UserRoleAssignment = () => {
  // ข้อมูลตัวอย่าง
  const [users, setUsers] = useState([
    {
      id: '1',
      userid: 'USER001',
      idcard: '1234567890123',
      first_name_th: 'สมชาย',
      last_name_th: 'ใจดี',
      email: 'somchai@email.com',
      phone: '02-111-1111',
      mobile: '081-111-1111',
      status: 1,
      role: 'user'
    },
    {
      id: '2',
      userid: 'USER002',
      idcard: '2234567890123',
      first_name_th: 'สมหญิง',
      last_name_th: 'รักดี',
      email: 'somying@email.com',
      phone: '02-222-2222',
      mobile: '082-222-2222',
      status: 1,
      role: 'manager'
    },
    {
      id: '3',
      userid: 'USER003',
      idcard: '3234567890123',
      first_name_th: 'วิชัย',
      last_name_th: 'เก่งกาจ',
      email: 'wichai@email.com',
      phone: '02-333-3333',
      mobile: '083-333-3333',
      status: 0,
      role: 'user'
    },
    {
      id: '4',
      userid: 'USER004',
      idcard: '4234567890123',
      first_name_th: 'มานี',
      last_name_th: 'มีทรัพย์',
      email: 'manee@email.com',
      phone: '02-444-4444',
      mobile: '084-444-4444',
      status: 1,
      role: 'admin'
    },
    {
      id: '5',
      userid: 'USER005',
      idcard: '5234567890123',
      first_name_th: 'สุดา',
      last_name_th: 'ดีงาม',
      email: 'suda@email.com',
      phone: '02-555-5555',
      mobile: '085-555-5555',
      status: 1,
      role: 'user'
    }
  ]);

  // เก็บข้อมูล role ที่มีการเปลี่ยนแปลง
  const [modifiedRoles, setModifiedRoles] = useState({});
  
  const [roles] = useState([
    { id: 1, name: 'admin', label: 'ผู้ดูแลระบบ' },
    { id: 2, name: 'manager', label: 'ผู้จัดการ' },
    { id: 3, name: 'user', label: 'ผู้ใช้งานทั่วไป' }
  ]);

  const [searchParams, setSearchParams] = useState({
    searchText: '',
    showAdvanced: false,
    status: 'all',
    phone: '',
    role: ''
  });

  // เพิ่ม state สำหรับการแสดงผลและ pagination
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0
  });

  // เพิ่ม useEffect สำหรับการ initialize ข้อมูล
  useEffect(() => {
    setFilteredUsers(users);
    setPagination(prev => ({ ...prev, totalItems: users.length }));
  }, [users]);

  const handleSearch = (e) => {
    e.preventDefault();
    
    let results = [...users];

    // ค้นหาตามข้อความ (ชื่อ หรือ email)
    if (searchParams.searchText) {
      const searchLower = searchParams.searchText.toLowerCase();
      results = results.filter(user => 
        `${user.first_name_th} ${user.last_name_th}`.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    }

    // กรองตาม Advanced Search (ถ้าเปิดใช้งาน)
    if (searchParams.showAdvanced) {
      // กรองตามสถานะ
      if (searchParams.status !== 'all') {
        results = results.filter(user => 
          user.status === parseInt(searchParams.status)
        );
      }

      // กรองตามเบอร์โทร (ถ้ามีการกรอก)
      if (searchParams.phone) {
        const phoneSearch = searchParams.phone.replace(/-/g, '');
        results = results.filter(user => 
          user.phone.replace(/-/g, '').includes(phoneSearch) ||
          user.mobile.replace(/-/g, '').includes(phoneSearch)
        );
      }

      // กรองตามบทบาท (ถ้าเลือก)
      if (searchParams.role) {
        results = results.filter(user => user.role === searchParams.role);
      }
    }

    // อัพเดตผลลัพธ์และ pagination
    setFilteredUsers(results);
    setPagination(prev => ({
      ...prev,
      currentPage: 1,
      totalItems: results.length
    }));
  };

  // คำนวณข้อมูลที่จะแสดงในหน้าปัจจุบัน
  const getCurrentPageItems = () => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  };

  const handleRoleChange = (userId, newRole) => {
    // เก็บข้อมูลการเปลี่ยนแปลง role
    setModifiedRoles(prev => ({
      ...prev,
      [userId]: newRole
    }));
    
    // อัพเดต UI
    setUsers(users.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleSaveChanges = async () => {
    try {
      // แสดง loading state
      const saveButton = document.getElementById('saveButton');
      if (saveButton) {
        saveButton.disabled = true;
        saveButton.innerHTML = 'กำลังบันทึก...';
      }

      // TODO: ส่งข้อมูลไปยัง API
      console.log('Saving modified roles:', modifiedRoles);
      
      // จำลองการเรียก API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // เคลียร์ข้อมูลที่มีการเปลี่ยนแปลง
      setModifiedRoles({});

      // แสดง success message
      alert('บันทึกข้อมูลสำเร็จ');
    } catch (error) {
      console.error('Error saving roles:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      // คืนค่า button state
      const saveButton = document.getElementById('saveButton');
      if (saveButton) {
        saveButton.disabled = false;
        saveButton.innerHTML = 'บันทึกการเปลี่ยนแปลง';
      }
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto mt-6">
      <CardHeader className="border-b bg-[#0F1E56] rounded-t-lg py-3">
        <CardTitle className="text-lg font-bold text-white">
          ค้นหาและกำหนดบทบาทผู้ใช้งาน
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Search Section */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Main Search */}
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="ค้นหาด้วยชื่อหรืออีเมล..."
                    className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchParams.searchText}
                    onChange={(e) => setSearchParams({
                      ...searchParams,
                      searchText: e.target.value
                    })}
                  />
                </div>
              </div>
              <button
                type="button"
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                onClick={() => setSearchParams({
                  ...searchParams,
                  showAdvanced: !searchParams.showAdvanced
                })}
              >
                <Filter className="w-4 h-4 mr-2" />
                ตัวกรองขั้นสูง
              </button>
            </div>

            {/* Advanced Search */}
            {searchParams.showAdvanced && (
              <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">สถานะ</label>
                    <select
                      className="w-full border rounded-lg px-3 py-2"
                      value={searchParams.status}
                      onChange={(e) => setSearchParams({
                        ...searchParams,
                        status: e.target.value
                      })}
                    >
                      <option value="all">ทั้งหมด</option>
                      <option value="1">ใช้งาน</option>
                      <option value="0">ไม่ใช้งาน</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">เบอร์โทรศัพท์</label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="เบอร์โทรศัพท์หรือมือถือ"
                      value={searchParams.phone}
                      onChange={(e) => setSearchParams({
                        ...searchParams,
                        phone: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">บทบาท</label>
                    <select
                      className="w-full border rounded-lg px-3 py-2"
                      value={searchParams.role}
                      onChange={(e) => setSearchParams({
                        ...searchParams,
                        role: e.target.value
                      })}
                    >
                      <option value="">ทั้งหมด</option>
                      {roles.map(role => (
                        <option key={role.id} value={role.name}>{role.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Search and Save Buttons */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {Object.keys(modifiedRoles).length > 0 && (
                  <span className="text-sm text-gray-600">
                    {Object.keys(modifiedRoles).length} รายการที่มีการเปลี่ยนแปลง
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  ค้นหา
                </button>
                <button
                  id="saveButton"
                  type="button"
                  onClick={handleSaveChanges}
                  disabled={Object.keys(modifiedRoles).length === 0}
                  className={`flex items-center px-6 py-2 rounded-lg gap-2 ${
                    Object.keys(modifiedRoles).length > 0
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  บันทึกการเปลี่ยนแปลง
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left">รหัสผู้ใช้</th>
                <th className="px-4 py-3 text-left">ชื่อ-นามสกุล</th>
                <th className="px-4 py-3 text-left">อีเมล</th>
                <th className="px-4 py-3 text-left">เบอร์โทรศัพท์</th>
                <th className="px-4 py-3 text-left">สถานะ</th>
                <th className="px-4 py-3 text-left">บทบาท</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageItems().map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{user.userid}</td>
                  <td className="px-4 py-3">
                    {user.first_name_th} {user.last_name_th}
                  </td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    {user.phone}<br/>
                    <span className="text-sm text-gray-500">{user.mobile}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      user.status === 1 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 1 ? 'ใช้งาน' : 'ไม่ใช้งาน'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className={`border rounded px-2 py-1 w-full max-w-[150px] ${
                        modifiedRoles[user.id] ? 'border-blue-500 ring-1 ring-blue-500' : ''
                      }`}
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            แสดง {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1}-
            {Math.min(pagination.currentPage * pagination.itemsPerPage, filteredUsers.length)} จาก {filteredUsers.length} รายการ
          </div>
          <div className="flex items-center gap-1">
            <button className="px-3 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50">
              ก่อนหน้า
            </button>
            <button className="px-3 py-2 border rounded-lg bg-blue-500 text-white">
              1
            </button>
            <button className="px-3 py-2 border rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-2 border rounded-lg hover:bg-gray-50">
              3
            </button>
            <span className="px-2">...</span>
            <button className="px-3 py-2 border rounded-lg hover:bg-gray-50">
              10
            </button>
            <button className="px-3 py-2 border rounded-lg hover:bg-gray-50">
              ถัดไป
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserRoleAssignment;