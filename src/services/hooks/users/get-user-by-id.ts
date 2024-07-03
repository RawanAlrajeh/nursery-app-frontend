"use client";

import { useQuery } from "react-query";
import { useState } from "react";
import { ErrorState } from "@/src/utils/ErrorState";
import { AxiosError } from "axios";
import { userApis } from "../../apis/users";

export const useUserById = (id: string) => {
  const [error, setError] = useState<ErrorState | null>(null);

  const {
    data: user,
    isLoading,
    isError,
    error: queryError,
  } = useQuery(["user", id], () => userApis.getUserById(id), {
    onError: (error: AxiosError<unknown>) => {
      const message =
        (error.response?.data as ErrorState)?.message || "Unknown error";
      const code = (error.response?.data as ErrorState)?.code || -1;
      setError({ message, code });
    },
  });

  return { user, isLoading, isError, error };
};
