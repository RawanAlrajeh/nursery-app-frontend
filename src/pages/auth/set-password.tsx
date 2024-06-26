"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useSetPassword } from "@/src/services/hooks/auth/use-set-password";
import { BaseInput } from "@/src/components/BaseInput";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/src/components/LanguageSwitcher/LanguageSwitcher";

const setPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters")
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  }
});

type SetPasswordFormValues = z.infer<typeof setPasswordSchema>;

const SetPassword = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { token } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetPasswordFormValues>({
    resolver: zodResolver(setPasswordSchema),
  });

  const [message, setMessage] = useState("");
  const { isLoading, setPassword, error } = useSetPassword();

  const onSubmit = (data: SetPasswordFormValues) => {
    if (typeof token === "string") {
      setPassword(
        { token, password: data.password },
        {
          onSuccess: () => {
            setMessage(t("setPassword.success"));
          },
          onError: () => {
            setMessage(t("setPassword.failed"));
          },
        }
      );
    } else {
      setMessage("Invalid or missing token.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <LanguageSwitcher />
      <h1 className="text-3xl font-bold mb-4">{t("setPassword.title")}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
        <BaseInput
          label={t("setPassword.password")}
          type="password"
          placeholder={t("setPassword.password")}
          validationState={errors.password ? "invalid" : "none"}
          errorMessage={errors.password?.message}
          {...register("password")}
        />

        <BaseInput
          label={t("setPassword.confirmPassword")}
          type="password"
          placeholder={t("setPassword.confirmPassword")}
          validationState={errors.confirmPassword ? "invalid" : "none"}
          errorMessage={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          {t("setPassword.submit")}
        </button>
      </form>
      <p className="mt-4">{message}</p>
      {error && <p className="text-red-500 mt-4">{error.message}</p>}
    </div>
  );
};

export default SetPassword;
