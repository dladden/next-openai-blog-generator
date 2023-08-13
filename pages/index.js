import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

export default function Home() {
  const { user } = useUser();
  console.log(user);
  return (
    <div>
      <h1>TextFlow AI: Homepage</h1>
      <div>
        {!!user ? (
          <>
            <div>
              <Image
                src={user.picture}
                alt={user.name}
                height={50}
                width={50}
              />
              <div>{user.email}</div>
            </div>
            <Link href="/api/auth/logout">logout</Link>
          </>
        ) : (
          <Link href="/api/auth/login">login</Link>
        )}
      </div>
    </div>
  );
}