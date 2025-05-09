import axios from "axios";
import { API_URL } from "../../../bkUrl";

export const getTopicbyId = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/posts/${id}`);
    console.log("post này: ", res);
    return res;
  } catch (error) {
    console.error("Lỗi khi lấy post:", error);
    return error;
  }
};
