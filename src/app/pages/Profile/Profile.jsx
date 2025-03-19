import React from "react";

export default function Profile() {
  const user = {
    userName: "Lewy Hoang",
    followers: 123114,
    following: 1,
    likes: 231232,
    bio: "Là những ngày miệt mài bên sách vở\nNgắm nhìn em chốn giảng đường lao xao\nLà những lần ngồi sau xe anh chở\nNhững ngày đó giờ ở nơi chốn nào",
  };
  return (
    <div className="flex  min-h-screen ">
      <div className="w-6xl mx-auto">
        <div className="flex gap-x-10">
          <div className=" w-[260px] pt-20 ">
            <div className="font-medium">{user.userName}</div>
            <div>
              <div className="bg-sblue mt-2.5 mb-4 text-white hover:bg-pblue cursor-pointer rounded-lg flex items-center h-8 font-medium justify-center text-sm ">
                Chỉnh sửa thông tin cá nhân
              </div>
            </div>
            <div className="flex justify-between items-center text-text mb-4 text-sm">
              <div className="font-medium">
                <div className="font-medium">{user.followers}</div>
                followers
              </div>
              <div className="font-medium">
                <div className="font-medium">{user.following}</div>
                following
              </div>
              <div className="font-medium">
                <div className="font-medium">{user.likes}</div>
                likes
              </div>
            </div>
            <div className="text-sm whitespace-pre-line text-text">
              {user.bio}
            </div>
          </div>
          <div className="bg-green-100 ">ád</div>
        </div>
      </div>
    </div>
  );
}
