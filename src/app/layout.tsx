// "use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pizza-Lito",
  description: "Pizza orders app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <div className=" w-full bg-blue-300 shadow md:h-16 h-8">
          <Header />
        </div>
        <div className="flex-1 bg-gradient-to-bl from-cyan-50 to-cyan-100">
          {children}
        </div>
        <div className=" w-full bg-gray-200 bg-gradient-to-l from-pink-200 to-purple-300 md:h-12 h-8">
          <Footer />
        </div>
      </body>
    </html>
  );
}