// Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleSignUpApi, handleVerifyOtpApi } from "./signupService";
import { Eye, EyeClosed } from "lucide-react";
import VerifyOtp from "./partials/VerifyOtp";

export default function Signup() {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [isHideConfirmPassword, setIsHideConfirmPassword] = useState(true);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateSignUp = (email, username, password, confirmPassword) => {
    if (!email || !username || !password || !confirmPassword) {
      toast.error("Vui lòng nhập đủ thông tin");
      return false;
    }
    if (username?.length < 6) {
      toast.error("Tên người dùng phải từ 6 kí tự trở lên");
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

  const signup = async () => {
    setIsLoading(true);
    try {
      const res = await handleSignUpApi(username, email, password);
      if (res.status === 200) {
        toast.success(res.data);
        setShowOtpModal(true);
      } else {
        console.log("lỗi là:", res?.response?.data?.message);
        toast.error(res?.response?.data?.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    }
    setIsLoading(false);
  };

  const handleSignUp = () => {
    if (!validateSignUp(email, username, password, confirmPassword)) return;
    signup();
  };

  const handleVerifyOtp = (otp) => {
    const user = {
      username: username,
      email: email,
      passwordHash: password,
    };
    const res = handleVerifyOtpApi(email, otp, user);
    console.log("res: ", res);
    setShowOtpModal(false);
    toast.success("Xác thực thành công!");
    nav("/login");
  };

  return (
    <div className="p-10 rounded-sm shadow-lg w-full max-w-sm">
      <div className="flex flex-col items-center">
        <img className="h-12" src="/logoFull.svg" alt="Logo" />
        <div className="font-semibold text-sblue text-xl">Đăng ký</div>

        <div>
          <p className="text-text font-medium">Username</p>
          <input
            className="w-[306px] h-9 mt-2 mb-3 px-2 border-2 border-text rounded-md focus:outline-sblue"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <p className="text-text font-medium">Email</p>
          <input
            className="w-[306px] h-9 mt-2 mb-3 px-2 border-2 border-text rounded-md focus:outline-sblue"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-[306px] ">
          <p className="text-text font-medium">Mật khẩu</p>
          <div className="relative">
            <input
              type={isHidePassword ? "password" : "text"}
              className="w-full mt-2 mb-4 h-9 px-2 border-2 border-text rounded-md focus:outline-sblue"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isHidePassword ? (
              <Eye
                className="absolute top-3.5 right-2 text-text h-6 hover:text-sblue cursor-pointer"
                onClick={() => setIsHidePassword(!isHidePassword)}
              />
            ) : (
              <EyeClosed
                className="absolute top-3.5 right-2 text-text h-6 hover:text-sblue cursor-pointer"
                onClick={() => setIsHidePassword(!isHidePassword)}
              />
            )}
          </div>
        </div>

        <div className="w-[306px] ">
          <p className="text-text font-medium">Nhập lại mật khẩu</p>
          <div className="relative">
            <input
              type={isHideConfirmPassword ? "password" : "text"}
              className="w-full mt-2 mb-4 h-9 px-2 border-2 border-text rounded-md focus:outline-sblue"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {isHideConfirmPassword ? (
              <Eye
                className="absolute top-3.5 right-2 text-text h-6 hover:text-sblue cursor-pointer"
                onClick={() => setIsHideConfirmPassword(!isHideConfirmPassword)}
              />
            ) : (
              <EyeClosed
                className="absolute top-3.5 right-2 text-text h-6 hover:text-sblue cursor-pointer"
                onClick={() => setIsHideConfirmPassword(!isHideConfirmPassword)}
              />
            )}
          </div>
        </div>
        <button
          className="bg-sblue text-white rounded-md w-[316px] h-9 hover:bg-pblue cursor-pointer"
          onClick={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? "Đang đăng ký..." : "Đăng ký"}
        </button>

        <p className="text-sm mt-3">
          Đã có tài khoản?{" "}
          <span
            className="text-sblue cursor-pointer underline"
            onClick={() => nav("/login")}
          >
            Đăng nhập
          </span>
        </p>
      </div>

      {showOtpModal && (
        <VerifyOtp
          email={email}
          onClose={() => setShowOtpModal(false)}
          onVerify={handleVerifyOtp}
        />
      )}
    </div>
  );
}
