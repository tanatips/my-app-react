import { AlertCircle, Calendar, Clock, Edit, Plus, User, X } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export default function ActingDutySelector() {
  const [periods, setPeriods] = useState([]);
  const [periodMode, setPeriodMode] = useState('single');
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [currentPeriod, setCurrentPeriod] = useState({
    startDate: '',
    endDate: '',
    startType: 'full',
    endType: 'full',
    type: 'full',
    deputy: '',
    position: ''
  });
  
  // สถานะสำหรับ Modal เพิ่มผู้รักษาราชการแทน
  const [isAddDeputyModalOpen, setIsAddDeputyModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // สมมติข้อมูลผู้ใช้ในระบบ
  const [systemUsers, setSystemUsers] = useState([
    { id: 101, name: 'นายสมชาย ใจดี', position: 'รองผู้อำนวยการฝ่ายบริหาร', isDeputy: true },
    { id: 102, name: 'นางสาวสมหญิง รักงาน', position: 'รองผู้อำนวยการฝ่ายวิชาการ', isDeputy: true },
    { id: 103, name: 'นายวิชัย เก่งกล้า', position: 'หัวหน้าฝ่ายบุคคล', isDeputy: false },
    { id: 104, name: 'นางพรรณี ศรีสุข', position: 'หัวหน้าฝ่ายแผนงาน', isDeputy: false },
    { id: 105, name: 'นายสมศักดิ์ มั่นคง', position: 'หัวหน้าฝ่ายวิชาการ', isDeputy: false },
    { id: 106, name: 'นางสาวจินตนา วงศ์ไพศาล', position: 'หัวหน้าฝ่ายการเงิน', isDeputy: false },
    { id: 107, name: 'นายธนวัฒน์ เจริญทรัพย์', position: 'หัวหน้าฝ่ายอาคารสถานที่', isDeputy: false },
    { id: 108, name: 'นางสาวนภาพร สุขเกษม', position: 'หัวหน้างานทะเบียน', isDeputy: false },
    { id: 109, name: 'นายอมร พงศ์พัฒน์', position: 'หัวหน้างานประชาสัมพันธ์', isDeputy: false },
    { id: 110, name: 'นางสาวพิมพ์ชนก รักการศึกษา', position: 'หัวหน้างานวัดผล', isDeputy: false }
  ]);


  // แก้ไขตรงนี้: ปรับ multipleTimeRangesStart ให้มีเต็มวันและบ่าย
  const multipleTimeRangesStart = {
    full: { start: '08:30', end: '16:30', label: 'เริ่ม เต็มวัน (08:30 - 16:30)' },
    afternoon: { start: '13:00', end: '16:30', label: 'เริ่ม บ่าย (13:00 - 16:30)' }
  };

  // แก้ไขตรงนี้: ปรับ multipleTimeRangesEnd ให้มีเต็มวันและเช้า
  const multipleTimeRangesEnd = {
    full: { start: '08:30', end: '16:30', label: 'สิ้นสุด เต็มวัน (08:30 - 16:30)' },
    morning: { start: '08:30', end: '12:00', label: 'สิ้นสุดในช่วงเช้า (08:30 - 12:00)' }
  };

  const singleTimeRanges = {
    full: { start: '08:30', end: '16:30', label: 'เต็มวัน (08:30 - 16:30)' },
    morning: { start: '08:30', end: '12:00', label: 'ครึ่งวันเช้า (08:30 - 12:00)' },
    afternoon: { start: '13:00', end: '16:30', label: 'ครึ่งวันบ่าย (13:00 - 16:30)' }
  };

  // ดึงรายชื่อผู้รักษาราชการแทนจาก systemUsers
  const deputies = systemUsers.filter(user => user.isDeputy).map(user => ({
    id: user.id,
    name: user.name,
    position: user.position
  }));

  const validateForm = () => {
    const errors = [];
    if (!currentPeriod.deputy) {
      errors.push('กรุณาเลือกผู้รักษาราชการแทน');
    }
    if (!currentPeriod.startDate) {
      errors.push(periodMode === 'single' ? 'กรุณาเลือกวันที่' : 'กรุณาเลือกวันที่เริ่มต้น');
    }
    if (periodMode === 'multiple') {
      if (!currentPeriod.endDate) {
        errors.push('กรุณาเลือกวันที่สิ้นสุด');
      }
      if (currentPeriod.endDate && currentPeriod.startDate && 
          currentPeriod.endDate < currentPeriod.startDate) {
        errors.push('วันที่สิ้นสุดต้องไม่น้อยกว่าวันที่เริ่มต้น');
      }
    }
    return errors;
  };

  const handleDeputyChange = (e) => {
    const selectedDeputy = deputies.find(d => d.name === e.target.value);
    setCurrentPeriod({
      ...currentPeriod,
      deputy: selectedDeputy?.name || '',
      position: selectedDeputy?.position || ''
    });
  };

  const handleModeChange = (mode) => {
    setPeriodMode(mode);
    setCurrentPeriod({
      ...currentPeriod,
      endDate: mode === 'single' ? '' : currentPeriod.endDate,
      startType: mode === 'single' ? 'full' : 'full', // แก้ไขตรงนี้: เปลี่ยนค่าเริ่มต้นเป็น 'full'
      endType: mode === 'single' ? 'full' : 'full'    // แก้ไขตรงนี้: เปลี่ยนค่าเริ่มต้นเป็น 'full'
    });
  };

  const addPeriod = () => {
    const errors = validateForm();
    if (errors.length > 0) {
      setErrorMessages(errors);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setErrorMessages([]);
      }, 5000);
      return;
    }
    
    const timeRangesStart = periodMode === 'single' ? singleTimeRanges : multipleTimeRangesStart;
    const timeRangesEnd = periodMode === 'single' ? singleTimeRanges : multipleTimeRangesEnd;
    const startTimeRange = timeRangesStart[periodMode === 'single' ? currentPeriod.type : currentPeriod.startType];
    const endTimeRange = timeRangesEnd[periodMode === 'single' ? currentPeriod.type : currentPeriod.endType];

    const newPeriod = {
      ...currentPeriod,
      endDate: periodMode === 'single' ? currentPeriod.startDate : currentPeriod.endDate,
      startTimeStart: startTimeRange.start,
      startTimeEnd: startTimeRange.end,
      endTimeStart: endTimeRange.start,
      endTimeEnd: endTimeRange.end,
      id: editingId || `${currentPeriod.startDate}-${currentPeriod.deputy}-${Date.now()}`
    };

    if (editingId) {
      setPeriods(periods.map(p => p.id === editingId ? newPeriod : p));
      setEditingId(null);
    } else {
      setPeriods([...periods, newPeriod]);
    }

    setCurrentPeriod({
      startDate: '',
      endDate: '',
      startType: 'full',  // แก้ไขตรงนี้: เปลี่ยนค่าเริ่มต้นเป็น 'full'
      endType: 'full',    // แก้ไขตรงนี้: เปลี่ยนค่าเริ่มต้นเป็น 'full'
      type: 'full',
      deputy: '',
      position: ''
    });
  };

  const editPeriod = (id) => {
    const periodToEdit = periods.find(p => p.id === id);
    if (periodToEdit) {
      setCurrentPeriod(periodToEdit);
      setEditingId(id);
    }
  };

  const removePeriod = (id) => {
    setPeriods(periods.filter(p => p.id !== id));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // ฟังก์ชันสำหรับเพิ่มผู้รักษาราชการแทนใหม่
  const toggleDeputyStatus = (userId) => {
    setSystemUsers(systemUsers.map(user => 
      user.id === userId 
        ? { ...user, isDeputy: !user.isDeputy } 
        : user
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">รักษาราชการแทน</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {showError && errorMessages.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc pl-4">
                  {errorMessages.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium">ประเภทการรักษาราชการแทน</label>
            <div className="flex space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={periodMode === 'single'}
                  onChange={() => handleModeChange('single')}
                  className="w-4 h-4 text-blue-600"
                />
                <span>รักษาราชการแทน 1 วัน</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={periodMode === 'multiple'}
                  onChange={() => handleModeChange('multiple')}
                  className="w-4 h-4 text-blue-600"
                />
                <span>รักษาราชการแทนมากกว่า 1 วัน</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">ผู้รักษาราชการแทน</label>
              <div className="relative flex">
                <div className="relative flex-grow">
                  <select
                    className="w-full p-2 border rounded-md pl-8"
                    value={currentPeriod.deputy}
                    onChange={handleDeputyChange}
                  >
                    <option value="">เลือกผู้รักษาราชการแทน</option>
                    {deputies.map(deputy => (
                      <option key={deputy.id} value={deputy.name}>
                        {deputy.name}
                      </option>
                    ))}
                  </select>
                  <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                </div>
                <button
                  type="button"
                  className="ml-2 p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 flex items-center"
                  onClick={() => setIsAddDeputyModalOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  จัดการ
                </button>
              </div>
            </div>
            
            {currentPeriod.position && (
              <div className="text-sm text-gray-600">
                ตำแหน่ง: {currentPeriod.position}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {periodMode === 'single' ? 'วันที่' : 'วันที่เริ่มต้น'}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full p-2 border rounded-md pl-8"
                    value={currentPeriod.startDate}
                    onChange={(e) => setCurrentPeriod({
                      ...currentPeriod,
                      startDate: e.target.value
                    })}
                  />
                  <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  ช่วงเวลา{periodMode === 'multiple' ? 'เริ่มต้น' : ''}
                </label>
                <div className="relative">
                  <select
                    className="w-full p-2 border rounded-md pl-8"
                    value={periodMode === 'single' ? currentPeriod.type : currentPeriod.startType}
                    onChange={(e) => setCurrentPeriod({
                      ...currentPeriod,
                      [periodMode === 'single' ? 'type' : 'startType']: e.target.value
                    })}
                  >
                    {Object.entries(periodMode === 'single' ? singleTimeRanges : multipleTimeRangesStart)
                      .map(([value, { label }]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                  <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>
            
            {periodMode === 'multiple' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">วันที่สิ้นสุด</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full p-2 border rounded-md pl-8"
                      value={currentPeriod.endDate}
                      min={currentPeriod.startDate}
                      onChange={(e) => setCurrentPeriod({
                        ...currentPeriod,
                        endDate: e.target.value
                      })}
                    />
                    <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">ช่วงเวลาสิ้นสุด</label>
                  <div className="relative">
                    <select
                      className="w-full p-2 border rounded-md pl-8"
                      value={currentPeriod.endType}
                      onChange={(e) => setCurrentPeriod({
                        ...currentPeriod,
                        endType: e.target.value
                      })}
                    >
                      {Object.entries(multipleTimeRangesEnd).map(([value, { label }]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={addPeriod}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {editingId ? 'อัปเดต' : 'เพิ่ม'}
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">รายการรักษาราชการแทน</h3>
            <div className="border rounded-md divide-y">
              {periods.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  ยังไม่มีรายการรักษาราชการแทน
                </div>
              ) : (
                periods.sort((a, b) => a.startDate.localeCompare(b.startDate)).map((period) => (
                  <div key={period.id} className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{period.deputy}</div>
                        <div className="text-sm text-gray-600">{period.position}</div>
                        <div className="text-sm mt-1">
                          {period.startDate === period.endDate ? (
                            <>
                              {formatDate(period.startDate)}
                              <div className="mt-1 text-gray-600">
                                เวลา: {period.startTimeStart} - {period.startTimeEnd} น.
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                เริ่มต้น: {formatDate(period.startDate)}
                                <div className="text-gray-600">
                                  เวลา: {period.startTimeStart} - {period.startTimeEnd} น.
                                </div>
                              </div>
                              <div className="mt-1">
                                สิ้นสุด: {formatDate(period.endDate)}
                                <div className="text-gray-600">
                                  เวลา: {period.endTimeStart} - {period.endTimeEnd} น.
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => editPeriod(period.id)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removePeriod(period.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          ลบ
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* <div className="flex justify-center space-x-2 mt-6 pt-6 border-t">
  <button
    type="button"
    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
    onClick={() => {
      // TODO: Implement cancel logic
      console.log('Cancel clicked');
    }}
  >
    ยกเลิก
  </button>
  <button
    type="button"
    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    onClick={() => {
      // TODO: Implement save logic
      console.log('Save clicked', periods);
    }}
  >
    บันทึก
  </button>
</div> */}

          {/* Modal สำหรับเพิ่มผู้รักษาราชการแทน */}
          {isAddDeputyModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4">
                <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="text-lg font-medium flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    จัดการผู้รักษาราชการแทน
                  </h3>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setIsAddDeputyModalOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-4">
                    กำหนดผู้ที่สามารถรักษาราชการแทนได้ โดยเลือกจากรายชื่อในระบบ
                  </p>
                  
                  {/* ช่องค้นหา */}
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 border rounded-md"
                        placeholder="ค้นหาชื่อหรือตำแหน่ง..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                        />
                      </svg>
                    </div>
                  </div>
                  
                  {/* รายการผู้ใช้ */}
                  <div className="overflow-hidden border rounded-md">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ชื่อ-นามสกุล
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ตำแหน่ง
                          </th>
                          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            สถานะ
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {systemUsers
                          .filter(user => 
                            searchQuery === '' || 
                            user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            user.position.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{user.position}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                <button
                                  onClick={() => toggleDeputyStatus(user.id)}
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    user.isDeputy
                                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                  }`}
                                >
                                  {user.isDeputy ? 'รักษาราชการแทนได้' : 'ไม่สามารถรักษาราชการแทน'}
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* ข้อความเมื่อไม่พบข้อมูล */}
                  {systemUsers.filter(user => 
                    searchQuery === '' || 
                    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    user.position.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      ไม่พบรายชื่อที่ค้นหา
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={() => {
                      setIsAddDeputyModalOpen(false);
                      setSearchQuery(''); // รีเซ็ตค่าค้นหาเมื่อปิด Modal
                    }}
                  >
                    เสร็จสิ้น
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}