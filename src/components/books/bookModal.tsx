import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TBook } from "@/validation/book";
import { BookForm } from "./bookForm";

const BookModal = ({
  book,
  open,
  onChange,
  bookFormProps,
  mode
}: {
  book?: TBook;
  open: boolean;
  onChange: (value: boolean) => void;
  bookFormProps: any;
  mode: string
}) => {
  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="max-w-lg  dark:bg-linear-to-b dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Book" : "Edit Book"}
          </DialogTitle>
        </DialogHeader>
        <BookForm {...bookFormProps}/>
      </DialogContent>
    </Dialog>
  );
};

export default BookModal