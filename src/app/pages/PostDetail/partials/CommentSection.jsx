/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Send,
  MoreHorizontal,
  Reply,
  X,
  ShieldAlert,
  ChevronDown,
} from "lucide-react";
import { getComment, postComment, postReply } from "../postDetailService";
import groupCommentsFlat from "../../../utils/groupComment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LoginRequiredModal } from "../../../components/LoginRequiredModal";

const PARENT_COMMENTS_PER_PAGE = 10;
const REPLIES_PER_PAGE = 10;

// --- Comment Item Component (Internal) ---
// Component con để render một bình luận gốc và các phản hồi của nó
const CommentItem = ({
  commentGroup,
  index,
  onChooseParentComment,
  onToggleReplies,
  onLoadMoreReplies,
  commentState,
  isReplyInputVisible,
  replyContent,
  onReplyContentChange,
  onPostReply,
}) => {
  const parentComment = commentGroup[0];
  const replies = commentGroup.slice(1);
  const totalReplies = replies.length;

  // Lấy trạng thái của comment này
  const { repliesVisible, visibleReplyCount } = commentState;

  return (
    <div className="py-4 border-b-gray-300 border-b">
      {/* Comment gốc */}
      <div className="px-4">
        <div className="flex">
          <div className="h-9 w-9 mr-3 flex-shrink-0">
            <img
              src={
                parentComment?.avatarUrl ||
                "/src/app/assets/images/defaultAvatar.jpg"
              }
              className="h-full w-full rounded-full object-cover border border-gray-200"
              alt="Commenter avatar"
            />
          </div>
          <div className="flex-1">
            <div className="bg-gray-50 rounded-2xl px-4 py-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-text">
                  {parentComment?.userName || "Anonymous"}
                </span>
                <MoreHorizontal
                  size={16}
                  className="text-gray-400 cursor-pointer"
                />
              </div>
              <p className="mt-1 text-text text-sm">{parentComment?.content}</p>
            </div>
            <div className="flex items-center mt-2 pl-2 text-xs text-gray-500 space-x-4">
              <span>{parentComment?.createdAt || "01-05-2025"}</span>
              <button
                className="flex items-center hover:text-pblue cursor-pointer"
                onClick={() => onChooseParentComment(parentComment.id, index)}
              >
                <Reply size={14} className="mr-1" />
                <span>Phản hồi</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Nút xem/ẩn và phần phản hồi */}
      {totalReplies > 0 && (
        <div className="pl-16 pr-4 mt-2">
          <button
            onClick={() => onToggleReplies(parentComment.id)}
            className="text-xs font-semibold cursor-pointer text-gray-600 hover:text-pblue flex items-center"
          >
            {repliesVisible ? "Ẩn phản hồi" : `Xem ${totalReplies} phản hồi`}
            <ChevronDown
              size={16}
              className={`ml-1 transition-transform ${
                repliesVisible ? "rotate-180" : ""
              }`}
            />
          </button>

          {repliesVisible && (
            <div className="mt-3 space-y-3">
              {replies.slice(0, visibleReplyCount).map((reply) => (
                <div key={reply.id} className="flex">
                  <div className="h-8 w-8 mr-2 flex-shrink-0">
                    <img
                      src={
                        reply?.avatarUrl ||
                        "/src/app/assets/images/defaultAvatar.jpg"
                      }
                      className="h-full w-full rounded-full object-cover border border-gray-200"
                      alt="Replier avatar"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-2xl px-3 py-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-xs text-gray-900">
                          {reply?.userName || "Anonymous"}
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
                        {reply?.createdAt || "01-06-2025"}
                      </span>
                      <button
                        className="flex items-center hover:text-pblue cursor-pointer"
                        onClick={() =>
                          onChooseParentComment(parentComment.id, index)
                        }
                      >
                        <Reply size={12} className="mr-1" />
                        <span>Phản hồi</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {visibleReplyCount < totalReplies && (
                <button
                  onClick={() => onLoadMoreReplies(parentComment.id)}
                  className="text-xs font-semibold cursor-pointer text-gray-600 hover:text-pblue ml-10"
                >
                  Xem thêm phản hồi
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Input để phản hồi */}
      <div className="px-4">
        {isReplyInputVisible && (
          <div className="mt-3 flex items-center">
            <div className="h-8 w-8 mr-2 flex-shrink-0">
              <img
                src={
                  localStorage.getItem("avatarUrl") !== "null"
                    ? localStorage.getItem("avatarUrl")
                    : "/src/app/assets/images/defaultAvatar.jpg"
                }
                className="h-full w-full rounded-full object-cover"
                alt="Current user avatar"
              />
            </div>
            <input
              autoFocus
              spellCheck="false"
              type="text"
              value={replyContent}
              onChange={onReplyContentChange}
              placeholder={`Phản hồi ${parentComment.userName}...`}
              className="flex-1 bg-gray-100 rounded-full py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-pblue"
            />
            <button className="ml-2 text-pblue mt-1" onClick={onPostReply}>
              <Send size={18} className={"text-pblue cursor-pointer"} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Comment Section Component ---
const CommentSection = ({ postId }) => {
  const [number, setNumber] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [currentCommentId, setCurrentCommentId] = useState(null);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(-1);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ State mới để quản lý hiển thị
  const [visibleParentCount, setVisibleParentCount] = useState(
    PARENT_COMMENTS_PER_PAGE
  );
  const [commentStates, setCommentStates] = useState({}); // { [commentId]: { repliesVisible, visibleReplyCount } }

  const fetchComment = async () => {
    try {
      const res = await getComment(postId);
      if (res.status === 200) {
        setComments(groupCommentsFlat(res?.data));
        setNumber(res?.data.length);
      } else {
        console.error("Lỗi: Không lấy được comment");
      }
    } catch (error) {
      console.error("Lỗi gọi API:", error);
    }
  };

  useEffect(() => {
    fetchComment();
  }, [postId]);

  const chooseParentComment = (commentId, index) => {
    setReplyContent("");
    setCommentContent("");
    setCurrentCommentIndex(index);
    setCurrentCommentId(commentId);
  };

  const handleComment = async (content, isReply = false) => {
    if (!localStorage.getItem("user_id")) {
      setIsLoginModalOpen(true);
      return;
    }

    if (!content) {
      toast.warn("Vui lòng nhập nội dung!");
      return;
    }

    const data = {
      userId: localStorage.getItem("user_id"),
      postId: postId,
      content: content,
    };

    try {
      if (isReply && currentCommentId) {
        await postReply(currentCommentId, data);
        toast.success("Bạn đã phản hồi một bình luận");
      } else {
        await postComment(data);
        toast.success("Bạn đã bình luận bài viết");
      }

      setCommentContent("");
      setReplyContent("");
      setCurrentCommentIndex(-1);
      setCurrentCommentId(null);
      fetchComment(); // Tải lại toàn bộ bình luận
    } catch (error) {
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
      console.error("Lỗi khi gửi bình luận/phản hồi:", error);
    }
  };

  const handleLoginRedirect = () => {
    setIsLoginModalOpen(false);
    navigate("/login");
  };

  // ✅ Hàm mới để bật/tắt hiển thị phản hồi
  const toggleReplies = (commentId) => {
    setCommentStates((prev) => {
      const currentState = prev[commentId] || {};
      return {
        ...prev,
        [commentId]: {
          ...currentState,
          repliesVisible: !currentState.repliesVisible,
          visibleReplyCount: currentState.visibleReplyCount || REPLIES_PER_PAGE,
        },
      };
    });
  };

  // ✅ Hàm mới để tải thêm phản hồi
  const loadMoreReplies = (commentId) => {
    setCommentStates((prev) => ({
      ...prev,
      [commentId]: {
        ...prev[commentId],
        visibleReplyCount:
          (prev[commentId]?.visibleReplyCount || 0) + REPLIES_PER_PAGE,
      },
    }));
  };

  return (
    <>
      <LoginRequiredModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLoginRedirect}
      />

      <div className="w-[800px] mx-auto mt-10 bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-b-gray-300">
          <h2 className="text-lg font-semibold text-text">
            Bình luận ({number})
          </h2>
        </div>

        <div className="p-4 flex items-center border-b border-b-gray-300">
          <div className="h-8 w-8 mr-3">
            <img
              src={
                localStorage.getItem("avatarUrl") !== "null"
                  ? localStorage.getItem("avatarUrl")
                  : "/src/app/assets/images/defaultAvatar.jpg"
              }
              className="h-full w-full rounded-full object-cover"
              alt="User avatar"
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
          <button
            className="ml-2"
            onClick={() => handleComment(commentContent, false)}
          >
            <Send size={18} className={"text-pblue cursor-pointer"} />
          </button>
        </div>

        {/* Danh sách bình luận */}
        <div className=" ">
          {comments.slice(0, visibleParentCount).map((commentGroup, index) => (
            <CommentItem
              key={commentGroup[0]?.id || index}
              commentGroup={commentGroup}
              index={index}
              onChooseParentComment={chooseParentComment}
              onToggleReplies={toggleReplies}
              onLoadMoreReplies={loadMoreReplies}
              commentState={
                commentStates[commentGroup[0]?.id] || {
                  repliesVisible: false,
                  visibleReplyCount: REPLIES_PER_PAGE,
                }
              }
              isReplyInputVisible={currentCommentIndex === index}
              replyContent={currentCommentIndex === index ? replyContent : ""}
              onReplyContentChange={(e) => setReplyContent(e.target.value)}
              onPostReply={() => handleComment(replyContent, true)}
            />
          ))}
        </div>

        {/* Nút xem thêm bình luận gốc */}
        {visibleParentCount < comments.length && (
          <div className="p-4 text-center">
            <button
              onClick={() =>
                setVisibleParentCount((prev) => prev + PARENT_COMMENTS_PER_PAGE)
              }
              className="font-semibold cursor-pointer text-pblue hover:underline"
            >
              Xem thêm bình luận
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CommentSection;
