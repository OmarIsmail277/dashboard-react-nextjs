"use client";

import { useRouter } from "next/navigation";
import { userRepository } from "@/repositories/userRepository";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "@/store/userSlice";

export default function Header({ toggleSidebar, isSidebarOpen }) {
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await userRepository.logoutUser(); // clears session in Supabase
    dispatch(clearUser()); // clears user from Redux
    router.push("/"); // redirect home
  };

  const username = user?.email ? user.email.split("@")[0] : "User";

  return (
    <header className="bg-white shadow-sm px-6 py-3 flex justify-between items-center w-full">
      <div className="flex items-center gap-4">
        {/* Show burger only when sidebar is closed */}
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded hover:bg-gray-100 transition"
          >
            <Image
              src="/burger.png"
              alt="Toggle sidebar"
              width={28}
              height={28}
            />
          </button>
        )}

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
