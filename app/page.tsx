"use client";

import { useState } from "react";
import SearchBar from "@/components/home/search-bar";
import ProductCard from "@/components/home/product-card";
import EmptyState from "@/components/home/empty-state";
import type { Product } from "@/lib/types";

export default function Home() {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (results: Product[], empty: boolean) => {
    setSearchResults(results);
    setHasSearched(empty);
    setIsLoading(false);
  };

  const handleSearchStart = () => {
    setIsLoading(true);
  };

  return (
    <div className="min-h-[80vh] flex flex-col container mx-auto px-24 py-5">
      <div className="flex-grow flex flex-col justify-center items-center container mx-auto ">
        <SearchBar onSearch={handleSearch} onSearchStart={handleSearchStart} />

        {hasSearched && (
          <div className="mt-8">
            <p className="mb-6">Total results count: {searchResults.length}</p>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
