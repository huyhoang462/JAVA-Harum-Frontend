/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPopularPosts } from "../homeService";
import PostH from "./PostH";
import LoadingSpinner from "../../../components/LoadingSpinner";

function PopularSection() {
  const {
    data: popularPosts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["popularPosts"],
    queryFn: getPopularPosts,
  });

  return (
    <section className="flex flex-col my-4">
      <div className="text-text font-medium">BÀI VIẾT PHỔ BIẾN</div>
      <div className=" grid grid-cols-4 gap-x-2 mt-5">
        {isLoading ? (
          <div className="flex flex-col items-center h-[268px] justify-center col-span-4">
            <LoadingSpinner />
            <p className="mt-2"> Đang tải bài viết...</p>
          </div>
        ) : isError ? (
          <p>Không thể lấy dữ liệu</p>
        ) : (
          popularPosts.content.map((post) => (
            <PostH key={post.id} post={post} />
          ))
        )}
      </div>
    </section>
  );
}
export default PopularSection;
