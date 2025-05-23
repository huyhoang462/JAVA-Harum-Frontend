import { Eye, MessageCircleMore, ThumbsUp } from "lucide-react";
import formatDate from "../../../utils/formatDate";
import React from "react";

export default function PostV({ post }) {
  return (
    <div className="flex w-full cursor-pointer  ">
      <img
        src={post?.image || "/src/app/assets/images/defaultImage.png"}
        className="h-40 w-64 object-cover"
      />
      <div className="flex flex-col justify-between w-full ml-4">
        <div className="text-ssm ">{post?.topic}</div>
        <div className="text-xl font-medium line-clamp-2 min-h-14 ">
          {post?.title}
        </div>
        <div className=" line-clamp-1 ">{post?.subTitle}</div>
        <div className="flex justify-between items-center">
          <div className=" flex items-center ">
            <img
              src={
                post?.user?.avatar || "/src/app/assets/images/defaultAvatar.jpg"
              }
              className="rounded-full h-10 w-10 object-cover mr-2.5"
            />
            <div className="font-bold text-sm mr-5">{post?.username}</div>
            <div className="text-ssm ">{formatDate(post?.createdAt)}</div>
          </div>
          <div className=" flex">
            <div className="text-ssm flex items-center mr-2.5">
              <ThumbsUp className="h-4  text-text2" />
              {post?.countLike}
            </div>
            <div className="text-ssm flex items-center">
              <Eye className="h-4  text-text2" />
              {post?.countView}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
