"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Post } from "@prisma/client";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export interface Comment {
  id: number;
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
}

export default function PostItem({ post }: { post: Post }) {
  const session = useSession();
  const [comment, setComment] = useState("");

  const [comments, setComments] = useState<Comment[]>([
    // {
    //   id: 1,
    //   user: "John Doe",
    //   avatar: "/placeholder.svg?height=32&width=32",
    //   content: "Great post! Thanks for sharing.",
    //   timestamp: "2 hours ago",
    // },
    // {
    //   id: 2,
    //   user: "Jane Smith",
    //   avatar: "/placeholder.svg?height=32&width=32",
    //   content:
    //     "I found this very helpful. Looking forward to more content like this!",
    //   timestamp: "1 hour ago",
    // },
  ]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = () => {
    if (comment.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        user: session.data?.user.name || "",
        avatar: session.data?.user.image || "",
        content: comment,
        timestamp: "Just now",
      };
      setComments([...comments, newComment]);
      setComment("");
    }
  };

  return (
    <>
      <Card className="bg-[#f3f3f3] hover:bg-[#f7f7f7] md:max-w-[450px] w-full ">
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
          <CardFooter className="flex flex-col space-y-4 px-2 py-0 ">
            <div className="w-full space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="flex space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={c.avatar} alt={c.user} />
                    <AvatarFallback>{c.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted p-2 rounded-lg">
                      <p className="font-semibold text-sm">{c.user}</p>
                      <p className="text-sm">{c.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {c.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2 w-full">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={session.data?.user.image || ""}
                  alt={session.data?.user.name || ""}
                />
                <AvatarFallback>{session.data?.user.name || ""}</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex items-center bg-gray-200 rounded-full">
                <input
                  type="text"
                  placeholder="write a reflection..."
                  value={comment}
                  onChange={handleCommentChange}
                  className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleSubmitComment}
                  className="rounded-full"
                  disabled={!comment.trim()}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send comment</span>
                </Button>
              </div>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </>
  );
}
