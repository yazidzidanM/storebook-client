import {
  Book,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import Link from "next/link";
import * as s from "./home/styles";

export function Footer({ theme }: { theme: any }) {
  return (
    <footer className="relative bg-gray-900 dark:bg-linear-to-b dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F] text-white dark:text-[#C6A96B]">
      {theme === "dark" && <div className={s.heroGlow} />}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                <Book className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-semibold">
                BookStore
              </span>
            </Link>
            <p className="text-sm opacity-80 leading-relaxed">
              Discover your next favorite book. We curate the finest collection
              of books across all genres for passionate readers.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/catalog"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  Browse Catalog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/catalog?category=Fiction"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  Fiction
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=Non-Fiction"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  Non-Fiction
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=Technology"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=Science"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  Science
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm opacity-80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Jl. Sudirman No. 123, Jakarta Pusat, Indonesia</span>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-80">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+62 21 1234 5678</span>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-80">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>hello@bookstore.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-8 text-center">
          <p className="text-sm opacity-60">
            © {new Date().getFullYear()} BookStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
