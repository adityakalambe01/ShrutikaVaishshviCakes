import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SiteSettingsSkeleton() {
	return (
		<Card className="p-6 bg-white border-amber-200 animate-pulse">
			{/* Title */}
			<Skeleton className="h-8 w-48 mb-6" />

			<div className="space-y-8">
				{/* Logo Section */}
				<div className="border-b border-amber-200 pb-6 space-y-4">
					<Skeleton className="h-5 w-24" />

					<div className="space-y-3">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-48 w-full rounded-lg" />
						<Skeleton className="h-10 w-full rounded-lg" />
					</div>
				</div>

				{/* Contact Information */}
				<div className="border-b border-amber-200 pb-6 space-y-4">
					<Skeleton className="h-5 w-44" />

					<div className="space-y-4">
						<div>
							<Skeleton className="h-4 w-28 mb-2" />
							<Skeleton className="h-10 w-full rounded-lg" />
						</div>

						<div>
							<Skeleton className="h-4 w-28 mb-2" />
							<Skeleton className="h-10 w-full rounded-lg" />
						</div>

						<div>
							<Skeleton className="h-4 w-36 mb-2" />
							<Skeleton className="h-16 w-full rounded-lg" />
						</div>

						<div>
							<Skeleton className="h-4 w-32 mb-2" />
							<Skeleton className="h-10 w-full rounded-lg" />
						</div>
					</div>
				</div>

				{/* Social Media */}
				<div className="border-b border-amber-200 pb-6 space-y-4">
					<Skeleton className="h-5 w-40" />

					<div className="space-y-4">
						<div>
							<Skeleton className="h-4 w-40 mb-2" />
							<Skeleton className="h-10 w-full rounded-lg" />
						</div>

						<div>
							<Skeleton className="h-4 w-40 mb-2" />
							<Skeleton className="h-10 w-full rounded-lg" />
						</div>
					</div>
				</div>

				{/* About Text */}
				<div className="border-b border-amber-200 pb-6 space-y-4">
					<Skeleton className="h-5 w-32" />
					<Skeleton className="h-24 w-full rounded-lg" />
				</div>

				{/* Save Button */}
				<Skeleton className="h-12 w-full rounded-lg" />
			</div>
		</Card>
	)
}
