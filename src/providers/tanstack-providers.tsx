"use client";
import { ReactNode } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      onError: () => {
        alert("mutation error");
      },
    },
  },
});
export default function TanStackProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
