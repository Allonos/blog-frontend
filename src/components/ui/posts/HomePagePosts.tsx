import { useGetAllPostsServiceQuery } from "@/src/services/react-query/home/query/useGetAllPostsServiceQuery";
import PostHeader from "@/src/components/ui/headers/PostHeader";
import PostContent from "@/src/components/ui/posts/components/PostContent";
import type { postTypes } from "@/src/services/types/postTypes";

const HomePagePosts = () => {
  const { data: postsData, isLoading } = useGetAllPostsServiceQuery();
  const posts = Array.isArray(postsData) ? postsData : (postsData?.posts ?? []);

  return (
    <div>
      <div>
        {!isLoading && posts.map((post: postTypes) => (
          <div
            key={post._id}
            className="bg-zinc-900 p-6 rounded-lg w-full mt-4"
          >
            <PostHeader
              profilePic={post.author.profilePic}
              username={post.author.username}
              createdAt={post.createdAt}
            />

            <PostContent
              description={post.description}
              postId={post._id}
              likes={post.likes}
              comments={Array.isArray(post.comments) ? post.comments : []}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePagePosts;
