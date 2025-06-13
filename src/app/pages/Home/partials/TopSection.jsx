import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getTopPosts } from "../homeService";
import { Bookmark, Eye, ThumbsUp } from "lucide-react";
import formatDate from "../../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import { navToDetail } from "../../../utils/navToDetail";

const PostHSkeleton = () => {
  return (
    <div className="flex flex-col w-full animate-pulse">
      <div className="mb-2 w-full h-[172px] bg-gray-200 rounded-sm"></div>
      <div className="space-y-3">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            <div className="flex flex-col space-y-1">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

function PostH({ post }) {
  const nav = useNavigate();
  const userId = localStorage.getItem("user_id");

  const imageUrl = post?.contentBlock.find(
    (block) => block.type === "image"
  )?.value; // Thêm ?. để an toàn hơn

  return (
    <div
      className="flex flex-col cursor-pointer w-full group" // Thêm 'group' để có thể tạo hiệu ứng hover
      onClick={() => navToDetail(nav, userId, post?.id)}
    >
      <div className="mb-2 w-full overflow-hidden rounded-sm">
        <img
          src={imageUrl || "/src/app/assets/images/defaultImage.png"}
          alt={post?.title}
          className="h-[172px] w-full object-cover transition-transform duration-300 group-hover:scale-105" // Hiệu ứng zoom khi hover
        />
      </div>
      <div>
        <div className="flex mb-2 justify-between items-start">
          <h3 className="font-medium line-clamp-2 min-h-[48px] text-gray-800 group-hover:text-pblue transition-colors">
            {post?.title}
          </h3>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2">
              <img
                src={
                  post?.userImage || "/src/app/assets/images/defaultAvatar.jpg"
                }
                alt={post?.username}
                className="h-8 w-8 object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <div className="font-semibold line-clamp-1 w-24 text-[14px] text-gray-700">
                {post?.username}
              </div>
              <div className="text-[12px] text-gray-500">
                {formatDate(post?.createdAt)}
              </div>
            </div>
          </div>
          <div className="flex items-center text-gray-600">
            <div className="flex items-center mr-4">
              <ThumbsUp className="h-4 w-4" />
              <p className="ml-1 text-sm font-medium">{post?.countLike}</p>
            </div>
            <div className="flex items-center">
              <Eye className="w-4.5" />
              <p className="ml-1 text-sm font-medium">{post?.countView}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopSection() {
  const {
    data: topPosts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["topPosts"],
    queryFn: getTopPosts,
    staleTime: 5 * 60 * 1000,
  });

  const renderContent = () => {
    if (isLoading) {
      return [...Array(4)].map((_, index) => <PostHSkeleton key={index} />);
    }

    if (isError) {
      return (
        <div className="col-span-4 text-center text-red-500 py-10">
          <p>Đã có lỗi xảy ra khi tải bài viết.</p>
          <p className="text-sm text-gray-500">{error.message}</p>
        </div>
      );
    }

    if (!topPosts?.content || topPosts.content.length === 0) {
      return (
        <div className="col-span-4 text-center text-gray-500 py-10">
          <p>Chưa có bài viết nổi bật nào.</p>
        </div>
      );
    }

    return topPosts.content.map((post) => <PostH key={post.id} post={post} />);
  };

  return (
    <section className="flex flex-col my-4">
      <div className="text-text font-medium text-lg   pb-2 mb-5 inline-block">
        BÀI VIẾT NỔI BẬT
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
        {renderContent()}
      </div>
    </section>
  );
}

export default TopSection;
