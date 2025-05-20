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
