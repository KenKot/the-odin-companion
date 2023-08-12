"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UserInfo() {
  const { status, data: session } = useSession();

  if (status === "authenticated") {
    return (
      <div>
        <Image
          src={session?.user?.image}
          width={50}
          height={50}
          className="rounded-full"
          alt="User Avatar"
        />

        <span>Welcome {session?.user?.name}!</span>
        <br />
        <span>{session?.user?.email}</span>
      </div>
    );
  } else {
    return <div> used to be SigninBtn</div>;
  }
}
