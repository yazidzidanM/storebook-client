"use client";

import {
  Book,
  FolderTree,
  Users,
  ShoppingBag,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { mockUsers, orders } from "../(data mentah)/data";
import * as s from "../../modules/index/home/styles";

import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { apiPrivate } from "@/instance/axios";
import { useEffect } from "react";

const AdminDashboard = () => {
  const { user, isAuthenticated, token, hasHydrated } = useAuthStore();
  const router = useRouter();

  const api = apiPrivate(token || "");

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const { data: books, isLoading: isBookLoading } =
    useQuery({
      queryKey: ["books"],
      queryFn: async () => {
        const res = await api.get("/api/books");
        return res.data;
      },
      enabled: !!token,
    }) ?? [];

  const { data: categories, isLoading: isCategoriesLoading } =
    useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
        const res = await api.get("/api/categories");
        return res.data;
      },
      enabled: !!token,
    }) ?? [];

  const stats = [
    {
      label: "Total Books",
      value: books?.data?.length,
      icon: Book,
      color:
        "bg-indigo-600/10 text-indigo-600 dark:text-[#C6A96B] dark:bg-[#C6A96B]/10",
      link: "/admin/books",
    },
    {
      label: "Categories",
      value: categories?.data?.length,
      icon: FolderTree,
      color: "bg-green-600/10 text-green-600",
      link: "/admin/categories",
    },
    {
      label: "Total Users",
      value: mockUsers.length,
      icon: Users,
      color: "bg-amber-500/10 text-amber-500",
      link: "/admin/users",
    },
    {
      label: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      color:
        "bg-indigo-600/10 text-indigo-600 dark:text-[#C6A96B] dark:bg-[#C6A96B]/10",
      link: "/admin/orders",
    },
  ];

  useEffect(() => {
      if (!hasHydrated) return;
    
      if (!isAuthenticated || user?.role !== "admin" || !token) {
        router.replace("/login");
      }
    }, [hasHydrated, isAuthenticated, user, token, router]);

  return (
    <div className="relative h-full p-6 space-y-8 dark:bg-linear-to-b dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]">
      <div className={s.heroGlow} />
      <div>
        <h1 className="text-2xl font-serif font-bold">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your bookstore today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <button
            key={stat.label}
            // onClick={() => navigate(stat.link)}
            className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-600/10 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">Total Revenue</h3>
              <p className="text-2xl font-bold text-green-600">
                {formatPrice(totalRevenue)}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            From {orders.length} orders • {pendingOrders} pending
          </p>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card">
          <h3 className="font-medium mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {orders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium text-sm">{order.userName}</p>
                  <p className="text-xs text-muted-foreground">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">
                    {formatPrice(order.total)}
                  </p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      order.status === "pending"
                        ? "bg-amber-500/10 text-amber-500"
                        : order.status === "shipped"
                        ? "bg-indigo-600/10 text-indigo-600 dark:text-[#C6A96B] dark:bg-[#C6A96B]/10"
                        : "bg-green-600/10 text-green-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
