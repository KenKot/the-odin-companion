"use client";

import { useEffect, useState } from "react";
import FlashcardViewer from "@/components/FlashcardViewer";
import LoadingDots from "@/components/LoadingDots";

export default function Starred() {
  const [starredCards, setStarredCards] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/starred`)
      .then((response) => response.json())
      .then((data) => {
        setStarredCards(data.starredFlashcards);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingDots />;
  }

  if (!starredCards) {
    return <div>No starred flashcards found</div>;
  }

  return (
    <FlashcardViewer
      lessonTitle={"Starred Flashcards"}
      shuffledflashcards={starredCards}
    />
  );
}

// import FlashcardViewer from "@/components/FlashcardViewer";
// import { getStarredFlashcards } from "@/app/utils/getStarredFlashcards";

// export default async function Starred() {
//   const res = await getStarredFlashcards();
//   const starredCards = await res.json();
//   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!");
//   console.log(starredCards);
//   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!");

//   return (
//     <FlashcardViewer
//       lessonTitle={"Starred Flashcards"}
//       shuffledflashcards={starredCards}
//     />
//   );
// }
