import { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

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
        onClick={() => {
          setContentToShow((prevContent) =>
            prevContent === "question" ? "answer" : "question"
          );
        }}
      >
        <h2 className="text-xl mb-2 text-center break-words">
          {contentToShow === "question" ? flashcard.question : flashcard.answer}
        </h2>

        {/* <p className="mb-2 text-center">
          Is Mastered: {flashcard.isMastered ? "Yes" : "No"}
        </p> */}
      </div>

      <div className="flex justify-between items-center w-full mt-4">
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
          {flashcard.isMastered ? "Change to Unmastered" : "Mastered!"}
        </button>
        <FaRegStar size={24} />
        {/* <FaStar size={24} /> */}
      </div>
    </div>
  );
}
