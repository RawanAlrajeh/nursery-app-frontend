"use client";

import { useMutation } from "react-query";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/src/store/useAuthStore";
import { AxiosError } from "axios";
import { ErrorResponse, ErrorState } from "@/src/utils/ErrorState";
import { authApis } from "../../apis/auth";

export const useLogin = () => {
  // Accessing state update functions from Zustand store
  const setOtpToken = useAuthStore((state) => state.setOtpToken);
  const setAuthToken = useAuthStore((state) => state.setAuthToken);
  const setRole = useAuthStore((state) => state.setRole);
  const setName = useAuthStore((state) => state.setName);
  const router = useRouter();
  const [error, setError] = useState<ErrorState | null>(null);

  // Setting up mutation for login API call
  const {
    mutate,
    data,
    isLoading,
    isError,
    error: resError,
  } = useMutation({
    mutationFn: authApis.login,
    onSuccess: (response) => {
      // Handling successful login response
      if (response.role === "admin" || response.role === "nursery") {
        setOtpToken(response.otpToken);
        setAuthToken(response.newToken); // Assuming the verified token is stored as newToken
        setRole(response.role);
        setName(response.name); // Set the username
        router.push("/auth/verify"); // Redirect to verification page
      } else {
        setError({
          message: "Access denied. You do not have the required role.",
          code: 403,
        });
      }
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      // Handling login error response
      const message = error.response?.data?.message || "Unknown error";
      const code = error.response?.data?.code || -1;
      setError({ message, code });
    },
  });

  return { isLoading, login: mutate, data, error };
};
