"use client";

import { UserButton } from "@clerk/nextjs"; // Clerk UserButton import
import { Button } from "@/components/ui/button"; // shadcn Button component
import { Input } from "@/components/ui/input";  // shadcn Input component
import { Label } from "@/components/ui/label";  // shadcn Label component

function Topbar() {
  return (
    <div className="flex justify-end items-center p-4 shadow-md">
      <div className="flex items-center space-x-4">
        <UserButton afterSignOutUrl="/" /> {/* Clerk's UserButton */}
      </div>
      </div>

  );
}

export default Topbar;
