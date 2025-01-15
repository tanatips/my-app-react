import { Bell, Mail, Phone } from 'lucide-react';
import { useState } from 'react';

export default function NotificationCenter() {
  // Sample notification data
  const initialNotifications = [
    {
      id: '1',
      message: 'คำขอใช้งาน WiFi เลขที่ WF20240001 ได้รับการอนุมัติแล้ว',
      is_read: false,
      created_date: '2024-03-07T09:30:00',
      type: 'APPROVED',
      request_id: 'WF20240001',
      approver: {
        name: 'นายสมชาย ใจดี',
        position: 'ผู้อำนวยการศูนย์เทคโนโลยีสารสนเทศ',
        email: 'somchai.j@cgd.go.th',
        phone: '02-127-7000 ต่อ 6701'
      }
    },
    {
      id: '2',
      message: 'IT Support กำลังดำเนินการติดตั้ง WiFi ให้คุณ',
      is_read: false,
      created_date: '2024-03-07T10:15:00',
      type: 'IN_PROGRESS',
      request_id: 'WF20240001',
      operator: {
        name: 'นายมานะ ตั้งใจ',
        position: 'เจ้าหน้าที่ IT Support',
        email: 'mana.t@cgd.go.th',
        phone: '02-127-7000 ต่อ 6755'
      }
    },
    {
      id: '3',
      message: 'คุณมีคำขอใช้งาน WiFi ที่รอการอนุมัติ',
      is_read: false,
      created_date: '2024-03-07T11:00:00',
      type: 'PENDING_APPROVAL',
      request_id: 'WF20240002',
      requester: {
        name: 'นางสาวสมหญิง รักดี',
        position: 'นักวิชาการคอมพิวเตอร์ชำนาญการ',
        email: 'somying.r@cgd.go.th',
        phone: '02-127-7000 ต่อ 6434'
      }
    }
  ];

  const [notifications, setNotifications] = useState(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(
    initialNotifications.filter(n => !n.is_read).length
  );

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'APPROVED':
        return 'border-l-4 border-green-500 bg-green-50';
      case 'IN_PROGRESS':
        return 'border-l-4 border-blue-500 bg-blue-50';
      case 'PENDING_APPROVAL':
        return 'border-l-4 border-yellow-500 bg-yellow-50';
      default:
        return 'bg-gray-50';
    }
  };

  const handleMarkAsRead = (id) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, is_read: true } : notification
    );
    setNotifications(updatedNotifications);
    setUnreadCount(updatedNotifications.filter(n => !n.is_read).length);
  };

  return (
    <div className="relative">
      <button
        className="relative p-2 hover:bg-white/10 rounded-full text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 px-2 min-w-[20px] h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50 border text-gray-900">
          <div className="p-4 border-b">
            <h3 className="font-medium text-gray-900">การแจ้งเตือน</h3>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            <div className="p-4 space-y-4">
              {notifications.length === 0 ? (
                <p className="text-center text-gray-500">ไม่มีการแจ้งเตือน</p>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg text-gray-900 ${getNotificationStyle(notification.type)} 
                      ${notification.is_read ? 'opacity-70' : 'opacity-100'}`}
                    onClick={() => !notification.is_read && handleMarkAsRead(notification.id)}
                  >
                    <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">
                        เลขที่คำขอ: {notification.request_id}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(notification.created_date).toLocaleString('th-TH')}
                      </span>
                    </div>
                    
                    {notification.approver && (
                      <div className="mt-2 text-sm border-t pt-2">
                        <p className="font-medium text-gray-900">ผู้อนุมัติ: {notification.approver.name}</p>
                        <p className="text-gray-600 text-xs">{notification.approver.position}</p>
                        <div className="flex flex-col gap-1 mt-1 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>{notification.approver.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>{notification.approver.phone}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {notification.operator && (
                      <div className="mt-2 text-sm border-t pt-2">
                        <p className="font-medium text-gray-900">ผู้ดำเนินการ: {notification.operator.name}</p>
                        <p className="text-gray-600 text-xs">{notification.operator.position}</p>
                        <div className="flex flex-col gap-1 mt-1 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>{notification.operator.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>{notification.operator.phone}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}