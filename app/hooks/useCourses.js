import { useEffect, useState } from "react";

const useCourses = () => {
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

  return { courses, starredFlashcardsCount, loading };
};

export default useCourses;
