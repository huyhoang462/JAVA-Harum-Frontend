import axios from "axios";
import { API_URL } from "../../../bkUrl";

export const getPosticbyId = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/posts/${id}`);
    console.log("post này: ", res);
    return res;
  } catch (error) {
    console.error("Lỗi khi lấy post:", error);
    return error;
  }
};
export const getVote = async (userId, postId) => {
  try {
    const res = await axios.get(`${API_URL}/vote/check/${userId}/${postId}`);
    console.log("Vote này: ", res);
    return res;
  } catch (error) {
    console.error("Lỗi khi lấy vote:", error);
    return error;
  }
};
export const doVote = async (vote) => {
  try {
    const res = await axios.post(`${API_URL}/vote/interact`, vote);
    console.log("doVote này: ", res);
    return res;
  } catch (error) {
    console.error("Lỗi khi vote:", error);
    return error;
  }
};
