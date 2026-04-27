import React from 'react';
import QueueTable from '../QueueTable';
import { ClipboardList } from 'lucide-react';

export default function QueueView({ onRowClick = () => {} }) {
  return (
    <div className="space-y-6">
      {/* Header with Title and Action Buttons */}
      <div className="flex items-start sm:items-center justify-between mb-8">
        {/* Left Side: Icon, Title, Subtitle */}
        <div className="flex items-start gap-3">
          <ClipboardList size={32} className="text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Underwriting Queue</h1>
            <p className="text-slate-600 text-sm mt-1">
              Manage pending SME loan applications
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] p-6 border-t-2 border-t-blue-600 hover:-translate-y-[1px] transition-all duration-200">
          <p className="text-slate-600 text-sm font-medium mb-2">Queue Size</p>
          <p className="text-4xl font-bold text-slate-800">4</p>
          <p className="text-xs text-slate-600 mt-4">+2 since yesterday</p>
        </div>

        <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] p-6 border-t-2 border-t-green-600 hover:-translate-y-[1px] transition-all duration-200">
          <p className="text-slate-600 text-sm font-medium mb-2">Approved Today</p>
          <p className="text-4xl font-bold text-green-600">2</p>
          <p className="text-xs text-slate-600 mt-4">50% approval rate</p>
        </div>

        <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] p-6 border-t-2 border-t-yellow-600 hover:-translate-y-[1px] transition-all duration-200">
          <p className="text-slate-600 text-sm font-medium mb-2">Needs Review</p>
          <p className="text-4xl font-bold text-yellow-600">1</p>
          <p className="text-xs text-slate-600 mt-4">Awaiting manual assessment</p>
        </div>
      </div>

      {/* Underwriting Queue Table */}
      <QueueTable onRowClick={onRowClick} />
    </div>
  );
}
