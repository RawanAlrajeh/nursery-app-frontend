import React from 'react';
import Link from 'next/link';

const LandingNavbar = () => {
  return (
    <nav>
      <Link href="/">
        Home
      </Link>
      <Link href="/auth/login">
        Login
      </Link>
    </nav>
  );
};

export default LandingNavbar;
