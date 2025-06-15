// src/components/AdminHeader.jsx

import React from "react";
import { Search, Bell, ChevronDown } from "lucide-react";

export default function AdminHeader() {
  return (
    // Nền trắng, có đường viền dưới để tách biệt với nội dung
    <header className="fixed bg-white h-hheader [width:calc(100vw-var(--spacing-wsidebar))] border-b border-gray-200 z-30">
      <div className="flex h-full justify-between items-center px-6">
        {/* Search Bar */}
        <div className="relative"></div>

        {/* User Profile & Actions */}
        <div className="flex items-center space-x-5">
          <button className="relative text-gray-500 hover:text-pblue">
            <Bell size={22} />
            {/* Notification dot */}
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="h-8 w-px bg-gray-200"></div> {/* Separator */}
          <button className="flex items-center space-x-2 text-left hover:bg-gray-100 p-2 rounded-lg">
            <img
              className="rounded-full h-10 w-10 object-cover"
              src="/defaultAvatar.jpg"
              alt="Admin Avatar"
            />
            <div className="hidden sm:block">
              <div className="font-semibold text-sm text-gray-800">
                Admin Name
              </div>
              <div className="text-xs text-gray-500">Super Admin</div>
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
