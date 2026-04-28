import React, { useState } from 'react';
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

      {/* Digital Ledger Modal */}
      {ledgerModalOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setLedgerModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl border-2 border-cyan-200 shadow-[0_20px_60px_rgba(13,27,42,0.3),0_0_40px_rgba(0,194,209,0.2)] max-w-4xl w-full max-h-[85vh] overflow-y-auto flex flex-col animate-in fade-in scale-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-blue-100 px-8 py-6 flex justify-between items-start z-10">
              <div>
                <h2 className="text-3xl font-space font-bold text-blue-900 tracking-wide">
                  Digital Ledger
                </h2>
                <p className="text-rufus-cyan text-xs font-bold uppercase tracking-[0.15em] mt-2">
                  COMPLETE TRANSACTION HISTORY
                </p>
              </div>
              <button
                onClick={() => setLedgerModalOpen(false)}
                className="p-2 text-slate-400 hover:text-rufus-cyan hover:bg-cyan-50 rounded-lg transition-all duration-200 flex-shrink-0"
                title="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Table */}
            <div className="flex-1 overflow-x-auto px-8 py-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-blue-50 border-b border-blue-200">
                    <th className="px-4 py-4 text-xs font-bold text-rufus-blue uppercase tracking-[0.08em] whitespace-nowrap">Date</th>
                    <th className="px-4 py-4 text-xs font-bold text-rufus-blue uppercase tracking-[0.08em] whitespace-nowrap">OR Number</th>
                    <th className="px-4 py-4 text-xs font-bold text-rufus-blue uppercase tracking-[0.08em] whitespace-nowrap text-right">Loan Payment</th>
                    <th className="px-4 py-4 text-xs font-bold text-rufus-blue uppercase tracking-[0.08em] whitespace-nowrap text-right">CBU (Savings)</th>
                    <th className="px-4 py-4 text-xs font-bold text-rufus-blue uppercase tracking-[0.08em] whitespace-nowrap text-right">Running Loan Balance</th>
                    <th className="px-4 py-4 text-xs font-bold text-rufus-blue uppercase tracking-[0.08em] whitespace-nowrap text-right">Running Savings Balance</th>
                    <th className="px-4 py-4 text-xs font-bold text-rufus-blue uppercase tracking-[0.08em] whitespace-nowrap">Staff Signature</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
                  {allLedgerData.map((entry, index) => (
                    <tr 
                      key={index} 
                      className="hover:bg-blue-50 transition-colors duration-200"
                    >
                      <td className="px-4 py-4 text-sm text-blue-900 font-medium whitespace-nowrap">{entry.date}</td>
                      <td className="px-4 py-4 text-sm text-slate-600 font-medium whitespace-nowrap">{entry.orNumber}</td>
                      <td className="px-4 py-4 text-sm font-space text-blue-900 text-right whitespace-nowrap">₱{entry.loanPayment.toFixed(2)}</td>
                      <td className="px-4 py-4 text-sm font-space text-blue-900 text-right whitespace-nowrap">₱{entry.cbuSavings.toFixed(2)}</td>
                      <td className="px-4 py-4 text-sm font-space text-blue-900 font-bold text-right whitespace-nowrap">₱{entry.runningLoanBalance.toFixed(2)}</td>
                      <td className="px-4 py-4 text-sm font-space text-rufus-cyan font-bold text-right whitespace-nowrap">₱{entry.runningSavingsBalance.toFixed(2)}</td>
                      <td className="px-4 py-4 text-sm text-slate-600 font-bold whitespace-nowrap">
                        <span className="inline-block px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-900">
                          {entry.staffSignature}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal Footer with Totals */}
            <div className="border-t-2 border-blue-200 px-8 py-6 bg-blue-50">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="font-bold text-blue-900">
                    <td className="px-4 py-2 text-sm">TOTALS</td>
                    <td className="px-4 py-2 text-sm"></td>
                    <td className="px-4 py-2 text-sm font-space text-right">₱{totalLoanPayment.toFixed(2)}</td>
                    <td className="px-4 py-2 text-sm font-space text-right">₱{totalCbuSavings.toFixed(2)}</td>
                    <td className="px-4 py-2 text-sm"></td>
                    <td className="px-4 py-2 text-sm"></td>
                    <td className="px-4 py-2 text-sm"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
