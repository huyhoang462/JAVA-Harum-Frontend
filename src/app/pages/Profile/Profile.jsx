import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TabSection from "./partical/TabSection";
import Post from "./partical/Post";
import {
  getUserProfileApi,
  getPostsByUserApi,
  getFollowedByUserApi,
} from "./ProfileService";

export default function Profile() {
  const nav = useNavigate();
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await getUserProfileApi(id);
        const postsRes = await getPostsByUserApi(id);
        const followedRes = await getFollowedByUserApi(id,0,10);

        setUser(userRes);
        setPosts(postsRes?.data || []); 
        setFollowings(followedRes || []);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu Profile:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!user) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="flex min-h-screen">
      <div className="w-6xl mx-auto">
        <div className="flex gap-x-10">
          <div className="w-64 pt-20 relative">
            <img
              className="rounded-full w-[140px] h-[140px] object-cover absolute left-0 top-[-70px]"
              src={user.avatarUrl || "./src/app/assets/images/daisy.jpg"}
              alt="avatar"
            />
            <div className="font-medium">{user.userName}</div>
            <div>
              <div
                className="border-1 border-text mt-2.5 mb-4 text-text hover:border-pblue hover:text-pblue cursor-pointer rounded-lg flex items-center h-8 font-medium justify-center text-sm"
                onClick={() => nav("/profileedit")}
              >
                Chỉnh sửa thông tin cá nhân
              </div>
            </div>
            <div className="flex justify-between items-center text-text mb-4 text-sm">
              <div>
                <span className="font-medium mr-1">{user.followers}</span>followers
              </div>
              <div>
                <span className="font-medium mr-1">{user.followings}</span>followings
              </div>
            </div>
            <div className="text-sm whitespace-pre-line text-text">
              {user.bio}
            </div>
          </div>
          <div>
            <TabSection posts={posts} followings={followings} />
          </div>
        </div>
      </div>
    </div>
  );
}
