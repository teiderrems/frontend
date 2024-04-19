// "use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <body className="flex min-h-screen w-screen flex-col md:flex-row">
        <div className="w-full md:w-1/6 bg-blue-300 shadow md:min-h-screen">
          <Header />
        </div>
        <div className="flex-1 bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  );
}