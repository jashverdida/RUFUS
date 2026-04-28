import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardView from './DashboardView';
import ApplicationsView from './ApplicationsView';
import CollectionsView from './CollectionsView';
import ReportsView from './ReportsView';
import SettingsView from './SettingsView';
import NotificationBell from './NotificationBell';
import BackgroundDecor from '../BackgroundDecor';

export default function DashboardLayout({ applications = [], onRowClick }) {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView onRowClick={onRowClick} />;
      case 'applications':
        return <ApplicationsView />;
      case 'collections':
        return <CollectionsView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView onRowClick={onRowClick} />;
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden relative">
      {/* Background decorations - animated SVG layer */}
      <BackgroundDecor />
      
      {/* Sidebar */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      {/* Main Content Area */}
      <main className="flex-1 ml-20 md:ml-64 overflow-y-auto relative z-10 w-full min-h-screen transition-all duration-300">
        {/* Top Bar with Notification Bell */}
        <div className="sticky top-0 z-20 flex items-center justify-end p-4 bg-white border-b border-blue-100 shadow-sm">
          <NotificationBell />
        </div>

        {/* Dynamic Content */}
        <div className="p-4 sm:p-8 pb-12 w-full">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
