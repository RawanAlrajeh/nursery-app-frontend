import React, { useEffect, useState } from "react";
import { useLogout } from "@/src/services/hooks/auth/use-logout";
import { useAuthStore } from "@/src/store/useAuthStore";
import LanguageSwitcher from "../../LanguageSwitcher/LanguageSwitcher";

interface DashboardHeaderProps {
  isSidebarRight: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ isSidebarRight }) => {
  const { logout, isLoading } = useLogout();
  const name = useAuthStore((state) => state.name);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    logout();
  };

  return (
    <header
      className={`text-[#6a8e10] p-4 flex ${
        isSidebarRight ? "justify-start" : "justify-end"
      } items-center`}
    >
      <div className="flex items-center space-x-4 gap gap-x-4">
        {mounted && <span>{name}</span>}
        <span>
          <LanguageSwitcher />
        </span>
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
