"use client";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/modules/index/navbar/navbar";
import { ArrowRight, BookOpen, Shield, Sparkles, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { books, categories } from "./(data mentah)/data";
import { BookCard } from "@/components/books/bookCard";
import { Footer } from "@/modules/index/footer";
import * as s from "@/modules/index/home/styles";
import { SectionHeader } from "@/modules/index/home/section-header";
import { useTheme } from "next-themes";
import useAuthStore from "@/store/authStore";

export default function Home() {
  const { user, isAuthenticated } = useAuthStore();
  const featuredBooks = books.slice(0, 4);
  const newArrivals = books.slice(4, 8);
  const theme = useTheme();

  return (
    <div className={s.page}>
      <Navbar />

      <section className={s.section}>
        <div className={s.heroGlow} />
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
                    className="rounded-2xl shadow-elevated w-full object-cover h-52"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop"
                    alt="Book 2"
                    className="rounded-2xl shadow-elevated w-full object-cover h-64"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img
                    src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop"
                    alt="Book 3"
                    className="rounded-2xl shadow-elevated w-full object-cover h-64"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop"
                    alt="Book 4"
                    className="rounded-2xl shadow-elevated w-full object-cover h-52"
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

      <section className="py-12 border-b border-border/50 dark:bg-linear-to-t dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]">
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
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
            {categories.map((category) => (
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {newArrivals.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative py-16 
      dark:bg-linear-to-t dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]
          bg-linear-to-t from-gray-900 via-gray-900 to-gray-900
        text-white dark:text-[#C6A96B]"
      >
        {theme.resolvedTheme === "dark" && (
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

      <Footer theme={theme.resolvedTheme} />
    </div>
  );
}
