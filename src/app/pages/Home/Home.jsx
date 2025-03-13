import React from "react";
import PostH from "./partials/PostH";
import PostSection from "./partials/PostSection";
import OtherAccount from "./partials/OtherAccount";

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
          <PostSection title={"NỔI BẬT"} posts={posts} />
          <PostSection title={"BÀI VIẾT MỚI"} posts={posts} />
          <div className=" flex justify-between">
            <div></div>
            <div className="w-[350px] p-4 border-1 border-text2">
              <div className="flex justify-between mb-4">
                <p className="font-medium">Cây bút nổi bật</p>
                <p className="text-ssm hover:text-pblue text-text2 cursor-pointer">
                  Xem thêm
                </p>
              </div>
              <div className="flex flex-col gap-y-2">
                {users.map((user, index) => (
                  <OtherAccount user={user} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
