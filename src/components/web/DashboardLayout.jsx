import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardView from './DashboardView';
import ApplicationsView from './ApplicationsView';
import ReportsView from './ReportsView';
import SettingsView from './SettingsView';

export default function DashboardLayout({ applications = [], onRowClick }) {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView onRowClick={onRowClick} />;
      case 'applications':
        return <ApplicationsView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView onRowClick={onRowClick} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 overflow-auto bg-slate-50">
        {/* Dynamic Content */}
        <div className="p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
