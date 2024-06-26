import React from 'react';
import { useRouter } from 'next/router';
import { useLogout } from '@/src/services/hooks/auth/use-logout';

const Navbar = () => {
  const { logout, isLoading } = useLogout();
  const router = useRouter();

  const handleLogout = async () => {
    logout();
  };

  return (
    <nav>
      <button onClick={handleLogout} disabled={isLoading}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
