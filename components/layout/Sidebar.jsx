"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();

  const links = [
    { name: "Tables", path: "/dashboard/tables", src: "/table.svg" },
    { name: "Charts", path: "/dashboard/charts", src: "/charts.svg" },
  ];

  return (
    <motion.aside
      animate={{ width: isOpen ? 280 : 90 }}
      transition={{ duration: 0.3, type: "tween" }}
      className="bg-white shadow-md p-4 flex flex-col justify-between min-h-screen"
    >
      {/* Header Section */}
      <div>
        {/* Burger Button always visible */}
        <div className="flex items-center mb-6">
          <button
            className="cursor-pointer rounded-full p-4 hover:bg-gray-100 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              src="/burger.png"
              className="w-[30px] h-[30px] transition-all duration-300"
              alt="burger button"
            />
          </button>

          {/* Show Logo + Text only when open */}
          {isOpen && (
            <div className="flex items-center gap-2 ml-2">
              <img
                src="/dashboard.svg"
                className="w-[30px] h-[30px]"
                alt="dashboard logo"
              />
              <h2 className="text-lg font-semibold text-blue-600 whitespace-nowrap">
                My Dashboard
              </h2>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                pathname === link.path
                  ? "bg-gray-300 text-white"
                  : "text-gray-700 hover:bg-gray-300"
              }`}
            >
              <img
                src={link.src}
                className="w-[30px] h-[30px]"
                alt={`${link.name} icon`}
              />
              {isOpen && <span className="whitespace-nowrap">{link.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
}
