// DefaultLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../bkUrl";

const getTopics = async () => {
  const res = await axios.get(`${API_URL}/topics`);
  return res.data; // Giả sử res.data là một mảng các topics
};

export default function DefaultLayout() {
  const {
    data: topics,
    isLoading,
    isError,
    error, // Thêm error để có thể hiển thị chi tiết lỗi nếu cần
  } = useQuery({
    queryKey: ["topics"],
    queryFn: getTopics,
  });

  if (isLoading)
    return (
      <div className="text-center py-10">Đang tải thanh điều hướng...</div>
    );
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Lỗi khi tải topics: {error?.message || "Unknown error"}
      </div>
    );

  return (
    <div className="bg-white">
      <Header textColor="text2" />
      {/* Chỉ render Navbar nếu có topics */}
      {topics && topics.length > 0 && <Navbar topics={topics} />}
      <div className="min-h-[calc(100svh-var(--spacing-hheader)-var(--spacing-hnavbar))]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
