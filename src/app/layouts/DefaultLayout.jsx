import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function DefaultLayout() {
  return (
    <div className="bg-white  ">
      <Header />
      <Navbar />
      <div className="min-h-[calc(100svh-var(--spacing-hheader)-var(--spacing-hnavbar))]  ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
