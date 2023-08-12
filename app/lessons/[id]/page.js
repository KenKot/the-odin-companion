import Flashcard from "@/components/Flashcard";
import FlashcardViewer from "@/components/FlashcardViewer";
import { getLesson } from "@/app/utils/getLesson";

export default async function LessonDetail({ params }) {
  let res = await getLesson(params.id);
  let lessonData = await res.json();
  console.log(lessonData.flashcards[0]);
  return (
    <FlashcardViewer
      lessonTitle={lessonData.title}
      shuffledflashcards={lessonData.flashcards}
    />
  );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// "use client";
// import { useEffect, useState } from "react";
// import Flashcard from "@/components/Flashcard";
// import FlashcardViewer from "@/components/FlashcardViewer";
// import { usePathname, useRouter } from "next/navigation";
// import BackButton from "@/components/BackButton";

// export default function LessonDetail({ params }) {
//   const [flashcards, setFlashcards] = useState([]);
//   const [lessonTitle, setLessonTitle] = useState("");

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`/api/lessons/${params.id}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setLessonTitle(data.title);

//         // Sorting the flashcards directly after data fetching
//         let tempUnmasteredCards = []; //to be shuffled
//         let tempMasteredCards = [];

//         data.flashcards.forEach((card) => {
//           if (card.isMastered) {
//             tempMasteredCards.push(card);
//           } else {
//             tempUnmasteredCards.push(card);
//           }
//         });

//         //shuffle unmastered cards
//         for (let i = tempUnmasteredCards.length - 1; i > 0; i--) {
//           const j = Math.floor(Math.random() * (i + 1));
//           [tempUnmasteredCards[i], tempUnmasteredCards[j]] = [
//             tempUnmasteredCards[j],
//             tempUnmasteredCards[i],
//           ]; // Swap elements
//         }
//         const rejoinedCards = tempUnmasteredCards.concat(tempMasteredCards);
//         console.log("original flashcard in [0]", rejoinedCards[0]);
//         setFlashcards(rejoinedCards);

//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   const toggleFlashcardProperty = (flashcardId, property) => {
//     fetch(`/api/flashcards/${flashcardId}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ property: property }),
//     })
//       .then((response) => response.json())
//       .then((updatedFlashcard) => {
//         const updatedFlashcards = flashcards.map((card) => {
//           if (card._id === updatedFlashcard._id) {
//             return updatedFlashcard;
//           }
//           return card;
//         });
//         setFlashcards(updatedFlashcards);
//         if (property === "isMastered" && currentIndex < flashcards.length - 1) {
//           setCurrentIndex(currentIndex + 1);
//         }
//       })
//       .catch((error) => console.error("Error:", error));
//   };

//   // Usage:
//   // toggleFlashcardProperty(flashcardId, "isMastered");
//   // toggleFlashcardProperty(flashcardId, "starred");

//   return (
//     <div className="">
//       <div className="flex items-center justify-center mb-4">
//         <BackButton />
//         <h1 className="ml-4 text-3xl text-center">{lessonTitle}</h1>
//       </div>
//       <FlashcardViewer
//         flashcards={flashcards}
//         currentIndex={currentIndex}
//         setCurrentIndex={setCurrentIndex}
//         toggleFlashcardProperty={toggleFlashcardProperty}
//       />
//     </div>
//   );
// }
