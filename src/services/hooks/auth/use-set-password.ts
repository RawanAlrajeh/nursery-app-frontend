"use client";

import { useMutation } from "react-query";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { ErrorResponse, ErrorState } from "@/src/utils/ErrorState";
import { authApis } from "../../apis/auth";

export const useSetPassword = () => {
  const router = useRouter();
  const [error, setError] = useState<ErrorState | null>(null);

  const {
    mutate,
    data,
    isLoading,
    isError,
    error: resError,
  } = useMutation({
    mutationFn: async ({ token, password }: { token: string; password: string }) => {
      return authApis.setPassword({ token, password });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data.message || "Unknown error";
      const code = error.response?.data.code || -1;
      setError({ message, code });
    },
  });

  useEffect(() => {
    if (data) {
      router.push("/auth/login");
    }
  }, [data, router]);

  return { isLoading, setPassword: mutate, data, error };
};
