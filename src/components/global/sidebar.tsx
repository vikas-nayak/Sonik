// Sidebar.tsx
import { Settings2, MessageCircle, FileText, CreditCard, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="h-screen w-48 bg-black border-r-[1px] border-gray-700 text-white">
      <div className="p-4 text-2xl font-semibold">Sonic</div>
      <ul className="mt-6">
        <li className="p-4 flex items-center hover:bg-gray-700 cursor-pointer">
          <Settings2 className="w-6 h-6 mr-3" />
          <span>New Sonic</span>
        </li>
        <li className="p-4 flex items-center hover:bg-gray-700 cursor-pointer">
          <MessageCircle className="w-6 h-6 mr-3" />
          <span>Records</span>
        </li>
        <li className="p-4 flex items-center hover:bg-gray-700 cursor-pointer">
          <FileText className="w-6 h-6 mr-3" />
          <span>Quota</span>
        </li>
        <li className="p-4 flex items-center hover:bg-gray-700 cursor-pointer">
          <CreditCard className="w-6 h-6 mr-3" />
          <span>Billings</span>
        </li>
        <li className="p-4 flex items-center hover:bg-gray-700 cursor-pointer">
          <Settings className="w-6 h-6 mr-3" />
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
