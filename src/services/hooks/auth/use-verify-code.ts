"use client";

import { useMutation } from "react-query";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/src/store/useAuthStore";
import { AxiosError } from "axios";
import { ErrorResponse, ErrorState } from "@/src/utils/ErrorState";
import { authApis } from "../../apis/auth";

interface VerifyCodePayload {
  code: string;
}

export const useVerifyCode = () => {
  const router = useRouter();
  const otpToken = useAuthStore((state) => state.otpToken);
  const setAuthToken = useAuthStore((state) => state.setAuthToken);
  const [error, setError] = useState<ErrorState | null>(null);

  const {
    mutate,
    data,
    isLoading,
    isError,
    error: resError,
  } = useMutation({
    mutationFn: async (payload: VerifyCodePayload) => {
      if (!otpToken) {
        throw new Error("No OTP token available");
      }
      const response = await authApis.verifyCode({ ...payload, otpToken });
      setAuthToken(response.newToken); // Set the new token after verification
      return response;
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data.message || "Unknown error";
      const code = error.response?.data.code || -1;
      setError({ message, code });
    },
  });

  useEffect(() => {
    if (data?.newToken) {
      setAuthToken(data.newToken);
      router.push("/dashboard");
    }
  }, [data, setAuthToken, router]);

  return { isLoading, verifyCode: mutate, data, error };
};
