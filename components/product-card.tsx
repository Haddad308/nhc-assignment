import { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 bg-black">
        <Image
          src={product.thumbnail || "/placeholder.svg"}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-blue-600 font-medium text-lg">{product.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm">
            Price : <span className="text-blue-600">${product.price}</span>
          </div>
          <Link
            href={`/products/${product.id}`}
            className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-700"
          >
            More
          </Link>
        </div>
      </div>
    </div>
  );
}
