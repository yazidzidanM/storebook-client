"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { bookSchema, TBook } from "@/validation/book";
import { TCategory } from "@/validation/category";
import apiResponse from "@/types/res/response";

type Props = {
  mode: string;
  book?: TBook;
  categories: apiResponse<TCategory> | undefined;
  onSubmit: (data: TBook) => void;
  modalOpen: boolean;
};

export function BookForm({
  mode,
  book,
  categories,
  onSubmit,
  modalOpen,
}: Props) {
  const form = useForm<TBook>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      image: "",
      title: "",
      author: "",
      price: 0,
      stock: 0,
      categoryId: String(book?.categoryId) ?? "",
      description: "",
    },
  });

  useEffect(() => {
    if (!modalOpen) return;
    if (!book) return;
    if (mode !== "edit") return;

    form.reset(
      {
        image: book.image,
        title: book.title,
        author: book.author,
        price: Number(book.price),
        stock: Number(book.stock),
        categoryId: String(book.categoryId),
        description: book.description,
      },
      {
        keepDefaultValues: false,
      }
    );
  }, [modalOpen, mode, book]);

  useEffect(() => {
    if (!modalOpen) return;
    if (mode !== "add") return;

    form.reset({
      image: "",
      title: "",
      author: "",
      price: 0,
      stock: 0,
      categoryId: "",
      description: "",
    });
  }, [modalOpen, mode]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.data?.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">
            {mode === "add" ? "Add Book" : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
