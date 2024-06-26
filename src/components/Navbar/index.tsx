import { useLogout } from "@/src/services/hooks/auth/use-logout";
import React from "react";


const Navbar: React.FC = () => {
  const { logout } = useLogout();

  return (
    <nav className="bg-blue-500 text-white py-4 px-8 flex justify-between items-center">
      <div className="text-2xl font-bold">Nursery App</div>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
