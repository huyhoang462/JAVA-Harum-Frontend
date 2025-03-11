import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Hàm kiểm tra email hợp lệ
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Hàm kiểm tra thông tin đăng ký
  const validateSignUp = (email, password, confirmPassword) => {
    if (!email || !password || !confirmPassword) {
      toast.error("Vui lòng nhập đủ thông tin");
      return false;
    }
    if (!isValidEmail(email)) {
      toast.error("Email không hợp lệ");
      return false;
    }
    if (password.length < 8) {
      toast.error("Mật khẩu phải có ít nhất 8 ký tự");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp");
      return false;
    }
    return true;
  };

  const handleSignUpApi = () => {
    return true; // Giả lập gọi API thành công
  };

  const handleSignUp = () => {
    if (!validateSignUp(email, password, confirmPassword)) return;

    const isSuccess = handleSignUpApi();
    if (isSuccess) {
      toast.success("Đăng ký thành công!");
      nav("/"); // Điều hướng sau khi đăng ký thành công
    } else {
      toast.error("Đăng ký thất bại, vui lòng thử lại");
    }
  };

  return (
    <div className="p-10 rounded-sm shadow-lg w-full max-w-sm">
      <div className="flex flex-col items-center">
        <div>
          <img className="h-12" src="/logoFull.svg" alt="Logo" />
        </div>
        <div className="font-semibold text-sblue text-xl">Đăng ký</div>

        <div>
          <p className="text-text font-medium">Email</p>
          <input
            className="w-[306px] h-9 mt-2 mb-4 px-2 border-2 border-text rounded-md focus:outline-sblue"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <p className="text-text font-medium">Mật khẩu</p>
          <input
            type="password"
            className="w-[306px] h-9 mt-2 mb-4 px-2 border-2 border-text rounded-md focus:outline-sblue"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <p className="text-text font-medium">Nhập lại mật khẩu</p>
          <input
            type="password"
            className="w-[306px] h-9 mt-2 mb-4 px-2 border-2 border-text rounded-md focus:outline-sblue"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div
          className="bg-sblue rounded-md cursor-pointer flex justify-center items-center mb-5 w-[316px] h-9 hover:bg-pblue"
          onClick={handleSignUp}
        >
          <p className="font-medium text-white">Đăng ký</p>
        </div>

        <div className="flex">
          <p className="text-text text-sm mr-1">Đã có tài khoản?</p>
          <p
            className="text-sblue underline text-sm font-medium hover:text-pblue cursor-pointer"
            onClick={() => nav("/login")}
          >
            Đăng nhập
          </p>
        </div>
      </div>
    </div>
  );
}
