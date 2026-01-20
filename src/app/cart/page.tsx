"use client";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/modules/index/navbar/navbar";
import { Footer } from "@/modules/index/footer";
import { useTheme } from "next-themes";
import Link from "next/link";
import * as s from "../../modules/index/home/styles";
import useAuthStore from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { apiPrivate, apiPublic } from "@/instance/axios";
import { TBook } from "@/validation/book";
import { useCartStore } from "@/store/cartStore";
import { OrderSummarySkeleton } from "@/components/books/bookOrderSkeleton";
import { CartItemSkeleton } from "@/components/books/bookItemSkeleton";
import { TCart } from "@/validation/cart";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import removeCartItem from "@/logic/cart/cartRemove";
import updateQtyCartItem from "@/logic/cart/cartUpdate";

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

const Cart = () => {
  const theme = useTheme();
  const { user, isAuthenticated, token, setUser } = useAuthStore();
  const { items, removeItem, addItem } = useCartStore();

  const { data: books, isLoading: isBookLoading } =
    useQuery({
      queryKey: ["books"],
      queryFn: async () => {
        const res = await apiPublic.get("/api/books");
        return res.data;
      },
    }) ?? [];

  const carts = items
    ?.map((item) => {
      const book = books?.data?.find(
        (b: TBook) => b.id === Number(item.bookId),
      );

      return {
        ...book,
        quantity: item.quantity,
      };
    })
    .filter(Boolean);

  function getTotalPrice(fee: boolean) {
    if (fee) {
      const totals = carts.reduce(
        (total: number, item: TCart) => total + item.price * item.quantity,
        0,
      );
      return totals + totals * 0.1;
    } else {
      return carts.reduce(
        (total: number, item: TCart) => total + item.price * item.quantity,
        0,
      );
    }
  }
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleRemove = async (bookId: string, title: string) => {
    await removeCartItem(bookId, token ?? "")
    removeItem(bookId);
    toast.success(`success remove ${title}`);
  };
  const handleQuantityChange = async (
    bookId: string,
    newQuantity: number,
    type: "add" | "decre",
    stock?: number
  ) => {
    if(stock === newQuantity - 1) return toast.error(`Maximum stock reached`);
    await updateQtyCartItem(Number(bookId), newQuantity, token ?? "")
    if (type === "add") {
      addItem({ bookId, quantity: 1 });
      return toast.success(`success add ${newQuantity} to cart`);
    } else {
      addItem({ bookId, quantity: -1 });
      return toast.success(`1 item removed, ${newQuantity} left`);
    }
  };

  const btnStyle =
    "w-full cursor-pointer  bg-linear-to-r from-blue-600  via-indigo-600 to-violet-600 text-white  dark:bg-linear-to-r dark:from-[#C6A96B] dark:via-[#837047] dark:to-[#55492b] dark:border-white/10 py-3 font-semibold hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed";

  if (books?.data?.length === 0) {
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
    <div className="min-h-screen flex flex-col dark:bg-[linear-gradient(180deg,#2E2E2E_0%,#1A1A1A_45%,#0F0F0F_100%)]">
      <Navbar />

      <main
        className="relative flex-1 py-8 
      bg-linear-to-br from-indigo-600/10 via-[#f3f3f3] to-[#e0e0e0]
      dark:bg-linear-to-t dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]"
      >
        {theme.resolvedTheme === "dark" && <div className={s.heroGlow} />}
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold mb-8">
            Shopping <span className="dark:text-[#C6A96B]"> Cart</span>
          </h1>

          {isBookLoading ? (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <CartItemSkeleton key={i} />
                ))}
              </div>

              <OrderSummarySkeleton />
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {carts &&
                  carts?.map((book: TCart, index: number) => (
                    <div
                      key={book.id}
                      className="flex gap-4 p-4 bg-card rounded-xl shadow-md shadow-gray-500/35"
                    >
                      <Link href={`/book/${index}`} className="shrink-0">
                        <img
                          src={book?.image}
                          alt={book?.title}
                          className="w-20 h-28 object-cover rounded-lg"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link href={`/book/${book?.id}`}>
                          <h3 className="font-medium hover:text-primary transition-colors line-clamp-1">
                            {book?.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {book?.author}
                        </p>
                        <p className="font-semibold text-indigo-600 dark:text-[#C6A96B] mt-2">
                          {formatPrice(book?.price)}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleQuantityChange(
                                  String(book?.id),
                                  book.quantity - 1,
                                  "decre",
                                )
                              }
                              disabled={book.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {book.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleQuantityChange(
                                  String(book?.id),
                                  book.quantity + 1,
                                  "add",
                                  book.stock
                                )
                              }
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() =>
                              handleRemove(String(book?.id), book?.title)
                            }
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          Subtotal
                        </p>
                        <p className="font-semibold">
                          {formatPrice(book?.price * book?.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-card rounded-xl shadow-card p-6 sticky top-24 shadow-md shadow-gray-500/36">
                  <h2 className="font-serif font-semibold text-lg mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(getTotalPrice(false))}</span>
                    </div>
                    {getTotalPrice(false) >= 500000 ? (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Shipping
                          </span>
                          <span className="text-green-600">Free</span>
                        </div>
                        <div className="border-t border-border pt-3 flex justify-between font-semibold">
                          <span>Total</span>
                          <span className="text-indigo-600 dark:text-[#C6A96B]">
                            {formatPrice(getTotalPrice(false))}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Shipping
                          </span>
                          <span className="text-red-600">Fee 10%</span>
                        </div>
                        <div className="border-t border-border pt-3 flex justify-between font-semibold">
                          <span>Total</span>
                          <span className="text-indigo-600 dark:text-[#C6A96B]">
                            {formatPrice(getTotalPrice(true))}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  {carts.length === 0 ? (
                    <Button className={btnStyle} asChild>
                      <Link href="/catalog">
                        Shopping Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  ) : (
                    <>
                      {isAuthenticated ? (
                        <Button className={btnStyle} asChild>
                          <Link href="/checkout">
                            Proceed to Checkout
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      ) : (
                        <div className="space-y-3">
                          <Button className={btnStyle} asChild>
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
                    </>
                  )}

                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground text-center">
                      🚚 Free delivery on orders over Rp 500,000
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer theme={theme.resolvedTheme} />
      <Toaster
        position="top-right"
        theme={theme.resolvedTheme}
        toastOptions={{
          style: {
            background:
              theme.resolvedTheme === "dark"
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

export default Cart;
