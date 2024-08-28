import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Post } from "@prisma/client";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { getAllPosts } from "../serverActions/posts";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col gap-4">
      welcome home.
      {posts && posts.length > 0 ? (
        <div className="flex flex-col gap-4">
          posts
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

const PostItem = ({ post }: { post: Post }) => {
  return (
    <>
      <Card className="bg-mainBgColor">
        <CardHeader>
          <CardDescription>
            {post.createdAt.toLocaleDateString("nb")}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {post.source === "youtube" ? (
            <iframe
              src={`https://www.youtube.com/embed/${post.url.split("=")[1]}`}
              allowFullScreen
            ></iframe>
          ) : post.source === "instagram" ? (
            <div>
              <Link href={post.url} target="_blank">
                <InstagramLogoIcon scale={2} className="w-6 h-6" />
              </Link>
            </div>
          ) : (
            <Link href={post.url} target="_blank">
              link
            </Link>
          )}

          <span>{post.description}</span>
        </CardContent>
      </Card>
    </>
  );
};
