// import { useAuthStore } from '@/store/authStore';

import { orders } from "@/app/(data mentah)/data";
import * as s from "../../../modules/index/home/styles";
import useAuthStore from "@/store/authStore";

const AdminOrders = () => {
  const { user, isAuthenticated } = useAuthStore();
  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="space-y-6 p-6 relative">
      <div className={s.heroGlow} />

      <h2 className="text-xl font-serif font-bold">All <span className="dark:text-[#C8A96B]"> Orders</span></h2>

      <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="px-6 py-3 font-medium text-muted-foreground">
                  Order ID
                </th>
                <th className="px-6 py-3 font-medium text-muted-foreground">
                  Customer
                </th>
                <th className="px-6 py-3 font-medium text-muted-foreground">
                  Items
                </th>
                <th className="px-6 py-3 font-medium text-muted-foreground">
                  Total
                </th>
                <th className="px-6 py-3 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-3 font-medium text-muted-foreground">
                  Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-muted/40 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">#{order.id}</td>

                  <td className="px-6 py-4">
                    <p className="font-medium">{order.userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.userEmail}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-muted-foreground max-w-md">
                    <ul className="space-y-1">
                      {order.items.map((i, idx) => (
                        <li key={idx}>
                          {i.bookTitle}
                          <span className="text-xs"> × {i.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {formatPrice(order.total)}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`
                    inline-flex items-center px-2 py-0.5 rounded-full
                    text-xs font-medium capitalize
                    ${
                      order.status === "pending"
                        ? "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                        : order.status === "shipped"
                        ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-600/10 dark:text-indigo-400"
                        : "bg-emerald-100 text-emerald-600 dark:bg-emerald-600/10 dark:text-emerald-400"
                    }
                  `}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-muted-foreground">
                    {formatDate(order.createdAt)}
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

export default AdminOrders;
