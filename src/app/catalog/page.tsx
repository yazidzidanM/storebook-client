// app/catalog/page.tsx (server component)
import { Suspense } from "react";
import Catalog from "./catalogClient";

export default function CatalogPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Catalog />
    </Suspense>
  );
}