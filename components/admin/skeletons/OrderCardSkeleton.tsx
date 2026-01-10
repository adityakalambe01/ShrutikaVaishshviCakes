import { Skeleton } from "@/components/ui/skeleton"

export function OrderCardSkeleton() {
	return (
		<div className="border border-amber-200 rounded-lg p-4 bg-white animate-pulse space-y-2">
			{/* Name */}
			<Skeleton className="h-4 w-32" />

			{/* Phone */}
			<Skeleton className="h-3 w-28" />

			{/* Email */}
			<Skeleton className="h-3 w-44" />

			{/* Event date */}
			<Skeleton className="h-3 w-36" />

			{/* Actions */}
			<div className="flex gap-2 mt-3">
				<Skeleton className="h-9 w-9 rounded-md" />
				<Skeleton className="h-9 w-9 rounded-md" />
			</div>
		</div>
	)
}
