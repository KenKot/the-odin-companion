"use client";

import useCourses from "@/app/hooks/useCourses";
import LoadingDots from "@/components/LoadingDots";
import Tile from "./Tile";
import StarredCourseTile from "./StarredCourseTile";

export default function Courses() {
  const { courses, starredFlashcardsCount, loading } = useCourses();
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
