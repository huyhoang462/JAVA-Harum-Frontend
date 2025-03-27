import React, { useState } from "react";
import {
  Bell,
  ChevronDown,
  CircleUserRound,
  Feather,
  LogOut,
  MessageSquareMore,
  Search,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({ textColor }) {
  const nav = useNavigate();
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClickLogo = () => {
    nav("/");
  };

  const handleClickLogin = () => {
    nav("/login");
  };

  const handleClickSignUp = () => {
    nav("/signup");
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    nav("/");
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      nav(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const menuItems = [
    {
      title: "Trang cá nhân",
      icon: <CircleUserRound className="h-6 text-text2 mr-2" />,
      path: "/profile",
    },
    {
      title: "Chỉnh sửa thông tin",
      icon: <Settings className="h-6 text2-text mr-2" />,
      path: "/profileedit",
    },
  ];

  const isLoggedIn = !!localStorage.getItem("user_id");

  return (
    <div className="w-full bg-transparent h-hheader my-2.5">
      <div className="mx-auto max-w-6xl">
        <div className="w-full flex justify-between items-center">
          <div>
            <img
              className="h-12 cursor-pointer"
              onClick={handleClickLogo}
              src="/logoFull.svg"
              alt="Logo"
            />
          </div>
          {isLoggedIn ? (
            <div className="flex relative ml-8">
              <Search
                className={`${
                  textColor === "white" ? "text-text" : "text-text2"
                } h-6 w-6 cursor-pointer hover:text-pblue absolute top-1.5 left-2`}
                onClick={handleSearch}
              />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="bg-gray-50 border-1 border-gray-200 lg:w-md h-9 pr-2 pl-9 text-text focus:outline-pblue focus:bg-bgblue rounded-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          ) : null}
          {isLoggedIn ? (
            <div className="flex items-center">
              <div className="ml-4">
                <MessageSquareMore
                  className={`${
                    textColor === "white" ? "text-white" : "text-text2"
                  } h-[25px] w-[25px] cursor-pointer hover:text-pblue`}
                />
              </div>
              <div className="ml-4">
                <Bell
                  className={`${
                    textColor === "white" ? "text-white" : "text-text2"
                  } h-[25px] w-[25px] cursor-pointer hover:text-pblue`}
                />
              </div>
              <div className="ml-4 cursor-pointer">
                <div
                  className={`${
                    textColor === "white"
                      ? "text-white border-white"
                      : "text-text2 border-text2"
                  } border-2 px-4 py-1.5 rounded-3xl flex hover:text-pblue`}
                >
                  <Feather
                    className={`${
                      textColor === "white" ? "text-white" : "text-text2"
                    } h-6 w-6 cursor-pointer mr-1 hover:text-pblue`}
                  />
                  <p className="font-medium pr-[4px]">Viết bài</p>
                </div>
              </div>
              <div
                className="flex items-center justify-between ml-4 cursor-pointer relative"
                onClick={() => setIsShowMenu(!isShowMenu)}
              >
                <div>
                  <img
                    className="rounded-full h-10 w-10 object-cover"
                    src="/src/app/assets/images/daisy.jpg"
                    alt="Avatar"
                  />
                </div>
                <ChevronDown className="text-text2 h-5 w-5" />
                {isShowMenu && (
                  <div className="w-56 flex flex-col absolute top-11 right-0 rounded-lg shadow-lg z-10 bg-white">
                    {menuItems.map((item, index) => (
                      <div
                        className="px-3 py-4 text-text2 flex items-center hover:bg-bgblue first:rounded-t-xl"
                        key={index}
                        onClick={() => nav(item.path)}
                      >
                        {item.icon}
                        {item.title}
                      </div>
                    ))}
                    <div
                      className="px-3 py-4 text-text2 flex items-center border-t-1 border-text2 rounded-b-xl hover:bg-bgblue"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-6 text-text2 mr-2" />
                      Đăng xuất
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-between gap-x-4 items-center">
              <div
                className="px-4 h-9 rounded-3xl border flex items-center justify-center hover:border-pblue hover:text-pblue cursor-pointer border-text2"
                onClick={handleClickSignUp}
              >
                Đăng ký
              </div>
              <div
                className="px-4 h-9 rounded-3xl flex items-center justify-center hover:bg-pblue bg-sblue text-white cursor-pointer"
                onClick={handleClickLogin}
              >
                Đăng nhập
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
