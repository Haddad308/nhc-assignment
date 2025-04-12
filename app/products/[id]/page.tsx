import Image from "next/image";
import { getProduct } from "@/lib/api";
import { Suspense } from "react";
import { ProductSkeleton } from "@/components/home/ProductSkeleton";
import { Star } from "lucide-react";

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto px-4 pb-12">
        <div className="main-container p-4">
          <div className="py-8 px-4">
            <div className="max-w-4xl mx-auto">
              <Suspense fallback={<ProductSkeleton />}>
                <ProductContent params={params} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function ProductContent({ params }: ProductPageProps) {
  const product = await getProduct(params.id);

  return (
    <>
      <div className="px-16">
        <h1 className="text-2xl text-[#285F9D]  mb-8">{product.title}</h1>

        <div className="relative h-64 bg-black mb-8 rounded-2xl">
          <Image
            src={product.thumbnail || "/placeholder.svg"}
            alt={product.title}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8 ">
          <div>
            <div className="mb-4">
              <span>Price : </span>
              <span className="text-[#285F9D]">${product.price}</span>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <span>Rating : </span>
              <span className="text-yellow-500 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={
                      i < Math.floor(product.rating) ? "currentColor" : "none"
                    }
                  />
                ))}
              </span>
            </div>
            <div className="mb-4">
              <span>Brand : </span>
              <span className="text-[#285F9D]">{product.brand}</span>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <span>Discount Percentage : </span>
              <span className="text-[#285F9D]">
                {product.discountPercentage}
              </span>
            </div>
            <div className="mb-4">
              <span>Stock : </span>
              <span className="text-[#285F9D]">{product.stock}</span>
            </div>
            <div className="mb-4">
              <span>Category : </span>
              <span className="text-[#285F9D]">{product.category}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-medium mb-2">Product Description</h2>
        <p className="text-gray-700">{product.description}</p>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">Product Images</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {product.images.map((image, index) => (
            <div key={index} className="relative h-32 bg-black rounded-2xl">
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.title} - image ${index + 1}`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
