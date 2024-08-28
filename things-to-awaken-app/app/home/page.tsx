import { getServerSession } from "next-auth";
import { getAllPosts } from "../serverActions/posts";
import Link from "next/link";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col gap-4">
      welcome home.
      {posts && posts.length > 0 ? (
        <div className="flex flex-col gap-4">
          here is is some posts..
          {posts.map((item, index) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 p-4 border border-blue-200 shadow-sm rounded-lg"
            >
              {item.source === "youtube" && (
                <iframe
                  src={`https://www.youtube.com/embed/${
                    item.url.split("=")[1]
                  }`}
                  allowFullScreen
                ></iframe>
              )}
              <span>{item.description}</span>
              {item.source !== "youtube" && (
                <Link href={item.url} target="_blank">
                  link
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>no posts yet..</div>
      )}
    </div>
  );
}
