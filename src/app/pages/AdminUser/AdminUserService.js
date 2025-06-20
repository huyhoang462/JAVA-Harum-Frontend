/* eslint-disable no-unused-vars */

import { API_URL } from "../../../bkUrl";

import axios from "axios";

const getUsersPage = async (page, size) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy trang ${page} của users:`, error);
    throw error;
  }
};

export const fetchAllUsers = async () => {
  console.log("Bắt đầu fetch tất cả người dùng...");
  let currentPage = 1; // API của bạn bắt đầu từ trang 1
  let allUsers = [];
  let totalPages = 1; // Khởi tạo với 1 trang để vòng lặp bắt đầu

  do {
    try {
      const data = await getUsersPage(currentPage, 14); // Lấy mỗi lần 10 người dùng
      if (data && data.content) {
        allUsers = allUsers.concat(data.content);
        totalPages = data.totalPages;
        console.log(
          `Đã lấy xong trang ${currentPage}/${totalPages}. Tổng số users hiện tại: ${allUsers.length}`
        );
      }
      currentPage++;
    } catch (error) {
      console.error(`Dừng quá trình fetch ở trang ${currentPage} do lỗi.`);
      break;
    }
  } while (currentPage <= totalPages);

  console.log(`Fetch hoàn tất. Tổng cộng ${allUsers.length} người dùng.`);
  return allUsers; // Trả về một mảng phẳng chứa tất cả người dùng
};
export const updateUserStatus = async (userId, body) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/put-status/${userId}`,
      body
    );
    console.log("Update user: ", response);

    return response;
  } catch (error) {
    console.error(`Lỗi khi update user`, error);
    throw error;
  }
};
