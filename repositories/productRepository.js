import supabase from "@/lib/supabaseClient";

export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("date_added", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  return data;
};
