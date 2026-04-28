import React, { useState } from 'react';
import {
  TrendingUp,
  Zap,
  BarChart2,
  Brain,
  Lightbulb,
  RefreshCw,
  Download,
  ChevronDown,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

export default function ReportsView() {
  const [dateRange, setDateRange] = useState('Last 30 Days');

  // Application data with RUFUS scores
  const applications = [
    {
      id: 1,
      business: 'Mang Juan',
      category: 'Retail/Trading',
      score: 87,
      confidence: 'HIGH',
      loanAmount: 50000,
      recommendation: 'fast-track',
      monthlyRevenue: 35000,
      loanToRevenue: 1.43,
      onTimePayments: '3/3',
      justification:
        'Consistent 8-year revenue history and 14% YoY growth indicate strong repayment capacity well above the requested loan threshold. Business Plan demonstrates clear market positioning in a stable construction sector with low default risk.',
      cashFlow: [
        { m: 'Jan', actual: 42000 },
        { m: 'Feb', actual: 45000 },
        { m: 'Mar', actual: 48000 },
        { m: 'Apr', proj: 50000 },
        { m: 'May', proj: 53000 },
        { m: 'Jun', proj: 56000 },
      ],
    },
    {
      id: 2,
      business: "Maria's Catering",
      category: 'Food Service',
      score: 82,
      confidence: 'HIGH',
      loanAmount: 35000,
      recommendation: 'fast-track',
      monthlyRevenue: 29500,
      loanToRevenue: 1.19,
      onTimePayments: '5/5',
      justification:
        'Five years of stable catering operations with diversified client contracts suggest reliable monthly inflow sufficient to cover loan obligations. Financial statements reflect disciplined expense management with a healthy net margin of approximately 22%.',
      cashFlow: [
        { m: 'Jan', actual: 28000 },
        { m: 'Feb', actual: 30000 },
        { m: 'Mar', actual: 29000 },
        { m: 'Apr', proj: 31000 },
        { m: 'May', proj: 33000 },
        { m: 'Jun', proj: 34000 },
      ],
    },
    {
      id: 3,
      business: 'Sarao Motors',
      category: 'Transportation',
      score: 71,
      confidence: 'MEDIUM',
      loanAmount: 45000,
      recommendation: 'review',
      monthlyRevenue: 31667,
      loanToRevenue: 1.42,
      onTimePayments: '3/4',
      justification:
        'Revenue irregularity across Q2-Q3 and missing Business History documentation introduce uncertainty that warrants manual officer verification. Loan-to-revenue ratio of 3.4x slightly exceeds recommended thresholds, suggesting a reduced loan amount may be more appropriate.',
      cashFlow: [
        { m: 'Jan', actual: 35000 },
        { m: 'Feb', actual: 28000 },
        { m: 'Mar', actual: 32000 },
        { m: 'Apr', proj: 30000 },
        { m: 'May', proj: 31000 },
        { m: 'Jun', proj: 32000 },
      ],
    },
    {
      id: 4,
      business: "Leny's Beauty",
      category: 'Personal Services',
      score: 65,
      confidence: 'LOW',
      loanAmount: 25000,
      recommendation: 'manual',
      monthlyRevenue: 16667,
      loanToRevenue: 1.5,
      onTimePayments: '2/2',
      justification:
        'Limited 2-year operational history and absent Business Plan make it difficult for the AI model to establish a reliable creditworthiness baseline for this applicant. Officer review is recommended before any approval decision is made.',
      cashFlow: [
        { m: 'Jan', actual: 18000 },
        { m: 'Feb', actual: 15000 },
        { m: 'Mar', actual: 17000 },
        { m: 'Apr', proj: 17500 },
        { m: 'May', proj: 18000 },
        { m: 'Jun', proj: 18500 },
      ],
    },
  ];

  // Sort applications by score descending, then by confidence level
  const confidenceOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
  const sortedApplications = [...applications].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return confidenceOrder[b.confidence] - confidenceOrder[a.confidence];
  });

  // Assign priority rankings
  const applicationsWithPriority = sortedApplications.map((app, idx) => ({
    ...app,
    priority: idx + 1,
  }));

  // Calculate KPIs
  const totalProcessed = applications.length;
  const avgRufusScore =
    (applications.reduce((sum, app) => sum + app.score, 0) / totalProcessed).toFixed(
      1
    );
  const fastTrackCount = applications.filter(
    (app) => app.recommendation === 'fast-track'
  ).length;
  const aiPreApprovalRate = ((fastTrackCount / totalProcessed) * 100).toFixed(0);
  const avgProcessingTime = '1.2h';
  const flaggedCount = applications.filter((app) => app.recommendation === 'manual')
    .length;

  // Score distribution data
  const scoreDistribution = [
    { range: '50-59', count: 0 },
    { range: '60-69', count: 1 },
    { range: '70-79', count: 1 },
    { range: '80-89', count: 2 },
    { range: '90-100', count: 0 },
  ];

  // Approval trend data
  const approvalTrend = [
    { day: 'Mon', approved: 1, reviewed: 0, pending: 1 },
    { day: 'Tue', approved: 0, reviewed: 1, pending: 2 },
    { day: 'Wed', approved: 1, reviewed: 0, pending: 1 },
    { day: 'Thu', approved: 2, reviewed: 1, pending: 0 },
    { day: 'Fri', approved: 1, reviewed: 0, pending: 1 },
    { day: 'Sat', approved: 0, reviewed: 0, pending: 0 },
    { day: 'Sun', approved: 0, reviewed: 0, pending: 0 },
  ];

  const getRecommendationBadge = (recommendation) => {
    switch (recommendation) {
      case 'fast-track':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          label: '⚡ Fast-Track Approve',
          color: '#00C896',
        };
      case 'review':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-700',
          border: 'border-amber-200',
          label: '👁 Needs Review',
          color: '#F4A124',
        };
      case 'manual':
        return {
          bg: 'bg-red-50',
          text: 'text-red-700',
          border: 'border-red-200',
          label: '⚠ Manual Assessment',
          color: '#EF4444',
        };
      default:
        return null;
    }
  };

  const getPriorityDotColor = (recommendation) => {
    switch (recommendation) {
      case 'fast-track':
        return '#00C896';
      case 'review':
        return '#F4A124';
      case 'manual':
        return '#EF4444';
      default:
        return '#8899BB';
    }
  };

  const getConfidenceBadge = (confidence) => {
    switch (confidence) {
      case 'HIGH':
        return {
          bg: '#00C896',
          text: 'white',
          label: 'HIGH',
        };
      case 'MEDIUM':
        return {
          bg: '#F4A124',
          text: 'white',
          label: 'MEDIUM',
        };
      case 'LOW':
        return {
          bg: '#EF4444',
          text: 'white',
          label: 'LOW',
        };
      default:
        return { bg: '#8899BB', text: 'white', label: 'N/A' };
    }
  };

  const renderScoreIndicator = (score) => {
    const percentage = (score / 100) * 100;
    return (
      <div className="flex items-center gap-2">
        <div
          className="relative w-12 h-12 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, #1A6EDB 0deg, #1A6EDB ${
              percentage * 3.6
            }deg, #E5EBF2 ${percentage * 3.6}deg)`,
          }}
        >
          <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
            <span className="text-xs font-bold text-blue-600">{score}</span>
          </div>
        </div>
      </div>
    );
  };

  const fastTrackEligible = applicationsWithPriority.filter(
    (app) => app.recommendation === 'fast-track'
  ).length;
  const borderlineCount = applicationsWithPriority.filter(
    (app) => app.recommendation === 'review' || app.recommendation === 'manual'
  ).length;

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-white via-blue-50 to-white">
      <div className="p-8 max-w-7xl mx-auto">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp size={24} className="text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-blue-900">Reports</h1>
            </div>
            <div className="flex items-center gap-3">
              {/* Date Range Selector */}
              <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-200 bg-white text-blue-700 hover:bg-blue-50 transition-colors">
                  {dateRange}
                  <ChevronDown size={16} />
                </button>
              </div>

              {/* Refresh Button */}
              <button className="px-4 py-2 rounded-lg border border-blue-200 bg-white text-blue-600 hover:bg-blue-50 flex items-center gap-2 transition-colors">
                <RefreshCw size={16} />
                Refresh
              </button>

              {/* Export Button */}
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg flex items-center gap-2 transition-all">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
          <p className="text-blue-700 text-sm">
            System analytics and underwriting performance
          </p>
        </div>

        {/* KPI SUMMARY ROW */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {/* Total Applications */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 w-full bg-blue-600"></div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
              Total Applications
            </p>
            <p className="text-4xl font-bold text-blue-900">{totalProcessed}</p>
          </div>

          {/* Avg RUFUS Score */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-cyan-100 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-1 w-full"
              style={{ backgroundColor: '#00C2D1' }}
            ></div>
            <p className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-4">
              Avg RUFUS Score
            </p>
            <p className="text-4xl font-bold text-cyan-900">{avgRufusScore}</p>
          </div>

          {/* AI Pre-Approval Rate */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-green-100 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-1 w-full"
              style={{ backgroundColor: '#00C896' }}
            ></div>
            <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-4">
              AI Pre-Approval Rate
            </p>
            <p className="text-4xl font-bold text-green-900">{aiPreApprovalRate}%</p>
          </div>

          {/* Avg Processing Time */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-teal-100 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-1 w-full"
              style={{ backgroundColor: '#06B6D4' }}
            ></div>
            <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-4">
              Avg Processing Time
            </p>
            <p className="text-4xl font-bold text-teal-900">{avgProcessingTime}</p>
          </div>

          {/* Flagged for Review */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-100 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-1 w-full"
              style={{ backgroundColor: '#F4A124' }}
            ></div>
            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-4">
              Flagged for Review
            </p>
            <p className="text-4xl font-bold text-amber-900">{flaggedCount}</p>
          </div>
        </div>

        {/* SMART UNDERWRITING QUEUE */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={20} style={{ color: '#00C2D1' }} />
            <h2 className="text-xl font-bold text-blue-900">Smart Underwriting Queue</h2>
          </div>
          <p className="text-sm text-blue-600 mb-4">
            Auto-sorted by RUFUS Score & Confidence Level — prioritize mass approvals, focus
            human review on borderline cases
          </p>

          {/* Callout Box */}
          <div className="mb-6 p-4 rounded-lg border-l-4" style={{ borderColor: '#00C2D1', backgroundColor: '#F0F7FF' }}>
            <div className="flex items-start gap-3">
              <Lightbulb
                size={18}
                style={{ color: '#00C2D1', marginTop: '2px', flexShrink: 0 }}
              />
              <p className="text-sm text-blue-700">
                <strong>{fastTrackEligible} applications are eligible for fast-track approval.</strong> Approving these
                frees up officer time for the {borderlineCount} borderline cases below.
              </p>
            </div>
          </div>

          {/* Queue Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-50 border-b border-blue-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 uppercase tracking-widest">
                    Priority
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 uppercase tracking-widest">
                    Business
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 uppercase tracking-widest">
                    RUFUS Score
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 uppercase tracking-widest">
                    Confidence
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-blue-600 uppercase tracking-widest">
                    Loan Request
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 uppercase tracking-widest">
                    Recommended Action
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-blue-600 uppercase tracking-widest">
                    Officer Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {applicationsWithPriority.map((app, idx) => {
                  const badge = getRecommendationBadge(app.recommendation);
                  const confidenceBadge = getConfidenceBadge(app.confidence);
                  return (
                    <tr
                      key={app.id}
                      className={`border-b border-blue-50 hover:bg-blue-50 transition-colors ${
                        idx === applicationsWithPriority.length - 1 ? 'border-b-0' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style={{
                              backgroundColor: getPriorityDotColor(app.recommendation),
                            }}
                          >
                            {app.priority}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-blue-900">{app.business}</div>
                        <div className="text-xs text-blue-500">{app.category}</div>
                      </td>
                      <td className="px-6 py-4">{renderScoreIndicator(app.score)}</td>
                      <td className="px-6 py-4">
                        <div
                          className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                          style={{
                            backgroundColor: confidenceBadge.bg,
                            color: confidenceBadge.text,
                          }}
                        >
                          {confidenceBadge.label}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-blue-900">
                        ₱{app.loanAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`inline-block px-3 py-1 rounded-lg text-xs font-bold border ${badge.bg} ${badge.text} ${badge.border}`}
                        >
                          {badge.label}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="px-3 py-1 text-xs font-semibold text-green-700 border border-green-200 rounded-lg hover:bg-green-50 transition-colors">
                            Approve
                          </button>
                          <button className="px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors">
                            Flag
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* CHARTS ROW */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Score Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
            <div className="flex items-center gap-2 mb-6">
              <BarChart2 size={20} className="text-blue-600" />
              <h3 className="text-lg font-bold text-blue-900">RUFUS Score Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={scoreDistribution}>
                <CartesianGrid strokeDasharray="0" stroke="#E5EBF2" />
                <XAxis dataKey="range" stroke="#4A6080" style={{ fontSize: '12px' }} />
                <YAxis stroke="#4A6080" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#F0F7FF',
                    border: '1px solid #1A6EDB',
                    borderRadius: '8px',
                  }}
                  cursor={{ fill: 'rgba(26,110,219,0.1)' }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {scoreDistribution.map((_, index) => (
                    <Bar
                      key={index}
                      dataKey="count"
                      fill={`url(#barGradient)`}
                      radius={[8, 8, 0, 0]}
                    />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1A6EDB" />
                    <stop offset="100%" stopColor="#00C2D1" />
                  </linearGradient>
                </defs>
                <ReferenceLine
                  y={80}
                  stroke="#F4A124"
                  strokeDasharray="5 5"
                  label={{
                    value: 'Pre-Approval Threshold',
                    position: 'right',
                    fill: '#F4A124',
                    fontSize: 12,
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Approval Trend */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={20} className="text-blue-600" />
              <h3 className="text-lg font-bold text-blue-900">Approval Trend (Last 7 Days)</h3>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={approvalTrend} margin={{ bottom: 20 }}>
                <CartesianGrid strokeDasharray="0" stroke="#E5EBF2" />
                <XAxis dataKey="day" stroke="#4A6080" style={{ fontSize: '12px' }} />
                <YAxis stroke="#4A6080" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#F0F7FF',
                    border: '1px solid #1A6EDB',
                    borderRadius: '8px',
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Line
                  type="monotone"
                  dataKey="approved"
                  stroke="#00C896"
                  strokeWidth={2}
                  dot={{ fill: '#00C896', r: 4 }}
                  name="Approved"
                />
                <Line
                  type="monotone"
                  dataKey="reviewed"
                  stroke="#F4A124"
                  strokeWidth={2}
                  dot={{ fill: '#F4A124', r: 4 }}
                  name="Reviewed"
                />
                <Line
                  type="monotone"
                  dataKey="pending"
                  stroke="#8899BB"
                  strokeWidth={2}
                  dot={{ fill: '#8899BB', r: 4 }}
                  name="Pending"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RUFUS PROFILE DEEP-DIVE */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Brain size={20} style={{ color: '#00C2D1' }} />
            <h2 className="text-xl font-bold text-blue-900">RUFUS Profile Deep-Dive</h2>
          </div>
          <p className="text-sm text-blue-600 mb-6">
            AI logic transparency — extracted financials, projections, and 2-sentence credit
            justifications per applicant
          </p>

          <div className="grid grid-cols-2 gap-6">
            {applicationsWithPriority.map((app) => {
              const badge = getRecommendationBadge(app.recommendation);
              const confidenceBadge = getConfidenceBadge(app.confidence);
              return (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100"
                >
                  {/* Top Row: Name + Score */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-blue-100">
                    <div>
                      <h4 className="text-lg font-bold text-blue-900">{app.business}</h4>
                      <p className="text-xs text-blue-500 mt-1">{app.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="inline-block px-2 py-1 rounded text-xs font-bold"
                        style={{
                          backgroundColor: badge.bg,
                          color: badge.text,
                        }}
                      >
                        {app.recommendation === 'fast-track'
                          ? 'Fast-Track'
                          : app.recommendation === 'review'
                          ? 'Review'
                          : 'Manual'}
                      </div>
                      {renderScoreIndicator(app.score)}
                    </div>
                  </div>

                  {/* Cash Flow Chart */}
                  <div className="mb-4">
                    <ResponsiveContainer width="100%" height={100}>
                      <AreaChart data={app.cashFlow} margin={{ top: 5, right: 5, bottom: 5, left: -25 }}>
                        <CartesianGrid strokeDasharray="0" stroke="transparent" />
                        <XAxis dataKey="m" hide={true} />
                        <YAxis hide={true} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#F0F7FF',
                            border: '1px solid #1A6EDB',
                            borderRadius: '8px',
                            fontSize: '12px',
                          }}
                          formatter={(value) => `₱${value.toLocaleString()}`}
                        />
                        <Area
                          type="monotone"
                          dataKey="actual"
                          stroke="#1A6EDB"
                          fill="rgba(26,110,219,0.1)"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Area
                          type="monotone"
                          dataKey="proj"
                          stroke="#00C2D1"
                          fill="transparent"
                          strokeWidth={2}
                          strokeDasharray="4 4"
                          dot={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                    <div className="flex justify-start gap-4 mt-2 text-xs text-blue-600">
                      <span>● Actual</span>
                      <span>● Projected</span>
                    </div>
                  </div>

                  {/* Financial Highlights */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="px-2 py-1 rounded bg-blue-100 text-center">
                      <p className="text-xs text-blue-600 font-semibold">
                        Avg Monthly
                      </p>
                      <p className="text-xs font-bold text-blue-900 mt-1">
                        ₱{app.monthlyRevenue.toLocaleString()}
                      </p>
                    </div>
                    <div className="px-2 py-1 rounded bg-blue-100 text-center">
                      <p className="text-xs text-blue-600 font-semibold">
                        Loan-to-Revenue
                      </p>
                      <p className="text-xs font-bold text-blue-900 mt-1">
                        {app.loanToRevenue.toFixed(2)}x
                      </p>
                    </div>
                    <div className="px-2 py-1 rounded bg-blue-100 text-center">
                      <p className="text-xs text-blue-600 font-semibold">
                        On-Time Payments
                      </p>
                      <p className="text-xs font-bold text-blue-900 mt-1">
                        {app.onTimePayments}
                      </p>
                    </div>
                  </div>

                  {/* AI Justification */}
                  <div className="p-3 rounded-lg border-l-4" style={{ borderColor: '#00C2D1', backgroundColor: '#F0F7FF' }}>
                    <p className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-2">
                      🤖 AI Credit Justification
                    </p>
                    <p className="text-xs text-blue-900 leading-relaxed">
                      {app.justification}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
