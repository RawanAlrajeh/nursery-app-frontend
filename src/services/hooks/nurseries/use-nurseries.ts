"use client";

import { useQuery } from "react-query";
import { useState } from "react";
import { ErrorState } from "@/src/utils/ErrorState";
import { AxiosError } from "axios";
import { Nursery } from "@/src/types/Nursery"; 
import { nurseryApis } from "../../apis/nursery";

export const useNurseries = () => {
  const [error, setError] = useState<ErrorState | null>(null);

  const {
    data: nurseries,
    isLoading,
    isError,
    error: queryError,
  } = useQuery<Nursery[], AxiosError<unknown, any>>('nurseries', nurseryApis.getNurseries, {
    onError: (error: AxiosError<unknown>) => {
      const message = (error.response?.data as ErrorState)?.message || "Unknown error";
      const code = (error.response?.data as ErrorState)?.code || -1;
      setError({ message, code });
    },
  });

  return { nurseries, isLoading, isError, error };
};
