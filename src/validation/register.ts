import z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2).max(100),
  username: z.string().min(2).max(100),
  password: z.string().min(8).max(100),
  confirmPassword: z.string().min(8).max(100)
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export type TRegister = z.infer<typeof RegisterSchema>;