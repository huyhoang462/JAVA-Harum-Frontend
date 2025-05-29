import { API_URL } from "../../../bkUrl";
import axios from "axios";

export const getOtherUserProfileApi = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/profile/${userId}`);
    console.log("Dữ liệu profile user khác:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy profile userId=${userId}:`, error);
  }
};
export const getPostsByUserApi = async (userId, page = 1, size = 10) => {
  try {
    const response = await axios.get(`${API_URL}/posts/user/${userId}`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bài viết của user:", error);
    throw error;
  }
};
