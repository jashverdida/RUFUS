import React, { useState } from 'react';
import {
  BellRing,
  AlertTriangle,
  Clock,
  FileText,
  CheckCircle,
  Bot,
  X,
} from 'lucide-react';

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'overdue',
      icon: AlertTriangle,
      borderColor: 'border-red-300',
      title: '⚠ Overdue Payment Detected',
      body: 'Sarao Motors Workshop is 7 days overdue on their payment.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'due',
      icon: Clock,
      borderColor: 'border-amber-300',
      title: 'Payment Due in 2 Days',
      body: "Maria's Catering & Events has a payment due on Apr 30.",
      time: '5 hours ago',
      read: false,
    },
    {
      id: 3,
      type: 'application',
      icon: FileText,
      borderColor: 'border-blue-300',
      title: 'New Application Submitted',
      body: "Leny's Beauty Salon & Spa submitted documents for review.",
      time: 'Yesterday, 3:45 PM',
      read: false,
    },
    {
      id: 4,
      type: 'approved',
      icon: CheckCircle,
      borderColor: 'border-green-300',
      title: 'Application Pre-Approved',
      body: 'Mang Juan Hardware scored 87 — recommended for fast-track approval.',
      time: 'Yesterday, 11:20 AM',
      read: true,
    },
    {
      id: 5,
      type: 'ai',
      icon: Bot,
      borderColor: 'border-cyan-300',
      title: 'AI Analysis Complete',
      body: 'RUFUS has finished scoring all 4 pending applications.',
      time: '2 days ago',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'overdue':
        return 'text-red-600';
      case 'due':
        return 'text-amber-600';
      case 'application':
        return 'text-blue-600';
      case 'approved':
        return 'text-green-600';
      case 'ai':
        return 'text-cyan-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        title="Notifications"
      >
        <BellRing size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-blue-100 z-50 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-blue-100 bg-blue-50 flex items-center justify-between">
            <h3 className="font-bold text-blue-900">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notif) => {
                const IconComponent = notif.icon;
                return (
                  <div
                    key={notif.id}
                    onClick={() => handleMarkAsRead(notif.id)}
                    className={`px-6 py-4 border-b border-blue-50 cursor-pointer hover:bg-blue-50 transition-colors flex gap-4 ${
                      notif.read ? 'bg-white' : 'bg-blue-50'
                    }`}
                  >
                    {/* Left Border */}
                    <div
                      className={`w-1 rounded-full flex-shrink-0 ${notif.borderColor}`}
                    />

                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                      <IconComponent size={18} className={getIconColor(notif.type)} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-blue-900 text-sm">{notif.title}</p>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {notif.body}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
                    </div>

                    {/* Unread Dot */}
                    {!notif.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-blue-100 bg-blue-50">
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors w-full text-center py-2">
              View All Notifications
            </button>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
