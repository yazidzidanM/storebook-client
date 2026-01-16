import * as z from "zod"

export const bookSchema = z.object({
  id: z.number().optional(),
  category: z.string().optional(),
  categoryId: z.string(),
  title: z.string(),
  author: z.string(),
  description: z.string(),
  price: z.number().min(1).positive(),
  stock: z.number().min(1).positive(),
  image: z.string()
})

export type TBook = z.infer<typeof bookSchema>

const bookInsertSchema = bookSchema.omit({ category: true }).extend({
  categoryId: z.number(),
})

export type BookInsert = z.infer<typeof bookInsertSchema>