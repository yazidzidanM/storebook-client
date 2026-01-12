"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserMenu } from "./user-menu"
import { MobileMenu } from "./mobile-menu"
import { ModeToggle } from "@/components/common/toggleDarkMode"

export function NavbarActions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // TODO: ganti dari server session / context
  const isAuthenticated = false
  const totalItems = 3
  const user = { name: "John", role: "admin" }

  return (
    <>
      <div className="hidden md:flex items-center gap-3">
        <Link href="/cart" className="relative p-2 rounded-lg hover:bg-secondary">
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 text-xs bg-indigo-600 dark:bg-[#C6A96B] text-white dark:text-[#111111] rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>

        <UserMenu user={user} isAuthenticated={isAuthenticated} />
        <ModeToggle />
      </div>

      <button
        className="md:hidden p-2 rounded-lg hover:bg-secondary"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X /> : <Menu />}
      </button>

      <MobileMenu
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        user={user}
        totalItems={totalItems}
      />
    </>
  )
}
