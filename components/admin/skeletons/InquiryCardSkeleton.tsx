import { Skeleton } from "@/components/ui/skeleton"

export function InquiryCardSkeleton() {
	return (
		<div className="rounded-lg border p-4 animate-pulse">
			{/* Top section */}
			<div className="flex justify-between items-start">
				<div className="space-y-2">
					<Skeleton className="h-4 w-32" /> {/* Name */}
					<Skeleton className="h-3 w-48" /> {/* Subject */}
				</div>

				{/* Star */}
				<Skeleton className="h-4 w-4 rounded-full" />
			</div>

			{/* Bottom section */}
			<div className="flex justify-between items-center pt-3">
				{/* Index */}
				<Skeleton className="h-3 w-10" />

				{/* Actions */}
				<div className="flex gap-1">
					<Skeleton className="h-8 w-8 rounded-md" />
					<Skeleton className="h-8 w-8 rounded-md" />
					<Skeleton className="h-8 w-8 rounded-md" />
					<Skeleton className="h-8 w-8 rounded-md" />
				</div>
			</div>
		</div>
	)
}
