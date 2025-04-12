import type React from "react";
import type { Metadata } from "next";
import { Abel } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import NetworkStatus from "@/components/NetworkStatus";

const abel = Abel({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Products Search",
  description: "Search products using dummyjson.com API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={abel.className}>
        <NetworkStatus />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
