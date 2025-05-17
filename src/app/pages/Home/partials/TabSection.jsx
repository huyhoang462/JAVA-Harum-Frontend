import React, { useState, useEffect } from "react";
import PostV from "./PostV";
import { getTopPosts } from "../homeService";

const TabSection = ({ isLoggedIn }) => {
  const [activeTab, setActiveTab] = useState("forYou");
  const [tabPosts, setTabPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Gọi API dựa trên tab đang active
  useEffect(() => {
    const fetchTabData = async () => {
      // Reset dữ liệu khi đổi tab
      setTabPosts([]);
      setIsLoading(true);

      try {
        let result = [];

        switch (activeTab) {
          case "forYou": {
            // Gọi API "Dành cho bạn"
            const forYouResponse = await getTopPosts();
            if (forYouResponse.status === 200) {
              result = forYouResponse.data?.content || [];
            }
            break;
          }
          case "following":
            // Chỉ gọi API "Đang theo dõi" khi đã đăng nhập
            if (isLoggedIn) {
              const followingResponse = await getTopPosts();
              if (followingResponse.status === 200) {
                result = followingResponse.data?.content || [];
              }
            }
            break;

          case "topRated": {
            const followingResponse = await getTopPosts();
            if (followingResponse.status === 200) {
              result = followingResponse.data?.content || [];
            }
            break;
          }
          default:
            result = [];
        }

        setTabPosts(result);
      } catch (error) {
        console.error(`Lỗi khi tải dữ liệu cho tab ${activeTab}:`, error);
        setTabPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTabData();
  }, [activeTab, isLoggedIn]);

  return (
    <div>
      <div className="flex text-lg mb-4">
        <button
          className={`pb-2 cursor-pointer px-4 ${
            activeTab === "forYou"
              ? "border-b-2 border-pblue text-pblue"
              : "text-text"
          }`}
          onClick={() => setActiveTab("forYou")}
        >
          Dành cho bạn
        </button>

        {isLoggedIn && (
          <button
            className={`pb-2 cursor-pointer px-4 ${
              activeTab === "following"
                ? "border-b-2 border-pblue text-pblue"
                : "text-text"
            }`}
            onClick={() => setActiveTab("following")}
          >
            Đang theo dõi
          </button>
        )}

        <button
          className={`pb-2 cursor-pointer px-4 ${
            activeTab === "topRated"
              ? "border-b-2 border-pblue text-pblue"
              : "text-text"
          }`}
          onClick={() => setActiveTab("topRated")}
        >
          Đánh giá cao nhất
        </button>
      </div>

      <div className="flex flex-col gap-y-6">
        {isLoading ? (
          <div className="text-center py-10">Đang tải bài viết...</div>
        ) : tabPosts.length > 0 ? (
          tabPosts.map((post, index) => <PostV key={index} post={post} />)
        ) : (
          <div className="text-center py-10">
            {activeTab === "following" && !isLoggedIn
              ? "Vui lòng đăng nhập để xem bài viết bạn đang theo dõi"
              : "Không có bài viết nào"}
          </div>
        )}
      </div>
    </div>
  );
};

export default TabSection;
