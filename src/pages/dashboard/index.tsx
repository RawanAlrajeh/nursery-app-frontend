import React from 'react';
import withAuth from '@/src/routes/withAuth/withAuth';
import DashboardLayout from '@/src/components/layouts/DashboardLayout/DashboardLayout';

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      <h1>Welcome to the Dashboard</h1>
      <p>This is your dashboard page.</p>
    </DashboardLayout>
  );
};

export default withAuth(DashboardPage);
