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
  const [isShowNotifiaction, setIsShowNotifiaction] = useState(false);
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

  const notifications = [
    {
      id: "1",
      userId: "user1",
      message: "Alice đã bình luận về bài viết của bạn.",
      isRead: false,
      type: "COMMENT",
      postId: "post123",
      commentId: "comment456",
      followId: null,
      createdAt: "2025-04-15T10:00:00Z",
    },
    {
      id: "2",
      userId: "user2",
      message: "Bob đã theo dõi bạn.",
      isRead: false,
      type: "FOLLOW",
      postId: null,
      commentId: null,
      followId: "follow789",
      createdAt: "2025-04-14T12:30:00Z",
    },
    {
      id: "3",
      userId: "user3",
      message: "Charlie đã đăng một bài viết mới.",
      isRead: true,
      type: "POST",
      postId: "post987",
      commentId: null,
      followId: null,
      createdAt: "2025-04-13T09:15:00Z",
    },
    {
      id: "4",
      userId: "user4",
      message: "David đã bình luận về bài viết của bạn.",
      isRead: false,
      type: "COMMENT",
      postId: "post321",
      commentId: "comment654",
      followId: null,
      createdAt: "2025-04-12T17:45:00Z",
    },
    {
      id: "5",
      userId: "user5",
      message: "Eve đã theo dõi bạn.",
      isRead: true,
      type: "FOLLOW",
      postId: null,
      commentId: null,
      followId: "follow321",
      createdAt: "2025-04-12T08:00:00Z",
    },
    {
      id: "6",
      userId: "user6",
      message: "Frank đã đăng một bài viết mới.",
      isRead: false,
      type: "POST",
      postId: "post654",
      commentId: null,
      followId: null,
      createdAt: "2025-04-11T11:20:00Z",
    },
    {
      id: "7",
      userId: "user7",
      message: "Grace đã bình luận về bài viết của bạn.",
      isRead: false,
      type: "COMMENT",
      postId: "post789",
      commentId: "comment987",
      followId: null,
      createdAt: "2025-04-11T13:45:00Z",
    },
    {
      id: "8",
      userId: "user8",
      message: "Henry đã theo dõi bạn.",
      isRead: false,
      type: "FOLLOW",
      postId: null,
      commentId: null,
      followId: "follow654",
      createdAt: "2025-04-10T19:30:00Z",
    },
    {
      id: "9",
      userId: "user9",
      message: "Ivy đã đăng một bài viết mới.",
      isRead: true,
      type: "POST",
      postId: "post222",
      commentId: null,
      followId: null,
      createdAt: "2025-04-09T06:50:00Z",
    },
    {
      id: "10",
      userId: "user10",
      message: "Jack đã bình luận về bài viết của bạn.",
      isRead: false,
      type: "COMMENT",
      postId: "post111",
      commentId: "comment333",
      followId: null,
      createdAt: "2025-04-08T15:10:00Z",
    },
  ];
const userId = localStorage.getItem("user_id");
  const menuItems = [
    {
      title: "Trang cá nhân",
      icon: <CircleUserRound className="h-6 text-text2 mr-2" />,
      path: `/profile/${userId}`,
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
              <div className="ml-4 relative">
                <Bell
                  className={`${
                    textColor === "white" ? "text-white" : "text-text2"
                  } h-[25px] w-[25px] cursor-pointer hover:text-pblue`}
                  onClick={() => setIsShowNotifiaction(!isShowNotifiaction)}
                />
                {isShowNotifiaction && (
                  <div className="w-96 max-h-[400px] overflow-y-auto p-2 flex flex-col absolute right-0 top-10 rounded-lg shadow-xl z-50 bg-white  custom-scrollbar">
                    {notifications.length === 0 ? (
                      <div className="flex items-center justify-center h-24 text-gray-500 text-sm">
                        Chưa có thông báo nào
                      </div>
                    ) : (
                      notifications.map((noti) => (
                        <div
                          key={noti.id}
                          className={`p-3 rounded-md mb-2 cursor-pointer transition-all hover:bg-gray-100 ${
                            !noti.isRead ? "bg-blue-50" : "bg-white"
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <div className="mt-1">
                              {noti.type === "COMMENT" && "💬"}
                              {noti.type === "FOLLOW" && "👤"}
                              {noti.type === "POST" && "📝"}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-800">
                                {noti.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(noti.createdAt).toLocaleString(
                                  "vi-VN",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              <div className="ml-4 cursor-pointer">
                <div
                  className={`${
                    textColor === "white"
                      ? "text-white border-white"
                      : "text-text2 border-text2"
                  } border-2 px-4 py-1.5 rounded-3xl flex hover:text-pblue`}
                  onClick={() => nav("/write-post")}
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
