import { connectMongoDB } from "@/lib/mongodb";
import Course from "@/models/course";
import User from "@/models/user";
import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import Link from "next/link";
import getLessons from "@/app/utils/getLessons";

export default function CourseDetail({ params }) {
  // const course = await getLessons(params.id);
  // console.log("params is", params);

  return (
    <div>
      word
      {/* <h1 className="mb-4 text-3xl text-center">{course.title}</h1> */}
      {/* {course.lessons.map((lesson, index) => (
        <Link key={index} href={`/lessons/${lesson._id}`} passHref>
          <div className="p-2 m-2 border-2 border-white rounded cursor-pointer">
            <h2 className="text-3xl">{lesson.title}</h2>
            <p>
              Flashcards: {lesson.masteredFlashcards} /{" "}
              {lesson.flashcards.length}{" "}
            </p>
          </div>
        </Link>
      ))} */}
    </div>
  );
}

// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function CourseDetail({ params }) {
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`/api/courses/${params.id}`)
//       .then((response) => {
//         console.log("API Response Status:", response.status);
//         return response.json();
//       })
//       .then((data) => {
//         console.log("API Data:", data);
//         setCourse(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Fetch error:", error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!course) {
//     return <div>Course not found</div>;
//   }

//   return (
//     <div>
//       <h1 className="mb-4 text-3xl text-center">{course.title}</h1>
//       {course.lessons.map((lesson, index) => (
//         <Link key={index} href={`/lessons/${lesson._id}`} passHref>
//           <div className="p-2 m-2 border-2 border-white rounded cursor-pointer">
//             <h2 className="text-3xl">{lesson.title}</h2>
//             <p>
//               Flashcards: {lesson.masteredFlashcards} /{" "}
//               {lesson.flashcards.length}{" "}
//             </p>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }
