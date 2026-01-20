"use client"
import { mockUsers } from "@/app/(data mentah)/data";
import * as s from "../../../modules/index/home/styles";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminUsers = () => {
  const router = useRouter()
  const { user, isAuthenticated, hasHydrated, token } = useAuthStore();
  useEffect(() => {
      if (!hasHydrated) return;
  
      if (!isAuthenticated || user?.role !== "admin" || !token) {
        router.replace("/login");
      }
    }, [hasHydrated, isAuthenticated, user, token, router]);

  return (
    <div className="space-y-6 p-6 relative ">
      <div className={s.heroGlow} />

      <h2 className="text-xl font-serif font-bold">
        Registered <span className="dark:text-[#C8A96B]"> Users</span>
      </h2>

      <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="px-6 py-3 font-medium text-muted-foreground">
                  Name
                </th>
                <th className="px-6 py-3 font-medium text-muted-foreground">
                  Email
                </th>
                <th className="px-6 py-3 font-medium text-muted-foreground">
                  Role
                </th>
                <th className="px-6 py-3 font-medium text-muted-foreground">
                  Joined
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {mockUsers.map((u) => (
                <tr key={u.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-6 py-4 font-medium">{u.name}</td>

                  <td className="px-6 py-4 text-muted-foreground">{u.email}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`
                    inline-flex items-center px-2 py-0.5 rounded-full
                    text-xs font-medium capitalize
                    ${
                      u.role === "admin"
                        ? "bg-indigo-100 text-indigo-600 dark:bg-[#C8A96B]/10 dark:text-[#C8A96B]"
                        : "bg-indigo-100 text-indigo-600 dark:bg-[#C8A96B]/10 dark:text-[#C8A96B]"
                    }
                  `}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-muted-foreground">
                    {u.joinedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
