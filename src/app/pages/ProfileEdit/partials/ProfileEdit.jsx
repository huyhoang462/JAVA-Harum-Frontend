import React, { useState } from "react";

const ProfileEdit = () => {
  const [avatar, setAvatar] = useState(null);
  const [background, setBackground] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackground(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Ảnh nền */}
      <div className="relative w-full h-40">
        <img
          src={background || "src/app/assets/images/img1.jpg"} 
          alt="Background"
          className="w-full h-full object-cover rounded-md"
        />
        <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
          <input type="file" className="hidden" onChange={handleBackgroundChange} />
          Thay đổi ảnh bìa
        </label>
      </div>

      {/* Khu vực ảnh đại diện và thông tin */}
      <div className="flex mt-6 gap-6">
        {/* Ảnh đại diện */}
        <div className="relative w-32 h-32">
          <img
            src={avatar || "src/app/assets/images/daisy.jpg"}
            alt="Avatar"
            className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
          />
          <label className="absolute inset-0 flex items-center justify-center rounded-full cursor-pointer">
            <input type="file" className="hidden" onChange={handleAvatarChange} />
          </label>
        </div>

        {/* Thông tin chỉnh sửa */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Tiểu sử</label>
          <textarea className="w-full p-2 mt-1 border rounded-md" rows="3"></textarea>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tên hiển thị</label>
              <input type="text" className="w-full p-2 mt-1 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="w-full p-2 mt-1 border rounded-md" />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md">Hủy</button>
            <button className="px-4 py-2 text-white bg-blue-600 rounded-md">Lưu</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;