import ProtectedRoute from "@/components/ProtectedRoutes";
import DataTable from "@/features/table/components/DataTable";
import { getProducts } from "@/repositories/productRepository";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <ProtectedRoute>
      <section className="py-24">
        <div className="container">
          <DataTable products={products} />
        </div>
      </section>
    </ProtectedRoute>
  );
}
