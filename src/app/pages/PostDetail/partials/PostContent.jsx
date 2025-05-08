import React from "react";

export default function PostContent({ post }) {
  return (
    <div className="mx-auto w-[700px]">
      <div className="mt-4">
        <p className="text-sm text-text">{post.topic}</p>
        <p className="text-[40px] leading-tight my-4 text-text font-semibold">
          {post.title}
        </p>
        <p className="text-text2 ">{post.subTitle}</p>
        <div className="flex justify-between mt-4 items-center">
          <div className="flex  items-center">
            <img
              className="w-14 h-14  object-cover rounded-full mr-2.5"
              src={post.user.avatar}
            />
            <div className="text-sm font-semibold">
              <p className="text-text">{post.user.name}</p>
              <p className="text-text2">{post.date}</p>
            </div>
          </div>
          <div className="border border-text2  cursor-pointer text-text2 px-8 py-2 font-semibold text-sm rounded-3xl flex items-center justify-center">
            Theo dõi
          </div>
        </div>
      </div>

      <div className="h-screen mt-7 bg-pblue"> đây là nội dung bài viết</div>
    </div>
  );
}
