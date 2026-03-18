import Layout from "@/src/components/ui/layout/Layout";
import Search from "@/src/components/ui/search/Search";
import HomePagePosts from "@/src/components/ui/posts/HomePagePosts";

const HomePage = () => {
  return (
    <Layout>
      <div className="flex justify-between gap-6">
        <div className="py-8 h-screen flex-1 min-w-0">
          <h2 className="text-[30px] font-bold">Latest Posts</h2>
          <HomePagePosts />
        </div>
        <div className="shrink-0">
          <Search />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
