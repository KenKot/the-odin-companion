"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

function CourseDetail() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathName = usePathname();
  let arr = pathName.split("/");
  let id = arr[arr.length - 1];

  useEffect(() => {
    fetch(`/api/courses/${id}`)
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
      <h1>{course.title}</h1>
      {course.lessons.map((lesson, index) => (
        <Link
          key={index}
          href={`/lessons/${lesson.title.replace(/\s+/g, "-")}`}
          passHref
        >
          <div className="border-2 border-black m-2 p-2 cursor-pointer">
            <h2>{lesson.title}</h2>
            <p>
              Mastered Flashcards: {lesson.masteredFlashcards} /{" "}
              {lesson.flashcards.length}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CourseDetail;
