import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import HeaderSidebar from './components/Navigation/HeaderSidebar';
import BottomNav from './components/Navigation/BottomNav';
import DashboardView from './components/Dashboard/DashboardView';
import BibleReader from './components/Reading/BibleReader';
import PlansView from './components/Plans/PlansView';
import ProfileView from './components/Profile/ProfileView';
import VerseContextMenu from './components/Reading/VerseContextMenu';
import ReadingSettingsModal from './components/Reading/ReadingSettingsModal';
import Toast from './components/Common/Toast';

function AppContent() {
  const { activeTab } = useApp();

  return (
    <div class="min-h-screen bg-[#F9F7F1] dark:bg-[#121212] text-[#232323] dark:text-[#EAE6DF] font-inter transition-colors duration-200">
      {/* Top Header & Desktop Sidebar Navigation */}
      <HeaderSidebar />

      {/* Main Content Area */}
      <div class="md:pl-64 transition-all">
        {activeTab === 'home' && <DashboardView />}
        {activeTab === 'reader' && <BibleReader />}
        {activeTab === 'plans' && <PlansView />}
        {activeTab === 'profile' && <ProfileView />}
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />

      {/* Floating Modals */}
      <VerseContextMenu />
      <ReadingSettingsModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
