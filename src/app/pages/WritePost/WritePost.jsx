/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from "react";
import Editor from "./partials/Editor";
import { createPostApi, getTopics } from "./writePostService";
import { ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";

export default function WritePost() {
  const [data, setData] = useState(null);
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [images, setImages] = useState([]);
  const userId = localStorage.getItem("user_id");
  const editorDataRef = useRef(null);

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
        value = JSON.stringify(block.data);
      }
      return { type: block.type, value };
    });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("userId", userId);
    formData.append("topicId", selectedTopic);
    formData.append("blocks", JSON.stringify(formattedContent));
    images.forEach((imageFile) => {
      formData.append("images", imageFile);
    });
    console.log("Submit post with FormData:", Object.fromEntries(formData));
    try {
      const response = await createPostApi(formData);
      if (response?.status === 200)
        console.log("Tạo bài viết thành công:", response);
    } catch (error) {
      console.error("Gửi bài viết thất bại:", error);
    }
  };

  const canSubmit =
    title.trim() !== "" &&
    selectedTopic !== "" &&
    (editorDataRef.current?.blocks?.length > 0 || images.length > 0);

  return (
    <div className="min-h-screen bg-bgblue py-8 px-4 sm:px-6 lg:px-8">
      {" "}
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="flex items-center text-sblue hover:text-pblue transition-colors duration-200 p-2 rounded-md hover:bg-pblue/10"
            aria-label="Quay về trang chủ"
          >
            <ArrowLeft size={24} className="mr-2" />
            <span className="font-medium">Về Trang Chủ</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Tạo bài viết mới</h1>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 space-y-6">
          <div>
            <label
              htmlFor="post-title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tiêu đề bài viết <span className="text-red-500">*</span>
            </label>
            <input
              id="post-title"
              spellCheck="false"
              type="text"
              placeholder="Nhập tiêu đề ..."
              className="w-full text-xl font-semibold p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pblue focus:border-pblue transition-shadow"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Chọn topic */}
          <div>
            <label
              htmlFor="topic-select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Chọn chủ đề <span className="text-red-500">*</span>
            </label>
            <select
              id="topic-select"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-pblue focus:border-pblue appearance-none"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              <option value="" disabled>
                -- Vui lòng chọn một chủ đề --
              </option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nội dung bài viết <span className="text-red-500">*</span>
            </label>
            <div className="border border-gray-300 rounded-md  min-h-[300px] focus-within:ring-2 focus-within:ring-pblue focus-within:border-pblue">
              <Editor
                data={data}
                placeholder="Viết nội dung sáng tạo của bạn ở đây..."
                onChange={handleEditorChange}
                editorBlock="editorjs-container"
                onImageUpload={handleImageUpload}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-200 mt-8">
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`flex items-center cursor-pointer bg-sblue text-white px-8 py-2 rounded-lg font-semibold text-lg
                hover:bg-pblue transition-all duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-sblue focus:ring-offset-2
                disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70`}
            >
              <Send size={20} className="mr-2 ml-[-10px]" />
              Đăng bài
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
