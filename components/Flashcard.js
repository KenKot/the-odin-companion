import { useState, useEffect } from "react";

export default function Flashcard({ flashcard, toggleFlashcardMastered }) {
  const [contentToShow, setContentToShow] = useState("question");

  // This effect ensures that the question is shown whenever a new flashcard is displayed
  useEffect(() => {
    setContentToShow("question");
  }, [flashcard]);

  return (
    <div
      className="border-2 border-black m-4 p-4 cursor-pointer flex flex-col items-center max-w-screen-md mx-auto w-full h-[500px] md:w-[800px] md:h-[600px] overflow-auto"
      onClick={() => {
        setContentToShow((prevContent) =>
          prevContent === "question" ? "answer" : "question"
        );
      }}
    >
      <h2 className="text-xl mb-2">
        {contentToShow === "question" ? flashcard.question : flashcard.answer}
      </h2>

      <p className="mb-2">Is Mastered: {flashcard.isMastered ? "Yes" : "No"}</p>

      <button
        className="border-2 border-red-500 p-2"
        onClick={(e) => {
          e.stopPropagation(); // Prevents the entire div's click event from firing
          toggleFlashcardMastered(flashcard._id, flashcard.isMastered);
        }}
      >
        Question Mastered
      </button>
    </div>
  );

  //   return (
  //     <div
  //       className="border-2 border-black m-2 p-2 cursor-pointer"
  //       onClick={() => {
  //         setContentToShow((prevContent) =>
  //           prevContent === "question" ? "answer" : "question"
  //         );
  //       }}
  //     >
  //       <h2>
  //         {contentToShow === "question" ? flashcard.question : flashcard.answer}
  //       </h2>

  //       <p>Is Mastered: {flashcard.isMastered ? "Yes" : "No"}</p>

  //       <button
  //         className="border-2 border-red-500"
  //         onClick={(e) => {
  //           e.stopPropagation(); // Prevents the entire div's click event from firing
  //           toggleFlashcardMastered(flashcard._id, flashcard.isMastered);
  //         }}
  //       >
  //         Question Mastered
  //       </button>
  //     </div>
  //   );
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
