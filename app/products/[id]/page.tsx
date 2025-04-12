import Image from "next/image";
import { getProduct } from "@/lib/api";
import { Suspense } from "react";

interface ProductPageProps {
  params: { id: string };
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Title skeleton */}
      <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-8" />

      {/* Main image skeleton */}
      <div className="relative h-64 bg-gray-200 mb-8" />

      {/* Details grid skeleton */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="mb-4">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
        <div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="mb-4">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>

      {/* Description skeleton */}
      <div className="mb-8">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>

      {/* Images grid skeleton */}
      <div>
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="relative h-32 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
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
      <div className="px-10">
        <h1 className="text-2xl text-[#285F9D]  mb-8">{product.title}</h1>

        <div className="relative h-64 bg-black mb-8">
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
            <div className="mb-4">
              <span>Rating : </span>
              <span className="text-yellow-500">
                {"★".repeat(Math.floor(product.rating))}
                {"☆".repeat(5 - Math.floor(product.rating))}
              </span>
            </div>
            <div className="mb-4">
              <span>Brand : </span>
              <span className="text-[#285F9D]">{product.brand}</span>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <span>Discount Percentage :</span>
              <span className="text-green-600">
                {product.discountPercentage}
              </span>
            </div>
            <div className="mb-4">
              <span>Stock :</span>
              <span className="text-red-600">{product.stock}</span>
            </div>
            <div className="mb-4">
              <span>Category :</span>
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
            <div key={index} className="relative h-32 bg-black rounded">
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
