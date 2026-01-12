// components/navbar/nav-links.tsx
import Link from "next/link"

export function NavLinks() {
  return (
    <div className="hidden md:flex items-center gap-8">
      {["Home", "Catalog", "About", "Contact"].map((item) => (
        <Link
          key={item}
          href={`/${item === "Home" ? "" : item.toLowerCase()}`}
          className="text-sm font-medium text-black/90 dark:text-white/90 hover:text-indigo-500 dark:hover:text-[#C6A96B]"
        >
          {item}
        </Link>
      ))}
    </div>
  )
}
