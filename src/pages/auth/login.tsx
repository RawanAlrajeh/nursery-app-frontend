"use client";

import { useState } from "react";
import { useLoginForm } from "../../hooks/useForm";
import { useLogin } from "@/src/services/hooks/auth/use-login";
import { BaseInput } from "@/src/components/BaseInput";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/src/components/LanguageSwitcher/LanguageSwitcher";

const Login = () => {
  const { t } = useTranslation("common");
  const { register, handleSubmit, formState: { errors } } = useLoginForm();
  const [message, setMessage] = useState("");
  const { isLoading, login, data, error } = useLogin();

  const onSubmit = (data: { email: string; password: string }) => {
    login(data, {
      onSuccess: () => {
        setMessage(t("login.success"));
      },
      onError: () => {
        setMessage(t("login.failed"));
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <LanguageSwitcher />
      <h1 className="text-3xl font-bold mb-4">{t("login.title")}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
        <BaseInput
          label={t("login.email")}
          validationState={errors.email ? "invalid" : "none"}
          autoComplete="new-username"
          errorMessage={errors.email?.message}
          {...register("email")}
        />

        <BaseInput
          label={t("login.password")}
          type="password"
          placeholder={t("login.password")}
          validationState={errors.password ? "invalid" : "none"}
          errorMessage={errors.password?.message}
          {...register("password")}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          {t("login.submit")}
        </button>
      </form>
      <p className="mt-4">{message}</p>
      {error && <p className="text-red-500 mt-4">{error.message}</p>}
    </div>
  );
};

export default Login;
