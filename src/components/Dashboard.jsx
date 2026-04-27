import React, { useState } from 'react';
import DashboardLayout from './web/DashboardLayout';
import RufusProfile from './web/RufusProfile';

// Mock data array
const mockApplications = [
  {
    id: 'SME-001-2024',
    businessName: 'Aling Nena Sari-Sari Store',
    ownerName: 'Nena Reyes',
    businessType: 'Retail - General Merchandise',
    requestedLoanAmount: 150000,
    yearsInOperation: 8,
    aiStatus: 'Pre-Approved',
    rufusScore: 78,
    aiSummary:
      'Strong operational history with consistent cash flow over 8 years demonstrates reliable business fundamentals. Loan-to-revenue ratio is favorable, and requested amount aligns well with annual turnover patterns.',
  },
  {
    id: 'SME-002-2024',
    businessName: 'Manila Tech Repair Hub',
    ownerName: 'Carlo Santos',
    businessType: 'Services - Electronics Repair',
    requestedLoanAmount: 250000,
    yearsInOperation: 3,
    aiStatus: 'Needs Manual Review',
    rufusScore: 52,
    aiSummary:
      'Relatively new business with limited financial history, but quarterly growth trends are promising. Manual review recommended to assess market expansion viability and debt servicing capacity.',
  },
  {
    id: 'SME-003-2024',
    businessName: 'Golden Harvest Farm Cooperative',
    ownerName: 'Maria Gonzales',
    businessType: 'Agriculture - Crop Production',
    requestedLoanAmount: 500000,
    yearsInOperation: 15,
    aiStatus: 'Pending AI',
    rufusScore: 0,
    aiSummary:
      'Processing financial documents and seasonal revenue patterns. Longer operational history requires detailed agricultural risk assessment.',
  },
];

export default function Dashboard() {
  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleRowClick = (application) => {
    setSelectedApplication(application);
  };

  const handleBackToQueue = () => {
    setSelectedApplication(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {selectedApplication === null ? (
        // Queue View
        <DashboardLayout
          applications={mockApplications}
          onRowClick={(app) => setSelectedApplication(app)}
        />
      ) : (
        // Profile View
        <div className="ml-64">
          {/* Header with Back Button */}
          <div className="sticky top-0 z-10 bg-white border-b border-slate-200">
            <div className="px-8 py-4 flex items-center gap-3">
              <button
                onClick={handleBackToQueue}
                className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors group"
              >
                <span className="text-xl">←</span>
                <span className="font-medium group-hover:underline">
                  Back to Queue
                </span>
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <RufusProfile 
              application={selectedApplication}
              onBack={() => setSelectedApplication(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
