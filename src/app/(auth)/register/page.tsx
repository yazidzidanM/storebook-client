"use client";

import { Book, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { RegisterSchema, TRegister } from "@/validation/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModeToggle } from "@/components/common/toggleDarkMode";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { useTheme } from "next-themes";
import * as s from "../../../modules/index/home/styles";
import useAuthStore from "@/store/authStore";
import registerAction from "@/logic/register/registerAction";
import { auth } from "@/types/res/response";
import { useCartStore } from "@/store/cartStore";
import syncCartItems, { cartItems } from "@/logic/cart/cartSync";
import getCartItems from "@/logic/cart/cartGet";

export default function RegisterPage() {
  const { setUser, setAuthentication, setToken, setCartId } = useAuthStore();
  const { items, addItem, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TRegister>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TRegister) => {
    setIsLoading(true);

    const returned = await registerAction(data);

    if (!returned.success) {
      toast.error("credential not match!");
      setIsLoading(false);
      return;
    }

    const payload = returned.data as auth;

    let cartItems: cartItems[] = [];

    if (items.length > 0) {
      const syncedCart = await syncCartItems(items, payload.access_token);
      cartItems = syncedCart.data as cartItems[];
    } else {
      const getCart = await getCartItems(payload.access_token);
      cartItems = getCart.data as cartItems[];
    }

    setAuthentication(true);
    setUser(payload.user);
    setToken(payload.access_token);
    setCartId(payload.cartId);

    clearCart();
    for (const item of cartItems) {
      addItem({
        bookId: String(item.bookId),
        quantity: item.quantity,
      });
    }

    toast.success("Logged in successfully!");
    reset();
    router.push("/");
  };

  return (
    <>
      <div className="min-h-screen flex">
        <div className="hidden lg:block lg:flex-1 bg-linear-to-br from-primary/10 via-accent to-primary/5 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-serif font-bold">
                Start Your Reading Journey
              </h2>
              <p className="text-lg text-muted-foreground max-w-md">
                Create an account and get access to exclusive offers and
                personalized recommendations.
              </p>
            </div>
          </div>
          <img
            src="main-right.jpg"
            alt="Books"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        </div>

        <div
          className="relative flex-1 flex items-center justify-center p-8 
        dark:bg-linear-to-tl from-[#0F0F0F] via-[#1A1A1A] to-[#2E2E2E]
        "
        >
          <div className={s.heroGlow} />
          <div className="absolute top-4 right-4">
            <ModeToggle />
          </div>
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-3 mb-8 group"
              >
                <div
                  className="p-2.5 rounded-xl transition-all duration-300 bg-indigo-600 border
                  dark:bg-[#C6A96B]
                  dark:ring-1 dark:ring-white/10 dark:shadow-[0_0_15px_rgba(0,0,0,0.5)]
                  group-hover:dark:ring-white/20 group-hover:scale-105 "
                >
                  <Book
                    className="w-5 h-5 
                  text-[#E2E8F0] 
                  filter drop-shadow(0 1px 1px rgba(0,0,0,0.5))"
                  />
                </div>

                <span className="font-serif text-xl font-semibold tracking-tight dark:text-[#F8FAFC]">
                  Book
                  <span className="italic font-light text-[#A3A3A3] dark:text-[#C6A96B]">
                    Store
                  </span>
                </span>
              </Link>
              <h1 className="text-3xl font-serif font-bold">Create Account</h1>
              <p className="text-muted-foreground mt-2">
                Join our community of book lovers
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    {...register("name")}
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10"
                    required
                  />
                </div>
                {errors?.name && (
                  <span className="text-sm text-destructive">
                    {errors.name?.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    {...register("username")}
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="pl-10"
                    required
                  />
                </div>
                {errors?.username && (
                  <span className="text-sm text-destructive">
                    {errors.username?.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    {...register("password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors?.password && (
                  <span className="text-sm text-destructive">
                    {errors?.password?.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    {...register("confirmPassword")}
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10"
                    required
                  />
                </div>
                {errors?.confirmPassword && (
                  <span className="text-sm text-destructive">
                    {errors?.confirmPassword?.message}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                className="w-full cursor-pointer bg-linear-to-r from-blue-600  via-indigo-600 to-violet-600 text-white
              dark:bg-linear-to-l dark:from-[#C6A96B] dark:via-[#695a39] dark:to-[#413821] dark:border-white/10 
              hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Already have an account?
              </span>{" "}
              <Link
                href="/login"
                className="text-indigo-600 font-medium hover:underline dark:text-[#C6A96B]"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Toaster
        position="top-left"
        theme={theme.resolvedTheme === "dark" ? "dark" : "light"}
      />
    </>
  );
}
