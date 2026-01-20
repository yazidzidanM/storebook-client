"use client";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { useAuthStore } from '@/store/authStore';
import * as s from "../../../modules/index/home/styles";
import useAuthStore from "@/store/authStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiPrivate } from "@/instance/axios";
import apiResponse from "@/types/res/response";
import { useRouter } from "next/navigation";
// import { books, categories } from "@/app/(data mentah)/data";
import { TableCardSkeleton } from "@/components/skeletons/tableSkeleton";
import { BookInsert, bookSchema, TBook } from "@/validation/book";
import { TCategory } from "@/validation/category";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { queryClient } from "@/providers/tanstack-providers";
import BookModal from "@/components/books/bookModal";
import BookTable from "@/components/books/bookTable";
import { ConfirmDeleteModal } from "@/components/common/modalDelete";

export type Mode = "add" | "edit";

export const EMPTY_BOOK: TBook = {
  id: 0,
  categoryId: "",
  title: "",
  author: "",
  description: "",
  price: 0,
  stock: 0,
  image: "",
};

const AdminBooks = () => {
  const { user, isAuthenticated, token, hasHydrated } = useAuthStore();
  const router = useRouter();
  const { reset } = useForm<TBook>({
    defaultValues: EMPTY_BOOK,
  });
  const api = apiPrivate(token || "");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<TBook>(EMPTY_BOOK);
  const [search, setSearch] = useState<string>("");
  const [mode, setMode] = useState<Mode>("add");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleAskDelete = (book: TBook) => {
    setSelectedBook(book);
    setDeleteOpen(true);
  };

  const { data: books, isLoading: isBookLoading } =
    useQuery({
      queryKey: ["books"],
      queryFn: async () => {
        const res = await api.get("/api/books");
        return res.data;
      },
      enabled: !!token,
    }) ?? [];

  const { data: categories, isLoading: isCategoriesLoading } =
    useQuery<apiResponse<TCategory>, boolean, apiResponse<TCategory>>({
      queryKey: ["categories"],
      queryFn: async () => {
        const res = await api.get("/api/categories");
        return res.data;
      },
      enabled: !!token,
    }) ?? [];

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["books"] });
    queryClient.invalidateQueries({ queryKey: ["categories"] });
  };

  const { mutate: post } = useMutation({
    mutationKey: ["post-book"],
    mutationFn: (payload: BookInsert) => api.post("/api/books", payload),
    onSuccess: () => {
      invalidate();
      reset();
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error("error adding book");
    },
  });

  const { mutate: del, isPending } = useMutation({
    mutationKey: ["del-book"],
    mutationFn: (id: number) => api.delete(`/api/books/${id}`),
    onSuccess: () => {
      invalidate();
    },
    onError: (error) => {
      console.error(error);
      toast.error("error adding book");
    },
  });

  const { mutate: put } = useMutation({
    mutationKey: ["put-book"],
    mutationFn: (payload: BookInsert) =>
      api.put(`/api/books/${payload.id}`, payload),
    onSuccess: () => {
      invalidate();
      reset();
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error("error adding book");
    },
  });
  const onSubmit = async (data: TBook) => {
    const payload = {
      categoryId: Number(data.categoryId),
      title: data.title,
      author: data.author,
      description: data.description,
      price: Number(data.price),
      stock: Number(data.stock),
      image: data.image,
    };

    try {
      const validated = bookSchema.safeParse(data);
      if (!validated) {
        toast.error("something Error");
        return;
      }
      if (mode === "add") {
        post(payload);
        toast.success("success adding book");
      } else {
        put({ id: selectedBook.id, ...payload });
        toast.success("success edit book");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const rendering = books?.data?.map((book: TBook) => {
    const category = categories?.data?.find(
      (category: TCategory) => category.id === Number(book.categoryId)
    );
    return { ...book, category: category?.name };
  });

  const filteredBooks =
    rendering?.filter(
      (book: TBook) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    ) ?? [];

  useEffect(() => {
    if (!hasHydrated) return;

    if (!isAuthenticated || user?.role !== "admin" || !token) {
      router.replace("/login");
    }
  }, [hasHydrated, isAuthenticated, user, token, router]);

  const bookFormProps = {
    mode: mode,
    book: selectedBook,
    categories: categories,
    onSubmit: onSubmit,
    modalOpen: isModalOpen,
  };

  const btnStyle =
    "cursor-pointer \
      bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 text-white \
      dark:bg-linear-to-r dark:from-[#C6A96B] dark:via-[#695a39] dark:to-[#413821] dark:border-white/10\
      py-3 font-semibold hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed";
  return (
    <>
      {isBookLoading || isCategoriesLoading ? (
        <TableCardSkeleton />
      ) : (
        <div className="space-y-6 p-6 h-full dark:bg-linear-to-b dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]">
          <div className={s.heroGlow} />
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search books..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              onClick={() => {
                setMode("add");
                setIsModalOpen(true);
              }}
              className={btnStyle}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Book
            </Button>
          </div>

          <div className="bg-card rounded-xl shadow-card overflow- border border-border">
            <BookTable
              filteredBooks={filteredBooks}
              handleDelete={handleAskDelete}
              handleMode={setMode}
              handleOpen={setIsModalOpen}
              handleSelectedBook={setSelectedBook}
            />
          </div>
        </div>
      )}

      <ConfirmDeleteModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Book"
        message={`Are you sure you want to delete "${selectedBook?.title}"? This action cannot be undone.`}
        loading={isPending}
        onConfirm={() => {
          if (!selectedBook) return;
          del(selectedBook.id!, {
            onSuccess: () => setDeleteOpen(false),
          });
        }}
      />

      <BookModal
        book={selectedBook}
        open={isModalOpen}
        mode={mode}
        onChange={setIsModalOpen}
        bookFormProps={bookFormProps}
      />
    </>
  );
};

export default AdminBooks;
