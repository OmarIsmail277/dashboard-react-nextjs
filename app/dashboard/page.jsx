"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import { userRepository } from "@/repositories/userRepository";

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

  const handleLogout = async () => {
    try {
      await userRepository.logoutUser();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          {loading
            ? "Loading..."
            : `Welcome ${user ? user.email?.split("@")[0] : "User"} 👋`}
        </h1>

        {loading ? (
          ""
        ) : (
          <p className="text-gray-500 mb-4">You are successfully logged in!</p>
        )}

        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
