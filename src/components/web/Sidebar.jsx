import React from 'react';
import rufusLogo from '../../assets/rufus-logo.png';
import { LayoutDashboard, FileText, TrendingUp, Settings, ChevronRight } from 'lucide-react';

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
    <aside className="w-20 md:w-64 h-screen bg-white border-r border-slate-200 fixed left-0 top-0 flex flex-col shadow-[2px_0_15px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 z-50">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-0 w-1 bg-rufus-cyan h-full shadow-[0_0_20px_rgba(0,194,209,0.3)]"></div>
      
      {/* Decorative Circuit Element */}
      <div className="absolute -top-12 -left-12 opacity-10 pointer-events-none hidden md:block">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#0A8EA0" strokeWidth="2" strokeDasharray="10 20" />
          <circle cx="20" cy="100" r="5" fill="#0A8EA0" />
          <circle cx="180" cy="100" r="5" fill="#0A8EA0" />
          <circle cx="100" cy="20" r="5" fill="#0A8EA0" />
          <circle cx="100" cy="180" r="5" fill="#0A8EA0" />
        </svg>
      </div>

      {/* Logo/Header */}
      <div className="px-4 md:px-6 py-6 md:py-8 border-b border-slate-200 relative z-10 flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 bg-rufus-blue blur-md opacity-20 rounded-full"></div>
          <img src={rufusLogo} alt="RUFUS Logo" className="w-10 h-10 relative z-10" />
        </div>
        <div className="hidden md:block">
          <h1 className="text-2xl font-space font-bold tracking-wider text-slate-800">RUFUS</h1>
          <p className="text-[10px] text-slate-500 mt-1 tracking-widest uppercase truncate w-36">
            RAFI Frontline System
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 md:px-4 py-8 space-y-2 relative z-10">
        {menuItems.map((item) => {
          const IconComponent = iconMap[item.icon];
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center relative gap-3 px-3 md:px-4 py-3 rounded-lg transition-all duration-300 group overflow-hidden ${
                isActive
                  ? 'text-rufus-blue bg-blue-50 font-bold tracking-wide justify-center md:justify-start'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 font-medium tracking-wide justify-center md:justify-start'
              }`}
            >
              {/* Active Indicator & Glow */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-rufus-blue transition-transform duration-300 ${isActive ? 'translate-y-0 shadow-[0_0_10px_rgba(26,110,219,0.3)]' : '-translate-y-full group-hover:translate-y-0 group-hover:shadow-[0_0_10px_rgba(30,41,59,0.1)]'}`}></div>
              
              <IconComponent size={24} className={`transition-colors flex-shrink-0 ${isActive ? 'text-rufus-blue' : 'group-hover:text-slate-800'}`} title={item.label} />
              <span className="hidden md:flex flex-1 text-left uppercase text-sm">{item.label}</span>
              {isActive && <ChevronRight size={16} className="text-rufus-blue hidden md:block" />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-2 md:px-4 py-6 border-t border-slate-200 bg-slate-50 relative z-10">
        <div className="flex items-center justify-center md:justify-start gap-3 md:px-2">
          <div className="w-10 h-10 flex-shrink-0 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm" title="John Dela Cruz">
            <span className="text-rufus-blue font-bold font-space text-sm">JD</span>
          </div>
          <div className="hidden md:block flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate tracking-wide">
              John Dela Cruz
            </p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider truncate mt-0.5">Officer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
