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
export const checkSave = async (userId, postId) => {
  try {
    const res = await axios.get(
      `${API_URL}/saved-posts/check/${userId}/${postId}`
    );
    console.log("checksave này: ", res);
    return res;
  } catch (error) {
    console.error("Lỗi khi xem lưu:", error);
    return error;
  }
};
export const doSave = async (save) => {
  try {
    const res = await axios.post(`${API_URL}/saved-posts/interact`, save);
    console.log("dosave này: ", res);
    return res;
  } catch (error) {
    console.error("Lỗi khi save:", error);
    return error;
  }
};
export const checkFollow = async (followerId, followedId) => {
  try {
    const res = await axios.get(
      `${API_URL}/follow/check/${followerId}/${followedId}`
    );
    console.log("check follow này: ", res);
    return res;
  } catch (error) {
    console.error("Lỗi khi xem follow:", error);
    return error;
  }
};
export const doFollow = async (followerId, followedId) => {
  try {
    const res = await axios.post(
      `${API_URL}/follow/interact/${followerId}/${followedId}`
    );
    console.log("do follow này: ", res);
    return res;
  } catch (error) {
    console.error("Lỗi khi follow:", error);
    return error;
  }
};
export const getComment = async (postId) => {
  try {
    const res = await axios.get(`${API_URL}/comment/post/${postId}`);
    console.log("check comment này: ", res);
    return res;
  } catch (error) {
    console.error("Lỗi khi lấy comment:", error);
    return error;
  }
};
export const postComment = async (comment) => {
  try {
    const res = await axios.post(`${API_URL}/comment`, comment);
    console.log("Post comment này: ", res);
    return res;
  } catch (error) {
    console.error("Lỗi khi post comment:", error);
    return error;
  }
};
export const postReply = async (parentId, comment) => {
  try {
    const res = await axios.post(
      `${API_URL}/comment/${parentId}/reply`,
      comment
    );
    console.log("Post reply này: ", res);
    return res;
  } catch (error) {
    console.error("Lỗi khi post reply:", error);
    return error;
  }
};
