"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

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
      <h1 className="text-3xl text-center mb-4">{course.title}</h1>
      {course.lessons.map((lesson, index) => (
        <Link key={index} href={`/lessons/${lesson._id}`} passHref>
          <div className="border-2 border-white m-2 p-2 cursor-pointer rounded">
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
