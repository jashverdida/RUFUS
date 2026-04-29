import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronLeft,
  Eye,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Paperclip,
  FileText,
  BarChart2,
  Building2,
  MessageSquare,
  Sparkles,
  Download,
  AlertTriangle,
  Circle,
} from 'lucide-react';

// Sample data
const applicationsData = [
  {
    id: 1,
    business: 'Mang Juan Hardware & Building Supply',
    category: 'Retail - Construction Materials',
    loan: 350000,
    submitted: '2026-04-25',
    docs: { plan: true, financial: true, history: true },
    status: 'Pre-Approved',
    score: 87,
    owner: 'Juan dela Cruz',
    years: 8,
    address: 'Bacolod City, Negros Occidental',
    contact: '0917-123-4567',
    scores: { plan: 88, financial: 91, history: 82 },
    flags: [],
    timeline: [
      { date: 'Apr 26', event: 'Status set to Pre-Approved' },
      { date: 'Apr 25', event: 'RUFUS Score generated: 87' },
      { date: 'Apr 25', event: 'AI analysis started' },
      { date: 'Apr 25', event: 'Documents submitted by applicant' },
    ],
  },
  {
    id: 2,
    business: "Maria's Catering & Events",
    category: 'Food Services - Catering',
    loan: 180000,
    submitted: '2026-04-26',
    docs: { plan: true, financial: true, history: true },
    status: 'Pre-Approved',
    score: 82,
    owner: 'Maria Santos',
    years: 5,
    address: 'Talisay City, Negros Occidental',
    contact: '0918-234-5678',
    scores: { plan: 80, financial: 85, history: 81 },
    flags: [],
    timeline: [
      { date: 'Apr 27', event: 'Status set to Pre-Approved' },
      { date: 'Apr 26', event: 'RUFUS Score generated: 82' },
      { date: 'Apr 26', event: 'Documents submitted by applicant' },
    ],
  },
  {
    id: 3,
    business: 'Sarao Motors Workshop',
    category: 'Services - Auto Repair & Customization',
    loan: 425000,
    submitted: '2026-04-27',
    docs: { plan: true, financial: true, history: false },
    status: 'Review Needed',
    score: 71,
    owner: 'Roberto Sarao',
    years: 3,
    address: 'Silay City, Negros Occidental',
    contact: '0919-345-6789',
    scores: { plan: 74, financial: 68, history: 0 },
    flags: [
      'Missing Business History document',
      'Inconsistent revenue figures in Q3 Financial Statement',
      'Loan request exceeds 3x average monthly revenue',
    ],
    timeline: [
      { date: 'Apr 27', event: 'Flagged for manual review' },
      { date: 'Apr 27', event: 'RUFUS Score generated: 71' },
      { date: 'Apr 27', event: 'Documents submitted (missing Business History)' },
    ],
  },
  {
    id: 4,
    business: "Leny's Beauty Salon & Spa",
    category: 'Beauty & Wellness Services',
    loan: 95000,
    submitted: '2026-04-28',
    docs: { plan: false, financial: true, history: true },
    status: 'Pending',
    score: 65,
    owner: 'Leny Reyes',
    years: 2,
    address: 'Bacolod City, Negros Occidental',
    contact: '0920-456-7890',
    scores: { plan: 0, financial: 62, history: 68 },
    flags: [
      'Missing Business Plan document',
      'Business operating for less than 3 years — higher risk tier',
      'Limited transaction history in financial records',
    ],
    timeline: [
      { date: 'Apr 28', event: 'AI analysis pending — missing Business Plan' },
      { date: 'Apr 28', event: 'Partial documents submitted' },
    ],
  },
];

// Utility Functions
const formatPhp = (amount) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

const getScoreColor = (score) => {
  if (score >= 80) return '#00C896';
  if (score >= 70) return '#F4A124';
  return '#8899BB';
};

const getStatusBadge = (status) => {
  switch (status) {
    case 'Pre-Approved':
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#00C896]/15 text-[#00C896] border border-[#00C896]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C896] animate-pulse"></span>
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
    case 'Declined':
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]">
          {status}
        </span>
      );
    default:
      return null;
  }
};

// ScoreRing Component
const ScoreRing = ({ score }) => {
  const color = getScoreColor(score);
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <circle cx="20" cy="20" r={radius} stroke="#E0E7FF" strokeWidth="4" fill="transparent" />
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
      <span className="relative z-10 text-xs font-bold text-blue-900">{score}</span>
    </div>
  );
};

// Document Badge Component
const DocumentBadge = ({ name, submitted }) => (
  <div
    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide border ${
      submitted
        ? 'bg-[#00C896]/15 text-[#00C896] border-[#00C896]/40'
        : 'bg-slate-100 text-slate-400 border-slate-200'
    }`}
  >
    {submitted
      ? <CheckCircle2 size={13} className="flex-shrink-0 text-[#00C896]" />
      : <Circle size={13} className="flex-shrink-0 text-slate-400" />
    }
    <span className="flex-1 text-center">{name}</span>
  </div>
);

// Score Bar Component with animation
const ScoreBar = ({ label, score, isAnimating }) => {
  const color = getScoreColor(score);
  const percentage = Math.max(0, (score / 100) * 100);

  return (
    <div className="mb-6 last:mb-0">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-blue-900">{label}</span>
        <span className={`text-sm font-bold ${score === 0 ? 'text-red-500' : ''}`} style={{ color }}>
          {score === 0 ? 'Not Submitted' : score}
        </span>
      </div>
      <div className="w-full h-2 bg-blue-50 rounded-full overflow-hidden border border-blue-100">
        <div
          className="h-full rounded-full transition-all duration-800 ease-out"
          style={{
            background: 'linear-gradient(to right, #1A6EDB, #00C2D1)',
            width: isAnimating ? `${percentage}%` : '0%',
          }}
        />
      </div>
    </div>
  );
};

// LIST VIEW Component
const ApplicationsList = ({ applications, onViewDetail, searchQuery, setSearchQuery, statusFilter, setStatusFilter, industryFilter, setIndustryFilter, sortBy, setSortBy }) => {
  const filteredApps = useMemo(() => {
    let filtered = applications.filter((app) => {
      const matchesSearch = app.business.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
      const matchesIndustry = industryFilter === 'All' || app.category.includes(industryFilter);
      return matchesSearch && matchesStatus && matchesIndustry;
    });

    // Sort
    switch (sortBy) {
      case 'score':
        filtered.sort((a, b) => b.score - a.score);
        break;
      case 'date':
        filtered.sort((a, b) => new Date(b.submitted) - new Date(a.submitted));
        break;
      case 'amount':
        filtered.sort((a, b) => b.loan - a.loan);
        break;
      default:
        break;
    }

    return filtered;
  }, [applications, searchQuery, statusFilter, industryFilter, sortBy]);

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === 'Pending').length,
    approved: applications.filter((a) => a.status === 'Pre-Approved').length,
    declined: applications.filter((a) => a.status === 'Declined').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold font-space text-blue-900">Applications</h1>
          <p className="text-slate-600 text-sm font-medium mt-1 uppercase">
            Review and manage SME loan applications
          </p>
        </div>
        <div className="flex gap-4 flex-shrink-0 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-cyan-400 text-cyan-600 rounded-lg text-sm font-medium tracking-wider hover:bg-cyan-50 transition-all duration-200">
            REFRESH
          </button>
          <button className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg text-sm font-medium tracking-wider shadow-[0_2px_10px_rgba(0,194,209,0.2)] hover:shadow-[0_4px_15px_rgba(0,194,209,0.4)] transition-all duration-200">
            EXPORT
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Applications', value: stats.total, color: '#1A6EDB' },
          { label: 'Pending Review', value: stats.pending, color: '#F4A124' },
          { label: 'Pre-Approved', value: stats.approved, color: '#00C896' },
          { label: 'Declined', value: stats.declined, color: '#EF4444' },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg border border-blue-100 shadow-[0_2px_16px_rgba(26,110,219,0.08)] p-4 hover:shadow-[0_4px_24px_rgba(26,110,219,0.12)] transition-all duration-300"
          >
            <p className="text-slate-600 text-xs font-bold uppercase tracking-wider mb-2">{stat.label}</p>
            <p className="text-3xl font-space font-extrabold" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-lg border border-blue-100 shadow-[0_2px_16px_rgba(26,110,219,0.08)] p-6 space-y-4">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-4 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search business name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm text-blue-900 placeholder-slate-400 transition-all"
            />
          </div>

          {/* Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm text-blue-900 bg-white cursor-pointer"
            >
              <option>All Statuses</option>
              <option>Pre-Approved</option>
              <option>Review Needed</option>
              <option>Pending</option>
              <option>Declined</option>
            </select>

            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="px-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm text-blue-900 bg-white cursor-pointer"
            >
              <option>All Industries</option>
              <option>Retail</option>
              <option>Food Services</option>
              <option>Services</option>
              <option>Manufacturing</option>
              <option>Beauty & Wellness</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm text-blue-900 bg-white cursor-pointer"
            >
              <option value="score">RUFUS Score ↓</option>
              <option value="date">Date Submitted</option>
              <option value="amount">Loan Amount</option>
            </select>
          </div>

          {/* Clear Filters */}
          {(searchQuery || statusFilter !== 'All' || industryFilter !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('All');
                setIndustryFilter('All');
              }}
              className="text-sm text-slate-500 hover:text-blue-900 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-3">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className="bg-white rounded-lg border border-blue-100 shadow-[0_2px_16px_rgba(26,110,219,0.08)] p-6 hover:shadow-[0_4px_24px_rgba(26,110,219,0.12)] hover:border-cyan-300 transition-all duration-200 group/row relative"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 opacity-0 group-hover/row:opacity-100 rounded-l-lg transition-opacity"></div>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
              {/* Applicant */}
              <div>
                <p className="font-bold text-blue-900">{app.business}</p>
                <p className="text-xs text-slate-600 uppercase tracking-wider mt-1">{app.category}</p>
              </div>

              {/* Loan */}
              <div>
                <p className="font-space font-bold text-blue-900">{formatPhp(app.loan)}</p>
              </div>

              {/* Submitted */}
              <div>
                <p className="text-sm text-slate-600">{formatDate(app.submitted)}</p>
              </div>

              {/* Documents */}
              <div className="flex flex-col gap-1">
                {[
                  { name: 'Business Plan', submitted: app.docs.plan },
                  { name: 'Financial Statement', submitted: app.docs.financial },
                  { name: 'Business History', submitted: app.docs.history },
                ].map((doc) => (
                  <DocumentBadge key={doc.name} name={doc.name} submitted={doc.submitted} />
                ))}
              </div>

              {/* Status */}
              <div className="flex justify-center pl-4">{getStatusBadge(app.status)}</div>

              {/* Score */}
              <div className="flex justify-center">
                <ScoreRing score={app.score} />
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onViewDetail(app.id)}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  title="View details"
                >
                  <Eye size={18} />
                </button>
                <button
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// DETAIL VIEW Component
const ApplicationDetail = ({ application, onBack }) => {
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [notes, setNotes] = React.useState('');

  React.useEffect(() => {
    setIsAnimating(true);
  }, []);

  const scoreVerdict = () => {
    if (application.score >= 80) return 'Strong — Recommended for Approval';
    if (application.score >= 70) return 'Moderate — Requires Review';
    return 'Low — Requires Additional Assessment';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Detail Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold text-sm mb-4 transition-colors"
          >
            <ChevronLeft size={18} />
            Back to Applications
          </button>
          <h1 className="text-3xl font-bold font-space text-blue-900">{application.business}</h1>
          <p className="text-slate-600 text-sm mt-2">{application.category}</p>
        </div>

        <div className="flex flex-col gap-2 flex-shrink-0">
          {getStatusBadge(application.status)}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 flex-wrap">
        <button className="px-6 py-2.5 bg-white border border-amber-400 text-amber-600 rounded-lg text-sm font-semibold tracking-wider hover:bg-amber-50 transition-all duration-200">
          Request Documents
        </button>
        <button className="px-6 py-2.5 bg-white border border-red-400 text-red-600 rounded-lg text-sm font-semibold tracking-wider hover:bg-red-50 transition-all duration-200">
          Decline
        </button>
        <button className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-sm font-semibold tracking-wider shadow-[0_2px_10px_rgba(0,200,150,0.2)] hover:shadow-[0_4px_15px_rgba(0,200,150,0.4)] transition-all duration-200">
          Approve
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Loan Details */}
        <div className="bg-white rounded-lg border border-blue-100 shadow-[0_2px_16px_rgba(26,110,219,0.08)] p-6">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Loan Request</p>
          <p className="text-2xl font-space font-bold text-blue-900 mb-4">{formatPhp(application.loan)}</p>
          <p className="text-xs text-slate-500">Submitted: {formatDate(application.submitted)}</p>
        </div>

        {/* RUFUS Score */}
        <div className="bg-white rounded-lg border border-blue-100 shadow-[0_2px_16px_rgba(26,110,219,0.08)] p-6 flex flex-col items-center justify-center">
          <div className="mb-4">
            <ScoreRing score={application.score} />
          </div>
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Overall RUFUS Score</p>
          <p className="text-xs text-center text-slate-600">{scoreVerdict()}</p>
        </div>

        {/* Document Status */}
        <div className="bg-white rounded-lg border border-blue-100 shadow-[0_2px_16px_rgba(26,110,219,0.08)] p-6 space-y-3">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-4">Document Status</p>
          {[
            { name: 'Business Plan', submitted: application.docs.plan },
            { name: 'Financial Statement', submitted: application.docs.financial },
            { name: 'Business History', submitted: application.docs.history },
          ].map((doc) => (
            <div key={doc.name} className="flex items-center justify-between">
              <span className="text-xs text-slate-700 font-medium">{doc.name}</span>
              {doc.submitted ? (
                <CheckCircle2 size={16} className="text-green-500" />
              ) : (
                <AlertCircle size={16} className="text-red-500" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Vendor Profile */}
      <div className="bg-white rounded-lg border border-blue-100 shadow-[0_2px_16px_rgba(26,110,219,0.08)] p-6">
        <h3 className="text-lg font-bold font-space text-blue-900 mb-6">Vendor Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Business Name', value: application.business },
            { label: 'Owner Name', value: application.owner },
            { label: 'Industry', value: application.category },
            { label: 'Years in Operation', value: `${application.years} years` },
            { label: 'Address', value: application.address },
            { label: 'Contact Number', value: application.contact },
          ].map((item, idx) => (
            <div key={idx}>
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">{item.label}</p>
              <p className="text-sm font-semibold text-blue-900">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Score Breakdown */}
      <div className="bg-white rounded-lg border border-blue-100 shadow-[0_2px_16px_rgba(26,110,219,0.08)] p-6">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles size={20} className="text-cyan-500" />
          <h3 className="text-lg font-bold font-space text-blue-900">AI Score Breakdown</h3>
        </div>
        <p className="text-xs text-slate-500 mb-6">Powered by GPT-4o-mini via PDFPlumber & Regex extraction</p>

        <div className="space-y-6 mb-8">
          {[
            { label: 'Business Plan', score: application.scores.plan },
            { label: 'Financial Statement', score: application.scores.financial },
            { label: 'Business History', score: application.scores.history },
          ].map((item) => (
            <ScoreBar key={item.label} label={item.label} score={item.score} isAnimating={isAnimating} />
          ))}
        </div>

        {/* AI Notes */}
        <div className="bg-blue-50 border-l-4 border-blue-900 p-4 rounded-r">
          <p className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-3">AI Analysis Notes</p>
          <ul className="space-y-2 text-sm text-blue-900">
            <li>• Financial Statement shows consistent monthly revenue growth of ~8% over 6 months</li>
            <li>• Business Plan demonstrates clear market understanding and realistic projections</li>
            <li>• Loan-to-revenue ratio is within acceptable threshold at 2.1x monthly average</li>
            <li>• Business History confirms {application.years} years of continuous operation — low default risk</li>
          </ul>
        </div>
      </div>

      {/* Risk Flags */}
      {application.flags.length > 0 && (
        <div className="bg-white rounded-lg border border-amber-300 shadow-[0_2px_16px_rgba(244,161,36,0.08)] p-6 bg-amber-50">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={20} className="text-amber-600" />
            <h3 className="text-lg font-bold font-space text-amber-900">⚠ Risk Flags Detected</h3>
          </div>
          <div className="space-y-2">
            {application.flags.map((flag, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-900">{flag}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submitted Documents */}
      <div className="bg-white rounded-lg border border-blue-100 shadow-[0_2px_16px_rgba(26,110,219,0.08)] p-6">
        <div className="flex items-center gap-2 mb-6">
          <Paperclip size={20} className="text-cyan-500" />
          <h3 className="text-lg font-bold font-space text-blue-900">Submitted Documents</h3>
        </div>

        <div className="space-y-4">
          {[
            { name: 'Business Plan', icon: FileText, size: '245 KB', submitted: application.docs.plan },
            { name: 'Financial Statement', icon: BarChart2, size: '189 KB', submitted: application.docs.financial },
            { name: 'Business History', icon: Building2, size: '156 KB', submitted: application.docs.history },
          ].map((doc) => {
            const Icon = doc.icon;
            return (
              <div key={doc.name} className="flex items-center justify-between p-4 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Icon size={20} className="text-blue-900" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900">{doc.name}</p>
                    <p className="text-xs text-slate-500">{doc.size}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      doc.submitted
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {doc.submitted ? 'Submitted' : 'Missing'}
                  </span>
                  <button
                    disabled={!doc.submitted}
                    className={`p-2 rounded transition-colors ${
                      doc.submitted
                        ? 'text-cyan-600 hover:bg-cyan-50'
                        : 'text-slate-300 cursor-not-allowed'
                    }`}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    disabled={!doc.submitted}
                    className={`p-2 rounded transition-colors ${
                      doc.submitted
                        ? 'text-cyan-600 hover:bg-cyan-50'
                        : 'text-slate-300 cursor-not-allowed'
                    }`}
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg border border-blue-100 shadow-[0_2px_16px_rgba(26,110,219,0.08)] p-6">
        <div className="flex items-center gap-2 mb-6">
          <Clock size={20} className="text-cyan-500" />
          <h3 className="text-lg font-bold font-space text-blue-900">Application Timeline</h3>
        </div>

        <div className="space-y-4">
          {application.timeline.map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-cyan-500' : 'bg-slate-300'}`} />
                {idx < application.timeline.length - 1 && (
                  <div className="w-0.5 h-12 bg-blue-200 mt-1" />
                )}
              </div>
              <div className="pb-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{item.date}</p>
                <p className="text-sm text-blue-900 mt-1">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Officer Notes */}
      <div className="bg-white rounded-lg border border-blue-100 shadow-[0_2px_16px_rgba(26,110,219,0.08)] p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare size={20} className="text-cyan-500" />
          <h3 className="text-lg font-bold font-space text-blue-900">Officer Notes</h3>
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add your assessment notes here..."
          className="w-full p-4 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm text-blue-900 placeholder-slate-400 min-h-24 resize-none transition-all"
        />

        <div className="flex justify-end mt-4">
          <button className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-sm font-semibold tracking-wider hover:shadow-[0_4px_15px_rgba(0,194,209,0.4)] transition-all duration-200">
            Save Notes
          </button>
        </div>
      </div>
    </div>
  );
};

// MAIN COMPONENT
export default function ApplicationsView() {
  const [view, setView] = useState('list');
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('score');

  const handleViewDetail = (id) => {
    setSelectedAppId(id);
    setView('detail');
  };

  const handleBack = () => {
    setView('list');
    setSelectedAppId(null);
  };

  const selectedApp = applicationsData.find((app) => app.id === selectedAppId);

  return (
    <div>
      {view === 'list' ? (
        <ApplicationsList
          applications={applicationsData}
          onViewDetail={handleViewDetail}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          industryFilter={industryFilter}
          setIndustryFilter={setIndustryFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      ) : selectedApp ? (
        <ApplicationDetail application={selectedApp} onBack={handleBack} />
      ) : null}
    </div>
  );
}
