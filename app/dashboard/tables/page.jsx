import DataTable from "@/features/table/components/DataTable";
import supabase from "@/lib/supabaseClient";

async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("date_added", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
  return data;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section className="py-24">
      <div className="container">
        <DataTable products={products} />{" "}
        {/* لاحظ أننا نعيد استخدام نفس الكومبوننت */}
      </div>
    </section>
  );
}
