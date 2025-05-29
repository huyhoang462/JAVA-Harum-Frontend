import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TabSection from "./partical/TabSection";
import { getOtherUserProfileApi, getPostsByUserApi } from "./OtherProfileService";

export default function OtherProfile() {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [postsPage, setPostsPage] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!id) return;

    setLoadingUser(true);
    getOtherUserProfileApi(id)
      .then((data) => {
        setUser(data);
        setLoadingUser(false);
      })
      .catch(() => setLoadingUser(false));
  }, [id]);

  useEffect(() => {
    if (!id) return;

    setLoadingPosts(true);
    getPostsByUserApi(id, page, 10)
      .then((data) => {
        setPostsPage(data);
        setLoadingPosts(false);
      })
      .catch(() => setLoadingPosts(false));
  }, [id, page]);

  if (loadingUser) {
    return <div>Đang tải thông tin người dùng...</div>;
  }

  if (!user) {
    return <div>Không tìm thấy người dùng</div>;
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-6xl mx-auto">
        <div className="flex gap-x-10">
          <div className="w-64 pt-20 relative">
            <img
              className="rounded-full w-[140px] h-[140px] object-cover absolute left-0 top-[-70px]"
              src={user.avatarUrl || "./src/app/assets/images/daisy.jpg"}
              alt="Avatar"
            />
            <div className="font-medium">{user.username}</div>
            <div>
              <div
                className="border-1 mt-2.5 mb-4 text-tex border-pblue text-pblue cursor-pointer rounded-lg flex items-center h-8 font-medium justify-center text-sm"
              >
                Theo dõi
              </div>
            </div>
            <div className="flex justify-between items-center text-text mb-4 text-sm">
              <div>
                <div className="font-medium">{user.followers}</div>
                followers
              </div>
              <div>
                <div className="font-medium">{user.followings}</div>
                following
              </div>
            </div>
            <div className="text-sm whitespace-pre-line text-text">
              {user.bio}
            </div>
          </div>

          <div className="flex-1">
            {loadingPosts ? (
              <div>Đang tải bài viết...</div>
            ) : postsPage && postsPage.content.length > 0 ? (
              <>
                <TabSection posts={postsPage.content} />

                {/* Nút phân trang đơn giản */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={postsPage.first}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Trang trước
                  </button>
                  <button
                    onClick={() => setPage((p) => (!postsPage.last ? p + 1 : p))}
                    disabled={postsPage.last}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Trang sau
                  </button>
                </div>
              </>
            ) : (
              <div>Không có bài viết nào</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
