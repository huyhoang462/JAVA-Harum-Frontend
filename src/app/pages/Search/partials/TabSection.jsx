import React, { useState } from "react";
import PostV from "./PostV";
import {
  FileText,
  UserRound,
  SearchX,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { getSearchResult } from "../searchService";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const UserCard = ({ user }) => {
  const nav = useNavigate();
  if (!user) return null;

  return (
    <div
      key={user.id}
      className="flex items-center p-3 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white"
      onClick={() => nav(`/profile/${user.id}`)}
    >
      <img
        src={user.avatarUrl || "/defaultAvatar.jpg"}
        alt={`${user.username}'s avatar`}
        className="w-12 h-12 object-cover rounded-full mr-4 shrink-0"
      />
      <div>
        <div className="font-semibold text-gray-800 text-lg">
          {user.username}
        </div>
      </div>
    </div>
  );
};

const PostSkeleton = () => {
  return (
    <div className="flex w-full bg-white p-3 rounded-lg shadow-sm animate-pulse">
      {" "}
      <div className="h-40 w-40 bg-gray-300 rounded shrink-0"></div>
      <div className="flex flex-col justify-between w-full ml-4">
        <div>
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-full mb-1"></div>
          <div className="h-6 bg-gray-300 rounded w-5/6 mb-2"></div>{" "}
        </div>

        <div className="flex justify-between items-center mt-2">
          {" "}
          <div className="flex items-center">
            <div className="rounded-full h-10  bg-gray-300 mr-2.5 shrink-0"></div>
            <div className="h-4 bg-gray-300 rounded  mr-5"></div>
            <div className="h-3 bg-gray-300 rounded "></div>
          </div>
          <div className="flex">
            <div className="h-4 bg-gray-300 rounded w-8 mr-2.5"></div>
            <div className="h-4 bg-gray-300 rounded w-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserSkeleton = () => (
  <div className="flex items-center p-3 border border-gray-200 rounded-lg shadow-sm animate-pulse bg-white">
    <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 shrink-0"></div>
    <div>
      <div className="h-5 bg-gray-300 rounded w-32 mb-1"></div>
      <div className="h-3 bg-gray-300 rounded w-24"></div>
    </div>
  </div>
);

const TabSection = ({ query }) => {
  const [activeTab, setActiveTab] = useState("posts");

  const {
    data: searchResult,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["searchResults", query],
    queryFn: () => {
      if (!query?.trim()) {
        return Promise.resolve({
          posts: { content: [] },
          users: { content: [] },
        });
      }
      return getSearchResult(query);
    },
    enabled: !!query?.trim(),
  });

  const posts = searchResult?.posts?.content || [];
  const users = searchResult?.users?.content || [];

  const renderContent = () => {
    if (isLoading || (isFetching && !searchResult)) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mt-6">
          {Array.from({ length: activeTab === "posts" ? 4 : 4 }).map(
            (_, index) =>
              activeTab === "posts" ? (
                <PostSkeleton key={index} />
              ) : (
                <UserSkeleton key={index} />
              )
          )}
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-10 text-red-600 bg-red-50 p-6 rounded-lg">
          <AlertCircle size={48} className="mb-4" />
          <h3 className="text-xl font-semibold mb-2">Đã có lỗi xảy ra!</h3>
          <p className="text-sm">
            Không thể tải kết quả tìm kiếm. Vui lòng thử lại sau.
          </p>
          {error?.message && (
            <p className="text-xs mt-2 italic">Chi tiết: {error.message}</p>
          )}
        </div>
      );
    }

    if (activeTab === "posts") {
      return posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mt-6">
          {posts.map((post) => (
            <PostV key={post.id || post.title} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-10 text-gray-500">
          <SearchX size={48} className="mb-4 text-pblue" />
          <h3 className="text-xl font-semibold">Không tìm thấy bài viết nào</h3>
          <p className="text-sm">Hãy thử với từ khóa khác nhé!</p>
        </div>
      );
    }

    if (activeTab === "users") {
      return users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-10 text-gray-500">
          <SearchX size={48} className="mb-4 text-pblue" />
          <h3 className="text-xl font-semibold">
            Không tìm thấy người dùng nào
          </h3>
          <p className="text-sm">
            Có vẻ như không có ai khớp với tìm kiếm của bạn.
          </p>
        </div>
      );
    }
    return null;
  };

  if (!query?.trim() && !isLoading && !isFetching) {
    return (
      <div className="py-10 text-center text-gray-500">
        <p className="text-lg">Vui lòng nhập từ khóa để tìm kiếm.</p>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 md:px-8 mt-4 mb-10 bg-white shadow-lg border border-gray-200 rounded-xl w-full">
      <div className="flex border-b border-gray-200 font-medium text-gray-600 mb-6 justify-center">
        <button
          className={`flex items-center pb-3 pt-1 cursor-pointer px-6 text-lg transition-all duration-200 ease-in-out
            ${
              activeTab === "posts"
                ? "border-b-3 border-pblue text-pblue font-semibold"
                : "text-gray-500 hover:text-pblue hover:border-pblue hover:border-b-3"
            }`}
          onClick={() => setActiveTab("posts")}
        >
          <FileText size={20} className="inline mr-2" />
          Bài viết (
          {isLoading || isFetching ? (
            <Loader2 size={16} className="animate-spin inline ml-1" />
          ) : (
            posts.length
          )}
          )
        </button>
        <button
          className={`flex items-center pb-3 pt-1 cursor-pointer px-6 text-lg transition-all duration-200 ease-in-out
            ${
              activeTab === "users"
                ? "border-b-3 border-pblue text-pblue font-semibold"
                : "text-gray-500 hover:text-pblue hover:border-pblue hover:border-b-3"
            }`}
          onClick={() => setActiveTab("users")}
        >
          <UserRound size={20} className="inline mr-2" />
          Người dùng (
          {isLoading || isFetching ? (
            <Loader2 size={16} className="animate-spin inline ml-1" />
          ) : (
            users.length
          )}
          )
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default TabSection;
