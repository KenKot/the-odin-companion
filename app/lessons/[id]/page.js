"use client";

import useLessonDetail from "@/app/hooks/useLessonDetail"; // Adjust the path as necessary
import FlashcardViewer from "@/components/FlashcardViewer";
import LoadingDots from "@/components/LoadingDots";

export default function LessonDetail({ params }) {
  const { lessonData, loading } = useLessonDetail(params.id);

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
