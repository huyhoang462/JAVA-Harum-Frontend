import axios from "axios";
import { API_URL } from "../bkUrl";

export const getNotifications = async (userId) => {
  try {
    const res = await axios.get(`${API_URL}/notification/user/${userId}`);
    console.log("lấy thông báo này: ", res);
    return res;
  } catch (error) {
    console.error("Lỗi khi lấy thông báo:", error);
    return error;
  }
};
export const setReadNotification = async (notificationId) => {
  try {
    const res = await axios.put(
      `${API_URL}/notification/${notificationId}/read`
    );
    console.log("đọc thông báo này: ", res);
    return res;
  } catch (error) {
    console.error("Lỗi khi đọc thông báo:", error);
    return error;
  }
};
export const deleteNotification = async (notificationId) => {
  try {
    const res = await axios.delete(`${API_URL}/notification/${notificationId}`);
    console.log("Xóa thông báo này: ", res);
    return res;
  } catch (error) {
    console.error("Lỗi khi xóa thông báo:", error);
    return error;
  }
};
export const getCommentById = async (commentId) => {
  try {
    const res = await axios.get(`${API_URL}/comment/${commentId}`);
    console.log("lấy comment thừ thông báo này: ", res);
    return res;
  } catch (error) {
    console.error("Lỗi khi lấy comment từ thông báo:", error);
    return error;
  }
};
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
