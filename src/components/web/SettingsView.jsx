import React, { useState } from 'react';
import {
  Settings,
  Bell,
  Sliders,
  Database,
  Download,
  Trash2,
  Edit2,
} from 'lucide-react';

export default function SettingsView() {
  const [preApprovalScore, setPreApprovalScore] = useState(80);
  const [confidenceWeight, setConfidenceWeight] = useState(70);
  const [toggles, setToggles] = useState({
    overdueAlerts: true,
    dueReminders: true,
    newApplications: true,
    aiCompletion: true,
    weeklySummary: false,
    maintenance: false,
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleToggle = (key) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getToggleColor = (isOn) => {
    return isOn ? 'bg-blue-600' : 'bg-gray-300';
  };

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-white via-blue-50 to-white">
      <div className="p-8 max-w-5xl mx-auto">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Settings size={24} className="text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-blue-900">Settings</h1>
          </div>
          <p className="text-blue-700 text-sm">
            System configuration and officer preferences
          </p>
        </div>

        {/* SECTION 1: OFFICER PROFILE */}
        <div className="mb-8 bg-white rounded-2xl p-8 shadow-sm border border-blue-100">
          <h2 className="text-xl font-bold text-blue-900 mb-6">Officer Profile</h2>

          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-white font-space">JD</span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <p className="font-bold text-blue-900 text-lg">John Dela Cruz</p>
              <p className="text-blue-600">Loan Officer</p>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-blue-700">
                  <span className="font-semibold">Branch:</span> Bacolod City Branch
                </p>
                <p className="text-sm text-blue-700">
                  <span className="font-semibold">Employee ID:</span> RAFI-2024-0042
                </p>
              </div>
            </div>

            {/* Edit Button */}
            <button className="px-4 py-2 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 transition-colors font-semibold text-sm">
              <Edit2 size={16} />
              Edit Profile
            </button>
          </div>
        </div>

        {/* SECTION 2: NOTIFICATION PREFERENCES */}
        <div className="mb-8 bg-white rounded-2xl p-8 shadow-sm border border-blue-100">
          <div className="flex items-center gap-2 mb-6">
            <Bell size={20} className="text-blue-600" />
            <h2 className="text-xl font-bold text-blue-900">Notification Preferences</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                key: 'overdueAlerts',
                label: 'Overdue Payment Alerts',
                description: 'Get notified when a borrower is overdue',
              },
              {
                key: 'dueReminders',
                label: 'Upcoming Due Date Reminders',
                description: 'Reminders for payments due in the next 7 days',
              },
              {
                key: 'newApplications',
                label: 'New Application Submitted',
                description: 'Notifications when new applications arrive',
              },
              {
                key: 'aiCompletion',
                label: 'AI Analysis Completion',
                description: 'Alerts when RUFUS scoring is complete',
              },
              {
                key: 'weeklySummary',
                label: 'Weekly Collections Summary',
                description: 'Summary report of collections activity',
              },
              {
                key: 'maintenance',
                label: 'System Maintenance Notices',
                description: 'Updates about system maintenance and downtime',
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between py-4 border-b border-blue-100 last:border-b-0"
              >
                <div className="flex-1">
                  <p className="font-semibold text-blue-900">{item.label}</p>
                  <p className="text-sm text-blue-600 mt-1">{item.description}</p>
                </div>

                {/* Toggle Switch */}
                <button
                  onClick={() => handleToggle(item.key)}
                  className={`ml-4 w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${
                    getToggleColor(toggles[item.key])
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                      toggles[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: AI SCORING THRESHOLDS */}
        <div className="mb-8 bg-white rounded-2xl p-8 shadow-sm border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <Sliders size={20} className="text-blue-600" />
            <h2 className="text-xl font-bold text-blue-900">AI Scoring Configuration</h2>
          </div>
          <p className="text-sm text-blue-600 mb-6">
            Adjust RUFUS scoring thresholds for your branch
          </p>

          <div className="space-y-8">
            {/* Pre-Approval Threshold */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-semibold text-blue-900">Pre-Approval Threshold</p>
                  <p className="text-xs text-blue-600 mt-1">Minimum score for Pre-Approval</p>
                </div>
                <div className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full font-bold text-lg">
                  {preApprovalScore}
                </div>
              </div>
              <input
                type="range"
                min="60"
                max="100"
                value={preApprovalScore}
                onChange={(e) => setPreApprovalScore(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #00C2D1 0%, #00C2D1 ${
                    ((preApprovalScore - 60) / 40) * 100
                  }%, #E5EBF2 ${((preApprovalScore - 60) / 40) * 100}%, #E5EBF2 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>60</span>
                <span>100</span>
              </div>
            </div>

            {/* Manual Review Threshold (Info Display) */}
            <div>
              <div>
                <p className="font-semibold text-blue-900 mb-4">Manual Review Threshold</p>
                <p className="text-xs text-blue-600 mb-3">Score range that triggers manual review</p>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-600 font-semibold">LOW</p>
                  <p className="text-2xl font-bold text-blue-900 mt-1">65</p>
                </div>
                <div className="flex-1 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-600 font-semibold">HIGH</p>
                  <p className="text-2xl font-bold text-blue-900 mt-1">79</p>
                </div>
              </div>
            </div>

            {/* Confidence Weight */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-semibold text-blue-900">Confidence Weight</p>
                  <p className="text-xs text-blue-600 mt-1">
                    AI confidence minimum to auto-flag
                  </p>
                </div>
                <div className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full font-bold text-lg">
                  {confidenceWeight}%
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={confidenceWeight}
                onChange={(e) => setConfidenceWeight(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #F4A124 0%, #F4A124 ${confidenceWeight}%, #E5EBF2 ${confidenceWeight}%, #E5EBF2 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0%</span>
                <span>100%</span>
              </div>
              <p className="text-xs text-blue-600 mt-3">
                Applications below this confidence will always be flagged for manual review.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4: SYSTEM INFORMATION */}
        <div className="mb-8 bg-white rounded-2xl p-8 shadow-sm border border-blue-100">
          <div className="flex items-center gap-2 mb-6">
            <Database size={20} className="text-blue-600" />
            <h2 className="text-xl font-bold text-blue-900">System Information</h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { label: 'System Version', value: 'RUFUS v1.0.0' },
              { label: 'AI Engine', value: 'GPT-4o-mini (OpenAI)' },
              { label: 'PDF Processor', value: 'PDFPlumber + Regex' },
              { label: 'Last Updated', value: 'April 28, 2026' },
              { label: 'Branch', value: 'Bacolod City' },
              { label: 'Database', value: 'Firebase (Cloud)' },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 bg-blue-50 rounded-lg border border-blue-200"
              >
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-blue-900 mt-2">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: DATA MANAGEMENT (DANGER ZONE) */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-red-200 bg-gradient-to-br from-red-50 to-white">
          <h2 className="text-xl font-bold text-red-900 mb-6">Data Management</h2>

          <div className="flex gap-4">
            <button className="px-6 py-3 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 transition-colors font-semibold">
              <Download size={18} />
              Export All Data
            </button>

            <button
              onClick={() => setShowConfirmDialog(true)}
              className="px-6 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center gap-2 transition-colors font-semibold"
            >
              <Trash2 size={18} />
              Clear Application Cache
            </button>
          </div>
        </div>
      </div>

      {/* CONFIRMATION DIALOG */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-4">
            <h2 className="text-xl font-bold text-red-900 mb-4">Clear Cache?</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to clear the application cache? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmDialog(false);
                  // Handle cache clear
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

