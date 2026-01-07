"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

/* ---------- TYPES ---------- */
export interface Cake {
	_id?: string
	name: string
	flavor: string
	category: "Premium" | "Custom" | "Classic"
	price: number
	servings: number
	imageUrl: string
}

interface CakesTableProps {
	cakes: Cake[]
	loading: boolean
	onEdit: (cake: Cake) => void
	onDelete: (id?: string) => void
}

const ITEMS_PER_PAGE = 5

/* ---------- COMPONENT ---------- */
export default function CakesTable({
									   cakes,
									   loading,
									   onEdit,
									   onDelete,
								   }: CakesTableProps) {
	const [search, setSearch] = useState("")
	const [categoryFilter, setCategoryFilter] =
		useState<"all" | Cake["category"]>("all")
	const [page, setPage] = useState(1)

	/* ---------- FILTERING ---------- */
	const filtered = useMemo(() => {
		return cakes.filter((c) => {
			const matchesSearch =
				c.name.toLowerCase().includes(search.toLowerCase()) ||
				c.flavor.toLowerCase().includes(search.toLowerCase())

			const matchesCategory =
				categoryFilter === "all" || c.category === categoryFilter

			return matchesSearch && matchesCategory
		})
	}, [cakes, search, categoryFilter])

	/* ---------- PAGINATION ---------- */
	const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
	const paginated = filtered.slice(
		(page - 1) * ITEMS_PER_PAGE,
		page * ITEMS_PER_PAGE
	)

	if (loading) {
		return <p className="text-amber-700">Loading...</p>
	}

	return (
		<div className="space-y-4">
			{/* FILTERS */}
			<div className="flex flex-wrap gap-3 items-center">
				<Input
					placeholder="Search by name or flavor"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value)
						setPage(1)
					}}
					className="max-w-sm"
				/>

				<select
					value={categoryFilter}
					onChange={(e) => {
						setCategoryFilter(e.target.value as any)
						setPage(1)
					}}
					className="border border-amber-200 rounded-lg px-3 py-2 text-sm bg-white"
				>
					<option value="all">All Categories</option>
					<option value="Classic">Classic</option>
					<option value="Premium">Premium</option>
					<option value="Custom">Custom</option>
				</select>
			</div>

			{/* TABLE */}
			<div className="overflow-x-auto border border-amber-200 rounded-lg">
				<table className="w-full border border-amber-200 rounded-lg overflow-hidden">
					<thead className="bg-amber-100 text-amber-900">
					<tr>
						<th className="px-4 py-3 text-left text-sm font-semibold">Image</th>
						<th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
						<th className="px-4 py-3 text-left text-sm font-semibold">Flavor</th>
						<th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
						<th className="px-4 py-3 text-left text-sm font-semibold">Servings</th>
						<th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
						<th className="px-4 py-3 text-center text-sm font-semibold">
							Actions
						</th>
					</tr>
					</thead>

					<tbody className="divide-y divide-amber-200 bg-white">
					{paginated.length === 0 ? (
						<tr>
							<td
								colSpan={7}
								className="px-4 py-6 text-center text-sm text-gray-500"
							>
								No cakes found
							</td>
						</tr>
					) : (
						paginated.map((c) => (
							<tr key={c._id} className="hover:bg-amber-50">
								<td className="px-4 py-3">
									<div className="w-16 h-16 rounded-md overflow-hidden bg-amber-50">
										<img
											src={c.imageUrl}
											alt={c.name}
											className="w-full h-full object-cover"
										/>
									</div>
								</td>

								<td className="px-4 py-3 font-medium text-amber-900">
									{c.name}
								</td>

								<td className="px-4 py-3 text-sm text-gray-600">
									{c.flavor}
								</td>

								<td className="px-4 py-3 text-sm text-gray-600">
									{c.category}
								</td>

								<td className="px-4 py-3 text-sm text-gray-600">
									{c.servings}
								</td>

								<td className="px-4 py-3 font-bold text-amber-600">
									₹{c.price}
								</td>

								<td className="px-4 py-3">
									<div className="flex gap-2 justify-center">
										<Button
											size="sm"
											variant="outline"
											onClick={() => onEdit(c)}
										>
											Edit
										</Button>
										<Button
											size="sm"
											variant="destructive"
											onClick={() => onDelete(c._id)}
										>
											Delete
										</Button>
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
