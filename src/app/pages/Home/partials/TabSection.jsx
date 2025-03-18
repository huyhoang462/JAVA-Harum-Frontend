import React, { useState } from "react";
import PostV from "./PostV";

const TabSection = ({ posts }) => {
  const [activeTab, setActiveTab] = useState("forYou");

  const filteredPosts = {
    forYou: posts.slice(0, 3),
    byAuthor: posts.filter((post) => post.user.name === "Daisy"),
    topRated: posts.sort((a, b) => b.likes - a.likes).slice(0, 3),
  };

  return (
    <div>
      <div className="flex text-lg  mb-4">
        <button
          className={`pb-2 cursor-pointer px-4 ${
            activeTab === "forYou"
              ? "border-b-2 border-pblue text-pblue"
              : "text-text"
          }`}
          onClick={() => setActiveTab("forYou")}
        >
          Dành cho bạn
        </button>
        <button
          className={`pb-2 cursor-pointer px-4 ${
            activeTab === "byAuthor"
              ? "border-b-2 border-pblue text-pblue"
              : "text-text"
          }`}
          onClick={() => setActiveTab("byAuthor")}
        >
          Theo tác giả
        </button>
        <button
          className={`pb-2 cursor-pointer px-4 ${
            activeTab === "topRated"
              ? "border-b-2 border-pblue text-pblue"
              : "text-text"
          }`}
          onClick={() => setActiveTab("topRated")}
        >
          Đánh giá cao nhất
        </button>
      </div>

      <div className="flex flex-col gap-y-6">
        {filteredPosts[activeTab].map((post, index) => (
          <PostV key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default TabSection;
