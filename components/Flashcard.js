import { useState, useEffect } from "react";

export default function Flashcard({ flashcard, toggleFlashcardMastered }) {
  const [contentToShow, setContentToShow] = useState("question");

  // This effect ensures that the question is shown whenever a new flashcard is displayed
  useEffect(() => {
    setContentToShow("question");
  }, [flashcard]);

  return (
    <div className="w-full border-2 border-white m-4 p-4 cursor-pointer flex flex-col items-center mx-auto h-[300px]">
      {/* <div className="border-2 border-black m-4 p-4 cursor-pointer flex flex-col items-center mx-auto h-[500px] w-[400px] md:w-[800px] md:h-[600px]"> */}
      <div
        className="overflow-auto flex-grow w-full"
        // className="overflow-auto flex-grow w-full"
        onClick={() => {
          setContentToShow((prevContent) =>
            prevContent === "question" ? "answer" : "question"
          );
        }}
      >
        <h2 className="text-xl mb-2 text-center break-words">
          {contentToShow === "question" ? flashcard.question : flashcard.answer}
        </h2>

        <p className="mb-2 text-center">
          Is Mastered: {flashcard.isMastered ? "Yes" : "No"}
        </p>
      </div>

      <button
        className="bg-gradient-to-r from-red-400 to-red-600 text-white border-2 border-red-500 p-2 mt-4 rounded-md shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        onClick={(e) => {
          e.stopPropagation(); // Prevents the entire div's click event from firing
          toggleFlashcardMastered(flashcard._id, flashcard.isMastered);
        }}
      >
        Mastered!
      </button>
    </div>
  );
}
