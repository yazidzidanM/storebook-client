"use client"

import { useState } from 'react';
import {
  LayoutDashboard,
  Book,
  FolderTree,
  Users,
  ShoppingBag,
  Menu,
  X,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ModeToggle } from '@/components/common/toggleDarkMode';
import { usePathname, useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Book, label: 'Books', path: '/admin/books' },
  { icon: FolderTree, label: 'Categories', path: '/admin/categories' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname()
  console.log(pathname)
  // const location = useLocation();
  // const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="h-screen bg-white dark:bg-[#2E2E2E] flex">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 lg:translate-x-0 lg:static ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-600 text-white dark:bg-[#C6A96B]">
                <Book className="w-4 h-4" />
              </div>
              <span className="font-serif font-semibold">BookStore</span>
            </Link>
            <button
              className="lg:hidden p-1"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white dark:bg-[#C6A96B]'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-4">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-secondary"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-sm">
            <Link href="/admin" className="text-muted-foreground hover:text-foreground">
              Admin
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{pathname?.split("/")[2]}</span>
          </div>

          <div className="ml-auto">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">View Store</Link>
            </Button>
          </div>
           <ModeToggle/>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
