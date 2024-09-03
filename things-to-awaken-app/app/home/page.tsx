import PostItem from "../components/client/PostItem";
import { getAllPosts } from "../serverActions/posts";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col gap-4">
      {posts && posts.length > 0 ? (
        <div className="flex flex-col gap-4 items-center">
          {posts.map((item, index) => (
            <PostItem key={item.id} post={item} />
          ))}
        </div>
      ) : (
        <div>no posts yet..</div>
      )}
    </div>
  );
}
