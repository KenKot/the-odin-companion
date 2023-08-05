"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PathDetail({ params }) {
  const [path, setPath] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/paths/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setPath(data);
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

  if (!path) {
    return <div>Path not found</div>;
  }

  return (
    <div>
      <h1>{path.title}</h1>
      {path.courses.map((course, index) => (
        <Link key={index} href={`/courses/${course._id}`} passHref>
          <div className="border-2 border-black m-2 p-2 cursor-pointer">
            <h2>{course.title}</h2>
            <p>
              Mastered Flashcards: {course.masteredFlashcards} /{" "}
              {course.totalFlashcards}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
