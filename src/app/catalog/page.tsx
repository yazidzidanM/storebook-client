"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookCard } from "@/components/books/bookCard";
import { Footer } from "@/modules/index/footer";
import { Navbar } from "@/modules/index/navbar/navbar";
import { useTheme } from "next-themes";
import * as s from "../../modules/index/home/styles";
import { useCartStore } from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import { TBook } from "@/validation/book";
import { useQuery } from "@tanstack/react-query";
import apiResponse from "@/types/res/response";
import { TCategory } from "@/validation/category";
import { apiPublic } from "@/instance/axios";
import { BookCardSkeleton } from "@/components/books/bookCardSkeleton";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import cartItemAdd from "@/logic/cart/cartAdd";

const Catalog = () => {
  const { user, isAuthenticated, token } = useAuthStore();
  const { items, addItem, totalitems } = useCartStore();
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const selectedCategory = searchParams.get("category") || "all";
  const sortBy = searchParams.get("sort") || "title";
  const addToCart = async (id: number, stock: number) => {
    const item = items.find((item) => Number(item.bookId) === id);

    if (item?.quantity === stock) return toast.error(`Maximum stock reached`);
    if (user && isAuthenticated) {
      await cartItemAdd(id, token ?? "");
    }
    addItem({ bookId: String(id), quantity: 1 });
    toast.success("success add to cart");
  };

  const { data: books, isLoading: isBookLoading } =
    useQuery({
      queryKey: ["books"],
      queryFn: async () => {
        const res = await apiPublic.get("/api/books");
        return res.data;
      },
    }) ?? [];

  const { data: categories, isLoading: isCategoriesLoading } =
    useQuery<apiResponse<TCategory>, boolean, apiResponse<TCategory>>({
      queryKey: ["categories"],
      queryFn: async () => {
        const res = await apiPublic.get("/api/categories");
        return res.data;
      },
    }) ?? [];

  const fullsetBook =
    books?.data && categories?.data
      ? books.data.map((book: TBook) => {
          const category = categories.data.find(
            (category: TCategory) => category.id === Number(book.categoryId),
          );

          return { ...book, category: category?.name };
        })
      : [];

  const filteredBooks = useMemo(() => {
    if (!fullsetBook.length) return [];

    let result = [...fullsetBook];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (book) =>
          book.title?.toLowerCase().includes(query) ||
          book.author?.toLowerCase().includes(query),
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((book) => book.category === selectedCategory);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [fullsetBook, searchQuery, selectedCategory, sortBy]);

  const handleCategoryChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", value);
    }
    router.push(`?${newParams.toString()}`);
  };

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", value);
    router.push(`?${newParams.toString()}`);
  };

  const clearFilters = () => {
    setSearchQuery("");
  };

  return (
    <div className={s.page}>
      <Navbar />

      <main className="flex-1 py-8 bg-background dark:bg-linear-to-b dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]">
        {(theme.resolvedTheme === "dark" ? "dark" : "light") === "dark" && (
          <div className={s.heroGlow} />
        )}
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold">
              Book<span className="dark:text-[#C6A96B]"> Catalog</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Explore our collection of {books?.data?.length} books
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search books or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 input-search"
              />
            </div>

            <div className="flex gap-3">
              <Select
                value={selectedCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories &&
                    categories?.data?.map((cat: TCategory) => (
                      <SelectItem key={cat?.id} value={cat?.name}>
                        {cat?.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {(searchQuery || selectedCategory !== "all") && (
                <Button variant="ghost" size="icon" onClick={clearFilters}>
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {(searchQuery || selectedCategory !== "all") && (
            <div className="flex flex-wrap gap-2 mb-6">
              {searchQuery && (
                <span className={`${s.badge} flex items-center gap-1`}>
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className={`${s.badge} flex items-center gap-1`}>
                  {selectedCategory}
                  <button onClick={() => handleCategoryChange("all")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {isBookLoading || isCategoriesLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <BookCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              {filteredBooks?.length > 0 ? (
                <>
                  <p className="text-sm text-muted-foreground mb-6">
                    Showing {filteredBooks?.length} book
                    {filteredBooks?.length !== 1 ? "s" : ""}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredBooks?.map((book: any) => (
                      <BookCard
                        key={book?.id}
                        book={book}
                        handleAddToCart={addToCart}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground">
                    No books found matching your criteria.
                  </p>
                  <Button
                    variant="link"
                    onClick={clearFilters}
                    className="mt-2"
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer theme={theme.resolvedTheme === "dark" ? "dark" : "light"} />
      <Toaster
        position="top-right"
        theme={theme.resolvedTheme === "dark" ? "dark" : "light"}
        toastOptions={{
          style: {
            background:
              (theme.resolvedTheme as
                | "system"
                | "light"
                | "dark"
                | undefined) === "dark"
                ? "linear-gradient(to right, #C6A96B, #837047, #55492b)"
                : "linear-gradient(to right, #2563eb, #4f46e5, #8b5cf6)",
            color: "#fff",
            borderRadius: "0.75rem",
            boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
            marginTop: "80px",
            padding: "12px 20px",
          },
        }}
      />
    </div>
  );
};

export default Catalog;
