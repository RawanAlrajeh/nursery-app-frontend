import React from "react";
import withAuth from "@/src/routes/withAuth/withAuth";
import DashboardLayout from "@/src/components/layouts/DashboardLayout/DashboardLayout";

const AdminPage: React.FC = () => {
  return (
    <DashboardLayout>
      <h1>Welcome to the Admin age</h1>
      <p>This is your Admin page.</p>
    </DashboardLayout>
  );
};

export default withAuth(AdminPage);
