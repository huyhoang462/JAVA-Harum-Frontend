import { Menu } from 'lucide-react';
import React, { useState } from 'react'

export default function Navbar() {

  const [isOpen,setIsOpen]=useState(false);

  const topics=["QUAN ĐIỂM - TRANH LUẬN","KHOA HỌC CÔNG NGHỆ","PHÁT TRIỂN BẢN THÂN",
     "TÀI CHÍNH","YÊU", "GIÁO DỤC","THỂ THAO","PHIM ẢNH","THỜI TRANG","LỊCH SỬ",
     "Ô TÔ","TÂM LÝ HỌC","CHUYỆN THẦM KÍN","GAME","CHUYỆN HỌC ĐƯỜNG","NGHỆ THUẬT - ÂM NHẠC",
    "SỨC KHỎE","KĨ NĂNG MỀM" ];
  
     const handleClickToggle=()=>{
      setIsOpen(!isOpen)
     }
  return (
    <div className='w-full bg-transparent h-hnavbar shadow-sm'>
    <div className='mx-auto w-6xl '>
        <div className='w-full flex justify-between  items-center relative'>
          <div className='flex'>
            {topics.slice(0,5).map((topic,index)=>(
              <div key={index} className='flex items-center text-sm  text-text h-14 ml-16 font-medium first:ml-0 hover:text-pblue cursor-pointer 
              '>{topic}</div>
            ))}
          </div>
          <div>
          <Menu className='text-text2 h-7 w-h-7 cursor-pointer  hover:text-pblue' onClick={handleClickToggle}/>
          {
         isOpen && (
          <div className="w-60 absolute top-[60px] max-h-[calc(100svh-var(--spacing-hheader)-var(--spacing-hnavbar)-100px)] 
          right-0 bg-white shadow overflow-y-auto custom-scrollbar">
            {topics.slice(5).map((topic, index) => (
              <div key={index} className="flex items-center py-3 px-4 hover:text-pblue cursor-pointer hover:bg-bgblue">
                {topic}
              </div>
            ))}
          </div>
        )
        
          }
          </div>
        </div>
      </div>
    </div>
  )
}
