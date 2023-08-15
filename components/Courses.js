"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [starredFlashcardsCount, setStarredFlashcardsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.coursesInfo);
        setStarredFlashcardsCount(data.starredFlashcardsCount);
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
      {/* <div className="rounded w-full border-2 border-white m-4 p-4 cursor-pointer flex flex-col items-center mx-auto h-[300px] md:w-3/4 lg:w-1/2"> */}
      <h1 className="mb-4 text-5xl text-center ">Courses</h1>

      <div className="p-2 m-2 border-2 border-white rounded cursor-pointer mx-auto  md:w-3/4 lg:w-1/2">
        <Link href="/starred" passHref>
          <h2 className="text-3xl">Favorited</h2>

          <p>Flashcards: {starredFlashcardsCount}</p>
        </Link>
      </div>

      {courses?.map((course, index) => (
        <Link key={index} href={`/courses/${course._id}`} passHref>
          <div className="p-2 m-2 border-2 border-white rounded cursor-pointer mx-auto  md:w-3/4 lg:w-1/2">
            {/* <div className="p-2 m-2 border-2 border-white rounded cursor-pointer "> */}
            <h2 className="text-3xl">{course.title}</h2>

            <p>
              Lessons: {course.completedLessons}/{course.totalLessons}
            </p>
            <p>
              Flashcards: {course.completedFlashcards}/{course.totalFlashcards}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
