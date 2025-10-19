"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import supabase from "@/lib/supabaseClient";
import ProtectedRoute from "@/components/ProtectedRoutes";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
        setLoading(false);
      }
    };
    getUser();
  }, [router]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <ProtectedRoute>
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Welcome to your Dashboard 👋
        </h1>
        <p className="text-gray-600 mb-8">
          You can view your <strong>tables</strong> and <strong>charts</strong>{" "}
          from here, or navigate using the sidebar on the left.
        </p>

        <div className="flex justify-center gap-6">
          <Link
            href="/dashboard/tables"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            View Tables
          </Link>

          <Link
            href="/dashboard/charts"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            View Charts
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}
