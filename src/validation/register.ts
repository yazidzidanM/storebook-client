import z from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string({ message: "name was required" })
      .min(3, { message: "name minimum is 4 character" })
      .max(100),
    username: z
      .string({ message: "username was required" })
      .min(6, { message: "username minimum is 6 character" })
      .max(100),
    password: z
      .string({ message: "password required" })
      .min(8, { message: "password minimum is 8 character" })
      .max(100),
    confirmPassword: z
      .string({ message: "confirm password was required" })
      .min(8, { message: "confirm password minimum is 6 character" })
      .max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TRegister = z.infer<typeof RegisterSchema>;
