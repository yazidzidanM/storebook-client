import z from "zod";
import { userSchema } from "./user";

const checkout = userSchema.extend({
  note: z.string().optional()
})

export type TCheckout = z.infer<typeof checkout>