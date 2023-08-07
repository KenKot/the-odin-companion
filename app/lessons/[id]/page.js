"use client";
import { useEffect, useState } from "react";
import Flashcard from "@/components/Flashcard";
import FlashcardViewer from "@/components/FlashcardViewer";
import { usePathname, useRouter } from "next/navigation";

export default function LessonDetail({ params }) {
  const [flashcards, setFlashcards] = useState([]);
  const [lessonTitle, setLessonTitle] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("UseEffect fetch + shuffle ran");
    fetch(`/api/lessons/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setLessonTitle(data.title);

        // Sorting the flashcards directly after data fetching
        let tempUnmasteredCards = []; //to be shuffled
        let tempMasteredCards = [];

        data.flashcards.forEach((card) => {
          if (card.isMastered) {
            tempMasteredCards.push(card);
          } else {
            tempUnmasteredCards.push(card);
          }
        });

        //shuffle unmastered cards
        for (let i = tempUnmasteredCards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [tempUnmasteredCards[i], tempUnmasteredCards[j]] = [
            tempUnmasteredCards[j],
            tempUnmasteredCards[i],
          ]; // Swap elements
        }
        const rejoinedCards = tempUnmasteredCards.concat(tempMasteredCards);
        setFlashcards(rejoinedCards);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const toggleFlashcardMastered = (flashcardId, isMastered) => {
    fetch(`/api/flashcards/${flashcardId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isMastered: !isMastered }),
    })
      .then((response) => response.json())
      .then((updatedFlashcard) => {
        const updatedFlashcards = flashcards.map((card) =>
          card._id === updatedFlashcard._id ? updatedFlashcard : card
        );
        setFlashcards(updatedFlashcards);
        // Check if it's not the last flashcard and then move to the next one
        if (currentIndex < flashcards.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h1>{lessonTitle}</h1>
      <FlashcardViewer
        flashcards={flashcards}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        toggleFlashcardMastered={toggleFlashcardMastered}
      />
    </div>
  );
}

// "use client";
// import { useEffect, useState } from "react";
// import Flashcard from "@/components/Flashcard";
// import { usePathname, useRouter } from "next/navigation";

// export default function LessonDetail({ params }) {
//   const [lesson, setLesson] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`/api/lessons/${params.id}`)
//       .then((response) => response.json())
//       .then((data) => {
//         // Sorting the flashcards directly after data fetching
//         data.flashcards.sort((a, b) =>
//           a.isMastered === b.isMastered ? 0 : a.isMastered ? 1 : -1
//         );
//         setLesson(data);
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

//   if (!lesson) {
//     return <div>Lesson not found</div>;
//   }

//   const toggleFlashcardMastered = (flashcardId, isMastered) => {
//     fetch(`/api/flashcards/${flashcardId}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ isMastered: !isMastered }),
//     })
//       .then((response) => response.json())
//       .then((updatedFlashcard) => {
//         // Updating and re-sorting the flashcards after toggling mastery
//         setLesson((prevLesson) => ({
//           ...prevLesson,
//           flashcards: prevLesson.flashcards
//             .map((flashcard) =>
//               flashcard._id === updatedFlashcard._id
//                 ? updatedFlashcard
//                 : flashcard
//             )
//             .sort((a, b) =>
//               a.isMastered === b.isMastered ? 0 : a.isMastered ? 1 : -1
//             ),
//         }));
//       })
//       .catch((error) => console.error("Error:", error));
//   };

//   return (
//     <div>
//       <h1>{lesson.title}</h1>
//       {lesson.flashcards.map((flashcard, index) => (
//         <Flashcard
//           key={index}
//           flashcard={flashcard}
//           toggleFlashcardMastered={toggleFlashcardMastered}
//         />
//       ))}
//     </div>
//   );
// }
