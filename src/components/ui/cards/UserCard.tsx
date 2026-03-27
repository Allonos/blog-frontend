import { useEffect, useState } from "react";
import { Settings } from "lucide-react";
import defaultAvatar from "@/src/assets/jpg/avatar.jpg";
import UpdateProfileModal from "../modals/UpdateProfileModal";
import { useAuthStore } from "@/src/store/useAuthStore";
import { useNavigate } from "react-router-dom";

interface IProps {
  userId: string;
  profilePic: string;
  username: string;
  email: string;
  bio: string;
}

const UserCard = ({ profilePic, username, email, bio, userId }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { authUser } = useAuthStore();

  const openModal = () => {
    setIsModalOpen(true);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setIsVisible(true))
    );
  };

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const navigate = useNavigate();

  const handleClick = () => {
    if (authUser?._id === userId) {
      openModal();
    } else {
      navigate(`/messages/${userId}`);
    }
  };

  return (
    <>
      <div className="bg-zinc-900 rounded-xl px-8 pt-8 pb-6 flex flex-col sm:flex-row items-center sm:items-start gap-8">
        <img
          src={profilePic || defaultAvatar}
          className="w-37.5 h-37.5 rounded-full object-cover border-4 border-zinc-700"
        />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-5 items-center">
            <h2 className="text-[30px] font-bold">{username}</h2>
            <div
              onClick={handleClick}
              className="flex items-center justify-between gap-3 bg-black border border-zinc-800 py-1 px-2 rounded-lg cursor-pointer hover:bg-[#151515] transition-colors duration-200"
            >
              <Settings width={16} height={16} />
              <h4>{authUser?._id === userId ? "Update Profile" : "Message"}</h4>
            </div>
          </div>

          <h4 className="text-[16px] text-[#9F9FA9] text-center sm:text-start">
            {email}
          </h4>

          <h4 className="text-[16px] text-[#D4D4D8] text-center sm:text-start">
            {bio || "User does not have anything in bio"}
          </h4>
        </div>
      </div>

      {isModalOpen && (
        <UpdateProfileModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          setIsModalOpen={setIsModalOpen}
          username={username}
          bio={bio}
          profilePic={profilePic}
        />
      )}
    </>
  );
};

export default UserCard;
