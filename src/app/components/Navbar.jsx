import { Menu } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const [isOpen, setIsOpen] = useState(false);

  const topics = [
    { name: "quan_diem_tranh_luan", label: "QUAN ĐIỂM - TRANH LUẬN" },
    { name: "khoa_hoc_cong_nghe", label: "KHOA HỌC CÔNG NGHỆ" },
    { name: "phat_trien_ban_than", label: "PHÁT TRIỂN BẢN THÂN" },
    { name: "tai_chinh", label: "TÀI CHÍNH" },
    { name: "yeu", label: "YÊU" },
    { name: "giao_duc", label: "GIÁO DỤC" },
    { name: "the_thao", label: "THỂ THAO" },
    { name: "phim_anh", label: "PHIM ẢNH" },
    { name: "thoi_trang", label: "THỜI TRANG" },
    { name: "lich_su", label: "LỊCH SỬ" },
    { name: "o_to", label: "Ô TÔ" },
    { name: "tam_ly_hoc", label: "TÂM LÝ HỌC" },
    { name: "chuyen_tham_kin", label: "CHUYỆN THẦM KÍN" },
    { name: "game", label: "GAME" },
    { name: "chuyen_hoc_duong", label: "CHUYỆN HỌC ĐƯỜNG" },
    { name: "nghe_thuat_am_nhac", label: "NGHỆ THUẬT - ÂM NHẠC" },
    { name: "suc_khoe", label: "SỨC KHỎE" },
    { name: "ki_nang_mem", label: "KĨ NĂNG MỀM" },
  ];

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
                key={topic.name}
                className={`flex items-center text-sm h-14 px-8 font-medium cursor-pointer
                hover:bg-bgblue hover:text-pblue 
                ${
                  location.pathname === `/topic/${topic.name}`
                    ? "bg-bgblue text-pblue"
                    : "text-text"
                }`}
                onClick={() => nav(`/topic/${topic.name}`)}
              >
                {topic.label}
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
                      location.pathname === `/topic/${topic.name}`
                        ? "bg-bgblue text-pblue"
                        : "text-text"
                    }`}
                    onClick={() => {
                      nav(`/topic/${topic.name}`);
                      setIsOpen(false); // Ẩn menu sau khi chọn
                    }}
                  >
                    {topic.label}
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
