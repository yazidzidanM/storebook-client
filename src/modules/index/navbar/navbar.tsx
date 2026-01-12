// components/navbar/navbar.tsx
import Link from "next/link";
import { Book } from "lucide-react";
import { NavLinks } from "./nav-links";
import { NavbarActions } from "./navbar-action";
import * as s from "../home/styles"

export function Navbar() {
  return (
    <nav className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30 rounded-lg shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group select-none">
            <div
              className={s.brandLogo}
            >
              <Book className="w-5 h-5" />
            </div>

            <span
              className={s.brandName}
            >
              BookStore
            </span>
          </Link>

          <NavLinks />

          <NavbarActions />
        </div>
      </div>
    </nav>
  );
}
