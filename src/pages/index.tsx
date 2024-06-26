import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher/LanguageSwitcher";

export default function Home() {
  const { t, i18n } = useTranslation("common");
  const router = useRouter();

  const handleLoginRedirect = () => {
    const currentLang = i18n.language;
    router.push(`/auth/login?lang=${currentLang}`);
  };

  return (
    <div>
      <LanguageSwitcher />
      <h1>{t("welcomeMessage")}</h1>
      <button 
        onClick={handleLoginRedirect} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        {t("loginButton")}
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "ar", ["common"])),
    },
  };
};
