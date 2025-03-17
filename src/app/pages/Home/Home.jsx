import React from "react";
import PostSection from "./partials/PostSection";
import OtherAccount from "./partials/OtherAccount";
import PostV from "./partials/PostV";
import TabSection from "./partials/TabSection";
import AccountSection from "./partials/AccountSection";

export default function Home() {
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
  const users = [
    {
      avatar: "./src/app/assets/images/daisy.jpg",
      name: "Daisy",
      bio: "Ngày em biết nhờ thương một người là ngày tôi biết phải xa em rồi",
      isFollow: true,
    },
    {
      avatar: "./src/app/assets/images/daisy.jpg",
      name: "Daisy",
      bio: "Ngày em biết nhờ thương một người là ngày tôi biết phải xa em rồi",
      isFollow: true,
    },
    {
      avatar: "./src/app/assets/images/daisy.jpg",
      name: "Daisy",
      bio: "Ngày em biết nhờ thương một người là ngày tôi biết phải xa em rồi",
      isFollow: true,
    },
  ];
  return (
    <div className="flex  min-h-screen ">
      <div className="w-6xl mx-auto">
        <div className="flex flex-col w-full">
          <div className="mb-6">
            <PostSection title={"NỔI BẬT"} posts={posts} />
            <PostSection title={"BÀI VIẾT MỚI"} posts={posts} />
          </div>
          <div className="grid grid-cols-13 gap-x-10 w-full mb-10">
            <div className="col-span-9 ">
              <TabSection posts={posts} />
            </div>
            <div className="col-span-4 mt-10">
              <AccountSection users={users} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
