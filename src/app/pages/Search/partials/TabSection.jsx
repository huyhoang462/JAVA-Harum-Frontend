import React, { useState } from "react";
import PostV from "./PostV";
import { FileText, UserRound } from "lucide-react";
const TabSection = () => {
  const users = [
    {
      id: 1,
      avatar: "./src/app/assets/images/daisy.jpg",
      name: "Daisy",
    },
    {
      id: 2,
      avatar: "./src/app/assets/images/daisy.jpg",
      name: "Chill guy",
    },
    {
      id: 3,
      avatar: "./src/app/assets/images/daisy.jpg",
      name: "Hoa cỏ lau",
    },
    {
      id: 4,
      avatar: "./src/app/assets/images/daisy.jpg",
      name: "Trịnh Trần Phương Tuấn",
    },
    {
      id: 5,
      avatar: "./src/app/assets/images/daisy.jpg",
      name: "Bà già nghèo khổ giữa trời đông cô đơn",
    },
    {
      id: 6,
      avatar: "./src/app/assets/images/daisy.jpg",
      name: "Daisy",
    },
    {
      id: 7,
      avatar: "./src/app/assets/images/daisy.jpg",
      name: "Daisy",
    },
  ];
  const posts = [
    {
      id: "jawefdjaw",
      image: "./src/app/assets/images/img1.jpg",
      title: "Bạn có tin vào những điều kì diệu không như bầu trời này ấy?",
      subTitle: "Có những ngày bình yên đến lạ",
      date: "14-02-1025",
      user: {
        avatar: "./src/app/assets/images/daisy.jpg",
        name: "Daisy",
      },
      topic: "QUAN ĐIỂM - TRANH LUẬN",
      likes: 100,
      comments: 29,
    },
    {
      id: "sdqw",
      image: "./src/app/assets/images/img1.jpg",
      title: "Bạn có tin vào những điều kì diệu không như bầu trời này ấy?",
      subTitle: "Có những ngày bình yên đến lạ Có những ngày bình yên đến lạ",
      date: "14-02-1025",
      user: {
        avatar: "./src/app/assets/images/daisy.jpg",
        name: "Daisy",
      },
      topic: "QUAN ĐIỂM - TRANH LUẬN",
      likes: 100,
      comments: 29,
    },
    {
      id: "sdqw",
      image: "./src/app/assets/images/img1.jpg",
      title: "Bạn có tin?",
      subTitle: "Có những ngày bình yên đến lạ Có những ngày bình yên đến lạ",
      date: "14-02-1025",
      user: {
        avatar: "./src/app/assets/images/daisy.jpg",
        name: "Daisy",
      },
      topic: "QUAN ĐIỂM - TRANH LUẬN",
      likes: 100,
      comments: 29,
    },
    {
      id: "sdqw",
      image: "./src/app/assets/images/img1.jpg",
      title: "Bạn có tin vào những điều kì diệu không như bầu trời này ấy?",
      subTitle: "Có những ngày bình yên đến lạ Có những ngày bình yên đến lạ",
      date: "14-02-1025",
      user: {
        avatar: "./src/app/assets/images/daisy.jpg",
        name: "Daisy",
      },
      topic: "QUAN ĐIỂM - TRANH LUẬN",
      likes: 100,
      comments: 29,
    },
  ];
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="py-4 px-8 mt-4 border-2 border-gray-200 rounded-xl">
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
        <div className="flex flex-col  gap-y-4 ">
          {posts.map((post, index) => (
            <PostV key={index} post={post} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-10">
          {users.map((user, index) => (
            <div key={index} className="flex ">
              <div className="w-80 h-16 border-1 border-text2 rounded-sm flex items-center ">
                <img
                  src={user.avatar}
                  className="w-12 h-12 object-cover rounded-full mx-4 shrink-0"
                />
                <div className="font-semibold text-text mr-2">{user.name}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TabSection;
