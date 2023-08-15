"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [starredFlashcardsCount, setStarredFlashcardsCount] = useState([]);
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
      <h1 className="mb-4 text-5xl text-center ">Courses</h1>

      <div className="p-2 m-2 border-2 border-white rounded cursor-pointer ">
        <Link href="/starred" passHref>
          <h2 className="text-3xl">Favorited</h2>

          <p>Flashcards: {starredFlashcardsCount}</p>
        </Link>
      </div>

      {courses?.map((course, index) => (
        <Link key={index} href={`/courses/${course._id}`} passHref>
          <div className="p-2 m-2 border-2 border-white rounded cursor-pointer ">
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
