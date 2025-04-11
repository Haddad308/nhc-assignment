"use client";

import { useState } from "react";
import SearchBar from "@/components/search-bar";
import ProductCard from "@/components/product-card";
import EmptyState from "@/components/empty-state";
import type { Product } from "@/lib/types";

export default function Home() {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (results: Product[], query: string) => {
    setSearchResults(results);
    setSearchQuery(query);
    setHasSearched(true);
    setIsLoading(false);
  };

  const handleSearchStart = () => {
    setIsLoading(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto ">
        <div className="main-container">
          <div className="py-8 px-4">
            <SearchBar
              onSearch={handleSearch}
              onSearchStart={handleSearchStart}
            />

            {hasSearched && (
              <div className="mt-8">
                <p className="mb-6">
                  Total results count: {searchResults.length}
                </p>

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
      </div>
    </div>
  );
}
