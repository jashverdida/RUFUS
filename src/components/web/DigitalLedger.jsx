import React, { useState } from 'react';
import { Search } from 'lucide-react';

const DigitalLedger = ({ onViewAll = () => {} }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewAll = () => {
    onViewAll();
  };

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
      date: '04/20/26',
      orNumber: '001221',
      loanPayment: '₱500.00',
      cbuSavings: '₱50.00',
      runningLoanBalance: '₱5,500.00',
      runningSavingsBalance: '₱950.00',
      staffSignature: 'JD',
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

  return (
    <>
      <div className="w-full bg-white rounded-2xl shadow-[0_2px_16px_rgba(26,110,219,0.08)] border border-blue-100 overflow-hidden relative p-8 group">
        <div className="mb-6 flex justify-between items-center relative z-10">
          <div>
            <h2 className="text-2xl font-space font-bold text-blue-900 tracking-wide">
              Digital Ledger
            </h2>
            <p className="text-slate-600 text-sm font-medium uppercase tracking-[0.1em] mt-1">
              Recent Transactions
            </p>
          </div>
          <button 
            onClick={handleViewAll}
            className="px-4 py-2 bg-white border border-rufus-cyan text-rufus-cyan rounded-lg text-xs font-bold tracking-wider uppercase hover:bg-cyan-50 transition-all duration-200"
          >
            View All
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative z-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by date, OR number, or staff..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-blue-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rufus-cyan focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50 border-b border-blue-100">
                <th className="px-4 py-3 text-xs font-bold text-rufus-blue uppercase tracking-[0.08em] whitespace-nowrap">Date</th>
                <th className="px-4 py-3 text-xs font-bold text-rufus-blue uppercase tracking-[0.08em] whitespace-nowrap">OR Number</th>
                <th className="px-4 py-3 text-xs font-bold text-rufus-blue uppercase tracking-[0.08em] whitespace-nowrap text-right">Loan Payment</th>
                <th className="px-4 py-3 text-xs font-bold text-rufus-blue uppercase tracking-[0.08em] whitespace-nowrap text-right">CBU (Savings)</th>
                <th className="px-4 py-3 text-xs font-bold text-rufus-blue uppercase tracking-[0.08em] whitespace-nowrap text-right">Running Loan Balance</th>
                <th className="px-4 py-3 text-xs font-bold text-rufus-blue uppercase tracking-[0.08em] whitespace-nowrap text-right">Running Savings Balance</th>
                <th className="px-4 py-3 text-xs font-bold text-rufus-blue uppercase tracking-[0.08em] whitespace-nowrap">Staff Signature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {filteredData.length > 0 ? (
                filteredData.map((entry, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-blue-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-3 text-sm text-blue-900 font-medium whitespace-nowrap">{entry.date}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 font-medium whitespace-nowrap">{entry.orNumber}</td>
                    <td className="px-4 py-3 text-sm font-space text-blue-900 text-right whitespace-nowrap">{entry.loanPayment}</td>
                    <td className="px-4 py-3 text-sm font-space text-blue-900 text-right whitespace-nowrap">{entry.cbuSavings}</td>
                    <td className="px-4 py-3 text-sm font-space text-blue-900 font-bold text-right whitespace-nowrap">{entry.runningLoanBalance}</td>
                    <td className="px-4 py-3 text-sm font-space text-rufus-cyan font-bold text-right whitespace-nowrap">{entry.runningSavingsBalance}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 font-bold whitespace-nowrap">
                      <span className="inline-block px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-900">
                        {entry.staffSignature}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-sm text-slate-500">
                    No transactions found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DigitalLedger;