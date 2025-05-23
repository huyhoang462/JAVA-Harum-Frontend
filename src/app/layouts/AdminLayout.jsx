import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import AdminHeader from "../components/AdminHeader";

export default function AdminLayout() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <SideBar />
      <main className="flex flex-1 ml-wsidebar">
        <AdminHeader />
        <div className="flex-1  mt-hheader bg-gray-200">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
