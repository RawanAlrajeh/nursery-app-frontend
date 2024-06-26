import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "../Navbar";
import { useRouter } from "next/router";

const queryClient = new QueryClient();

interface AppWrapperProps {
  children: ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps) => {
  const router = useRouter();

  // List of routes where the Navbar should not appear
  const noNavbarRoutes = ["/", "/auth/login", "/auth/register", "/auth/verify"];

  return (
    <QueryClientProvider client={queryClient}>
      {!noNavbarRoutes.includes(router.pathname) && <Navbar />}{" "}
      {children}
    </QueryClientProvider>
  );
};

export default AppWrapper;
