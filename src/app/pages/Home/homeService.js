import axios from "axios";
import { API_URL } from "../../../bkUrl";

export const getTopPosts = async () => {
  try {
    const res = await axios.get(`${API_URL}/posts/top?page=1&size=4`);
    console.log("Top post này: ", res.data);
    return res;
  } catch (error) {
    console.error("Lỗi khi lấy top post:", error);
    return error;
  }
};
export const getPopularPosts = async () => {
  try {
    const res = await axios.get(`${API_URL}/posts/popular?page=1&size=4`);
    console.log("Popular post này: ", res);
    return res;
  } catch (error) {
    console.error("Lỗi khi lấy popular post:", error);
    return error;
  }
};
