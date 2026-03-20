import { useParams } from "react-router-dom";
import { useGetUserPostsServiceQuery } from "@/src/services/react-query/usersPosts/query/useGetUserPostsServiceQuery";

import UserCard from "@/src/components/ui/cards/UserCard";
import HomePagePosts from "../components/ui/posts/HomePagePosts";
import ProfileLayout from "../components/ui/layout/ProfileLayout";

const ProfilePage = () => {
  const { userId } = useParams();

  const { data: userPosts, isLoading } = useGetUserPostsServiceQuery(
    userId as string,
  );

  return (
    <ProfileLayout>
      <section className="mt-8">
        <UserCard
          profilePic={userPosts?.profilePic || ""}
          username={userPosts?.username || ""}
          email={userPosts?.email || ""}
          bio={userPosts?.bio || ""}
        />

        <div className="mt-15 pb-20">
          <h2 className="font-bold text-[24px]">Posts</h2>
          {userPosts && userPosts.posts.length > 0 && (
            <HomePagePosts posts={userPosts.posts} isLoading={isLoading} />
          )}
          {userPosts && userPosts.posts.length === 0 && (
            <h3 className="text-[18px] text-[#71717B]">User has no posts</h3>
          )}
        </div>
      </section>
    </ProfileLayout>
  );
};

export default ProfilePage;
