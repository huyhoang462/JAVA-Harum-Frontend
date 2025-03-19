import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function ProfileLayout() {
  return (
    <div className="bg-white ">
      <div className="relative bg-[url('./src/app/assets/images/img1.jpg')] bg-cover bg-center pt-2.5 mt-[-10px]">
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-5 mx-auto max-w-6xl ">
          <Header />
          <div className="h-hnavbar bg-transparent"></div>
          <img
            className="rounded-full  w-[142px] h-[142px] object-cover absolute left-0 top-11"
            src="./src/app/assets/images/daisy.jpg"
          />
        </div>
      </div>

      <div className="min-h-[calc(100svh-var(--spacing-hheader)-var(--spacing-hnavbar))]  ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
