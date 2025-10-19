"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();

  const links = [
    { name: "Tables", path: "/dashboard/tables", src: "/table.svg" },
    { name: "Charts", path: "/dashboard/charts", src: "/charts.svg" },
  ];

  // Disable body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      {/* BACKDROP for mobile */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <motion.aside
        animate={{ x: isOpen ? 0 : -260, width: isOpen ? 240 : 0 }}
        transition={{ duration: 0.3, type: "tween" }}
        className="bg-white shadow-md p-4 flex flex-col justify-between min-h-screen fixed md:relative z-50 md:w-[90px]"
      >
        <div className="flex flex-col">
          {/* Toggle button */}
          <div className="flex items-center mb-6">
            <button
              className="cursor-pointer rounded-full p-3 hover:bg-gray-100 transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img src="/burger.png" className="w-7 h-7" alt="burger button" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-3 w-full items-center">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center px-2 py-2 gap-3 rounded-md font-medium w-full justify-${
                  isOpen ? "start" : "center"
                } transition-all duration-300 ${
                  pathname === link.path
                    ? "bg-gray-300 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => window.innerWidth < 768 && setIsOpen(false)} // close on mobile
              >
                <img
                  src={link.src}
                  className="w-8 h-8 flex-shrink-0"
                  alt={`${link.name} icon`}
                />
                {isOpen && (
                  <span className="whitespace-nowrap text-sm font-semibold">
                    {link.name}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </motion.aside>
    </>
  );
}
