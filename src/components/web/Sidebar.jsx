import React from 'react';
import rufusLogo from '../../assets/rufus-logo.png';
import { LayoutDashboard, FileText, TrendingUp, Settings } from 'lucide-react';

const iconMap = {
  dashboard: LayoutDashboard,
  applications: FileText,
  reports: TrendingUp,
  settings: Settings,
};

export default function Sidebar({ activeView = 'dashboard', onViewChange = () => {} }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'applications', label: 'Applications', icon: 'applications' },
    { id: 'reports', label: 'Reports', icon: 'reports' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 fixed left-0 top-0 flex flex-col shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
      {/* Logo/Header */}
      <div className="px-6 py-8 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <img src={rufusLogo} alt="RUFUS Logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold text-slate-800">RUFUS</h1>
        </div>
        <p className="text-xs text-slate-600 mt-2">
          RAFI Unified Financial Underwriting
        </p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        {menuItems.map((item) => {
          const IconComponent = iconMap[item.icon];
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600 font-semibold shadow-[0_2px_10px_-3px_rgba(6,81,237,0.15)] hover:-translate-x-[2px]'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 hover:-translate-x-[2px]'
              }`}
            >
              <IconComponent size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-8 border-t border-slate-200">
        <div className="flex items-center gap-3 px-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">
              John Dela Cruz
            </p>
            <p className="text-xs text-slate-600 truncate">Officer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
