import React, { useState } from "react";

export default function ForgetPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [isHideInfo, setIsHideInfo] = useState(true);
  const [isHideError, setIsHideError] = useState(true);
  const handleForgetPasswordApi = () => {
    return email === "hh@gmail.com";
  };
  const handleForgetPassword = () => {
    let isSucceed = handleForgetPasswordApi();

    if (isSucceed) {
      setIsHideInfo(false);
      setIsHideError(true);
      setEmail("");
    } else {
      setIsHideInfo(true);
      setIsHideError(false);
    }
  };
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white backdrop-opacity-30 flex items-center justify-center">
      <div className="p-10 rounded-sm  shadow-lg w-full max-w-md ">
        <div className="flex flex-col items-center">
          <div className="font-semibold text-sblue text-xl mb-3">
            Quên mật khẩu
          </div>
          <div className="mb-4">
            {" "}
            <p className="text-text font-medium text-sm mr-1">
              Nhập Email của bạn để nhận liên kết đặt lại mật khẩu
            </p>
          </div>
          <div>
            <p className="text-text font-medium">Email</p>
            <input
              className="w-[336px] h-9 mt-2 mb-2 px-2 border-2 border-text rounded-md focus:outline-sblue"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-[336px]">
            {isHideInfo ? (
              <></>
            ) : (
              <p className="text-green-500 text-sm">
                Chúng tôi đã gửi mật khẩu mới đến email của bạn. Vui lòng kiểm
                tra email.
              </p>
            )}
            {isHideError ? (
              <></>
            ) : (
              <p className="text-red-500 text-sm">
                Email chưa đăng ký tài khoản
              </p>
            )}
          </div>
          <div
            className="bg-sblue rounded-md cursor-pointer flex justify-center items-center mb-5 mt-2 w-[336px] h-9 hover:bg-pblue"
            onClick={handleForgetPassword}
          >
            <p className=" font-medium text-white">Xác nhận</p>
          </div>
          <div className="flex ">
            <p
              className="text-sblue text-sm mr-1 font-medium cursor-pointer"
              onClick={onBack}
            >
              Quay lại đăng nhập
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
