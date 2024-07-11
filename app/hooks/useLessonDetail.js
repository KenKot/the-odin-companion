import { useEffect, useState } from "react";

const useLessonDetail = (lessonId) => {
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/lessons/${lessonId}`)
      .then((response) => response.json())
      .then((data) => {
        setLessonData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [lessonId]);

  return { lessonData, loading };
};

export default useLessonDetail;
