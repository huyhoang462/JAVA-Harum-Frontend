import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgetPassword from "./partials/ForgetPassword";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "react-toastify";
export default function Login() {
  const nav = useNavigate();
  const [isShowModal, setIsShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHidePassword, setIsHidePassword] = useState(true);
  const handleForgotPassword = () => {
    setIsShowModal(true);
  };
  const toggleHidePassword = () => {
    setIsHidePassword(!isHidePassword);
  };
  const handleLoginApi = () => {
    // hàm này xử lý phần đăng nhập api
    if (email === "hh@gmail.com" && password === "123456")
      return {
        user: "Lewy Hoang",
        bio: "Chúng ta của sau này...",
        email: "hh@gmail.com",
        avatar: "./src/assets/images/daisy.jpg",
      };
    return null;
  };
  const handleLogin = () => {
    if (!password || !email) {
      toast.error("Vui lòng điền đủ thông tin");
      return;
    }
    const user = handleLoginApi();
    if (user) {
      nav("/");
    } else {
      toast.error("Sai thông tin đăng nhập");
    }
  };
  return (
    <div className="p-10 rounded-sm  shadow-lg w-full max-w-sm">
      <div className="flex flex-col items-center">
        <div>
          <img className="h-12  " src="/logoFull.svg" />
        </div>
        <div className="font-semibold text-sblue text-xl">Đăng nhập</div>
        <div>
          <p className="text-text font-medium">Email</p>
          <div className="w-[306px] h-9 mt-2 mb-4 ">
            <input
              className="w-[306px] h-9  px-2 border-2 border-text rounded-md focus:outline-sblue"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <p className="text-text font-medium">Mật khẩu</p>
          <div className="w-[306px] h-9 mt-2 mb-4 relative">
            <input
              type={isHidePassword ? "password" : "text"}
              className="w-[306px] h-9 mt-2 mb-4 px-2 border-2 border-text rounded-md focus:outline-sblue"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {isHidePassword ? (
              <Eye
                className="text-text h-6 hover:text-sblue cursor-pointer absolute top-3.5 right-2"
                onClick={toggleHidePassword}
              />
            ) : (
              <EyeClosed
                className="text-text h-6 hover:text-sblue cursor-pointer absolute top-3.5 right-2"
                onClick={toggleHidePassword}
              />
            )}
          </div>
        </div>
        <div className="w-[306px] flex justify-between items-center mb-5">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 border-1 mr-2.5 border-text rounded-sm"
            />
            <div className="text-sm text-text">Nhớ mật khẩu</div>
          </div>
          <div
            className="font-medium cursor-pointer text-sm text-sblue hover:text-pblue"
            onClick={handleForgotPassword}
          >
            Quên mật khẩu?
          </div>
        </div>
        <div
          className="bg-sblue rounded-md cursor-pointer flex justify-center items-center mb-5  w-[316px] h-9 hover:bg-pblue"
          onClick={handleLogin}
        >
          <p className=" font-medium text-white">Đăng nhập</p>
        </div>
        <div className="flex ">
          <p className="text-text text-sm mr-1">Chưa có tài khoản?</p>
          <p
            className="text-sblue underline text-sm font-medium hover:text-pblue cursor-pointer"
            onClick={() => {
              nav("/signup");
            }}
          >
            Đăng ký
          </p>
        </div>
      </div>
      {isShowModal && (
        <ForgetPassword
          onBack={() => {
            setIsShowModal(false);
            setEmail("");
            setPassword("");
            setIsHidePassword(true);
          }}
        />
      )}
    </div>
  );
}
