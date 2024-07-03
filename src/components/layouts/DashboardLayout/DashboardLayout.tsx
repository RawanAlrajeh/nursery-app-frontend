import { DashboardSideBar } from '../DashboardSideBar';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import DashboardFooter from '../DashboardFooter/DashboardFooter';
import { SIDEBAR_ITEMS } from '@/src/config/sidebar-items';
import React from 'react';

const DashboardLayout: React.FC<{ children: React.ReactNode; isSidebarRight?: boolean }> = ({ children, isSidebarRight = false }) => {
  return (
    <div className="flex h-screen flex-col">
      <div className={`flex flex-1 ${isSidebarRight ? 'flex-row-reverse' : ''}`}>
        <DashboardSideBar items={SIDEBAR_ITEMS} IS_ADMIN={true} />
        <div className="flex flex-1 flex-col">
          <DashboardHeader isSidebarRight={isSidebarRight} />
          <main className="flex-1 overflow-y-auto p-4">
            {children}
          </main>
          <DashboardFooter />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
