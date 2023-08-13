import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user } = useUser();
  console.log(user);
  return (
    <div>
      <h1>TextFlow AI: Homepage</h1>
      <div>
        {!!user ? (
          <>
            <div>Show all the user info</div>
            <Link href="/api/auth/logout">logout</Link>
          </>
        ) : (
          <Link href="/api/auth/login">login</Link>
        )}
      </div>
    </div>
  );
}
