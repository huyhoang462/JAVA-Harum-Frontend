import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ForgetPassword from "./partials/ForgetPassword";
import { Eye, EyeClosed, X } from "lucide-react";
import { toast } from "react-toastify";
import { handleLoginApi } from "./loginService";

export default function Login() {
  const nav = useNavigate();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isRememberPassword, setIsRememberPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [savedAccounts, setSavedAccounts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    setSavedAccounts(accounts);
    console.log("accuont: ", accounts);
  }, []);

  const handleForgotPassword = () => {
    setIsShowModal(true);
  };

  const toggleHidePassword = () => {
    setIsHidePassword(!isHidePassword);
  };

  const loggin = async () => {
    const res = await handleLoginApi(email, password);
    if (!res) {
      toast.error("Sai thông tin đăng nhập");
    } else {
      localStorage.setItem("user_id", res?.id);

      if (isRememberPassword) {
        const updatedAccounts = [
          ...savedAccounts.filter((acc) => acc.email !== email),
          { email, password },
        ];
        localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
      }
      nav("/");
    }
    setIsLoading(false);
  };

  const handleLogin = () => {
    setIsLoading(true);
    if (!password || !email) {
      toast.error("Vui lòng điền đủ thông tin");
      return;
    }
    loggin();
  };

  const handleSelectAccount = (selectedEmail) => {
    const selectedAccount = savedAccounts.find(
      (acc) => acc.email === selectedEmail
    );
    if (selectedAccount) {
      setEmail(selectedAccount.email);
      setPassword(selectedAccount.password);
      () => console.log("acount: ", email, ", ", password);
    }
    setShowDropdown(false);
  };

  const handleDeleteAccount = (deletedEmail) => {
    const updatedAccounts = savedAccounts.filter(
      (acc) => acc.email !== deletedEmail
    );
    setSavedAccounts(updatedAccounts);
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
  };

  return (
    <div className="p-10 rounded-sm shadow-lg w-full max-w-sm">
      <div className="flex flex-col items-center">
        <div>
          <img className="h-12" src="/logoFull.svg" />
        </div>
        <div className="font-semibold text-sblue text-xl">Đăng nhập</div>

        <div className="relative w-[306px] ">
          <p className="text-text font-medium">Email</p>
          <input
            className="w-full mt-2 mb-4 h-9 px-2 border-2 border-text rounded-md focus:outline-sblue"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
          />
          {showDropdown && savedAccounts.length > 0 && (
            <div className="absolute w-full z-1 bg-white border border-gray-300 rounded-md shadow-lg mt-1">
              {savedAccounts.map((acc, index) => (
                <div
                  key={index}
                  className="p-2 flex justify-between items-center hover:bg-gray-100 cursor-pointer"
                >
                  <span onMouseDown={() => handleSelectAccount(acc.email)}>
                    {acc.email}
                  </span>
                  <X
                    className="h-4 w-4 text-gray-500 hover:text-red-500 cursor-pointer"
                    onClick={() => handleDeleteAccount(acc.email)}
                  />
                </div>
              ))}
            </div>
          )}
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
                className="absolute top-3 right-2 text-text h-6 hover:text-sblue cursor-pointer"
                onClick={toggleHidePassword}
              />
            ) : (
              <EyeClosed
                className="absolute top-3 right-2 text-text h-6 hover:text-sblue cursor-pointer"
                onClick={toggleHidePassword}
              />
            )}
          </div>
        </div>

        <div className="w-[306px] flex justify-between items-center mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 border-1 mr-2.5 border-text rounded-sm"
              checked={isRememberPassword}
              onChange={(e) => setIsRememberPassword(e.target.checked)}
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
          className={`rounded-md cursor-pointer flex justify-center items-center w-[316px] h-9 
    ${
      isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-sblue hover:bg-pblue"
    }`}
          onClick={!isLoading ? handleLogin : undefined}
        >
          <p className="font-medium text-white">
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </p>
        </div>

        <div className="flex mt-2">
          <p className="text-text text-sm mr-1 ">Chưa có tài khoản?</p>
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
