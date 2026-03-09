export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Title skeleton */}
        <div className="h-8 w-32 animate-pulse rounded bg-muted" />

        {/* Cart items skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4 rounded-lg border p-4">
              <div className="h-20 w-20 animate-pulse rounded-lg bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                <div className="h-4 w-1/4 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>

        {/* Summary skeleton */}
        <div className="space-y-4 rounded-lg border p-6">
          <div className="h-6 w-24 animate-pulse rounded bg-muted" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            </div>
            <div className="flex justify-between">
              <div className="h-4 w-16 animate-pulse rounded bg-muted" />
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            </div>
            <div className="flex justify-between">
              <div className="h-5 w-12 animate-pulse rounded bg-muted" />
              <div className="h-5 w-24 animate-pulse rounded bg-muted" />
            </div>
          </div>
          <div className="h-12 w-full animate-pulse rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
}

