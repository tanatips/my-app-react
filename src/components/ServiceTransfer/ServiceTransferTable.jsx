import React from 'react';

const ServiceTransferTable = () => {
  // ข้อมูลจำลองสำหรับตาราง
  const transferHistory = [
    {
      id: 1,
      positionId: "P001",
      employeeName: "นายสมชาย ใจดี",
      currentDepartment: "ฝ่ายบุคคล",
      targetDepartment: "ฝ่ายการเงิน",
      startDate: "2025-01-01",
      endDate: "2025-06-30",
      orderNumber: "1/2567",
      orderEffectiveDate: "2024-12-15",
      status: "อนุมัติ",
      reason: "ช่วยราชการตามนโยบาย"
    },
    {
      id: 2,
      positionId: "P002",
      employeeName: "นางสาวสมศรี รักงาน",
      currentDepartment: "ฝ่ายไอที",
      targetDepartment: "สำนักงานใหญ่",
      startDate: "2025-03-01",
      endDate: "2025-08-31",
      orderNumber: "2/2567",
      orderEffectiveDate: "2025-02-15",
      status: "รอดำเนินการ",
      reason: "สนับสนุนงานโครงการพิเศษ"
    },
    {
      id: 3,
      positionId: "P003",
      employeeName: "นายวิชัย ตั้งใจ",
      currentDepartment: "ฝ่ายการเงิน",
      targetDepartment: "ฝ่ายบุคคล",
      startDate: "2024-12-01",
      endDate: "2025-05-31",
      orderNumber: "15/2566",
      orderEffectiveDate: "2024-11-15",
      status: "สิ้นสุดการช่วยราชการ",
      reason: "ทดแทนอัตรากำลัง"
    }
  ];

  // ฟังก์ชันสำหรับกำหนดสีของสถานะ
  const getStatusStyle = (status) => {
    switch (status) {
      case 'อนุมัติ':
        return 'bg-green-100 text-green-800';
      case 'รอดำเนินการ':
        return 'bg-yellow-100 text-yellow-800';
      case 'สิ้นสุดการช่วยราชการ':
        return 'bg-gray-100 text-gray-800';
      case 'ไม่อนุมัติ':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // ฟังก์ชันสำหรับจัดรูปแบบวันที่
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 mt-5">
      <h2 className="text-xl font-semibold mb-4">ประวัติการช่วยราชการ</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 border text-left">รหัสตำแหน่ง</th>
              <th className="px-4 py-2 border text-left">ชื่อ-นามสกุล</th>
              <th className="px-4 py-2 border text-left">หน่วยงานต้นสังกัด</th>
              <th className="px-4 py-2 border text-left">หน่วยงานที่ช่วยราชการ</th>
              <th className="px-4 py-2 border text-left">วันที่เริ่มต้น</th>
              <th className="px-4 py-2 border text-left">วันที่สิ้นสุด</th>
              <th className="px-4 py-2 border text-left">เลขที่คำสั่ง</th>
              <th className="px-4 py-2 border text-left">วันที่มีผลคำสั่ง</th>
              {/* <th className="px-4 py-2 border text-left">สถานะ</th> */}
            </tr>
          </thead>
          <tbody>
            {transferHistory.map((transfer) => (
              <tr key={transfer.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{transfer.positionId}</td>
                <td className="px-4 py-2 border">{transfer.employeeName}</td>
                <td className="px-4 py-2 border">{transfer.currentDepartment}</td>
                <td className="px-4 py-2 border">{transfer.targetDepartment}</td>
                <td className="px-4 py-2 border">{formatDate(transfer.startDate)}</td>
                <td className="px-4 py-2 border">{formatDate(transfer.endDate)}</td>
                <td className="px-4 py-2 border">{transfer.orderNumber}</td>
                <td className="px-4 py-2 border">{formatDate(transfer.orderEffectiveDate)}</td>
                {/* <td className="px-4 py-2 border">
                  <span className={`px-2 py-1 rounded-full text-sm ${getStatusStyle(transfer.status)}`}>
                    {transfer.status}
                  </span>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceTransferTable;