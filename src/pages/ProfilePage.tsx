import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetUserPostsServiceQuery } from "@/src/services/react-query/usersPosts/query/useGetUserPostsServiceQuery";
import UserCard from "@/src/components/ui/cards/UserCard";
import HomePagePosts from "../components/ui/posts/HomePagePosts";
import ProfileLayout from "../components/ui/layout/ProfileLayout";
import ProfilePageSkeleton from "../components/ui/skeletons/ProfilePageSkeleton";

const ProfilePage = () => {
  const { userId } = useParams();
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetUserPostsServiceQuery(userId as string);

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];
  const userMeta = data?.pages[0];

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <ProfileLayout>
        <ProfilePageSkeleton />
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout>
      <section className="mt-8">
        <UserCard
          userId={userId as string}
          profilePic={userMeta?.profilePic || ""}
          username={userMeta?.username || ""}
          email={userMeta?.email || ""}
          bio={userMeta?.bio || ""}
        />

        <div className="mt-15 pb-20">
          <h2 className="font-bold text-[24px]">Posts</h2>
          {posts.length > 0 && (
            <HomePagePosts posts={posts} isLoading={isLoading} />
          )}
          {posts.length === 0 && (
            <h3 className="text-[18px] text-[#71717B]">User has no posts</h3>
          )}
          <div ref={sentinelRef} className="h-1" />
          {isFetchingNextPage && (
            <p className="text-center text-sm text-muted-foreground py-4">
              Loading more posts...
            </p>
          )}
        </div>
      </section>
    </ProfileLayout>
  );
};

export default ProfilePage;
