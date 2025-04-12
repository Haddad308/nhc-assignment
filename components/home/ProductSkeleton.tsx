export function ProductSkeleton() {
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
