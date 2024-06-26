import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["mother", "nursery"]).refine((value) => value !== undefined, {
    message: "Role is required",
  }),
});


type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export const useLoginForm = () => {
  return useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
};

export const useRegisterForm = () => {
  return useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });
};

export type { LoginFormValues, RegisterFormValues };
