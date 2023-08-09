import Flashcard from "./Flashcard";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"; // Importing arrow icons

export default function FlashcardViewer({
  flashcards,
  currentIndex,
  setCurrentIndex,
  toggleFlashcardMastered,
}) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Flashcard
        flashcard={flashcards[currentIndex]}
        toggleFlashcardMastered={toggleFlashcardMastered}
      />

      <div className="flex items-center space-x-4 text-black">
        <button
          className="bg-gray-200 p-2 rounded"
          onClick={() => {
            if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
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
            if (currentIndex < flashcards.length - 1)
              setCurrentIndex((prev) => prev + 1);
          }}
        >
          <FiArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}
