"use client";

import Link from "next/link";
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { BookOpen, Info, Phone, ShoppingCart, LogOut } from "lucide-react";
import { ModeToggle } from "@/components/common/toggleDarkMode";
import { useTheme } from "next-themes";
import * as s from "@/modules/index/home/styles";

type Props = {
  isAuthenticated: boolean;
  user: { name: string; role: string } | null;
  totalItems: number;
  onLogout: () => void;
};

export function MobileMenuSheet({
  isAuthenticated,
  user,
  totalItems,
  onLogout,
}: Props) {
  const theme = useTheme();

  return (
    <SheetContent
      side="left"
      className="
        flex flex-col
        w-72 sm:w-80
        bg-linear-to-br from-indigo-600/5 via-background to-background
        dark:bg-linear-to-b dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]
      "
    >
      <SheetHeader className="relative mb-6">
        <div className="flex items-center justify-between">
          <ModeToggle />
          <SheetTitle className="font-serif text-xl tracking-tight">
            Menu
          </SheetTitle>
          <div />
        </div>
      </SheetHeader>

      {(theme.resolvedTheme === "dark" ? "dark" : "light") === "dark" && (
        <div className={s.heroGlow} />
      )}

      <nav className="flex flex-col gap-1">
        <NavItem href="/" icon={BookOpen} label="Home" />
        <NavItem href="/catalog" icon={BookOpen} label="Catalog" />
        <NavItem href="/about" icon={Info} label="About" />
        <NavItem href="/contact" icon={Phone} label="Contact" />
        <NavItem
          href="/cart"
          icon={ShoppingCart}
          label="Cart"
          right={
            totalItems > 0 && (
              <span className="ml-auto rounded-full bg-indigo-600 dark:bg-[#C6A96B] px-2 py-0.5 text-xs font-medium text-white">
                {totalItems}
              </span>
            )
          }
        />
      </nav>

      <div className="my-6 border-t" />

      <div className="mt-auto">
        {isAuthenticated ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-2xl bg-muted/60 p-4">
              <div className="h-10 w-10 shrink-0 rounded-full bg-indigo-600 text-white dark:bg-[#C6A96B] flex items-center justify-center font-semibold">
                {user?.name?.[0] ?? "U"}
              </div>
              <div className="text-sm leading-tight">
                <p className="font-medium">{user?.name}</p>
                <p className="text-muted-foreground capitalize">{user?.role}</p>
              </div>
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-destructive"
                  onClick={onLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </SheetClose>
            </SheetFooter>
          </div>
        ) : (
          <SheetFooter className="flex-col gap-2">
            <SheetClose asChild>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                Login
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Register
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </div>
    </SheetContent>
  );
}

function NavItem({
  href,
  icon: Icon,
  label,
  right,
}: {
  href: string;
  icon: any;
  label: string;
  right?: React.ReactNode;
}) {
  return (
    <SheetClose asChild>
      <Link
        href={href}
        className="
          group flex items-center gap-3
          rounded-xl px-4 py-3
          text-sm font-medium
          transition-all
          hover:bg-indigo-600/10 hover:text-indigo-600 
          dark:hover:bg-[#C6A96B]/10 dark:hover:text-[#C6A96B] 
          active:scale-[0.98]
        "
      >
        <Icon className="h-4 w-4 opacity-80 group-hover:opacity-100" />
        <span>{label}</span>
        {right}
      </Link>
    </SheetClose>
  );
}
