import React from "react";
import { Parent } from "@/src/types/Nursery";
import DashboardLayout from "@/src/components/layouts/DashboardLayout/DashboardLayout";
import { useGetParents } from "@/src/services/hooks/parents/use-get-parents";

const ParentsList: React.FC = () => {
  const { parents, isLoading, isError, error } = useGetParents();

  return (
    <DashboardLayout>
      <h1>parents</h1>
      <ul>
        {parents?.map((parent: Parent) => (
          <li key={parent.id}>{parent.name}</li>
        ))}
      </ul>
    </DashboardLayout>
  );
};

export default ParentsList;
