import Layout from "@/src/components/ui/layout/Layout";
import Search from "@/src/components/ui/search/Search";
import HomePagePosts from "@/src/components/ui/posts/HomePagePosts";
import { useGetAllPostsServiceQuery } from "../services/react-query/home/query/useGetAllPostsServiceQuery";

const HomePage = () => {
  const { data: postsData, isLoading } = useGetAllPostsServiceQuery();
  const posts = Array.isArray(postsData) ? postsData : (postsData?.posts ?? []);

  return (
    <Layout>
      <div className="flex justify-between gap-6">
        {/* HERE SHOULD BE AN INPUT AND SEARCH ICON */}
        <div className="py-8 min-h-screen flex-1 min-w-0">
          <h2 className="text-[30px] font-bold">Latest Posts</h2>
          <HomePagePosts posts={posts} isLoading={isLoading} />
        </div>
        <div className="shrink-0 hidden lg:block">
          <Search />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
