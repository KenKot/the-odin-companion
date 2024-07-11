"use client";

import useStarredCards from "@/app/hooks/useStarredCards";
import FlashcardViewer from "@/components/FlashcardViewer";
import LoadingDots from "@/components/LoadingDots";

export default function Starred() {
  const { starredCards, loading } = useStarredCards();

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
