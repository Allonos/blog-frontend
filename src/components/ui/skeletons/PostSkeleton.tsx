const PostSkeleton = () => (
  <div className="bg-zinc-900 p-6 rounded-lg w-full mt-4 animate-pulse">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-zinc-700 shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-3 w-28 rounded bg-zinc-700" />
        <div className="h-3 w-20 rounded bg-zinc-700" />
      </div>
    </div>
    <div className="h-4 w-3/4 rounded bg-zinc-700 mb-2" />
    <div className="h-4 w-1/2 rounded bg-zinc-700 mb-4" />
    <div className="h-48 w-full rounded-lg bg-zinc-700 mb-4" />
    <div className="flex gap-4">
      <div className="h-4 w-12 rounded bg-zinc-700" />
      <div className="h-4 w-16 rounded bg-zinc-700" />
    </div>
  </div>
);

const PostSkeletons = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => <PostSkeleton key={i} />)}
    </>
  );
};

export default PostSkeletons;
