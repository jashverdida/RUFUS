import React from 'react';
import { Eye, Archive, Info } from 'lucide-react';

// Expanded mock data with realistic Filipino SMEs
const mockApplications = [
  {
    id: 'SME-001-2024',
    businessName: 'Mang Juan Hardware & Building Supply',
    businessType: 'Retail - Construction Materials',
    requestedAmount: 350000,
    aiStatus: 'Pre-Approved',
    rufusScore: 87,
    confidence: '94%',
  },
  {
    id: 'SME-002-2024',
    businessName: 'Maria\'s Catering & Events',
    businessType: 'Food Services - Catering',
    requestedAmount: 180000,
    aiStatus: 'Pre-Approved',
    rufusScore: 82,
    confidence: '91%',
  },
  {
    id: 'SME-003-2024',
    businessName: 'Sarao Motors Workshop',
    businessType: 'Services - Auto Repair & Customization',
    requestedAmount: 425000,
    aiStatus: 'Review Needed',
    rufusScore: 71,
    confidence: '78%',
  },
  {
    id: 'SME-004-2024',
    businessName: 'Leny\'s Beauty Salon & Spa',
    businessType: 'Beauty & Wellness Services',
    requestedAmount: 95000,
    aiStatus: 'Pending',
    rufusScore: 65,
    confidence: '68%',
  },
];

const formatPhp = (amount) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
  }).format(amount);
};

const getStatusBadgeStyles = (status) => {
  switch (status) {
    case 'Pre-Approved':
      return 'bg-green-100 text-green-800';
    case 'Review Needed':
      return 'bg-yellow-100 text-yellow-800';
    case 'Pending':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-slate-100 text-slate-800';
  }
};

const getScoreColor = (score) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 70) return 'text-blue-600';
  return 'text-slate-700';
};

export default function QueueTable({ applications = mockApplications, onRowClick = () => {} }) {
  const displayApplications = applications.length > 0 ? applications : mockApplications;

  if (displayApplications.length === 0) {
    return (
      <div className="w-full bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(6,81,237,0.08)] p-8 text-center border border-slate-100">
        <p className="text-slate-600 font-medium">No applications to display.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(6,81,237,0.08)] border border-slate-100 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Business Info
            </th>
            <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Loan Request
            </th>
            <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              AI Status
            </th>
            <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              RUFUS Score
            </th>
            <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {displayApplications.map((application) => (
            <tr
              key={application.id}
              className="border-b border-slate-100 hover:bg-slate-50 transition-all duration-200 group"
            >
              {/* Business Info - Stacked */}
              <td className="px-6 py-4 text-left">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-900">
                    {application.businessName}
                  </p>
                  <p className="text-xs text-slate-500">
                    {application.businessType}
                  </p>
                </div>
              </td>

              {/* Loan Request */}
              <td className="px-6 py-4 text-left">
                <p className="text-sm font-bold text-slate-900">
                  {formatPhp(application.requestedAmount)}
                </p>
              </td>

              {/* AI Status Badge */}
              <td className="px-6 py-4 text-left">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeStyles(
                    application.aiStatus
                  )}`}
                >
                  {application.aiStatus}
                </span>
              </td>

              {/* RUFUS Score with Info Tooltip */}
              <td className="px-6 py-4 text-left">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-bold ${getScoreColor(
                      application.rufusScore
                    )}`}
                  >
                    {application.rufusScore}
                  </span>
                  <div className="relative group">
                    <button className="p-1 text-slate-400 hover:text-blue-600 cursor-help transition-colors" title="Score details">
                      <Info size={14} />
                    </button>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                      <div className="bg-slate-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                        <p className="font-semibold mb-1">Score Breakdown</p>
                        <p>• Operating History: 40%</p>
                        <p>• Cash Flow Health: 35%</p>
                        <p>• Debt Ratio: 25%</p>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 -mt-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>

              {/* Action Buttons */}
              <td className="py-4 px-6">
                <div className="flex gap-3">
                  <button onClick={() => onRowClick(application)} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg" title="View Details">
                    <Eye size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg" title="Archive">
                    <Archive size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
