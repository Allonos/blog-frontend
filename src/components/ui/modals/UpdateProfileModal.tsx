import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { useUpdateProfileServiceMutation } from "@/src/services/react-query/updateProfile/mutation/useUpdateProfileServiceMutation";
import { useAuthStore } from "@/src/store/useAuthStore";

interface IProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  setIsModalOpen: (open: boolean) => void;
  username: string;
  bio: string;
  profilePic: string;
}

const UpdateProfileModal = ({
  isVisible,
  setIsVisible,
  setIsModalOpen,
  username,
  bio,
  profilePic,
}: IProps) => {
  const [formData, setFormData] = useState({ username, bio });
  const [selectedImg, setSelectedImg] = useState<string>(
    profilePic,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { authUser } = useAuthStore();
  const { mutate: updateProfile, isPending } =
    useUpdateProfileServiceMutation();

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => setIsModalOpen(false), 200);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      setSelectedImg(base64Image);
    };
  };

  const handleSave = () => {
    if (!authUser) return;
    updateProfile(
      {
        id: authUser._id,
        data: {
          username: formData.username,
          bio: formData.bio,
          profilePic: selectedImg,
        },
      },
      { onSuccess: closeModal },
    );
  };

  return (
    <div
      className={`fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={closeModal}
    >
      <div
        className={`bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md flex flex-col gap-5 transition-all duration-200 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-bold">Update Profile</h2>
          <X
            width={20}
            height={20}
            className="cursor-pointer text-zinc-400 hover:text-white transition-colors"
            onClick={closeModal}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-zinc-400">Profile Picture</label>
          <div
            className="relative w-20 h-20 cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <img
              src={selectedImg}
              className="w-20 h-20 rounded-full object-cover border-2 border-zinc-700"
            />
            <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Upload width={18} height={18} className="text-white" />
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-zinc-400">Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                username: e.target.value,
              }))}
            className="bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-zinc-400">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, bio: e.target.value }))}
            rows={3}
            className="bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-zinc-500 resize-none"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isPending}
            className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-zinc-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
