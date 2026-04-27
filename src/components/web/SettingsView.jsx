import React from 'react';
import { Settings } from 'lucide-react';

export default function SettingsView() {
  return (
    <div className="space-y-6">
      {/* Header with Title and Action Buttons */}
      <div className="flex items-start sm:items-center justify-between mb-8">
        {/* Left Side: Icon, Title, Subtitle */}
        <div className="flex items-start gap-3">
          <Settings size={32} className="text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
            <p className="text-slate-600 text-sm mt-1">
              Configure system preferences and user settings
            </p>
          </div>
        </div>
        
        {/* Right Side: Action Buttons */}
        <div className="flex gap-3 ml-4 flex-shrink-0">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            Refresh
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Export
          </button>
        </div>
      </div>

      {/* Placeholder Card */}
      <div className="p-8 bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(6,81,237,0.08)] border border-slate-100">
        <h2 className="text-xl font-semibold text-slate-700">Settings Module (In Development)</h2>
        <p className="text-slate-600 text-sm mt-2">User preferences and system configuration options coming soon.</p>
      </div>
    </div>
  );
}
