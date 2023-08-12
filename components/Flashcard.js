import { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function Flashcard({ flashcard, toggleFlashcardMastered }) {
  const [showQuestion, setShowQuestion] = useState(true);

  // This effect ensures that the question is shown whenever a new flashcard is displayed
  useEffect(() => {
    setShowQuestion(true);
  }, [flashcard]);

  return (
    <div className="rounded w-full border-2 border-white m-4 p-4 cursor-pointer flex flex-col items-center mx-auto h-[300px] md:w-3/4 lg:w-1/2">
      <div
        className="flex-grow w-full overflow-auto"
        onClick={() => {
          setShowQuestion((prev) => !prev);
        }}
      >
        <h2 className="mb-2 text-2xl text-center break-words">
          {showQuestion ? flashcard.question : flashcard.answer}
        </h2>
      </div>

      <div className="flex items-center justify-between w-full mt-4">
        <button
          className={`border-2 p-2 rounded-md shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
            flashcard.isMastered
              ? "bg-gradient-to-r from-red-400 to-red-600 text-white border-red-500 focus:ring-red-500"
              : "bg-gradient-to-r from-green-400 to-green-600 text-white border-green-500 focus:ring-green-500"
          }`}
          onClick={(e) => {
            e.stopPropagation(); // Prevents the entire div's click event from firing
            toggleFlashcardMastered(flashcard._id, flashcard.isMastered);
          }}
        >
          {flashcard.isMastered ? "Unmastered" : "Mastered"}
        </button>
        <button>
          {flashcard.starred ? <FaStar size={24} /> : <FaRegStar size={24} />}
        </button>
      </div>
    </div>
  );
}
