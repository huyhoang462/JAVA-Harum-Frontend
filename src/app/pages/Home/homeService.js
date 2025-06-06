/* eslint-disable no-unused-vars */
import axios from "axios";
import { API_URL } from "../../../bkUrl";

export const getTopPosts = async () => {
  try {
    const res = await axios.get(`${API_URL}/posts/top?page=1&size=4`);
    console.log("Top post này: ", res.data);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy top post:", error);
    return error;
  }
};
export const getPopularPosts = async () => {
  try {
    const res = await axios.get(`${API_URL}/posts/popular?page=1&size=4`);
    console.log("Popular post này: ", res.data);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy popular post:", error);
    return error;
  }
};
export const getForYouPosts = async ({ userId, pageParam = 1 }) => {
  try {
    const res = await axios.get(
      `${API_URL}/posts/top?page=${pageParam}&size=8`
    );
    console.log("For you này (page " + pageParam + "): ", res.data);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy for you:", error);
    throw error;
  }
};

export const getFollowPosts = async ({ userId, pageParam = 1 }) => {
  try {
    const res = await axios.get(
      `${API_URL}/posts/popular?page=${pageParam}&size=8`
    );
    console.log("Follow post này (page " + pageParam + "): ", res.data);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy follow:", error);
    throw error;
  }
};
