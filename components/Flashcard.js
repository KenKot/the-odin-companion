import { useState } from "react";

export default function Flashcard({ flashcard, toggleFlashcardMastered }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="border-2 border-black m-2 p-2">
      <h2>{flashcard.question}</h2>

      {showAnswer && <h2>{flashcard.answer}</h2>}

      <p>Is Mastered: {flashcard.isMastered ? "Yes" : "No"}</p>

      <button
        className="border-2 border-red-500"
        onClick={() =>
          toggleFlashcardMastered(flashcard._id, flashcard.isMastered)
        }
      >
        Question Mastered
      </button>

      <button
        className="border-2 border-blue-500 ml-2"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </button>
    </div>
  );
}

// import { useState } from "react";

// export default function Flashcard({ flashcard, toggleFlashcardMastered }) {
//   const [showAnswer, setShowAnswer] = useState(false);

//   return (
//     <div className="border-2 border-black m-2 p-2">
//       <h2>{flashcard.question}</h2>

//       {showAnswer && <h2>{flashcard.answer}</h2>}

//       <p>Is Mastered: {flashcard.isMastered ? "Yes" : "No"}</p>

//       <button
//         className="border-2 border-red-500"
//         onClick={() =>
//           toggleFlashcardMastered(flashcard._id, flashcard.isMastered)
//         }
//       >
//         Question Mastered
//       </button>

//       <button
//         className="border-2 border-blue-500 ml-2"
//         onClick={() => setShowAnswer(!showAnswer)}
//       >
//         {showAnswer ? "Hide Answer" : "Show Answer"}
//       </button>
//     </div>
//   );
// }
