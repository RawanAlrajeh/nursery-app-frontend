import { useQuery, useMutation } from "react-query";
import { classApis } from "../../api/classes";
import { useAuthStore } from "@/src/store/useAuthStore";

export const useClasses = () => {
  const token = useAuthStore((state) => state.token);

  const { data, error, isLoading } = useQuery('classes', classApis.getAll);

  const {
    mutate: createClass,
    error: createError,
    isLoading: isCreating,
  } = useMutation(
    (newClass) => classApis.create(newClass, token),
    {
      onSuccess: () => {
        // Refetch classes after a new one is added
        queryClient.invalidateQueries('classes');
      },
    }
  );

  return { data, error, isLoading, createClass, createError, isCreating };
};
