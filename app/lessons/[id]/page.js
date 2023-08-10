"use client";
import { useEffect, useState } from "react";
import Flashcard from "@/components/Flashcard";
import FlashcardViewer from "@/components/FlashcardViewer";
import { usePathname, useRouter } from "next/navigation";

export default function LessonDetail({ params }) {
  const [flashcards, setFlashcards] = useState([]);
  const [lessonTitle, setLessonTitle] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/lessons/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setLessonTitle(data.title);

        // Sorting the flashcards directly after data fetching
        let tempUnmasteredCards = []; //to be shuffled
        let tempMasteredCards = [];

        data.flashcards.forEach((card) => {
          if (card.isMastered) {
            tempMasteredCards.push(card);
          } else {
            tempUnmasteredCards.push(card);
          }
        });

        //shuffle unmastered cards
        for (let i = tempUnmasteredCards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [tempUnmasteredCards[i], tempUnmasteredCards[j]] = [
            tempUnmasteredCards[j],
            tempUnmasteredCards[i],
          ]; // Swap elements
        }
        const rejoinedCards = tempUnmasteredCards.concat(tempMasteredCards);
        console.log("original flashcard in [0]", rejoinedCards[0]);
        setFlashcards(rejoinedCards);

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

  const toggleFlashcardMastered = (flashcardId, isMastered) => {
    console.log("toggleFlashcardMastered ran, flashcardId is", flashcardId);

    fetch(`/api/flashcards/${flashcardId}`, {
      method: "PATCH",
    })
      .then((response) => response.json())
      .then((updatedFlashcardId) => {
        const updatedFlashcards = flashcards.map((card) => {
          if (card._id === updatedFlashcardId) {
            card.isMastered = !card.isMastered;
          }
          return card;
        });
        console.log("updatedFlashcards is", updatedFlashcards);
        setFlashcards(updatedFlashcards);
        // Check if it's not the last flashcard and then move to the next one
        if (currentIndex < flashcards.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <div className="">
      <h1 className="text-3xl text-center">{lessonTitle}</h1>
      <FlashcardViewer
        flashcards={flashcards}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        toggleFlashcardMastered={toggleFlashcardMastered}
      />
    </div>
  );
}
