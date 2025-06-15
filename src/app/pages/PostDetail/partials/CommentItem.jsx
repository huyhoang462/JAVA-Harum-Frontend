// src/features/postDetail/components/CommentItem.jsx

import React from "react";
import { Flag, Reply, ChevronDown, Send } from "lucide-react";

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
  onReport, // Prop mới để xử lý báo cáo
}) => {
  const parentComment = commentGroup[0];
  const replies = commentGroup.slice(1);
  const totalReplies = replies.length;
  const { repliesVisible, visibleReplyCount } = commentState;

  return (
    <div className="py-4 border-b-gray-300 border-b">
      {/* --- Parent Comment --- */}
      <div className="px-4">
        <div className="flex">
          <div className="h-9 w-9 mr-3 flex-shrink-0">
            <img
              src={parentComment?.avatarUrl || "/defaultAvatar.jpg"}
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
                {/* Sửa ở đây: Gọi onReport với thông tin của parentComment */}
                <Flag
                  size={16}
                  onClick={() => onReport(parentComment)}
                  className="hover:text-pblue text-gray-400 cursor-pointer"
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

      {/* --- Replies Section --- */}
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
                      src={reply?.avatarUrl || "/defaultAvatar.jpg"}
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
                        {/* Sửa ở đây: Gọi onReport với thông tin của reply */}
                        <Flag
                          size={14}
                          onClick={() => onReport(reply)}
                          className="hover:text-pblue text-gray-400 cursor-pointer"
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

      {/* --- Reply Input --- */}
      <div className="px-4">
        {isReplyInputVisible && (
          <div className="mt-3 flex items-center">
            <div className="h-8 w-8 mr-2 flex-shrink-0">
              <img
                src={
                  localStorage.getItem("avatarUrl") !== "null"
                    ? localStorage.getItem("avatarUrl")
                    : "/defaultAvatar.jpg"
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

export default CommentItem;
