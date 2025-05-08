import React, { useState } from "react";
import { Bookmark, FileText, UserCheck, Users } from "lucide-react";
import Post from "./Post";
import Following from "./Following"; // Import component Following

const TabSection = ({ posts, followings }) => {  // Nhận thêm props 'followingList'
  const [activeTab, setActiveTab] = useState("posts");

  const filteredPosts = {
    posts: posts,
    saved: posts.filter((post) => post.saved),
    following: followings,  // Cập nhật danh sách người theo dõi
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Thanh tab */}
      <div className="flex text-lg mb-4 border-b mt-6">
        <button
          className={`flex items-center gap-2 pb-2 px-4 transition bg-transparent ${
            activeTab === "posts" ? "border-b-2 border-pblue text-pblue" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("posts")}
        >
          <FileText size={18} />
          Bài viết ({filteredPosts.posts.length})
        </button>
        <button
          className={`flex items-center gap-2 pb-2 px-4 transition bg-transparent ${
            activeTab === "saved" ? "border-b-2 border-pblue text-pblue" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("saved")}
        >
          <Bookmark size={18} />
          Đã lưu ({filteredPosts.saved.length})
        </button>
        <button
          className={`flex items-center gap-2 pb-2 px-4 transition bg-transparent ${
            activeTab === "following" ? "border-b-2 border-pblue text-pblue" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("following")}
        >
          <UserCheck size={18} />
          Đang theo dõi ({filteredPosts.following.length})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-30 gap-y-10">
        {activeTab === "following" ? (
          filteredPosts.following.length > 0 ? (
            filteredPosts.following.map((follower, index) => (
              <Following key={index} user={follower} />
            ))
          ) : (
            <p className="text-gray-500 text-center">Bạn chưa theo dõi ai.</p>
          )
        ) : (
          filteredPosts[activeTab].length > 0 ? (
            filteredPosts[activeTab].map((post, index) => (
              <Post key={index} post={post} />
            ))
          ) : (
            <p className="text-gray-500 text-center">Không có dữ liệu.</p>
          )
        )}
      </div>
    </div>
  );
};

export default TabSection;
