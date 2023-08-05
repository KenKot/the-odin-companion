import UserInfo from "@/components/UserInfo";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <UserInfo />
      <hr />
      <br />
      {/* <Link href="/courses" className="border-2 border-red-500"> */}
      <Link href="/courses">
        <button
          className="
    bg-blue-500 
    hover:bg-blue-700 
    text-white 
    font-bold 
    py-2 
    px-4 
    rounded
  "
        >
          Courses
        </button>
      </Link>
    </>
  );
}
