import { Post } from "@prisma/client";
import PostItem from "../components/client/PostItem";
import { getAllPosts } from "../serverActions/posts";
import { format } from "date-fns";

export type GroupedPosts = {
  [key: string]: Post[];
};

export default async function HomePage() {
  const posts = (await getAllPosts()) || [];

  const groupedPosts = posts.reduce((acc: GroupedPosts, post) => {
    const monthYear = format(post.createdAt, "MMMM yyyy");
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(post);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-4">
      {posts && posts.length > 0 ? (
        <div className="flex flex-col gap-4 items-center">
          {Object.entries(groupedPosts).map(([monthYear, posts]) => (
            <div key={monthYear} className="mb-8 flex flex-col gap-4">
              <div className="sticky top-20 bg-mainBgColor z-10 py-2 px-4 shadow-sm rounded-xl backdrop-blur-md bg-mainBgColor/30">
                <h2 className="text-xl font-semibold mb-2">{monthYear}</h2>
              </div>
              {posts.map((item, index) => (
                <PostItem key={item.id} post={item} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div>no posts yet..</div>
      )}
    </div>
  );
}
