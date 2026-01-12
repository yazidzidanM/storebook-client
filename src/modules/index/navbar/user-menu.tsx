"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, LogOut, LayoutDashboard, Book } from "lucide-react";
import * as s from "../home/styles";

export function UserMenu({
  user,
  isAuthenticated,
}: {
  user: { name: string; role: string } | null;
  isAuthenticated: boolean;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    // server action nanti
    router.push("/login");
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/login")}
          className={s.loginBtn}
        >
          Login
        </Button>

        <Button
          size="sm"
          onClick={() => router.push("/register")}
          className={s.registerBtn}
        >
          Register
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <User className="w-4 h-4" />
          {user?.name}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {user?.role === "admin" && (
          <>
            <DropdownMenuItem onClick={() => router.push("/admin")}>
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <User className="w-4 h-4 mr-2" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleLogout} className="text-destructive">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
