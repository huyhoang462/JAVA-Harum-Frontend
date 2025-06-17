// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // State vẫn lưu cả object user để dùng cho các component mới
  const [user, setUser] = useState(null);

  // Khi component được mount, đọc dữ liệu từ localStorage để khởi tạo state
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const avatarUrl = localStorage.getItem("avatarUrl");
    const role = localStorage.getItem("role"); // Giả sử bạn lưu role là một chuỗi

    if (userId) {
      setUser({
        id: userId,
        avatarUrl: avatarUrl,
        role: role,
      });
    }
  }, []);

  // HÀM LOGIN ĐƯỢC CẬP NHẬT
  const login = (userData) => {
    // 1. Lưu từng phần vào localStorage để các component cũ hoạt động
    localStorage.setItem("user_id", userData.id);
    localStorage.setItem("avatarUrl", userData.avatarUrl);
    // Lưu role. Nếu role là object thì nên JSON.stringify
    localStorage.setItem("role", userData.role);

    // 2. Cập nhật state của context để các component mới và logic phân quyền dùng
    setUser(userData);
  };

  // HÀM LOGOUT ĐƯỢC CẬP NHẬT
  const logout = () => {
    // 1. Xóa các item trong localStorage
    localStorage.removeItem("user_id");
    localStorage.removeItem("avatarUrl");
    localStorage.removeItem("role");

    // 2. Xóa state của context
    setUser(null);
  };

  // isAuthenticated bây giờ sẽ dựa trên state, không phải localStorage nữa
  const isAuthenticated = !!user;

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook giữ nguyên
export const useAuth = () => {
  return useContext(AuthContext);
};
