"use client";

import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Topbar() {
  return (
    <div className="flex justify-between items-center p-2 md:p-4 bg-blue-600 border-b-4 border-yellow-200">
      <div className="w-16 md:w-auto md:flex-1">
        <h1 className="hidden md:block text-3xl font-bold text-yellow-200">Sonik</h1>
      </div>
      
      <h1 className="md:hidden text-xl font-bold text-yellow-200 absolute left-1/2 -translate-x-1/2">Sonik</h1>
      
      <div className="flex items-center space-x-2 md:space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                className="bg-yellow-200 text-blue-600 border-2 border-fuchsia-500 hover:bg-fuchsia-300 text-sm md:text-base px-2 md:px-4 py-1 md:py-2"
              >
                Help
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
        <UserButton 
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "w-8 h-8 md:w-10 md:h-10"
            }
          }}
        />
      </div>
    </div>
  );
}

export default Topbar;