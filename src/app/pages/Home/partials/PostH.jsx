import { Bookmark, BookMarked, Eye } from "lucide-react";
import React from "react";
import formatDate from "../../../utils/formatDate";
import { useNavigate } from "react-router-dom";

export default function PostH({ post }) {
  const nav = useNavigate();

  return (
    <div
      className="w-[276px]  flex flex-col cursor-pointer"
      onClick={() => nav(`/post-detail/${post?.id}`)}
    >
      <div className="mb-2">
        <img
          src={post?.imageUrl || "/src/app/assets/images/defaultImage.png"}
          className="rounded-sm h-[172px] object-cover"
        />
      </div>
      <div>
        <div className="flex mb-2 justify-between">
          <div className="font-medium line-clamp-2 min-h-12">{post?.title}</div>
          <div>
            <Bookmark className="h-6" />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="mr-2">
                <img
                  src={post?.userImage}
                  className="h-8 w-8 object-cover rounded-full "
                />
              </div>
              <div className="font-semibold text-[14px]">{post?.username}</div>
            </div>
            <div className="text-[12px] ml-5 text-text2">
              {" "}
              {formatDate(post?.createdAt)}
            </div>
          </div>
          <div className="flex  items-center">
            <Eye className="h-6" />
            <p className="h-6 ml-2 text-sm"> {post?.countView}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
