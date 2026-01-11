import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

export function PaintingCardSkeleton() {
	return (
		<Card className="flex h-full flex-col overflow-hidden rounded-xl border border-amber-200">
			{/* IMAGE */}
			<div className="relative h-64 overflow-hidden bg-muted">
				<Skeleton className="h-full w-full" />

				{/* Availability badge placeholder */}
				<div className="absolute top-3 right-3">
					<Skeleton className="h-6 w-20 rounded-full" />
				</div>
			</div>

			{/* CONTENT */}
			<CardContent className="flex-1 p-6 space-y-3">
				{/* Artist */}
				<Skeleton className="h-4 w-1/3" />

				{/* Title */}
				<Skeleton className="h-6 w-3/4" />

				{/* Description (3 lines) */}
				<div className="space-y-2 pt-1">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-11/12" />
					<Skeleton className="h-4 w-4/5" />
				</div>
			</CardContent>

			{/* FOOTER */}
			<CardFooter className="mt-auto flex items-center justify-between p-6 pt-0">
				{/* Price */}
				<Skeleton className="h-6 w-24" />

				{/* Optional button skeleton */}
				{/* <Skeleton className="h-9 w-28 rounded-md" /> */}
			</CardFooter>
		</Card>
	)
}
