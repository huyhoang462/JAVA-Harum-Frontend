import React, { useState } from "react";
import PostV from "./PostV";

const TabSection = ({ posts }) => {
  const [activeTab, setActiveTab] = useState("forYou");

  const filteredPosts = {
    forYou: posts.slice(0, 3),
    new: posts,
    outstanding: posts,
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
            activeTab === "new"
              ? "border-b-2 border-pblue text-pblue"
              : "text-text"
          }`}
          onClick={() => setActiveTab("new")}
        >
          Bài viết mới
        </button>
        <button
          className={`pb-2 cursor-pointer px-4 ${
            activeTab === "outstanding"
              ? "border-b-2 border-pblue text-pblue"
              : "text-text"
          }`}
          onClick={() => setActiveTab("outstanding")}
        >
          Nổi bật
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
