"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  CreditCard,
  Truck,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import { Navbar } from "@/modules/index/navbar/navbar";
import { Footer } from "@/modules/index/footer";
import { useTheme } from "next-themes";
import { TBook } from "@/validation/book";
import { apiPrivate } from "@/instance/axios";
import { useQuery } from "@tanstack/react-query";
import { CartItemSkeleton } from "@/components/books/bookItemSkeleton";
import { OrderSummarySkeleton } from "@/components/books/bookOrderSkeleton";
import { useForm } from "react-hook-form";
import { TCheckout } from "@/validation/checkout";
import { TCart } from "@/validation/cart";
import * as s from "../../modules/index/home/styles";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const { items, clearCart } = useCartStore();
  const { user, isAuthenticated, token ,hasHydrated } = useAuthStore();
  const router = useRouter();
  const theme = useTheme();
  const { handleSubmit, register } = useForm<TCheckout>({
    defaultValues: {
      name: user?.name,
      phone: user?.phone || "",
      address: user?.address || "",
      note: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const api = apiPrivate(token || "");

  const { data: books, isLoading: isBookLoading } =
    useQuery({
      queryKey: ["books"],
      queryFn: async () => {
        const res = await api.get("/api/books");
        return res.data;
      },
      enabled: !!token,
    }) ?? [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const onSubmit = async () => {
    // if (!formData.name || !formData.phone || !formData.address) {
    //   return;
    // }

    setIsSubmitting(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setOrderComplete(true);
    clearCart();
  };

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

  if (!isAuthenticated) {
    // navigate('/login?redirect=/checkout');
    return null;
  }

  if (items.length === 0 && !orderComplete) {
    // navigate('/cart');
    return null;
  }

  const btnStyle =
    "w-full cursor-pointer mt-3 bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 text-white dark:bg-linear-to-r dark:from-[#C6A96B] dark:via-[#837047] dark:to-[#55492b] dark:border-white/10 py-3 font-semibold hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed";

  if (orderComplete) {
    return (
      <div
        className="min-h-screen flex flex-col 
        bg-linear-to-br from-indigo-600/10 via-[#e9e9e9] to-[#e0e0e0] 
        dark:bg-linear-to-t dark:from-[#2e2e2eb6] dark:to-[#c6a96b44] dark:via-[#0f0f0faf]"
      >
        <Navbar />
        <main
          className="relative flex-1 flex items-center justify-center py-16 animate-in fade-in 
                bg-linear-to-br from-indigo-600/10 via-[#f5f5f5] to-[#f7f7f7]
            dark:bg-linear-to-t dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]"
        >
          <div className={s.heroGlow} />
          <div className="text-center space-y-6 max-w-md mx-auto px-4">
            <div className="w-20 h-20 mx-auto bg-green-600/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-serif font-bold">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your order. We'll contact you shortly to confirm
              delivery details and payment.
            </p>
            <div className="bg-card rounded-xl p-4 shadow-card text-left">
              <h3 className="font-medium mb-2">Payment Method</h3>
              <p className="text-sm text-muted-foreground">
                <strong>Cash on Delivery (COD)</strong>
                <br />
                Pay when your order arrives at your doorstep.
              </p>
            </div>
            <Button onClick={() => router.replace("/")} className={btnStyle}>
              Continue Shopping
            </Button>
          </div>
        </main>
        <Footer theme={theme.resolvedTheme} />
      </div>
    );
  }

  useEffect(() => {
      if (!hasHydrated) return;
  
      if (!isAuthenticated || !user|| !token) {
        router.replace("/login");
      }
    }, [hasHydrated, isAuthenticated, user, token, router]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main
        className="relative flex-1 py-8 animate-in fade-in 
                bg-linear-to-br from-indigo-600/10 via-[#f5f5f5] to-[#f7f7f7]
            dark:bg-linear-to-t dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]"
      >
        <div className={s.heroGlow} />
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold mb-8">
            <span className="text-indigo-600 dark:text-[#C6A96B]">
              Checkout
            </span>
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-card rounded-xl shadow-black p-6">
                  <h2 className="font-serif font-semibold text-lg mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-indigo-600 dark:text-[#C6A96B]" />
                    Delivery Information
                  </h2>

                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        {...register("name")}
                        id="name"
                        placeholder="Enter your full name"
                        required
                        className="p-2"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        {...register("phone")}
                        id="phone"
                        placeholder="+62 xxx xxxx xxxx"
                        required
                        className="p-2"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Textarea
                        {...register("address")}
                        id="address"
                        placeholder="Enter your complete address"
                        rows={3}
                        required
                        className="p-2"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <Textarea
                        {...register("note")}
                        id="notes"
                        placeholder="Any special instructions for delivery"
                        className="p-2"
                        rows={8}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl shadow-card p-6">
                  <h2 className="font-serif font-semibold text-lg mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-indigo-600 dark:text-[#C6A96B]" />
                    Payment Method
                  </h2>

                  <div className="border-2 border-indigo-600/5 dark:border-[#C6A96B]/5 rounded-lg p-4 bg-indigo-600/5 dark:bg-[#C6A96B]/5">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-indigo-600/10 dark:bg-[#C6A96B]/10 rounded-lg">
                        <Truck className="w-5 h-5 text-indigo-600 dark:text-[#C6A96B]" />
                      </div>
                      <div>
                        <h3 className="font-medium">Cash on Delivery (COD)</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Pay when your order arrives. Our courier will collect
                          payment upon delivery.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                {isBookLoading ? (
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <CartItemSkeleton key={i} />
                      ))}
                    </div>

                    <OrderSummarySkeleton />
                  </div>
                ) : (
                  <div className="bg-card rounded-xl shadow-card p-6 sticky top-24">
                    <h2 className="font-serif font-semibold text-lg mb-4">
                      Order Summary
                    </h2>

                    <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                      {carts?.map((book: TCart) => (
                        <div key={book.id} className="flex gap-3">
                          <img
                            src={book.image}
                            alt={book.title}
                            className="w-12 h-16 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium line-clamp-1">
                              {book.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {book?.quantity}
                            </p>
                            <p className="text-sm font-medium text-primary">
                              {formatPrice(book.price * book?.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-4 space-y-2">
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

                    <Button
                      type="submit"
                      className={btnStyle}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex justify-center items-center gap-2">
                          <Loader2 className="animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        "Place Order"
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-3">
                      By placing your order, you agree to our terms and
                      conditions
                    </p>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer theme={theme.resolvedTheme} />
    </div>
  );
};

export default Checkout;
