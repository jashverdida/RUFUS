import React from 'react';

const getScoreColor = (score) => {
  if (score > 80) {
    return {
      border: 'border-green-500',
      text: 'text-green-700',
      label: 'text-green-600',
    };
  } else if (score >= 50) {
    return {
      border: 'border-yellow-500',
      text: 'text-yellow-700',
      label: 'text-yellow-600',
    };
  } else {
    return {
      border: 'border-red-500',
      text: 'text-red-700',
      label: 'text-red-600',
    };
  }
};

export default function RufusProfile({ application, onBack }) {
  const scoreColors = getScoreColor(application.rufusScore);

  const financialMetrics = [
    { label: 'Avg Daily Sales', value: '₱2,500' },
    { label: 'Uncollected Utang', value: '₱500' },
    { label: 'Inventory Value', value: '₱15,000' },
    { label: 'Operating Expenses', value: '₱18,000/month' },
    { label: 'Loan-to-Revenue Ratio', value: '33.3%' },
    { label: 'Cash Reserve', value: '₱8,500' },
  ];

  return (
    <div className="w-full">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 text-slate-700 font-medium"
        >
          <span className="text-lg">←</span>
          <span>Back to Queue</span>
        </button>
      )}

      {/* Header Section */}
      <div className="mb-8 pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-bold text-slate-800 mb-1">
          {application.businessName}
        </h1>
        <div className="flex gap-4 text-sm text-slate-600">
          <span>📋 {application.businessType}</span>
          <span>👤 {application.ownerName}</span>
          <span>🆔 {application.id}</span>
        </div>
      </div>

      {/* Top Section: Score + AI Summary */}
      <div className="flex gap-8 mb-8">
        {/* Left: RUFUS Credit Score Dial */}
        <div className="flex flex-col items-center bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <div
            className={`w-32 h-32 rounded-full border-8 ${scoreColors.border} flex items-center justify-center bg-white`}
          >
            <div className="text-center">
              <p className={`text-4xl font-bold ${scoreColors.text}`}>
                {application.rufusScore}
              </p>
              <p className={`text-xs ${scoreColors.label} font-semibold`}>
                out of 100
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-slate-700">
            RUFUS Credit Score
          </p>
          <p className={`text-xs font-semibold mt-2 ${scoreColors.label}`}>
            {application.rufusScore > 80
              ? 'Strong'
              : application.rufusScore >= 50
              ? 'Moderate'
              : 'Needs Review'}
          </p>
        </div>

        {/* Right: AI Summary Card */}
        <div className="flex-1 bg-white border border-slate-100 rounded-2xl shadow-sm p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">✨</span>
            <h2 className="text-lg font-bold text-slate-900">
              AI Summary
            </h2>
          </div>
          <p className="text-slate-700 leading-relaxed text-sm">
            {application.aiSummary}
          </p>
          <div className="mt-6 pt-4 border-t border-slate-100 flex gap-3">
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors">
              Approve
            </button>
            <button className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium text-sm hover:bg-slate-50 transition-colors">
              Request Review
            </button>
            <button className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg font-medium text-sm hover:bg-slate-50 transition-colors">
              Decline
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Digitized Financials */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <h3 className="text-lg font-bold text-slate-900 mb-6">
            📊 Digitized Financials
          </h3>
          <div className="space-y-4">
            {financialMetrics.map((metric, index) => (
              <div
                key={index}
                className="flex justify-between items-center pb-4 border-b border-slate-100 last:border-b-0 last:pb-0"
              >
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                    {metric.label}
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    {metric.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-6 italic">
            Data extracted from uploaded documents via AI document parsing
          </p>
        </div>

        {/* Right: Cash Flow Projection Placeholder */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <h3 className="text-lg font-bold text-slate-900 mb-6">
            📈 Cash Flow Projection
          </h3>
          <div className="bg-slate-100 rounded-lg min-h-[300px] flex flex-col items-center justify-center gap-3 border border-slate-200 border-dashed">
            <div className="text-4xl">📉</div>
            <p className="text-center text-slate-600 font-medium">
              Chart Placeholder
            </p>
            <p className="text-center text-slate-500 text-xs">
              Recharts Injection Zone
            </p>
          </div>
          <p className="text-xs text-slate-500 mt-4 italic">
            💡 Connect your Recharts chart component here for 12-month
            projections
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-8 pt-6 border-t border-slate-200 text-xs text-slate-500">
        <p>Last updated: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}
