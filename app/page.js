"use client";

import { useSession } from "next-auth/react";
import Courses from "@/components/Courses";
import Welcome from "@/components/Welcome";

export default function Home() {
  const { status } = useSession();

  return status === "authenticated" ? <Courses /> : <Welcome />;
}
