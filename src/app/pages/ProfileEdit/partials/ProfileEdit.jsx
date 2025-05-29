import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserProfileApi, updateUserProfileApi } from "../ProfileEditService";

const ProfileEdit = () => {
  const nav = useNavigate();
  const id = localStorage.getItem('user_id');

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const [bio, setBio] = useState("");
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!id) return;
    getUserProfileApi(id).then((data) => {
      setAvatarPreview(data.avatarUrl || null);
      setCoverPreview(data.coverUrl || null);
      setBio(data.bio || "");
      setusername(data.username || "");
      setEmail(data.email || "");
    }).catch(() => {});
  }, [id]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file)); 
      setAvatarFile(file);                       
    }
  };

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
      setCoverFile(file);
    }
  };

 const handleSave = async () => {
  try {
    const formData = new FormData();

    const userData = {
      username,
      email,
      bio,
    };
    formData.append("user", new Blob([JSON.stringify(userData)], { type: "application/json" }));

    // Gửi file nếu có
    if (avatarFile) formData.append("avatar", avatarFile);
    if (coverFile) formData.append("cover", coverFile);

    await updateUserProfileApi(id, formData);
    alert("Cập nhật thành công!");
    nav(`/profile/${id}`);
  } catch (error) {
    alert("Có lỗi xảy ra khi cập nhật!");
    console.error(error);
  }
};


  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="relative w-full h-40">
        <img
          src={coverPreview || "src/app/assets/images/img1.jpg"}
          alt="Background"
          className="w-full h-full object-cover rounded-md"
        />
        <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
          <input type="file" className="hidden" onChange={handleBackgroundChange} />
          Thay đổi ảnh bìa
        </label>
      </div>

      <div className="flex mt-6 gap-6">
        <div className="relative w-32 h-32">
          <img
            src={avatarPreview || "src/app/assets/images/daisy.jpg"}
            alt="Avatar"
            className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
          />
          <label className="absolute inset-0 flex items-center justify-center rounded-full cursor-pointer">
            <input type="file" className="hidden" onChange={handleAvatarChange} />
          </label>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Tiểu sử</label>
          <textarea
            className="w-full p-2 mt-1 border rounded-md"
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tên hiển thị</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border rounded-md"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full p-2 mt-1 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md"
              onClick={() => nav(-1)}
            >
              Hủy
            </button>
            <button
              className="px-4 py-2 text-white bg-blue-600 rounded-md"
              onClick={handleSave}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
