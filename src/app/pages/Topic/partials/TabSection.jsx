/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import PostV from "./PostV";
import { getForYouPosts, getPostsByTopic } from "../topicService";
import formatDate from "../../../utils/formatDate"; // Import các hàm tiện ích
import { navToDetail } from "../../../utils/navToDetail"; // Import các hàm tiện ích
import { Eye, ThumbsUp } from "lucide-react";

const PostVSkeleton = () => {
  return (
    <div className="flex w-full animate-pulse">
      <div className="h-40 w-72 bg-gray-200 rounded-md flex-shrink-0"></div>
      <div className="flex flex-col justify-between w-full ml-4 py-1">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-full"></div>
            <div className="h-6 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-5 bg-gray-200 rounded w-12"></div>
            <div className="h-5 bg-gray-200 rounded w-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TabSection = ({ topicId }) => {
  const [activeTab, setActiveTab] = useState("all");
  const userId = localStorage.getItem("user_id");
  const allPostsQuery = useInfiniteQuery({
    queryKey: ["posts", topicId, "all"],
    queryFn: ({ pageParam = 1 }) => getPostsByTopic({ id: topicId, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.number < lastPage.totalPages - 1) {
        return lastPage.number + 2;
      }
      return undefined;
    },
    enabled: !!topicId && activeTab === "all",
  });

  const forYouPostsQuery = useInfiniteQuery({
    queryKey: ["posts", topicId, "forYou"],
    queryFn: ({ pageParam = 1 }) => getForYouPosts(topicId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.number < lastPage.totalPages - 1) {
        return lastPage.number + 2;
      }
      return undefined;
    },
    enabled: !!topicId && activeTab === "forYou",
  });

  const activeQuery = activeTab === "all" ? allPostsQuery : forYouPostsQuery;

  const postsToDisplay =
    activeQuery.data?.pages.flatMap((page) => page.content) || [];

  const renderContent = () => {
    if (activeTab === "forYou" && !userId) {
      return (
        <p className="text-center text-gray-500 py-10">
          Vui lòng đăng nhập để khám phá thêm.
        </p>
      );
    }
    if (activeQuery.isLoading) {
      return (
        <div className="flex flex-col gap-y-6">
          {[...Array(5)].map((_, index) => (
            <PostVSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (activeQuery.isError) {
      return (
        <div className="py-10 text-center text-red-500">
          Lỗi khi tải bài viết:{" "}
          {activeQuery.error?.message || "Đã có lỗi xảy ra."}
        </div>
      );
    }

    if (postsToDisplay.length === 0) {
      return (
        <div className="py-10 text-center text-gray-500">
          Chưa có bài viết nào trong mục này.
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-y-6">
        {postsToDisplay.map((post) => (
          <PostV key={post?.id} post={post} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex text-lg mb-4 border-b border-gray-200">
        <button
          className={`pb-2 cursor-pointer px-4 font-medium transition-colors duration-200 ${
            activeTab === "all"
              ? "border-b-2 border-pblue text-pblue"
              : "text-gray-500 hover:text-pblue border-b-2 border-transparent"
          }`}
          onClick={() => setActiveTab("all")}
        >
          Tất cả
        </button>
        <button
          className={`pb-2 cursor-pointer px-4 font-medium transition-colors duration-200 ${
            activeTab === "forYou"
              ? "border-b-2 border-pblue text-pblue"
              : "text-gray-500 hover:text-pblue border-b-2 border-transparent"
          }`}
          onClick={() => setActiveTab("forYou")}
        >
          Dành cho bạn
        </button>
      </div>

      <div className="mt-6">{renderContent()}</div>

      {activeQuery.hasNextPage && (
        <div className="mt-6 text-center">
          <button
            onClick={() => activeQuery.fetchNextPage()}
            disabled={activeQuery.isFetchingNextPage}
            className="px-6 py-2 cursor-pointer font-semibold text-pblue border-2 border-pblue rounded-full hover:bg-pblue hover:text-white transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {activeQuery.isFetchingNextPage ? "Đang tải thêm..." : "Xem thêm"}
          </button>
        </div>
      )}

      {!activeQuery.hasNextPage &&
        postsToDisplay.length > 0 &&
        !activeQuery.isLoading && (
          <p className="mt-6 text-center text-gray-500">
            Đã hiển thị tất cả bài viết.
          </p>
        )}
    </div>
  );
};

export default TabSection;
