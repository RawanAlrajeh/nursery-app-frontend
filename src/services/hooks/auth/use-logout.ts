"use client";

import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useAuthStore } from "@/src/store/useAuthStore";
import { AxiosError } from "axios";
import { ErrorResponse, ErrorState } from "@/src/utils/ErrorState";
import { authApis } from "../../apis/auth";
import { useState } from "react";

export const useLogout = () => {
  const clearTokens = useAuthStore((state) => state.clearTokens);
  const authToken = useAuthStore((state) => state.authToken);
  const router = useRouter();
  const [error, setError] = useState<ErrorState | null>(null);

  const {
    mutate,
    data,
    isLoading,
    isError,
    error: resError,
  } = useMutation({
    mutationFn: async () => {
      if (!authToken) {
        throw new Error("No auth token available");
      }
      return authApis.logout(authToken);
    },
    onSuccess: () => {
      clearTokens();
      router.push("/auth/login");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message || "Unknown error";
      const code = error.response?.data?.code || -1;
      setError({ message, code });
    },
  });

  return { isLoading, logout: mutate, data, error };
};
