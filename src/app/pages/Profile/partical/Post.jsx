import { Bookmark, BookMarked } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Post({ post }) {
  const nav = useNavigate();
  const imageUrl = post?.contentBlock.find(
    (block) => block.type === "image"
  ).value;
  return (
    <div
      className="w-[276px]  flex flex-col cursor-pointer"
      onClick={() => nav(`/post-detail/${post?.id}`)}
    >
      <div className="mb-2">
        <img
          src={imageUrl || "/src/app/assets/images/defaultImage.png"}
          className="h-40 w-72 object-cover "
        />
      </div>
      <div>
        <div className="flex mb-2 justify-between">
          <div className="font-medium line-clamp-2 min-h-12">{post?.title}</div>
          <div>
            <Bookmark className="h-6" />
          </div>
        </div>
        <div className="text-sm mb-2.5 line-clamp-1">{post?.subTitle}</div>
        <div className="text-[12px] ml-5 text-text2">{post?.date}</div>
      </div>
    </div>
  );
}
