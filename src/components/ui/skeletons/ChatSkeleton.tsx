const ChatSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="py-2 px-6 flex gap-2 items-center border-b border-zinc-800">
        <div className="w-12 h-12 rounded-full bg-zinc-700" />
        <div className="h-4 w-28 rounded bg-zinc-700" />
      </div>
    </div>
  );
};

const ChatSkeletons = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => <ChatSkeleton key={i} />)}
    </>
  );
};

export default ChatSkeletons;
