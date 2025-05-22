import { House, MessageSquareMore, Pencil, User } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  const menuItems = [
    // {
    //   name: "Trang chủ",
    //   path: "/admin/",
    //   icon: <House className="h-8  mr-2" strokeWidth={3} />,
    // },
    {
      name: "Người dùng",
      path: "/admin/users",
      icon: <User className="h-8  mr-2" strokeWidth={3} />,
    },
    {
      name: "Bài viết",
      path: "/admin/posts",
      icon: <Pencil className="h-8  mr-2" strokeWidth={3} />,
    },
    {
      name: "Bình luận",
      path: "/admin/comments",
      icon: <MessageSquareMore className="h-8  mr-2" strokeWidth={3} />,
    },
  ];
  return (
    <div className="w-wsidebar bg-gray-300 text-text fixed  border-[#A19393] font-bold text-lg  h-screen ">
      <div className="  py-4">
        <img src="/logo.svg" className="h-24 mx-auto" />
      </div>
      <ul>
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) =>
              `h-16 px-8 cursor-pointer flex items-center ${
                isActive
                  ? "bg-gray-200 text-pblue  text-primary"
                  : "hover:bg-gray-200 hover:text-pblue"
              }`
            }
          >
            {item.icon}
            <li>{item.name}</li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}
