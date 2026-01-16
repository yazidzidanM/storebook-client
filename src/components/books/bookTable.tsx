import { TBook } from "@/validation/book";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Mode } from "@/app/admin/books/page";

const BookTable = ({
  filteredBooks,
  handleMode,
  handleOpen,
  handleDelete,
  handleSelectedBook,
}: {
  filteredBooks: TBook[];
  handleMode: (mode: Mode) => void;
  handleOpen: (truthy: boolean) => void;
  handleDelete: (id: number) => void;
  handleSelectedBook: (selected: TBook) => void;
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr className="text-left">
            <th className="px-6 py-3 font-medium text-muted-foreground">
              Cover
            </th>
            <th className="px-6 py-3 font-medium text-muted-foreground">
              Title
            </th>
            <th className="px-6 py-3 font-medium text-muted-foreground">
              Author
            </th>
            <th className="px-6 py-3 font-medium text-muted-foreground">
              Category
            </th>
            <th className="px-6 py-3 font-medium text-muted-foreground">
              Price
            </th>
            <th className="px-6 py-3 font-medium text-muted-foreground">
              Stock
            </th>
            <th className="px-6 py-3 font-medium text-muted-foreground text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {filteredBooks &&
            filteredBooks?.map((book: TBook) => (
              <tr
                key={book.id}
                className="
              hover:bg-muted/40
              transition-colors
            "
              >
                <td className="px-6 py-4">
                  <Image
                    src={book?.image}
                    alt={book.title}
                    width={40}
                    height={56}
                    className="w-10 h-14 object-cover rounded-md shadow-sm"
                  />
                </td>

                <td className="px-6 py-4 font-medium">{book.title}</td>

                <td className="px-6 py-4 text-muted-foreground">
                  {book.author}
                </td>

                <td className="px-6 py-4">
                  <span className="badge-category">{book.category}</span>
                </td>

                <td className="px-6 py-4 font-medium">
                  {formatPrice(book.price)}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                              ${
                                book.stock > 0
                                  ? "bg-indigo-600/10 text-indigo-600 dark:bg-[#C6A96B]/10 dark:text-[#C6A96B]"
                                  : "bg-red-600/10 text-red-600"
                              }`}
                  >
                    {book.stock}
                  </span>
                </td>

                <td className="px-3.5 py-4">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-indigo-600/10 dark:hover:bg-[#C6A96B]/10 cursor-pointer"
                      onClick={() => {
                        handleMode("edit");
                        handleSelectedBook(book);
                        handleOpen(true);
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10 cursor-pointer"
                      onClick={() => handleDelete(book.id!)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
