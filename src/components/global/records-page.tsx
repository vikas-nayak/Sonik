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
import React, { useState } from 'react';
import { Input } from '@/components/ui/input'; // Shadcn Input
import { LucideSearch } from 'lucide-react'; // Lucide Search Icon

// Importing the pagination components from Shadcn
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const mockRecords = [
  {
    id: 1,
    fileName: "sonik1.wav",
    dateProcessed: "2024-09-08",
    status: "Completed",
    processedUrl: "/path/to/sonik1.wav",
  },
  {
    id: 2,
    fileName: "sonik2.mp3",
    dateProcessed: "2024-09-07",
    status: "In Progress",
    processedUrl: "/path/to/sonik2.mp3",
  },
  // Add more records here...
];

const ITEMS_PER_PAGE = 5; // Number of items per page

function RecordsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRecords = mockRecords.filter((record) =>
    record.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePlayAudio = (url: string) => {
    console.log(`Playing: ${url}`);
  };

  const handleDownloadAudio = (url: string) => {
    console.log(`Downloading: ${url}`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

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
                <TableHead className="p-4">Date Processed</TableHead>
                <TableHead className="p-4">Status</TableHead>
                <TableHead className="text-right p-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRecords.length > 0 ? (
                paginatedRecords.map((record) => (
                  <TableRow key={record.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium p-4">{record.fileName}</TableCell>
                    <TableCell className="p-4">{record.dateProcessed}</TableCell>
                    <TableCell className="p-4">{record.status}</TableCell>
                    <TableCell className="text-right p-4">
                      <button 
                        onClick={() => handlePlayAudio(record.processedUrl)} 
                        className="mr-4 text-blue-500"
                      >
                        Play
                      </button>
                      <button 
                        onClick={() => handleDownloadAudio(record.processedUrl)} 
                        className="text-green-500"
                      >
                        Download
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center p-4">No records found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Component */}
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={() => handlePageChange(currentPage - 1)} 
                />
              </PaginationItem>

              {/* Generate Pagination Links */}
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
