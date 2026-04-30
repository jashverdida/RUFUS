import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import QueueTable from '../QueueTable';
import { LayoutDashboard, X } from 'lucide-react';
import DigitalLedger from './DigitalLedger';

export default function DashboardView({ onRowClick = () => {} }) {
  const [ledgerModalOpen, setLedgerModalOpen] = useState(false);

  // Sample data for the modal - extended ledger data
  const allLedgerData = [
    { date: '04/28/26', orNumber: '001234', loanPayment: 500.00, cbuSavings: 50.00, runningLoanBalance: 4500.00, runningSavingsBalance: 1050.00, staffSignature: 'JD' },
    { date: '04/27/26', orNumber: '001233', loanPayment: 500.00, cbuSavings: 50.00, runningLoanBalance: 5000.00, runningSavingsBalance: 1000.00, staffSignature: 'JD' },
    { date: '04/20/26', orNumber: '001221', loanPayment: 500.00, cbuSavings: 50.00, runningLoanBalance: 5500.00, runningSavingsBalance: 950.00, staffSignature: 'JD' },
    { date: '04/15/26', orNumber: '001220', loanPayment: 500.00, cbuSavings: 50.00, runningLoanBalance: 6000.00, runningSavingsBalance: 900.00, staffSignature: 'MC' },
    { date: '04/10/26', orNumber: '001219', loanPayment: 500.00, cbuSavings: 50.00, runningLoanBalance: 6500.00, runningSavingsBalance: 850.00, staffSignature: 'MC' },
    { date: '04/05/26', orNumber: '001218', loanPayment: 500.00, cbuSavings: 50.00, runningLoanBalance: 7000.00, runningSavingsBalance: 800.00, staffSignature: 'JD' },
  ];

  const totalLoanPayment = allLedgerData.reduce((sum, entry) => sum + entry.loanPayment, 0);
  const totalCbuSavings = allLedgerData.reduce((sum, entry) => sum + entry.cbuSavings, 0);

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      setLedgerModalOpen(false);
    }
  };

  React.useEffect(() => {
    if (ledgerModalOpen) {
      window.addEventListener('keydown', handleEscapeKey);
      return () => window.removeEventListener('keydown', handleEscapeKey);
    }
  }, [ledgerModalOpen]);

  return (
    <div className="space-y-6 relative">
      {/* Decorative SVG Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 overflow-hidden" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 10 L50 10 L50 50 L90 50" fill="none" stroke="#1A6EDB" strokeWidth="1" />
              <circle cx="10" cy="10" r="2" fill="#1A6EDB" />
              <circle cx="90" cy="50" r="2" fill="#1A6EDB" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto pb-12">
        {/* Header with Title and Action Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          {/* Left Side: Title, Subtitle */}
          <div className="flex items-start gap-4">
            <div className="bg-white p-3 rounded-xl border border-blue-200 shadow-[0_2px_16px_rgba(26,110,219,0.08)] flex-shrink-0">
              <LayoutDashboard size={28} className="text-rufus-blue" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold font-space text-blue-900 pb-1">
                Overview Dashboard
              </h1>
              <p className="text-slate-600 text-sm font-medium tracking-wide mt-1 uppercase">
                HIGH-LEVEL METRICS AND PENDING APPLICATIONS
              </p>
            </div>
          </div>
          
          {/* Right Side: Action Buttons */}
          <div className="flex gap-4 flex-shrink-0 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-rufus-cyan text-rufus-cyan rounded-lg text-sm font-medium tracking-wider hover:bg-cyan-50 transition-all duration-200">
              REFRESH
            </button>
            <button className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-rufus-blue to-rufus-cyan text-white rounded-lg text-sm font-medium tracking-wider shadow-[0_2px_10px_rgba(0,194,209,0.2)] hover:shadow-[0_4px_15px_rgba(0,194,209,0.4)] hover:-translate-y-0.5 transition-all duration-200">
              EXPORT
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-blue-100 shadow-[0_2px_16px_rgba(26,110,219,0.08)] p-6 border-t-[3px] border-t-rufus-cyan hover:-translate-y-1 hover:shadow-[0_4px_24px_rgba(26,110,219,0.12)] transition-all duration-300 relative overflow-hidden group">
            <p className="text-slate-600 text-xs font-bold tracking-[0.1em] uppercase mb-2">Queue Size</p>
            <p className="text-5xl font-space font-extrabold text-rufus-cyan relative z-10">4</p>
            <p className="text-xs text-slate-500 mt-4 uppercase tracking-wider relative z-10">+2 since yesterday</p>
          </div>

          <div className="bg-white rounded-xl border border-blue-100 shadow-[0_2px_16px_rgba(26,110,219,0.08)] p-6 border-t-[3px] border-t-rufus-success hover:-translate-y-1 hover:shadow-[0_4px_24px_rgba(26,110,219,0.12)] transition-all duration-300 relative overflow-hidden group">
            <p className="text-slate-600 text-xs font-bold tracking-[0.1em] uppercase mb-2">Approved Today</p>
            <p className="text-5xl font-space font-extrabold text-rufus-success relative z-10">2</p>
            <p className="text-xs text-slate-500 mt-4 uppercase tracking-wider relative z-10">50% approval rate</p>
          </div>

          <div className="bg-white rounded-xl border border-blue-100 shadow-[0_2px_16px_rgba(26,110,219,0.08)] p-6 border-t-[3px] border-t-rufus-warning hover:-translate-y-1 hover:shadow-[0_4px_24px_rgba(26,110,219,0.12)] transition-all duration-300 relative overflow-hidden group">
            <p className="text-slate-600 text-xs font-bold tracking-[0.1em] uppercase mb-2">Needs Review</p>
            <p className="text-5xl font-space font-extrabold text-rufus-warning relative z-10">1</p>
            <p className="text-xs text-slate-500 mt-4 uppercase tracking-wider relative z-10">Awaiting assessment</p>
          </div>
        </div>

        {/* Underwriting Queue Table */}
        <div className="mb-8">
          <QueueTable onRowClick={onRowClick} />
        </div>

        {/* Digital Ledger Section */}
        <div>
          <DigitalLedger onViewAll={() => setLedgerModalOpen(true)} />
        </div>
      </div>

      {/* Digital Ledger Modal - Rendered via Portal */}
      {ledgerModalOpen && ReactDOM.createPortal(
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-lg z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setLedgerModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in scale-95 fade-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header - Premium Gradient Background */}
            <div className="relative px-8 pt-8 pb-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50/50">
              <div className="flex justify-between items-start mb-5">
                <div className="flex-1">
                  <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-1">
                    Digital Ledger
                  </h2>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-[0.12em]">
                    Complete Transaction History
                  </p>
                </div>
                <button
                  onClick={() => setLedgerModalOpen(false)}
                  className="p-2 hover:bg-slate-200/50 rounded-xl transition-all duration-200 flex-shrink-0 group"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-slate-600 group-hover:text-slate-900 transition-colors" />
                </button>
              </div>
              {/* Gradient divider - cyan to blue to violet */}
              <div className="flex gap-2">
                <div className="h-1.5 w-32 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-full shadow-lg shadow-blue-300/30" />
              </div>
            </div>

            {/* Table Container - scrollable with premium styling */}
            <div className="flex-1 overflow-hidden px-8 py-8">
              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-inner h-full flex flex-col bg-white">
                {/* Table */}
                <div className="overflow-x-auto overflow-y-auto max-h-[calc(92vh-300px)] flex-1 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                  <table className="w-full text-left border-collapse">
                    {/* Table Head - Premium styling */}
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border-b-2 border-blue-100">
                        <th className="sticky top-0 z-10 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 px-6 py-5 text-[10px] font-bold text-blue-900 uppercase tracking-[0.15em] whitespace-nowrap">Date</th>
                        <th className="sticky top-0 z-10 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 px-6 py-5 text-[10px] font-bold text-blue-900 uppercase tracking-[0.15em] whitespace-nowrap">OR Number</th>
                        <th className="sticky top-0 z-10 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 px-6 py-5 text-[10px] font-bold text-blue-900 uppercase tracking-[0.15em] whitespace-nowrap text-right">Loan Payment</th>
                        <th className="sticky top-0 z-10 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 px-6 py-5 text-[10px] font-bold text-blue-900 uppercase tracking-[0.15em] whitespace-nowrap text-right">CBU (Savings)</th>
                        <th className="sticky top-0 z-10 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 px-6 py-5 text-[10px] font-bold text-blue-900 uppercase tracking-[0.15em] whitespace-nowrap text-right">Running Loan Balance</th>
                        <th className="sticky top-0 z-10 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 px-6 py-5 text-[10px] font-bold text-blue-900 uppercase tracking-[0.15em] whitespace-nowrap text-right">Running Savings</th>
                        <th className="sticky top-0 z-10 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 px-6 py-5 text-[10px] font-bold text-blue-900 uppercase tracking-[0.15em] whitespace-nowrap text-center">Staff</th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y divide-slate-100">
                      {allLedgerData.map((entry, index) => (
                        <tr
                          key={index}
                          className="bg-white hover:bg-gradient-to-r hover:from-cyan-50/40 hover:to-blue-50/40 transition-all duration-150 group"
                        >
                          <td className="px-6 py-5 text-sm text-slate-600 font-medium group-hover:text-slate-900 transition-colors">
                            {entry.date}
                          </td>
                          <td className="px-6 py-5 text-sm text-slate-600 font-medium group-hover:text-slate-900 transition-colors">
                            {entry.orNumber}
                          </td>
                          <td className="px-6 py-5 text-sm text-slate-800 font-semibold text-right group-hover:text-blue-700 transition-colors">
                            ₱{entry.loanPayment.toFixed(2)}
                          </td>
                          <td className="px-6 py-5 text-sm text-slate-800 font-semibold text-right group-hover:text-blue-700 transition-colors">
                            ₱{entry.cbuSavings.toFixed(2)}
                          </td>
                          <td className="px-6 py-5 text-sm text-slate-800 font-bold text-right group-hover:text-indigo-700 transition-colors">
                            ₱{entry.runningLoanBalance.toFixed(2)}
                          </td>
                          <td className="px-6 py-5 text-sm text-emerald-700 font-bold text-right group-hover:text-emerald-600 transition-colors">
                            ₱{entry.runningSavingsBalance.toFixed(2)}
                          </td>
                          <td className="px-6 py-5 text-sm text-center">
                            <span className="inline-block px-4 py-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 text-blue-900 text-xs font-bold shadow-sm group-hover:shadow-md group-hover:border-blue-300 transition-all">
                              {entry.staffSignature}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Footer Section - Premium styling */}
            <div className="px-8 py-6 border-t border-slate-100 flex justify-between items-center bg-gradient-to-r from-slate-50 to-blue-50/50">
              <div className="text-sm text-slate-600 font-medium">
                <span className="text-slate-900 font-bold">{allLedgerData.length}</span> transactions
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setLedgerModalOpen(false)}
                  className="px-6 py-2.5 bg-slate-200 text-slate-800 rounded-lg text-sm font-semibold hover:bg-slate-300 transition-all duration-200 hover:shadow-md"
                >
                  Close
                </button>
                <button
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
                >
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
