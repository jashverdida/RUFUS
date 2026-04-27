import React from 'react';

const statusConfig = {
  'Pre-Approved': { bg: 'bg-green-100', text: 'text-green-800' },
  'Needs Manual Review': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  'Review Needed': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  'Pending AI': { bg: 'bg-blue-100', text: 'text-blue-800' },
};

const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig['Pending AI'];
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
    >
      {status}
    </span>
  );
};

const formatPhp = (amount) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount);
};

export default function UnderwritingQueue({ applications = [], onRowClick }) {

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden border-t-4 border-t-blue-600">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800">
          Underwriting Queue
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          {applications.length} applications pending review
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-8 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                SME Name
              </th>
              <th className="px-8 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Business Type
              </th>
              <th className="px-8 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Requested Amount
              </th>
              <th className="px-8 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                AI Status
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className="border-b border-slate-200 hover:bg-slate-50 transition-all duration-200 cursor-pointer hover:shadow-[inset_0_0_20px_-10px_rgba(6,81,237,0.05)] hover:-translate-y-[1px]"
              >
                <td className="px-8 py-4 text-sm text-slate-700 border-b border-slate-100 font-medium">
                  {row.businessName}
                </td>
                <td className="px-8 py-4 text-sm text-slate-700 border-b border-slate-100">
                  {row.businessType}
                </td>
                <td className="px-8 py-4 text-sm font-semibold text-blue-600 border-b border-slate-100">
                  {formatPhp(row.requestedLoanAmount)}
                </td>
                <td className="px-8 py-4 text-sm border-b border-slate-100">
                  <StatusBadge status={row.aiStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {applications.length > 0 && (
        <div className="px-8 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <p className="text-xs text-slate-600">
            Last updated: {new Date().toLocaleString()}
          </p>
          <p className="text-xs text-slate-600">
            Click a row to view details
          </p>
        </div>
      )}
    </div>
  );
}
