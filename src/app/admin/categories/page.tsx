"use client"
import useAuthStore from "@/store/authStore";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as s from "../../../modules/index/home/styles";
import { apiPrivate } from "@/instance/axios";
import { useQuery } from "@tanstack/react-query";
import { TCategory } from "@/validation/category";

const AdminCategories = () => {
  const { user, isAuthenticated, token } = useAuthStore();

  const api = apiPrivate(token || "")
  const { data: categories, isLoading: isCategoriesLoading } =
    useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
        const res = await api.get("/api/categories");
        return res.data;
      },
      enabled: !!token,
    }) ?? [];

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  const btnStyle =
    "cursor-pointer \
      bg-linear-to-r from-blue-600  via-indigo-600 to-violet-600 text-white \
      dark:bg-linear-to-r dark:from-[#C6A96B] dark:via-[#695a39] dark:to-[#413821] dark:border-white/10\
      py-3 font-semibold hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="h-screen space-y-6 p-6 dark:bg-linear-to-b dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-serif font-bold">
          All <span className="dark:text-[#C8A96B]"> Categories</span>
        </h2>

        <Button className={btnStyle} onClick={() => {}}>
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
              {categories && categories?.data.map((cat: TCategory) => (
                <tr
                  key={cat.id}
                  className="hover:bg-muted/40 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{cat.name}</td>

                  <td className="px-6 py-4 text-muted-foreground max-w-md">
                    {cat.description}
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
                      {/* {cat.bookCount} */}0
                    </span>
                  </td>

                  <td className="px-3.5 py-4">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-indigo-100 dark:hover:bg-indigo-600/10"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
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
  );
};

export default AdminCategories;
