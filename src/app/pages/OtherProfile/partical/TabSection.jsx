import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import Post from "./Post";
import { getPostsByUserApi } from "../OtherProfileService";

const PostCardSkeleton = () => (
  <div className="w-full animate-pulse space-y-3">
    <div className="h-48 w-full bg-gray-200 rounded-lg"></div>
    <div className="space-y-2">
      <div className="h-5 bg-gray-200 rounded w-5/6"></div>
      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
    </div>
    <div className="flex items-center pt-2">
      <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
      <div className="ml-3 h-4 bg-gray-200 rounded w-1/3"></div>
    </div>
  </div>
);

const TabSection = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null); // ✅ Thêm state lỗi

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      setError(new Error("User ID is missing."));
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset lỗi trước mỗi lần fetch
      try {
        const userRes = await getPostsByUserApi(userId);
        setPosts(userRes?.content || []); // Đảm bảo posts luôn là một mảng
      } catch (err) {
        console.error("Lỗi khi fetch dữ liệu bài viết:", err);
        setError("Không thể tải được bài viết. Vui lòng thử lại."); // ✅ Set lỗi
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const renderContent = () => {
    if (loading) {
      return [...Array(6)].map((_, index) => <PostCardSkeleton key={index} />);
    }

    if (error) {
      return <p className="text-red-500 text-center col-span-full">{error}</p>;
    }

    if (posts.length === 0) {
      return (
        <p className="text-gray-500 text-center col-span-full">
          Người dùng này chưa có bài viết nào.
        </p>
      );
    }

    return posts.map((post) => <Post key={post.id} post={post} />); // ✅ Sửa key={index} thành key={post.id}
  };

  return (
    <div className="w-full">
      <div className="flex text-lg mb-4 border-b mt-6">
        <button className="flex items-center gap-2 pb-2 px-4 transition bg-transparent border-b-2 border-pblue text-pblue font-semibold">
          <FileText size={18} />
          Bài viết ({posts.length})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mt-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default TabSection;
