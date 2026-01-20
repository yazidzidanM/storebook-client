"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Book, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginSchema, TLogin } from "@/validation/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ModeToggle } from "@/components/common/toggleDarkMode";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { toast, Toaster } from "sonner";
import * as s from "../../../modules/index/home/styles";
import loginAction from "@/logic/login/loginAction";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import { auth } from "@/types/res/response";
import { useCartStore } from "@/store/cartStore";
import syncCartItems, { cartItems } from "@/logic/cart/cartSync";
import getCartItems from "@/logic/cart/cartGet";

export default function LoginPage() {
  const { setUser, setAuthentication, setToken, setCartId } = useAuthStore();
  const { items, clearCart, addItem } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const isDarkMode = theme.resolvedTheme === "dark";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLogin>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: TLogin) => {
    setIsLoading(true);

    const returned = await loginAction(data);

    if (!returned.success) {
      toast.error("credential not match!");
      setIsLoading(false);
      return;
    }

    const authenticatedUser = returned.data as auth;

    let cartItems: cartItems[] = [];
    
    if (items.length > 0) {
      console.log("sync")
      const syncedCart = await syncCartItems(items, authenticatedUser.access_token);
      cartItems = syncedCart.data as cartItems[];
    } else {
      console.log("get")
      const getCart = await getCartItems(authenticatedUser.access_token);
      console.log(getCart)
      cartItems = getCart.data as cartItems[];
    }
    console.log(items.length)

    setAuthentication(true);
    setUser(authenticatedUser.user);
    setToken(authenticatedUser.access_token);
    setCartId(authenticatedUser.cartId);

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
        <div
          className={cn(
            "relative overflow-hidden flex-1 flex items-center justify-center p-8",
            isDarkMode
              ? "dark:bg-linear-to-tr from-[#0F0F0F] via-[#1A1A1A] to-[#2E2E2E]"
              : "",
          )}
        >
          <div className={s.heroGlow} />
          <div className="absolute top-4 left-4">
            <ModeToggle />
          </div>
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-3 mb-8 group"
              >
                <div
                  className="p-2.5 rounded-xl transition-all duration-500
                  bg-indigo-600
                  border
                  shadow-[4px_4px_10px_rgba(0,0,0,0.05),-2px_-2px_10px_rgba(255,255,255,0.8)]
                  
                  dark:bg-[#C6A96B]
                  dark:ring-1 dark:ring-white/10 dark:shadow-[0_0_15px_rgba(0,0,0,0.5)]
                  
                  group-hover:scale-105 group-hover:border-primary/30"
                >
                  <Book
                    className="w-5 h-5 
                    text-[#E2E8F0] dark:text-[#E2E8F0] 
                    filter drop-shadow(0 1px 1px rgba(0,0,0,0.1)) dark:drop-shadow(0 1px 1px rgba(0,0,0,0.5))"
                  />
                </div>

                <span className="font-serif text-xl font-semibold tracking-tight text-slate-900 dark:text-[#F8FAFC]">
                  Book
                  <span className="italic font-light text-primary dark:text-[#C6A96B] ml-0.5">
                    Store
                  </span>
                </span>
              </Link>
              <h1 className="text-3xl font-serif font-bold">Welcome Back</h1>
              <p className="text-muted-foreground mt-2">
                Sign in to your account to continue
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2 ">
                <Label htmlFor="username">Username</Label>
                <div className="relative ">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    {...register("username")}
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="pl-10 "
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    {...register("password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
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
              </div>

              <Button
                type="submit"
                className="w-full cursor-pointer 
              bg-linear-to-r from-blue-600  via-indigo-600 to-violet-600 text-white 
              dark:bg-linear-to-r dark:from-[#C6A96B] dark:via-[#695a39] dark:to-[#413821] dark:border-white/10
              py-3
              font-semibold hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Don&apos;t have an account?
              </span>{" "}
              <Link
                href="/register"
                className="font-medium hover:underline text-indigo-500 dark:text-[#C6A96B]"
              >
                Create account
              </Link>
            </div>
            <div className="mt-8 p-4 bg-secondary/50 rounded-lg">
              <p className="text-xs font-medium mb-2">Demo Credentials:</p>
              <p className="text-xs text-muted-foreground">
                Admin: admin123 / admin123
              </p>
              <p className="text-xs text-muted-foreground">
                User: user1234 / user1234
              </p>
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:flex-1 relative overflow-hidden dark:bg-[#050505] bg-linear-to-br from-primary/10 via-accent to-primary/5">
          <div className="absolute inset-0 z-10 dark:bg-linear-to-t dark:from-black dark:via-black/20 dark:to-transparent" />
          <img
            src="main-bg.jpg"
            alt="Library"
            className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center p-12">
            <div className="text-center space-y-6">
              <h2 className="text-5xl font-serif font-bold dark:text-white leading-tight">
                Discover a World <br /> of{" "}
                <span className="text-[#050505] dark:text-white italic">
                  Stories
                </span>
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
              <p className="text-lg dark:text-slate-300 max-w-md font-light italic text-[#050505] dark:text-lg">
                "A room without books is like a body without a soul."
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" theme={theme.resolvedTheme} />
    </>
  );
}
