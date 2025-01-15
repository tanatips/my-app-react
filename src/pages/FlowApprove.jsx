import React, { useState } from 'react';

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
        case 'pending':
          return 'รอดำเนินการ';
        case 'approved':
          return 'ดำเนินการเสร็จสิ้น';
        case 'rejected':
          return 'ติดปัญหาทางเทคนิค';
        default:
          return status;
      }
    }

    switch (status) {
      case 'pending':
        return 'รออนุมัติ';
      case 'approved':
        return 'อนุมัติแล้ว';
      case 'rejected':
        return 'ไม่อนุมัติ';
      case 'submitted':
        return 'ส่งคำขอแล้ว';
      default:
        return status;
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {getStatusText(status, isTechnicalStep)}
    </span>
  );
};

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
            className={`px-4 py-2 text-white rounded hover:opacity-90 ${
              isTechnicalStep ? 'bg-orange-600' : 'bg-red-600'
            }`}
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};

const WorkflowStep = ({ step, currentStep, onApprove, onReject }) => {
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const isActive = step.order === currentStep;
  const isPassed = step.order < currentStep;
  const isRejected = step.status === 'rejected';
  const isTechnicalStep = step.order === 4;
  const isFirstStep = step.order === 1;
  
  const getActionButtons = () => {
    if (!isActive || isFirstStep) return null;
    
    if (isTechnicalStep) {
      return (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onApprove(step.order)}
            disabled={isRejected}
            className={`px-4 py-2 text-white rounded text-sm font-medium
              ${isRejected 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'}`}
          >
            ดำเนินการเสร็จสิ้น
          </button>
          <button
            onClick={() => setShowRejectDialog(true)}
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 text-sm font-medium"
          >
            ติดปัญหาทางเทคนิค
          </button>
        </div>
      );
    }

    return (
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onApprove(step.order)}
          disabled={isRejected}
          className={`px-4 py-2 text-white rounded text-sm font-medium
            ${isRejected 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700'}`}
        >
          อนุมัติ
        </button>
        <button
          onClick={() => setShowRejectDialog(true)}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-medium"
        >
          ไม่อนุมัติ
        </button>
      </div>
    );
  };

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

      {step.rejectReason && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="text-sm font-medium text-red-800">
            {isTechnicalStep ? 'ปัญหาทางเทคนิค:' : 'เหตุผลที่ไม่อนุมัติ:'}
          </div>
          <div className="text-sm text-red-600">{step.rejectReason}</div>
        </div>
      )}

      {getActionButtons()}

      {isPassed && (
        <div className="mt-2 text-sm text-gray-500">
          ดำเนินการเมื่อ: {step.completedAt}
        </div>
      )}

      <RejectDialog 
        isOpen={showRejectDialog}
        onClose={() => setShowRejectDialog(false)}
        onReject={(reason) => onReject(step.order, reason)}
        isTechnicalStep={isTechnicalStep}
      />
    </div>
  );
};

const FlowApprove = () => {
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

  const handleApprove = (step) => {
    setWorkflowSteps(prevSteps =>
      prevSteps.map(s => {
        if (s.order === step) {
          return {
            ...s,
            status: 'approved',
            completedAt: new Date().toLocaleString('th-TH')
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

export default FlowApprove;