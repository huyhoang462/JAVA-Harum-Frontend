import React, { useEffect, useRef, useState } from "react";
import ContactPart from "./partials/ContactPart";
import PostH from "./partials/PostH";
import PostContent from "./partials/PostContent";
import RelatedPosts from "./partials/RelatedPosts";
import CommentSection from "./partials/CommentSection";

export default function PostDetail() {
  const post = {
    id: "jawefdjaw",
    image: "./src/app/assets/images/img1.jpg",
    title: "Bạn có tin vào những điều kì diệu không như bầu trời này ấy?",
    subTitle: "Có những ngày bình yên đến lạ",
    date: "14-02-1025",
    user: {
      avatar: "./src/app/assets/images/daisy.jpg",
      isFollowing: false,
      name: "Daisy",
    },
    topic: "QUAN ĐIỂM - TRANH LUẬN",
    likes: 100,
    comments: 29,
  };
  const [isHidden, setIsHidden] = useState(false);
  const commentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (commentRef.current) {
        const commentTop = commentRef.current.getBoundingClientRect().top;
        setIsHidden(commentTop <= 290); // Nếu phần bình luận xuất hiện ở trên màn hình
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

        {/* Bài viết liên quan */}
        {/* <RelatedPosts post={post} /> */}

        {/* Phần bình luận */}
        <div ref={commentRef}>
          <CommentSection />
        </div>
      </div>
    </div>
  );
}
