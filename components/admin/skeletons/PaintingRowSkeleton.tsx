import { Skeleton } from "@/components/ui/skeleton"

export function PaintingRowSkeleton() {
	return (
		<tr className="animate-pulse">
			{/* Image */}
			<td className="p-3">
				<Skeleton className="w-20 h-16 rounded" />
			</td>

			{/* Title + Artist */}
			<td className="p-3 space-y-1">
				<Skeleton className="h-4 w-40" />
				<Skeleton className="h-3 w-24" />
			</td>

			{/* Medium */}
			<td className="p-3">
				<Skeleton className="h-3 w-28" />
			</td>

			{/* Dimensions */}
			<td className="p-3">
				<Skeleton className="h-3 w-24" />
			</td>

			{/* Price */}
			<td className="p-3">
				<Skeleton className="h-4 w-16" />
			</td>

			{/* Actions */}
			<td className="p-3">
				<div className="flex gap-2 justify-center">
					<Skeleton className="h-8 w-14 rounded-md" />
					<Skeleton className="h-8 w-16 rounded-md" />
				</div>
			</td>
		</tr>
	)
}
