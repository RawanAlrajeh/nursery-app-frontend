import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardSidebarItemProps {
  path: string;
  label: string;
  handleSidebar: () => void;
  isActive: boolean;
}

export const DashboardSidebarItem: React.FC<DashboardSidebarItemProps> = ({
  path,
  label,
  handleSidebar,
  isActive,
}) => {
  const pathname = usePathname();
  return (
    <Link href={path}>
      <p
        onClick={handleSidebar}
        className={`flex items-center p-2 ${
          isActive ? "bg-blue-500 text-white" : "text-gray-700"
        }`}
      >
        {label}
      </p>
    </Link>
  );
};
