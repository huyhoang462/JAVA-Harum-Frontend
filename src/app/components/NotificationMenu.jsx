// NotificationMenu.jsx

import React, { useState, useMemo, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { notificationService } from "../service";
import formatTimeAgo from "../utils/formatTimeAgo"; 

const NotificationItem = React.memo(({ noti, onClick, onDelete }) => (
    <div
        className={`p-3 rounded-md mb-2 cursor-pointer transition-all hover:bg-gray-100 ${
            !noti.isRead ? "bg-blue-50" : "bg-white"
        }`}
        onClick={() => onClick(noti)}
    >
        <div className="flex justify-between items-center">
            <div className="flex items-start gap-3"> 
                <span className="mt-1 text-lg"> 
                    {noti.type === "COMMENT" && "💬"}
                    {noti.type === "FOLLOW" && "👤"}
                    {noti.type === "POST" && "📝"}
                </span>
                <div className="flex-1">
                    <p className="text-sm text-gray-800">{noti.message}</p>
                    <p className="text-xs text-blue-600 mt-1 font-medium">
                        {formatTimeAgo(noti.createdAt)}
                    </p>
                </div>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(noti.id);
                }}
                className="p-1 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-500 transition-colors"
                aria-label="Xóa thông báo"
            >
                <X size={16} />
            </button>
        </div>
    </div>
));
NotificationItem.displayName = 'NotificationItem'; 

export default function NotificationMenu({ notifications = [], isLoading, onClose }) {
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, notiId: null });
    const nav = useNavigate();
    const queryClient = useQueryClient();
    const userId = localStorage.getItem("user_id");
    const queryKey = ["notifications", userId];

    useEffect(() => {
        if (!userId) return;

        const handleNewNotification = (newNotification) => {
            toast.info(`🔔 ${newNotification.message}`);
            queryClient.setQueryData(queryKey, (oldData = []) => {
                if (oldData.some(n => n.id === newNotification.id)) return oldData;
                return [newNotification, ...oldData];
            });
        };

        const cleanup = notificationService.initializeWebSocket(userId, handleNewNotification);
        return cleanup;
    }, [userId, queryClient, queryKey]);

    const useOptimisticMutation = (mutationFn, action) => {
        return useMutation({
            mutationFn,
            onMutate: async (variables) => {
                await queryClient.cancelQueries({ queryKey });
                const previousNotifications = queryClient.getQueryData(queryKey);
                
                queryClient.setQueryData(queryKey, (old = []) => {
                    if (action === 'delete') {
                        return old.filter(n => n.id !== variables);
                    }
                    if (action === 'markRead') {
                        return old.map(n => n.id === variables ? { ...n, isRead: true } : n);
                    }
                    return old;
                });
                
                return { previousNotifications };
            },
            onError: (err, variables, context) => {
                toast.error(`Lỗi! Không thể thực hiện hành động.`);
                if (context?.previousNotifications) {
                    queryClient.setQueryData(queryKey, context.previousNotifications);
                }
            },
            onSettled: () => {
                queryClient.invalidateQueries({ queryKey });
            },
        });
    };

    const markAsReadMutation = useOptimisticMutation(notificationService.setReadNotification, 'markRead');
    const deleteMutation = useOptimisticMutation(notificationService.deleteNotification, 'delete');

    const { unread, read } = useMemo(() => {
        const unread = notifications.filter(n => !n.isRead).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const read = notifications.filter(n => n.isRead).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return { unread, read };
    }, [notifications]);

    const navigateToDestination = async (noti) => {
        onClose();
        try {
            switch (noti.type) {
                case "POST":
                    nav(`/post-detail/${noti.postId}`);
                    break;
                case "FOLLOW":
                    nav(`/profile/${noti.followId}`);
                    break;
                case "COMMENT":
                    const res = await notificationService.getCommentById(noti.commentId);
                    if (res.status === 200) {
                        nav(`/post-detail/${res.data.postId}`);
                    } else {
                        throw new Error("Comment not found");
                    }
                    break;
                default:
                    break;
            }
        } catch (error) {
            toast.error("Không thể điều hướng đến nội dung.");
        }
    };

    const handleClickNotification = (noti) => {
        if (noti.isRead) {
            navigateToDestination(noti);
        } else {
            markAsReadMutation.mutate(noti.id, {
                onSuccess: () => navigateToDestination(noti),
            });
        }
    };

    const handleDeleteClick = (notiId) => {
        setConfirmModal({ isOpen: true, notiId });
    };

    const confirmDelete = () => {
        if (confirmModal.notiId) {
            toast.promise(
                deleteMutation.mutateAsync(confirmModal.notiId),
                {
                    pending: 'Đang xóa...',
                    success: 'Đã xóa thông báo!',
                    error: 'Xóa thất bại!'
                }
            ).finally(() => setConfirmModal({ isOpen: false, notiId: null }));
        }
    };

    if (isLoading) {
        return <div className="flex items-center justify-center h-24"><Loader2 className="animate-spin text-blue-500" /></div>;
    }
    
    if (notifications.length === 0) {
        return <div className="flex items-center justify-center h-24 text-gray-500 text-sm">Chưa có thông báo nào</div>;
    }

    return (
        <div className="w-full h-full relative">
            {unread.length > 0 && (
                <section>
                    <h3 className="px-3 py-1 text-xs font-semibold text-gray-500">Mới</h3>
                    {unread.map(noti => <NotificationItem key={noti.id} noti={noti} onClick={handleClickNotification} onDelete={handleDeleteClick} />)}
                </section>
            )}

            {unread.length > 0 && read.length > 0 && <hr className="my-2 border-gray-200" />}

            {read.length > 0 && (
                <section>
                    <h3 className="px-3 py-1 text-xs font-semibold text-gray-500">Trước đó</h3>
                    {read.map(noti => <NotificationItem key={noti.id} noti={noti} onClick={handleClickNotification} onDelete={handleDeleteClick} />)}
                </section>
            )}
            
            {/* Modal xác nhận */}
            {confirmModal.isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-80">
                        <h3 className="text-lg font-semibold mb-4 text-center">Xác nhận xóa</h3>
                        <p className="text-sm text-center text-gray-600 mb-6">Bạn có chắc chắn muốn xóa thông báo này không?</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setConfirmModal({ isOpen: false, notiId: null })} className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded">Hủy</button>
                            <button onClick={confirmDelete} disabled={deleteMutation.isPending} className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded w-28 flex items-center justify-center disabled:bg-red-300">
                                {deleteMutation.isPending ? <Loader2 size={20} className="animate-spin" /> : "Xác nhận"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}