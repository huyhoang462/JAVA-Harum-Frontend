import { UserRoundCheck, UserRoundPlus } from "lucide-react";
import React from "react";

export default function OtherAccount({ user }) {
  return (
    <div className="flex justify-between  text-ssm">
      <div className=" flex">
        <img
          src={user.avatar}
          className="w-11 h-11 object-cover rounded-full shrink-0 mr-2"
        />
        <div className=" mx-auto">
          <div className="font-bold ">{user.name}</div>
          <div className="  text-text2">{user.bio} </div>
        </div>
      </div>
      <div
        className={`border-1 rounded-full w-8 h-8 mt-1 cursor-pointer shrink-0 mx-2  flex items-center justify-center  ${
          user.isFollow ? "border-pblue text-pblue" : "border-text2 text-text2"
        }`}
      >
        {user.isFollow ? (
          <UserRoundCheck className="h-4" />
        ) : (
          <UserRoundPlus className="h-4" />
        )}
      </div>
    </div>
  );
}
