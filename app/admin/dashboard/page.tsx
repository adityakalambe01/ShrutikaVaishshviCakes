"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    LayoutDashboard,
    Cake,
    Gift,
    Palette,
    LogOut,
    Menu,
    ShoppingBag,
    MailOpen,
    LucideIcon,
    Settings
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import CakesManager from "@/components/admin/cakes-manager"
import BouquetsManager from "@/components/admin/bouquets-manager"
import PaintingsManager from "@/components/admin/paintings-manager"
import SettingsManager from "@/components/admin/settings-manager"
import InquiryManager from "@/components/admin/inquiry-manager"
import OrderManager from "@/components/admin/order-manager"

/* ---------- SIDEBAR ITEM ---------- */
function SidebarItem({
                       icon: Icon,
                       label,
                       active,
                       onClick,
                     }: any) {
  return (
      <button
          onClick={onClick}
          className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm transition ${
              active
                  ? "bg-amber-100 text-amber-900 font-medium"
                  : "text-amber-700 hover:bg-amber-50"
          }`}
      >
        <Icon className="h-4 w-4" />
        {label}
      </button>
  )
}

interface SidebarLinkProps {
    icon: LucideIcon,
    label: string,
    base: string
}

const linksConstant = {
    cakes:{
        base: "cakes",
        label: "Cakes"
    },
    bouquets:{
        base: "bouquets",
        label: "Bouquets"
    },
    paintings:{
        base: "paintings",
        label: "Paintings"
    },
    orders:{
        base: "orders",
        label: "Orders"
    },
    inquiry:{
        base: "inquiry",
        label: "Inquiry Messages"
    },
    settings:{
        base: "settings",
        label: "Settings"
    }
}

const sidebarLinks: SidebarLinkProps[] = [
    { icon: Cake, label: linksConstant.cakes.label, base: linksConstant.cakes.base },
    { icon: Gift, label: linksConstant.bouquets.label, base: linksConstant.bouquets.base },
    { icon: Palette, label: linksConstant.paintings.label, base: linksConstant.paintings.base },
    { icon: ShoppingBag, label: linksConstant.orders.label, base: linksConstant.orders.base },
    { icon: MailOpen, label: linksConstant.inquiry.label, base: linksConstant.inquiry.base },
    { icon: Settings, label: linksConstant.settings.label, base: linksConstant.settings.base },

]
/* ---------- SIDEBAR CONTENT ---------- */
function SidebarContent({
                          active,
                          setActive,
                          onLogout,
                        }: any) {
  return (
      <div className="flex flex-col h-full">
        {/* HEADER */}
        <div className="p-6 border-b border-amber-100">
          <h2 className="text-2xl font-bold text-amber-900">
            Admin Panel
          </h2>
          <p className="text-sm text-amber-600 mt-1">
            Cake Artistry
          </p>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {
                sidebarLinks.map(({icon, label, base}: SidebarLinkProps, index: number) => (
                    <SidebarItem
                        key={index}
                        icon={icon}
                        label={label}
                        active={active === base}
                        onClick={() => setActive(base)}
                    />
                ))
            }
          {/*<SidebarItem*/}
          {/*    icon={Cake}*/}
          {/*    label="Cakes"*/}
          {/*    active={active === "cakes"}*/}
          {/*    onClick={() => setActive("cakes")}*/}
          {/*/>*/}
          {/*<SidebarItem*/}
          {/*    icon={Gift}*/}
          {/*    label="Bouquets"*/}
          {/*    active={active === "bouquets"}*/}
          {/*    onClick={() => setActive("bouquets")}*/}
          {/*/>*/}
          {/*<SidebarItem*/}
          {/*    icon={Palette}*/}
          {/*    label="Paintings"*/}
          {/*    active={active === "paintings"}*/}
          {/*    onClick={() => setActive("paintings")}*/}
          {/*/>*/}
          {/*<SidebarItem*/}
          {/*    icon={ShoppingBag}*/}
          {/*    label="Orders"*/}
          {/*    active={active === "orders"}*/}
          {/*    onClick={() => setActive("orders")}*/}
          {/*/>*/}
          {/*<SidebarItem*/}
          {/*    icon={MailOpen}*/}
          {/*    label="Inquiry Messages"*/}
          {/*    active={active === "inquiry"}*/}
          {/*    onClick={() => setActive("inquiry")}*/}
          {/*/>*/}
          {/*<SidebarItem*/}
          {/*    icon={LayoutDashboard}*/}
          {/*    label="Settings"*/}
          {/*    active={active === "settings"}*/}
          {/*    onClick={() => setActive("settings")}*/}
          {/*/>*/}
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-amber-100">
          <Button
              variant="outline"
              className="w-full border-amber-300 text-amber-900 hover:text-amber-950 hover:bg-amber-50"
              onClick={onLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
  )
}

export default function AdminDashboard() {
  const [active, setActive] = useState(linksConstant.cakes.base)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) router.push("/admin/login")
    else setIsAuthenticated(true)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    router.push("/admin/login")
  }

  if (!isAuthenticated) return null

  return (
      <div className="flex h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        {/* ================= DESKTOP SIDEBAR ================= */}
        <aside className="hidden md:flex w-64 bg-white border-r border-amber-200 h-screen sticky top-0">
          <SidebarContent
              active={active}
              setActive={setActive}
              onLogout={handleLogout}
          />
        </aside>

        {/* ================= MAIN ================= */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* MOBILE HEADER */}
          <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-amber-200">
            <h1 className="text-lg font-bold text-amber-900">
              Admin Panel
            </h1>

            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="p-0 w-64">
                <SidebarContent
                    active={active}
                    setActive={setActive}
                    onLogout={handleLogout}
                />
              </SheetContent>
            </Sheet>
          </header>

          {/* CONTENT */}
          <main className="flex-1 overflow-y-auto p-6">
            {active === linksConstant.settings.base && <SettingsManager />}
            {active === linksConstant.cakes.base && <CakesManager />}
            {active === linksConstant.bouquets.base && <BouquetsManager />}
            {active === linksConstant.paintings.base && <PaintingsManager />}
            {active === linksConstant.orders.base && <OrderManager/>}
            {active === linksConstant.inquiry.base && <InquiryManager/>}
          </main>
        </div>
      </div>
  )
}
