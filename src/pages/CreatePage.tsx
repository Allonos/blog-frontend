import ProfileLayout from "@/src/components/ui/layout/ProfileLayout";
import { Image, Loader2, Send, X } from "lucide-react";
import { useRef, useState } from "react";
import { useCreatePostServiceMutation } from "@/src/services/react-query/createPost/mutation/useCreatePostServiceMutation";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreatePage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { authUser } = useAuthStore();

  const navigate = useNavigate();

  const { mutate: createPost, isPending } = useCreatePostServiceMutation();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const createPostHandler = () => {
    if (!description.trim()) return;

    createPost(
      {
        id: authUser?._id || "",
        description,
        image: selectedFile ?? undefined,
      },
      {
        onSuccess: () => {
          setDescription("");
          setSelectedFile(null);
          if (previewUrl) URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
          toast.success("Post created successfully!");
          navigate("/");
        },
      },
    );
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const isDisabled = !description.trim() || isPending;

  return (
    <ProfileLayout>
      <section className="mt-10 bg-zinc-900 p-6 rounded-xl">
        <h2 className="text-[24px] font-semibold">Create a New Post</h2>

        <div className="mt-8">
          <p className="text-[14px] text-[#D4D4D8]">What's on your mind?</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isPending}
            className="w-full h-40 mt-4 p-3 bg-zinc-800 rounded-md text-white text-[14px] border-2 border-zinc-700 focus:border-zinc-500 focus:outline-none resize-none transition-colors disabled:opacity-50"
            placeholder="Share your thoughts..."
          />
        </div>

        <div className="mt-8">
          <p className="text-[14px] text-[#D4D4D8]">Add an image (optional)</p>
          <div className="relative mt-4">
            <div
              className={`w-full ${
                previewUrl ? "max-h-100" : "h-40"
              } bg-zinc-800 rounded-md border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-zinc-500 hover:bg-zinc-700/50 transition-colors overflow-hidden ${
                isPending ? "pointer-events-none opacity-50" : ""
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl
                ? (
                  <img
                    src={previewUrl}
                    alt="Selected"
                    className="w-full h-full object-cover"
                  />
                )
                : (
                  <>
                    <Image className="text-zinc-400" width={28} height={28} />
                    <p className="text-[13px] text-zinc-400">
                      Click to upload an image
                    </p>
                  </>
                )}
            </div>

            {previewUrl && !isPending && (
              <button
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 rounded-full p-2 cursor-pointer transition-colors"
                onClick={handleRemoveImage}
              >
                <X width={14} height={14} className="text-white" />
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        <button
          onClick={createPostHandler}
          disabled={isDisabled}
          className="mt-6 w-full cursor-pointer flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white text-[14px] font-medium transition-colors"
        >
          {isPending
            ? (
              <>
                <Loader2 width={16} height={16} className="animate-spin" />
                Posting...
              </>
            )
            : (
              <>
                <Send width={16} height={16} />
                Post
              </>
            )}
        </button>
      </section>
    </ProfileLayout>
  );
};

export default CreatePage;
