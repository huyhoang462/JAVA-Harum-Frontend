import React from "react";
import {
  BookMarked,
  MessageSquare,
  ThumbsDown,
  ThumbsUp,
  UserRoundPlus,
} from "lucide-react";
export default function ContactPart({ post }) {
  return (
    <div>
      {" "}
      <div className="  text-text2 flex flex-col gap-y-4 items-center">
        <div className="">
          <ThumbsUp
            className="h-5 cursor-pointer hover:text-pblue"
            strokeWidth={2.5}
          />
        </div>
        <p>1120</p>
        <div className="">
          <ThumbsDown
            className="h-5 cursor-pointer hover:text-pblue"
            strokeWidth={2.5}
          />
        </div>
        <div className="relative cursor-pointer">
          <img
            src={post?.user?.avatar}
            className="w-14 h-14  object-cover rounded-full "
          />
          <div className=" h-5 w-5 flex items-center justify-center bg-white rounded-full shadow-md absolute bottom-[-7px] left-1/3">
            <UserRoundPlus className="h-3.5 w-3.5" />
          </div>
        </div>
        <div className="mt-2">
          <BookMarked
            className="h-5 cursor-pointer hover:text-pblue"
            strokeWidth={2.5}
          />
        </div>
        <div className="flex items-center justify-center flex-col text-ssm  ">
          <MessageSquare
            className="h-5 cursor-pointer hover:text-pblue"
            strokeWidth={2.5}
          />
          29
        </div>
      </div>
    </div>
  );
}
