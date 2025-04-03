import React, { useState } from "react";
import Editor from "./partials/Editor";

export default function WritePost() {
  const [title, setTitle] = useState("");

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Tiêu đề bài viết */}
      <input
        type="text"
        placeholder="Enter your title here..."
        className="w-full text-3xl font-bold p-3 mb-4 border-b focus:outline-none focus:border-blue-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Vùng Editor */}
      <Editor />
    </div>
  );
}
