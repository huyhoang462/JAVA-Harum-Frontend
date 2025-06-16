/* eslint-disable no-unused-vars */
import { API_URL } from "../../../bkUrl";

import axios from "axios";
export const getCommentReport = async () => {
  try {
    const response = await axios.get(`${API_URL}/comment_reports/all`);
    console.log("báo cáo comment: ", response.data);

    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy post report`, error);
    throw error;
  }
};
