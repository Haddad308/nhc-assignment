import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-[#D9D9D91F] p-4 flex items-center">
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
      <nav className="flex space-x-8">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          Products
        </Link>
        <Link href="/about" className="text-gray-600 hover:text-gray-800">
          About
        </Link>
      </nav>
    </header>
  );
}
