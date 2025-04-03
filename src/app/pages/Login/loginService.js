import { API_URL } from "../../../bkUrl";
import axios from "axios";

export const handleLoginApi = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: email,
      passwordHash: password,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
  }
};
export const handleForgotPasswordApi = async (email) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/forgot-password/${email}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Lỗi ", error);
  }
};
