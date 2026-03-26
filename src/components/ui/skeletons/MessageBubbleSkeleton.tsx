import ChatLayout from "@/src/components/ui/layout/ChatLayout";
import ChatSidebar from "@/src/components/ui/sidebar/ChatSidebar";

const MessageBubbleSkeleton = ({ isMyMessage }: { isMyMessage?: boolean }) => {
  return (
    <div
      className={`flex items-end gap-2 p-4 mb-4 ${
        isMyMessage ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div className="w-8 h-8 rounded-full bg-zinc-700 animate-pulse shrink-0" />

      <div
        className={`flex flex-col gap-2 max-w-[70%] ${
          isMyMessage ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-4 py-3 rounded-2xl ${
            isMyMessage
              ? "bg-blue-500/40 rounded-br-sm"
              : "bg-zinc-700 rounded-bl-sm"
          }`}
        >
          <div className="w-40 h-3 bg-zinc-500/50 rounded animate-pulse mb-2" />
          <div className="w-24 h-3 bg-zinc-500/50 rounded animate-pulse" />
        </div>

        <div className="w-10 h-2 bg-zinc-600 rounded animate-pulse" />
      </div>
    </div>
  );
};

const MessageBubblesSkeleton = () => {
  return (
    <ChatLayout>
      <div className="flex h-full">
        <div className="hidden md:block">
          <ChatSidebar />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            {Array.from({ length: 8 }).map((_, i) => (
              <MessageBubbleSkeleton
                key={i}
                isMyMessage={i % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </ChatLayout>
  );
};

export default MessageBubblesSkeleton;
