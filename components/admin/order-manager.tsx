"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent, AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Eye, Trash2 } from "lucide-react"
import {OrderRowSkeleton} from "@/components/admin/skeletons/OrderRowSkeleton";
import {OrderCardSkeleton} from "@/components/admin/skeletons/OrderCardSkeleton";
import { cakeBudgetCategoriesConstant, cakeSizePreferenceConstant } from "@/lib/constant";

/* ---------- TYPES ---------- */
interface Order {
	_id: string
	name: string
	email: string
	phone: string
	eventDate: string
	numberOfGuests: number
	cakeSizePreference: string
	cakeDesignDescription: string
	budget: string
}

const ITEMS_PER_PAGE = 5

interface OrderDialogProps {
	order:Order,
	onClick: (_id: string) => void
}
/* ---------- COMPONENT ---------- */
function DeleteOrderDialog({order, onClick}: OrderDialogProps){
	return <AlertDialog>
		<AlertDialogTrigger asChild>
			<Button size="icon" variant="ghost">
				<Trash2 className="h-4 w-4 text-destructive" />
			</Button>
		</AlertDialogTrigger>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>
					Delete this order?
				</AlertDialogTitle>
				<AlertDialogDescription>
					This will permanently remove the order and all associated details.
					This action cannot be undone.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction
					className="bg-destructive"
					onClick={() => onClick(order._id)}
				>
					Delete
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
}
export default function OrdersManager() {
	const [orders, setOrders] = useState<Order[]>([])
	const [loading, setLoading] = useState(true)
	const [page, setPage] = useState(1)
	const [selected, setSelected] = useState<Order | null>(null)

	/* ---------- FETCH ---------- */
	useEffect(() => {
		fetchOrders()
	}, [])

	const fetchOrders = async () => {
		try {
			const res = await fetch("/api/orders")
			const data = await res.json()
			setOrders(Array.isArray(data) ? data : data.orders ?? [])
		} catch (err) {
			console.error("Failed to fetch orders", err)
		} finally {
			setLoading(false)
		}
	}

	/* ---------- DELETE ---------- */
	const deleteOrder = async (id?: string) => {
		if (!id) return
		await fetch(`/api/orders/${id}`, { method: "DELETE" })
		fetchOrders()
	}

	/* ---------- PAGINATION ---------- */
	const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE)
	const paginated = useMemo(
		() =>
			orders.slice(
				(page - 1) * ITEMS_PER_PAGE,
				page * ITEMS_PER_PAGE
			),
		[orders, page]
	)

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold text-amber-900">
				Custom Cake Orders
			</h2>

			{/* ---------- TABLE (DESKTOP) ---------- */}
			<div className="hidden md:block overflow-x-auto border border-amber-200 rounded-lg bg-white">
				<table className="w-full text-sm">
					<thead className="bg-amber-100 text-amber-900">
					<tr>
						<th className="px-4 py-3 text-left">ID</th>
						<th className="px-4 py-3 text-left">Name</th>
						<th className="px-4 py-3 text-left">Phone</th>
						<th className="px-4 py-3 text-left">Email</th>
						<th className="px-4 py-3 text-left">Event Date</th>
						<th className="px-4 py-3 text-center">Actions</th>
					</tr>
					</thead>

					<tbody className="divide-y">
					{
						loading?
							Array.from({ length: 5 }).map((_, i) => (
								<OrderRowSkeleton key={i} />
							))
							:
						paginated.length === 0 ?
							(
								<tr>
									<td
										colSpan={7}
										className="px-4 py-6 text-center text-sm text-gray-500"
									>
										No orders found
									</td>
								</tr>
							)
							:
						paginated.map((o) => (
						<tr key={o._id} className="hover:bg-amber-50">
							<td className="px-4 py-3 text-xs text-gray-500">
								{o._id?.slice(-6)}
							</td>
							<td className="px-4 py-3 font-medium">{o.name}</td>
							<td className="px-4 py-3">{o.phone}</td>
							<td className="px-4 py-3">{o.email}</td>
							<td className="px-4 py-3">
								{new Date(o.eventDate).toLocaleDateString()}
							</td>
							<td className="px-4 py-3">
								<div className="flex gap-2 justify-center">
									<Button
										size="icon"
										variant="outline"
										onClick={() => setSelected(o)}
									>
										<Eye className="h-4 w-4" />
									</Button>

									<DeleteOrderDialog order={o} onClick={deleteOrder} />
								</div>
							</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>

			{/* ---------- MOBILE LIST ---------- */}
			<div className="md:hidden space-y-4">
				{
					loading?
						Array.from({ length: 4 }).map((_, i) => (
							<OrderCardSkeleton key={i} />
						))
						:
					paginated.map((o) => (
					<div
						key={o._id}
						className="border border-amber-200 rounded-lg p-4 bg-white"
					>
						<p className="font-semibold">{o.name}</p>
						<p className="text-sm text-gray-600">{o.phone}</p>
						<p className="text-sm text-gray-600">{o.email}</p>
						<p className="text-sm text-gray-500">
							Event: {new Date(o.eventDate).toLocaleDateString()}
						</p>

						<div className="flex gap-2 mt-3">
							<Button
								size="icon"
								variant="outline"
								onClick={() => setSelected(o)}
							>
								<Eye className="h-4 w-4" />
							</Button>

							<DeleteOrderDialog order={o} onClick={deleteOrder} />
						</div>
					</div>
				))}
			</div>

			{/* ---------- PAGINATION ---------- */}
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

			{/* ---------- VIEW DIALOG ---------- */}
			<Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
				<DialogContent className="sm:max-w-lg">
					<DialogHeader>
						<DialogTitle>Order Details</DialogTitle>
					</DialogHeader>

					{selected && (
						<div className="space-y-4 text-sm text-foreground">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
								<div>
      <span className="font-semibold text-muted-foreground">
        Customer Name
      </span>
									<p className="break-words">{selected.name}</p>
								</div>

								<div>
      <span className="font-semibold text-muted-foreground">
        Email Address
      </span>
									<p className="break-all sm:break-words">
										{selected.email}
									</p>
								</div>

								<div>
      <span className="font-semibold text-muted-foreground">
        Phone Number
      </span>
									<p className="break-words">
										{selected.phone || "Not provided"}
									</p>
								</div>

								<div>
      <span className="font-semibold text-muted-foreground">
        Event Date
      </span>
									<p>
										{new Date(selected.eventDate).toLocaleDateString()}
									</p>
								</div>

								<div>
      <span className="font-semibold text-muted-foreground">
        Number of Guests
      </span>
									<p>{selected.numberOfGuests || "Not mentioned"}</p>
								</div>

								<div>
      <span className="font-semibold text-muted-foreground">
        Preferred Cake Size
      </span>
									<p>
										{cakeSizePreferenceConstant.find(
											(item) => item.value === selected.cakeSizePreference
										)?.label || "Not mentioned"}
									</p>
								</div>

								<div className="sm:col-span-2">
      <span className="font-semibold text-muted-foreground">
        Estimated Budget
      </span>
									<p>
										{cakeBudgetCategoriesConstant.find(
											(item) => item.value === selected.budget
										)?.label || "Not mentioned"}
									</p>
								</div>
							</div>

							<div className="pt-4 border-t">
								<p className="font-semibold text-muted-foreground mb-1">
									Cake Design Description
								</p>
								<p className="leading-relaxed break-words text-foreground/90">
									{selected.cakeDesignDescription || "No design details provided."}
								</p>
							</div>
						</div>


					)}
				</DialogContent>
			</Dialog>
		</div>
	)
}
