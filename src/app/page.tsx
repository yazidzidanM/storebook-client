"use client";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/modules/index/navbar/navbar";
import { ArrowRight, BookOpen, Shield, Sparkles, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BookCard } from "@/components/books/bookCard";
import { Footer } from "@/modules/index/footer";
import * as s from "@/modules/index/home/styles";
import { SectionHeader } from "@/modules/index/home/section-header";
import { useTheme } from "next-themes";
import useAuthStore from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { TBook } from "@/validation/book";
import { apiPublic } from "@/instance/axios";
import { TCategory } from "@/validation/category";
import apiResponse from "@/types/res/response";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { BookCardSkeleton } from "@/components/books/bookCardSkeleton";
import cartItemAdd from "@/logic/cart/cartAdd";

export default function Home() {
  const { user, isAuthenticated, cartId, token } = useAuthStore();
  const { items, addItem } = useCartStore();
  const theme = useTheme();

  const addToCart = async (bookId: number, stock?: number) => {
    const item = items.find((item) => item.bookId === String(bookId));

    if (item?.quantity === stock) return toast.error(`Maximum stock reached`);
    if (user && isAuthenticated) {
      await cartItemAdd(bookId, token ?? "");
    }
    addItem({ bookId: String(bookId), quantity: 1 });
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

  const fullsetBook: TBook[] = books?.data?.map((book: TBook) => {
    const category = categories?.data?.find(
      (category: TCategory) => category.id === Number(book.categoryId),
    );
    return { ...book, category: category?.name };
  });

  const slicedCategories = categories?.data.slice(0, 6).map((category) => {
    const count = fullsetBook?.filter(
      (book) => Number(book.categoryId) === category.id,
    ).length;
    return { ...category, bookCount: count };
  });

  const featuredBooks = fullsetBook?.slice(0, 4);
  const newArrivals = fullsetBook?.slice(4, 8);

  return (
    <div className={s.page}>
      <Navbar />

      <section className={s.section}>
        {(theme.resolvedTheme === "dark" ? "dark" : "light") === "dark" && (
          <div className={s.heroGlow} />
        )}
        <div className="container mx-auto px-4 py-16 md:py-24 ">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <div className={s.badge}>
                <Sparkles className="w-4 h-4" />
                New Collection Available
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
                Discover Your Next{" "}
                <span className="text-indigo-600 dark:text-[#C6A96B] ">
                  Great Read
                </span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Explore our curated collection of books across all genres. From
                timeless classics to contemporary bestsellers, find your perfect
                companion.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className={s.heroPrimaryBtn} asChild>
                    <Link href="/catalog">
                      Browse Catalog
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className={s.heroSecondaryBtn}
                    asChild
                  >
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>
              </div>

              <div className="flex gap-8 pt-4">
                <div>
                  <p className={s.statNumber}>10K+</p>
                  <p className="text-sm text-muted-foreground">Books</p>
                </div>
                <div>
                  <p className={s.statNumber}>50K+</p>
                  <p className="text-sm text-muted-foreground">Readers</p>
                </div>
                <div>
                  <p className={s.statNumber}>100+</p>
                  <p className="text-sm text-muted-foreground">Authors</p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop"
                    alt="Book 1"
                    className="rounded-2xl shadow-xl shadow-gray-500/35 w-full object-cover h-52"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop"
                    alt="Book 2"
                    className="rounded-2xl shadow-xl shadow-gray-500/35 w-full object-cover h-64"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img
                    src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop"
                    alt="Book 3"
                    className="rounded-2xl shadow-xl shadow-gray-500/35 w-full object-cover h-64"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop"
                    alt="Book 4"
                    className="rounded-2xl shadow-xl shadow-gray-500/35 w-full object-cover h-52"
                  />
                </div>
              </div>

              <div className={s.sectionCard}>
                <div className="p-2 bg-indigo-600/10 dark:bg-[#C6A96B]/10 rounded-lg">
                  <Truck className="w-5 h-5 text-indigo-600 dark:text-[#C6A96B]" />
                </div>

                <div>
                  <p className="font-medium text-sm">Free Delivery</p>
                  <p className="text-xs text-muted-foreground">
                    On orders over Rp 500K
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-12 border-b border-border/50 
      dark:bg-linear-to-t dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 ">
              <div className="p-3 rounded-xl bg-indigo-600/10 dark:bg-[#C6A96B]/10">
                <BookOpen className="w-6 h-6 text-indigo-600 dark:text-[#C6A96B]" />
              </div>
              <div>
                <p className="font-medium">Wide Selection</p>
                <p className="text-sm text-muted-foreground">
                  Over 10,000 titles
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4">
              <div className="p-3 rounded-xl bg-green-600/10">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Fast Delivery</p>
                <p className="text-sm text-muted-foreground">
                  Across Indonesia
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4">
              <div className="p-3 rounded-xl bg-amber-500/10">
                <Shield className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="font-medium">Secure Payment</p>
                <p className="text-sm text-muted-foreground">
                  Cash on Delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 dark:bg-linear-to-b dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <SectionHeader
              title="Featured Books"
              desc="Handpicked recommendations for you"
            />
            <Button variant="ghost" asChild>
              <Link href="/catalog" className="gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          {isBookLoading || isCategoriesLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <BookCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredBooks &&
                featuredBooks?.map((book: TBook) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    handleAddToCart={addToCart}
                  />
                ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-secondary/30 dark:bg-linear-to-t dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold">
              Browse by Category
            </h2>
            <p className="text-muted-foreground mt-2">
              Find books that match your interests
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {slicedCategories?.map((category) => (
              <Link
                key={category.id}
                href={`/catalog?category=${category.name}`}
                className={s.categoryHeader}
              >
                <h3 className="font-serif font-semibold dark:group-hover:text-[#C6A96B] group-hover:text-indigo-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {category.bookCount} books
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 dark:bg-linear-to-b dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <SectionHeader
              title="New Arrivals"
              desc="Fresh additions to our collection"
            />
            <Button variant="ghost" asChild>
              <Link href="/catalog" className="gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {isBookLoading || isCategoriesLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <BookCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {newArrivals &&
                newArrivals?.map((book: TBook) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    handleAddToCart={addToCart}
                  />
                ))}
            </div>
          )}
        </div>
      </section>

      <section
        className="relative py-16 
      dark:bg-linear-to-t dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]
          bg-linear-to-t from-gray-900 via-gray-900 to-gray-900
        text-white dark:text-[#C6A96B]"
      >
        {(theme.resolvedTheme === "dark" ? "dark" : "light") === "dark" && (
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom,#C6A96B22,transparent_33%)]" />
        )}
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Ready to Start Reading?
          </h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto mb-8">
            Join thousands of readers who trust BookStore for their literary
            journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {user && isAuthenticated ? (
              <Button size="lg" variant="secondary" className="px-8" asChild>
                <Link href="/cart">Checkout More Book</Link>
              </Button>
            ) : (
              <Button size="lg" variant="secondary" className="px-8" asChild>
                <Link href="/register">Create Account</Link>
              </Button>
            )}
            <Button
              size="lg"
              variant="ghost"
              className="border-black/20 hover:white/10 text-white dark:text-[#C6A96B]"
              asChild
            >
              <Link href="/catalog">Browse Books</Link>
            </Button>
          </div>
        </div>
      </section>
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
}
