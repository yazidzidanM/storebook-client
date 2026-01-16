"use client";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/modules/index/navbar/navbar";
import { Footer } from "@/modules/index/footer";
import { useTheme } from "next-themes";
import Link from "next/link";
import * as s from "../../modules/index/home/styles";

const Cart = () => {
  const theme = useTheme();
  // const { items, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();
  // const { isAuthenticated } = useAuthStore();

  function getTotalPrice() {
    return 500000;
  }

  interface Book {
    id: string;
    cover: string;
    title: string;
    author: string;
    price: number;
  }

  interface cart {
    book: Book;
    quantity: number;
  }

  const items: cart[] = [
    {
      book: {
        id: "1",
        cover:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
        title: "qwer",
        author: "qwer",
        price: 500000,
      },
      quantity: 1,
    },
    {
      book: {
        id: "1",
        cover:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
        title: "qwer",
        author: "qwer",
        price: 500000,
      },
      quantity: 2,
    },
    {
      book: {
        id: "1",
        cover:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
        title: "qwer",
        author: "qwer",
        price: 500000,
      },
      quantity: 2,
    },
    {
      book: {
        id: "1",
        cover:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
        title: "qwer",
        author: "qwer",
        price: 500000,
      },
      quantity: 4,
    },
  ];

  const isAuthenticated = true;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleRemove = (bookId: string, title: string) => {
    // removeFromCart(bookId);
    // toast({
    //   title: "Removed from cart",
    //   description: `${title} has been removed from your cart.`,
    // });
  };

  const handleQuantityChange = (bookId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    // updateQuantity(bookId, newQuantity);
  };

  const btnStyle = "w-full cursor-pointer  bg-linear-to-r from-blue-600  via-indigo-600 to-violet-600 text-white  dark:bg-linear-to-r dark:from-[#C6A96B] dark:via-[#837047] dark:to-[#55492b] dark:border-white/10 py-3 font-semibold hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col dark:bg-[linear-gradient(360deg,#2E2E2E_0%,#1A1A1A_45%,#0F0F0F_100%)]">
        <Navbar />
        <main className="relative flex-1 flex items-center justify-center py-16">
          <div className={s.heroGlow} />
          <div className="text-center space-y-4">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground" />
            <h1 className="text-2xl font-serif font-bold">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground">
              Start adding some books to your cart!
            </p>
            <Button asChild className="mt-4">
              <Link href="/catalog">Browse Catalog</Link>
            </Button>
          </div>
        </main>
        <Footer theme={theme.resolvedTheme} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />

      <main className="relative flex-1 py-8 dark:bg-linear-to-t dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]">
        <div className={s.heroGlow} />
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold mb-8">
            Shopping <span className="dark:text-[#C6A96B]"> Cart</span>
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(({ book, quantity }, index) => (
                <div
                  key={book.id}
                  className="flex gap-4 p-4 bg-card rounded-xl shadow-card"
                >
                  <Link href={`/book/${book.id}`} className="flex-shrink-0">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-20 h-28 object-cover rounded-lg"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link href={`/book/${book.id}`}>
                      <h3 className="font-medium hover:text-primary transition-colors line-clamp-1">
                        {book.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {book.author}
                    </p>
                    <p className="font-semibold text-indigo-600 dark:text-[#C6A96B] mt-2">
                      {formatPrice(book.price)}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            handleQuantityChange(book.id, quantity - 1)
                          }
                          disabled={quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            handleQuantityChange(book.id, quantity + 1)
                          }
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleRemove(book.id, book.title)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Subtotal</p>
                    <p className="font-semibold">
                      {formatPrice(book.price * quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl shadow-card p-6 sticky top-24">
                <h2 className="font-serif font-semibold text-lg mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-success">Free</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-indigo-600 dark:text-[#C6A96B]">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                </div>

                {isAuthenticated ? (
                  <Button className={btnStyle} asChild>
                    <Link href="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <Button
                      className={btnStyle}
                      asChild
                    >
                      <Link href="/login?redirect=/checkout">
                        Login to Checkout
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Please login to proceed with checkout
                    </p>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    🚚 Free delivery on orders over Rp 500,000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer theme={theme.resolvedTheme} />
    </div>
  );
};

export default Cart;
