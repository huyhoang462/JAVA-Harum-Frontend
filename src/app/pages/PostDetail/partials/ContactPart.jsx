import React, { useEffect, useState } from "react";
import {
  Bookmark,
  BookMarked,
  MessageSquare,
  ThumbsDown,
  ThumbsUp,
  UserRoundPlus,
} from "lucide-react";
import { checkSave, doSave, doVote, getVote } from "../postDetailService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function ContactPart({ post, refreshPost }) {
  const userID = localStorage.getItem("user_id");
  const [voteType, setVoteType] = useState(null);
  const [isSave, setIsSave] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    const fetchVote = async () => {
      try {
        const res = await getVote(userID, post?.id);
        if (res.status === 200) {
          setVoteType(res?.data?.voteType);
        } else {
          console.error("Lỗi: Không lấy được bài viết");
        }
      } catch (error) {
        console.error("Lỗi gọi API:", error);
      }
    };
    const fetchSave = async () => {
      try {
        const res = await checkSave(userID, post?.id);
        if (res.status === 200) {
          setIsSave(res.data);
        } else {
          console.error("Lỗi: Không xem được save");
        }
      } catch (error) {
        console.error("Lỗi gọi API:", error);
      }
    };
    if (userID) {
      fetchVote();
      fetchSave();
    }
  }, [userID, post?.id]);
  const handleVote = async (voteType) => {
    if (userID) {
      const vote = {
        userId: userID,
        postId: post.id,
        voteType: voteType,
      };
      const res = await doVote(vote);
      if (res?.status === 200) {
        setVoteType(voteType);
        refreshPost();
      }
    } else nav("/login");
  };
  const handleSave = async () => {
    if (userID) {
      const vote = {
        userId: userID,
        postId: post.id,
      };
      const res = await doSave(vote);
      if (res?.status === 200) {
        toast.success(
          isSave ? "Bỏ lưu bài viết thành công!" : "Lưu bài viết thành công"
        );
        setIsSave(!isSave);
        console.log("done: ", res);
      }
    } else nav("/login");
  };
  return (
    <div>
      {" "}
      <div className="  text-text2 flex flex-col gap-y-4 items-center">
        <div className="mb-[-8px]">
          {voteType === "UPVOTE" ? (
            <ThumbsUp
              className="h-5 cursor-pointer hover:text-text2 text-pblue"
              strokeWidth={3}
            />
          ) : (
            <ThumbsUp
              className="h-5 cursor-pointer hover:text-pblue"
              strokeWidth={3}
              onClick={() => handleVote("UPVOTE")}
            />
          )}
        </div>
        <p>{post?.countLike}</p>
        <div className="mb-[-8px]">
          {voteType === "DOWNVOTE" ? (
            <ThumbsDown
              className="h-5 cursor-pointer hover:text-text2 text-red-500"
              strokeWidth={3}
            />
          ) : (
            <ThumbsDown
              className="h-5 cursor-pointer hover:text-red-500 text-text2"
              strokeWidth={3}
              onClick={() => handleVote("DOWNVOTE")}
            />
          )}
        </div>
        <p>{post?.countDislike}</p>
        <div className="relative cursor-pointer">
          <img
            src={post?.user?.avatar || "/src/app/assets/images/daisy.jpg"}
            className="w-14 h-14  object-cover rounded-full "
          />
          <div className=" h-5 w-5 flex items-center justify-center bg-white rounded-full shadow-md absolute bottom-[-7px] left-1/3">
            <UserRoundPlus className="h-3.5 w-3.5" />
          </div>
        </div>
        <div className="mt-2">
          {isSave ? (
            <Bookmark
              className="h-5 cursor-pointer hover:text-text2 text-pblue"
              strokeWidth={3}
              onClick={() => handleSave()}
            />
          ) : (
            <Bookmark
              className="h-5 cursor-pointer hover:text-pblue"
              strokeWidth={3}
              onClick={() => handleSave()}
            />
          )}
        </div>
        <div className="flex items-center justify-center flex-col text-ssm  ">
          <MessageSquare
            className="h-5 cursor-pointer hover:text-pblue"
            strokeWidth={3}
          />
          <p>{post?.countView}</p>
        </div>
      </div>
    </div>
  );
}
