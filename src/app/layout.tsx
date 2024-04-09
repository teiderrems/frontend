import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex  min-h-screen flex-col relative">
        <div className=" min-w-screen md:h-16 h-12">
          <Header/>
        </div>
      <div className="flex-1">
        {children}
      </div>
      </body>
    </html>
  );
}