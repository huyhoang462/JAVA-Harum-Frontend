import React from "react";
import {
  Bell,
  ChevronDown,
  Feather,
  MessageSquareMore,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const nav = useNavigate();
  const handleClickLogo = () => {
    nav("/");
  };
  return (
    <div className="w-full bg-transparent h-hheader my-2.5">
      <div className="mx-auto max-w-6xl">
        <div className="w-full flex justify-between  items-center">
          <div className="">
            <img
              className="h-12 cursor-pointer"
              onClick={handleClickLogo}
              src="./logoFull.svg"
            />
          </div>
          <div className="flex items-center">
            <div className="">
              <Search className="text-text2 h-[25px] w-[25px] cursor-pointer hover:text-pblue" />
            </div>
            <div className="ml-4">
              <MessageSquareMore className="text-text2 h-[25px] w-[25px] cursor-pointer hover:text-pblue" />
            </div>
            <div className="ml-4">
              <Bell className="text-text2 h-[25px] w-[25px] cursor-pointer hover:text-pblue" />
            </div>
            <div className="ml-4  cursor-pointer ">
              <div className="border-text2 border-2 px-6 py-2 rounded-3xl flex text-text2 hover:text-pblue">
                <Feather className="text-text2 h-[25px] w-[25px] mr-2 hover:text-pblue" />
                <p className="font-medium pr-[4px] ">Viết bài</p>
              </div>
            </div>
            <div className="flex items-center justify-between ml-4 cursor-pointer">
              <div className="">
                <img
                  className="rounded-full h-10 w-10 object-cover"
                  src="./src/app/assets/images/daisy.jpg"
                />
              </div>
              <ChevronDown className="text-text2 h-[25px] w-[25px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
