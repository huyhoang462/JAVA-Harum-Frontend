import axios from "axios";
import { Client } from "@stomp/stompjs";
import { API_URL, WEBSOCKET_URL } from "../bkUrl";

class AppService {
  constructor() {
    this.stompClient = null;
    this.axiosInstance = axios.create({
      baseURL: API_URL,
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const { config, response } = error;
        console.error(
          `API Error on ${config.method.toUpperCase()} ${config.url}:`,
          response
        );
        return Promise.reject(error);
      }
    );
  }

  initializeWebSocket(userId, onNotificationReceived) {
    if (this.stompClient && this.stompClient.active) {
      console.log("WebSocket đã được kết nối, không khởi tạo lại.");
      return () => {};
    }

    this.stompClient = new Client({
      brokerURL: WEBSOCKET_URL,
      reconnectDelay: 5000,
      debug: () => {},
      onConnect: () => {
        console.log("Notification WebSocket đã kết nối thành công!");
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
        console.error(
          "Lỗi từ Broker (Notification): " + frame.headers["message"],
          frame.body
        );
      },
    });

    this.stompClient.activate();

    return () => {
      if (this.stompClient && this.stompClient.active) {
        console.log("Ngắt kết nối WebSocket thông báo.");
        this.stompClient.deactivate();
      }
    };
  }

  async getNotifications(userId) {
    const response = await this.axiosInstance.get(
      `/notification/user/${userId}`
    );
    return response;
  }

  async setReadNotification(notificationId) {
    const response = await this.axiosInstance.put(
      `/notification/${notificationId}/read`
    );
    return response;
  }

  async deleteNotification(notificationId) {
    await this.axiosInstance.delete(`/notification/${notificationId}`);
  }

  async getCommentById(commentId) {
    const response = await this.axiosInstance.get(`/comment/${commentId}`);
    return response;
  }

  async isReadPost(userId, postId) {
    const response = await this.axiosInstance.get(
      `/views/check/${userId}/${postId}`
    );
    return response.data;
  }

  async setReadPost(views) {
    const response = await this.axiosInstance.post(`/views`, views);
    return response.data;
  }
}

export const service = new AppService();
