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
      if (!userId) {
        console.error("User not authenticated")
        return
      }

      const response = await fetch(`/api/delete?userId=${userId}&id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        console.log("Record deleted successfully")
        setRecords(records.filter(record => record.id !== id))
      } else {
        const errorData = await response.json()
        console.error("Error deleting record:", errorData.error)
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

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6 bg-fuchsia-300 min-h-screen">
      <h2 className="text-2xl md:text-4xl font-bold text-blue-600">Recent Soniks</h2>

      <div className="relative">
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
        <p className="text-center text-xl md:text-2xl text-blue-600">Loading...</p>
      ) : (
        <>
          <div className="border-4 border-blue-600 bg-yellow-200 rounded-lg overflow-x-auto">
            <Table>
              <TableCaption className="bg-blue-600 text-yellow-200 p-2 text-base md:text-lg">
                List of your recent Soniks
              </TableCaption>
              <TableHeader className="bg-blue-600">
                <TableRow>
                  <TableHead className="text-yellow-200 font-bold text-sm md:text-base whitespace-nowrap">File Name</TableHead>
                  <TableHead className="text-yellow-200 font-bold text-sm md:text-base whitespace-nowrap">Input Text</TableHead>
                  <TableHead className="text-yellow-200 font-bold text-sm md:text-base whitespace-nowrap">Date Processed</TableHead>
                  <TableHead className="text-yellow-200 font-bold text-sm md:text-base whitespace-nowrap">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRecords.map((record) => (
                  <TableRow key={record.id} className="border-t-2 border-blue-600">
                    <TableCell className="font-medium text-blue-600 text-sm md:text-base break-all">{record.fileUrl.split('/').pop()}</TableCell>
                    <TableCell className="text-blue-600 text-sm md:text-base break-all">  {record.inputText.length > 50 ? record.inputText.slice(0, 50) + '...' : record.inputText}
                    </TableCell>
                    <TableCell className="text-blue-600 text-sm md:text-base whitespace-nowrap">{new Date(record.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDelete(record.id)}
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-fuchsia-500 hover:bg-yellow-300"
                      >
                        <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Pagination>
            <PaginationContent className="flex flex-wrap justify-center gap-2">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`bg-blue-600 text-yellow-200 border-2 border-yellow-200 text-sm md:text-base ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-fuchsia-500'}`}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => handlePageChange(i + 1)}
                    className={`${currentPage === i + 1 ? 'bg-fuchsia-500' : 'bg-blue-600'} text-yellow-200 border-2 border-yellow-200 hover:bg-fuchsia-500 text-sm md:text-base`}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`bg-blue-600 text-yellow-200 border-2 border-yellow-200 text-sm md:text-base ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-fuchsia-500'}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  )
}