"use client";

import { useMutation } from "react-query";
import { authApis } from "../../apis/auth";
import { useState } from "react";
import { useAuthStore } from "@/src/store/useAuthStore";
import { ErrorState } from "@/src/utils/ErrorState";
import { AxiosError } from "axios";
import { RegisterFormValues } from "@/src/hooks/useForm";

export const useAdminRegister = () => {
  const token = useAuthStore((state) => state.otpToken);
  const [error, setError] = useState<ErrorState | null>(null);

  const {
    mutate,
    data,
    isLoading,
    isError,
    error: resError,
  } = useMutation({
    mutationFn: (newUser: RegisterFormValues) =>
      authApis.register(newUser, token!),
    onError: (error: AxiosError<ErrorState>) => {
      const message = error.response?.data?.message || "Unknown error";
      const code = typeof error.response?.data?.error?.code === 'number' 
        ? error.response?.data?.error?.code 
        : -1; // Default value if not a number
      setError({ message, code });
    },
  });

  return { isLoading, register: mutate, data, error };
};