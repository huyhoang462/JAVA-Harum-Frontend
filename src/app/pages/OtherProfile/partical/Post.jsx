import { Bookmark, BookMarked } from "lucide-react";
import React from "react";

export default function Post({ post }) {
  return (
    <div className="w-[276px]  flex flex-col cursor-pointer">
      <div className="mb-2">
        <img src={post?.image} className="rounded-sm h-[172px]" />
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
