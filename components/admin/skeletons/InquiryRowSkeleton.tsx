import { Skeleton } from "@/components/ui/skeleton"

export function InquiryRowSkeleton() {
	return (
		<tr className="border-t animate-pulse">
			{/* Index */}
			<td className="p-3">
				<Skeleton className="h-3 w-6" />
			</td>

			{/* Name */}
			<td className="p-3">
				<Skeleton className="h-4 w-32" />
			</td>

			{/* Subject + star */}
			<td className="p-3">
				<div className="flex items-center gap-2">
					<Skeleton className="h-4 w-4 rounded-full" />
					<Skeleton className="h-4 w-48" />
				</div>
			</td>

			{/* Actions */}
			<td className="p-3">
				<div className="flex justify-center gap-2">
					<Skeleton className="h-8 w-8 rounded-md" />
					<Skeleton className="h-8 w-8 rounded-md" />
					<Skeleton className="h-8 w-8 rounded-md" />
					<Skeleton className="h-8 w-8 rounded-md" />
				</div>
			</td>
		</tr>
	)
}
