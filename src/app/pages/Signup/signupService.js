import { API_URL } from "../../../bkUrl";
import axios from "axios";

export const handleSignUpApi = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      username: username,
      email: email,
      passwordHash: password,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    return error;
  }
};
export const handleVerifyOtpApi = async (email, otp) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/verify-otp/?email=${email}&otp=${otp}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Lỗi khi xác thực:", error);
    return error;
  }
};
