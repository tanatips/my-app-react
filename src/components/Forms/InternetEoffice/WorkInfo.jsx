import { React, useState } from 'react';

const WorkInfo = ({ formData, handleChange }) => {
  // Mock data สำหรับ dropdowns
  const [regions] = useState([
    { id: '1', name: 'คลังเขต 1' },
    { id: '2', name: 'คลังเขต 2' },
    { id: '3', name: 'คลังเขต 3' },
    { id: '4', name: 'คลังเขต 4' },
    { id: '5', name: 'คลังเขต 5' }
  ]);

  const [provinces] = useState([
    { id: '1', name: 'กรุงเทพมหานคร' },
    { id: '2', name: 'นนทบุรี' },
    { id: '3', name: 'ปทุมธานี' },
    { id: '4', name: 'เชียงใหม่' },
    { id: '5', name: 'ขอนแก่น' },
    { id: '6', name: 'ชลบุรี' }
  ]);
  const [divisions] = useState([
    { id: '1', name: 'กองบริหารการคลัง' },
    { id: '2', name: 'กองการเงินการบัญชีภาครัฐ' },
    { id: '3', name: 'กองกฎหมาย' },
    { id: '4', name: 'กองตรวจสอบภายใน' },
    { id: '5', name: 'กองบริหารการรับ-จ่ายเงินภาครัฐ' },
    { id: '6', name: 'กองบริหารทรัพยากรบุคคล' },
    { id: '7', name: 'ศูนย์เทคโนโลยีสารสนเทศ' },
    { id: '8', name: 'สถาบันพัฒนาบุคลากร' },
    { id: '9', name: 'สำนักงานเลขานุการกรม' }
  ]);

  const [departments] = useState({
    'กองบริหารการคลัง': [
      { id: '1', name: 'กลุ่มการเงิน' },
      { id: '2', name: 'กลุ่มบัญชี' },
      { id: '3', name: 'กลุ่มงบประมาณ' },
      { id: '4', name: 'ฝ่ายบริหารทั่วไป' }
    ],
    'ศูนย์เทคโนโลยีสารสนเทศ': [
      { id: '5', name: 'กลุ่มพัฒนาระบบงาน' },
      { id: '6', name: 'กลุ่มบริหารจัดการระบบเครือข่าย' },
      { id: '7', name: 'กลุ่มบริหารจัดการฐานข้อมูล' },
      { id: '8', name: 'ฝ่ายบริหารทั่วไป' }
    ],
    'สถาบันพัฒนาบุคลากร': [
      { id: '9', name: 'กลุ่มพัฒนาทรัพยากรบุคคล' },
      { id: '10', name: 'กลุ่มวิชาการ' },
      { id: '11', name: 'ฝ่ายบริหารทั่วไป' }
    ]
  });

  // เพิ่ม state สำหรับตำแหน่ง
  const [positions] = useState([
    { id: '1', name: 'นักวิชาการคอมพิวเตอร์ชำนาญการพิเศษ' },
    { id: '2', name: 'นักวิชาการคอมพิวเตอร์ชำนาญการ' },
    { id: '3', name: 'นักวิชาการคอมพิวเตอร์ปฏิบัติการ' },
    { id: '4', name: 'นักวิชาการเงินและบัญชีชำนาญการพิเศษ' },
    { id: '5', name: 'นักวิชาการเงินและบัญชีชำนาญการ' },
    { id: '6', name: 'นักวิชาการเงินและบัญชีปฏิบัติการ' },
    { id: '7', name: 'นักทรัพยากรบุคคลชำนาญการพิเศษ' },
    { id: '8', name: 'นักทรัพยากรบุคคลชำนาญการ' },
    { id: '9', name: 'นักทรัพยากรบุคคลปฏิบัติการ' },
    { id: '10', name: 'นักวิเคราะห์นโยบายและแผนชำนาญการพิเศษ' },
    { id: '11', name: 'นักวิเคราะห์นโยบายและแผนชำนาญการ' },
    { id: '12', name: 'นักวิเคราะห์นโยบายและแผนปฏิบัติการ' },
    { id: '13', name: 'เจ้าพนักงานการเงินและบัญชีอาวุโส' },
    { id: '14', name: 'เจ้าพนักงานการเงินและบัญชีชำนาญงาน' },
    { id: '15', name: 'เจ้าพนักงานการเงินและบัญชีปฏิบัติงาน' }
  ]);
  return (
    <div className="space-y-6 bg-gray-50 p-4 rounded">
      <h3 className="font-semibold text-lg">ข้อมูลการปฏิบัติราชการ</h3>

      {/* Employee Type */}
      <div>
        <p className="mb-2">ประเภท</p>
        <div className="flex flex-wrap gap-4">
          {[
            'ข้าราชการ',
            'ลูกจ้างประจำ',
            'พนักงานราชการ',
            'ลูกจ้างชั่วคราว'
          ].map(type => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="employeeType"
                value={type}
                checked={formData.employeeType === type}
                onChange={handleChange}
                className="mr-2"
              />
              {type}
            </label>
          ))}
          <div className="flex items-center gap-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="employeeType"
                value="other"
                checked={formData.employeeType === 'other'}
                onChange={handleChange}
                className="mr-2"
              />
              อื่นๆ
            </label>
            <input
              type="text"
              name="employeeTypeOther"
              value={formData.employeeTypeOther}
              onChange={handleChange}
              disabled={formData.employeeType !== 'other'}
              className="border rounded p-1 w-32"
            />
          </div>
        </div>
      </div>

      {/* Work Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">วันที่เริ่มปฏิบัติราชการ</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1">วันที่สิ้นสุด (เกษียณ/สิ้นสุดสัญญา)</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      {/* Work Location */}
      
      <div className="mt-4">
            <p className="mb-2">
              สถานที่ปฏิบัติงาน
              <span className="text-red-500 ml-1">*</span>
            </p>
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="workLocation"
                  value="central"
                  className="mr-2"
                  required
                />
                ส่วนกลาง
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="workLocation"
                  value="treasuryRegions"
                  className="mr-2"
                />
                คลังเขต
              </label>
              <div className="flex items-center gap-4">
                <select
                  name="treasuryRegions"
                  value={formData.treasuryRegions}
                  onChange={handleChange}
                  className="border rounded p-1 w-32 mr-4"
                >
                  <option value="">เลือกคลังเขต</option>
                  <option value="1">คลังเขต 1</option>
                  <option value="2">คลังเขต 2</option>
                  <option value="3">คลังเขต 3</option>
                  <option value="4">คลังเขต 4</option>
                  <option value="5">คลังเขต 5</option>
                </select>
                <span className="mr-2">คลังจังหวัด</span>
                <select
                  name="provincialTreasury"
                  value={formData.provincialTreasury}
                  onChange={handleChange}
                  className="border rounded p-1 w-32"
                >
                  <option value="">เลือกจังหวัด</option>
                  <option value="กรุงเทพฯ">กรุงเทพฯ</option>
                  <option value="เชียงใหม่">เชียงใหม่</option>
                  <option value="นครราชสีมา">นครราชสีมา</option>
                  <option value="ขอนแก่น">ขอนแก่น</option>
                  <option value="ชลบุรี">ชลบุรี</option>
                  <option value="สงขลา">สงขลา</option>
                </select>
              </div>
            </div>
          </div>

      {/* Department Information */}
      <div className="space-y-4">
      <div>
          <label className="block mb-1">สำนัก/กอง/ศูนย์/สถาบัน/กลุ่ม</label>
          <select
            name="division"
            value={formData.division}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">เลือกสำนัก/กอง/ศูนย์</option>
            {divisions.map(division => (
              <option key={division.id} value={division.name}>
                {division.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">กลุ่มงาน/ฝ่าย</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            disabled={!formData.division}
            className="w-full border rounded p-2"
          >
            <option value="">เลือกกลุ่มงาน/ฝ่าย</option>
            {formData.division && departments[formData.division]?.map(dept => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">ตำแหน่ง</label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">เลือกตำแหน่ง</option>
            {positions.map(position => (
              <option key={position.id} value={position.name}>
                {position.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export { WorkInfo };
