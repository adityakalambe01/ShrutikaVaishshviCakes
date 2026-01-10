import { Skeleton } from "@/components/ui/skeleton"

export function BouquetRowSkeleton() {
	return (
		<tr className="animate-pulse">
			{/* Image */}
			<td className="px-4 py-3">
				<Skeleton className="w-16 h-16 rounded-md" />
			</td>

			{/* Name */}
			<td className="px-4 py-3">
				<Skeleton className="h-4 w-32" />
			</td>

			{/* Chocolate Type */}
			<td className="px-4 py-3">
				<Skeleton className="h-3 w-24" />
			</td>

			{/* Size */}
			<td className="px-4 py-3">
				<Skeleton className="h-3 w-16" />
			</td>

			{/* Occasion */}
			<td className="px-4 py-3">
				<Skeleton className="h-3 w-20" />
			</td>

			{/* Price */}
			<td className="px-4 py-3">
				<Skeleton className="h-4 w-16" />
			</td>

			{/* Actions */}
			<td className="px-4 py-3">
				<div className="flex gap-2 justify-center">
					<Skeleton className="h-8 w-14 rounded-md" />
					<Skeleton className="h-8 w-16 rounded-md" />
				</div>
			</td>
		</tr>
	)
}
