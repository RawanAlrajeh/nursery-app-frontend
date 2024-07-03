import { useQuery, useMutation, useQueryClient } from "react-query";
import { useAuthStore } from "@/src/store/useAuthStore";
import { babysitterApis } from "../../apis/babysitters";
import { AxiosError } from "axios";
import { ErrorResponse, ErrorState } from "@/src/utils/ErrorState";
import { useState } from "react";

export const useBabysitters = () => {
  const authToken = useAuthStore((state) => state.authToken);
  const queryClient = useQueryClient(); // Use queryClient from React Query

  const { data, error, isLoading } = useQuery(
    "babysitters",
    babysitterApis.getAll
  );

  const {
    mutate: createBabysitter,
    error: createError,
    isLoading: isCreating,
  } = useMutation(
    (newBabysitter) => babysitterApis.create(newBabysitter, authToken as string), // Ensure authToken is a string
    {
      onSuccess: () => {
        // Refetch babysitters after a new one is added
        queryClient.invalidateQueries("babysitters");
      },
    }
  );

  return { data, error, isLoading, createBabysitter, createError, isCreating };
};
