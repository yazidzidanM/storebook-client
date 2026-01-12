import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Book } from "@/app/(data mentah)/data";
import Link from "next/link";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast(`Added "${book.title}" to cart!`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link
      href={`/book/${book.id}`}
      className="
      group block overflow-hidden rounded-2xl
      bg-white
      border border-border
      shadow-sm
      hover:shadow-lg
      hover:-translate-y-1
      transition-all duration-300

      dark:bg-white/5
      dark:border-white/10
      dark:backdrop-blur-sm
      dark:shadow-[0_20px_40px_rgba(0,0,0,0.45)]
      dark:hover:shadow-[0_30px_60px_rgba(198,169,107,0.25)]
    "
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={book.cover}
          alt={book.title}
          className="
          w-full h-full object-cover
          transition-transform duration-500
          group-hover:scale-105
        "
        />

        <div
          className="
          absolute inset-0
          bg-gradient-to-t
          from-black/40 via-transparent to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300

          dark:from-black/70
          dark:opacity-60
          dark:group-hover:opacity-90
        "
        />

        <div
          className="
          absolute inset-0 pointer-events-none
          bg-[radial-gradient(circle_at_bottom,#C6A96B22,transparent_60%)]
          opacity-0
          dark:group-hover:opacity-100
          transition-opacity duration-300
        "
        />

        <div className="absolute top-3 left-3 z-10">
          <span
            className="
            px-3 py-1 rounded-full text-xs font-medium
            bg-white/90 text-foreground
            border border-border

            dark:bg-black/60
            dark:text-[#C6A96B]
            dark:border-[#C6A96B]/30
          "
          >
            {book.category}
          </span>
        </div>

        <div
          className="
          absolute bottom-4 left-4 right-4 z-10
          flex gap-2
          translate-y-6 opacity-0
          group-hover:translate-y-0 group-hover:opacity-100
          transition-all duration-300
        "
        >
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="
            flex-1
            bg-indigo-600 text-white
            hover:bg-indigo-600/90

            dark:bg-[#C6A96B]
            dark:text-black
            dark:hover:bg-[#B89A5F]
          "
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="
            bg-white/90 hover:bg-white
            border-border

            dark:bg-black/40
            dark:border-white/20
            dark:hover:bg-black/60
          "
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-1">
        <h3
          className="
          font-serif font-semibold text-black line-clamp-2
          group-hover:text-indigo-600 transition-colors

          dark:text-[#EAEAEA]
          dark:group-hover:text-[#C6A96B]
        "
        >
          {book.title}
        </h3>

        <p className="text-sm text-muted-foreground">{book.author}</p>

        <p
          className="
          pt-1 font-semibold text-indigo-600
          dark:text-[#C6A96B]
        "
        >
          {formatPrice(book.price)}
        </p>
      </div>
    </Link>
  );
}
