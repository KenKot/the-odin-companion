"use client";

import { useEffect, useState } from "react";
import LoadingDots from "@/components/LoadingDots";
import Tile from "./Tile";
import StarredCourseTile from "./StarredCourseTile";

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
      <StarredCourseTile starredFlashcardsCount={starredFlashcardsCount} />

      {courses?.map((course, index) => (
        <Tile key={index} item={course} type="course" />
      ))}
    </div>
  );
}
