import Flashcard from "./Flashcard";

export default function FlashcardViewer({
  flashcards,
  currentIndex,
  setCurrentIndex,
  toggleFlashcardMastered,
}) {
  return (
    <div>
      <Flashcard
        flashcard={flashcards[currentIndex]}
        toggleFlashcardMastered={toggleFlashcardMastered}
      />

      <div>
        <button
          onClick={() => {
            if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
          }}
        >
          Previous
        </button>
        <span className="mx-4">
          {currentIndex + 1}/{flashcards.length}
        </span>
        <button
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
