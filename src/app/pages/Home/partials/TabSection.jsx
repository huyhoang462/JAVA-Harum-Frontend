/* eslint-disable no-unused-vars */
import React, { useState, Fragment } from "react";
import PostV from "./PostV";
import { getForYouPosts, getFollowPosts } from "../homeService";
import { useInfiniteQuery } from "@tanstack/react-query";
import { sGlobalInfo } from "../../../stores/globalStore";
import LoadingSpinner from "../../../components/LoadingSpinner";

const TabSection = () => {
  const userId = sGlobalInfo.use((v) => v.userId);
  const [activeTab, setActiveTab] = useState("forYou");

  const queryKey = ["tabPosts", activeTab, userId];

  const queryFn = ({ pageParam = 1 }) => {
    if (activeTab === "forYou") {
      return getForYouPosts({ userId, pageParam });
    } else if (activeTab === "following") {
      return getFollowPosts({ userId, pageParam });
    }
    return Promise.resolve({ content: [], last: true, number: 0 });
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    status,
  } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: queryFn,

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && !lastPage.last) {
        const nextPageParam = lastPage.number + 2;
        return nextPageParam;
      }
      return undefined;
    },
  });

  const allPosts =
    data?.pages.reduce((acc, page) => {
      if (page && Array.isArray(page.content)) {
        return acc.concat(page.content);
      }
      return acc;
    }, []) || [];

  const handleTabClick = (tabName) => {
    if (activeTab !== tabName) {
      setActiveTab(tabName);
    }
  };

  const renderContent = () => {
    if (status === "pending" && !allPosts.length)
      return (
        <div className="flex flex-col items-center justify-center">
          <LoadingSpinner />
          <p className="mt-2">Đang tải bài viết...</p>
        </div>
      );
    if (status === "error")
      return <p>Lỗi: {error?.message || "Đã có lỗi xảy ra"}</p>;
    if (!allPosts.length && status === "success")
      return <p>Không có bài viết nào.</p>;

    return (
      <>
        {allPosts.map((post) => (
          <PostV key={post.id} post={post} />
        ))}
        {hasNextPage && (
          <div className="flex justify-center">
            {" "}
            {/* Hoặc flex justify-start / justify-end */}
            <button
              onClick={() => {
                console.log("Fetching next page...");
                fetchNextPage();
              }}
              disabled={isFetchingNextPage}
              className={`${
                isFetchingNextPage ? "" : "underline italic hover:bg-bgblue "
              } px-4 text-pblue py-2 rounded hover:text-sblue cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isFetchingNextPage ? "Đang tải thêm..." : "Xem thêm"}
            </button>
          </div>
        )}
        {!hasNextPage && allPosts.length > 0 && status === "success" && (
          <p className="mt-6 text-center text-gray-500">
            Đã hiển thị tất cả bài viết.
          </p>
        )}
      </>
    );
  };

  return (
    <div>
      <div className="flex text-lg mb-4">
        <button
          className={`pb-2 cursor-pointer px-4 ${
            activeTab === "forYou"
              ? "border-b-2 border-pblue text-pblue font-semibold"
              : "text-text hover:text-pblue"
          }`}
          onClick={() => handleTabClick("forYou")}
        >
          Dành cho bạn
        </button>
        <button
          className={`pb-2 cursor-pointer px-4 ${
            activeTab === "following"
              ? "border-b-2 border-pblue text-pblue font-semibold"
              : "text-text hover:text-pblue"
          }`}
          onClick={() => handleTabClick("following")}
        >
          Đang theo dõi
        </button>
      </div>
      <div className="flex flex-col gap-y-6">{renderContent()}</div>
    </div>
  );
};

export default TabSection;
