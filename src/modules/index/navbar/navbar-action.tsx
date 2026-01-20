"use client";

import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/common/toggleDarkMode";
import { UserMenu } from "./user-menu";
import { MobileMenuSheet } from "./mobile-menu";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import useAuthStore from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";

export function NavbarActions() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { totalitems } = useCartStore();
  const totalitem = totalitems();

  const logOut = () => {
    logout();
    useAuthStore.persist.clearStorage();
    useCartStore.setState({ items: [] });
    useCartStore.persist.clearStorage();
  };

  return (
    <>
      {/* ===== DESKTOP ===== */}
      <div className="hidden md:flex items-center gap-3">
        <Link
          href="/cart"
          className="relative p-2 rounded-lg hover:bg-secondary"
        >
          <ShoppingCart className="w-5 h-5" />
          {totalitem > 0 && (
            <span className="absolute -top-1 -right-1 text-xs bg-indigo-600 dark:bg-[#C6A96B] text-white dark:text-[#111111] rounded-full w-5 h-5 flex items-center justify-center">
              {totalitem}
            </span>
          )}
        </Link>

        <UserMenu
          user={user}
          isAuthenticated={isAuthenticated}
          logout={logOut}
        />
        <ModeToggle />
      </div>

      {/* ===== MOBILE ===== */}
      <Sheet>
        <SheetTrigger asChild>
          <button className="md:hidden p-2 rounded-lg hover:bg-secondary">
            <Menu />
          </button>
        </SheetTrigger>

        <MobileMenuSheet
          isAuthenticated={isAuthenticated}
          user={user}
          totalItems={totalitem}
          onLogout={logOut}
        />
      </Sheet>
    </>
  );
}
