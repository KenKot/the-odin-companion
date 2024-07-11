"use client";

import BackButton from "@/components/BackButton";
import useCourseDetail from "@/app/hooks/useCourseDetail";
import LoadingDots from "@/components/LoadingDots";
import Tile from "@/components/Tile";

export default function CourseDetail({ params }) {
  const { course, loading } = useCourseDetail(params.id);

  if (loading) {
    return <LoadingDots />;
  }
  if (!course) {
    return <div>Course not found</div>;
  }
  return (
    <div className="pb-10">
      <div className="flex items-center justify-center mb-4 text-5xl">
        <BackButton />
        <h1 className="ml-4 text-5xl">{course.title}</h1>
      </div>
      {course.lessons.map((lesson) => {
        return <Tile key={lesson?._id} item={lesson} type="lesson" />;
      })}
    </div>
  );
}
