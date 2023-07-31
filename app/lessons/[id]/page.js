"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

function LessonDetail() {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathName = usePathname();
  let arr = pathName.split("/");
  let id = arr[arr.length - 1];

  useEffect(() => {
    fetch(`/api/lessons/${id}`)
      .then((response) => response.json())
      .then((data) => {
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
        setLesson((prevLesson) => ({
          ...prevLesson,
          flashcards: prevLesson.flashcards.map((flashcard) =>
            flashcard._id === updatedFlashcard._id
              ? updatedFlashcard
              : flashcard
          ),
        }));
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h1>{lesson.title}</h1>
      {lesson.flashcards.map((flashcard, index) => (
        <div key={index} className="border-2 border-black m-2 p-2">
          <h2>{flashcard.question}</h2>
          <p>Is Mastered: {flashcard.isMastered ? "Yes" : "No"}</p>
          <button
            className="border-2 border-red-500"
            onClick={() =>
              toggleFlashcardMastered(flashcard._id, flashcard.isMastered)
            }
          >
            Toggle Mastery
          </button>
        </div>
      ))}
    </div>
  );
}

export default LessonDetail;
