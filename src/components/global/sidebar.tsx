// Sidebar.tsx
import { Settings2, MessageCircle, FileText, CreditCard, Settings } from "lucide-react";
import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className="h-screen w-48 bg-black border-r-[1px] border-gray-700 text-white">
      <div className="p-4 text-2xl font-semibold">Sonik</div>
      <ul className="mt-6">
        <Link href="/dashboard">
        <li className="p-4 flex items-center hover:bg-gray-700 cursor-pointer">
          <Settings2 className="w-6 h-6 mr-3" />
          <span>New Sonik</span>
        </li>
        </Link>
        <Link href="/dashboard/records">
        <li className="p-4 flex items-center hover:bg-gray-700 cursor-pointer">
          <MessageCircle className="w-6 h-6 mr-3" />
          <span>Records</span>
        </li>
        </Link>
        <Link href="/dashboard/quota">
        <li className="p-4 flex items-center hover:bg-gray-700 cursor-pointer">
          <FileText className="w-6 h-6 mr-3" />
          <span>Quota</span>
        </li>
        </Link>
        <Link href="/dashboard/billings">
        <li className="p-4 flex items-center hover:bg-gray-700 cursor-pointer">
          <CreditCard className="w-6 h-6 mr-3" />
          <span>Billings</span>
        </li>
        </Link>
        <Link href="/dashboard/settings">
        <li className="p-4 flex items-center hover:bg-gray-700 cursor-pointer">
          <Settings className="w-6 h-6 mr-3" />
          <span>Settings</span>
        </li>
        </Link>
      </ul>
    </div>
    
  );
};

export default Sidebar;
