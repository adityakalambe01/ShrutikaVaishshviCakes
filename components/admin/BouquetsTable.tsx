"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {Skeleton} from "@/components/ui/skeleton";
import {BouquetRowSkeleton} from "@/components/admin/skeletons/BouquetRowSkeleton";


/* ---------- TYPES ---------- */
export interface Bouquet {
	_id?: string
	name: string
	imageUrl: string
	chocolateType: string
	size: "Small" | "Medium" | "Large"
	occasion?: string
	price: number
}

interface BouquetsTableProps {
	bouquets: Bouquet[]
	loading: boolean
	onEdit: (bouquet: Bouquet) => void
	onDelete: (id?: string) => void
}

const ITEMS_PER_PAGE = 5

/* ---------- COMPONENT ---------- */
export default function BouquetsTable({
										  bouquets,
										  loading,
										  onEdit,
										  onDelete,
									  }: BouquetsTableProps) {
	const [search, setSearch] = useState("")
	const [sizeFilter, setSizeFilter] = useState<"all" | Bouquet["size"]>("all")
	const [page, setPage] = useState(1)

	/* ---------- FILTERING ---------- */
	const filtered = useMemo(() => {
		return bouquets.filter((b) => {
			const matchesSearch =
				b.name.toLowerCase().includes(search.toLowerCase()) ||
				b.chocolateType.toLowerCase().includes(search.toLowerCase())

			const matchesSize =
				sizeFilter === "all" || b.size === sizeFilter

			return matchesSearch && matchesSize
		})
	}, [bouquets, search, sizeFilter])

	/* ---------- PAGINATION ---------- */
	const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
	const paginated = filtered.slice(
		(page - 1) * ITEMS_PER_PAGE,
		page * ITEMS_PER_PAGE
	)

	// if (loading) {
	// 	return <p className="text-amber-700">Loading...</p>
	// }

	return (
		<div className="space-y-4">
			{/* FILTERS */}
			<div className="flex flex-wrap gap-3 items-center">
				<Input
					placeholder="Search by name or chocolate"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value)
						setPage(1)
					}}
					className="max-w-sm"
				/>

				<select
					value={sizeFilter}
					onChange={(e) => {
						setSizeFilter(e.target.value as any)
						setPage(1)
					}}
					className="border border-amber-200 rounded-lg px-3 py-2 text-sm bg-white"
				>
					<option value="all">All Sizes</option>
					<option value="Small">Small</option>
					<option value="Medium">Medium</option>
					<option value="Large">Large</option>
				</select>
			</div>

			{/* TABLE */}
			<div className="overflow-x-auto border border-amber-200 rounded-lg">
				<table className="w-full border border-amber-200 rounded-lg overflow-hidden">
					<thead className="bg-amber-100 text-amber-900">
					<tr>
						<th className="px-4 py-3 text-left text-sm font-semibold">Image</th>
						<th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
						<th className="px-4 py-3 text-left text-sm font-semibold">Chocolate</th>
						<th className="px-4 py-3 text-left text-sm font-semibold">Size</th>
						<th className="px-4 py-3 text-left text-sm font-semibold">Occasion</th>
						<th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
						<th className="px-4 py-3 text-center text-sm font-semibold">
							Actions
						</th>
					</tr>
					</thead>

					<tbody className="divide-y divide-amber-200 bg-white">
					{loading? Array.from({ length: 5 }).map((_, i) => (
								<BouquetRowSkeleton key={i} />
							))
						: paginated.length === 0 ? (
						<tr>
							<td
								colSpan={7}
								className="px-4 py-6 text-center text-sm text-gray-500"
							>
								No bouquets found
							</td>
						</tr>
					) : (
						paginated.map((b) => (
							<tr key={b._id} className="hover:bg-amber-50">
								<td className="px-4 py-3">
									<div className="w-16 h-16 rounded-md overflow-hidden bg-amber-50">
										<img
											src={b.imageUrl}
											alt={b.name}
											className="w-full h-full object-cover"
										/>
									</div>
								</td>

								<td className="px-4 py-3 font-medium text-amber-900">
									{b.name}
								</td>

								<td className="px-4 py-3 text-sm text-gray-600">
									{b.chocolateType}
								</td>

								<td className="px-4 py-3 text-sm text-gray-600">
									{b.size}
								</td>

								<td className="px-4 py-3 text-sm text-gray-600">
									{b.occasion || "—"}
								</td>

								<td className="px-4 py-3 font-bold text-amber-600">
									₹{b.price}
								</td>

								<td className="px-4 py-3">
									<div className="flex gap-2 justify-center">
										<Button
											size="sm"
											variant="outline"
											onClick={() => onEdit(b)}
										>
											Edit
										</Button>

										<AlertDialog>
											<AlertDialogTrigger asChild>
												<Button size="sm" variant="destructive">
													Delete
												</Button>
											</AlertDialogTrigger>

											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>
														Delete this bouquet?
													</AlertDialogTitle>
													<AlertDialogDescription>
														This action cannot be undone. This will permanently delete
														<span className="font-semibold text-foreground">
														  {" "}“{b.name}”
														</span>.
													</AlertDialogDescription>
												</AlertDialogHeader>

												<AlertDialogFooter>
													<AlertDialogCancel>
														Cancel
													</AlertDialogCancel>
													<AlertDialogAction
														onClick={() => onDelete(b._id)}
														className="bg-red-600 hover:bg-red-700"
													>
														Yes, delete
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>
									</div>
								</td>

							</tr>
						))
					)}
					</tbody>
				</table>
			</div>

			{/* PAGINATION */}
			{totalPages > 1 && (
				<div className="flex justify-between items-center">
					<p className="text-sm text-gray-600">
						Page {page} of {totalPages}
					</p>

					<div className="flex gap-2">
						<Button
							size="sm"
							variant="outline"
							disabled={page === 1}
							onClick={() => setPage((p) => p - 1)}
						>
							Previous
						</Button>
						<Button
							size="sm"
							variant="outline"
							disabled={page === totalPages}
							onClick={() => setPage((p) => p + 1)}
						>
							Next
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}
