"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Eye,
  Star,
  Trash2,
  Mail,
  MailOpen, User, Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { cn } from "@/lib/utils"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {InquiryRowSkeleton} from "@/components/admin/skeletons/InquiryRowSkeleton";
import {InquiryCardSkeleton} from "@/components/admin/skeletons/InquiryCardSkeleton";

/* ---------- TYPES ---------- */
export interface Inquiry {
  _id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  isRead: boolean
  isStarred: boolean
  createdAt: string
}


const ITEMS_PER_PAGE = 10

interface InquiryDialogProps {
  onClick: (id:string) => void
  q: Inquiry
}
export function DeleteInquiryDialog({onClick, q}: InquiryDialogProps){
  return <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button size="icon" variant="ghost">
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </AlertDialogTrigger>

    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Delete this inquiry?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This inquiry will be permanently removed and cannot be recovered.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
            className="bg-destructive text-white hover:bg-destructive/90"
            onClick={() => onClick(q._id)}
        >
          Yes, delete inquiry
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
}

interface ViewInquiryDialogProps {
  inquiry: Inquiry,
  onClick: (inquiry: Inquiry) => void
}
export function ViewInquiryDialog({ inquiry, onClick }: ViewInquiryDialogProps) {
  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
              size="icon"
              variant="ghost"
              onClick={() => onClick(inquiry)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            {/* NAME */}
            <div className="flex gap-2 items-start">
              <User className="h-4 w-4 text-amber-600 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="font-medium">{inquiry.name}</p>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex gap-2 items-start">
              <Mail className="h-4 w-4 text-amber-600 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium">{inquiry.email}</p>
              </div>
            </div>

            {/* PHONE (optional) */}
            {inquiry.phone && (
                <div className="flex gap-2 items-start">
                  <Phone className="h-4 w-4 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="font-medium">{inquiry.phone}</p>
                  </div>
                </div>
            )}

            {/* SUBJECT */}
            <div>
              <p className="text-xs text-muted-foreground">Subject</p>
              <p className="font-medium">{inquiry.subject}</p>
            </div>

            {/* MESSAGE */}
            <div>
              <p className="text-xs text-muted-foreground">Message</p>
              <div className="mt-1 rounded-lg border bg-muted/40 p-3 whitespace-pre-wrap">
                {inquiry.message}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
  )
}

/* ---------- COMPONENT ---------- */
export default function InquiriesManager() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all")
  const [page, setPage] = useState(1)

  /* ---------- FETCH ---------- */
  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/inquiry")
      const data = await res.json()
      setInquiries(Array.isArray(data) ? data : data.inquiries ?? [])
    } catch (err) {
      console.error("Failed to fetch inquiries:", err)
    } finally {
      setLoading(false)
    }
  }

  /* ---------- FILTER + SEARCH ---------- */
  const filtered = useMemo(() => {
    return inquiries.filter((q) => {
      const matchesSearch =
          q.name.toLowerCase().includes(search.toLowerCase()) ||
          q.email.toLowerCase().includes(search.toLowerCase()) ||
          q.subject.toLowerCase().includes(search.toLowerCase())

      const matchesFilter =
          filter === "all" ||
          (filter === "unread" && !q.isRead) ||
          (filter === "starred" && q.isStarred)

      return matchesSearch && matchesFilter
    })
  }, [inquiries, search, filter])

  /* ---------- PAGINATION ---------- */
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)

  const paginated = filtered.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
  )

  /* ---------- ACTIONS ---------- */
  const toggleRead = async (id: string, value: boolean) => {
    setInquiries((prev) =>
        prev.map((q) => (q._id === id ? { ...q, isRead: value } : q))
    )

    await fetch(`/api/inquiry/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: value }),
    })
  }

  const toggleStar = async (id: string, value: boolean) => {
    setInquiries((prev) =>
        prev.map((q) => (q._id === id ? { ...q, isStarred: value } : q))
    )

    await fetch(`/api/inquiry/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isStarred: value }),
    })
  }

  const deleteInquiry = async (id: string) => {
    await fetch(`/api/inquiry/${id}`, { method: "DELETE" })
    setInquiries((prev) => prev.filter((q) => q._id !== id))
  }

  const viewInquiry = (q: Inquiry) => {
    if (!q.isRead) {
      toggleRead(q._id, true)
    }
  }

  /* ---------- UI ---------- */
  return (
      <div className="space-y-4">
        {/* ================= FILTER BAR ================= */}
        <div className="flex flex-wrap gap-3 items-center">
          <Input
              placeholder="Search by name, subject or email"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="max-w-sm"
          />

          <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value as any)
                setPage(1)
              }}
              className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
          >
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="starred">Starred</option>
          </select>
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
            </thead>

            <tbody>
            {
              loading?
                  Array.from({ length: 5 }).map((_, i) => (
                      <InquiryRowSkeleton key={i} />
                  ))
                  :
              paginated.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-muted-foreground">
                    No inquiries found
                  </td>
                </tr>
            ) : (
                paginated.map((q, index) => (
                    <tr
                        key={q._id}
                        className={cn(
                            "border-t hover:bg-muted/40",
                            !q.isRead && "bg-amber-50 font-semibold",
                        )}
                    >
                      <td className="p-3 text-xs text-muted-foreground">
                        #{ITEMS_PER_PAGE*(page-1)+index+1}
                      </td>

                      <td className="p-3 font-medium">{q.name}</td>

                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {q.isStarred && (
                              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                          )}
                          {q.subject}
                        </div>
                      </td>

                      <td className="p-3">
                        <div className="flex justify-center gap-2">
                          <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => toggleRead(q._id, !q.isRead)}
                          >
                            {q.isRead ? (
                                <MailOpen className="h-4 w-4" />
                            ) : (
                                <Mail className="h-4 w-4" />
                            )}
                          </Button>

                          <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => toggleStar(q._id, !q.isStarred)}
                          >
                            <Star
                                className={cn(
                                    "h-4 w-4",
                                    q.isStarred && "fill-amber-500 text-amber-500"
                                )}
                            />
                          </Button>

                          <ViewInquiryDialog inquiry={q} onClick={viewInquiry}/>

                          <DeleteInquiryDialog onClick={deleteInquiry} q={q}/>

                        </div>
                      </td>
                    </tr>
                ))
            )}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE LIST ================= */}
        <div className="md:hidden space-y-3">
          {
            loading ?
                Array.from({ length: 5 }).map((_, i) => (
                    <InquiryCardSkeleton key={i}/>
                ))
                :
            paginated.map((q, index) => (
              <div
                  key={q._id}
                  className={cn(
                      "rounded-lg border p-4",
                      !q.isRead && "bg-amber-50"
                  )}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{q.name}</p>
                    <p className="text-sm text-muted-foreground">{q.subject}</p>
                  </div>

                  {q.isStarred && (
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  )}
                </div>

                <div className="flex justify-between items-center pt-3">
              <span className="text-xs text-muted-foreground">
                #{ITEMS_PER_PAGE*(page-1)+index+1}
              </span>

                  <div className="flex gap-0.5">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => toggleRead(q._id, !q.isRead)}
                    >
                      {q.isRead ? (
                          <MailOpen className="h-4 w-4" />
                      ) : (
                          <Mail className="h-4 w-4" />
                      )}
                    </Button>

                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => toggleStar(q._id, !q.isStarred)}
                    >
                      <Star
                          className={cn(
                              "h-4 w-4",
                              q.isStarred && "fill-amber-500 text-amber-500"
                          )}
                      />
                    </Button>

                    <ViewInquiryDialog inquiry={q} onClick={viewInquiry}/>

                    <DeleteInquiryDialog onClick={deleteInquiry} q={q}/>
                  </div>
                </div>
              </div>
          ))}
        </div>

        {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
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
