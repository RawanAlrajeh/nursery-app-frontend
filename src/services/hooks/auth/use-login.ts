"use client";

import { useMutation } from "react-query";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/src/store/useAuthStore";
import { AxiosError } from "axios";
import { ErrorResponse, ErrorState } from "@/src/utils/ErrorState";
import { authApis } from "../../apis/auth";

export const useLogin = () => {
  const setOtpToken = useAuthStore((state) => state.setOtpToken);
  const router = useRouter();
  const [error, setError] = useState<ErrorState | null>(null);

  const {
    mutate,
    data,
    isLoading,
    isError,
    error: resError,
  } = useMutation({
    mutationFn: authApis.login,
    onSuccess: (response) => {
      setOtpToken(response.otpToken);
      router.push("/auth/verify"); // Redirect to verification page
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message || "Unknown error";
      const code = error.response?.data?.code || -1;
      setError({ message, code });
    },
  });

  return { isLoading, login: mutate, data, error };
};
