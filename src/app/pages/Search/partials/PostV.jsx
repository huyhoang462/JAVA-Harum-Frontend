import { Eye, MessageCircleMore, ThumbsUp } from "lucide-react";
import formatDate from "../../../utils/formatDate";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PostV({ post }) {
  const nav = useNavigate();

  const imageUrl = post?.contentBlock.find(
    (block) => block.type === "image"
  ).value;
  return (
    <div
      className="flex w-full cursor-pointer"
      onClick={() => nav(`/post-detail/${post?.id}`)}
    >
      <div>
        <img
          src={imageUrl || "/src/app/assets/images/defaultImage.png"}
          className="h-40 w-60 object-cover"
        />
      </div>

      <div className="flex flex-col justify-between w-full ml-4">
        <div>
          <div className="text-ssm text-text2 font-medium">
            {post?.topicName?.toUpperCase()}
          </div>
          <div className="text-xl font-medium line-clamp-2 min-h-14 ">
            {post?.title}
          </div>
        </div>
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
