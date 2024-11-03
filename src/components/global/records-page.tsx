'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Trash2 } from "lucide-react"
import { useUser } from '@clerk/nextjs'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type Record = {
  id: string
  fileUrl: string
  inputText: string
  createdAt: string
}

const ITEMS_PER_PAGE = 5

export default function Records() {
  const { user } = useUser()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [records, setRecords] = useState<Record[]>([])
  const [loading, setLoading] = useState(true)
  const [isMobileView, setIsMobileView] = useState(false)

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 640)
    }
    
    checkMobileView()
    window.addEventListener('resize', checkMobileView)
    return () => window.removeEventListener('resize', checkMobileView)
  }, [])

  useEffect(() => {
    const fetchRecords = async () => {
      if (!user?.id) return
      setLoading(true)
      try {
        const res = await fetch(`/api/fetch?userId=${user.id}`)
        const data = await res.json()
        setRecords(data)
      } catch (error) {
        console.error("Error fetching audio data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecords()
  }, [user?.id])

  const filteredRecords = records.filter((record) =>
    record.fileUrl.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE)
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleDelete = async (id: string) => {
    try {
      const userId = user?.id
      if (!userId) return
      const response = await fetch(`/api/delete?userId=${userId}&id=${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setRecords(records.filter(record => record.id !== id))
      }
    } catch (error) {
      console.error("Error in delete request:", error)
    }
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const MobileCard = ({ record }: { record: Record }) => (
    <div className="bg-yellow-200 border-2 border-blue-600 rounded-lg p-3 mb-2">
      <div className="flex justify-between items-start mb-2">
        <div className="text-sm font-medium text-blue-600 break-all flex-1">
          {record.fileUrl.split('/').pop()}
        </div>
        <Button
          onClick={() => handleDelete(record.id)}
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-fuchsia-500 hover:bg-yellow-300 ml-2"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-sm text-blue-600 mb-2">
        {record.inputText.length > 50 ? `${record.inputText.slice(0, 50)}...` : record.inputText}
      </div>
      <div className="text-xs text-blue-600">
        {new Date(record.createdAt).toLocaleDateString()}
      </div>
    </div>
  )

  return (
    <div className="max-w-full bg-fuchsia-300 min-h-screen">
      <div className="w-full max-w-7xl mx-auto p-2 sm:p-4 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-blue-600">Recent Soniks</h2>

        <div className="relative max-w-md w-full">
          <Input
            type="text"
            placeholder="Search Soniks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 w-full border-4 border-blue-600 bg-yellow-200 text-blue-600 placeholder-blue-400 text-sm md:text-base"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
        </div>

        {loading ? (
          <p className="text-center text-xl text-blue-600">Loading...</p>
        ) : (
          <>
            {isMobileView ? (
              // Mobile card view
              <div className="space-y-2">
                {paginatedRecords.map((record) => (
                  <MobileCard key={record.id} record={record} />
                ))}
              </div>
            ) : (
              // Desktop table view
              <div className="w-full overflow-x-auto border-4 border-blue-600 bg-yellow-200 rounded-lg">
                <Table>
                  <TableCaption className="bg-blue-600 text-yellow-200 p-2 text-sm md:text-base">
                    List of your recent Soniks
                  </TableCaption>
                  <TableHeader className="bg-blue-600">
                    <TableRow>
                      <TableHead className="text-yellow-200 font-bold text-sm whitespace-nowrap w-1/4">File Name</TableHead>
                      <TableHead className="text-yellow-200 font-bold text-sm whitespace-nowrap w-2/4">Input Text</TableHead>
                      <TableHead className="text-yellow-200 font-bold text-sm whitespace-nowrap w-1/4">Date</TableHead>
                      <TableHead className="text-yellow-200 font-bold text-sm whitespace-nowrap w-16">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedRecords.map((record) => (
                      <TableRow key={record.id} className="border-t-2 border-blue-600">
                        <TableCell className="font-medium text-blue-600 text-sm break-all">
                          {record.fileUrl.split('/').pop()}
                        </TableCell>
                        <TableCell className="text-blue-600 text-sm">
                          <div className="max-w-xs overflow-hidden text-ellipsis">
                            {record.inputText.length > 50 ? `${record.inputText.slice(0, 50)}...` : record.inputText}
                          </div>
                        </TableCell>
                        <TableCell className="text-blue-600 text-sm whitespace-nowrap">
                          {new Date(record.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleDelete(record.id)}
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-fuchsia-500 hover:bg-yellow-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <div className="py-4 flex justify-center">
              <Pagination>
                <PaginationContent className="flex flex-wrap justify-center gap-1 sm:gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={`bg-blue-600 text-yellow-200 border-2 border-yellow-200 text-xs sm:text-sm ${
                        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-fuchsia-500'
                      }`}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => handlePageChange(i + 1)}
                        className={`${
                          currentPage === i + 1 ? 'bg-fuchsia-500' : 'bg-blue-600'
                        } text-yellow-200 border-2 border-yellow-200 hover:bg-fuchsia-500 text-xs sm:text-sm px-2 sm:px-3 py-1`}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={`bg-blue-600 text-yellow-200 border-2 border-yellow-200 text-xs sm:text-sm ${
                        currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-fuchsia-500'
                      }`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </div>
    </div>
  )
}