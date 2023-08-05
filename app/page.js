"use client";

import UserInfo from "@/components/UserInfo";
import { useSession } from "next-auth/react";
import SigninBtn from "@/components/SigninBtn";
import Paths from "@/components/Paths";
import Link from "next/link";

export default function Home() {
  const { status, data: session } = useSession();

  if (status !== "authenticated") {
    return <SigninBtn />;
  }

  return (
    <>
      Signed in!
      <Paths />
    </>
  );
}
