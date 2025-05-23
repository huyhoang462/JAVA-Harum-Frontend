import React, { useEffect, useState } from "react";
import PostV from "./PostV";
import { FileText, UserRound } from "lucide-react";
import { getSearchResult } from "../searchService";
const TabSection = ({ query }) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;
      try {
        const res = await getSearchResult(query);

        console.log("ess:", res);
        setPosts(res?.posts?.content);
        setUsers(res?.users?.content);
      } catch (err) {
        console.error("Lỗi khi tìm kiếm:", err);
      }
    };

    fetchData();
  }, [query]);
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="py-4 px-8 mt-4 mb-10 border-2 border-gray-200 rounded-xl">
      <div className="flex  font-bold mb-5 justify-center">
        <button
          className={` flex items-center pb-2 cursor-pointer px-6 ${
            activeTab === "posts"
              ? "border-b-2 border-pblue text-pblue"
              : "text-text"
          }`}
          onClick={() => setActiveTab("posts")}
        >
          <FileText className="h-6 inline mr-1" />
          Bài viết
        </button>
        <button
          className={` flex items-center pb-2 cursor-pointer px-6 ${
            activeTab === "users"
              ? "border-b-2 border-pblue text-pblue"
              : "text-text"
          }`}
          onClick={() => setActiveTab("users")}
        >
          <UserRound className="h-6 inline mr-1" />
          Người dùng
        </button>
      </div>
      {activeTab === "posts" ? (
        <div className="grid grid-cols-2 gap-10 ">
          {posts.length > 0 ? (
            posts.map((post, index) => <PostV key={index} post={post} />)
          ) : (
            <p>Không tìm thấy bài viết liên quan</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-10">
          {users.length > 0 ? (
            users.map((user, index) => (
              <div key={index} className="flex ">
                <div className="w-80 h-16 border-1 border-text2 rounded-sm flex items-center ">
                  <img
                    src={
                      user?.avatarUrl ||
                      "/src/app/assets/images/defaultAvatar.jpg"
                    }
                    className="w-12 h-12 object-cover rounded-full mx-4 shrink-0"
                  />
                  <div className="font-semibold text-text mr-2">
                    {user?.username}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Không tìm thấy người dùng liên quan</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TabSection;
