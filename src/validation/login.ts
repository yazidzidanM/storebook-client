import z from "zod";

export const LoginSchema = z.object({
  username: z.string().min(2).max(100),
  password: z.string().min(8).max(100)
});

export type TLogin = z.infer<typeof LoginSchema>;