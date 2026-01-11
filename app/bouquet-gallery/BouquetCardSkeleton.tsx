import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function BouquetCardSkeleton() {
	return (
		<Card className="flex h-full flex-col overflow-hidden rounded-xl border border-amber-200">
			{/* IMAGE SKELETON */}
			<div className="relative h-64 w-full overflow-hidden bg-muted">
				<Skeleton className="h-full w-full" />
			</div>

			{/* CONTENT */}
			<CardContent className="flex flex-1 flex-col p-6 space-y-3">
				{/* Title */}
				<Skeleton className="h-6 w-3/4" />

				{/* Meta info */}
				<Skeleton className="h-4 w-1/2" />

				{/* Description (3 lines) */}
				<div className="space-y-2 pt-1">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-11/12" />
					<Skeleton className="h-4 w-4/5" />
				</div>
			</CardContent>

			{/* FOOTER */}
			<CardFooter className="mt-auto flex items-center justify-between border-t border-amber-100 bg-white px-6 py-4">
				{/* Price */}
				<Skeleton className="h-6 w-20" />

				{/* Optional button skeleton */}
				{/* <Skeleton className="h-9 w-24 rounded-md" /> */}
			</CardFooter>
		</Card>
	)
}
