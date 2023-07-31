import UserInfo from "@/components/UserInfo";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <UserInfo />
      <hr />
      <Link href="/courses">Courses</Link>
    </>
  );
}
