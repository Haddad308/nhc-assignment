import Image from "next/image";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-32 h-32 mb-4">
        <Image
          src="/empty-state.png"
          alt="No results"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <p className="text-gray-600 mb-1">No results for your search!</p>
      <p className="text-gray-500 text-sm">Try another keyword</p>
    </div>
  );
}
