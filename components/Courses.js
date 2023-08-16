"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingDots from "@/components/LoadingDots";
import RadialProgressBar from "./RadialProgressBar";

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
    return <LoadingDots />;
  }

  return (
    <div className="pb-10">
      <h1 className="mb-4 text-5xl text-center ">Courses</h1>

      <div className="p-2 m-2 mx-auto border-2 border-white rounded cursor-pointer card md:w-3/4 lg:w-1/2">
        <Link href="/starred" passHref>
          <h2 className="text-3xl">Favorited</h2>

          <p>Flashcards: {starredFlashcardsCount}</p>
        </Link>
      </div>

      {courses?.map((course, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-2 m-2 mx-auto border-2 border-white rounded cursor-pointer card md:w-3/4 lg:w-1/2"
        >
          <Link href={`/courses/${course._id}`} passHref>
            <div className="cursor-pointer">
              <h2 className="text-3xl">{course.title}</h2>
              <p>
                Lessons: {course.completedLessons}/{course.totalLessons}
              </p>
              <p>
                Flashcards: {course.completedFlashcards}/
                {course.totalFlashcards}
              </p>
            </div>
          </Link>

          <div>
            <RadialProgressBar
              completed={course.completedFlashcards}
              total={course.totalFlashcards}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
