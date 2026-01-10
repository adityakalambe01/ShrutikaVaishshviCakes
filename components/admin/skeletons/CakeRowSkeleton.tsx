import { Skeleton } from "@/components/ui/skeleton"

export function CakeRowSkeleton() {
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

			{/* Flavor */}
			<td className="px-4 py-3">
				<Skeleton className="h-3 w-24" />
			</td>

			{/* Category */}
			<td className="px-4 py-3">
				<Skeleton className="h-3 w-20" />
			</td>

			{/* Servings */}
			<td className="px-4 py-3">
				<Skeleton className="h-3 w-14" />
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
