
import axios from 'axios';
import { Client } from '@stomp/stompjs';
import { API_URL } from '../bkUrl';
import { WEBSOCKET_URL } from '../bkUrl';

class NotificationService {
    constructor() {
        this.stompClient = null;        
        this.axiosInstance = axios.create({
            baseURL: API_URL,
        });
    }

initializeWebSocket(userId, onNotificationReceived) {

        if (this.stompClient) {
            this.stompClient.deactivate();
        }

        console.log("Đang khởi tạo kết nối WebSocket mới...");
        
        this.stompClient = new Client({
            brokerURL: WEBSOCKET_URL,
            reconnectDelay: 5000,
            debug: (str) => {  },
            onConnect: () => {
                console.log('Notification WebSocket đã kết nối thành công!');
                
                const topic = `/notifications/${userId}`;
                console.log(`Đang đăng ký lắng nghe thông báo tại: ${topic}`);

                this.stompClient.subscribe(topic, (message) => {
                    try {
                        const newNotification = JSON.parse(message.body);
                        onNotificationReceived(newNotification);
                    } catch (e) {
                        console.error("Không thể parse thông báo JSON:", message.body, e);
                    }
                });
            },
            onStompError: (frame) => {
                console.error('Lỗi từ Broker (Notification): ' + frame.headers['message']);
                console.error('Chi tiết lỗi:', frame.body);
            },
        });

        this.stompClient.activate();

        return () => {
            if (this.stompClient && this.stompClient.active) {
                console.log("Ngắt kết nối WebSocket thông báo.");
                this.stompClient.deactivate();
            }
            this.stompClient = null;
        };
    }

    async getNotifications(userId) {
        try {
            const response = await this.axiosInstance.get(`/notification/user/${userId}`);
            return response; 
        } catch (error) {
            console.error("Lỗi khi lấy thông báo:", error);
            throw error; 
        }
    }

    async setReadNotification(notificationId) {
        try {
            const response = await this.axiosInstance.put(`/notification/${notificationId}/read`);
            return response;
        } catch (error) {
            console.error("Lỗi khi đọc thông báo:", error);
            throw error;
        }
    }

    async deleteNotification(notificationId) {
        try {
            const response = await this.axiosInstance.delete(`/notification/${notificationId}`);
            return { status: response.status, data: "Xóa thành công" };
        } catch (error) {
            console.error("Lỗi khi xóa thông báo:", error);
            throw error;
        }
    }
    
    async getCommentById(commentId) {
        try {
            const response = await this.axiosInstance.get(`/comment/${commentId}`);
            return response;
        } catch (error) {
            console.error("Lỗi khi lấy comment từ thông báo:", error);
            throw error;
        }
    }
}

export const notificationService = new NotificationService();
export const isReadPost = async (userId, postId) => {
  try {
    const res = await axios.get(`${API_URL}/views/check/${userId}/${postId}`);
    console.log("đọc chưa: ", res);

    return res?.data;
  } catch (error) {
    console.error("Lỗi khi xem đọc chưa:", error);
    return error;
  }
};
export const setReadPost = async (views) => {
  try {
    const res = await axios.post(`${API_URL}/views`, views);
    console.log("Đã đọc ", res);

    return res?.data;
  } catch (error) {
    console.error("Lỗi khi set đọc:", error);
    return error;
  }
};