import { User, CheckCircle, XCircle } from "lucide-react";
import React, { useState } from "react";

export default function Following({ user }) {
  const [isFollowing, setIsFollowing] = useState(true); 

  const handleUnfollow = () => {
    setIsFollowing(false);
  };

  return (
    <div className="w-[276px] flex flex-col items-center cursor-pointer border border-gray-300 rounded-md p-4">
      <div className="mb-3">
        <img src={user?.avatar} alt="Avatar" className="rounded-full h-[72px] w-[72px] object-cover" />
      </div>

      <div className="font-medium text-center mb-1">{user?.name}</div>

       <div className="flex justify-center items-center">
        {isFollowing ? (
          <button
            className="flex items-center gap-2border-1 border-text  mt-2.5 mb-4 text-text hover:border-pblue hover:text-pblue cursor-pointer rounded-lg h-8 font-medium justify-center text-sm"
            onClick={handleUnfollow}
          >
            <XCircle className="h-5" />
            <span>Bỏ theo dõi</span>
          </button>
        ) : (
          <span className="text-red-500">Đã bỏ theo dõi</span>
        )}
      </div>
    </div>
  );
}
