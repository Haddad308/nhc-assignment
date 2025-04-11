"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-[#D9D9D91F] p-4 flex items-center gap-5">
      <div className="mr-8">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="NHC Logo"
            width={60}
            height={40}
            priority
          />
        </Link>
      </div>
      <nav className="flex space-x-10">
        <Link
          href="/"
          className={`hover:text-[#285F9D] ${
            pathname === "/" ? "text-[#285F9D]" : "text-gray-600"
          }`}
        >
          Products
        </Link>
        <Link
          href="/about"
          className={`hover:text-[#285F9D] ${
            pathname === "/about" ? "text-[#285F9D]" : "text-gray-600"
          }`}
        >
          About
        </Link>
      </nav>
    </header>
  );
}
