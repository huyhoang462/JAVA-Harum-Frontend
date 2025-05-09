import React, { useEffect, useRef, useState } from "react";
import ContactPart from "./partials/ContactPart";
import PostContent from "./partials/PostContent";
import CommentSection from "./partials/CommentSection";
import { useParams } from "react-router-dom";
import { getTopicbyId } from "./postDetailService"; // đúng đường dẫn đến service

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isHidden, setIsHidden] = useState(false);
  const commentRef = useRef(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getTopicbyId(id);
        if (res.status === 200) {
          setPost(res.data); // gán dữ liệu bài viết vào state
        } else {
          console.error("Lỗi: Không lấy được bài viết");
        }
      } catch (error) {
        console.error("Lỗi gọi API:", error);
      }
    };

    if (id) fetchPost();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      if (commentRef.current) {
        const commentTop = commentRef.current.getBoundingClientRect().top;
        setIsHidden(commentTop <= 290);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) return <p className="text-center mt-10">Đang tải bài viết...</p>;

  return (
    <div>
      <div className="flex mx-auto flex-col max-w-7xl">
        {/* ContactPart */}
        <div
          className={`fixed top-1/3 left-50 transition-opacity duration-300 ${
            isHidden ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <ContactPart post={post} />
        </div>

        {/* Nội dung bài viết */}
        <PostContent post={post} />

        {/* Phần bình luận */}
        <div ref={commentRef}>
          <CommentSection />
        </div>
      </div>
    </div>
  );
}
