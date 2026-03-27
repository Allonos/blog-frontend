const SearchUsersSkeleton = () => {
  return (
    <div className="pt-4 space-y-3 max-h-80 overflow-y-auto pr-1 no-scrollbar">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-2 rounded-md bg-zinc-800 animate-pulse"
        >
          <div className="w-9 h-9 rounded-full bg-zinc-700" />
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-zinc-700 rounded w-3/4" />
            <div className="h-4 bg-zinc-700 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchUsersSkeleton;
