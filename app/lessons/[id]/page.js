"use client";
import { useEffect, useState } from "react";
import Flashcard from "@/components/Flashcard";
import { usePathname, useRouter } from "next/navigation";

export default function LessonDetail({ params }) {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/lessons/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        // Sorting the flashcards directly after data fetching
        data.flashcards.sort((a, b) =>
          a.isMastered === b.isMastered ? 0 : a.isMastered ? 1 : -1
        );
        setLesson(data);
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

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  const toggleFlashcardMastered = (flashcardId, isMastered) => {
    fetch(`/api/flashcards/${flashcardId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isMastered: !isMastered }),
    })
      .then((response) => response.json())
      .then((updatedFlashcard) => {
        // Updating and re-sorting the flashcards after toggling mastery
        setLesson((prevLesson) => ({
          ...prevLesson,
          flashcards: prevLesson.flashcards
            .map((flashcard) =>
              flashcard._id === updatedFlashcard._id
                ? updatedFlashcard
                : flashcard
            )
            .sort((a, b) =>
              a.isMastered === b.isMastered ? 0 : a.isMastered ? 1 : -1
            ),
        }));
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h1>{lesson.title}</h1>
      {lesson.flashcards.map((flashcard, index) => (
        <Flashcard
          key={index}
          flashcard={flashcard}
          toggleFlashcardMastered={toggleFlashcardMastered}
        />
      ))}
    </div>
  );
}
