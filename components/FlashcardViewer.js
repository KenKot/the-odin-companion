"use client";
import Flashcard from "./Flashcard";
import BackButton from "@/components/BackButton";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default function FlashcardViewer({ shuffledflashcards, lessonTitle }) {
  const [flashcards, setFlashcards] = useState(shuffledflashcards);
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleFlashcardProperty = (flashcardId, property) => {
    fetch(`/api/flashcards/${flashcardId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ property: property }),
    })
      .then((response) => response.json())
      .then((updatedFlashcard) => {
        const updatedFlashcards = flashcards.map((card) => {
          if (card._id === updatedFlashcard._id) {
            return updatedFlashcard;
          }
          return card;
        });
        setFlashcards(updatedFlashcards);
        // if (property === "isMastered" && currentIndex < flashcards.length - 1) { // If the user clicks the "Mastered" button, go to the next flashcard
        //   setCurrentIndex(currentIndex + 1);
        // }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <div className="flex items-center justify-center mb-4">
        <BackButton />
        <h1 className="ml-4 text-5xl text-center">{lessonTitle}</h1>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <Flashcard
          flashcard={flashcards[currentIndex]}
          toggleFlashcardProperty={toggleFlashcardProperty}
        />

        <div className="flex items-center space-x-4 text-black">
          <button
            className="p-2 bg-gray-200 rounded"
            onClick={() => {
              if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
            }}
          >
            <FiArrowLeft size={24} />
          </button>
          <span className="w-16 text-center text-white">
            {currentIndex + 1}/{flashcards.length}
          </span>
          <button
            className="p-2 bg-gray-200 rounded"
            onClick={() => {
              if (currentIndex < flashcards.length - 1)
                setCurrentIndex((prev) => prev + 1);
            }}
          >
            <FiArrowRight size={24} />
          </button>
        </div>
      </div>
    </>
  );
}
