import React, { useState } from 'react';
import {
  Wallet,
  RefreshCw,
  Download,
  List,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Brain,
  Send,
  Eye,
} from 'lucide-react';

export default function CollectionsView() {
  const [loans, setLoans] = useState([
    {
      id: 1,
      name: 'Mang Juan Hardware & Building Supply',
      category: 'Retail - Construction Materials',
      loanAmount: 350000,
      balance: 4500,
      nextDue: '2026-05-05',
      daysStatus: 'current',
      daysValue: null,
      history: ['paid', 'paid', 'paid', 'paid', 'paid', 'paid'],
      risk: 'Low Risk',
    },
    {
      id: 2,
      name: "Maria's Catering & Events",
      category: 'Food Services - Catering',
      loanAmount: 180000,
      balance: 28000,
      nextDue: '2026-04-30',
      daysStatus: 'due',
      daysValue: 2,
      history: ['paid', 'paid', 'paid', 'late', 'paid', 'paid'],
      risk: 'Watch',
    },
    {
      id: 3,
      name: 'Sarao Motors Workshop',
      category: 'Services - Auto Repair',
      loanAmount: 425000,
      balance: 95000,
      nextDue: '2026-04-21',
      daysStatus: 'overdue',
      daysValue: 7,
      history: ['paid', 'late', 'paid', 'missed', 'late', 'paid'],
      risk: 'High Risk',
    },
    {
      id: 4,
      name: "Leny's Beauty Salon & Spa",
      category: 'Beauty & Wellness Services',
      loanAmount: 95000,
      balance: 71000,
      nextDue: '2026-05-10',
      daysStatus: 'current',
      daysValue: null,
      history: ['paid', 'paid', 'late', 'paid', 'paid', 'paid'],
      risk: 'Watch',
    },
  ]);

  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderMethod, setReminderMethod] = useState('sms');
  const [reminderMessage, setReminderMessage] = useState('');
  const [toasts, setToasts] = useState([]);

  // Calculate KPIs
  const totalLoans = loans.length;
  const currentLoans = loans.filter((l) => l.daysStatus === 'current').length;
  const dueThisWeek = loans.filter((l) => l.daysStatus === 'due').length;
  const overdueLoans = loans.filter((l) => l.daysStatus === 'overdue').length;

  // Sort loans by urgency
  const sortedLoans = [...loans].sort((a, b) => {
    const statusOrder = { overdue: 0, due: 1, current: 2 };
    return statusOrder[a.daysStatus] - statusOrder[b.daysStatus];
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'current':
        return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', badge: 'bg-green-100', label: 'Current' };
      case 'due':
        return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', badge: 'bg-amber-100', label: 'Due in 2 days' };
      case 'overdue':
        return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', badge: 'bg-red-100', label: '7 days overdue' };
      default:
        return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', badge: 'bg-gray-100', label: 'N/A' };
    }
  };

  const getPaymentHistoryColor = (status) => {
    switch (status) {
      case 'paid':
        return '#00C896';
      case 'late':
        return '#F4A124';
      case 'missed':
        return '#EF4444';
      case 'upcoming':
        return '#D1D5DB';
      default:
        return '#D1D5DB';
    }
  };

  const getRiskBadge = (risk) => {
    switch (risk) {
      case 'Low Risk':
        return { bg: 'bg-green-100', text: 'text-green-700', label: 'Low Risk' };
      case 'Watch':
        return { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Watch' };
      case 'High Risk':
        return { bg: 'bg-red-100', text: 'text-red-700', label: 'High Risk' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'N/A' };
    }
  };

  const handleSendReminder = (loan) => {
    setSelectedLoan(loan);
    const defaultMessage = `Magandang araw! Ito ay isang paalala mula sa RAFI tungkol sa inyong darating na bayad na ₱${loan.balance.toLocaleString()} sa ${loan.nextDue}. Para sa katanungan, makipag-ugnayan sa inyong loan officer. Salamat!`;
    setReminderMessage(defaultMessage);
    setShowReminderModal(true);
  };

  const submitReminder = () => {
    if (selectedLoan) {
      const toast = {
        id: Date.now(),
        message: `✓ Reminder sent to ${selectedLoan.name}`,
        type: 'success',
      };
      setToasts([...toasts, toast]);
      setTimeout(() => {
        setToasts((t) => t.filter((notif) => notif.id !== toast.id));
      }, 3000);
      setShowReminderModal(false);
    }
  };

  const watchRiskLoans = loans.filter((l) => l.risk === 'Watch' || l.risk === 'High Risk');

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-white via-blue-50 to-white">
      <div className="p-8 max-w-7xl mx-auto">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Wallet size={24} className="text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-blue-900">Collections</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-lg border border-blue-200 bg-white text-blue-600 hover:bg-blue-50 flex items-center gap-2 transition-colors">
                <RefreshCw size={16} />
                Refresh
              </button>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg flex items-center gap-2 transition-all">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
          <p className="text-blue-700 text-sm">Loan repayment tracking and automated reminders</p>
        </div>

        {/* KPI ROW */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {/* Total Active Loans */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 w-full bg-blue-600"></div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
              Total Active Loans
            </p>
            <p className="text-4xl font-bold text-blue-900">{totalLoans}</p>
          </div>

          {/* Current (On-Time) */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-green-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 w-full bg-green-600"></div>
            <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-4 flex items-center gap-2">
              <CheckCircle2 size={14} />
              Current
            </p>
            <p className="text-4xl font-bold text-green-900">{currentLoans}</p>
          </div>

          {/* Due This Week */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 w-full bg-amber-600"></div>
            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Clock size={14} />
              Due This Week
            </p>
            <p className="text-4xl font-bold text-amber-900">{dueThisWeek}</p>
          </div>

          {/* Overdue */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-red-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 w-full bg-red-600"></div>
            <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-4 flex items-center gap-2">
              <AlertTriangle size={14} />
              Overdue
            </p>
            <p className="text-4xl font-bold text-red-900">{overdueLoans}</p>
          </div>
        </div>

        {/* COLLECTIONS STATUS TABLE */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <List size={20} className="text-blue-600" />
            <h2 className="text-xl font-bold text-blue-900">Active Loan Accounts</h2>
          </div>
          <p className="text-sm text-blue-600 mb-4">
            Sorted by payment urgency — overdue accounts shown first
          </p>

          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-50 border-b border-blue-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 uppercase tracking-widest">
                    Borrower
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-blue-600 uppercase tracking-widest">
                    Loan Amount
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-blue-600 uppercase tracking-widest">
                    Remaining Balance
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 uppercase tracking-widest">
                    Next Due Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 uppercase tracking-widest">
                    Payment History
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-blue-600 uppercase tracking-widest">
                    Risk Level
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-blue-600 uppercase tracking-widest">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedLoans.map((loan, idx) => {
                  const statusColor = getStatusColor(loan.daysStatus);
                  const riskBadge = getRiskBadge(loan.risk);
                  return (
                    <tr
                      key={loan.id}
                      className={`border-b border-blue-50 hover:bg-blue-50 transition-colors ${idx === sortedLoans.length - 1 ? 'border-b-0' : ''}`}
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-blue-900">{loan.name}</div>
                        <div className="text-xs text-blue-500">{loan.category}</div>
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-blue-900">
                        ₱{loan.loanAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-blue-900">
                        ₱{loan.balance.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-blue-700 whitespace-nowrap">{loan.nextDue}</td>
                      <td className="px-6 py-4">
                        <div
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${statusColor.badge} ${statusColor.text}`}
                        >
                          {loan.daysStatus === 'current'
                            ? 'Current'
                            : loan.daysStatus === 'due'
                            ? `Due in ${loan.daysValue} days`
                            : `${loan.daysValue} days overdue`}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          {loan.history.map((h, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: getPaymentHistoryColor(h),
                              }}
                              title={h}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${riskBadge.bg} ${riskBadge.text}`}
                        >
                          {riskBadge.label}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleSendReminder(loan)}
                            className="px-3 py-1 text-xs font-semibold text-cyan-700 border border-cyan-200 rounded-lg hover:bg-cyan-50 transition-colors"
                          >
                            Remind
                          </button>
                          <button className="px-2 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-100 rounded transition-colors">
                            <Eye size={14} />
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

        {/* AI COLLECTIONS RISK SECTION */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Brain size={20} style={{ color: '#00C2D1' }} />
            <h2 className="text-xl font-bold text-blue-900">AI Collections Risk Predictor</h2>
          </div>
          <p className="text-sm text-blue-600 mb-6">Powered by payment behavior analysis</p>

          <div className="grid grid-cols-2 gap-6">
            {watchRiskLoans.map((loan) => {
              const riskBadge = getRiskBadge(loan.risk);
              const likelihood = loan.risk === 'High Risk' ? 68 : 42;
              return (
                <div
                  key={loan.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-blue-900">{loan.name}</h3>
                    <div
                      className={`inline-block px-2 py-1 rounded text-xs font-bold ${riskBadge.bg} ${riskBadge.text}`}
                    >
                      {riskBadge.label}
                    </div>
                  </div>

                  <p className="text-2xl font-bold text-blue-900 mb-3">
                    {likelihood}%
                  </p>
                  <p className="text-xs text-blue-600 mb-1 font-semibold uppercase">
                    Likelihood of late payment
                  </p>

                  <p className="text-sm text-blue-800 mb-4 leading-relaxed">
                    {loan.risk === 'High Risk'
                      ? 'Three instances of late payment in the last 6 cycles and a high loan-to-revenue ratio signal elevated default risk.'
                      : 'One late payment in cycle 4 is noted, but overall payment consistency remains acceptable — monitor next cycle closely.'}
                  </p>

                  {/* Risk Bar */}
                  <div className="mb-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${likelihood}%`,
                        backgroundColor: loan.risk === 'High Risk' ? '#EF4444' : '#F4A124',
                      }}
                    />
                  </div>

                  <button className="px-3 py-2 text-xs font-semibold text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors w-full">
                    Flag Account
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* TOASTS */}
      <div className="fixed top-8 right-8 z-50 space-y-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="px-4 py-3 rounded-lg bg-green-100 text-green-700 text-sm font-semibold shadow-lg border border-green-200"
          >
            {toast.message}
          </div>
        ))}
      </div>

      {/* SEND REMINDER MODAL */}
      {showReminderModal && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Send Payment Reminder</h2>

            <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="font-semibold text-blue-900">{selectedLoan.name}</p>
              <p className="text-xs text-blue-600">₱{selectedLoan.balance.toLocaleString()} due on {selectedLoan.nextDue}</p>
            </div>

            {/* Method Tabs */}
            <div className="flex gap-2 mb-6">
              {['SMS', 'Email', 'In-App'].map((method) => (
                <button
                  key={method}
                  onClick={() => setReminderMethod(method.toLowerCase())}
                  className={`flex-1 px-3 py-2 text-xs font-bold rounded-lg transition-colors ${
                    reminderMethod === method.toLowerCase()
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>

            {/* Message Textarea */}
            <textarea
              value={reminderMessage}
              onChange={(e) => setReminderMessage(e.target.value)}
              className="w-full px-3 py-3 border border-blue-200 rounded-lg text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-2"
              rows="6"
            />
            <p className="text-xs text-blue-600 mb-6">
              🤖 AI-generated in Filipino — edit as needed
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowReminderModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitReminder}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send size={16} />
                Send Reminder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
