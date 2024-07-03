"use client";

import { useQuery } from "react-query";
import { useState } from "react";
import { ErrorState } from "@/src/utils/ErrorState";
import { AxiosError } from "axios";
import { Nursery } from "@/src/types/Nursery";
import { motherApis } from "../../apis/parent";

export const useGetParents = () => {
  const [error, setError] = useState<ErrorState | null>(null);

  const {
    data: parents,
    isLoading,
    isError,
    error: queryError,
  } = useQuery<Nursery[], AxiosError<unknown, any>>(
    "parents",
    motherApis.getParents,
    {
      onError: (error: AxiosError<unknown>) => {
        const message =
          (error.response?.data as ErrorState)?.message || "Unknown error";
        const code = (error.response?.data as ErrorState)?.code || -1;
        setError({ message, code });
      },
    }
  );

  return { parents, isLoading, isError, error };
};
