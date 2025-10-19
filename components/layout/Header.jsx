"use client";

import { useRouter } from "next/navigation";
import { userRepository } from "@/repositories/userRepository";
import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Header({ toggleSidebar }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get current user from Supabase
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await userRepository.logoutUser();
    router.push("/");
  };

  const username = user?.email ? user.email.split("@")[0] : "User";

  return (
    <header className="bg-whte shadow-sm px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/user.svg"
            alt="user avatar"
            width={36}
            height={36}
            className="rounded-full border border-gray-300"
          />

          <span className="text-gray-700 font-medium">
            Salam, {username} 👋
          </span>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </header>
  );
}
