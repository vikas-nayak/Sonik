"use client";
import Sidebar from '@/components/global/sidebar';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { LucideSearch, LucideTrash2 } from 'lucide-react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useUser } from '@clerk/nextjs';

const ITEMS_PER_PAGE = 5;

function RecordsPage() {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [records, setRecords] = useState([]);
  // const [loading, setLoading] = useState(true);

  // Fetch data from the backend API
  useEffect(() => {
    const fetchRecords = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(`/api/fetch?userId=${user.id}`);
        const data = await res.json();
        setRecords(data);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching audio data:", error);
        // setLoading(false);
      }
    };

    fetchRecords();
  }, [user?.id]);

  const filteredRecords = records.filter((record: any) =>
    record.fileUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  //function to delete a record
  const handleDelete = async (id: string) => {
    try {
      const userId = user?.id;
      if (!userId) {
        console.error("User not authenticated");
        return;
      }
  
      const response = await fetch(`/api/delete?userId=${userId}&id=${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log("Record deleted successfully");
        //@ts-ignore
        setRecords(records.filter(record => record.id !== id));
      } else {
        const errorData = await response.json();
        console.error("Error deleting record:", errorData.error);
      }
    } catch (error) {
      console.error("Error in delete request:", error);
    }
  };
  
  

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // if (loading) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="h-screen grid grid-cols-[218px_1fr] bg-black">
      <Sidebar />
      <div className="p-8 text-white">
        <h1 className="text-2xl font-semibold mb-6">Recent Soniks</h1>

        <div className="relative mb-6">
          <Input 
            type="text" 
            placeholder="Search Soniks..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 w-full rounded border"
          />
          <LucideSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden text-black">
          <Table className="w-full">
            <TableCaption className="p-4 bg-gray-50 text-black">
              A list of your recent Soniks.
            </TableCaption>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-[150px] p-4">File Name</TableHead>
                <TableHead className="w-[300px] p-4">Input Text</TableHead>
                <TableHead className="p-4">Date Processed</TableHead>
                <TableHead className="p-4">Status</TableHead>
                <TableHead className="text-right p-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRecords.length > 0 ? (
                paginatedRecords.map((record: any) => (
                  <TableRow key={record.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium p-4">
                      {truncateText(record.fileUrl.split('/').pop(), 20)}
                    </TableCell>
                    <TableCell className="p-4">
                      {truncateText(record.inputText, 50)}
                    </TableCell>
                    <TableCell className="p-4">
                      {new Date(record.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="p-4">Completed</TableCell>
                    <TableCell className="text-right p-4">
                      <button 
                        onClick={() => handleDelete(record.id)} 
                        className="text-red-500"
                      >
                        <LucideTrash2 size={20} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center p-4">No records found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={() => handlePageChange(currentPage - 1)} 
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink 
                    href="#" 
                    onClick={() => handlePageChange(i + 1)} 
                    isActive={i + 1 === currentPage}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {totalPages > 3 && <PaginationEllipsis />}

              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={() => handlePageChange(currentPage + 1)} 
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default RecordsPage;
