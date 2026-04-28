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

const getStatusBadge = (status) => {
  switch (status) {
    case 'Pre-Approved':
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#00C896]/15 text-[#00C896] border border-[#00C896]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C896] animate-pulse shadow-[0_0_8px_rgba(0,200,150,0.8)]"></span>
          {status}
        </span>
      );
    case 'Review Needed':
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F4A124]/15 text-[#F4A124] border border-[#F4A124]">
          {status}
        </span>
      );
    case 'Pending':
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#8899BB]/15 text-[#8899BB] border border-[#8899BB]">
          {status}
        </span>
      );
    default:
      return null;
  }
};

const ScoreRing = ({ score }) => {
  let color = '#8899BB'; // Gray
  if (score >= 80) color = '#00C896'; // Green
  else if (score >= 70) color = '#F4A124'; // Amber

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        {/* Background circle */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke="#E0E7FF"
          strokeWidth="4"
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke={color}
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="relative z-10 text-xs font-bold text-blue-900">
        {score}
      </span>
    </div>
  );
};

export default function QueueTable({ applications = mockApplications, onRowClick = () => {} }) {
  const displayApplications = applications.length > 0 ? applications : mockApplications;

  if (displayApplications.length === 0) {
    return (
      <div className="w-full bg-white rounded-2xl shadow-[0_2px_16px_rgba(26,110,219,0.08)] p-8 text-center border border-blue-100">
        <p className="text-slate-600 font-medium uppercase tracking-[0.1em]">No applications to display.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-[0_2px_16px_rgba(26,110,219,0.08)] border border-blue-100 overflow-hidden relative group">
      <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-blue-100 bg-blue-50 sticky top-0 z-20">
        <div className="col-span-5 text-[11px] font-bold text-rufus-blue uppercase tracking-wider">Business Info</div>
        <div className="col-span-2 text-[11px] font-bold text-rufus-blue uppercase tracking-wider">Loan Request</div>
        <div className="col-span-2 text-[11px] font-bold text-rufus-blue uppercase tracking-wider">AI Status</div>
        <div className="col-span-2 text-[11px] font-bold text-rufus-blue uppercase tracking-wider">RUFUS Score</div>
        <div className="col-span-1 text-[11px] font-bold text-rufus-blue uppercase tracking-wider text-right">Actions</div>
      </div>
      
      <div className="flex flex-col relative z-10 w-full divide-y divide-blue-100">
        {displayApplications.map((application) => (
          <div
            key={application.id}
            className="grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-blue-50 transition-all duration-200 group/row relative bg-white hover:-translate-y-[1px]"
          >
            {/* Left Blue Border on Hover */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-rufus-blue opacity-0 group-hover/row:opacity-100 transition-opacity shadow-[0_0_10px_rgba(26,110,219,0.4)]"></div>

            {/* Business Info */}
            <div className="col-span-5">
              <p className="text-sm font-bold text-blue-900 mb-1">
                {application.businessName}
              </p>
              <p className="text-xs text-slate-600 uppercase tracking-wider">
                {application.businessType}
              </p>
            </div>

            {/* Loan Request */}
            <div className="col-span-2">
              <p className="text-sm font-bold text-blue-900 tracking-wide font-space">
                {formatPhp(application.requestedAmount)}
              </p>
            </div>

            {/* AI Status Badge */}
            <div className="col-span-2">
              {getStatusBadge(application.aiStatus)}
            </div>

            {/* RUFUS Score with Circular Progess */}
            <div className="col-span-2 flex items-center justify-start">
              <ScoreRing score={application.rufusScore} />
            </div>

            {/* Action Buttons */}
            <div className="col-span-1 flex items-center justify-end gap-3">
              <button
                onClick={() => onRowClick(application)}
                className="p-2 text-slate-400 hover:text-rufus-blue hover:bg-blue-50 hover:shadow-[0_0_12px_rgba(26,110,219,0.2)] rounded-lg transition-all duration-200"
                title="View Details"
              >
                <Eye size={18} />
              </button>
              <button
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all duration-200"
                title="Archive"
              >
                <Archive size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
