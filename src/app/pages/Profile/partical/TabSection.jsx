import React, { useEffect, useState, useMemo } from "react";
import { Bookmark, FileText, UserCheck } from "lucide-react";
import Post from "./Post";
import Following from "./Following";
import {
  getFollowedByUserApi,
  getPostsByUserApi,
  getSavePostsByUserId,
} from "../ProfileService";
import SavedPost from "./SavedPost";

const TabSection = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [myPosts, setMyPosts] = useState([]);
  const [savePosts, setSavePosts] = useState([]); // Sửa tên hàm set cho nhất quán
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm state loading
  const [error, setError] = useState(null); // Thêm state xử lý lỗi

  const userId = localStorage.getItem("user_id");
  const fetchAllData = async () => {
    if (!userId) {
      setError("Không tìm thấy User ID.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [postsRes, savedRes, followingRes] = await Promise.all([
        getPostsByUserApi(userId),
        getSavePostsByUserId(userId),
        getFollowedByUserApi(userId),
      ]);

      // Cập nhật đúng state
      setMyPosts(postsRes?.data?.content || []);
      setSavePosts(savedRes?.data || []);
      setFollowing(followingRes?.data || []);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
      setError("Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại.");
    } finally {
      setLoading(false); // Dừng loading dù thành công hay thất bại
    }
  };
  useEffect(() => {
    fetchAllData();
  }, [userId]); // Thêm userId vào dependency để fetch lại nếu nó thay đổi

  const filteredData = useMemo(
    () => ({
      posts: myPosts,
      saved: savePosts,
      following: following,
    }),
    [myPosts, savePosts, following]
  );

  const renderContent = () => {
    if (loading) {
      return (
        <p className="text-gray-500 text-center col-span-full">
          Đang tải dữ liệu...
        </p>
      );
    }

    if (error) {
      return <p className="text-red-500 text-center col-span-full">{error}</p>;
    }

    if (activeTab === "following") {
      return filteredData.following?.length > 0 ? (
        filteredData.following.map((follower) => (
          <Following key={follower.id} user={follower} refresh={fetchAllData} />
        ))
      ) : (
        <p className="text-gray-500 text-center col-span-full">
          Bạn chưa theo dõi ai.
        </p>
      );
    } else if (activeTab === "posts") {
      return filteredData.posts?.length > 0 ? (
        filteredData.posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p className="text-gray-500 text-center col-span-full">
          Bạn chưa có bài viết nào.
        </p>
      );
    } else if (activeTab === "saved") {
      return filteredData.saved?.length > 0 ? (
        filteredData.saved.map((post) => (
          <SavedPost key={post.id} post={post} refresh={fetchAllData} />
        ))
      ) : (
        <p className="text-gray-500 text-center col-span-full">
          Bạn chưa có bài viết nào.
        </p>
      );
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
          Bài viết ({filteredData.posts?.length || 0})
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
          Đã lưu ({filteredData.saved?.length || 0})
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
          Đang theo dõi ({filteredData.following?.length || 0})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default TabSection;
