"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

function CourseDetail() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathName = usePathname();
  let arr = pathName.split("/");
  let id = arr[arr.length - 1];

  useEffect(() => {
    if (!id) {
      return; // id isn't available yet, exit early
    }

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
  }, [id]); // re-run the effect when the `id` changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div>
      <h1>{course.title}</h1>
      {/* Render additional details about the course here */}
    </div>
  );
}

export default CourseDetail;
