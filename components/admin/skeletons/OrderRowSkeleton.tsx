import { Skeleton } from "@/components/ui/skeleton"

export function OrderRowSkeleton() {
	return (
		<tr className="animate-pulse">
			{/* ID */}
			<td className="px-4 py-3">
				<Skeleton className="h-3 w-10" />
			</td>

			{/* Name */}
			<td className="px-4 py-3">
				<Skeleton className="h-4 w-32" />
			</td>

			{/* Phone */}
			<td className="px-4 py-3">
				<Skeleton className="h-4 w-28" />
			</td>

			{/* Email */}
			<td className="px-4 py-3">
				<Skeleton className="h-4 w-44" />
			</td>

			{/* Event Date */}
			<td className="px-4 py-3">
				<Skeleton className="h-4 w-24" />
			</td>

			{/* Actions */}
			<td className="px-4 py-3">
				<div className="flex gap-2 justify-center">
					<Skeleton className="h-9 w-9 rounded-md" />
					<Skeleton className="h-9 w-9 rounded-md" />
				</div>
			</td>
		</tr>
	)
}
