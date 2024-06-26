import { ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import Navbar from "../Navbar";
import { useTranslation } from "react-i18next";

const queryClient = new QueryClient();

interface AppWrapperProps {
  children: ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps) => {
  const router = useRouter();
  const { t, i18n } = useTranslation("common");

  // List of routes where the Navbar should not appear
  const authRoutes = ["/auth/login", "/auth/register", "/auth/verify"];
  const isAuthRoute = authRoutes.includes(router.pathname);

  const { lang } = router.query;

  useEffect(() => {
    if (lang && typeof lang === "string") {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <QueryClientProvider client={queryClient}>
      {!isAuthRoute && <Navbar />}
      {children}
    </QueryClientProvider>
  );
};

export default AppWrapper;
