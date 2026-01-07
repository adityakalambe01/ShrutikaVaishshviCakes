"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Painting {
	id?: string
	title: string
	artist: string
	price: number
	imageUrl: string
	medium: string
	dimensions: string
	description: string
}

interface Props {
	paintings: Painting[]
	onEdit: (painting: Painting) => void
	onDelete: (id?: string) => void
}

const ITEMS_PER_PAGE = 5

export default function PaintingsTable({ paintings, onEdit, onDelete }: Props) {
	const [search, setSearch] = useState("")
	const [mediumFilter, setMediumFilter] = useState("all")
	const [page, setPage] = useState(1)

	/* ---------- FILTERING ---------- */
	const filtered = useMemo(() => {
		return paintings.filter((p) => {
			const matchesSearch =
				p.title.toLowerCase().includes(search.toLowerCase()) ||
				p.artist.toLowerCase().includes(search.toLowerCase())

			const matchesMedium =
				mediumFilter === "all" || p.medium === mediumFilter

			return matchesSearch && matchesMedium
		})
	}, [paintings, search, mediumFilter])

	/* ---------- PAGINATION ---------- */
	const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
	const paginated = filtered.slice(
		(page - 1) * ITEMS_PER_PAGE,
		page * ITEMS_PER_PAGE
	)

	const uniqueMediums = Array.from(
		new Set(paintings.map((p) => p.medium))
	)

	return (
		<div className="space-y-4">
			{/* FILTERS */}
			<div className="flex flex-wrap gap-3 items-center">
				<Input
					placeholder="Search by title or artist"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value)
						setPage(1)
					}}
					className="max-w-sm"
				/>

				<select
					value={mediumFilter}
					onChange={(e) => {
						setMediumFilter(e.target.value)
						setPage(1)
					}}
					className="border border-amber-200 rounded-lg px-3 py-2 text-sm"
				>
					<option value="all">All Mediums</option>
					{uniqueMediums.map((m) => (
						<option key={m} value={m}>
							{m}
						</option>
					))}
				</select>
			</div>

			{/* TABLE */}
			<div className="overflow-x-auto border border-amber-200 rounded-lg">
				<table className="w-full text-sm">
					<thead className="bg-amber-50 text-amber-900">
					<tr>
						<th className="p-3 text-left">Image</th>
						<th className="p-3 text-left">Title</th>
						<th className="p-3 text-left">Medium</th>
						<th className="p-3 text-left">Dimensions</th>
						<th className="p-3 text-left">Price</th>
						<th className="p-3 text-left">Actions</th>
					</tr>
					</thead>

					<tbody>
					{paginated.length === 0 ? (
						<tr>
							<td colSpan={6} className="p-4 text-center text-gray-500">
								No paintings found
							</td>
						</tr>
					) : (
						paginated.map((p) => (
							<tr key={p.id} className="border-t">
								<td className="p-3">
									<div className="w-20 h-16 bg-amber-50 overflow-hidden rounded">
										<img
											src={p.imageUrl}
											alt={p.title}
											className="w-full h-full object-cover"
										/>
									</div>
								</td>
								<td className="p-3">
									<p className="font-medium">{p.title}</p>
									<p className="text-xs text-gray-500">
										by {p.artist}
									</p>
								</td>
								<td className="p-3">{p.medium}</td>
								<td className="p-3">{p.dimensions}</td>
								<td className="p-3 font-semibold text-amber-700">
									₹{p.price}
								</td>
								<td className="p-3">
									<div className="flex gap-2">
										<Button
											size="sm"
											variant="outline"
											onClick={() => onEdit(p)}
										>
											Edit
										</Button>
										<Button
											size="sm"
											variant="destructive"
											onClick={() => onDelete(p.id)}
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
