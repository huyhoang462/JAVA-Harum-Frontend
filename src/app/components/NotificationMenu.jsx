/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { notificationService } from "../service";


export default function NotificationMenu() {
    const [notifications, setNotifications] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedNotificationId, setSelectedNotificationId] = useState(null);
    const nav = useNavigate();
    const userId = localStorage.getItem("user_id"); 

   useEffect(() => {
    if (!userId) return;

    const handleNewNotification = (newNotification) => {
        toast.info(`🔔 ${newNotification.message}`);
        setNotifications(prev => [newNotification, ...prev]);
    };

    const cleanup = notificationService.initializeWebSocket(userId, handleNewNotification);

    return cleanup;

}, [userId]); 

    useEffect(() => {
        const fetchInitialNotifications = async () => {
            if (!userId) return;
            try {
                const res = await notificationService.getNotifications(userId);
                if (res.status === 200) {
                    setNotifications(res.data);
                }
            } catch (error) {
                toast.error("Không thể tải danh sách thông báo.");
            }
        };

        fetchInitialNotifications();
    }, [userId]); 

    const handleClickNotification = async (noti) => {
        const navigateToTarget = async (notification) => {
            switch (notification.type) {
                case "POST":
                    nav(`/post-detail/${notification.postId}`);
                    break;
                case "FOLLOW":
                    nav(`/otherprofile/${notification.followId}`);
                    break;
                case "COMMENT":
                    try {
                        const resComment = await notificationService.getCommentById(notification.commentId);
                        nav(`/post-detail/${resComment.data.postId}`);
                    } catch {
                        toast.error("Không thể xem chi tiết bình luận.");
                    }
                    break;
                default:
                    break;
            }
        };

        if (noti.isRead) {
            navigateToTarget(noti);
        } else {
            try {
                const res = await notificationService.setReadNotification(noti.id);
                setNotifications(prev => 
                    prev.map(n => n.id === noti.id ? { ...n, isRead: true } : n)
                );
                navigateToTarget(res.data);
            } catch {
                toast.error("Có lỗi khi xem thông báo");
            }
        }
    };

    const openConfirmModal = (e, id) => {
        e.stopPropagation();
        setSelectedNotificationId(id);
        setShowConfirmModal(true);
    };

    const confirmDelete = async () => {
        if (!selectedNotificationId) return;
        try {
            await notificationService.deleteNotification(selectedNotificationId);
            toast.success("Đã xóa thông báo!");
            setNotifications(prev => prev.filter(n => n.id !== selectedNotificationId));
        } catch (error) {
            toast.error("Xảy ra lỗi khi xóa thông báo!");
        } finally {
            setShowConfirmModal(false);
            setSelectedNotificationId(null);
        }
    };
  const cancelDelete = () => {
    setSelectedNotificationId(null);
    setShowConfirmModal(false);
  };

  return (
    <div className="w-full h-full relative">
      {notifications.length === 0 ? (
        <div className="flex items-center justify-center h-24 text-text text-sm">
          Chưa có thông báo nào
        </div>
      ) : (
        notifications.map((noti) => (
          <div
            key={noti.id}
            className={`p-3 rounded-md mb-2 cursor-pointer transition-all hover:bg-gray-100 ${
              !noti.isRead ? "bg-blue-50" : "bg-white"
            }`}
            onClick={() => handleClickNotification(noti)}
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
                  <p className="text-xs text-text2 mt-1">
                    {new Date(noti.createdAt).toLocaleString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div>
                <X
                  className="hover:text-red-500 text-text h-4 cursor-pointer"
                  onClick={(e) => openConfirmModal(e, noti.id)}
                />
              </div>
            </div>
          </div>
        ))
      )}

      {/* Modal xác nhận */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/40    flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Xác nhận xóa
            </h3>
            <p className="text-sm text-center text-text mb-6">
              Bạn có chắc chắn muốn xóa thông báo này không?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
