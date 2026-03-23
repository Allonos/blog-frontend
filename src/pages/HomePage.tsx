import Layout from "@/src/components/ui/layout/Layout";
import Search from "@/src/components/ui/search/Search";
import HomePagePosts from "@/src/components/ui/posts/HomePagePosts";
import { useGetAllPostsServiceQuery } from "../services/react-query/home/query/useGetAllPostsServiceQuery";
import { useEffect, useRef } from "react";

const HomePage = () => {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllPostsServiceQuery();

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

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

  return (
    <Layout>
      <div className="flex justify-between gap-6">
        <div className="py-8 min-h-screen flex-1 min-w-0">
          <h2 className="text-[30px] font-bold">Latest Posts</h2>
          <HomePagePosts posts={posts} isLoading={isLoading} />
          {/* Invisible sentinel div — triggers next page fetch when visible */}
          <div ref={sentinelRef} className="h-1" />
          {isFetchingNextPage && (
            <p className="text-center text-sm text-muted-foreground py-4">
              Loading more posts...
            </p>
          )}
          {!hasNextPage && !isLoading && (
            <p className="text-center text-sm text-muted-foreground py-4">
              No more posts to load.
            </p>
          )}
        </div>
        <div className="shrink-0 hidden lg:block">
          <Search />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
