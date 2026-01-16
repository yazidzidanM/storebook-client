"use client";

import {
  ArrowLeft,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { books } from "@/app/(data mentah)/data";
import { Footer } from "@/modules/index/footer";
import { Navbar } from "@/modules/index/navbar/navbar";
import { useTheme } from "next-themes";
import Link from "next/link";
import { BookCard } from "@/components/books/bookCard";
import * as s from "../../../modules/index/home/styles";

const BookDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
  console.log(id);
  // const addToCart = useCartStore((state) => state.addToCart);

  const book = books.find((b) => b.id === id);
  const relatedBooks = books
    .filter((b) => b.category === book?.category && b.id !== id)
    .slice(0, 4);

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif font-bold mb-4">
              Book Not Found
            </h1>
            <Button asChild>
              <Link href="/catalog">Back to Catalog</Link>
            </Button>
          </div>
        </main>
        <Footer theme={theme.resolvedTheme} />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    // addToCart(book);
    // toast({
    //   title: "Added to cart",
    //   description: `${book.title} has been added to your cart.`,
    // });
  };

  const btnStyle =
    "cursor-pointer flex-1\
      bg-linear-to-r from-blue-600  via-indigo-600 to-violet-600 text-white \
      dark:bg-linear-to-r dark:from-[#C6A96B] dark:via-[#695a39] dark:to-[#413821] dark:border-white/10\
      py-3 font-semibold hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen flex flex-col dark:bg-[linear-gradient(180deg,#2E2E2E_0%,#1A1A1A_45%,#0F0F0F_100%)]">
      <Navbar />

      <main className="relative flex-1 py-8 dark:bg-linear-to-b dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F">
        <div className={s.heroGlow} />
        <div className="container mx-auto px-4">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <span className={s.badge}>{book.category}</span>
                <h1 className="text-3xl md:text-4xl font-serif font-bold mt-4">
                  {book.title}
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  by {book.author}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= 4
                          ? "fill-amber-500 text-amber-500"
                          : "text-muted dark:text-white/80"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  (4.0 / 5.0)
                </span>
              </div>

              <div className="py-4 border-y border-border">
                <p className="text-3xl font-bold text-indigo-600 dark:text-[#C6A96B]">
                  {formatPrice(book.price)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {book.stock > 0 ? (
                    <span className="text-green-600">
                      In Stock ({book.stock} available)
                    </span>
                  ) : (
                    <span className="text-destructive">Out of Stock</span>
                  )}
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {book.description}
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className={btnStyle}
                  onClick={handleAddToCart}
                  disabled={book.stock === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-3 rounded-lg bg-indigo-600/10 dark:bg-[#C8A96B]/10">
                  <Truck className="w-5 h-5 mx-auto text-indigo-600 dark:text-[#C8A96B] mb-1" />
                  <p className="text-xs text-muted-foreground dark:text-slate-200">
                    Free Delivery
                  </p>
                </div>
                <div className="text-center p-3 rounded-lg bg-indigo-600/10 dark:bg-[#C8A96B]/10">
                  <Shield className="w-5 h-5 mx-auto text-indigo-600 dark:text-[#C8A96B] mb-1" />
                  <p className="text-xs text-muted-foreground dark:text-slate-200">
                    Secure Payment
                  </p>
                </div>
                <div className="text-center p-3 rounded-lg bg-indigo-600/10 dark:bg-[#C8A96B]/10">
                  <BookOpen className="w-5 h-5 mx-auto text-indigo-600 dark:text-[#C8A96B] mb-1" />
                  <p className="text-xs text-muted-foreground dark:text-slate-200">
                    Quality Guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>

          {relatedBooks.length > 0 && (
            <section>
              <h2 className="text-2xl font-serif font-bold mb-6">
                Related Books
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedBooks.map((relBook) => (
                  <BookCard key={relBook.id} book={relBook} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer theme={theme.resolvedTheme} />
    </div>
  );
};

export default BookDetail;
