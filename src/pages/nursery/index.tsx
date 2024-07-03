import React from "react";
import withAuth from "@/src/routes/withAuth/withAuth";
import DashboardLayout from "@/src/components/layouts/DashboardLayout/DashboardLayout";

const NurseryPage: React.FC = () => {
  return (
    <DashboardLayout>
      <h1>Welcome to the Nursery Page</h1>
      <p>This is your Nursery Page.</p>
    </DashboardLayout>
  );
};

export default withAuth(NurseryPage);
