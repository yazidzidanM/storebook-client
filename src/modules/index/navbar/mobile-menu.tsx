"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function MobileMenu({ open, onClose, isAuthenticated, user, totalItems }: { open: boolean; onClose: () => void; isAuthenticated: boolean; user: { name: string; role: string } | null; totalItems: number }) {
  if (!open) return null

  return (
    <div className="md:hidden mt-4 border-t pt-4">
      <Link href="/" onClick={onClose}>Home</Link>
      <Link href="/catalog" onClick={onClose}>Catalog</Link>
      <Link href="/cart" onClick={onClose}>
        Cart {totalItems > 0 && `(${totalItems})`}
      </Link>

      {isAuthenticated ? (
        <button onClick={onClose} className="text-destructive">
          Logout
        </button>
      ) : (
        <div className="flex gap-2">
          <Button onClick={onClose}>Login</Button>
          <Button onClick={onClose}>Register</Button>
        </div>
      )}
    </div>
  )
}
