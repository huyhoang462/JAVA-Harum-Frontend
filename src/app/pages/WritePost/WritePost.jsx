/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from "react";
import Editor from "./partials/Editor";
import { createPostApi, getTopics } from "./writePostService";

export default function WritePost() {
  const [data, setData] = useState(null);
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [images, setImages] = useState([]);
  const userId = localStorage.getItem("user_id");
  const editorDataRef = useRef(null); // Lưu data editor không gây re-render

  useEffect(() => {
    const fetchTopics = async () => {
      const res = await getTopics();
      if (res?.data) {
        setTopics(res.data);
      }
    };

    fetchTopics();
  }, []);

  const handleEditorChange = (editorData) => {
    editorDataRef.current = editorData;
  };
  const handleImageUpload = useCallback((file) => {
    console.log("LOG TỪ WritePost: Ảnh đã được chọn:", file.name);
    setImages((prevImages) => [...prevImages, file]);
  }, []);
  const handleSubmit = async () => {
    const blocks = editorDataRef.current?.blocks || [];

    const formattedContent = blocks.map((block) => {
      let value = "";

      if (block.type === "image") {
        value = "";
      } else if (block.data.text) {
        value = block.data.text;
      } else {
        // fallback nếu không có text
        value = JSON.stringify(block.data);
      }

      return {
        type: block.type,
        value,
      };
    });

    const post = {
      title: title,
      topic: selectedTopic,
      userId: userId,
      blocks: formattedContent,
      images: images,
    };
    const formData = new FormData();
    formData.append("title", title);
    formData.append("userId", userId);
    formData.append("topicId", selectedTopic);
    formData.append("blocks", JSON.stringify(formattedContent));
    images.forEach((imageFile) => {
      formData.append("images", imageFile);
    });
    console.log("Submit post:", post);
    try {
      const response = await createPostApi(formData);
      if (response?.status === 200)
        console.log("Tạo bài viết thành công:", response);
    } catch (error) {
      console.error("Gửi bài viết thất bại:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      {/* Tiêu đề */}
      <input
        type="text"
        placeholder="Nhập tiêu đề bài viết..."
        className="w-full text-3xl font-bold p-3 border-b focus:outline-none focus:border-sblue"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Chọn topic */}
      <select
        className="w-full p-2 border rounded-md bg-white focus:outline-none focus:ring"
        value={selectedTopic}
        onChange={(e) => setSelectedTopic(e.target.value)}
      >
        <option value="">-- Chọn chủ đề --</option>
        {topics.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.name}
          </option>
        ))}
      </select>

      {/* EditorJS */}
      <div>
        <Editor
          data={data}
          placeholder="Nội dung"
          onChange={handleEditorChange}
          editorBlock="editorjs-container"
          onImageUpload={handleImageUpload}
        />
      </div>

      {/* Submit */}
      <div className="text-right pt-4">
        <button
          onClick={handleSubmit}
          className="bg-sblue text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Đăng bài
        </button>
      </div>
    </div>
  );
}
