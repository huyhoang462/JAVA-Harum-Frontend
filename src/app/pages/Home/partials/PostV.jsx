import { MessageCircleMore, ThumbsUp } from "lucide-react";
import React from "react";
import formatDate from "../../../utils/formatDate";

export default function PostV({ post }) {
  return (
    <div className="flex w-full cursor-pointer  ">
      <img
        src={post?.imageUrl || "/src/app/assets/images/defaultImage.png"}
        className="h-40 w-64 object-cover "
      />
      <div className="flex flex-col justify-between w-full ml-4">
        <div>
          <div className="text-ssm mb-1">{post?.topic}</div>
          <div className="text-xl font-medium line-clamp-2 min-h-14 ">
            {post?.title}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className=" flex items-center ">
            <img
              src={post?.userImage}
              className="rounded-full h-10 w-10 object-cover mr-2.5"
            />
            <div className="font-bold text-sm mr-5">{post?.username}</div>
            <div className="text-ssm ">{formatDate(post?.createdAt)}</div>
          </div>
          <div className=" flex">
            <div className="text-ssm flex items-center mr-2.5">
              <ThumbsUp className="h-4  text-text2" />
              {post?.likes}
            </div>
            <div className="text-ssm flex items-center">
              <MessageCircleMore className="h-4  text-text2" />
              {post?.comments}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
