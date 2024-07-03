import React from "react";
import { Nursery } from "@/src/types/Nursery"; // Import the Nursery type
import { useNurseries } from "@/src/services/hooks/nurseries/use-nurseries";
import DashboardLayout from "@/src/components/layouts/DashboardLayout/DashboardLayout";

const NurseryList: React.FC = () => {
  const { nurseries, isLoading, isError, error } = useNurseries();

  return (
    <DashboardLayout>
      <h1>Nurseries</h1>
      <ul>
        {nurseries?.map((nursery: Nursery) => (
          <li key={nursery.id}>{nursery.name}</li>
        ))}
      </ul>
    </DashboardLayout>
  );
};

export default NurseryList;
