"use client";
import Link from "next/link";
import { CreatePost } from "@/app/_components/create-post";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: hello } = api.post.hello.useQuery({ text: "from TRPC" });
  const { data: session } = useSession();

  async function fetchTest() {
    const res = await fetch("/api/test");
    const data = await res.json();
    console.log("test data", data);
  }

  return (
    <main className="container">
      <h1 className="my-10 text-center text-3xl font-bold tracking-tighter">
        NextJS + NextAuth + DrizzleORM + PlanetScale + shadcn-ui
      </h1>
      <p className="text-center text-2xl">
        {hello ? hello.greeting : "Loading tRPC query..."}
      </p>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <p className="text-center">
          {session && <span>Logged in as {session.user?.name}</span>}
        </p>
        <Button asChild variant="link">
          <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
            {session ? "Sign out" : "Sign in"}
          </Link>
        </Button>

        <Button onClick={fetchTest}>fetch test</Button>
      </div>

      <CrudShowcase />
    </main>
  );
}

function CrudShowcase() {
  const { data: session } = useSession();
  const { data: posts } = api.post.getPosts.useQuery();
  if (!session?.user) return null;

  return (
    <div className="w-full max-w-xs">
      {posts?.length ? (
        <ul className="space-y-4 p-4">
          {posts.map((post) => (
            <li key={post.id}> - {post.name}</li>
          ))}
        </ul>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
