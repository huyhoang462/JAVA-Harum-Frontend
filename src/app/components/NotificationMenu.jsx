// NotificationMenu.jsx

import React, { useState, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteNotification,
  getCommentById,
  setReadNotification,
} from "../service";
import { X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import formatTimeAgo from "../utils/formatTimeAgo";
// Component cho một dòng thông báo
const NotificationItem = ({ noti, onClick, onDelete }) => (
  <div
    className={`p-3 rounded-md mb-2 cursor-pointer transition-all hover:bg-gray-100 ${
      !noti.isRead ? "bg-blue-50" : "bg-white"
    }`}
    onClick={() => onClick(noti)}
  >
    <div className="flex justify-between items-center">
      <div className="flex items-start gap-2">
        <div className="mt-1">
          {noti.type === "COMMENT" && "💬"}
          {noti.type === "FOLLOW" && "👤"}
          {noti.type === "POST" && "📝"}
        </div>
        <div className="flex-1">
          <p className="text-sm text-text">{noti.message}</p>
          <p className="text-xs text-gray-500 mt-1">
            {formatTimeAgo(noti.createdAt)}
          </p>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(noti.id);
        }}
        className="p-1 rounded-full hover:bg-red-100"
      >
        <X className="hover:text-red-500 text-gray-400 h-4 cursor-pointer" />
      </button>
    </div>
  </div>
);

export default function NotificationMenu({
  notifications,
  isLoading,
  onClose,
}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const userId = localStorage.getItem("user_id");

  // --- SỬA LẠI: Dùng useMutation để xử lý hành động ---
  const markAsReadMutation = useMutation({ mutationFn: setReadNotification });
  const deleteMutation = useMutation({ mutationFn: deleteNotification });

  // Phân nhóm và sắp xếp thông báo
  const groupedNotifications = useMemo(() => {
    if (!notifications) return { unread: [], read: [] };
    const unread = notifications
      .filter((n) => !n.isRead)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const read = notifications
      .filter((n) => n.isRead)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return { unread, read };
  }, [notifications]);

  const navigateToDestination = async (noti) => {
    onClose(); // Đóng menu trước khi điều hướng
    switch (noti.type) {
      case "POST":
        nav(`/post-detail/${noti.postId}`);
        break;
      case "FOLLOW":
        nav(`/profile/${noti.followId}`);
        break;
      case "COMMENT":
        try {
          const resComment = await getCommentById(noti.commentId);
          if (resComment.status === 200) {
            nav(`/post-detail/${resComment.data.postId}`);
          } else toast.error("Không thể xem chi tiết bình luận");
        } catch {
          toast.error("Lỗi khi tìm bình luận");
        }
        break;
      default:
        break;
    }
  };

  const handleClickNotification = async (noti) => {
    if (noti.isRead) {
      navigateToDestination(noti);
    } else {
      markAsReadMutation.mutate(noti.id, {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ["notifications", userId],
          });
          navigateToDestination(data.data); // Điều hướng sau khi API thành công
        },
        onError: () => toast.error("Có lỗi khi xem thông báo"),
      });
    }
  };

  const openConfirmModal = (id) => {
    setSelectedNotificationId(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (selectedNotificationId) {
      deleteMutation.mutate(selectedNotificationId, {
        onSuccess: () => {
          toast.success("Đã xóa thông báo!");
          queryClient.invalidateQueries({
            queryKey: ["notifications", userId],
          });
        },
        onError: () => toast.error("Xảy ra lỗi khi xóa thông báo!"),
        onSettled: () => {
          setSelectedNotificationId(null);
          setShowConfirmModal(false);
        },
      });
    }
  };
  const cancelDelete = () => {
    setSelectedNotificationId(null);
    setShowConfirmModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-24">
        <Loader2 className="animate-spin text-pblue" />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {notifications.length === 0 ? (
        <div className="flex items-center justify-center h-24 text-gray-500 text-sm">
          Chưa có thông báo nào
        </div>
      ) : (
        <>
          {/* Phần chưa đọc */}
          {groupedNotifications.unread.length > 0 && (
            <div>
              <p className="px-3 py-1 text-xs font-semibold text-gray-500">
                Mới
              </p>
              {groupedNotifications.unread.map((noti) => (
                <NotificationItem
                  key={noti.id}
                  noti={noti}
                  onClick={handleClickNotification}
                  onDelete={openConfirmModal}
                />
              ))}
            </div>
          )}

          {/* Dấu gạch ngăn cách */}
          {groupedNotifications.unread.length > 0 &&
            groupedNotifications.read.length > 0 && (
              <hr className="my-2 border-gray-200" />
            )}

          {/* Phần đã đọc */}
          {groupedNotifications.read.length > 0 && (
            <div>
              <p className="px-3 py-1 text-xs font-semibold text-gray-500">
                Trước đó
              </p>
              {groupedNotifications.read.map((noti) => (
                <NotificationItem
                  key={noti.id}
                  noti={noti}
                  onClick={handleClickNotification}
                  onDelete={openConfirmModal}
                />
              ))}
            </div>
          )}
        </>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Xác nhận xóa
            </h3>
            <p className="text-sm text-center text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa thông báo này không?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                disabled={deleteMutation.isPending}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteMutation.isPending}
                className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded flex items-center justify-center w-28 disabled:bg-red-300"
              >
                {deleteMutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Xác nhận"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
