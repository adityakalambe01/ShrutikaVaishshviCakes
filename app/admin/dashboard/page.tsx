"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CakesManager from "@/components/admin/cakes-manager"
import BouquetsManager from "@/components/admin/bouquets-manager"
import PaintingsManager from "@/components/admin/paintings-manager"
import SettingsManager from "@/components/admin/settings-manager"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-amber-900">Admin Dashboard</h1>
            <p className="text-amber-700 mt-1">Manage all your content</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-amber-300 bg-transparent">
            Logout
          </Button>
        </div>

        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-amber-100">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="cakes">Cakes</TabsTrigger>
            <TabsTrigger value="bouquets">Bouquets</TabsTrigger>
            <TabsTrigger value="paintings">Paintings</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="mt-6">
            <SettingsManager />
          </TabsContent>

          <TabsContent value="cakes" className="mt-6">
            <CakesManager />
          </TabsContent>

          <TabsContent value="bouquets" className="mt-6">
            <BouquetsManager />
          </TabsContent>

          <TabsContent value="paintings" className="mt-6">
            <PaintingsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
