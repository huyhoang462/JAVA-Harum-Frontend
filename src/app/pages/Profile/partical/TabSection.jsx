/* eslint-disable no-case-declarations */
import React, { useState } from "react";
import { Bookmark, FileText, UserCheck, Loader2 } from "lucide-react";
import Post from "./Post";
import Following from "./Following";
import SavedPost from "./SavedPost";
import {
  getFollowedByUserApi,
  getPostsByUserApi,
  getSavePostsByUserId,
} from "../ProfileService";
import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

const LoadMoreButton = ({ hasNextPage, isFetchingNextPage, fetchNextPage }) => {
  if (!hasNextPage) return null;

  return (
    <div className="col-span-full flex justify-center mt-4">
      <button
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
        className="flex cursor-pointer items-center justify-center bg-pblue text-white px-6 py-2 rounded-lg font-semibold hover:bg-sblue transition-colors disabled:bg-gray-400 disabled:cursor-wait"
      >
        {isFetchingNextPage ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Đang tải...
          </>
        ) : (
          "Xem thêm"
        )}
      </button>
    </div>
  );
};

const TabSection = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const queryClient = useQueryClient();
  const userId = localStorage.getItem("user_id");
  const FOLLOWING_PAGE_SIZE = 15;

  const {
    data: postsData,
    isLoading: isPostsLoading,
    error: postsError,
    fetchNextPage: fetchNextPosts,
    hasNextPage: hasNextPosts,
    isFetchingNextPage: isFetchingNextPosts,
  } = useInfiniteQuery({
    queryKey: ["userPosts", userId],
    queryFn: ({ pageParam = 1 }) => getPostsByUserApi(userId, pageParam, 9),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.last) return undefined;
      return allPages.length + 1;
    },
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => page.data),
    }),
    enabled: !!userId,
  });

  const {
    data: followingDisplayData,
    isLoading: isFollowingLoading,
    error: followingError,
    fetchNextPage: fetchNextFollowing,
    hasNextPage: hasNextFollowing,
    isFetchingNextPage: isFetchingNextFollowing,
  } = useInfiniteQuery({
    queryKey: ["userFollowingDisplay", userId],
    queryFn: ({ pageParam = 0 }) =>
      getFollowedByUserApi(userId, pageParam, FOLLOWING_PAGE_SIZE),
    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length < FOLLOWING_PAGE_SIZE) {
        return undefined;
      }

      return allPages.length;
    },
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => page.data),
    }),
    enabled: !!userId,
  });

  const { data: followingTotalCount } = useQuery({
    queryKey: ["userFollowingCount", userId],
    queryFn: async () => {
      let totalCount = 0;
      let page = 0;
      let hasMore = true;
      while (hasMore) {
        const res = await getFollowedByUserApi(
          userId,
          page,
          FOLLOWING_PAGE_SIZE
        );
        const fetchedCount = res.data.length;
        totalCount += fetchedCount;
        page += 1;
        if (fetchedCount < FOLLOWING_PAGE_SIZE) {
          hasMore = false;
        }
      }
      return totalCount;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: savedPostsData,
    isLoading: isSavedPostsLoading,
    error: savedPostsError,
  } = useQuery({
    queryKey: ["savedPosts", userId],
    queryFn: () => getSavePostsByUserId(userId).then((res) => res.data || []),
    enabled: !!userId,
  });

  const handleRefresh = (queryKeyToInvalidate) => {
    queryClient.invalidateQueries({
      queryKey: [`${queryKeyToInvalidate}Display`, userId],
    });
    queryClient.invalidateQueries({
      queryKey: [`${queryKeyToInvalidate}Count`, userId],
    });
  };

  const postsCount = postsData?.pages[0]?.totalElements || 0;
  const savedCount = savedPostsData?.length || 0;
  const followingCount = followingTotalCount;

  const renderContent = () => {
    if (isPostsLoading || isFollowingLoading || isSavedPostsLoading) {
      return (
        <div className="text-gray-500 text-center col-span-full flex justify-center items-center h-40">
          <Loader2 className="animate-spin" size={32} />
        </div>
      );
    }

    const error = postsError || followingError || savedPostsError;
    if (error) {
      return (
        <p className="text-red-500 text-center col-span-full">
          Đã xảy ra lỗi: {error.message}
        </p>
      );
    }

    if (!userId) {
      return (
        <p className="text-red-500 text-center col-span-full">
          Vui lòng đăng nhập để xem nội dung.
        </p>
      );
    }

    switch (activeTab) {
      case "posts":
        const allPosts =
          postsData?.pages?.flatMap((page) => page?.content) || [];
        {
          console.log("posss: ", allPosts);
        }
        if (allPosts.length === 1) {
          if (allPosts[1] == undefined)
            return (
              <p className="text-gray-500 text-center col-span-full">
                Người dùng này chưa có bài viết nào.
              </p>
            );
        }
        return allPosts.length > 0 ? (
          <>
            {allPosts?.map((post) => (
              <Post key={post?.id} post={post} />
            ))}
            <LoadMoreButton
              hasNextPage={hasNextPosts}
              isFetchingNextPage={isFetchingNextPosts}
              fetchNextPage={fetchNextPosts}
            />
          </>
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            Bạn chưa có bài viết nào.
          </p>
        );

      case "saved":
        return savedPostsData?.length > 0 ? (
          savedPostsData.map((post) => (
            <SavedPost
              key={post?.id}
              post={post}
              refresh={() =>
                queryClient.invalidateQueries({
                  queryKey: ["savedPosts", userId],
                })
              }
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            Bạn chưa lưu bài viết nào.
          </p>
        );

      case "following":
        const allFollowing = followingDisplayData?.pages.flat() || [];
        return allFollowing.length > 0 ? (
          <>
            {allFollowing.map((user) => (
              <Following
                key={user?.id}
                user={user}
                refresh={() => handleRefresh("userFollowing")}
              />
            ))}
            <LoadMoreButton
              hasNextPage={hasNextFollowing}
              isFetchingNextPage={isFetchingNextFollowing}
              fetchNextPage={fetchNextFollowing}
            />
          </>
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            Bạn chưa theo dõi ai.
          </p>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="flex text-lg mb-4 border-b mt-6">
        <button
          className={`flex items-center cursor-pointer gap-2 pb-2 px-4 transition bg-transparent ${
            activeTab === "posts"
              ? "border-b-2 border-pblue text-pblue"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("posts")}
        >
          <FileText size={18} />
          Bài viết ({postsCount})
        </button>
        <button
          className={`flex items-center cursor-pointer gap-2 pb-2 px-4 transition bg-transparent ${
            activeTab === "saved"
              ? "border-b-2 border-pblue text-pblue"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("saved")}
        >
          <Bookmark size={18} />
          Đã lưu ({savedCount})
        </button>
        <button
          className={`flex items-center cursor-pointer gap-2 pb-2 px-4 transition bg-transparent ${
            activeTab === "following"
              ? "border-b-2 border-pblue text-pblue"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("following")}
        >
          <UserCheck size={18} />
          Đang theo dõi ({followingCount === undefined ? "0" : followingCount})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 mb-10">
        {renderContent()}
      </div>
    </div>
  );
};

export default TabSection;
