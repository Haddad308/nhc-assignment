import type React from "react";
import type { Metadata } from "next";
import { Abel } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import NetworkStatus from "@/components/system/NetworkStatus";

const abel = Abel({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NHC Products",
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
        <link rel="icon" href="/NHC.svg" sizes="any" />
        <NetworkStatus />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
