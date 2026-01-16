import { Skeleton } from "@/components/ui/skeleton"

interface TableCardSkeletonProps {
  rows?: number
}

export function TableCardSkeleton({ rows = 5 }: TableCardSkeletonProps) {
  return (
    <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden dark:bg-linear-to-b dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              {[
                "Cover",
                "Title",
                "Author",
                "Category",
                "Price",
                "Stock",
                "Actions",
              ].map((_, i) => (
                <th key={i} className="px-6 py-3">
                  <Skeleton className="h-4 w-20" />
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-4">
                  <Skeleton className="w-10 h-14 rounded-md" />
                </td>

                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-40" />
                </td>

                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-32" />
                </td>

                <td className="px-6 py-4">
                  <Skeleton className="h-5 w-24 rounded-full" />
                </td>

                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-20" />
                </td>

                <td className="px-6 py-4">
                  <Skeleton className="h-5 w-12 rounded-full" />
                </td>

                <td className="px-3.5 py-4">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
