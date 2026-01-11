"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 px-4">
			<div className="max-w-xl w-full text-center">
				{/* 404 TEXT */}
				<h1 className="text-[7rem] sm:text-[9rem] font-extrabold text-amber-600 leading-none">
					404
				</h1>

				{/* MESSAGE */}
				<h2 className="mt-2 text-2xl sm:text-3xl font-bold text-amber-900">
					Oops! Page not found
				</h2>

				<p className="mt-3 text-sm sm:text-base text-amber-800/80">
					The page you’re looking for doesn’t exist or may have been moved.
					Let’s get you back to something delicious 🍰
				</p>

				{/* ACTIONS */}
				<div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
					<Button
						asChild
						className="bg-gradient-to-r from-amber-600 to-orange-600 hover:opacity-90"
					>
						<Link href="/">
							<Home className="mr-2 h-4 w-4" />
							Go to Home
						</Link>
					</Button>

					<Button
						variant="outline"
						onClick={() => window.history.back()}
						className="border-amber-300"
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Go Back
					</Button>
				</div>
			</div>
		</div>
	)
}
