export interface Category {
  id: string;
  name: string;
  description: string;
  bookCount: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  cover: string;
  category: string;
  description: string;
  stock: number;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  items: { bookTitle: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  paymentMethod: "cod";
  createdAt: string;
  address: string;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Fiction",
    description: "Novels and stories from imagination",
    bookCount: 45,
  },
  {
    id: "2",
    name: "Non-Fiction",
    description: "Real stories and educational content",
    bookCount: 32,
  },
  {
    id: "3",
    name: "Science",
    description: "Scientific discoveries and theories",
    bookCount: 28,
  },
  {
    id: "4",
    name: "Technology",
    description: "Computing and digital innovation",
    bookCount: 24,
  },
  {
    id: "5",
    name: "History",
    description: "Stories from the past",
    bookCount: 19,
  },
  {
    id: "6",
    name: "Biography",
    description: "Life stories of notable people",
    bookCount: 15,
  },
];

export const books: Book[] = [
  {
    id: "1",
    title: "The Art of Programming",
    author: "Robert C. Martin",
    price: 350000,
    cover:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
    category: "Technology",
    description:
      "A comprehensive guide to writing clean, maintainable code. This book covers fundamental principles of software craftsmanship that every developer should know.",
    stock: 25,
  },
  {
    id: "2",
    title: "Midnight Library",
    author: "Matt Haig",
    price: 275000,
    cover:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    category: "Fiction",
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. A moving exploration of regret and possibility.",
    stock: 0,
  },
  {
    id: "3",
    title: "Sapiens: A Brief History",
    author: "Yuval Noah Harari",
    price: 420000,
    cover:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
    category: "History",
    description:
      "An international bestseller that explores the entire history of humankind, from the Stone Age to the Silicon Age.",
    stock: 30,
  },
  {
    id: "4",
    title: "The Science of Everything",
    author: "David Eagleman",
    price: 385000,
    cover:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
    category: "Science",
    description:
      "Discover the wonders of the universe through engaging explanations of physics, biology, and chemistry.",
    stock: 22,
  },
  {
    id: "5",
    title: "Steve Jobs Biography",
    author: "Walter Isaacson",
    price: 450000,
    cover:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    category: "Biography",
    description:
      "The exclusive biography of Steve Jobs, based on more than forty interviews with Jobs conducted over two years.",
    stock: 15,
  },
  {
    id: "6",
    title: "Atomic Habits",
    author: "James Clear",
    price: 295000,
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    category: "Non-Fiction",
    description:
      "Revolutionary insights on how small changes can lead to remarkable results. Transform your life one habit at a time.",
    stock: 40,
  },
  {
    id: "7",
    title: "Deep Learning Fundamentals",
    author: "Ian Goodfellow",
    price: 520000,
    cover:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=600&fit=crop",
    category: "Technology",
    description:
      "The definitive textbook on deep learning, covering mathematical and computational techniques.",
    stock: 12,
  },
  {
    id: "8",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 185000,
    cover:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
    category: "Fiction",
    description:
      "A classic American novel set in the Jazz Age, exploring themes of decadence, idealism, and excess.",
    stock: 35,
  },
];

export const orders: Order[] = [
  {
    id: "ORD-001",
    userId: "2",
    userName: "John Doe",
    userEmail: "user@bookstore.com",
    items: [
      { bookTitle: "The Art of Programming", quantity: 1, price: 350000 },
      { bookTitle: "Atomic Habits", quantity: 2, price: 295000 },
    ],
    total: 940000,
    status: "pending",
    paymentMethod: "cod",
    createdAt: "2024-01-15T10:30:00Z",
    address: "Jl. Sudirman No. 123, Jakarta",
  },
  {
    id: "ORD-002",
    userId: "3",
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    items: [
      { bookTitle: "Sapiens: A Brief History", quantity: 1, price: 420000 },
    ],
    total: 420000,
    status: "shipped",
    paymentMethod: "cod",
    createdAt: "2024-01-14T14:20:00Z",
    address: "Jl. Gatot Subroto No. 45, Jakarta",
  },
  {
    id: "ORD-003",
    userId: "4",
    userName: "Ahmad Rizki",
    userEmail: "ahmad@example.com",
    items: [
      { bookTitle: "Midnight Library", quantity: 1, price: 275000 },
      { bookTitle: "The Great Gatsby", quantity: 1, price: 185000 },
    ],
    total: 460000,
    status: "delivered",
    paymentMethod: "cod",
    createdAt: "2024-01-10T09:15:00Z",
    address: "Jl. Thamrin No. 78, Jakarta",
  },
];

export const mockUsers = [
  {
    id: "2",
    name: "John Doe",
    email: "user@bookstore.com",
    role: "user",
    joinedAt: "2024-01-01",
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    joinedAt: "2024-01-05",
  },
  {
    id: "4",
    name: "Ahmad Rizki",
    email: "ahmad@example.com",
    role: "user",
    joinedAt: "2024-01-08",
  },
  {
    id: "5",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "user",
    joinedAt: "2024-01-12",
  },
];
