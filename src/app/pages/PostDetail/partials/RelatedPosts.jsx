import React from "react";
import PostH from "./PostH";

export default function RelatedPosts({ post }) {
  return (
    <div className="mx-auto mt-4">
      <p className="font-semibold text-text">Bài viết liên quan</p>
      <div className="flex gap-x-4 p-5 px-8 shadow-lg mt-2.5">
        <PostH post={post} />
        <PostH post={post} />
        <PostH post={post} />
      </div>
    </div>
  );
}
