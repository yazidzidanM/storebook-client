import { Phone } from "lucide-react"
import * as z from "zod"

export const userSchema = z.object({
  name: z.string({message: "name is required field"}),
  username: z.string(),
  phone: z.string().optional(),
  address: z.string().optional(),
  role: z.string().optional()
})

export type TUser = z.infer<typeof userSchema>