"use client";
import Flashcard from "./Flashcard";
import BackButton from "@/components/BackButton";
import { useState } from "react";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi"; // Importing arrow icons

export default function FlashcardViewer({ shuffledflashcards, lessonTitle }) {
  const [flashcards, setFlashcards] = useState(shuffledflashcards);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [showQuestion, setShowQuestion] = useState(true);
  const toggleShowQuestion = () => {
    setShowQuestion((prev) => !prev);
  };

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

        // If the user clicks the "Mastered" button, we want to automatically move to the next flashcard
        // if (property === "isMastered" && currentIndex < flashcards.length - 1) {
        //   setCurrentIndex(currentIndex + 1);
        // }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <div className="flex items-center justify-center mb-4">
        <BackButton />
        <h1 className="ml-4 text-3xl text-center">{lessonTitle}</h1>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <Flashcard
          flashcard={flashcards[currentIndex]}
          toggleFlashcardProperty={toggleFlashcardProperty}
          showQuestion={showQuestion}
          toggleShowQuestion={toggleShowQuestion}
        />

        <div className="flex items-center space-x-4 text-black">
          <button
            className="bg-gray-200 p-2 rounded"
            onClick={() => {
              if (currentIndex > 0) {
                setShowQuestion(true);
                setCurrentIndex((prev) => prev - 1);
              }
            }}
          >
            <FiArrowLeft size={24} />
          </button>
          <span className="text-white">
            {currentIndex + 1}/{flashcards.length}
          </span>
          <button
            className="bg-gray-200 p-2 rounded"
            onClick={() => {
              setShowQuestion(true);

              if (currentIndex < flashcards.length - 1) {
                setCurrentIndex((prev) => prev + 1);
                setShowQuestion(true);
              }
            }}
          >
            <FiArrowRight size={24} />
          </button>
        </div>
      </div>
    </>
  );
}
