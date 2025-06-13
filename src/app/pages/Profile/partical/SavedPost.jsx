import React from "react";
import { Bookmark, ThumbsUp } from "lucide-react";
import formatDate from "../../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import { unSave } from "../ProfileService";
import { toast } from "react-toastify";
export default function SavedPost({ post, refresh }) {
  const nav = useNavigate();

  const imageUrl = post?.contentBlock?.find(
    (block) => block.type === "image"
  ).value;
  const handleUnsaved = async (e, postId) => {
    e.stopPropagation();
    const save = {
      userId: localStorage.getItem("user_id"),
      postId: postId,
    };
    const res = await unSave(save);
    if (res?.status === 200) {
      toast.success(`Đã bỏ lưu bài viết!`);
      refresh();
    } else toast.warn("Lỗi khibỏ lưu bài viết!");
  };
  return (
    <div
      className=" flex flex-col cursor-pointer w-full "
      onClick={() => nav(`/post-detail/${post?.postId}`)}
    >
      <div className="mb-2 w-full">
        <img
          src={imageUrl || "/src/app/assets/images/defaultImage.png"}
          className="rounded-sm h-40 w-full object-cover"
        />
      </div>
      <div className="">
        <div className="flex mb-2 justify-between">
          <div className="font-medium line-clamp-1 min-h-6">{post?.postId}</div>
          <div>
            <Bookmark
              className="h-5 text-pblue hover:stroke-3  "
              onClick={(e) => handleUnsaved(e, post.postId)}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="mr-2">
                <img
                  src={
                    post?.userImage ||
                    "/src/app/assets/images/defaultAvatar.jpg"
                  }
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
            <ThumbsUp className="h-4" />
            <p className="4 ml-1 text-sm"> {post?.countLike}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
