"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {toastError, toastSuccess} from "@/lib/toast.service";

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        const data = await response.json()
        toastSuccess("Login successful. Welcome back!")
        localStorage.setItem("adminToken", data.token)
        router.push("/admin/dashboard")
      } else {
        toastError("Invalid password")
      }
    } catch (err) {
      toastError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-amber-900 mb-2 text-center">Admin Login</h1>
        <p className="text-amber-700 text-center mb-6">Manage your cakes, bouquets & paintings</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">Admin Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-amber-600 hover:bg-amber-700">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/*<p className="text-xs text-amber-600 text-center mt-4"></p>*/}
      </div>
    </div>
  )
}
