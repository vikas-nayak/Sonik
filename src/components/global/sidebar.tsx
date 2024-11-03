"use client";
import { useState } from 'react';
import { Settings2, MessageCircle, FileText, CreditCard, Settings, Menu } from "lucide-react";
import Link from 'next/link';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('/dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-2 left-4 z-50 p-2 bg-blue-600 rounded-md md:hidden text-yellow-200"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:static
        h-screen 
        w-64 md:w-48 
        bg-blue-600 
        border-r-4 
        border-yellow-200 
        text-yellow-200
        transform 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
        transition-transform
        duration-200
        ease-in-out
        z-40
      `}>
        <ul className="mt-16 md:mt-6">
          <Link href="/dashboard/new-sonik">
            <li
              onClick={() => {
                setActiveTab('/dashboard');
                setIsMobileMenuOpen(false);
              }}
              className={`p-4 flex items-center ${activeTab === '/dashboard' ? 'bg-fuchsia-500' : ''} hover:bg-fuchsia-500 cursor-pointer`}
            >
              <Settings2 className="w-5 h-5 md:w-6 md:h-6 mr-3" />
              <span className="text-sm md:text-base">New Sonik</span>
            </li>
          </Link>
          <Link href="/dashboard/records">
            <li
              onClick={() => {
                setActiveTab('/dashboard/records');
                setIsMobileMenuOpen(false);
              }}
              className={`p-4 flex items-center ${activeTab === '/dashboard/records' ? 'bg-fuchsia-500' : ''} hover:bg-fuchsia-500 cursor-pointer`}
            >
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6 mr-3" />
              <span className="text-sm md:text-base">Records</span>
            </li>
          </Link>
          <Link href="/dashboard/quota">
            <li
              onClick={() => {
                setActiveTab('/dashboard/quota');
                setIsMobileMenuOpen(false);
              }}
              className={`p-4 flex items-center ${activeTab === '/dashboard/quota' ? 'bg-fuchsia-500' : ''} hover:bg-fuchsia-500 cursor-pointer`}
            >
              <FileText className="w-5 h-5 md:w-6 md:h-6 mr-3" />
              <span className="text-sm md:text-base">Quota</span>
            </li>
          </Link>
          <Link href="/dashboard/billings">
            <li
              onClick={() => {
                setActiveTab('/dashboard/billings');
                setIsMobileMenuOpen(false);
              }}
              className={`p-4 flex items-center ${activeTab === '/dashboard/billings' ? 'bg-fuchsia-500' : ''} hover:bg-fuchsia-500 cursor-pointer`}
            >
              <CreditCard className="w-5 h-5 md:w-6 md:h-6 mr-3" />
              <span className="text-sm md:text-base">Billings</span>
            </li>
          </Link>
          <Link href="/dashboard/settings">
            <li
              onClick={() => {
                setActiveTab('/dashboard/settings');
                setIsMobileMenuOpen(false);
              }}
              className={`p-4 flex items-center ${activeTab === '/dashboard/settings' ? 'bg-fuchsia-500' : ''} hover:bg-fuchsia-500 cursor-pointer`}
            >
              <Settings className="w-5 h-5 md:w-6 md:h-6 mr-3" />
              <span className="text-sm md:text-base">Settings</span>
            </li>
          </Link>
        </ul>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;