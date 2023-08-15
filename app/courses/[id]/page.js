"use client";

import Link from "next/link";
import BackButton from "@/components/BackButton";
import { useEffect, useState } from "react";

export default function CourseDetail({ params }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/courses/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!course) {
    return <div>Course not found</div>;
  }
  return (
    <div>
      <div className="flex items-center justify-center mb-4 text-5xl">
        <BackButton />
        <h1 className="ml-4">{course.title}</h1>
      </div>
      {course.lessons.map((lesson, index) => (
        <Link key={index} href={`/lessons/${lesson._id}`} passHref>
          <div className="p-2 m-2 border-2 border-white rounded cursor-pointer">
            <h2 className="text-3xl">{lesson.title}</h2>
            <p>
              Flashcards: {lesson.masteredFlashcards} /{" "}
              {lesson.flashcards.length}{" "}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

// import Link from "next/link";
// import { getLessons } from "@/app/utils/getLessons";
// import BackButton from "@/components/BackButton";

// export default async function CourseDetail({ params }) {
//   const course = await getLessons(params.id);

//   return (
//     <div>
//       <div className="flex items-center justify-center mb-4 text-5xl">
//         <BackButton />
//         <h1 className="ml-4">{course.title}</h1>
//       </div>
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
