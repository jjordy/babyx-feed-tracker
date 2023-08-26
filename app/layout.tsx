import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} dark:bg-black dark:text-white`}>
        <nav className="dark:bg-white bg-black dark:text-black h-12 shadow-xl font-black flex items-center px-24">
          <Link href="/">BabyX Feed Tracker</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
