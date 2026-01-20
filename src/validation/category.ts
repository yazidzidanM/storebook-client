import * as z from "zod"

export const categorySchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string(),
})

export type TCategory = z.infer<typeof categorySchema>

export const categoreisInsertSchema = categorySchema.omit({id: true})

export type TcategoriesInsert = z.infer<typeof categoreisInsertSchema>