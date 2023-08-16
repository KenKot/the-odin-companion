"use client";
import { useEffect, useState } from "react";
import FlashcardViewer from "@/components/FlashcardViewer";
import LoadingDots from "@/components/LoadingDots";

export default function LessonDetail({ params }) {
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/lessons/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setLessonData(data);
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

  if (!lessonData) {
    return <div>Lesson not found</div>;
  }

  return (
    <FlashcardViewer
      lessonTitle={lessonData.title}
      shuffledflashcards={lessonData.flashcards}
    />
  );
}
