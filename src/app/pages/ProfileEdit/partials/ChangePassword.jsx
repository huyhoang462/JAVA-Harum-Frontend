import React, { useState } from "react";

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Mật khẩu mới không trùng khớp!");
      return;
    }
    alert("Mật khẩu đã được cập nhật!");
  };

  return (
    <form onSubmit={handleSubmit} className="w-3/4 p-6">
        <h2 className="text-xl font-semibold text-center mb-6">Đổi mật khẩu</h2>
        <label className="block text-gray-700 mb-2">Mật khẩu cũ</label>
        <input
          type="password"
          name="currentPassword"
          value={passwords.currentPassword}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        />
        <label className="block text-gray-700 mb-2">Mật khẩu mới</label>
        <input
          type="password"
          name="newPassword"
          value={passwords.newPassword}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        />
        <label className="block text-gray-700 mb-2">Nhập lại mật khẩu mới</label>
        <input
          type="password"
          name="confirmPassword"
          value={passwords.confirmPassword}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        />
        <div className="text-center">
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md">Xác nhận</button>
        </div>
      </form>
  );
};

export default ChangePassword;
