import { API_URL } from "../../../bkUrl";
import axios from 'axios';

export const getUserProfileApi = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/profile/${userId}`);
    return response.data;
  } catch (err) {
    console.error("Lỗi khi gọi API lấy profile:", err);
    throw err;
  }
};

export const updateUserProfileApi = async (userId, formData) => {
  try {
    const response = await axios.put(`${API_URL}/users/profile/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    console.error("Lỗi khi cập nhật profile:", err);
    throw err;
  }
};
