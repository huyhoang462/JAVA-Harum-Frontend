import React, { useEffect, useRef, useState } from "react";
import TabSection from "./partials/TabSection";
import { useLocation } from "react-router-dom";
import { getPostsByTopic } from "./topicService";

export default function Topic() {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const topic = location.state?.topic;
  const hasFetchedRef = useRef(false); // ✅ biến cờ

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPostsByTopic(topic?.id);
        if (res.status === 200) {
          setPosts(res?.data?.content);
        } else {
          console.error("Lỗi: Không lấy được bài viết");
        }
      } catch (error) {
        console.error("Lỗi gọi API:", error);
      }
    };

    if (topic && !hasFetchedRef.current) {
      hasFetchedRef.current = true; // ✅ chỉ cho gọi một lần
      fetchPost();
    }
  }, [topic]);
  if (!topic) {
    return (
      <div className="text-center mt-10 text-xl">Không tìm thấy topic!</div>
    );
  }

  return (
    <div>
      <div className="relative">
        <div className="absolute inset-0 bg-black/50 flex justify-center items-center text-white text-5xl font-semibold">
          {topic?.name?.toString().toUpperCase()}
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
              <div className="text-xl font-medium">
                {topic?.name?.toString().toUpperCase()}
              </div>
              <div className="font-medium mb-1 mt-4">Nội dung cho phép</div>
              <div className="text-sm">{topic?.description}</div>
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
