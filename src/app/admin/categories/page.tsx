"use client";
import useAuthStore from "@/store/authStore";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as s from "../../../modules/index/home/styles";
import { apiPrivate } from "@/instance/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TcategoriesInsert, TCategory } from "@/validation/category";
import { queryClient } from "@/providers/tanstack-providers";
import { TableCardSkeleton } from "@/components/skeletons/tableSkeleton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CategoryModal } from "@/components/categories/categoryModal";
import { ConfirmDeleteModal } from "@/components/common/modalDelete";

const AdminCategories = () => {
  const { user, isAuthenticated, token, hasHydrated } = useAuthStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
    null
  );

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleAskDelete = (category: TCategory) => {
    setSelectedCategory(category);
    setDeleteOpen(true);
  };

  const api = apiPrivate(token || "");
  const { data: categories, isLoading: isCategoriesLoading } =
    useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
        const res = await api.get("/api/categories");
        return res.data;
      },
      enabled: !!token,
    }) ?? [];

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["categories"] });

  const { mutate: post } = useMutation({
    mutationKey: ["post-categories"],
    mutationFn: (payload: TcategoriesInsert) =>
      api.post("/api/categories", payload),
    onSuccess() {
      invalidate();
    },
  });

  const handleCreate = () => {
    setMode("create");
    setSelectedCategory(null);
    setOpen(true);
  };

  const handleEdit = (category: TCategory) => {
    setMode("edit");
    setSelectedCategory(category);
    setOpen(true);
  };

  const { mutate: edit } = useMutation({
    mutationKey: ["edit-categories"],
    mutationFn: (payload: TCategory) =>
      api.put(`/api/categories/${payload.id}`, payload),
    onSuccess() {
      invalidate();
    },
  });

  const { mutate: del, isPending } = useMutation({
    mutationKey: ["det-categories"],
    mutationFn: (id: number) => api.delete(`/api/categories/${id}`),
    onSuccess() {
      invalidate();
    },
  });

  useEffect(() => {
    if (!hasHydrated) return;

    if (!isAuthenticated || user?.role !== "admin" || !token) {
      router.replace("/login");
    }
  }, [hasHydrated, isAuthenticated, user, token, router]);

  const btnStyle =
    "cursor-pointer \
      bg-linear-to-r from-blue-600  via-indigo-600 to-violet-600 text-white \
      dark:bg-linear-to-r dark:from-[#C6A96B] dark:via-[#695a39] dark:to-[#413821] dark:border-white/10\
      py-3 font-semibold hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <>
      {isCategoriesLoading ? (
        <TableCardSkeleton />
      ) : (
        <>
          <div className="h-screen space-y-6 p-6 dark:bg-linear-to-b dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-serif font-bold">
                All <span className="dark:text-[#C8A96B]"> Categories</span>
              </h2>

              <Button className={btnStyle} onClick={() => handleCreate()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </div>

            <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
              <div className={s.heroGlow} />
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr className="text-left">
                      <th className="px-6 py-3 font-medium text-muted-foreground">
                        Name
                      </th>
                      <th className="px-6 py-3 font-medium text-muted-foreground">
                        Description
                      </th>
                      <th className="px-6 py-3 font-medium text-muted-foreground">
                        Books
                      </th>
                      <th className="px-6 py-3 font-medium text-muted-foreground text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-border">
                    {categories &&
                      categories?.data.map((category: TCategory) => (
                        <tr
                          key={category.id}
                          className="hover:bg-muted/40 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium">
                            {category.name}
                          </td>

                          <td className="px-6 py-4 text-muted-foreground max-w-md">
                            {category.description}
                          </td>

                          <td className="px-6 py-4">
                            <span
                              className="
                    inline-flex items-center px-2 py-0.5 rounded-full
                    text-xs font-medium
                    bg-indigo-100 text-indigo-600
                    dark:bg-[#C8A96B]/10 dark:text-[#C8A96B]
                  "
                            >
                              {/* {category.bookCount} */}0
                            </span>
                          </td>

                          <td className="px-3.5 py-4">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-indigo-100 dark:hover:bg-indigo-600/10"
                                onClick={() => handleEdit(category)}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                onClick={() => handleAskDelete(category)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <ConfirmDeleteModal
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
            title="Delete Category"
            message={`Are you sure you want to delete "${selectedCategory?.name}"? This action cannot be undone.`}
            loading={isPending}
            onConfirm={() => {
              if (!selectedCategory) return;
              del(selectedCategory.id!, {
                onSuccess: () => setDeleteOpen(false),
              });
            }}
          />

          <CategoryModal
            open={open}
            mode={mode}
            category={selectedCategory}
            onClose={setOpen}
            onSubmit={(data) => {
              if (mode === "create") {
                post(data)
                setOpen(false)
              } else {
                edit(data)
                setOpen(false)
              }
            }}
          />
        </>
      )}
    </>
  );
};

export default AdminCategories;
