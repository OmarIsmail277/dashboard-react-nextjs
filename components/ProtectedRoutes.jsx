"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/store/userSlice";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        dispatch(clearUser());
        router.replace("/login");
      } else {
        dispatch(setUser(data.user));
      }
      setLoading(false);
    };
    checkUser();
  }, [router, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return children;
}
