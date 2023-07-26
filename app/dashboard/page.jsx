"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  //   const { user } = useSelector((state) => state.user); // select user from state
  const { data: session } = useSession();
  const user = session?.user;
  console.log(user);
  return (
    <div>
      <h1>Dashboard</h1>
      {/* {user} */}
      {/* {user.courses.map((course) => (
        <div key={course._id}>
          <button onClick={() => router.push(`/courses/${course._id}`)}>
            {course.title}
          </button>
        </div>
      ))} */}
    </div>
  );
};

export default Dashboard;
