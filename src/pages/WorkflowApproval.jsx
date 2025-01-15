import React, { useEffect, useRef, useState } from 'react';

// Create a default export function component
const WorkflowApproval = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [workflowSteps, setWorkflowSteps] = useState([
    {
      order: 1,
      title: 'พนักงานยื่นคำขอ',
      description: 'พนักงานส่งคำขอใช้งานระบบ WiFi',
      assignee: 'นายสมชาย ใจดี',
      status: 'submitted',
      completedAt: '17/04/2024 09:30'
    },
    {
      order: 2,
      title: 'ผอ.กอง พิจารณา',
      description: 'ผู้อำนวยการกองพิจารณาคำขอ',
      assignee: 'นางสาวสมศรี รักงาน',
      status: 'pending'
    },
    {
      order: 3,
      title: 'ผอ.ศูนย์ พิจารณา',
      description: 'ผู้อำนวยการศูนย์พิจารณาคำขอขั้นสุดท้าย',
      assignee: 'นายมานะ ทำงาน',
      status: 'pending'
    },
    {
      order: 4,
      title: 'ดำเนินการทางเทคนิค',
      description: 'กลุ่มเครือข่ายดำเนินการตั้งค่าระบบ',
      assignee: 'ทีม Network & Security',
      status: 'pending'
    }
  ]);

  const handleApprove = (step, signature) => {
    setWorkflowSteps(prevSteps =>
      prevSteps.map(s => {
        if (s.order === step) {
          return {
            ...s,
            status: 'approved',
            completedAt: new Date().toLocaleString('th-TH'),
            signature
          };
        }
        return s;
      })
    );
    setCurrentStep(step + 1);
  };

  const handleReject = (step, reason) => {
    setWorkflowSteps(prevSteps =>
      prevSteps.map(s => {
        if (s.order === step) {
          return {
            ...s,
            status: 'rejected',
            rejectReason: reason,
            completedAt: new Date().toLocaleString('th-TH')
          };
        }
        return s;
      })
    );
  };

  const handleCancelReject = (step) => {
    setWorkflowSteps(prevSteps =>
      prevSteps.map(s => {
        if (s.order === step) {
          return {
            ...s,
            status: 'pending',
            rejectReason: null,
            completedAt: null
          };
        }
        return s;
      })
    );
  };

  // StatusBadge Component
  const StatusBadge = ({ status, isTechnicalStep }) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      submitted: 'bg-blue-100 text-blue-800'
    };

    const getStatusText = (status, isTechnicalStep) => {
      if (isTechnicalStep) {
        switch (status) {
          case 'pending': return 'รอดำเนินการ';
          case 'approved': return 'ดำเนินการเสร็จสิ้น';
          case 'rejected': return 'ติดปัญหาทางเทคนิค';
          default: return status;
        }
      }

      switch (status) {
        case 'pending': return 'รออนุมัติ';
        case 'approved': return 'อนุมัติแล้ว';
        case 'rejected': return 'ไม่อนุมัติ';
        case 'submitted': return 'ส่งคำขอแล้ว';
        default: return status;
      }
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {getStatusText(status, isTechnicalStep)}
      </span>
    );
  };

  // SignatureDialog Component
  const SignatureDialog = ({ isOpen, onClose, onApprove }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);
    const [context, setContext] = useState(null);

    useEffect(() => {
      if (selectedOption === 'draw') {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        setContext(ctx);

        // Clear canvas on mount
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }, [selectedOption]);

    const startDrawing = (e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.type.includes('touch') ? 
        e.touches[0].clientX - rect.left : 
        e.clientX - rect.left;
      const y = e.type.includes('touch') ? 
        e.touches[0].clientY - rect.top : 
        e.clientY - rect.top;
      
      setIsDrawing(true);
      setLastX(x);
      setLastY(y);
    };

    const draw = (e) => {
      if (!isDrawing || !context) return;
      e.preventDefault();

      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.type.includes('touch') ? 
        e.touches[0].clientX - rect.left : 
        e.clientX - rect.left;
      const y = e.type.includes('touch') ? 
        e.touches[0].clientY - rect.top : 
        e.clientY - rect.top;

      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(x, y);
      context.stroke();

      setLastX(x);
      setLastY(y);
    };

    const stopDrawing = () => {
      setIsDrawing(false);
    };

    const clearCanvas = () => {
      if (context) {
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    };

    const handleSave = () => {
      if (canvasRef.current) {
        const signature = canvasRef.current.toDataURL('image/png');
        onApprove(signature);
        onClose();
      }
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-xl">
          <h3 className="text-lg font-semibold mb-4">เลือกวิธีการลงลายเซ็น</h3>
          
          {!selectedOption ? (
            <div className="space-y-4">
              <button
                onClick={() => setSelectedOption('draw')}
                className="w-full p-4 border rounded-lg hover:bg-gray-50 text-left"
              >
                <div className="font-medium">วาดลายเซ็น</div>
                <div className="text-sm text-gray-600">เซ็นชื่อผ่านหน้าจอ</div>
              </button>
              
              <button
                onClick={() => setSelectedOption('upload')}
                className="w-full p-4 border rounded-lg hover:bg-gray-50 text-left"
              >
                <div className="font-medium">ใช้ลายเซ็นที่บันทึกไว้</div>
                <div className="text-sm text-gray-600">เลือกจากรูปลายเซ็นที่เคยอัพโหลด</div>
              </button>
            </div>
          ) : selectedOption === 'draw' ? (
            <div className="p-4">
              <div className="border rounded mb-4 bg-white">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={200}
                  className="touch-none"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseOut={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={clearCanvas}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  ล้าง
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  บันทึกลายเซ็น
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <img
                src="/api/placeholder/400/200"
                alt="Saved signature"
                className="border rounded mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={() => {
                    onApprove('/api/placeholder/400/200');
                    onClose();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  ใช้ลายเซ็นนี้
                </button>
              </div>
            </div>
          )}
          
          {selectedOption && (
            <button
              onClick={() => setSelectedOption(null)}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              ← กลับไปเลือกวิธีการใหม่
            </button>
          )}
        </div>
      </div>
    );
  };

  // RejectDialog Component
  const RejectDialog = ({ isOpen, onClose, onReject, isTechnicalStep = false }) => {
    const [reason, setReason] = useState('');

    const handleSubmit = () => {
      if (reason.trim()) {
        onReject(reason);
        setReason('');
        onClose();
      }
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">
            {isTechnicalStep ? 'ระบุปัญหาทางเทคนิค' : 'ระบุเหตุผลที่ไม่อนุมัติ'}
          </h3>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-2 border rounded-md mb-4 h-32"
            placeholder={isTechnicalStep ? "กรุณาระบุรายละเอียดปัญหา..." : "กรุณาระบุเหตุผล..."}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-red-600 text-white rounded hover:opacity-90"
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </div>
    );
  };
  const formatThaiBuddhistDate = (date) => {
    const thaiDate = new Date(date);
    const buddhistYear = thaiDate.getFullYear() + 543;
    const month = String(thaiDate.getMonth() + 1).padStart(2, '0');
    const day = String(thaiDate.getDate()).padStart(2, '0');
    const hours = String(thaiDate.getHours()).padStart(2, '0');
    const minutes = String(thaiDate.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${buddhistYear} ${hours}:${minutes}`;
  };
  // WorkflowStep Component
  const WorkflowStep = ({ step, currentStep, onApprove, onReject }) => {
    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [showSignatureDialog, setShowSignatureDialog] = useState(false);
    const isActive = step.order === currentStep;
    const isPassed = step.order < currentStep;
    const isRejected = step.status === 'rejected';
    const isTechnicalStep = step.order === 4;
    const isFirstStep = step.order === 1;
    const convertToBuddhistEra = (dateString) => {
      return dateString.replace(/\/(\d{4})/, (match, year) => 
        `/${parseInt(year) + 543}`
      );
    }
    return (
      <div className={`p-4 border rounded-lg ${isActive ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
          <StatusBadge status={step.status} isTechnicalStep={isTechnicalStep} />
        </div>
        
        {step.assignee && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <svg className="w-4 h-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>ผู้รับผิดชอบ: {step.assignee}</span>
          </div>
        )}
         {step.completedAt && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <span>ดำเนินการเมื่อ: {convertToBuddhistEra(step.completedAt)}</span>
          </div>
         )
         }
        {isActive && !isFirstStep && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setShowSignatureDialog(true)}
              disabled={isRejected}
              className={`px-4 py-2 text-white rounded text-sm font-medium
                ${isRejected ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {isTechnicalStep ? 'ดำเนินการเสร็จสิ้น' : 'อนุมัติ'}
            </button>
            <button
              onClick={() => setShowRejectDialog(true)}
              className={`px-4 py-2 text-white rounded text-sm font-medium
                ${isTechnicalStep ? 'bg-orange-600 hover:bg-orange-700' : 'bg-red-600 hover:bg-red-700'}`}
            >
              {isTechnicalStep ? 'ติดปัญหาทางเทคนิค' : 'ไม่อนุมัติ'}
            </button>
          </div>
        )}

        {step.signature && (
          <div className="mt-2 border-t pt-2">
            <div className="text-sm text-gray-600">ลายเซ็นผู้อนุมัติ:</div>
            <img src={step.signature} alt="Signature" className="h-16 mt-1" />
          </div>
        )}

        <SignatureDialog
          isOpen={showSignatureDialog}
          onClose={() => setShowSignatureDialog(false)}
          onApprove={(signature) => {
            onApprove(step.order, signature);
            setShowSignatureDialog(false);
          }}
        />

        <RejectDialog
          isOpen={showRejectDialog}
          onClose={() => setShowRejectDialog(false)}
          onReject={(reason) => {
            onReject(step.order, reason);
            setShowRejectDialog(false);
          }}
          isTechnicalStep={isTechnicalStep}
        />
      </div>
    );
  };

  // WorkflowStatus Component
  const WorkflowStatus = ({ steps, onCancelReject }) => {
    const rejectedSteps = steps.filter(step => step.status === 'rejected');
    
    if (rejectedSteps.length === 0) return null;

    return (
      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="font-semibold text-red-800 mb-2">รายการที่ไม่อนุมัติ</h3>
        {rejectedSteps.map((step) => (
          <div key={step.order} className="mb-2 last:mb-0 flex justify-between items-start">
            <div>
              <div className="font-medium text-red-700">{step.title}</div>
              <div className="text-sm text-red-600">เหตุผล: {step.rejectReason}</div>
              <div className="text-sm text-gray-600">เวลา: {step.completedAt}</div>
            </div>
            <button
              onClick={() => onCancelReject(step.order)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              ยกเลิกการไม่อนุมัติ
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-bold">ลำดับขั้นตอนการอนุมัติ WiFi</h2>
        </div>

        <div className="p-6">
          <WorkflowStatus 
            steps={workflowSteps}
            onCancelReject={handleCancelReject}
          />
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded">
              <div 
                className="h-full bg-blue-600 rounded transition-all duration-500"
                style={{ width: `${((currentStep - 1) / workflowSteps.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>เริ่มต้น</span>
              <span>กำลังดำเนินการ</span>
              <span>เสร็จสิ้น</span>
            </div>
          </div>

          <div className="space-y-4">
            {workflowSteps.map((step) => (
              <WorkflowStep
                key={step.order}
                step={step}
                currentStep={currentStep}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowApproval;