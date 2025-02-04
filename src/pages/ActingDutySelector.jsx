import { AlertCircle, Calendar, Clock, Edit, User } from 'lucide-react';
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
    startType: 'morning',
    endType: 'morning',
    type: 'full',
    deputy: '',
    position: ''
  });

  const determineTimeType = (start, end) => {
    if (start === '08:30' && end === '16:30') return 'full';
    if (start === '08:30' && end === '12:00') return 'morning';
    if (start === '13:00' && end === '16:30') return 'afternoon';
    return 'morning';
  };

  const multipleTimeRangesStart = {
    morning: { start: '08:30', end: '16:30', label: 'เริ่ม เช้า (08:30 - 16:30)' },
    afternoon: { start: '13:00', end: '16:30', label: 'เริ่ม บ่าย (13:00 - 16:30)' }
  };

  const multipleTimeRangesEnd = {
    morning: { start: '08:30', end: '12:00', label: 'สิ้นสุดในช่วงเช้า (08:30 - 12:00)' },
    afternoon: { start: '13:30', end: '16:30', label: 'สิ้นสุดในช่วงบ่าย (13:00 - 16:30)' }
  };

  const singleTimeRanges = {
    full: { start: '08:30', end: '16:30', label: 'เต็มวัน (08:30 - 16:30)' },
    morning: { start: '08:30', end: '12:00', label: 'ครึ่งวันเช้า (08:30 - 12:00)' },
    afternoon: { start: '13:00', end: '16:30', label: 'ครึ่งวันบ่าย (13:00 - 16:30)' }
  };

  const deputies = [
    { id: 1, name: 'นายสมชาย ใจดี', position: 'รองผู้อำนวยการฝ่ายบริหาร' },
    { id: 2, name: 'นางสาวสมหญิง รักงาน', position: 'รองผู้อำนวยการฝ่ายวิชาการ' }
  ];

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
      startType: mode === 'single' ? 'full' : 'morning',
      endType: mode === 'single' ? 'full' : 'morning'
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
      startType: 'morning',
      endType: 'morning',
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
              <div className="relative">
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
        </div>
      </CardContent>
    </Card>
  );
}