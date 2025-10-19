"use client";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-white bg-background">
        <HeroUIProvider>
          <Provider store={store}>{children}</Provider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
