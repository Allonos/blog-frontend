import { useSendMessageServiceMutation } from "@/src/services/react-query/chat/mutation/useSendMessageServiceMutation";
import { ImagePlus, Send, X } from "lucide-react";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { userId } = useParams();

  const { mutate: sendMessage, isPending } = useSendMessageServiceMutation();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedImg(reader.result as string);
    };
  };

  const handleRemoveImage = () => {
    setSelectedImg(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleMessageSend = () => {
    if (!message.trim() && !selectedImg) return;

    sendMessage(
      {
        id: userId || "",
        text: message,
        image: selectedImg ?? "",
      },
      {
        onSuccess: () => {
          setMessage("");
          setSelectedImg(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
        },
      },
    );
  };

  return (
    <div className="bg-zinc-900 border-t border-zinc-800 px-4 py-3">
      {selectedImg && (
        <div className="relative mb-2 w-20">
          <img
            src={selectedImg}
            alt="preview"
            className="w-20 h-20 rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-1 -right-1 bg-red-600 hover:bg-red-500 rounded-full p-0.5 transition-colors"
          >
            <X size={12} className="text-white" />
          </button>
        </div>
      )}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isPending}
          className="p-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors disabled:opacity-40"
        >
          <ImagePlus size={20} />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageUpload}
        />
        <input
          type="text"
          value={message}
          disabled={isPending}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleMessageSend()}
          placeholder="Type a message..."
          className="flex-1 bg-zinc-800 text-zinc-100 placeholder-zinc-500 rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-zinc-600 disabled:opacity-50"
        />
        <button
          type="button"
          onClick={handleMessageSend}
          disabled={(!message.trim() && !selectedImg) || isPending}
          className="p-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
