import React, { useEffect, useState } from "react";
import PostSection from "./partials/PostSection";
import TabSection from "./partials/TabSection";
import AccountSection from "./partials/AccountSection";
import { getPopularPosts, getTopPosts } from "./homeService";

export default function Home() {
  const [topPosts, setTopPosts] = useState([]);
  const [popPosts, setPopPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập
    const checkLoginStatus = () => {
      // Kiểm tra từ localStorage, cookie hoặc state management
      const token = localStorage.getItem("token");
      setIsLoggedIn(token !== null);
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Gọi API đồng thời cho các phần luôn hiển thị
        const [resTop, resPop] = await Promise.all([
          getTopPosts(),
          getPopularPosts(),
        ]);

        if (resTop.status === 200) {
          setTopPosts(resTop.data?.content || []);
        } else {
          console.error("Lỗi: Không lấy được bài viết nổi bật");
        }

        if (resPop.status === 200) {
          setPopPosts(resPop.data?.content || []);
        } else {
          console.error("Lỗi: Không lấy được bài viết mới");
        }
      } catch (err) {
        console.error("Lỗi lấy dữ liệu trang Home", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="w-6xl mx-auto">
        <div className="flex flex-col w-full">
          {isLoading ? (
            <div className="text-center py-10">Đang tải dữ liệu...</div>
          ) : (
            <>
              <div className="mb-6">
                <PostSection title={"NỔI BẬT"} posts={topPosts} />
                <PostSection title={"PHỔ BIẾN"} posts={popPosts} />
              </div>
              <div className="grid grid-cols-13 gap-x-10 w-full mb-10">
                <div className="col-span-9">
                  <TabSection isLoggedIn={isLoggedIn} />
                </div>
                <div className="col-span-4 mt-10">
                  {/* <AccountSection users={users} /> */}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
