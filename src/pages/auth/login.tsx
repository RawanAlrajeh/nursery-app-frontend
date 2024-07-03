"use client";

import { useState } from "react";
import { useLoginForm } from "../../hooks/useForm";
import { useLogin } from "@/src/services/hooks/auth/use-login";
import { BaseInput } from "@/src/core/BaseInput";
import { useTranslation } from "react-i18next";
import Button from "@/src/core/Button";
import { ButtonTypes } from "@/src/core/Button/ButtonTypes";

const Login = () => {
  const { t } = useTranslation("common");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useLoginForm();
  const [message, setMessage] = useState("");
  const { isLoading, login, error } = useLogin();

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

  const emailValue = watch("email");
  const passwordValue = watch("password");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{t("login.title")}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-sm gap gap-y-4"
      >
        <div>
          <BaseInput
            label={t("login.email")}
            validationState={errors.email ? "invalid" : "none"}
            autoComplete="new-username"
            errorMessage={errors.email?.message ?? null}
            value={emailValue}
            {...register("email", { required: t("login.emailRequired") })}
          />
        </div>
        <div>
          <BaseInput
            label={t("login.password")}
            placeholder={t("login.password")}
            validationState={errors.password ? "invalid" : "none"}
            errorMessage={errors.password?.message ?? null}
            isPassword
            value={passwordValue}
            {...register("password", { required: t("login.passwordRequired") })}
          />
        </div>
        <div>
          <Button
            variant={ButtonTypes.SECONDARY}
            rounded
            type="submit"
            className="w-full py-2 px-4"
          >
            {t("login.submit")}
          </Button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error.message}</p>}
    </div>
  );
};

export default Login;
