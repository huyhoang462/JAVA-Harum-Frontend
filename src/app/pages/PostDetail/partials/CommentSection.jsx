/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Send, MoreHorizontal, Reply } from "lucide-react";
import { getComment, postComment, postReply } from "../postDetailService";
import groupCommentsFlat from "../../../utils/groupComment";
import { toast } from "react-toastify";
const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [currentComment, setCurrentComment] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const fetchComment = async () => {
    try {
      const res = await getComment(postId);
      if (res.status === 200) {
        console.log("xem comment này: ", groupCommentsFlat(res?.data));
        setComments(groupCommentsFlat(res?.data));
      } else {
        console.error("Lỗi: Không lấy được comment");
      }
    } catch (error) {
      console.error("Lỗi gọi API:", error);
    }
  };
  const [isReply, setIsReply] = useState(false);
  useEffect(() => {
    fetchComment();
  }, []);

  const chooseParentComment = (commentId, index) => {
    setIsReply(true);
    setReplyContent("");
    setCommentContent("");
    setCurrentIndex(index);
    setCurrentComment(commentId);
    console.log("id này: ", commentId);
  };
  const handleComment = async (content) => {
    if (!content) {
      toast.warn("Vui lòng nhập nội dung để bình luận!");
      return;
    }
    const data = {
      userId: localStorage.getItem("user_id"),
      postId: postId,
      content: content,
    };
    console.log("nộ dung này: ", content);
    if (currentComment) {
      const response = await postReply(currentComment, data);
      if (response?.status === 200)
        toast.success("Bạn đã phản hồi một bình luận");
    } else {
      const response = await postComment(data);
      if (response?.status === 200) toast.success("Bạn đã bình luận bài viết");
    }
    setCommentContent("");
    setReplyContent("");
    setCurrentIndex(-1);
    fetchComment();
  };
  return (
    <div className="w-[800px] mx-auto mt-10 bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b border-b-gray-300 ">
        <h2 className="text-lg font-semibold text-text">Bình luận</h2>
      </div>

      {/* Form để thêm bình luận mới */}
      <div className="p-4 flex items-center border-b border-b-gray-300">
        <div className="h-8 w-8 mr-3">
          <img
            src={"/src/app/assets/images/daisy.jpg"}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <input
          spellCheck="false"
          type="text"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          onFocus={() => chooseParentComment(null, -1)}
          placeholder="Hãy chia sẻ cảm nghĩ của bạn về bài viết"
          className="flex-1 bg-gray-100 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-pblue"
        />
        <button className="ml-2 " onClick={() => handleComment(commentContent)}>
          <Send size={18} className={"text-pblue  cursor-pointer"} />
        </button>
      </div>

      {/* Danh sách bình luận */}
      <div className=" ">
        {comments.map((comment, index) => (
          <div key={index} className="py-4 border-b-gray-300 border-b">
            {/* Comment[0] chính */}
            <div className="px-4">
              <div className="flex">
                <div className="h-9 w-9 mr-3 flex-shrink-0">
                  <img
                    src={"/src/app/assets/images/daisy.jpg"}
                    className="h-full w-full rounded-full object-cover border border-gray-200"
                  />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-2xl px-4 py-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-gray-900">
                        hehe
                      </span>
                      <MoreHorizontal
                        size={16}
                        className="text-gray-400 cursor-pointer"
                      />
                    </div>
                    <p className="mt-1 text-text text-sm">
                      {comment[0]?.content}
                    </p>
                  </div>
                  <div className="flex items-center mt-2 pl-2 text-xs text-gray-500 space-x-4">
                    <span>{comment[0]?.createdAt || "01/05/2025"}</span>
                    <button
                      className="flex items-center hover:text-pblue  cursor-pointer"
                      onClick={() => chooseParentComment(comment[0].id, index)}
                    >
                      <Reply size={14} className="mr-1" />
                      <span>Phản hồi</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Phần Reply comments */}
            {comment.length > 1 && (
              <div className="mt-3 pl-12 pr-4 space-y-3">
                {comment.slice(1).map((reply) => (
                  <div key={reply.id} className="flex">
                    <div className="h-8 w-8 mr-2 flex-shrink-0">
                      <img
                        src={"/src/app/assets/images/daisy.jpg"}
                        className="h-full w-full rounded-full object-cover border border-gray-200"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-2xl px-3 py-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-xs text-gray-900">
                            heheee
                          </span>
                          <MoreHorizontal
                            size={14}
                            className="text-gray-400 cursor-pointer"
                          />
                        </div>
                        <p className="mt-0.5 text-text text-xs">
                          {reply.content}
                        </p>
                      </div>
                      <div className="flex items-center mt-1 pl-2 text-xs text-gray-500 space-x-3">
                        <span className="text-xs">
                          {reply?.createdAt || "01/05/2025"}
                        </span>
                        <button
                          className="flex items-center hover:text-pblue cursor-pointer"
                          onClick={() => chooseParentComment(reply.id, index)}
                        >
                          <Reply size={12} className="mr-1 " />
                          <span>Phản hồi</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="px-4">
              {isReply && currentIndex === index && (
                <div className="mt-3 flex items-center">
                  <div className="h-8 w-8 mr-2 flex-shrink-0 ">
                    <img
                      src={"/src/app/assets/images/daisy.jpg"}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                  <input
                    autoFocus
                    spellCheck="false"
                    type="text"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder={`Phản hồi...`}
                    className="flex-1 bg-gray-100 rounded-full py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-pblue"
                  />
                  <button
                    className="ml-2 text-pblue mt-1"
                    onClick={() => handleComment(replyContent)}
                  >
                    <Send size={18} className={"text-pblue cursor-pointer "} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
