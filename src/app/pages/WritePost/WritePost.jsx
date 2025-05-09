import React, { useState, useEffect, useRef } from "react";
import Editor from "./partials/Editor";
import { createPostApi, getTopics } from "./writePostService";

const DEFAULT_THUMBNAIL = "./src/app/assets/images/img1.jpg"; // Ảnh mặc định

export default function WritePost() {
  const [data, setData] = useState(null);
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(DEFAULT_THUMBNAIL);
  const userId = localStorage.getItem("user_id");
  const editorDataRef = useRef(null); // Lưu data editor không gây re-render

  useEffect(() => {
    const fetchTopics = async () => {
      const res = await getTopics();
      if (res?.data) {
        setTopics(res.data); // res.data là mảng topics từ API
      }
    };

    fetchTopics();
  }, []);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(file);
      setThumbnailPreview(URL.createObjectURL(file));
    } else {
      setImageUrl(null);
      setThumbnailPreview(DEFAULT_THUMBNAIL);
    }
  };

  const handleEditorChange = (editorData) => {
    editorDataRef.current = editorData; // Không re-render
  };

  const handleSubmit = async () => {
    const post = {
      title: title,
      topic: selectedTopic,
      imageUrl: imageUrl,
      userId: userId,
      content: editorDataRef.current,
    };

    console.log("Submit post:", post);
    try {
      const response = await createPostApi(post);
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

      {/* Ảnh đại diện */}
      <div className="space-y-2">
        <label className="font-medium block">Ảnh đại diện</label>

        {/* Input file bị ẩn */}
        <input
          type="file"
          accept="image/*"
          id="thumbnail-upload"
          onChange={handleThumbnailChange}
          className="hidden"
        />

        {/* Click vào ảnh sẽ mở input file */}
        <label htmlFor="thumbnail-upload" className="cursor-pointer block">
          <img
            src={thumbnailPreview || "/default-thumbnail.jpg"}
            alt="Thumbnail Preview"
            className="w-full h-56 object-cover rounded-md border hover:opacity-90 transition"
          />
        </label>
      </div>

      {/* EditorJS */}
      <div>
        <Editor
          data={data}
          placeholder="Nội dung"
          onChange={handleEditorChange}
          editorBlock="editorjs-container"
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
