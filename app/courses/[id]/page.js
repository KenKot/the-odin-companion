"use client";

import BackButton from "@/components/BackButton";
import { useEffect, useState } from "react";
import LoadingDots from "@/components/LoadingDots";
import Tile from "@/components/Tile";

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
      <div className="flex items-center justify-center mb-4 text-5xl">
        <h1 className="ml-4 text-5xl">{course.title}</h1>
        <BackButton />

      </div>
      {course.lessons.map((lesson, index) => (
        <Tile key={index} item={lesson} type="lesson" />
      ))}
    </div>
  );
}
