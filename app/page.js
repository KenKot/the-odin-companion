import Courses from "@/components/Courses";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return <>{session && <Courses session={session} />}</>;
}
