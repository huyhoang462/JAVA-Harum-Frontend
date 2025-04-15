import { Menu } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ topics }) {
  const nav = useNavigate();
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const [isOpen, setIsOpen] = useState(false);

  const handleClickToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full bg-transparent h-hnavbar shadow-sm">
      <div className="mx-auto max-w-6xl ">
        <div className="w-full flex justify-between items-center relative">
          <div className="flex">
            {topics.slice(0, 5).map((topic) => (
              <div
                key={topic.id}
                className={`flex items-center text-sm h-14 px-8 font-medium cursor-pointer
                hover:bg-bgblue hover:text-pblue 
                ${
                  location.pathname === `/topic/${topic.id}`
                    ? "bg-bgblue text-pblue"
                    : "text-text"
                }`}
                onClick={() => nav(`/topic/${topic.id}`, { state: { topic } })}
              >
                {topic.name?.toString().toUpperCase()}
              </div>
            ))}
          </div>
          <div>
            <Menu
              className="text-text2 h-7 w-h-7 cursor-pointer hover:text-pblue"
              onClick={handleClickToggle}
            />
            {isOpen && (
              <div className="w-60 absolute top-[60px] right-0 z-9 bg-white shadow max-h-[calc(100svh-var(--spacing-hheader)-var(--spacing-hnavbar)-100px)] overflow-y-auto custom-scrollbar">
                {topics.slice(5).map((topic) => (
                  <div
                    key={topic.name}
                    className={`flex items-center py-3 px-4 cursor-pointer 
                    hover:bg-bgblue hover:text-pblue 
                    ${
                      location.pathname === `/topic/${topic.id}`
                        ? "bg-bgblue text-pblue"
                        : "text-text"
                    }`}
                    onClick={() => {
                      nav(`/topic/${topic.id}`, { state: { topic } });
                      setIsOpen(false); // Ẩn menu sau khi chọn
                    }}
                  >
                    {topic.name?.toString().toUpperCase()}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
