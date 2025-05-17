import axios from "axios";
import { API_URL } from "../../../bkUrl";

export const getPostsByTopic = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/posts/topic/${id}?page=1&size=10`);
    console.log("post theo topic này: ", res);
    return res;
  } catch (error) {
    console.error("Lỗi khi lấy post theo topic:", error);
    return error;
  }
};
