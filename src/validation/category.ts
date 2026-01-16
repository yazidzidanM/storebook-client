import * as z from "zod"

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
})

export type TCategory = z.infer<typeof categorySchema>