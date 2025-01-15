import React from 'react';
import Badge from '../../../components/ui/Badge';

const StatusBadge = ({ status, isTechnicalStep }) => {
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

  const getVariant = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'destructive';
      case 'submitted':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <Badge variant={getVariant(status)}>
      {getStatusText(status, isTechnicalStep)}
    </Badge>
  );
};

export default StatusBadge;