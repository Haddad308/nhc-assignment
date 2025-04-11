import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-56 bg-black">
        <Image
          src={product.thumbnail || "/placeholder.svg"}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "contain" }}
          className="object-contain"
        />
      </div>
      <div className="p-6">
        <h3 className="text-[#285F9D] font-medium text-2xl mb-2">
          {product.title}
        </h3>
        <p className="text-gray-500 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <div className="text-base font-medium">
            Price : <span className="text-[#285F9D]">${product.price}</span>
          </div>
          <Link
            href={`/products/${product.id}`}
            className="bg-[#285F9D] text-white px-8 py-2 rounded-md text-base font-medium hover:bg-[#1e4b7b] transition-colors"
          >
            More
          </Link>
        </div>
      </div>
    </div>
  );
}
