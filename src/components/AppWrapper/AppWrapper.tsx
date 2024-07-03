import { ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import LandingNavbar from "../Navbar/LandingNavbar/LandingNavbar";

const queryClient = new QueryClient();

interface AppWrapperProps {
  children: ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps) => {
  const router = useRouter();
  const { t, i18n } = useTranslation("common");

  const { lang } = router.query;

  useEffect(() => {
    if (lang && typeof lang === "string") {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <QueryClientProvider client={queryClient}>
      {router.pathname === "/" && <LandingNavbar />}
      {children}
    </QueryClientProvider>
  );
};

export default AppWrapper;
