import React, { useState } from 'react';
import { X, Search } from 'lucide-react';

const DigitalLedgerModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const dummyData = [
    {
      date: '04/28/26',
      orNumber: '001234',
      loanPayment: '₱500.00',
      cbuSavings: '₱50.00',
      runningLoanBalance: '₱4,500.00',
      runningSavingsBalance: '₱1,050.00',
      staffSignature: 'JD',
    },
    {
      date: '04/27/26',
      orNumber: '001233',
      loanPayment: '₱500.00',
      cbuSavings: '₱50.00',
      runningLoanBalance: '₱5,000.00',
      runningSavingsBalance: '₱1,000.00',
      staffSignature: 'JD',
    },
    {
      date: '04/26/26',
      orNumber: '001232',
      loanPayment: '₱750.00',
      cbuSavings: '₱75.00',
      runningLoanBalance: '₱5,500.00',
      runningSavingsBalance: '₱950.00',
      staffSignature: 'MR',
    },
    {
      date: '04/20/26',
      orNumber: '001221',
      loanPayment: '₱500.00',
      cbuSavings: '₱50.00',
      runningLoanBalance: '₱6,250.00',
      runningSavingsBalance: '₱875.00',
      staffSignature: 'JD',
    },
    {
      date: '04/19/26',
      orNumber: '001220',
      loanPayment: '₱1,000.00',
      cbuSavings: '₱100.00',
      runningLoanBalance: '₱6,750.00',
      runningSavingsBalance: '₱825.00',
      staffSignature: 'EC',
    },
    {
      date: '04/18/26',
      orNumber: '001219',
      loanPayment: '₱500.00',
      cbuSavings: '₱50.00',
      runningLoanBalance: '₱7,250.00',
      runningSavingsBalance: '₱725.00',
      staffSignature: 'JD',
    },
    {
      date: '04/15/26',
      orNumber: '001216',
      loanPayment: '₱500.00',
      cbuSavings: '₱50.00',
      runningLoanBalance: '₱7,750.00',
      runningSavingsBalance: '₱675.00',
      staffSignature: 'MR',
    },
    {
      date: '04/14/26',
      orNumber: '001215',
      loanPayment: '₱1,500.00',
      cbuSavings: '₱150.00',
      runningLoanBalance: '₱8,250.00',
      runningSavingsBalance: '₱625.00',
      staffSignature: 'EC',
    },
  ];

  const filteredData = dummyData.filter((entry) => {
    const query = searchQuery.toLowerCase();
    return (
      entry.date.toLowerCase().includes(query) ||
      entry.orNumber.toLowerCase().includes(query) ||
      entry.staffSignature.toLowerCase().includes(query)
    );
  });

  if (!isOpen) return null;

  return (
    <>
      {/* Full-screen backdrop overlay - covers entire viewport including sidebars */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md"
        onClick={onClose}
        role="presentation"
      >
        {/* Modal container - click inside prevents closing */}
        <div
          className="relative w-full max-w-5xl mx-4 max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Section */}
          <div className="px-8 pt-8 pb-4 border-b border-slate-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                  Digital Ledger
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>
            {/* Gradient divider - cyan to blue */}
            <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mb-4" />
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by date, OR number, or staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-blue-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Table Container - scrollable */}
          <div className="flex-1 overflow-hidden px-8 py-6">
            <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm h-full flex flex-col">
              {/* Table */}
              <div className="overflow-y-auto max-h-[60vh] flex-1">
                <table className="w-full text-left border-collapse">
                  {/* Table Head - Sticky */}
                  <thead>
                    <tr className="bg-blue-50/50">
                      <th className="sticky top-0 z-10 bg-blue-50/50 px-6 py-4 text-[11px] font-bold text-blue-800 uppercase tracking-wider whitespace-nowrap">
                        Date
                      </th>
                      <th className="sticky top-0 z-10 bg-blue-50/50 px-6 py-4 text-[11px] font-bold text-blue-800 uppercase tracking-wider whitespace-nowrap">
                        OR Number
                      </th>
                      <th className="sticky top-0 z-10 bg-blue-50/50 px-6 py-4 text-[11px] font-bold text-blue-800 uppercase tracking-wider whitespace-nowrap text-right">
                        Loan Payment
                      </th>
                      <th className="sticky top-0 z-10 bg-blue-50/50 px-6 py-4 text-[11px] font-bold text-blue-800 uppercase tracking-wider whitespace-nowrap text-right">
                        CBU (Savings)
                      </th>
                      <th className="sticky top-0 z-10 bg-blue-50/50 px-6 py-4 text-[11px] font-bold text-blue-800 uppercase tracking-wider whitespace-nowrap text-right">
                        Running Loan Balance
                      </th>
                      <th className="sticky top-0 z-10 bg-blue-50/50 px-6 py-4 text-[11px] font-bold text-blue-800 uppercase tracking-wider whitespace-nowrap text-right">
                        Running Savings Balance
                      </th>
                      <th className="sticky top-0 z-10 bg-blue-50/50 px-6 py-4 text-[11px] font-bold text-blue-800 uppercase tracking-wider whitespace-nowrap">
                        Staff Signature
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-slate-100">
                    {filteredData.length > 0 ? (
                      filteredData.map((entry, index) => (
                        <tr
                          key={index}
                          className="bg-white hover:bg-slate-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 text-sm text-slate-500">
                            {entry.date}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                            {entry.orNumber}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-800 font-medium text-right">
                            {entry.loanPayment}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-800 font-medium text-right">
                            {entry.cbuSavings}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-800 font-semibold text-right">
                            {entry.runningLoanBalance}
                          </td>
                          <td className="px-6 py-4 text-sm text-emerald-700 font-semibold text-right">
                            {entry.runningSavingsBalance}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-700 font-medium">
                            <span className="inline-block px-3 py-1.5 rounded-md bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold">
                              {entry.staffSignature}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center text-sm text-slate-500">
                          No transactions found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="px-8 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-slate-200 text-slate-800 rounded-lg text-sm font-semibold hover:bg-slate-300 transition-colors duration-200"
            >
              Close
            </button>
            <button
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md"
            >
              Export Report
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DigitalLedgerModal;
