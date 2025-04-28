import React, { useState } from "react";
import { Send, MoreHorizontal, Reply } from "lucide-react";

// Giả lập dữ liệu người dùng
const users = {
  user1: { name: "Lewy", avatar: "https://i.pravatar.cc/150?img=1" },
  user2: { name: "Daisy", avatar: "https://i.pravatar.cc/150?img=5" },
  user3: { name: "Alex", avatar: "https://i.pravatar.cc/150?img=3" },
};

// Giả lập dữ liệu bình luận
const initialComments = [
  {
    id: "comment1",
    userId: "user1",
    postId: "post1",
    content:
      "Đạo hữu copy bài ở đâu mà hay thế?? Coi chừng bị đánh bản quyền!!!",
    createdAt: "14/02/2025",
    replies: [
      {
        id: "reply1",
        rootCommentId: "comment1",
        userId: "user2",
        content: "Đoán xem -_-",
        createdAt: "14/02/2025",
      },
    ],
  },
  {
    id: "comment2",
    userId: "user1",
    postId: "post1",
    content:
      'Hay cho câu "Hãy để hoa trở thành hoa, hãy để cây trở thành cây. Hãy trả lại người khác cho người khác, hãy trả lại chính mình cho chính mình...." Kiểu này chắc vừa thất tình xong 😂😂😂',
    createdAt: "14/02/2025",
    replies: [],
  },
];

const CommentSection = () => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [newReply, setNewReply] = useState("");
  const currentUser = "user3"; // Giả lập người dùng hiện tại

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Lấy ngày hiện tại theo định dạng dd/MM/yyyy
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const MM = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const formattedDate = `${dd}/${MM}/${yyyy}`;

    const comment = {
      id: `comment${Date.now()}`,
      userId: currentUser,
      postId: "post1",
      content: newComment,
      createdAt: formattedDate,
      replies: [],
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleReplySubmit = (e, commentId) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    // Lấy ngày hiện tại theo định dạng dd/MM/yyyy
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const MM = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const formattedDate = `${dd}/${MM}/${yyyy}`;

    const reply = {
      id: `reply${Date.now()}`,
      rootCommentId: commentId,
      userId: currentUser,
      content: newReply,
      createdAt: formattedDate,
    };

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply],
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setNewReply("");
    setReplyingTo(null);
  };

  return (
    <div className="w-[800px] mx-auto mt-10 bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-text">Bình luận</h2>
      </div>

      {/* Form để thêm bình luận mới */}
      <form
        onSubmit={handleCommentSubmit}
        className="p-4 flex items-center border-b"
      >
        <div className="h-8 w-8 mr-3">
          <img
            src={users[currentUser].avatar}
            alt={users[currentUser].name}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <input
          type="text"
          placeholder="Hãy chia sẻ cảm nghĩ của bạn về bài viết"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 bg-gray-100 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-pblue"
        />
        <button type="submit" className="ml-2 " disabled={!newComment.trim()}>
          <Send
            size={18}
            className={`${newComment.trim() ? "text-pblue" : "text-gray-400"}`}
          />
        </button>
      </form>

      {/* Danh sách bình luận */}
      <div className="divide-y">
        {comments.map((comment) => (
          <div key={comment.id} className="py-4">
            {/* Comment chính */}
            <div className="px-4">
              <div className="flex">
                <div className="h-9 w-9 mr-3 flex-shrink-0">
                  <img
                    src={users[comment.userId].avatar}
                    alt={users[comment.userId].name}
                    className="h-full w-full rounded-full object-cover border border-gray-200"
                  />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-2xl px-4 py-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-gray-900">
                        {users[comment.userId].name}
                      </span>
                      <MoreHorizontal
                        size={16}
                        className="text-gray-400 cursor-pointer"
                      />
                    </div>
                    <p className="mt-1 text-text text-sm">{comment.content}</p>
                  </div>
                  <div className="flex items-center mt-2 pl-2 text-xs text-gray-500 space-x-4">
                    <span>{comment.createdAt}</span>
                    <button
                      onClick={() =>
                        setReplyingTo(
                          replyingTo === comment.id ? null : comment.id
                        )
                      }
                      className="flex items-center hover:text-gray-700"
                    >
                      <Reply size={14} className="mr-1" />
                      <span>Phản hồi</span>
                    </button>
                  </div>

                  {/* Form trả lời comment */}
                  {replyingTo === comment.id && (
                    <form
                      onSubmit={(e) => handleReplySubmit(e, comment.id)}
                      className="mt-3 flex items-center"
                    >
                      <div className="h-6 w-6 mr-2 flex-shrink-0">
                        <img
                          src={users[currentUser].avatar}
                          alt={users[currentUser].name}
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder={`Phản hồi ${
                          users[comment.userId].name
                        }...`}
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        className="flex-1 bg-gray-100 rounded-full py-1.5 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-pblue"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="ml-2 text-pblue hover:text-blue-600"
                        disabled={!newReply.trim()}
                      >
                        <Send
                          size={14}
                          className={`${
                            newReply.trim() ? "text-pblue" : "text-gray-400"
                          }`}
                        />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Phần Reply comments */}
            {comment.replies.length > 0 && (
              <div className="mt-3 pl-12 pr-4 space-y-3">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex">
                    <div className="h-8 w-8 mr-2 flex-shrink-0">
                      <img
                        src={users[reply.userId].avatar}
                        alt={users[reply.userId].name}
                        className="h-full w-full rounded-full object-cover border border-gray-200"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-2xl px-3 py-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-xs text-gray-900">
                            {users[reply.userId].name}
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
                        <span className="text-xs">{reply.createdAt}</span>
                        <button
                          onClick={() => {
                            setReplyingTo(comment.id);
                            setNewReply(`@${users[reply.userId].name} `);
                          }}
                          className="flex items-center hover:text-gray-700"
                        >
                          <Reply size={12} className="mr-1" />
                          <span>Phản hồi</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
