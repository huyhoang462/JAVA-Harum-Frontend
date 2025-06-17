/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import ContactPart from "./partials/ContactPart";
import PostContent from "./partials/PostContent";
import CommentSection from "./partials/CommentSection";
import { useParams } from "react-router-dom";
import { getPosticbyId } from "./postDetailService";
import { Loader2 } from "lucide-react"; // 1. Import icon loading

// 2. Tạo một component con cho trạng thái loading
const PostDetailSkeleton = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <Loader2 className="animate-spin text-pblue mx-auto" size={48} />
        <p className="mt-4 text-lg text-gray-600">Đang tải bài viết...</p>
      </div>
    </div>
  );
};

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isHidden, setIsHidden] = useState(false);
  const commentRef = useRef(null);

  // 3. Thêm state để quản lý trạng thái loading
  const [isLoading, setIsLoading] = useState(true);

  const hasFetchedRef = useRef(false);

  const fetchPost = async () => {
    try {
      const res = await getPosticbyId(id);
      if (res.status === 200) {
        setPost(res.data);
      } else {
        console.error("Lỗi: Không lấy được bài viết");
        setPost(null); // Đảm bảo post là null nếu có lỗi
      }
    } catch (error) {
      console.error("Lỗi gọi API:", error);
      setPost(null); // Đảm bảo post là null nếu có lỗi
    } finally {
      // 4. Dù thành công hay thất bại, cũng kết thúc loading
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchPost();
    }
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      if (commentRef.current) {
        const commentTop = commentRef.current.getBoundingClientRect().top;
        setIsHidden(commentTop <= 300);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 5. Logic render mới
  if (isLoading) {
    return <PostDetailSkeleton />;
  }

  if (!post) {
    return (
      <p className="text-center mt-10 text-xl font-semibold text-gray-700">
        Bài viết không còn khả dụng hoặc đã bị xóa.
      </p>
    );
  }

  return (
    <div>
      <div className="flex mx-auto flex-col max-w-7xl">
        {/* ContactPart */}
        <div
          className={`fixed top-1/3 left-50 transition-opacity duration-300 ${
            isHidden ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <ContactPart post={post} refreshPost={fetchPost} />
        </div>

        {/* Nội dung bài viết */}
        <PostContent post={post} />

        {/* Phần bình luận */}
        <div ref={commentRef} className="mb-10">
          <CommentSection postId={post?.id} />
        </div>
      </div>
    </div>
  );
}
