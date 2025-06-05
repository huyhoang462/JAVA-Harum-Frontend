// Navbar.js
import { Menu } from "lucide-react";
import React, { useState, memo } from "react"; // Thêm memo
import { useNavigate, useLocation, Link } from "react-router-dom"; // Link có thể tốt hơn cho SEO

// Sử dụng memo để tránh re-render không cần thiết nếu prop 'topics' không thay đổi
const Navbar = memo(function Navbar({ topics }) {
  const nav = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigate = (topic) => {
    // Truyền state để Topic page có thể dùng ngay, nhưng URL vẫn là nguồn chân lý
    nav(`/topic/${topic.id}`);
    setIsOpen(false); // Ẩn menu sau khi chọn (nếu đang mở)
  };

  // Đảm bảo topics là mảng trước khi slice và map
  const validTopics = Array.isArray(topics) ? topics : [];

  return (
    <div className="w-full bg-transparent h-hnavbar shadow-sm">
      <div className="mx-auto max-w-6xl ">
        <div className="w-full flex justify-between items-center relative">
          <div className="flex">
            {validTopics.slice(0, 5).map((topic) => (
              <div
                key={topic.id} // Sử dụng topic.id là key duy nhất
                className={`flex items-center text-sm h-14 px-8 font-medium cursor-pointer
                hover:bg-bgblue hover:text-pblue
                ${
                  location.pathname === `/topic/${topic.id}`
                    ? "bg-bgblue text-pblue"
                    : "text-text"
                }`}
                onClick={() => handleNavigate(topic)}
                role="button" // Thêm role cho accessibility
                tabIndex={0} // Thêm tabIndex cho accessibility
                onKeyPress={(e) => e.key === "Enter" && handleNavigate(topic)} // Accessibility
              >
                {topic.name?.toString().toUpperCase()}
              </div>
            ))}
          </div>
          {validTopics.length > 5 && ( // Chỉ hiển thị nút Menu nếu có nhiều hơn 5 topics
            <div>
              <Menu
                className="text-text2 h-7 w-7 cursor-pointer hover:text-pblue" // Sửa w-h-7 thành w-7
                onClick={handleClickToggle}
                aria-expanded={isOpen} // Accessibility
                aria-controls="topic-dropdown" // Accessibility
              />
              {isOpen && (
                <div
                  id="topic-dropdown"
                  className="w-60 absolute top-[60px] right-0 z-50 bg-white shadow-lg max-h-[calc(100svh-var(--spacing-hheader)-var(--spacing-hnavbar)-100px)] overflow-y-auto custom-scrollbar rounded-md"
                >
                  {validTopics.slice(5).map((topic) => (
                    <div
                      key={topic.id} // Sử dụng topic.id
                      className={`flex items-center py-3 px-4 cursor-pointer
                      hover:bg-bgblue hover:text-pblue
                      ${
                        location.pathname === `/topic/${topic.id}`
                          ? "bg-bgblue text-pblue"
                          : "text-text"
                      }`}
                      onClick={() => handleNavigate(topic)}
                      role="menuitem" // Accessibility
                    >
                      {topic.name?.toString().toUpperCase()}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Navbar;
