"use client";

import Link from "next/link";
import BackButton from "@/components/BackButton";
import { useEffect, useState } from "react";
import LoadingDots from "@/components/LoadingDots";
import RadialProgressBar from "@/components/RadialProgressBar";

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
  }, [params.id]);

  if (loading) {
    return <LoadingDots />;
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="pb-10">
      <div className="flex items-center justify-center mb-4">
        <BackButton />
        <h1 className="ml-4 text-5xl">{course.title}</h1>
      </div>

      {course.lessons.map((lesson, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-2 m-2 mx-auto border-2 border-white rounded cursor-pointer card md:w-3/4 lg:w-1/2"
        >
          <Link href={`/lessons/${lesson._id}`} passHref>
            <div className="cursor-pointer">
              <h2 className="text-3xl">{lesson.title}</h2>
              <p>
                Flashcards: {lesson.masteredFlashcards} /{" "}
                {lesson.flashcards.length}{" "}
              </p>
            </div>
          </Link>

          <div>
            <RadialProgressBar
              completed={lesson.masteredFlashcards}
              total={lesson.flashcards.length}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
