/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from "react";
import Editor from "./partials/Editor";
import { getTopics, getPostById, updatePostApi } from "./editPostService";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPost() {
  const { id: postId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [topics, setTopics] = useState([]);

  const [images, setImages] = useState([]);

  const [editorDataForLoad, setEditorDataForLoad] = useState(null);
  const editorDataRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await getTopics();
        setTopics(res?.data || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách topics:", error);
        setTopics([]);
      }
    };
    fetchTopics();
  }, []);

  useEffect(() => {
    if (!postId) {
      setIsLoading(false);
      console.warn("EditPost: Không có postId để fetch bài viết.");
      return;
    }
    setIsLoading(true);
    const fetchPost = async () => {
      try {
        const res = await getPostById(postId);
        if (res?.data) {
          const post = res.data;
          setTitle(post.title || "");
          setSelectedTopic(post.topicId || "");

          const convertedBlocks =
            post.contentBlock?.map((blockFromApi) => {
              let editorJsBlockData = {};
              const blockType = blockFromApi.type;
              const blockValueString = blockFromApi.value;

              if (blockType === "image") {
                editorJsBlockData = {
                  file: {
                    url: blockValueString, // `value` chính là URL của ảnh
                  },
                  caption: "",
                  withBorder: false,
                  stretched: false,
                  withBackground: false,
                };
              } else if (["paragraph", "header", "quote"].includes(blockType)) {
                editorJsBlockData = { text: blockValueString || "" };
              } else {
                try {
                  editorJsBlockData =
                    typeof blockValueString === "string"
                      ? JSON.parse(blockValueString)
                      : blockValueString || {};
                } catch (e) {
                  editorJsBlockData = {};
                }
              }
              return { type: blockType, data: editorJsBlockData };
            }) || [];

          setEditorDataForLoad({
            time: new Date().getTime(),
            blocks: convertedBlocks,
            version: undefined,
          });
        } else {
          console.warn(
            "EditPost: Không tìm thấy dữ liệu bài viết cho ID:",
            postId
          );
          setEditorDataForLoad({ time: new Date().getTime(), blocks: [] }); // Để Editor không lỗi
        }
      } catch (error) {
        console.error("EditPost: Lỗi khi lấy dữ liệu bài viết:", error);
        setEditorDataForLoad({ time: new Date().getTime(), blocks: [] }); // Để Editor không lỗi
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const handleEditorChange = useCallback((currentEditorJsData) => {
    editorDataRef.current = currentEditorJsData;
  }, []);

  const handleImageUpload = useCallback((file) => {
    console.log("chọn ảnh xong: ", file.name);

    setImages((prevImages) => [...prevImages, file]);
  }, []);

  const handleUpdate = async () => {
    if (
      !editorDataRef.current ||
      !editorDataRef.current.blocks ||
      isSubmitting
    ) {
      console.warn("EditPost: Chưa có dữ liệu blocks từ editor hoặc đang gửi.");
      return;
    }
    if (!selectedTopic) {
      alert("Vui lòng chọn chủ đề cho bài viết.");
      return;
    }
    if (!title.trim()) {
      alert("Vui lòng nhập tiêu đề cho bài viết.");
      return;
    }

    setIsSubmitting(true);

    const currentEditorBlocks = editorDataRef.current.blocks; // Không cần || [] nữa vì đã check ở trên

    const blocksToSave = currentEditorBlocks.map((block) => {
      let valueToSave = "";
      const blockType = block.type;
      const blockData = block.data;

      if (blockType === "image") {
        valueToSave = ""; // Giống WritePost
      } else if (
        blockData &&
        typeof blockData.text === "string" && // Đảm bảo blockData.text tồn tại
        (blockType === "paragraph" ||
          blockType === "header" ||
          blockType === "quote")
      ) {
        valueToSave = blockData.text; // Giống WritePost
      } else {
        valueToSave = JSON.stringify(blockData || {}); // Giống WritePost
      }

      return {
        type: block.type,
        value: valueToSave,
      };
    });
    const post = {
      title: title,
      topic: selectedTopic,
      blocks: blocksToSave,
      images: images,
    };
    const formData = new FormData();
    formData.append("title", title);
    formData.append("topicId", selectedTopic);
    formData.append("blocks", JSON.stringify(blocksToSave));

    images.forEach((imageFile) => {
      formData.append("images", imageFile);
    });

    console.log("thông tin: ", post);

    try {
      const responseData = await updatePostApi(postId, formData); // postId dùng cho URL

      alert("Cập nhật bài viết thành công!");
      console.log("Phản hồi từ API cập nhật:", responseData);
    } catch (error) {
      console.error("Lỗi khi gọi API cập nhật bài viết:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Lỗi không xác định khi cập nhật.";
      alert(`Cập nhật thất bại: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Sửa bài viết</h1>
      <input /* ...title... */
        type="text"
        spellCheck="false"
        placeholder="Nhập tiêu đề bài viết..."
        className="w-full text-[28px] font-bold p-2 border-b focus:outline-none focus:border-sblue"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isSubmitting || isLoading}
      />
      <select /* ...topic... */
        className="w-full p-2 border rounded-md bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        value={selectedTopic}
        onChange={(e) => setSelectedTopic(e.target.value)}
        disabled={isSubmitting || isLoading}
      >
        <option value="">-- Chọn chủ đề --</option>
        {topics.length > 0 ? (
          topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))
        ) : (
          <option value="" disabled>
            Đang tải chủ đề...
          </option>
        )}
      </select>
      <div>
        {editorDataForLoad ? (
          <Editor
            data={editorDataForLoad}
            onChange={handleEditorChange}
            editorBlock="editorjs-container-edit"
            onImageUpload={handleImageUpload}
          />
        ) : (
          <p>Đang chuẩn bị trình soạn thảo...</p>
        )}
      </div>
      <div className="text-right pt-4">
        <button /* ...submit... */
          onClick={handleUpdate}
          className={`text-white px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
            isSubmitting || isLoading || !editorDataForLoad
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
          }`}
          disabled={isSubmitting || isLoading || !editorDataForLoad}
        >
          {isSubmitting ? "Đang cập nhật..." : "Xác nhận sửa"}
        </button>
      </div>
    </div>
  );
}
