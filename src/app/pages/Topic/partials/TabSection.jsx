import React, { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import PostV from "./PostV";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { getForYouPosts, getPostsByTopic } from "../topicService";

const TabSection = ({ topicId }) => {
  const [activeTab, setActiveTab] = useState("all");

  console.log("id từ tab này:", typeof topicId);

  useEffect(() => {
    console.log(
      "[TabSection.js] topicId prop changed or component mounted:",
      topicId
    );
  }, [topicId]);

  const {
    data: allPostsData,
    fetchNextPage: fetchNextAllPosts,
    hasNextPage: hasNextAllPosts,
    isLoading: isLoadingAllPosts,
    isFetchingNextPage: isFetchingNextAllPosts,
    isError: isErrorAllPosts,
    error: errorAllPosts,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", topicId, "all"],
    queryFn: ({ pageParam }) => {
      if (!topicId) {
        console.error(
          "[TabSection.js] 'all' queryFn: topicId is undefined or null before calling API!"
        );

        return Promise.reject(new Error("topicId is missing in 'all' queryFn"));
      }
      return getPostsByTopic({ id: topicId, pageParam: pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.number < lastPage.totalPages - 1) {
        return lastPage.number + 2;
      }
      return undefined;
    },

    enabled: !!topicId && activeTab === "all",
  });

  const {
    data: forYouPostsData,
    fetchNextPage: fetchNextForYouPosts,
    hasNextPage: hasNextForYouPosts,
    isLoading: isLoadingForYouPosts,
    isFetchingNextPage: isFetchingNextForYouPosts,
    isError: isErrorForYouPosts,
    error: errorForYouPosts,
  } = useInfiniteQuery({
    queryKey: ["posts", topicId, "forYou"],
    queryFn: ({ pageParam }) => {
      if (!topicId) {
        console.error(
          "[TabSection.js] 'forYou' queryFn: topicId is undefined or null before calling API!"
        );
        return Promise.reject(
          new Error("topicId is missing in 'forYou' queryFn")
        );
      }
      return getForYouPosts(topicId, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.number < lastPage.totalPages - 1) {
        return lastPage.number + 2;
      }
      return undefined;
    },
    enabled: !!topicId && activeTab === "forYou",
  });

  const allPosts = allPostsData?.pages.flatMap((page) => page.content) || [];
  const forYouPosts =
    forYouPostsData?.pages.flatMap((page) => page.content) || [];

  const postsToDisplay = activeTab === "all" ? allPosts : forYouPosts;
  const isLoading =
    activeTab === "all" ? isLoadingAllPosts : isLoadingForYouPosts;
  const isFetchingNext =
    activeTab === "all" ? isFetchingNextAllPosts : isFetchingNextForYouPosts;
  const isError = activeTab === "all" ? isErrorAllPosts : isErrorForYouPosts;
  const error = activeTab === "all" ? errorAllPosts : errorForYouPosts;
  const fetchNextPage =
    activeTab === "all" ? fetchNextAllPosts : fetchNextForYouPosts;
  const hasNextPage =
    activeTab === "all" ? hasNextAllPosts : hasNextForYouPosts;

  return (
    <div>
      <div className="flex text-lg mb-4 border-b border-gray-200">
        <button
          className={`pb-2 cursor-pointer px-4 font-medium ${
            activeTab === "all"
              ? "border-b-2 border-pblue text-pblue"
              : "text-text hover:text-pblue"
          }`}
          onClick={() => setActiveTab("all")}
        >
          Tất cả
        </button>
        <button
          className={`pb-2 cursor-pointer px-4 font-medium ${
            activeTab === "forYou"
              ? "border-b-2 border-pblue text-pblue"
              : "text-text hover:text-pblue"
          }`}
          onClick={() => setActiveTab("forYou")}
        >
          Dành cho bạn
        </button>
      </div>

      {isLoading && !postsToDisplay.length && (
        <div className="flex flex-col mt-4 items-center justify-center">
          <LoadingSpinner />
          <p className="mt-2 text-gray-600">Đang tải bài viết...</p>
        </div>
      )}

      {isError && (
        <div className="py-5 text-center text-red-500">
          Lỗi khi tải bài viết: {error?.message || "Đã có lỗi xảy ra."}
        </div>
      )}

      {!isLoading && !isError && postsToDisplay.length === 0 && (
        <div className="py-5 text-center text-gray-500">
          Chưa có bài viết nào trong mục này.
        </div>
      )}

      {postsToDisplay.length > 0 && (
        <div className="flex flex-col gap-y-6">
          {postsToDisplay.map((post) => (
            <PostV key={post?.id} post={post} />
          ))}
        </div>
      )}

      {hasNextPage && (
        <div className="mt-6 text-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNext}
            className={`${
              isFetchingNext ? "" : "underline italic hover:bg-bgblue "
            } px-4 text-pblue py-2 rounded hover:text-sblue cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isFetchingNext ? "Đang tải thêm..." : "Xem thêm"}
          </button>
        </div>
      )}
      {!hasNextPage && allPosts.length > 0 && status === "success" && (
        <p className="mt-6 text-center text-gray-500">
          Đã hiển thị tất cả bài viết.
        </p>
      )}
    </div>
  );
};

export default TabSection;
