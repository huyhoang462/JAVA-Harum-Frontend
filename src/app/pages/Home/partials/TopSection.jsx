/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getTopPosts } from "../homeService";
import PostH from "./PostH";
import LoadingSpinner from "../../../components/LoadingSpinner";

function TopSection() {
  const {
    data: topPosts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["topPosts"],
    queryFn: getTopPosts,
  });

  return (
    <section className="flex flex-col my-4">
      <div className="text-text font-medium">BÀI VIẾT NỔI BẬT</div>
      <div className=" grid grid-cols-4 gap-x-6 mt-5">
        {isLoading ? (
          <div className="flex items-center h-[268px] justify-center col-span-4">
            <LoadingSpinner />
            <p className="mt-2"> Đang tải bài viết...</p>
          </div>
        ) : isError ? (
          <p>Không thể lấy dữ liệu</p>
        ) : (
          topPosts.content.map((post) => <PostH key={post.id} post={post} />)
        )}
      </div>
    </section>
  );
}
export default TopSection;
