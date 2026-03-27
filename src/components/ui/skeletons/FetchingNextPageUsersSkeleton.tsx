const FetchingNextPageUsersSkeleton = () => {
  return (
    <div className="flex items-center gap-3 p-2 rounded-md bg-zinc-800 animate-pulse">
      <div className="w-9 h-9 rounded-full bg-zinc-700" />
      <div className="flex-1 space-y-2 py-1">
        <div className="h-4 bg-zinc-700 rounded w-3/4" />
        <div className="h-4 bg-zinc-700 rounded w-1/2" />
      </div>
    </div>
  );
};

export default FetchingNextPageUsersSkeleton;
