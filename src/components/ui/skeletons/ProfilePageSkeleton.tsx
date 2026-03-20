import PostSkeletons from "./PostSkeleton";

const ProfilePageSkeleton = () => (
  <section className="mt-8 animate-pulse">
    <div className="bg-zinc-900 rounded-xl px-8 pt-8 pb-6 flex gap-8">
      <div className="w-37.5 h-37.5 rounded-full bg-zinc-700 shrink-0" />
      <div className="flex flex-col gap-6 flex-1">
        <div className="flex gap-5 items-center">
          <div className="h-8 w-40 rounded bg-zinc-700" />
          <div className="h-8 w-32 rounded-lg bg-zinc-700" />
        </div>
        <div className="h-4 w-48 rounded bg-zinc-700" />
        <div className="h-4 w-64 rounded bg-zinc-700" />
      </div>
    </div>

    <div className="mt-15 pb-20">
      <div className="h-6 w-16 rounded bg-zinc-700 mb-1" />
      <PostSkeletons />
    </div>
  </section>
);

export default ProfilePageSkeleton;
