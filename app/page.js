"use client";

import { useSession } from "next-auth/react";
import Courses from "@/components/Courses";
import Welcome from "@/components/Welcome";

export default function Home() {
  const { status } = useSession();

  return status === "authenticated" ? <Courses /> : <Welcome />;
}

// SERVER COMPONENT VERSION BELOW

// import Courses from "@/components/Courses";
// import Welcome from "@/components/Welcome";

// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../app/api/auth/[...nextauth]/route";

// export default async function Home() {
//   const session = await getServerSession(authOptions);

//   return <>{session ? <Courses /> : <Welcome />}</>;

// }
