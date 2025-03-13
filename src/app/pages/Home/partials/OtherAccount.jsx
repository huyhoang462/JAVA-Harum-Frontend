import React from "react";

export default function OtherAccount({ user }) {
  return (
    <div className="grid grid-cols-6 gap-x-2">
      <div className="h-12">
        <img
          src={user.avatar}
          className="w-12 h-12 object-cover rounded-full"
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-ssm">{user.name}</p>
        <p className=" text-ssm text-text2">{user.bio} </p>
      </div>
      <div
        className={`border-1 rounded-2xl text-ssm col-span-2 col-start-5 ml-auto w-[96px] h-8.5 cursor-pointer  flex items-center justify-center  ${
          user.isFollow ? "border-pblue text-pblue" : "border-text2 text-text2"
        }`}
      >
        {user.isFollow ? "Đang theo dõi" : "Theo dõi"}
      </div>
    </div>
  );
}
