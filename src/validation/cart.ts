import z from "zod";
import { bookSchema } from "./book";


const cartSchema = bookSchema.extend({
  quantity: z.number()
})

export type TCart = z.infer<typeof cartSchema>