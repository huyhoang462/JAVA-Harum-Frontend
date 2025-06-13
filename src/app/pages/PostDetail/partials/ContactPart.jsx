import React, { useEffect, useState } from "react";
import {
  Bookmark,
  BookMarked,
  MessageSquare,
  ShieldUser,
  ThumbsDown,
  ThumbsUp,
  UserRoundCheck,
  UserRoundPlus,
} from "lucide-react";
import {
  checkFollow,
  checkSave,
  doFollow,
  doSave,
  doVote,
  getVote,
} from "../postDetailService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sFollow } from "../followStore";
import { LoginRequiredModal } from "../../../components/LoginRequiredModal";
export default function ContactPart({ post, refreshPost }) {
  const isFollowing = sFollow.use();
  const userID = localStorage.getItem("user_id");
  const [voteType, setVoteType] = useState(null);
  const [isSave, setIsSave] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
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
    const fetchFollow = async () => {
      try {
        const res = await checkFollow(userID, post?.userId);
        if (res.status === 200) {
          sFollow.set((pre) => (pre.value = res.data));
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
      fetchFollow();
    }
  }, []);
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
    } else setIsLoginModalOpen(true);
  };
  const handleSave = async () => {
    if (userID) {
      const save = {
        userId: userID,
        postId: post.id,
      };
      const res = await doSave(save);
      if (res?.status === 200) {
        toast.success(
          isSave ? "Bỏ lưu bài viết thành công!" : "Lưu bài viết thành công"
        );
        setIsSave(!isSave);
        console.log("done: ", res);
      }
    } else setIsLoginModalOpen(true);
  };
  const handleFollow = async () => {
    if (userID) {
      if (userID === post?.userId) {
        toast.warn("Không thể theo dõi bản thân!");
        return;
      }
      const res = await doFollow(userID, post?.userId);
      if (res?.status === 200) {
        toast.success(isFollowing ? "Đã bỏ theo dõi!" : "Đã theo dõi!");
        sFollow.set((pre) => (pre.value = !pre.value));
        console.log("done: ", res);
      }
    } else setIsLoginModalOpen(true);
  };
  return (
    <div>
      <LoginRequiredModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={() => nav("/login")}
      />{" "}
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
            src={post?.avatarUrl || "/src/app/assets/images/defaultAvatar.jpg"}
            className="w-14 h-14  object-cover rounded-full shadow-md"
          />
          <div
            className=" h-5 w-5 flex items-center justify-center bg-white rounded-full shadow-md absolute bottom-[-7px] left-1/3"
            onClick={() => handleFollow()}
          >
            {localStorage.getItem("user_id") === post?.userId ? (
              <ShieldUser className="h-3.5 w-3.5 text-sblue" strokeWidth={3} />
            ) : isFollowing ? (
              <UserRoundCheck
                className="h-3.5 w-3.5 text-pblue"
                strokeWidth={3}
              />
            ) : (
              <UserRoundPlus className="h-3.5 w-3.5" strokeWidth={3} />
            )}
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
          {/* <MessageSquare
            className="h-5 cursor-pointer hover:text-pblue"
            strokeWidth={3}
          /> */}
        </div>
      </div>
    </div>
  );
}
