import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileEdit from "./partials/ProfileEdit";
import ChangePassword from "./partials/ChangePassword";
const ProfileSetting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname.includes("password")
    ? "password"
    : "profile";

  return (
    <div className="max-w-6xl mx-auto p-6 flex">
      {/* Sidebar Tabs */}
      <div className="w-1/4 pr-4">
        <button
          className={`block w-full text-left py-2 px-4 mb-2 border-l-4 cursor-pointer ${
            activeTab === "profile"
              ? "border-pblue  text-pblue font-bold"
              : "border-transparent text-gray-600"
          }`}
          onClick={() => navigate("/profileedit")}
        >
          Thông tin cơ bản
        </button>
        <button
          className={`block w-full text-left py-2 px-4 border-l-4 cursor-pointer ${
            activeTab === "password"
              ? "border-pblue text-pblue font-bold"
              : "border-transparent text-gray-600"
          }`}
          onClick={() => navigate("/changepassword")}
        >
          Đổi mật khẩu
        </button>
      </div>

      {/* Content Section */}
      <div className="w-3/4 pl-6 flex-grow">
        {activeTab === "profile" ? <ProfileEdit /> : <ChangePassword />}
      </div>
    </div>
  );
};

export default ProfileSetting;
