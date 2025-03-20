import React from "react";
import TabSection from "./partials/TabSection";
import { useParams } from "react-router-dom";

export default function Topic() {
  const { topicName } = useParams();
  const topicEx = {
    topicName: "quan_diem_tranh_luan",
    label: "QUAN ĐIỂM - TRANH LUẬN",
    description:
      "Các nội dung thể hiện góc nhìn, quan điểm đa chiều về các vấn đề kinh tế, văn hoá – xã hội trong và ngoài nước.",
  };
  const posts = [
    {
      id: "jawefdjaw",
      image: "/src/app/assets/images/img1.jpg",
      title: "Bạn có tin vào những điều kì diệu không như bầu trời này ấy?",
      subTitle: "Có những ngày bình yên đến lạ",
      date: "14-02-1025",
      user: {
        avatar: "/src/app/assets/images/daisy.jpg",
        name: "Daisy",
      },
      topic: "QUAN ĐIỂM - TRANH LUẬN",
      likes: 100,
      comments: 29,
    },
    {
      id: "sdqw",
      image: "/src/app/assets/images/img1.jpg",
      title: "Bạn có tin vào những điều kì diệu không như bầu trời này ấy?",
      subTitle: "Có những ngày bình yên đến lạ Có những ngày bình yên đến lạ",
      date: "14-02-1025",
      user: {
        avatar: "/src/app/assets/images/daisy.jpg",
        name: "Daisy",
      },
      topic: "QUAN ĐIỂM - TRANH LUẬN",
      likes: 100,
      comments: 29,
    },
    {
      id: "sdqw",
      image: "/src/app/assets/images/img1.jpg",
      title: "Bạn có tin?",
      subTitle: "Có những ngày bình yên đến lạ Có những ngày bình yên đến lạ",
      date: "14-02-1025",
      user: {
        avatar: "/src/app/assets/images/daisy.jpg",
        name: "Daisy",
      },
      topic: "QUAN ĐIỂM - TRANH LUẬN",
      likes: 100,
      comments: 29,
    },
    {
      id: "sdqw",
      image: "/src/app/assets/images/img1.jpg",
      title: "Bạn có tin vào những điều kì diệu không như bầu trời này ấy?",
      subTitle: "Có những ngày bình yên đến lạ Có những ngày bình yên đến lạ",
      date: "14-02-1025",
      user: {
        avatar: "/src/app/assets/images/daisy.jpg",
        name: "Daisy",
      },
      topic: "QUAN ĐIỂM - TRANH LUẬN",
      likes: 100,
      comments: 29,
    },
  ];
  return (
    <div>
      <div className="relative">
        <div className="absolute inset-0 bg-black/50 flex justify-center items-center text-white text-5xl font-semibold">
          {topicEx.label}
        </div>
        <img src="/src/app/assets/images/qđtl.png" className="w-full h-96" />
      </div>
      <div className="mx-auto w-6xl mt-4">
        <div className="grid grid-cols-13 gap-x-10 w-full mb-10">
          <div className="col-span-9 ">
            <TabSection posts={posts} />
          </div>
          <div className="col-span-4 mt-0 text-text">
            <div className="p-4 border-1 h-fit  border-text2">
              <div className="text-xl font-medium">{topicEx.label}</div>
              <div className="font-medium mb-1 mt-4">Nội dung cho phép</div>
              <div className="text-sm">{topicEx.description}</div>
              <div className="font-medium mb-1 mt-4">Quy định</div>
              <ul className="text-sm list-disc pl-5">
                <li>
                  Những nội dung không thuộc phạm trù của danh mục sẽ bị nhắc
                  nhở và xoá (nếu không thay đổi thích hợp)
                </li>
                <li>Nghiêm cấm spam, quảng cáo</li>
                <li>
                  Nghiêm cấm post nội dung 18+ hay những quan điểm cực đoan liên
                  quan tới chính trị - tôn giáo
                </li>
                <li>Nghiêm cấm phát ngôn thiếu văn hoá và đả kích cá nhân.</li>
                <li>Nghiêm cấm bài đăng không ghi rõ nguồn nếu đi cóp nhặt.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
