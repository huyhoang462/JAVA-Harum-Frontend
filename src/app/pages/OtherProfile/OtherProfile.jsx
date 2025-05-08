import React from "react";
import { useNavigate } from "react-router-dom";
import TabSection from "./partical/TabSection";
import Post from "./partical/Post";

export default function OtherProfile() {
  const nav = useNavigate();
  const user = {
    userName: "Lewy Hoang",
    followers: 123114,
    following: 1,
    likes: 231232,
    bio: "Là những ngày miệt mài bên sách vở\nNgắm nhìn em chốn giảng đường lao xao\nLà những lần ngồi sau xe anh chở\nNhững ngày đó giờ ở nơi chốn nào",
  };
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
  return (
    <div className="flex  min-h-screen ">
      <div className="w-6xl mx-auto">
        <div className="flex gap-x-10">
          <div className=" w-64 pt-20 relative ">
            <img
              className="rounded-full  w-[140px] h-[140px] object-cover absolute left-0 top-[-70px]"
              src="./src/app/assets/images/daisy.jpg"
            />
            <div className="font-medium">{user.userName}</div>
            <div>
              <div
                className="border-1  mt-2.5 mb-4 text-tex border-pblue text-pblue cursor-pointer rounded-lg flex items-center h-8 font-medium justify-center text-sm "
                
              >
               Theo dõi
              </div>
            </div>
            <div className="flex justify-between items-center text-text mb-4 text-sm">
              <div className="">
                <div className="font-medium">{user.followers}</div>
                followers
              </div>
              <div className="">
                <div className="font-medium">{user.following}</div>
                following
              </div>
              <div className="">
                <div className="font-medium">{user.likes}</div>
                likes
              </div>
            </div>
            <div className="text-sm whitespace-pre-line text-text">
              {user.bio}
            </div>
          </div>
          <div>
          <TabSection posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
}
