export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image skeleton */}
        <div className="aspect-square animate-pulse rounded-2xl bg-muted" />

        {/* Info skeleton */}
        <div className="space-y-6">
          {/* Variant selector skeleton */}
          <div className="space-y-3">
            <div className="h-5 w-32 animate-pulse rounded bg-muted" />
            <div className="flex gap-3">
              <div className="h-16 w-16 animate-pulse rounded-xl bg-muted" />
              <div className="h-16 w-16 animate-pulse rounded-xl bg-muted" />
              <div className="h-16 w-16 animate-pulse rounded-xl bg-muted" />
            </div>
          </div>

          {/* Title and price skeleton */}
          <div className="space-y-2">
            <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-5 w-1/2 animate-pulse rounded bg-muted" />
            <div className="h-8 w-1/4 animate-pulse rounded bg-muted" />
          </div>

          {/* Quantity skeleton */}
          <div className="space-y-2">
            <div className="h-5 w-24 animate-pulse rounded bg-muted" />
            <div className="h-10 w-32 animate-pulse rounded-lg border" />
          </div>

          {/* Buttons skeleton */}
          <div className="flex gap-3">
            <div className="h-12 flex-1 animate-pulse rounded-full bg-muted" />
            <div className="h-12 flex-1 animate-pulse rounded-full bg-muted" />
          </div>

          {/* Description skeleton */}
          <div className="space-y-2 pt-6">
            <div className="h-6 w-24 animate-pulse rounded bg-muted" />
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>
      </div>

      {/* Related products skeleton */}
      <div className="mt-12 space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-square animate-pulse rounded-2xl bg-muted" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

