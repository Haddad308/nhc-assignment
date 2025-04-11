"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Product } from "@/lib/types";

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface SearchBarProps {
  onSearch: (results: Product[], query: string) => void;
  onSearchStart: () => void;
}

export default function SearchBar({ onSearch, onSearchStart }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms delay

  // Handle form submission (for when user presses Enter)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      performSearch(searchTerm.trim());
    }
  };

  // Effect to handle debounced search
  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      performSearch(debouncedSearchTerm.trim());
    }
  }, [debouncedSearchTerm]);

  const performSearch = async (query: string) => {
    setIsSearching(true);
    onSearchStart();

    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      onSearch(data.products, query);
    } catch (error) {
      console.error("Error searching products:", error);
      onSearch([], query);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <h2 className="text-center text-lg mb-4">Search products by keyword</h2>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search keyword"
          className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          disabled={isSearching}
        >
          <Search size={20} />
        </button>
      </form>
    </div>
  );
}
