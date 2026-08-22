export default function RentalSkeletonCard() {
  return (
    <div className="bg-surface rounded-2xl p-4 border border-surface-container-highest shadow-sm animate-pulse flex flex-col space-y-4">
      {/* Image Skeleton */}
      <div className="w-full h-44 bg-surface-container-high rounded-xl relative overflow-hidden">
        <div className="absolute top-3 left-3 w-16 h-6 bg-surface-container rounded-full" />
        <div className="absolute top-3 right-3 w-12 h-6 bg-surface-container rounded-full" />
      </div>

      {/* Title & Specs Skeleton */}
      <div className="space-y-2">
        <div className="h-3 w-20 bg-surface-container-high rounded" />
        <div className="h-5 w-3/4 bg-surface-container-high rounded" />
        <div className="h-3 w-full bg-surface-container-high rounded" />
      </div>

      {/* Provider Skeleton */}
      <div className="flex items-center gap-2.5 pt-2 border-t border-surface-container-highest">
        <div className="w-7 h-7 rounded-full bg-surface-container-high" />
        <div className="h-3 w-24 bg-surface-container-high rounded" />
      </div>

      {/* Price & Action Skeleton */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <div className="h-6 w-20 bg-surface-container-high rounded mb-1" />
          <div className="h-3 w-12 bg-surface-container-high rounded" />
        </div>
        <div className="h-10 w-24 bg-surface-container-high rounded-xl" />
      </div>
    </div>
  );
}
