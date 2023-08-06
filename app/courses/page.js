// // ASYNC F(X) ISNT FOR CLIENT COMPONENTS

// async function getCourses() {
//     const res = await fetch("http://localhost:3000/api/courses", {
//       cache: "no-cache",
//     });
//     const courses = await res.json();
//     return courses;
//   }

//   export default async function Courses() {
//     // this doesnt give me errors and doesnt have a loading functionality
//     // breaks on refresh
//     const courses = await getCourses();
//     return (
//       <div>
//         <h1>Courses</h1>
//         {/* {courses?.map((course, index) => (
//           <Link key={index} href={`/courses/${course._id}`} passHref>
//             <div className="border-2 border-black m-2 p-2 cursor-pointer">
//               <h2>{course.title}</h2>
//               <p>Total Lessons: {course.totalLessons}</p>
//               <p>Completed Flashcards: {course.completedFlashcards}</p>
//               <p>Total Flashcards: {course.totalFlashcards}</p>
//             </div>
//           </Link>
//         ))} */}
//       </div>
//     );
//   }
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
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

  return (
    <div>
      <h1>Courses</h1>
      {courses.map((course, index) => (
        <Link key={index} href={`/courses/${course._id}`} passHref>
          <div className="border-2 border-black m-2 p-2 cursor-pointer">
            <h2>{course.title}</h2>
            <p>Total Lessons: {course.totalLessons}</p>
            <p>Completed Flashcards: {course.completedFlashcards}</p>
            <p>Total Flashcards: {course.totalFlashcards}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
