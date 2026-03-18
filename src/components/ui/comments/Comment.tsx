import defaultProfilePic from "@/public/assets/jpg/avatar.jpg";
import CommentReply from "../commentReply/CommentReply";

const Comment = () => {
  return (
    <div className="border-t border-zinc-700 pt-4">
      <div className="pt-1 flex gap-2">
        <img
          src={defaultProfilePic}
          alt="profile"
          className="w-8 h-8 rounded-full border border-zinc-700"
        />
        <div className="flex flex-col gap-2 bg-[#27272A] w-full rounded-lg p-3">
          <div className="flex flex-col gap-1">
            <h4 className="text-[14px]  font-semibold">
              mike anderson
            </h4>
            <p className="text-[14px] font-medium text-[#D4D4D8]">
              Love the setup
            </p>
          </div>
          <h4 className="text-[12px] text-[#71717B]">6 days ago</h4>
        </div>
      </div>

      <div className="pl-10 pt-2">
        <CommentReply />
      </div>
    </div>
  );
};

export default Comment;
