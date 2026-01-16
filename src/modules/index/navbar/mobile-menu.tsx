"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { LogOut, ShoppingCart, User, BookOpen, Info, Phone } from "lucide-react"
import { ModeToggle } from "@/components/common/toggleDarkMode"

type Props = {
  open: boolean
  onClose: () => void
  isAuthenticated: boolean
  user: { name: string; role: string } | null
  totalItems: number
}

export function MobileMenuSheet({
  open,
  onClose,
  isAuthenticated,
  user,
  totalItems,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="w-72 sm:w-80">
        <SheetHeader className="mb-6">
                  <ModeToggle />

          <SheetTitle className="font-serif text-xl">
            Menu
          </SheetTitle>
        </SheetHeader>

        {/* NAV LINKS */}
        <nav className="flex flex-col gap-4">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 text-sm font-medium hover:text-indigo-600 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Home
          </Link>

          <Link
            href="/catalog"
            onClick={onClose}
            className="flex items-center gap-3 text-sm font-medium hover:text-indigo-600 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Catalog
          </Link>
          <Link
            href="/about"
            onClick={onClose}
            className="flex items-center gap-3 text-sm font-medium hover:text-indigo-600 transition-colors"
          >
            <Info className="w-4 h-4" />
            About
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center gap-3 text-sm font-medium hover:text-indigo-600 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Contact
          </Link>
          <Link
            href="/cart"
            onClick={onClose}
            className="flex items-center gap-3 text-sm font-medium hover:text-indigo-600 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Cart
            {totalItems > 0 && (
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-indigo-600 text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        <div className="my-6 border-t" />

        {/* AUTH SECTION */}
        {isAuthenticated ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-xl bg-muted p-3">
              <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                {user?.name?.[0] ?? "U"}
              </div>
              <div className="text-sm">
                <p className="font-medium">{user?.name}</p>
                <p className="text-muted-foreground capitalize">
                  {user?.role}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-destructive"
              onClick={onClose}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              onClick={onClose}
            >
              Login
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={onClose}
            >
              Register
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
