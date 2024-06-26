import React from "react";
import { useVerifyCode } from "@/src/services/hooks/auth/use-verify-code";
import VerificationCodeInput from "@/src/components/VerificationCodeInput/VerificationCodeInput";
import { useTranslation } from "react-i18next";

const VerifyPage: React.FC = () => {
  const { isLoading, verifyCode, error } = useVerifyCode();
  const { t } = useTranslation("common");

  const handleVerify = (code: string) => {
    verifyCode({ code });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">{t("verify.verifyYourAccount")}</h1>
      {error && <p className="text-red-500 mt-4">{error.message}</p>}
      <VerificationCodeInput onSubmit={handleVerify} length={4}/>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default VerifyPage;
