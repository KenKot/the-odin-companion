import Flashcard from "./Flashcard";

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
          Previous
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
          Next
        </button>
      </div>
    </div>
  );
}
